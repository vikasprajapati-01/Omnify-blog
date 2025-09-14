from rest_framework import serializers
from .models import Blog
from accounts.serializers import UserSerializer

class BlogSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Blog
        fields = ('id', 'title', 'content', 'author', 'created_at', 'updated_at', 'is_published')
        read_only_fields = ('id', 'author', 'created_at', 'updated_at')

class BlogCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ('id', 'title', 'content', 'is_published')
        read_only_fields = ('id',)

class BlogListSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    content_preview = serializers.SerializerMethodField()
    
    class Meta:
        model = Blog
        fields = ('id', 'title', 'content_preview', 'author', 'created_at', 'updated_at')
    
    def get_content_preview(self, obj):
        return obj.content[:200] + '...' if len(obj.content) > 200 else obj.content
