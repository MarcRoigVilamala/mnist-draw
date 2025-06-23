function updateValues(values) {
    var dataPoints = [];
    for (var i = 0; i < values.length; i += 1)
        dataPoints.push({x: i, y: values[i]});

    var options = {
        title: {
            text: "Predictions"
        },
        axisX: {
            interval: 1
        },
        axisY: {
            minimum: 0,
            maximum: 1
        },
        data: [{
            dataPoints: dataPoints,
            type: "column"
        }]
    };

    $("#chartContainer").CanvasJSChart(options);
}

window.onload = function () {
    updateValues([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}
