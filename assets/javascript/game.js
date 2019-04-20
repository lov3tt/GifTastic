//variable
var topics = ["Futurama", "Family Guy", "Rick and Morty", "South Park", "Game of Thrones"]


//Search Engine
function renderButtons() {
    $("#Button").empty();
    for (var i = 0; i < topics.length; i++) {
        var makeButton = $("<button>");
        makeButton.attr("value", topics[i]).text(topics[i]);
        makeButton.attr("onclick", "search(this.value)");
        $("#Button").append(makeButton);
    }
}

//Add new shows base on userinput
$("#add-tvShows").on("click", function (event) {
    event.preventDefault();
    var TV = $("#tvShows-input").val().trim();
    topics.push(TV);
    renderButtons();
});

renderButtons();

//Event Listener for all the buttons
function search(topic) {
    var apikey = "C9eWypgCua3H8CaPld3WKHdcHyYZAmcj";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + topic + "&limit=10";

    //Requesting from server
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);
        var result = response.data;
        //Shows the results
        for (var i = 0; i < result.length; i++) {
            //Make the buttons
            var tvDiv = $("<div>");
            //Add attribute to button
            tvDiv.attr("data-tvShows", topic)
            //Shows the rating
            var p = $("<p>").text("Rating: " + result[i].rating);
            //Make the image tag
            var tvImage = $("<img>");
            //Set the attribute
            tvImage.attr("src", result[i].images.fixed_height_still.url)
                .attr("data-still", result[i].images.fixed_height_still.url)
                .attr("data-animate", result[i].images.fixed_height.url)
                .attr("data-state", "still")
                .attr("class", "gif")
            //Append
            tvDiv.append(p);
            tvDiv.append(tvImage);
            $("#Gifs").prepend(tvDiv);
        }
        //Turn on and off the animation for the GIF
        $(".gif").on("click", function () {
            var state = $(this).attr("data-state")
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })

    })

};