var correct_answers = [];
var time = 60;
var started = false;
var correct = 0;
var incorrect_answers = 0;


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function generate_questions(difficulty, number) {


    var query_call = "https://opentdb.com/api.php?amount=" + number + "&category=22&difficulty=" + difficulty + "&type=multiple";

    console.log(query_call);

    $.ajax(query_call, {
        success: function(response) {
            $.each(response.results, function(index, question) {
                $(".questions").append("<h4>" + question.question + "</h4>");
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

}




$(document).ready(function() {
    $(".done-button").hide();




    $("#diff_sub").on("click", function(event) {
        event.preventDefault();
        var difficulty = document.getElementById("diff_select");
        diff_value = difficulty.options[difficulty.selectedIndex].value;
        var num_quest = document.getElementById("num_ques");
        num_of_ques = num_quest.options[num_quest.selectedIndex].value;

    })


    $("#quest_gen").on("click", function() {
        $(".header img").hide();
        $(".questions").empty();
        time = 60;
        my_timer = setInterval(run_timer, 1000);
        $(".done-button").show();
        $("#quest_gen, .results, h2").hide();
        $(".questions").show();
        generate_questions(diff_value, num_of_ques);

    });


    $(".questions").on("click", "li", function() {
        $(this).toggleClass("selected");
        if ($(".selected").length >= 11) {
            alert("You have run out of answers");
            end_game();
        }

        if ($(this).hasClass("selected") && $(this).hasClass("correct")) {
            correct++
        } else if ($(this).hasClass("selected") && $(this).not("correct")) {
            incorrect_answers++;
        }
    });

    $("#done").on("click", function() {
        clearInterval(my_timer);
        end_game();
    });
});


function end_game() {

    $(".correct").addClass("actually_correct");
    $(".selected").css("opacity", ".6");


    $(".results").html("<h3>You got " + correct + " answers correct</h3>");
    $(".results").append("<h3>You got: " + incorrect_answers + " answers incorrect.");
    $("#quest_gen, .results").show();
    $(".done-button").hide();
    clearInterval(my_timer);
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