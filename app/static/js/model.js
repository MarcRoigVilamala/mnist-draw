$(document).ready(function () {

    
    $( "#make_predict" ).click(function() {
        var canvas = document.getElementById('canvas_draw');
        var canvas_data = canvas.toDataURL();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: canvas_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                data = JSON.parse(data);
                updateValues(data.predictions);
            },
        });
        
    });

    $("#clear_canvas").click(function(){
        var canvas = $("#canvas_draw")[0];
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        updateValues([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); 
    });

});


var color = $(".selected").css("background-color");
var $canvas = $("canvas");
//Select the first, only canvas element. Select the actual HTML element using the array syntax [index], get the 2d context.
var context = $canvas[0].getContext("2d");
context.strokeStyle = color;
context.lineJoin = "round";
context.lineWidth = 50;
context.globalAlpha = 1;

var lastEvent;
var mouseDown = false;

//On mouse events on the canvas
$canvas.bind("touchstart mousedown", function(e) {
    lastEvent = e;
    mouseDown = true;

}).bind("touchmove mousemove", function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (mouseDown) {
        //Draw lines
        context.beginPath();
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.closePath();        
        context.stroke();
        lastEvent = e;
    }
}).bind("mouseup", function() {
    mouseDown = false;
}).bind("touchend mouseleave", function() {
    $canvas.mouseup();
});

