from flask import Flask, request
import joblib
import numpy as np
import ast  

app = Flask(__name__) 
@app.route('/predict', methods=['POST'])
def predict():
    query_dict = ast.literal_eval(request.get_json())
    query = np.fromiter(query_dict.values(), dtype=float)
    query = query.reshape(1, -1)
    
    model_frame1 = joblib.load('model_frame1.pkl')
    model_frame2 = joblib.load('model_frame2.pkl')
    model_frame3 = joblib.load('model_frame3.pkl')
    prediction1 = float(model_frame1.predict(query)[0])
    prediction2 = float(model_frame2.predict(query)[0])
    prediction3 = float(model_frame3.predict(query)[0])
    
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