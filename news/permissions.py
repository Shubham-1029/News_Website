# permissions.py
from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow authors of an object to edit or delete it.
    """

    def has_permission(self, request, view):
        # Allow read-only access to all users
        if request.method in permissions.SAFE_METHODS:
            return True

        # Check if the user is authenticated and has author privileges
        return request.user and request.user.is_authenticated and request.user.is_author

    def has_object_permission(self, request, view, obj):
        # Allow read-only access to all users
        if request.method in permissions.SAFE_METHODS:
            return True

        # Only allow authors of the object to edit or delete it
        return request.user and request.user.is_authenticated and request.user.is_author
