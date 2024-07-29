from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth import get_user_model, authenticate
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .models import Article, Category, Comment
from .serializers import UserSerializer, RegisterSerializer, ArticleSerializer, CategorySerializer, CommentSerializer
from .permissions import IsAuthorOrReadOnly

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

class ArticleListView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def update(self, request, *args, **kwargs):
        article = self.get_object()
        if article.user != request.user:
            return Response({'error': 'You do not have permission to edit this article.'}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        article = self.get_object()
        if request.user != article.user and not request.user.is_staff:
            return Response({'error': 'You do not have permission to delete this article.'}, status=status.HTTP_403_FORBIDDEN)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserArticlesView(generics.ListAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        articles = Article.objects.filter(user=user)
        is_admin = user.is_staff
        serialized_articles = self.get_serializer(articles, many=True)
        return Response({
            "is_admin": is_admin,
            "articles": serialized_articles.data
        })

class CommentListView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class GrantAuthorView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_author = True
        user.save()
        return Response({'status': 'author privileges granted'})

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthorOrReadOnly]

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthorOrReadOnly]

@api_view(['GET'])
@permission_classes([AllowAny])
def latest_articles(request):
    articles = Article.objects.order_by('-created_at')[:5]
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)

class UpdateCategoriesView(APIView):
    permission_classes = [IsAuthorOrReadOnly]

    def get(self, request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

@api_view(['GET'])
@permission_classes([AllowAny])
def popular_categories(request):
    categories = Category.objects.annotate(num_articles=Count('articles')).order_by('-num_articles')[:10]
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def articles_by_category(request):
    category_name = request.GET.get('category')
    if not category_name:
        return Response({"error": "Category parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
    category = get_object_or_404(Category, name=category_name)
    articles = Article.objects.filter(categories__in=[category])
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)
