import plotly.graph_objects as go
import pandas as pd
import plotly.express as px
import json
import pprint

def get_columns(src):
    df = pd.read_csv('./profile-data/' + src)
    return df.columns

def get_rows(src):
    df = pd.read_csv('./profile-data/' + src)
    return df['Function'].tolist()
