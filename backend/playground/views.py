from django.shortcuts import render
from django.http import HttpResponse
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn import *
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
import json

def say_hello(request):
    if request.method == 'POST':
            # body_unicode = request.body.decode('utf-8')

            df=pd.read_csv('spam.csv')
            le = LabelEncoder()
            df.Category=le.fit_transform(df.Category)
            cv=CountVectorizer()
            inputs=df['Message'] 
            target=df['Category'] 
            inputs=cv.fit_transform(inputs)
            X_train, X_test,y_train,y_test=train_test_split(inputs,target,test_size=0.2)
            model=LogisticRegression()
            model.fit(X_train,y_train)
            print(model.score(X_test,y_test))
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            msg=body['msg']
            data=[msg]
            vect=cv.transform(data).toarray()
            print(model.predict(vect))

            return HttpResponse(model.predict(vect))
            


   
    
    return HttpResponse('Hello Jagannath')