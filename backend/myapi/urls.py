from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('test/', views.test, name='test'),
]

# speech related
urlpatterns.append(path('tests/speech/', views.speech_test))
urlpatterns.append(path('stt/', views.speech_to_text))
urlpatterns.append(path('tts/', views.text_to_speech))
urlpatterns.append(path('download/', views.download))