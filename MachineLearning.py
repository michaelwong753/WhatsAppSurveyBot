import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, f1_score
from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import KFold, cross_validate

df = pd.read_csv("datasete.csv", encoding='latin-1')
sf = pd.read_csv("testdata.csv", encoding='latin-1')

vectorizer = CountVectorizer()

import sys, json, numpy as np
def machine_learn():
    lines = sys.stdin.readlines()
    labels = set(df.posi)
    dataneg = df[df.posi.str.contains("neg")]
    datapos = df[df.posi.str.contains("pos")]
    dataneg2 = sf[sf.posi.str.contains("neg")]
    datapos2 = sf[sf.posi.str.contains("pos")]
    data = [dataneg, datapos]
    data2 = [dataneg2,datapos2]

    dataall= pd.concat(data)
    dataall2 = pd.concat(data2)
    from sklearn.utils import shuffle
    dataall = shuffle(dataall)
    dataall2 = shuffle(dataall2)

    word_data = dataall.word
    word_test = dataall2.word
    d = {'neg':0, 'pos':1}

    y = dataall.posi.replace(d)
    z = dataall2.posi.replace(d)


    vectorizer = CountVectorizer(ngram_range=(1,1), analyzer='word')
    x = vectorizer.fit(word_data)

    pipeline = Pipeline([
        ('bow',CountVectorizer(ngram_range=(1,1), analyzer='word')),
        ('tfidf', TfidfTransformer()),
        ('classifier', MultinomialNB())
    ])
    data_x = vectorizer.fit_transform(word_data)
    unseen_tfidf = vectorizer.transform(word_test)
    km = KMeans(30)
    kmresult = km.fit(data_x).predict(unseen_tfidf)
    classifier = MultinomialNB()
    kf = KFold(n_splits=20)
    scoring = ['precision_macro','recall_macro','f1_macro','f1_micro','accuracy','f1_weighted']
    scores = cross_validate(classifier, data_x, y, scoring=scoring, cv=kf, return_train_score=False)
    return json.loads(kmresult)

def main():

    #create a numpy array
    np = machine_learn
    #return the sum to the output stream
    print (np)

#start process
if __name__ == '__main__':
    main()

