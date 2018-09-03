$(document).ready(function() {
    $("#us").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/us-scrape"
        })
        .then(function(data) {
            console.log(data);
            location.reload();
        });
    });
    
    $("#world").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/world-scrape"
        })
        .then(function(data) {
            console.log(data);
            location.reload();
        });
    });
    
    $("#politics").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/politics-scrape"
        })
        .then(function(data) {
            console.log(data);
            location.reload();
        });
    });
    
    $("#sports").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/sports-scrape"
        })
        .then(function(data) {
            console.log(data);
            location.reload();
        });
    });
    
    $("#tech").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/tech-scrape"
        })
        .then(function(data) {
            console.log(data);
            location.reload();
        });
    });
    
    $("#business").on("click", function(event) {
        event.preventDefault();
    
        $.ajax({
            method: "GET",
            url: "/business-scrape"
        })
        .then(function(data) {
            console.log(data);
            location.reload();
        });
    });
    
    $.ajax({
        method: "GET",
        url: "/articles"
    })
    .then(function(data) {
        console.log(data);
    
        for (var i = 0; i < data.length; i++) {
            var articleCard = $("<div class='card m-3'></div>");
    
            var articleBody = $("<div class='card-body'></div>");
            var title = $("<h5 class='card-title'>" + data[i].title + "</h5>");
            var summary = $("<p class='card-text'>" + data[i].summary + "</p>");
            var link = $("<a class='btn btn-secondary' href=" + data[i].link + " target='_blank' role='button'>Read More</a>");
            var note = $("<button class='btn btn-secondary ml-2 notes' data-id=" + data[i]._id + " role='button'>Notes</button>");
    
            $("#articles").prepend(articleCard);
            articleCard.append(articleBody);
            articleBody.append(title);
            articleBody.append(summary);
            articleBody.append(link);
            articleBody.append(note);
        }
    });
    
    $(document).on("click", "button.notes", function(event) {
        event.preventDefault();
    
        var id = $(this).attr("data-id");
    
        $.ajax({
            method: "GET",
            url: "/articles/" + id
        })
        .then(function(data) {
            console.log(data);

            var noteCard = $("<div class='card m-3'></div>");
            var noteBody = $("<div class='card-body'></div>");
            var title = $("<h5 class='card-title'>" + data.title + "</h5>");
            var noteTitle = $("<input type='text' class='form-control' id='titleinput' name='title'>");
            var noteInput = $("<textarea type='text' class='form-control mt-3 mb-3' id='bodyinput' name='body'></textarea>");
            var saveNote = $("<button class='btn btn-secondary ml-2' data-id=" + data._id + " role='button' id='savenote'>Save Note</button>");

            $("#notes").append(noteCard);
            noteCard.append(noteBody);
            noteBody.append(title);
            noteBody.append(noteTitle);
            noteBody.append(noteInput);
            noteBody.append(saveNote);

            if (data.note) {
              $("#titleinput").val(data.note.title);
              $("#bodyinput").val(data.note.body);
            }
            
        });
    });
    
    $(document).on("click", "#savenote", function(event) {
        // Grab the id associated with the article from the submit button
        event.preventDefault();
        var id = $(this).attr("data-id");
        alert("this worked");
      
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
          method: "POST",
          url: "/articles/" + id,
          data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
          }
        })
          // With that done
          .then(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
          });
      
        // Also, remove the values entered in the input and textarea for note entry
        $("#titleinput").val("");
        $("#bodyinput").val("");
      });
});
