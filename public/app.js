$(document).ready(function () {
    // When you click the savenote button
    $('#scrapeBtn').on('click', function () {
        $.ajax({
            method: 'GET',
            url: '/scrape'
        })
            .then(function () {
                location.reload(true);
            });
    });

    $(document).on("click", ".note", function () {
        // Grab the id associated with the article from the submit button
        var button = $(this);
        var thisId = button.data("id");
        var message = $("#message_" + thisId);

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                body: message.val()
            }
        })
            // With that done
            .then(function (data) {
                location.reload(true);
            });
    });

    $(document).on("click", ".note_update", function () {
        var button = $(this);
        var thisId = button.data("id");
        var message = $("#message_update_" + thisId);

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "PUT",
            url: "/notes/" + thisId,
            data: {
                // Value taken from title input
                body: message.val()
            }
        });
    });

    $(document).on("click", ".note_delete", function () {
        var button = $(this);
        var thisId = button.data("id");
        var articleId = button.data("article-id");

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: 'DELETE',
            url: "articles/" + articleId + "/notes/" + thisId
        })
            // With that done
            .then(function (data) {
                // Log the response
                console.log(data);
                button.parent().remove()
            });
    });

    $(document).on("click", ".save", function () {
        var button = $(this);
        $.ajax({
            method: "PUT",
            url: "/save/" + button.data("id"),
        })
            .then(function () {
                button.html("Saved");
                button.removeClass("save").addClass("saved");
            })
    });

    $("#delete-article").on("click", function (event) {
        event.preventDefault();
        console.log("delete it!");
        var id = $(this).children().val();
        console.log(id);
        var data = {
            _id: id
        }
        $.ajax("/unsave/" + id, {
            type: "PUT",
            data: data
        })
        location.reload();
    });

});