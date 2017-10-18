var correct_answers = [];
var time = 60;
var started = false;
var correct = 0;






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
    $(".done-button").hide();




    $("#quest_gen").on("click", function() {
        my_timer = setInterval(run_timer, 100);
        $(".done-button").show();



        $.ajax("https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple", {
            success: function(response) {
                console.log(response)
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
        if ($(this).hasClass("selected") && $(this).hasClass("correct")) {
            correct++
        }
    });


    $(".done-button").on("click", function() {
        $(".questions").hide();
        $(".results").html("You got " + correct + " answers correct");
    });

});

function run_timer() {
    if (time <= 0) {
        clearInterval(my_timer);
    } else {
        time--;
        $('#timer').html("<h2>" + time + "</h2>");
    }
}