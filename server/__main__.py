from flask import Flask
from create_plot import get_sunburst, get_radar, get_DAG
import plotly.io as pio
from flask_cors import CORS
from flask import request
import json
import os
import re
from utils import get_columns, get_rows
import io
from flask import Response
import base64

app = Flask(__name__)
CORS(app)

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
    print(content)
    response = app.response_class(
        response = json.dumps({'columns' : list(get_columns(content['data']['source']))}),
        status = 200,
        mimetype = 'application/json'
    )
    return response

@app.route('/rows', methods=['GET', 'POST'])
def rows():
    content = request.get_json()
    response = app.response_class(
        response = json.dumps({'rows' : list(get_rows(content['data']['source']))}),
        status = 200,
        mimetype = 'application/json'
    )
    return response

@app.route('/get-sources-tree', methods=['POST'])
def getSources():
    content = request.get_json()
    response = app.response_class(
        response = pio.to_json(get_DAG()),
        status = 200,
        mimetype = 'application/json'
    )
    return response
    

@app.route('/getPlot', methods=['POST'])
def getPicture():
    content = request.get_json()['data']
    type = request.get_json()['data']['type']

    if type == 'Sunburst':
        x = pio.to_json(get_sunburst(content['source'], content['columns'], content['rows']), remove_uids=False)
    elif type == 'Spider Web':
        output = io.BytesIO()
        get_radar(content['source'], content['columns'], content['rows']).plot().figure.savefig(output, bbox_inches='tight')
        response = app.response_class(
            response=base64.b64encode(output.getvalue()),
            status=200,
            mimetype='application/json'
        )
        return response

    # elif type == 'Roofline':
        # x = pio.to_json(get_sunburst(content['source'], content['columns'], content['rows']), remove_uids=False)
        # format = "png"
        # sio = cStringIO.StringIO()
        # pyplot.savefig(sio, format=format)
        # print "Content-Type: image/%s\n" % format
        # sys.stdout.write(sio.getvalue())

    response = app.response_class(
        response=json.dumps(x),
        status=200,
        mimetype='application/json'
    )
    return response

# TODO create get all adiacent method where you pass in a method name and it gives out all the adiacent methods
app.run(host='0.0.0.0', port=8080)
