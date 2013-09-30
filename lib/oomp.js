$(function () {
    var FLYBY_DURATION = 8000;
    var FLYBY_DELAY = FLYBY_DURATION;

    var images = [
        {label: 'Black Swan', src: 'images/blackswan.png'},
        {label: 'Lean Startup', src: 'images/lean-startup.jpeg'}
    ];

    images.forEach(function (image, i) {
        var body = d3.select("body");

        animateImages(body, image, i);

        animateLabels(body, image, i);
    });

    function animateImages(body, image, i) {
        var IMAGE_START_POS = "-600px";
        var IMAGE_END_POS = body.node().clientWidth + 100 + "px";

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
        var LABEL_START_POS = body.node().clientWidth + 100 + "px";
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
