var correct_answers = [];

var array_wrong = ["196", "Gerogia", "Atlanta", "Boston", "Borneo", "Washington", "Dallas"];

function get_rand_answers(array_wrong, array_correct = correct_answers) {
    var array_for_out = [];
    for (var i = 0; i <= array_correct.length; i++) {
        array_for_out.push([])
    }
    for (var i = 0; i < array_for_out.length; i++) {
        array_for_out[i][0] = array_correct[i];
    }

    console.log(array_for_out)


}





$(document).ready(function() {

    console.log("loaded");

    $("#quest_gen").on("click", function() {

        $.ajax("https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple", {
            success: function(response) {
                $.each(response.results, function(index, question) {
                    correct_answers.push(question.correct_answer);
                    get_rand_answers();
                    $(".questions").append("<h3>" + question.question + "</h3>");
                    $(".questions").append("<p>" + question.correct_answer + "</p>");
                });

            }
        })
    })



})