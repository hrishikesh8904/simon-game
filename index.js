var gamePattern = [];
var userCLickedPattern = [];
var tracker = false;
var level = 0;
const buttonColours = ["red","blue","green","yellow"];
$(document).keydown(function(){
    if(!tracker)
    {
        $("#level-title").text("Level " + level)
        nextSequence();
        tracker = true;
    }

});
$(".btn").click(function(){
    var userChosenColour = $(this).attr('id');
    userCLickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userCLickedPattern.length - 1);
})
function nextSequence(){
    userCLickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();       
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    },100);
}



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userCLickedPattern[currentLevel])
    {
        console.log("success");
        if(userCLickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, press any key to continue");
        startOver();
    }

}

function startOver()
{
    level = 0;
    gamePattern = [];
    tracker = false;
}