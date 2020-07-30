import plotly.graph_objects as go
import pandas as pd
import plotly.express as px
import json
import pprint

def get_sunburst(functions_to_plot = None):
    df = pd.read_csv("example_omp1_papi.csv")
    # plot the function from the example_omp18_papi.csv
    print(functions_to_plot)
    if functions_to_plot == None:
        functions_to_plot = df.head(100).tail(2)["Function"].to_list() + ['delta_eddington_scat_od', 'cloud_optics']

    parsed_dict = {}
    pp = pprint.PrettyPrinter(indent=3)

    with open("callgraph.json") as f:
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
    df = df.loc[df["Function"].isin(functions_to_plot)]
    df_parents = df_parents.loc[df_parents.index.isin(functions_to_plot) & df_parents.parent.isin(functions_to_plot)]
    df = df.set_index('Function').join(df_parents).fillna('').reset_index()

    primary_feature = 'WallTime'
    features = ['Function',"WallTime", 'parent']

    df = df[features]
    df = df.to_dict()
    df_new = {}
    for i in df.keys():
        if i == "Function":
            df_new['function_name'] = list(df[i].values())
        elif i == "WallTime":
            df_new['value'] = list(df[i].values())
        else:
            df_new['parent'] = list(df[i].values())
    fig = px.sunburst(
        df_new,
        names='function_name',
        parents='parent',
        values='value',
    )

    fig.update_layout(width=600,
        height=600,uniformtext=dict(minsize=6, mode='show'))
    return fig