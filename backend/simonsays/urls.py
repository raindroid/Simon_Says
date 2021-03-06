"""simonsays URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', views.index),
    path('apis/', include("myapi.urls")),
]

react_router_paths = (
    "home",
    "activities",
    "goals",
    "help",
    "404",
    "error404"
)

for subpath in react_router_paths:
    urlpatterns.append(path("{}/".format(subpath), views.index))

# applications
urlpatterns.append(path(f"general/", views.general))

handler404 = 'simonsays.views.handler404'