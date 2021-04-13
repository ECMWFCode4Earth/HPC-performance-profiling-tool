lst = [('WVCOUPLE_INIT_EARLY','WVWAMDECOMP'), ('mike','john'), ('mike','hellen'), ('john','elisa')]

# Build a directed graph and a list of all names that have no parent
graph = {name: set() for tup in lst for name in tup}
has_parent = {name: False for tup in lst for name in tup}
for parent, child in lst:
    graph[parent].add(child)
    has_parent[child] = True

# All names that have absolutely no parent:
roots = [name for name, parents in has_parent.items() if not parents]

# traversal of the graph (doesn't care about duplicates and cycles)
def traverse(hierarchy, graph, names):
    for name in names:
        hierarchy[name] = traverse({}, graph, graph[name])
    return hierarchy

print(traverse({}, graph, roots))
# {'mike': {'hellen': {}, 'john': {'elisa': {}, 'marry': {}}}}
