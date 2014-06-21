$(document).bind('pageinit', function () {
    $.ajaxSetup({
        cache: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        $("#lat").val(lat);
        $("#lng").val(lng);
    });

    /*$( "#submitButton" ).bind( "click", function(event, ui) {
            var jsonUrl = "http://localhost:3000/submit";
            var story = { 
                "headline" : $("#headlineID").val(), 
                "author" : $("#authorID").val (), 
                "etching" : $("#story").val (),
                "latitude" : $("#lat").val(), 
                "longitude" : $("#lng").val(), 
            };

            $.post(jsonUrl,story, function(data) {
                alert("Story is added");
                location.reload();
            }, 'json');
        });*/

    $("#change").bind("click", function (event, ui) {
        var jsonUrl = "http://rocky-hamlet-2798.herokuapp.com/base/change";

        $.get(jsonUrl, function (data) {
            $("#result1").html("<h1>" + data.headline + "</h1>");
            $("#result2").html("<h2>" + data.author + "</h2>");
            $("#result3").html("<p>" + data.story + "</p>");

            //$("#result4").html("<img src=../public/image/"+data.image+">" + "</img>");
            var image = $('#mainpage');
            image.css('background-image', 'url(/public/image/' + data.image + ')');
        }, 'json');
    });
});