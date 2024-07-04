from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model, authenticate
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Article, Tag, Comment
from .serializers import UserSerializer, RegisterSerializer, ArticleSerializer, TagSerializer, CommentSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ArticleListView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def update(self, request, *args, **kwargs):
        article = self.get_object()
        if article.user != request.user:
            return Response({'error': 'You do not have permission to edit this article.'}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

class CommentListView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_tags(request, article_id):
    try:
        article = Article.objects.get(id=article_id)
    except Article.DoesNotExist:
        return Response({"error": "Article not found"}, status=status.HTTP_404_NOT_FOUND)

    tags = request.data.get('tags', [])
    if not isinstance(tags, list):
        return Response({"error": "Tags should be a list"}, status=status.HTTP_400_BAD_REQUEST)

    # Clear existing tags
    article.tags.all().delete()

    # Add new tags
    for tag_name in tags:
        Tag.objects.create(name=tag_name, article=article)

    return Response({"success": "Tags updated successfully"}, status=status.HTTP_200_OK)

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

@api_view(['GET'])
def latest_articles(request):
    articles = Article.objects.order_by('-created_at')[:5]  
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


# Create your views here.
