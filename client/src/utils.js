export const getFlows = (graph) => {
    if (!graph)
        return [];
    let flows = [];
    let dataSources = [];
    let links = graph.map(e => {
        return {
            'src': e.source.replace(/_.*/gi, ''),
            'dst': e.target.replace(/_.*/gi, '')
        }
    });
    console.log(links)
    graph.map(e => {
        if (e.source.endsWith('Dsource'))
            dataSources.push(e.source);
    });
    /**
     * so now we have the datasources
     * keep the source and the body so far
     * indexat dupa flow number [{
     *     backend_request: [
     *          {
     *              source: 'Today'
     *          },
     *          {
     *             'function_names': [],
     *          },
     *          
     * ],
     *     source: 'id_source',
     *     flow: [],
     * }]
     * 
     * you know your id;
     * based on that if iterate over the flows and see from which flow are you part from;
     * based on that id you know how much of the backend_request you can make
     */
    dataSources.map(source => {
        let flowSet = new Set();
        for (let i = 0; i < graph.length; i++) {

        }
        // dfs on the data

    });
    console.log('========================')
    console.log(dataSources);
    console.log('========================')
    return dataSources;
}

const create_request = (requestObj) => {
    return requestObj;
};

/*
Python dfs implementation; we need to do it for js and to go from the start to the output nodes
# An utility function to do 
# DFS of graph recursively 
# from a given vertex x. 
def DFS(vis, x, y, stack): 
    stack.append(x) 
    if (x == y): 
        # print the path and return on 
        # reaching the destination node 
        printPath(stack) 
        return
    vis[x] = True
    # A flag variable to keep track 
    # if backtracking is taking place 
    flag = 0
    if (len(v[x]) > 0): 
        for j in v[x]: 
           
            # if the node is not visited 
            if (vis[j] == False): 
                DFS(vis, j, y, stack) 
                flag = 1
    if (flag == 0): 
        # If backtracking is taking 
        # place then pop 
        del stack[-1] 
# A utility function to initialise 
# visited for the node and call 
# DFS function for a given vertex x. 
def DFSCall(x, y, n, stack): 
   
    # visited array 
    vis = [0 for i in range(n + 1)] 
    #memset(vis, false, sizeof(vis)) 
    # DFS function call 
    DFS(vis, x, y, stack) 
*/