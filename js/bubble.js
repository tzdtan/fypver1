var diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#bubble-container").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "white")
    .style("padding", "8px")
    .style("background-color", "rgba(0, 0, 0, 0.75)")
    .style("border-radius", "6px")
    .style("font", "12px sans-serif")
    .text("tooltip");

d3.json("", function(error, root) {
    root ={"name":"Financial technology","children":[{"name":"Retail Banking & Mobile Technology","children":[{"name":"Emerging FinTech trends","size":1253},{"name":"Retail banking","size":1448},{"name":"Channels","size":1150}]},{"name":"Financial Markets","children":[{"name":"Financial Market Products","size":1695},{"name":"Trade Lifecycle","size":1509},{"name":"Trading Strategies","size":1970}]},{"name":"Digital Payments & Innovation","children":[{"name":"Payment Instruments","size":1599},{"name":"Credit Card Networks","size":1101},{"name":"Clearing and Settlement","size":1376}]},{"name":"Digital Banking Enterprise Architecture #","children":[{"name":"Enterprise Architecture","size":1520},{"name":"Service Oriented Architecture","size":1307},{"name":"Business Process Management","size":1912}]},{"name":"Corporate Banking & Smart Contracts","children":[{"name":"Corporate banking","size":1181},{"name":"Smart contracts","size":1047},{"name":"Blockchain","size":1645}]}]};
    var node = svg.selectAll(".node")
        .data(bubble.nodes(classes(root))
            .filter(function(d) { return !d.children; }))
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return color(d.packageName); })
        .on("mouseover", function(d) {
            tooltip.text(d.className + ": " + format(d.value));
            tooltip.style("visibility", "visible");
        })
        .on("mousemove", function() {
            return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
        })
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .style("pointer-events", "none")
        .text(function(d) { return d.className.substring(0, d.r / 3); });
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
    var classes = [];

    function recurse(name, node) {
        if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
        else classes.push({packageName: name, className: node.name, value: node.size});
    }

    recurse(null, root);
    return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");