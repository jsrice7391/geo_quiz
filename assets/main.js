var correct_answers = [];







$(document).ready(function() {

    $("#quest_gen").on("click", function() {

        $.ajax("https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple", {
            success: function(response) {
                console.log(response);
                $.each(response.results, function(index, question) {
                    $(".questions").append("<h3>" + question.question + "</h3>");
                    var correct_answer = [question.correct_answer];
                    all_answers = correct_answer.concat(question.incorrect_answers);
                    console.log(all_answers);
                    for (let answer in all_answers) {
                        if (all_answers[answer] == question.correct_answer) {
                            $(".questions").append("<li class ='correct'>" + all_answers[answer] + "</li>");

                        } else {
                            $(".questions").append("<li>" + all_answers[answer] + "</li>");
                        }
                    }
                });

            }
        })
    })

    $(".questions").on("click", "li", function() {
        $(this).toggleClass("selected");

    });



})