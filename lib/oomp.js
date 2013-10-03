$(function () {
    var FLYBY_DURATION = 3000;
    var FLYBY_DELAY = FLYBY_DURATION;

    var images = [
        {label: 'Black Swan', src: 'images/blackswan.png'},
        {label: 'Lean Thinking', src: 'images/lean-startup.jpeg'},
        {label: 'System Thinking', src: 'images/system-thinking.jpg'},
        {label: 'Randomness', src: 'images/fooled-by-randomness.jpg'},
        {label: 'Design Thinking', src: 'images/design-thinking.png'},
        {label: 'AntiFragile', src: 'images/antifragile.png'},
        {label: 'Intuitions', src: 'images/invisible-gorilla.png'},
        {label: 'Evolution', src: 'images/selfish-gene.jpg'},
        {label: 'Optionality', src: 'images/thales.jpg'}
    ];

    var w = d3.select("body").node().clientWidth;
    var h = 600;

    images.forEach(function (image, i) {
        var body = d3.select("body");

        animateImages(body, image, i);

        animateLabels(body, image, i);

        spread();
    });

    function animateImages(body, image, i) {
        var IMAGE_START_POS = "-600px";
        var IMAGE_END_POS = w + 100 + "px";

        var top = 100 * Math.random();

        var imageDiv = body
            .append("div")
            .attr("class", "flyer")
            .style({opacity: 0.5, position: "absolute", top: top + "px", left: IMAGE_START_POS});

        imageDiv.append("img")
            .attr("src", image.src);

        imageDiv.transition().duration(duration() / 2)
            .delay(function () {
                return i * FLYBY_DELAY;
            })
                .style("opacity", 1)
                .style("left", w / 2 - 150 + "px")
            .transition().duration(duration() / 2)
                .style("opacity", 0.5)
                .style("left", IMAGE_END_POS)
            .each("end", function () {
                d3.select(this).remove();
            });
    }

    function animateLabels(body, image, i) {
        var LABEL_START_POS = w + 100 + "px";
        var LABEL_END_POS = "-800px";

        var top = 30 + 400 * Math.random();

        var labelDiv = body
            .append("div")
            .attr("class", "flyer")
            .style({opacity: 0.3, position: "absolute", width: "530px", top: top + "px", left: LABEL_START_POS});

        labelDiv.append("span")
            .text(image.label);

        labelDiv.transition().duration(duration() / 2)
            .delay(function () {
                return i * FLYBY_DELAY;
            })
                .style("opacity", 1)
                .style("left", w / 2 + "px")
            .transition().duration(duration() / 2)
                .style("opacity", 0.3)
                .style("left", LABEL_END_POS)
            .each("end", function () {
                d3.select(this).remove();
            });
    }

    function duration() {
        return FLYBY_DURATION;
    }

    function spread() {
        setTimeout(function () {
            var force = d3.layout.force()
                .size([w, h])
                .gravity(0)
                .charge(0)
                .friction(0.9);

            force.on("tick", function () {
                d3.select("body").selectAll("div.surface")
                    .style("top", function (d) {
                        return d.y + "px";
                    })
                    .style("left", function (d) {
                        return d.x + "px";
                    });
            });

            images.forEach(function (image, i) {
                var spread = 50;

                if (i % 2 == 0) {
                    image.x = w / 2 + Math.random() * spread;
                    image.y = h / 2 + Math.random() * spread;
                } else {
                    image.x = w / 2 - Math.random() * spread;
                    image.y = h / 2 - Math.random() * spread;
                }

                image.px = w / 2;
                image.py = h / 2;

                force.nodes().push(image);
            });

            d3.select("body")
                .selectAll("div.surface")
                .data(force.nodes())
                .enter()
                .append("div")
                .attr("class", "surface")
                .call(force.drag)
                .style("position", "absolute")
                .style("top", function (d) {
                    return d.y + "px";
                })
                .style("left", function (d) {
                    return d.x + "px";
                })
                .append("img")
                .attr("src", function (d) {
                    return d.src;
                });

            force.start();
        }, FLYBY_DURATION * images.length);
    }
});
