$(document).ready (function() {

    // declaring variables
        var apiKey = "c95c3ef03aa746f3b6ab73ddf5b85bd6";
        var gifUrl;
        var gifRating;
        var index = 0;
        var newGifDiv;
        var rating;
        var resultQty = 10;
        var topic;
    
        // array of names of top celebrities (singers, players ,news anchor ,Tv star)
        var topics = ["lady antebellum", "Taylor Swift", "John Legend ", "Kim Kardashian", "Prince Charles", "Bradley Cooper", "Rafael Nadal", "Simone Biles", "Peyton Manning", "Tiger Woods", 
            "Michael Phelps", "Kobe Bryant", "Serena Williams", "Roger Federer", "Tom Brady", "Ryan Secrest", "FRIENDS", "Heist Money", "Usain Bolt" ,"Kevin Spacey" ,"Robert De Nero" ,"Donald Trump" ,"Hillary Clinton" ,"Jennifer Lopez" ,"Britney" ,"Jeff Bezos" ,"Demi lovato" ,"Michael Jackson" ,"Katy Perry"];
        var video;
    
        // Add a new button with the user input
        $("#add-event").on("click", function() {
            event.preventDefault();
            topic = $("#event-input").val().trim();
            $("#event-input").val("");
            topics.push(topic);
            renderButtons();
        });
    
        // Buttons for Gif Finders
        $(document).on("click", ".gif-finder-btn", function() {
            $("#gif-div").empty();
            topic = $(this).attr("data-topic");
            displayTopicInfo();
        });
    
        // Retrieve Gifs from Giphy.com
        function displayTopicInfo() {
            $("#gif-div-all").empty();
            $.ajax({
                url: "https://api.giphy.com/v1/gifs/search?q=" + topic +  "&api_key=" + apiKey + "&limit=" + resultQty,
                method: "GET"
            }).done( function(response) {
                console.log(response);
    
        // Create and display new divs with gif with rating
        for (var i = 0; i < resultQty; i++) {
            rating = "<h3>Rating: " + response.data[i].rating + "</h3>";
            gifUrl = response.data[i].images.original_mp4.mp4;
            video = "<video class='gif' loop><source src=" + gifUrl + " type='video/mp4'></video>";
            newGifDiv = ("<div class='gif-div-individual' id='gif-div" + i + "'>" + rating + video + "</div>");
            $("#gif-div").append(newGifDiv);
        }
    
        // click to show
        $(".gif").on("click", function () {
            if (this.paused) {
            this.play();
            } 
            
            else {
                this.pause();
            }
        });
    });
    
     }
    
        // Render buttons for all elements
        function renderButtons() {
            while (index < topics.length) {
                $("#btn-div").append("<button class='gif-finder-btn' data-topic='" + topics[index] + "'>" + topics[index] + "</button>");
                index++;
            }
        }
    
        renderButtons();
    });
    
     