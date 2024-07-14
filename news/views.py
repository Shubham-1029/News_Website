from django.shortcuts import render, get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model, authenticate
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Article, Tag, Comment
from .serializers import UserSerializer, RegisterSerializer, ArticleSerializer, TagSerializer, CommentSerializer
from django.db.models import Count
from rest_framework.exceptions import ValidationError

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

""" class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
 """
class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

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

    def destroy(self, request, *args, **kwargs):
        article = self.get_object()
        if request.user != article.user and not request.user.is_staff:
            return Response({'error': 'You do not have permission to delete this article.'}, status=status.HTTP_403_FORBIDDEN)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
""" class ArticleDetailView(APIView): 
    def get_object(self,pk):
        try:
            return Article.objects.get(pk=pk)
        except:
            raise ValidationError({'msg':'Article Doesnot exist'})
    
    def get(self,request,pk):
        article = self.get_object(pk)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    
    def put(self,request,pk):
        article = self.get_object(pk=pk)
        serializer = ArticleSerializer(article,data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def delete(self,request,pk):
        article = self.get_object(pk=pk)
        article.delete()
        return Response({"msg":"Article Deleted"})
         """

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

class TagListCreateView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class TagDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def latest_articles(request):
    articles = Article.objects.order_by('-created_at')[:5]
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)

""" class UpdateTagsView(APIView):    Not Working
    permission_classes = [IsAuthenticated]

    def put(self, request, article_id):
        try:
            article = Article.objects.get(id=article_id)
        except Article.DoesNotExist:
            return Response({'error': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)

        if article.user != request.user:
            return Response({'error': 'You do not have permission to edit this article.'}, status=status.HTTP_403_FORBIDDEN)

        tags = request.data.get('tags')
        if tags is not None:
            article.tags.clear()  # Clear existing tags
            for tag_name in tags:
                tag, created = Tag.objects.get_or_create(name=tag_name)
                article.tags.add(tag)

        return Response({'message': 'Tags updated successfully!'}, status=status.HTTP_200_OK) """
"""Working"""
class UpdateTagsView(APIView):    
    def get(self, request):
        queryset = Tag.objects.all()
        serializer = TagSerializer(queryset, many=True)
        return Response (serializer.data)
    def post(self, request):
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data)
        return Response (serializer.errors)
    
    

@api_view(['GET'])
@permission_classes([AllowAny])
def popular_tags(request):
    tags = Tag.objects.annotate(num_articles=Count('articles')).order_by('-num_articles')[:10]
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def articles_by_tag(request):
    tag_name = request.GET.get('tag')
    if not tag_name:
        return Response({"error": "Tag parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
    tag = get_object_or_404(Tag, name=tag_name)
    articles = Article.objects.filter(tags__in=[tag])
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)
