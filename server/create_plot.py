import plotly.graph_objects as go
import pandas as pd
import plotly.express as px
import json
import pprint

def get_sunburst(source, columns, rows):
    df = pd.read_csv('./profile-data/' + source)
    # plot the function from the example_omp18_papi.csv
    print(rows)
    print(columns)
    if rows == None:
        rows = df.head(100).tail(2)["Function"].to_list() + ['delta_eddington_scat_od', 'cloud_optics']

    parsed_dict = {}
    pp = pprint.PrettyPrinter(indent=3)

    with open('./profile-data/' + 'callgraph.json') as f:
        data = json.load(f)
        for i in data.keys():
            for j in data[i]:
                name, scope, n_file = j.split(" ")
                if j not in parsed_dict:
                    parsed_dict[name] = {}
                    parsed_dict[name]['scope'] = scope.replace("[","").replace("]","")
                    parsed_dict[name]['file'] = n_file.replace("(","").replace(")","")
                if name == i:
                    parsed_dict[name]['parent'] = None
                else:
                    parsed_dict[name]['parent'] = i

    df_parents = pd.DataFrame.from_dict(parsed_dict).transpose()
    df = df.loc[df["Function"].isin(rows)]
    df_parents = df_parents.loc[df_parents.index.isin(rows) & df_parents.parent.isin(rows)]
    df = df.set_index('Function').join(df_parents).fillna('').reset_index()

    features = columns + ['parent', 'Function']

    df = df[features]
    df = df.to_dict()
    df_new = {}
    for i in df.keys():
        if i == "Function":
            df_new['function_name'] = list(df[i].values())
        elif i == "WallTime":
            df_new['value'] = list(df[i].values()) # really do not remember what this is for
        else:
            df_new['parent'] = list(df[i].values())
    print(df_new)
    fig = px.sunburst(
        df_new,
        names='function_name',
        parents='parent',
        values='value',
    )

    fig.update_layout(width=600,
        height=600,uniformtext=dict(minsize=6, mode='show'))
    return fig