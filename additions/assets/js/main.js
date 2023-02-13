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
}

function loadQuestion(itr) {

    right = false;

    var total_que = q_set.length;
    current_que = itr + 1;
    var str1 = '';
    var str2 = '';
    var str3 = '';
    var str_options = '';
    opt_count = 0;
    correct_counter = 0;

    for (i = 0; i < q_set[itr].length; i++) {
        var r1 = q_set[itr][i].row1;
        var r2 = q_set[itr][i].row2;
        var r3 = q_set[itr][i].row3;
        var opts = q_set[itr][i].options;
        var j = i + 1;
        var k = 0;

        for(var key in opts){
            opt_count++;
        }

        if (total_que == current_que) {
            $('#entry-screen').addClass('d-none');
            $('#welldone-screen').removeClass('d-none');
            setTimeout(function(){
                playAudio('welldone_01.mp3');
            }, 500);
        }
        else {
            for (var key in opts) {
                str_options += '<p id="drag_' + opts[key] + '" draggable="true" ondragstart="dragpoint(event)">' + key + '</p>';
            }

            for (var key1 in r1) {
                if(r1[key1] == 'no') {
                    str1 += '<div class="col drop_' + r1[key1] + '"></div>';
                } else if(r1[key1] != '') {
                    str1 += '<div class="col"><p>' + r1[key1] + '</P></div>';
                } else {
                    str1 += '<div id="drop_' + key1 + '" class="col" ondrop="droppoint(event)" ondragover="allowDropOption(event)"></div>';
                }
            }

            for (var key2 in r2) {
                if(r2[key2] == 'no') {
                    str2 += '<div class="col drop_' + r2[key2] + '"></div>';
                } else if(r2[key2] == '+') {
                    str2 += '<div class="col sign"><p>' + r2[key2] + '</p></div>';
                } else if(r2[key2] != '') {
                    str2 += '<div class="col"><p>' + r2[key2] + '</P></div>';
                } else {
                    str2 += '<div id="drop_' + key2 + '" class="col" ondrop="droppoint(event)" ondragover="allowDropOption(event)"></div>';
                }
            }

            for (var key3 in r3) {
                if(r3[key3] == 'no') {
                    str3 += '<div class="col drop_' + r3[key3] + '"></div>';
                } else if(r3[key3] != '') {
                    str3 += '<div class="col"><p>' + r3[key3] + '</P></div>';
                } else {
                    str3 += '<div id="drop_' + key3 + '" class="col" ondrop="droppoint(event)" ondragover="allowDropOption(event)"></div>';
                }
            }
        }

        $('#option-box #row1').html(str1);
        $('#option-box #row2').html(str2);
        $('#option-box #row3').html(str3);
        $('#unscrambled').html(str_options);
    }
}

function droppoint(event) {
    var data = event.dataTransfer.getData("Text");

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
            setTimeout(function(){
                loadQuestion(parseInt(current_que));
            }, 300);
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
    event.dataTransfer.setData("Text", event.target.id);
}

function playAudio(audioname) {
    if (audio) audio.pause();

    $(audio).attr('src', 'assets/audios/' + audioname);

    if (audioname.indexOf('.mp3') != -1) $(audio).attr('type', 'audio/mp3');
    else if (audioname.indexOf('.ogg') != -1) $(audio).attr('type', 'audio/ogg');

    audio.play();
    
}