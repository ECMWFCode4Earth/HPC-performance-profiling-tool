from flask import Flask
from create_plot import get_sunburst
import plotly.io as pio
from flask_cors import CORS
from flask import request
import json
app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    print("aa")
    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello, World'


@app.route('/getSunburstController', methods=['GET', 'POST'])
def getSunburstController():
    content = request.get_json()['functions_to_plot']
    x = pio.to_json(get_sunburst(content), remove_uids=False)
    response = app.response_class(
        response=json.dumps(x),
        status=200,
        mimetype='application/json'
    )
    return response

app.run(host='0.0.0.0', port=8080)
