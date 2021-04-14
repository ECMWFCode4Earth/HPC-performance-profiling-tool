## TODO for the end of the project

- [x] Selector for input data
- [x] Selector for columns
- [x] Selector for data source
- [x] Selector for display metrics (possibly multiple!)
- [x] Hook up and display sunburst
- [x] Hook up and display spider web
- [x] add graf type to the server and change it in the request
- [x] clean up the code
- [] Hook up and display roofline

- [] Clone or re-create a chain and select a second input source (eg. display to spider webs next to each - other)
- [] Hook both inputs into one output graph (eg. spider web) for comparison.

- [] Source should not change if we are before the selector
- [] Some state changes on zoom


// TODO define rules for correct mapping on server -  check if input node or not
// TODO: add all this components to the sidebar
// TODO: add selector with the graph from plotly
// WHEN NOT focused the items loose their props
// But keep the data; this is a issue with the randering; force a rerander at the start
// IDS can be strings and this is not correct
// The root reducer is bonckers
// There is too much jsx in this code, nothing is reused
// Selected chain color change
// Select box change for multiple items