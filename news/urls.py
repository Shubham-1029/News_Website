from django.urls import path
from .views import RegisterView, UserListView, ArticleListView, ArticleDetailView, CommentListView, GrantAuthorView, LoginView, TagListCreateView, TagDetailView, UpdateTagsView, UserArticlesView
from news.views import latest_articles, popular_tags, articles_by_tag

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('articles/user/', UserArticlesView.as_view(), name='user-articles'),
    path('articles/', ArticleListView.as_view(), name='article-list'),
    path('articles/<int:pk>/', ArticleDetailView.as_view(), name='article-detail'),
    path('articles/<int:pk>/edit/', ArticleDetailView.as_view(), name='article-update'),
    path('articles/<int:pk>/delete/', ArticleDetailView.as_view(), name='article-delete'),  # Added for delete functionality
    path('articles/<int:article_id>/comments/', CommentListView.as_view(), name='comment-list'),
    path('grant-author/<int:pk>/', GrantAuthorView.as_view(), name='grant-author'),
    path('login/', LoginView.as_view(), name='login'),
    path('tags/', UpdateTagsView.as_view(), name='tag-list-create'),
    path('tags/<int:pk>/', TagDetailView.as_view(), name='tag-detail'),
    path('articles/<int:article_id>/tags/', UpdateTagsView.as_view(), name='update-tags'),
    path('latest-articles/', latest_articles, name='latest_articles'),
    path('tags/popular/', popular_tags, name='popular-tags'),
    path('articles/by-tag/', articles_by_tag, name='articles-by-tag'),
]
