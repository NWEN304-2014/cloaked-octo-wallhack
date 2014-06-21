// Swiping to navigate between pages
$(document).on('swiperight','#find', function ()
    { $.mobile.changePage("#etch"); });
$(document).on('swipeleft','#etch', function ()
    { $.mobile.changePage("#find"); });


// For the upload page, formatting of the choose file button
function chooseFile() {
    $("#fileInput").click();
}


//Double tap
var mylatesttap;
function doubletap() {
    var now = new Date().getTime();
    var timesince = now - mylatesttap;
    if((timesince < 600) && (timesince > 0)){

    // double tap   

    }else{
            // too much time to be a doubletap
         }

    mylatesttap = new Date().getTime();

}