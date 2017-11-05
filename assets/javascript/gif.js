

var userButtons = [];

//First, we need to write a function to dump the JSON content for each button into a div
function displayGIF() {

    var gifSearch = $(this).attr("data-gif");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=Z9XIAqBvN7GkkuJgM9HAQX2gWTDJJWtE&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        var giphy = response.data;

        for (var i = 0; i < giphy.length; i++) {
        
        var gifDiv = $("<div class='gifDiv'>");  

        var rating = giphy[i].rating;

        var p1 = $("<p>").text("Rating: " + rating);

        gifDiv.append(p1);

        var stillUrl = giphy[i].images.original_still.url;

        var gif = $("<img class='gif' state='still' src='" + stillUrl + "'/>");
        
        var animatedUrl = giphy[i].images.original.url;

        gifDiv.append(gif);

        $(gif).attr("stillUrl", stillUrl);

        $(gif).attr("animatedUrl", animatedUrl);

        $("#gif-view").prepend(gifDiv);
        }
    });
}

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < userButtons.length; i++) {

        var a = $("<button>");

        a.addClass("searchButtons");

        a.attr("data-gif", userButtons[i]);

        a.text(userButtons[i]);

        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function(event){

    event.preventDefault();

    var gifSearch = $("#gif-input").val().trim();

    userButtons.push(gifSearch);

    renderButtons();
})

function toggle() {

    $(".gif").on("click", function() {
        var state = $(this).attr("state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("animatedUrl"));
            $(this).attr("state", "animate");
        }

        else {
            $(this).attr("src", $(this).attr("stillUrl"));
            $(this).attr("state", "still");
        }
    }
)}

// toggle();

// renderButtons();

$(document).on("click", ".searchButtons", displayGIF);

$(document).on("click", ".gif", toggle);


