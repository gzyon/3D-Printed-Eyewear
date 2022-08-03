# ML Prediction Server

## Install

Was tested with a conda environmnet, but venv should be fine as well. Dependencies you should install:

```
pip install flask
pip install numpy
pip install scikit-learn // (? maybe ?)
pip install joblib
```
or
```
conda install flask
conda install numpy
conda install scikit-learn // (? maybe ?)
conda install joblib
```
That should be all I think.

## Run (development/local showcase)

Run ``predict-server.py`` on the same machine as the website, set the ports correctly. Make a POST request to ``http://localhost:<PORT>/predict`` with the appropriate data in a json.

What it should look like:
| Age | Weight | Height | WearHours | WearYears | EyewearWeight | NoseArea | CurrentComfort | HeadWidth |  EarToFrame | EarToEye | PCorrect | PSport | PStudy | PCosmetic | Gender_Female | Gender_Male | Race_Chinese | Race_Eurasian | Race_Indian | Race_Malay | Race_Others |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | 
| 22 | 49 | 154 | 15 | 9 | 13.3 | 66.3 | 8 | 147 | 109 | 105 | 1 | 1 | 1 | 0 | 1 | 0 | 1 | 0 | 0 | 0 | 0 |

