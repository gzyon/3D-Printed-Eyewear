import pandas as pd
import random
import requests

data = pd.read_csv("RFData.csv")
features = data.drop(['Frame1', 'Frame2', 'Frame3', 'EarToFrame', 'EarToEye'], axis = 1)

test = features.iloc[random.randint(0, 100)]

print(test)

response = requests.post(url="http://localhost:5000/predict", json=test.to_json())

print(response.json())
    