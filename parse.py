import json 
import pprint 

parsed_dict = {}
pp = pprint.PrettyPrinter(indent=3)

keys_keep = ["rrtm_taumol3" ,"solver_mcica_lw" ,"rrtm_kgb7"]

with open("callgraph.json") as f:
    data = json.load(f)
    # filter the data for easy handeling
    data = { x : data[x] for x in keys_keep}

    for i in data.keys()[:1]:
        for j in data[i]:
            name, scope, n_file = j.split(" ")
            if j not in parsed_dict:
                parsed_dict[name] = {}
                parsed_dict[name]['parents'] = []
                parsed_dict[name]['scope'] = scope.replace("[","").replace("]","")
                parsed_dict[name]['file'] = n_file.replace("(","").replace(")","")
                # name scope and file
            parsed_dict[name]['parents'].append(i)
pp.pprint(json.dumps(parsed_dict))
pp.pprint(parsed_dict)
            
