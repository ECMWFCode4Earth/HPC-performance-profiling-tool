from flask import Flask
from create_plot import get_sunburst
import plotly.io as pio
from flask_cors import CORS
from flask import request
import json
app = Flask(__name__)
CORS(app)
import os
import re
from utils import get_columns

@app.route('/')
def index():
    content = request.get_json()
    return 'Index Page'

@app.route('/data-sources')
def data():
    files = [f for f in os.listdir('./profile-data') if re.match(r'.*\.csv', f)]
    response = app.response_class(
        response = json.dumps(files),
        status = 200,
        mimetype = 'application/json'
    )
    return response

@app.route('/columns', methods=['GET', 'POST'])
def columns():
    content = request.get_json()
    
    response = app.response_class(
        response = json.dumps({'columns' : list(get_columns(content['data']['source']))}),
        status = 200,
        mimetype = 'application/json'
    )
    return response

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
