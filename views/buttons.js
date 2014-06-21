// Story navigation buttons
$(document).ready(function () {
    var etchHeight = $("#etch1").height();
    $("#etchBackground").css("height", etchHeight);

    $("#btn1").click(function () {
        $("#etch1").show();
        $("#etch2").hide();
        $("#etch3").hide();
        $("#etch4").hide();
        $("#etch5").hide();

        var btnImg = $("#btn1 .rotating");
        $(".rotated").attr("class", "rotating");
        btnImg.attr("class", "rotating rotated blue");

        var etchHeight = $("#etch1").height();
        $("#etchBackground").css("height", etchHeight);
    });

    $("#btn2").click(function () {
        $("#etch2").show();
        $("#etch1").hide();
        $("#etch3").hide();
        $("#etch4").hide();
        $("#etch5").hide();

        var btnImg = $("#btn2 .rotating");
        $(".rotated").attr("class", "rotating");
        btnImg.attr("class", "rotating rotated blue");

        var etchHeight = $("#etch2").height();
        $("#etchBackground").css("height", etchHeight);
    });

    $("#btn3").click(function () {
        $("#etch3").show();
        $("#etch2").hide();
        $("#etch1").hide();
        $("#etch4").hide();
        $("#etch5").hide();

        var btnImg = $("#btn3 .rotating");
        $(".rotated").attr("class", "rotating");
        btnImg.attr("class", "rotating rotated blue");

        var etchHeight = $("#etch3").height();
        $("#etchBackground").css("height", etchHeight);
    });

    $("#btn4").click(function () {
        $("#etch4").show();
        $("#etch2").hide();
        $("#etch3").hide();
        $("#etch1").hide();
        $("#etch5").hide();

        var btnImg = $("#btn4 .rotating");
        $(".rotated").attr("class", "rotating");
        btnImg.attr("class", "rotating rotated blue");

        var etchHeight = $("#etch4").height();
        $("#etchBackground").css("height", etchHeight);
    });

    $("#btn5").click(function () {
        $("#etch5").show();
        $("#etch2").hide();
        $("#etch3").hide();
        $("#etch4").hide();
        $("#etch1").hide();

        var btnImg = $("#btn5 .rotating");
        $(".rotated").attr("class", "rotating");
        btnImg.attr("class", "rotating rotated blue");

        var etchHeight = $("#etch5").height();
        $("#etchBackground").css("height", etchHeight);
    });


    // Calculating widths of story and the navigation
    var viewHeight;
    var viewWidth;
    if (typeof window.innerWidth != undefined) {
        viewHeight = window.innerHeight;
        viewWidth = window.innerWidth;
        document.getElementById("etchsContainer").style.width = viewWidth - (0.18 * viewHeight) + 'px';
    }

});