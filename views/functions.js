// Swiping to navigate between pages
$(document).on('swiperight','#find', function ()
    { $.mobile.changePage("#etch"); });
$(document).on('swipeleft','#etch', function ()
    { $.mobile.changePage("#find"); });


// For the upload page, formatting of the choose file button
function chooseFile() {
    $("#fileInput").click();
}