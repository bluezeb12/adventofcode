const { lineByLineInput } = require('../helpers/util');

const sampleInput = {
    colors: [
        'light red',
        'dark orange',
        'bright white',
        'muted yellow',
        'shiny gold'
    ],
    graph: [
        {
            color: 'light red',
            contains: [
                {
                    color: 'bright white',
                    count: 1
                },
                {
                    color: 'muted yellow',
                    count: 2
                }
            ]
        },
        {
            color: 'dark orange',
            contains: [
                {
                    color: 'bright white',
                    count: 3
                },
                {
                    color: 'muted yellow',
                    count: 4
                }
            ]
        },
        {
            color: 'bright white',
            contains: [
                {
                    color: 'shiny gold',
                    count: 1
                }
            ]
        },
        {
            color: 'muted yellow',
            contains: [
                {
                    color: 'shiny gold',
                    count: 2
                },
                {
                    color: 'faded blue',
                    count: 9
                }
            ]
        },
        {
            color: 'shiny gold',
            contains: [
                {
                    color: 'dark olive',
                    count: 1
                },
                {
                    color: 'vibrant plum',
                    count: 2
                }
            ]
        }
    ]
};

const getColor = (graph, color) => graph.filter(x => x.color === color);

const recursivelyCheckForColor = (graph, node, color, count, visited, que) => {
    console.log(node);
    //let hasIncremented = false;
    if(!node || !node.contains || node.contains.length === 0){
        //console.log('oh no');
        return count;
    }
    que.push(node.color);
    visited[node.color] = true;
    console.log(que);
    while(que.length > 0){
        const s = que.pop(0);
        console.log('s', s);
        const colors = getColor(graph, s);
        if(colors.length > 0){
            for(i in colors[0].contains) {
                console.log('i',i);
                if(!visited[graph[i].color]) {
                    if(graph[i].color === color){
                        count++;
                    }
                    que.push(graph[i]);
                    visited[graph[i].color] = true;
                }
            }
        }
    }
    // const hasColor = node.contains.filter(x => x && x.color === color);
    // //console.log('has color', hasColor)
    // if(hasColor.length >= 1){
    //     count++;
    //     hasIncremented = true;
    // }
    // //console.log('incremented', hasIncremented)
    // if(node.contains.length !== hasColor.length){
    //     node.contains.forEach(x => {
    //         if(!x) {
    //             return;
    //         }
    //         const colr = getColor(graph, x.color);
    //         if(colr.color === color && !hasIncremented){
    //             count++;
    //             hasIncremented = true;
    //         }
    //         //console.log(JSON.stringify(colr));
    //         const a = recursivelyCheckForColor(graph, colr, color, count, visited, que);
    //         console.log(count, a);
    //     });
    // }
    return count;
}

const createEdgesFromGraph = (graph) => {
    let map = new Map();
    graph.forEach((color) => {
        console.log(color);
        if(color && color.contains.length > 0){
            map.set(color.color, color.contains.map(x => x && x.color));
        }
    });
    console.log(map);
    return map;
}

const canFindColorStartingFromSoucrce = (edges, colorToFind, source) => {
    //console.log(edges, edges.keys());
    const visited = [];
    edges.forEach(((x, key) => {visited[key] = false}));
    //console.log(visited);
    const queue = [];

    visited[source] = true;
    queue.push(source);

    let canGetToColor = false;

    //console.log(source);

    while(queue.length > 0) {
        const s = queue.pop();
        //console.log('s', s);
        const connections = edges.get(s);
        if(!connections) {
            continue;
        }
        canGetToColor = connections.some((x, idx, cons) => {
            if(x === colorToFind) {
                //console.log('found!');
                visited[x] = true;
                console.log(`Found! ${colorToFind} from ${source} via ${x} ${cons}`)
                //queue.slice(queue.length);
                //console.log('q', queue);
                return true;
            }
            if(!visited[x]) {
                visited[x] = true;
                queue.push(x);
            }
            return false;
        });
        //console.log(canGetToColor);
    }
    //console.log(source, canGetToColor);
    return canGetToColor;
}

const getCountOfWaysToGetToColor = ({graph, colors}, color) => {
    const count = graph.reduce((count, node) => {
        const visited = {};
        graph.forEach((x) => {visited[x.color] = false});
        console.log(node.color);
        if(!node || !node.contains || node.contains.length === 0) {
            return count;
        }
        const hasColor = node.contains.filter(x => x && x.color === color);
        console.log(hasColor);
        if(hasColor.length >= 1){
            count++;
        }
        console.log(node.contains);
        count = recursivelyCheckForColor(graph, node, color, count, visited, []);
        // node.contains.forEach(x => {
        //     console.log('hello');
        //     const colr = getColor(graph, x.color);
        //     console.log(JSON.stringify(colr[0]));
        //     count = recursivelyCheckForColor(graph, colr[0], color, count);
        //     console.log(count);
        // });
        return count;
    }, 0);
    console.log(count);
}

//1 bright white bag, 2 muted yellow bags.
const getContains = (line) => {
    const bags = line.split(',');
    return bags.map((bag) => {
        const matches = /(\d*) (.*) bag[s]*\.*/gm.exec(bag.trim());
        if(!matches) {
            return void 0;
        }
        //console.log(matches);
        return {
            color: matches[2],
            count: matches[1]
        };
    });
}

const parseLine = (line) => {
    const matches = /(.*) bags contain (((\d .* bag[s]*(, |\.))*)|no other bags\.)/gm.exec(line);
    if(!matches) {
        return void 0;
    }
    return {
        color: matches[1],
        contains: getContains(matches[2])
    };
}
//console.log(parseLine('light red bags contain 1 bright white bag, 2 muted yellow bags.'));
const readLine = ({graph, colors}) => (line) => {
    const color = parseLine(line);
    if(colors.includes(color.color)){
        const colr = getColor(graph, color.color)[0];
        colr.contains.push(...color.contains);
    }else {
        graph.push(color);
        colors.push(color.color);
    }
    return {
        graph, color
    }
}

(async () => {
    const input = {
        graph: [],
        colors: []
    };
    lineByLineInput('./inputs/day7.input.txt', readLine(input), () => {
        //console.log('graph', input.graph);
        //console.log(input.colors.length, input.colors)
        //const count = getCountOfWaysToGetToColor(input, 'shiny gold');
        const map = createEdgesFromGraph(input.graph);

        const result = input.colors.reduce((count, source) => {
            //console.log('source:', source);
            const blah = canFindColorStartingFromSoucrce(map, 'shiny gold', source);
            return count + (canFindColorStartingFromSoucrce(map, 'shiny gold', source) ? 1 : 0);
        }, 0);
        console.log(result);
        //console.log(count);
    });
})().catch(e => {
    console.log(e);
})

//getCountOfWaysToGetToColor(sampleInput, 'shiny gold');