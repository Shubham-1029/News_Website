from django.urls import path
from .views import RegisterView, UserListView, ArticleListView, ArticleDetailView, CommentListView, GrantAuthorView, add_tags, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('articles/', ArticleListView.as_view(), name='article-list'),
    path('articles/<int:pk>/', ArticleDetailView.as_view(), name='article-detail'),
    path('<int:article_id>/comments/', CommentListView.as_view(), name='comment-list'),
    path('grant-author/<int:pk>/', GrantAuthorView.as_view(), name='grant-author'),
    path('articles/<int:article_id>/tags/', add_tags, name='add_tags'),
    path('login/', LoginView.as_view(), name='login'),
]
