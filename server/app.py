from flask import Flask,request,jsonify
from flask_cors import CORS
app = Flask(__name__)
import pickle
CORS(app)

model = pickle.load(open('./ML_Model.pkl','rb'))

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route("/add", methods=['GET', 'POST'])
def run():
    res = request.get_json()
    # print(res)
    gen = res["gen"]
    mar = res["mar"]
    dep = res["dep"]
    edu = res["edu"]
    emp = res["emp"]
    mon_income = res["mon_income"]
    co_mon_income = res["co_mon_income"]
    loan_amt = res["loan_amt"]
    duration = res["duration"]
    cred = res["cred"]
    prop = res["prop"]
    features = [[gen, mar, dep, edu, emp, mon_income, co_mon_income, loan_amt, duration, cred, prop]]
    prediction = model.predict(features)
    lc = [str(i) for i in prediction]
    ans = int("".join(lc))
    print(ans)
    print(prediction)
    # print(res["isTrue"])
    return jsonify({"name" : "sid", "res" : ans})
    


if __name__ == "__main__":
    app.run(debug=True)