# import pandas as pd
import random
import requests
import json

# data = pd.read_csv("RFData.csv")
# features = data.drop(['Frame1', 'Frame2', 'Frame3', 'EarToFrame', 'EarToEye'], axis = 1)

# test = features.iloc[random.randint(0, 100)]

# print(test)

test = {
  "race": "Race_Chinese",
  "age": "1",
  "weight": "1",
  "height": "1",
  "gender": "Female",
  "wearhours": "1",
  "wearyears": "1",
  "eyewearweight": "1",
  "nosearea": "-3",
  "currentcomfort": "1",
  "headwidth": "1",
  "purpose": [
    "PCorrect",
    "PSports"
  ],
  "objfile": {}
}

response = requests.post(url="http://localhost:5000/predict", json=json.dumps(test))

print(response.json())
    