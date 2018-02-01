// Establish our variables before the app begins.

// This is the array that will eventually have the users correct answers.
var correct_answers = [];
// Establishes the user has 60 seconds to complete the quiz.
var time = 60;
// Sets the state that when the app loads, the user has not begun the quiz.
var started = false;
// The user starts with 0 answers correct and 0 answers incorrect.
var correct = 0;
var incorrect_answers = 0;



// This function takes the array and performs the Fisher-Yates shuffle while using a for loop.
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}


// This is the function that is called when the user begins the quiz.
function generate_questions(difficulty, number) {


    // The query takes in the paramter of difficulty and number of questions which is establsihed by the dropdown menus on the index page. 
    var query_call = "https://opentdb.com/api.php?amount=" + number + "&category=22&difficulty=" + difficulty + "&type=multiple";

    console.log(query_call);

    // The AJAX function to the API
    $.ajax(query_call, {
        success: function(response) {
            console.log(response);
            $.each(response.results, function(index, question) {
                // Goes through each of the questions and adds them to the index file.
                $(".questions").append("<h4>" + question.question + "</h4>");
                // Adds a new array that has the correct answer in it. 
                var correct_answer = [question.correct_answer];
                // Takes the incorrect answers array and puts them into a single array with the correct answer.
                all_answers = correct_answer.concat(question.incorrect_answers);
                //Shuffles the array
                shuffleArray(all_answers);
                //Assign it to a new property in the object
                question.all_answers = all_answers;
                question.index = index;
                console.log("This is the question: " + question.question + " and its index is: " + question.index);

                // Adds the newly shuffled array to the front end.
                for (var i = 0; i < 4; i++) {
                    if (question.all_answers[i] == question.correct_answer) {
                        // Adds the class of correct to the correct answer. 
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
    $("#quest_gen").hide();


    $("#diff_sub").on("click", function(event) {
        event.preventDefault();
        var difficulty = document.getElementById("diff_select");
        diff_value = difficulty.options[difficulty.selectedIndex].value;
        var num_quest = document.getElementById("num_ques");
        num_of_ques = num_quest.options[num_quest.selectedIndex].value;
        $("#quest_gen").show();

    })


    // Makes the api call and the game begins.
    $("#quest_gen").on("click", function() {
        $("#diff").hide();
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


// This is the state of the game being over.
function end_game() {

    $("#diff").show();
    $(".correct").addClass("actually_correct");
    $(".selected").css("opacity", ".6");
    $(".results").html("<h3>You got " + correct + " answers correct</h3>");
    $(".results").append("<h3>You got: " + incorrect_answers + " answers incorrect.");
    $("#quest_gen, .results").show();
    $(".done-button").hide();
    clearInterval(my_timer);
}


// This runs the timer for the game.
function run_timer() {
    if (time <= 0) {
        clearInterval(my_timer);
        end_game();

    } else {
        time--;
        $('#timer').html("<h2>" + time + "</h2>");
    }
}