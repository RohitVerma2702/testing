var level = 0;
var arr1 = [];
var q_set = [];
var total_ques = 0;
var score = 0;
var sc = 0;
var selected_ques = 0;
var audio = new Audio();
var right = false;
var gameOver = false;
var newLevel = 0;
var correct_counter = 0;
var opt_count = 0;
var current_que = 0;

$(document).ready(function (e) {

    $('#app-title').html(MASTER_DB.CONFIG.TITLE);

    for (i = 0; i < MASTER_DB.QUESTIONS.length; i++) {
        var j = i + 1;
        arr1.push(MASTER_DB.QUESTIONS[i]);

        if (j % MASTER_DB.CONFIG.MAX_QUES_PER_SCREEN == 0) {
            q_set.push(arr1);
            arr1 = [];
        }
    }

    // loadQuestion(0);

});

function startActivity(){
    $('#first-screen').addClass('d-none');
    $('#entry-screen').removeClass('d-none');
    $('#entry-screen #main-screen').removeClass('d-none').addClass('d-block');
    $('#entry-screen #option-box').removeClass('d-none').addClass('d-block');
    $('#entry-screen #unscrambled').removeClass('d-none').addClass('d-block');
}

function loadQuestion(itr) {
    console.log("load question");
    right = false;

    var total_que = q_set.length;
    current_que = itr + 1;
    var str1 = '';
    var str2 = '';
    opt_count = 0;
    correct_counter = 0;

    for (i = 0; i < q_set[itr].length; i++) {
        var answers = q_set[itr][i].answers;
        var opts = q_set[itr][i].options;
        var j = i + 1;
        var k = 0;

        for(var key in opts){
            opt_count++;
        }
        if(current_que > 1 && opt_count == 3){
            console.log("entered");
            $('#entry-screen #option-box').removeClass('d-none').addClass('d-block');
            $('#entry-screen #unscrambled').removeClass('d-none').addClass('d-block');
        }

        if (total_que == current_que) {
            $('#entry-screen').addClass('d-none');
            $('#welldone-screen').removeClass('d-none');
            setTimeout(function(){
                playAudio('welldone_01.mp3');
            }, 2000);
        }
        else {
            for (var key in opts) {
                k++;
                str1 += '<div id="drop' + opt_count + '_' + k + '" class="m-0 p-0 position-absolute d-flex justify-content-center align-items-center" ondrop="droppoint(event)" ondragover="allowDropOption(event)"><p id="first_' + k + '"></p><p id="last_' + k + '"></p></div>';

                str2 += '<p id="drag_' + opts[key] + '" class="h5 align-self-center" draggable="true" ondragstart="dragpoint(event)">' + key + '</p>';
            }
            for(var ans in answers) {
                str1 += '<p id="answer_' + answers[ans] + '" class="h5 align-self-center">' + ans + '</p>';
            }
        }

        console.log(opt_count);

        $('#option-box').html(str1);
        $('#unscrambled').html(str2);
        // $('#answer-box').html(title);
    }
}

function droppoint(event) {
    var data = event.dataTransfer.getData("Text");

    // var option = event.target.id;
    // var optarray = option.split("_");
    // var optionvalue = optarray[1];

    var option = event.target.children;

    console.log(option);

    var quesarray = data.split("_");
    var questionvalue = quesarray[1];

    if(optionvalue == questionvalue){
        console.log("I am here");
        // $('#entry-screen #main-screen').removeClass('d-block').addClass('d-none');
        // $('#entry-screen #right-screen').removeClass('d-none').addClass('d-block');
        // var video = document.getElementById("right-screen");
        // video.currentTime = 0;
        // video.play();
        playAudio('right.wav');
        // setTimeout(function(){
        //     $('#entry-screen #main-screen').removeClass('d-none').addClass('d-block');
        //     $('#entry-screen #right-screen').removeClass('d-block').addClass('d-none');
        // }, 5000);
        event.target.appendChild(document.getElementById(data));
        correct_counter++;
        if(correct_counter == opt_count){
            $('#entry-screen #option-box').removeClass('d-block').addClass('d-none');
            $('#entry-screen #unscrambled').removeClass('d-block').addClass('d-none');
            setTimeout(function(){
                console.log("i am in load question caller");
                loadQuestion(parseInt(current_que));
            }, 1000);
        }
    }else{
        // $('#entry-screen #main-screen').removeClass('d-block').addClass('d-none');
        // $('#entry-screen #wrong-screen').removeClass('d-none').addClass('d-block');
        // var myvideo = document.getElementById("wrong-screen");
        // myvideo.currentTime = 0;
        // myvideo.play();
        playAudio('die.wav');
        // setTimeout(function(){
        //     $('#entry-screen #main-screen').removeClass('d-none').addClass('d-block');
        //     $('#entry-screen #wrong-screen').removeClass('d-block').addClass('d-none');
        // }, 5000);
    }

    event.preventDefault();
}

function allowDropOption(event) {
    event.preventDefault();
}

function dragpoint(event) {
    event.dataTransfer.setData("Text", event.target.id);
}

function playAudio(audioname) {
    if (audio) audio.pause();

    $(audio).attr('src', 'assets/audios/' + audioname);

    if (audioname.indexOf('.mp3') != -1) $(audio).attr('type', 'audio/mp3');
    else if (audioname.indexOf('.ogg') != -1) $(audio).attr('type', 'audio/ogg');

    audio.play();
    
}