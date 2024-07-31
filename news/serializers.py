from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Article, Category, Comment

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
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

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ArticleSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    categories = CategorySerializer(many=True, read_only=True)
    
    category_names = serializers.ListField(
        child=serializers.CharField(max_length=50),
        write_only=True,
        required=False
    )

    class Meta:
        model = Article
        fields = ['id', 'title', 'subheading', 'content', 'image', 'image_caption', 'user', 'created_at', 'updated_at', 'categories', 'category_names']
        extra_kwargs = {
            'image': {'required': False}  # Ensure image is not required
        }

    def create(self, validated_data):
        category_names = validated_data.pop('category_names', [])
        article = Article.objects.create(**validated_data)
        
        category_instances = []
        for category_name in category_names:
            category, created = Category.objects.get_or_create(name=category_name)
            category_instances.append(category)
        
        article.categories.set(category_instances)
        return article

    def update(self, instance, validated_data):
        category_names = validated_data.pop('category_names', None)
        
        if category_names is not None:
            category_instances = []
            for category_name in category_names:
                category, created = Category.objects.get_or_create(name=category_name)
                category_instances.append(category)
            instance.categories.set(category_instances)
        
        # Handle the image field separately
        if 'image' not in validated_data:
            validated_data['image'] = instance.image

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
