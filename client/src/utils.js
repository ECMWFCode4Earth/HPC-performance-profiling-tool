export const getFlows = (links, nodes) => {
    if (!links)
        return [];
    let dataSources = [];
    let flow = [];
    let linksName = links.map(e => {
        return {
            'src': e.source.replace(/_.*/gi, ''),
            'dst': e.target.replace(/_.*/gi, '')
        }
    });
    links.map(e => {
        if (e.source.endsWith('Dsource'))
            dataSources.push(e.source.replace(/_.*/gi, ''));
        return null;
    });

    dataSources.map(s => {
        let chains = dfs(s, [], linksName, []);
        let longest_chain = Object.keys(chains).reduce((max, k) => {
            if (chains[k].length > max.length)
                return chains[k];
            return max
        });
        flow[s] = {
            source: s,
            chain: longest_chain,
            flows: chains
        }
        return null;
    });

    return flow;
}

const dfs = (source, stack, graph, graphParents) => {

    if (stack.includes(source)) {
        console.log(stack);
        console.log(source);
        console.log('Cycle something is invalid');
        return null;
    }

    stack.push(source);
    graphParents[source] = [...stack];

    for (let i = 0; i < graph.length; i++) {
        if (graph[i].src === source)
            dfs(graph[i].dst, stack, graph, graphParents);
    }
    return graphParents;

}


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