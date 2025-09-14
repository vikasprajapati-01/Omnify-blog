from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db.models import Q
from .models import Blog
from .serializers import BlogSerializer, BlogCreateUpdateSerializer, BlogListSerializer

class BlogListView(generics.ListAPIView):
    """Public view to list all published blogs with pagination"""
    serializer_class = BlogListSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = Blog.objects.filter(is_published=True)
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(content__icontains=search)
            )
        return queryset

class BlogDetailView(generics.RetrieveAPIView):
    """Public view to retrieve a single blog"""
    queryset = Blog.objects.filter(is_published=True)
    serializer_class = BlogSerializer
    permission_classes = [permissions.AllowAny]

class BlogCreateView(generics.CreateAPIView):
    """Authenticated users can create blogs"""
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class BlogUpdateView(generics.UpdateAPIView):
    """Blog authors can update their blogs"""
    serializer_class = BlogCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Blog.objects.filter(author=self.request.user)

class BlogDeleteView(generics.DestroyAPIView):
    """Blog authors can delete their blogs"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Blog.objects.filter(author=self.request.user)

class MyBlogsView(generics.ListAPIView):
    """Authenticated users can view their own blogs"""
    serializer_class = BlogListSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Blog.objects.filter(author=self.request.user)
