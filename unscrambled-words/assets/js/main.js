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

    loadQuestion(0);

});

function startActivity(){
    $('#first-screen').addClass('d-none');
    $('#entry-screen').removeClass('d-none');
    $('#entry-screen #entry-6').removeClass('d-none').addClass('d-block');
    setTimeout(function(){
        $('#entry-screen #entry-6').currentTime = '0';
        $('#entry-screen #entry-6').removeClass('d-block').addClass('d-none');
        $('#entry-screen #loop-6').removeClass('d-none').addClass('d-block');
        $('#entry-screen #option-box').removeClass('d-none').addClass('d-block');
        $('#entry-screen #unscrambled').removeClass('d-none').addClass('d-block');
    }, 5000);
}

function loadQuestion(itr) {

    right = false;

    var total_que = q_set.length;
    current_que = itr + 1;
    var str1 = '';
    var str2 = '';
    opt_count = 0;
    correct_counter = 0;

    for (i = 0; i < q_set[itr].length; i++) {
        var title = q_set[itr][i].title;
        var opts = q_set[itr][i].options;
        var j = i + 1;
        var k = 0;

        for(var key in opts){
            opt_count++;
        }

        $('#entry-screen #end-5').removeClass('d-block').addClass('d-none');
        $('#entry-screen #end-6').removeClass('d-block').addClass('d-none');
        if(current_que > 1 && opt_count == 5){
            $('#entry-screen #entry-5').get(0).currentTime = '0';
            $('#entry-screen #entry-5').removeClass('d-none').addClass('d-block');
            setTimeout(function(){
                $('#entry-screen #entry-5').get(0).currentTime = '0';
                $('#entry-screen #entry-5').removeClass('d-block').addClass('d-none');
                $('#entry-screen #loop-5').removeClass('d-none').addClass('d-block');
                $('#entry-screen #option-box').removeClass('d-none').addClass('d-block');
                $('#entry-screen #unscrambled').removeClass('d-none').addClass('d-block');
            }, 5000);
        }else if(current_que > 1 && opt_count == 6){
            $('#entry-screen #entry-6').get(0).currentTime = '0';
            $('#entry-screen #entry-6').removeClass('d-none').addClass('d-block');
            setTimeout(function(){
                $('#entry-screen #entry-6').get(0).currentTime = '0';
                $('#entry-screen #entry-6').removeClass('d-block').addClass('d-none');
                $('#entry-screen #loop-6').removeClass('d-none').addClass('d-block');
                $('#entry-screen #option-box').removeClass('d-none').addClass('d-block');
                $('#entry-screen #unscrambled').removeClass('d-none').addClass('d-block');
            }, 5000);
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
                str1 += '<div id="drop' + opt_count + '_' + k + '" class="m-0 p-0 position-absolute d-flex justify-content-center align-items-center" ondrop="droppoint(event)" ondragover="allowDropOption(event)" ontouchmove="allowDropOption(event)" ontouchend="droppoint(event)"></div>';

                str2 += '<p id="drag_' + opts[key] + '" class="h5 align-self-center" draggable="true" ondragstart="dragpoint(event)" ontouchstart="dragpoint(event)">' + key + '</p>';
            }
        }

        $('#option-box').html(str1);
        $('#unscrambled').html(str2);
        $('#answer-box').html(title);
    }
}


function droppoint(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text") || event.targetTouches[0].target.id;

    var option = event.target.id;
    var optarray = option.split("_");
    var optionvalue = optarray[1];

    var quesarray = data.split("_");
    var questionvalue = quesarray[1];

    if(optionvalue == questionvalue){
        setTimeout(function(){
            playAudio('right.wav');
        }, 300);
        event.target.appendChild(document.getElementById(data));
        correct_counter++;
        if(correct_counter == opt_count){
            $('#entry-screen #option-box').removeClass('d-block').addClass('d-none');
            $('#entry-screen #unscrambled').removeClass('d-block').addClass('d-none');
            $('#answer-box').fadeIn(2000).fadeOut(3000);
            if(opt_count == 5){
                $('#entry-screen #end-5').get(0).currentTime = '0';
                $('#entry-screen #loop-5').removeClass('d-block').addClass('d-none');
                $('#entry-screen #end-5').removeClass('d-none').addClass('d-block');
            }else if(opt_count == 6){
                $('#entry-screen #end-6').get(0).currentTime = '0';
                $('#entry-screen #loop-6').removeClass('d-block').addClass('d-none');
                $('#entry-screen #end-6').removeClass('d-none').addClass('d-block');
            }
            setTimeout(function(){
                loadQuestion(parseInt(current_que));
            }, 5000);
        }
    }else{
        setTimeout(function(){
            playAudio('die.wav');
        }, 300);
    }

    event.preventDefault();
}

function allowDropOption(event) {
    event.preventDefault();
}

function dragpoint(event) {
    if (event.type === "touchstart") {
      event.dataTransfer = event.targetTouches[0];
    }
    event.dataTransfer.setData("text", event.target.id);
}  

function playAudio(audioname) {
    if (audio) audio.pause();

    $(audio).attr('src', 'assets/audios/' + audioname);

    if (audioname.indexOf('.mp3') != -1) $(audio).attr('type', 'audio/mp3');
    else if (audioname.indexOf('.ogg') != -1) $(audio).attr('type', 'audio/ogg');

    audio.play();
    
}