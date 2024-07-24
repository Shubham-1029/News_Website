from django.urls import path
from .views import (
    RegisterView, UserDetailView, ArticleListView, ArticleDetailView, 
    CommentListView, GrantAuthorView, LoginView, CategoryListCreateView, 
    CategoryDetailView, UpdateCategoriesView, UserArticlesView
)
from news.views import latest_articles, popular_categories, articles_by_category

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', UserDetailView.as_view(), name='users-list'),
    path('user/articles/', UserArticlesView.as_view(), name='user-articles'),
    path('articles/', ArticleListView.as_view(), name='article-list'),
    path('articles/<int:pk>/', ArticleDetailView.as_view(), name='article-detail'),
    path('articles/<int:pk>/edit/', ArticleDetailView.as_view(), name='article-update'),
    path('articles/<int:pk>/delete/', ArticleDetailView.as_view(), name='article-delete'),  # Added for delete functionality
    path('articles/<int:article_id>/comments/', CommentListView.as_view(), name='comment-list'),
    path('grant-author/<int:pk>/', GrantAuthorView.as_view(), name='grant-author'),
    path('login/', LoginView.as_view(), name='login'),
    path('categories/', UpdateCategoriesView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-list-update'),
    path('articles/<int:article_id>/categories/', CategoryListCreateView.as_view(), name='update-categories'),
    path('latest-articles/', latest_articles, name='latest_articles'),
    path('categories/popular/', popular_categories, name='popular-categories'),
    path('articles/by-category/', articles_by_category, name='articles-by-category'),
]
