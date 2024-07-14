from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Article, Tag, Comment

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
        tag =self.initial_data['tags']
        tagInstances =[]
        for tags in tag:
            tagInstances.append(Tag.objects.get(pk = tags['id']))
        article =Article.objects.create(**validated_data)
        article.tags.set(tagInstances)
        return article


    def update(self, instance, validated_data):
        try: # handling if not getting genre from frontend client
            tag = self.initial_data['tags']
            tagInstances = []
            for tags in tag:
                tagInstances.append(Tag.objects.get(pk = tags['id']))
            instance.tag.set(tagInstances)
        except:
            pass
        for k, v in validated_data.items():
            setattr(instance, k, v)
        instance.save()
        return instance

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
