$(function () {
    var FLYBY_DURATION = 4000;
    var FLYBY_DELAY = FLYBY_DURATION;

    var images = [
        {label: 'Black Swan', src: 'images/blackswan.png'},
        {label: 'Lean Startup', src: 'images/lean-startup.jpeg'},
        {label: 'System Thinking', src: 'images/system-thinking.jpg'},
        {label: 'Fooled by Randomness', src: 'images/fooled-by-randomness.jpg'},
        {label: 'Design Thinking', src: 'images/design-thinking.png'},
        {label: 'AntiFragile', src: 'images/antifragile.png'},
        {label: 'The Invisible Gorilla', src: 'images/invisible-gorilla.png'}
    ];

    var w = d3.select("body").node().clientWidth;
    var h = 600;

    images.forEach(function (image, i) {
        var body = d3.select("body");

        animateImages(body, image, i);

        animateLabels(body, image, i);

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
    });

    function animateImages(body, image, i) {
        var IMAGE_START_POS = "-600px";
        var IMAGE_END_POS = w + 100 + "px";

        var imageDiv = body
            .append("div")
            .attr("class", "flyer")
            .style({position: "absolute", top: "0px", left: IMAGE_START_POS});

        imageDiv.append("img")
            .attr("src", image.src);

        imageDiv.transition().duration(FLYBY_DURATION)
            .delay(function () {
                return i * FLYBY_DELAY;
            })
            .style("left", IMAGE_END_POS)
            .each("end", function () {
                d3.select(this).remove();
            });
    }

    function animateLabels(body, image, i) {
        var LABEL_START_POS = w + 100 + "px";
        var LABEL_END_POS = "-600px";

        var labelDiv = body
            .append("div")
            .attr("class", "flyer")
            .style({position: "absolute", width: "530px", top: "30px", left: LABEL_START_POS});

        labelDiv.append("span")
            .text(image.label);

        labelDiv.transition().duration(FLYBY_DURATION)
            .delay(function () {
                return i * FLYBY_DELAY;
            })
            .style("left", LABEL_END_POS)
            .each("end", function () {
                d3.select(this).remove();
            });
    }
});
