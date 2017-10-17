var correct_answers = [];



function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}




$(document).ready(function() {

    $("#quest_gen").on("click", function() {

        $.ajax("https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple", {
            success: function(response) {
                console.log(response);
                $.each(response.results, function(index, question) {
                    $(".questions").append("<h3>" + question.question + "</h3>");
                    var correct_answer = [question.correct_answer];
                    all_answers = correct_answer.concat(question.incorrect_answers);
                    console.log("These are the answers: " + all_answers);
                    shuffleArray(all_answers);
                    console.log("This is the shuffled array: " + all_answers);
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