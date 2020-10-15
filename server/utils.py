import plotly.graph_objects as go
import pandas as pd
import plotly.express as px
import json
import pprint

def get_columns(src):
    if isinstance(src, list):
        return pd.read_csv('./profile-data/' + src[0]).columns

    df = pd.read_csv('./profile-data/' + src)
    return df.columns

def get_rows(src):
    if isinstance(src, list):
        return pd.read_csv('./profile-data/' + src[0])['Function'].tolist()
    df = pd.read_csv('./profile-data/' + src)
    return df['Function'].tolist()
