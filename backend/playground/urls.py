from django.urls import path
from . import views

urlpatterns=[
    path('jag/',views.say_hello)
]
