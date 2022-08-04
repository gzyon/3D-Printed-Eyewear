from flask import Flask, request
from flask_cors import CORS, cross_origin
import joblib
import numpy as np
import ast  
import json

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    print(request.get_data())
    query_dict = ast.literal_eval(request.get_data().decode("utf-8"))
    print(query_dict)
    print(type(query_dict))
    features = {
        'age': 0.0, 
        'weight': 00.0, 
        'height': 0.0, 
        'wearhours': 0.0, 
        'wearyears': 0.0, 
        'eyewearweight': 0.0, 
        'nosearea': 0.0, 
        'currentcomfort': 0.0, 
        'headwidth': 0.0, 
        'PCorrect': 0.0, 
        'PSports': 0.0, 
        'PStudy': 0.0, 
        'PCosmetic': 0.0, 
        'Female': 0.0, 
        'Male': 0.0, 
        'Race_Chinese': 0.0, 
        'Race_Eurasian': 0.0, 
        'Race_Indian': 0.0, 
        'Race_Malay': 0.0, 
        'Race_Others': 0.0
    }
    for key, value in query_dict.items():
        if key == "race" or key == "gender":
            features[value] = 1.0
        elif key == "purpose":
            for purpose in value:
                features[purpose] = 1.0
        elif key == "objfile":  
            pass
        else:
            features[key] = float(value)
    print(features)
    features_array = np.fromiter(features.values(), dtype=float)
    features_array = features_array.reshape(1, -1)
    
    model_frame1 = joblib.load('model_frame1.pkl')
    model_frame2 = joblib.load('model_frame2.pkl')
    model_frame3 = joblib.load('model_frame3.pkl')
    prediction1 = float(model_frame1.predict(features_array)[0])
    prediction2 = float(model_frame2.predict(features_array)[0])
    prediction3 = float(model_frame3.predict(features_array)[0])
    
    result = f"predicted frame score: {prediction1} {prediction2} {prediction3}"
    print(result)
    
    f1 = 18
    f2 = 34
    f3 = 50
    f12 = int((f1+f2)/2)
    f23 = int((f2+f3)/2)
    threshold = 7
    upper = 50
    lower = 0

    check1 = prediction1 >= threshold
    check2 = prediction2 >= threshold
    check3 = prediction3 >= threshold

    if not check1 and not check2 and not check3:
        upper = f1
    elif not check2 and not check3:
        upper = f12
    elif not check3:
        upper = f23

    if not check1 and not check2 and check3:
        lower = f23
    elif not check1 and check2:
        lower = f12

    
    return {"lower": lower, "upper": upper}


if __name__ == '__main__':
     app.run(debug=True, port=5000)