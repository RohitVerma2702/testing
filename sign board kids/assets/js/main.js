var level = 0;
var arr1 = [];
var q_set = [];
var total_ques = 0;
var current_que = 0;
var score = 0;
var sc = 0;
var selected_ques = 0;
var audio = new Audio();
var right = false;
var gameOver = false;
var newLevel = 0;
var correct_counter = 0;
var opt_count = 0;

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
    setTimeout(function(){
        $('#entry-screen').addClass('d-none');
        $('#main-screen').removeClass('d-none');
    }, 7000);
}

function loadQuestion(itr) {

    right = false;

    var total_que = q_set.length;
    current_que++;
    var str = '';
    opt_count = 0;
    correct_counter = 0;

    // console.log("Total Questions: " + total_que);
    // console.log("Current Quesion No.: " + current_que);
    // console.log(typeof(current_que));

    for (i = 0; i < q_set[itr].length; i++) {
        var title = q_set[itr][i].title;
        var opts = q_set[itr][i].options;
        var j = i + 1;
        var k = 0;

        if (total_que == current_que) {
            $('#main-screen').addClass('d-none');
            $('#welldone-screen').removeClass('d-none');
            setTimeout(function(){
                playAudio('welldone_01.mp3');
            }, 1000);
        }
        else {
            for (var key in opts) {
                k++;
                str += '<p id="opt' + k + '" class="h1 position-absolute translate-middle-y w-100"><input type="checkbox" class="d-none" id="q' + (itr + 1) + '_' + k + '" name="q' + (itr + 1) + '" value="' + opts[key] + '" onclick=checkvalues(this);><label for="q' + (itr + 1) + '_' + k + '" class="w-100 h-100 d-flex align-items-center justify-content-center">' + key + '</label></p>';

                if(opts[key] == true) opt_count++;

            }
        }

        // console.log(opt_count);
        // console.log(title);

        $('#options').html(str);
        $('#question p').html(title);
    }
}

function checkvalues(evt) {

    var checkboxValue = $(evt).val();
    var incorrect = true;
    var id = $(evt).attr('id');
    var que_no = id.slice(1, 2);

    if(checkboxValue == 'true'){
        correct_counter++;
        $(evt).parent().addClass('text-success');
        setTimeout(function(){
            playAudio('right.wav');
        }, 500);

        if(correct_counter == opt_count){
            incorrect = false;
            setTimeout(function(){
                loadQuestion(parseInt(que_no));
            }, 1000);
        }
    } else{
        $(evt).parent().addClass('text-danger');
        setTimeout(function(){
            playAudio('die.wav');
            $(evt).parent().removeClass('text-danger');
        }, 500);
    }
}

function playAudio(audioname) {
    if (audio) audio.pause();

    $(audio).attr('src', 'assets/audios/' + audioname);

    if (audioname.indexOf('.mp3') != -1) $(audio).attr('type', 'audio/mp3');
    else if (audioname.indexOf('.ogg') != -1) $(audio).attr('type', 'audio/ogg');

    audio.play();
    
}