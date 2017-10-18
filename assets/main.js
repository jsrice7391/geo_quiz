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
        time = 60;
        my_timer = setInterval(run_timer, 1000);
        $(".done-button").show();
        $("#quest_gen, .results").hide();
        $(".questions").show();

        $.ajax("https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple", {
            success: function(response) {
                console.log(response.results)

                $.each(response.results, function(index, question) {
                    $(".questions").append("<h3>" + question.question + "</h3>");
                    var correct_answer = [question.correct_answer];
                    all_answers = correct_answer.concat(question.incorrect_answers);
                    //Shuffles the array
                    shuffleArray(all_answers);
                    //Assign it to a new property in the object
                    question.all_answers = all_answers;
                    question.index = index;
                    console.log("This is the question: " + question.question + " and its index is: " + question.index);
                    for (var i = 0; i < 4; i++) {
                        if (question.all_answers[i] == question.correct_answer) {
                            $(".questions").append("<li class ='correct'>" + question.all_answers[i] + "</li>");

                        } else {
                            $(".questions").append("<li>" + question.all_answers[i] + "</li>");
                        }
                    }



                })
            }
        })
    });


    $(".questions").on("click", "li", function() {
        $(this).toggleClass("selected");
        $(this).siblings("li").off();


        if ($(this).hasClass("selected") && $(this).hasClass("correct")) {
            correct++
        }
    });
    $("#done").on("click", function() {
        clearInterval(my_timer);
        end_game();
    });
});


function end_game() {
    $(".questions").hide();
    $(".results").html("<h3>You got " + correct + " answers correct</h3>");
    $("#quest_gen, .results").show();
    $(".done-button").hide();
}


function run_timer() {
    if (time <= 0) {
        clearInterval(my_timer);
        end_game();

    } else {
        time--;
        $('#timer').html("<h2>" + time + "</h2>");
    }
}