$(document).ready(function() {

    console.log("loaded");

    $("#quest_gen").on("click", function() {
        var correct_answers = [];

        $.ajax("https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple", {
            success: function(response) {
                console.log(response);
                $.each(response.results, function(index, question) {
                    correct_answers.push(question.correct_answer)
                    $(".questions").append("<h3>" + question.question + "</h3>");
                    $(".questions").append("<p>" + question.correct_answer + "</p>");
                });

            }
        })
    })



})