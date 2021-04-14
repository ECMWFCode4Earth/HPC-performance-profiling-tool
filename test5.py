import sys

sys.setrecursionlimit(1976)

f5 = open("callgraph.json","r")
f6 = open("callgraph_distinct.txt","w")
f7 = open("callgraph_full.txt","w")
f8 = open("callgraph_full2.txt","w")
lines5 = f5.readlines()

y = set(())
for i in range(0,len(lines5)):
    x = lines5[i].replace("    ","").replace("        ","").replace(": [",",").replace('",',"").replace('"','')
    if x not in ["}\n","{\n","]\n"]:
        f7.write(x)
    if x not in ["],\n","}\n","{\n","]\n"]:
        y.add(x)
for i in y:
    f6.write(i)
    f6.write("\n")

f7.close()
f7 = open("callgraph_full.txt","r")
lines7 = f7.readlines()
for i in range(0,len(lines7)-1):
    if lines7[i] != lines7[i+1]:
        f8.write(lines7[i])
f8.write(lines7[len(lines7)-1])
f6.close()






def add(sample_dict, key, list_of_values):
    if key not in sample_dict:
        sample_dict[key] = list()
    else:
        sample_dict[key].extend(list_of_values)
    return sample_dict


f1 = open("callgraph_distinct.txt","r")
f2 = open("callgraph_full2.txt","r")
f3 = open("callgraph_final.txt",'w')

lines1 = f1.readlines()
lines2 = f2.readlines()



l3 = list(lines1)
n1 = len(lines1)
n2 = len(lines2)

lines2 = reversed(lines2)
l2 = list(lines2)

sample_dict = {'*\n':[1]}
sample_dict2 = {'*\n':[1]}
for i in range(0,n2-1):
    a=l2[i]
    b=[l2[i+1]]
    sample_dict = add(sample_dict, a,b)

ok = 1
for key in sample_dict:
    sample_dict2[key] = list(set(sample_dict[key]))
    if key not in ["*\n","],\n"]:
        f3.write('name: "')
        f3.write(key.replace("\n","")) 
        f3.write('",\n')
        f3.write("children: [")
        f3.write("\n")
        x = str(sample_dict2[key]).replace("',",'", value: 11 },\n').replace("\\n","").replace("]","").replace("'\n'","")
        y = x.replace("\n",'\n{ name: "').replace("['","").replace(" '","").replace("'","")
        f3.write('{ name: "')
        f3.write(y)
        f3.write('", value: 11 }\n],')
        f3.write("\n")

lst1 = []
for key in sample_dict:
    sample_dict2[key] = list(set(sample_dict[key]))
    for i in sample_dict2[key]:
    	x = str(key).replace("\n","")
    	y = str(i).replace("\n","")
    	tup1 = tuple([x,y])
    	lst1.append(tup1)

x = 0
lst = []
for i in range(1,65):
		lst.append(lst1[i])
#lst1 = [('WVCOUPLE_INIT_EARLY','WVWAMDECOMP'), ('mike','john'), ('mike','hellen'), ('john','elisa')]
from collections import defaultdict 
sample_dict3 = defaultdict()




for i in sample_dict2.keys():
	sample_dict3[i.strip()]= list(filter(lambda y: y != "],", map(lambda x: str(x).strip(), sample_dict2[i])))
del sample_dict3["*"]
del sample_dict3["],"]
#print(sample_dict3)



import networkx as nx
G = nx.Graph()


roots = ["MASTER"]
_str_end = ""
def traverse(_dict, root, depth, lastChild = False):
    global _str_end
    _str_end += "{\n\"name\" : \"" + root + "\",\n"
    _str_end += "\"value\" : 0,\n"
    _str_end += "\"path\" : \"\","
    _str_end += "\"depth\" : " + str(depth) + ",\n"
    _str_end += "\"children\" : [\n"
    depth += 1
    for index, node in enumerate(_dict[root]):
        traverse(_dict, node, depth, index == len(_dict) - 1)
    depth -= 1

    _str_end += "]\n},\n"
import re
def clean_json(string):
    string = re.sub(",[ \t\r\n]+}", "}", string)
    string = re.sub(",[ \t\r\n]+\]", "]", string)
    return string

traverse(sample_dict3, "MASTER", 0)
print(clean_json(_str_end)[:-2])
# # Build a directed graph and a list of all names that have no parent
# graph = {name: set() for tup in lst1 for name in tup}
# has_parent = {name: False for tup in lst1 for name in tup}
# for parent, child in lst1:
#     graph[parent].add(child)
#     has_parent[child] = True
# # All names that have absolutely no parent:
# roots = [name for name, parents in has_parent.items() if not parents]



# # traversal of the graph (doesn't care about duplicates and cycles)
# def traverse(hierarchy, graph, names):
#     for name in names:
#         hierarchy[name] = traverse({}, graph, graph[name])   
#     return hierarchy


# print(traverse({}, graph, roots))

# {'mike': {'hellen': {}, 'john': {'elisa': {}, 'marry': {}}}}


#del sample_dict2["*\n"]

#f3.write(str(sample_dict2))


f1.close()
f2.close()
f3.close()



f10 = open("callgraph_final.txt",'r')
f11 = open("callgraph.txt",'w') #here is the final txt file
lines10 = f10.readlines()
 #must delete the files created and used to obtain the final one
for i in lines10:
    if i not in ['{ name: ",", value: 11 },\n','{ name: "[", value: 11 },\n', '{ name: "[", value: 11 }\n', '{ name: ",", value: 11 }\n']:
        f11.write(str(i))

f10.close()
f11.close()

 #must delete the files created and used to obtain the final one
import os
os.remove("callgraph_final.txt")
os.remove("callgraph_distinct.txt")
os.remove("callgraph_full2.txt")
os.remove("callgraph_full.txt")



