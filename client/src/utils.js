export const getFlows = (links, nodes) => {
    if (!links)
        return [];
    let dataSources = [];
    let flow = [];
    let linksName = links.map(e => {
        return {
            'src': e.source.replace(/__.*/gi, ''),
            'dst': e.target.replace(/__.*/gi, '')
        }
    });
    links.map(e => {
        if (e.source.endsWith('Dsource'))
            dataSources.push(e.source.replace(/__.*/gi, ''));
        return null;
    });


    dataSources.map(s => {
        let chains = dfs(s, [], linksName, []);
        console.log(chains)
        console.log(Object.keys(chains))
        let longest_chain = Object.keys(chains).reduce((max, k) => {
            console.log(max)
            console.log(chains[k])
            console.log(max.length)
            var maxLen = max.length
            var chainLen = chains[k].length
            if (typeof max === 'string')
                maxLen = 1;
            if (typeof chains[k] === 'string')
                chainLen = 1;
            return maxLen > chainLen ? max : chains[k];
        });
        console.log(longest_chain)

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

