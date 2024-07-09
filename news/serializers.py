from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Article, Tag, Comment

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
 # Make sure 'source' matches the model field name
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class ArticleSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    tags = TagSerializer(many=True, read_only=True)
    tag_names = serializers.ListField(
        child=serializers.CharField(max_length=50),
        write_only=True,
        required=False
    )

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'image', 'user', 'created_at', 'updated_at', 'tags', 'tag_names']

    def create(self, validated_data):
        tag_names = validated_data.pop('tag_names', [])
        article = Article.objects.create(**validated_data)
        for tag_name in tag_names:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            article.tags.add(tag)
        return article

    def update(self, instance, validated_data):
        tag_names = validated_data.pop('tag_names', [])
        instance = super().update(instance, validated_data)
        if tag_names:
            instance.tags.clear()
            for tag_name in tag_names:
                tag, created = Tag.objects.get_or_create(name=tag_name)
                instance.tags.add(tag)
        return instance

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
