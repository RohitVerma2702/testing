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
$(window).resize(showexplanation);



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

})

function showexplanation() {
    $('.explanation').css('top', ($('.content').position().top + $('.content').height()) - $('.explanation').height());
}



function loadQuestion(itr) {

    $('#current_screen').html(itr + 1);
    $('#total_screen').html(q_set.length - 1);
    right = false;
    $('.explanation').remove();
    $('.strips').removeClass('disabled');

    var total_que = q_set.length;
    var current_que = itr + 1;

    console.log(total_que);
    console.log(current_que);





    // if(total_que = )


    var str = '';

    for (i = 0; i < q_set[itr].length; i++) {
        var title = q_set[itr][i].title;
        var opts = q_set[itr][i].options;
        var j = i + 1;
        var k = 0;

        var start_title = String(title).substr(0, parseInt(String(title).indexOf('-')) + 2);
        var end_title = String(title).substr(parseInt(String(title).indexOf('-')) + 2, String(title).length);

        str += '<div class="questions" id="' + (itr + 1) + '"><div class="title-h4"><div class=""><span id = "s_no">' + start_title + '</span><span id = "_txt">' + end_title + '</span></div></div><div class="options"><div style="">';

        if (total_que == current_que) {

            // str += '<p class="ans-bd"> <img class="" src="files/final.png" alt=""> </p>';

            setTimeout(function () {
                $('.title-h2').addClass('d-none');
                playAudio('welldone_01.mp3');
                $('#wrong').addClass('d-none');
                $('#right').addClass('d-none');
                $('.content').addClass('d-none').removeClass('d-block');
                $('.main').addClass('d-none').removeClass('d-block');
                $('.btns').addClass('d-none').removeClass('d-block');
                $('.last #last').removeClass('d-none').addClass('d-block');
            }, 0);


        }
        else {
            for (var key in opts) {
                k++;
                str += '<p style="font-size: 19px;" id="remove"><span class="strips disabled" onclick=checkvalues(this);> <label for="q' + (itr + 1) + '_' + k + '"> ' + key + ' </label><input type="radio" class="radio radio1 radio2" id="q' + (itr + 1) + '_' + k + '" name="q' + (itr + 1) + '" value="' + opts[key] + '" onclick=checkvalues(this); ></span></p>';
            }
            str += '</div>'
            if (q_set[itr][i].image != '') str += '<div class="imageBox"><img src=img/' + q_set[itr][i].image + '></img></div>';
        }

        str += '</div></div>';
        $('#content').html(str);
        $('.title-h2').html(MASTER_DB.CONFIG.TITLE);
    }

    // hide next if not available
    // var nxtLevel = parseInt(itr) + 1;
    var chk = q_set[nxtLevel];
    if (chk == undefined) {
        $('#btnNext').hide();
    }
}

function checkemptyContainer() {
    console.log("This function is running")
    if (score > 0 & score % 2 == 0 & score < _length) {
        console.log("I am adding questions");
        setTimeout(addquestions, 2000);
    } else if (score > 0 && score == _length) {
        console.log("Hello! I am here");
        $('.main').remove();
        $('.last #last').removeClass('d-none').addClass('d-block');
        playAudio('well-done');
        return 0;
    } else{
        console.log("This is else statement");
    }
}

function checkvalues(evt) {
    if (gameOver) return;

    var index = $(evt).parent().index();

    var incorrect = true;
    $(".questions").each(function (index, element) {
        var id = $(this).attr('id');
        var radioValue = $("input[name='q" + id + "']:checked").val();
        if (radioValue == 'true') incorrect = false;

    });

    if (!incorrect) {
        right = true;
        setTimeout(function () {
            // playAudio('right.mp3');
            playAudio('right.wav');
        }, 300);
        showFeedback('right', index);
        // $('.strips').addClass('disabled');
        $(evt).parent().addClass('right_opt');
        sc++;

        document.getElementById('right').play();


    } else {
        right = false;
        setTimeout(function () {
            // playAudio('wrong.mp3');
            playAudio('die.wav');
        }, 300);
        showFeedback('wrong', index);
        $('.strips').addClass('disabled');
        // $('.strips').addClass('wrong_opt');
        $(evt).parent().addClass('wrong_opt');

        document.getElementById('wrong').play();

        $('#remove').removeClass('wrong_opt');
        // $('#right').addClass('d-none');

        setTimeout(function () {
            $(evt).parent().removeClass('wrong_opt');
        }, 3000);

    }

   // $('.bee:last-child').fadeOut(800, function() {
    //     $('.bee:last-child').remove()
    // });
}

$('.dial').val(50).trigger('change');

function showFeedback(val, ind) {
    let _id = parseInt($(".questions").attr('id'));

    let txt = '';

    //console.log(Object.keys(q_set[_id-1][0].options)[ind]);
    /*if(val == 'right') 
    {
        txt = Object.keys(q_set[_id-1][0].options)[ind];
        hardTxt = "Answer";
        _class = 'inline';
    }
    else 
    {
        txt = q_set[_id-1][0].options[Object.keys(q_set[_id-1][0].options)[ind]];
        hardTxt = "Explanation";
        _class = '';
    }
	
    if($('.explanation').length) $('.explanation').remove();
	
    $('.container').prepend('<div class="explanation"><p class="head ' + _class +'">'+hardTxt+' : </p><p class='+_class+'>'+txt+'</p></div>')
    showexplanation();*/
}

setTimeout(function () {
    $('.strips').removeClass('disabled');
}, 40);


function playAudio(audioname) {
    if (audio) audio.pause();

    $(audio).attr('src', 'audio/' + audioname);

    if (audioname.indexOf('.mp3') != -1) $(audio).attr('type', 'audio/mp3');
    else if (audioname.indexOf('.ogg') != -1) $(audio).attr('type', 'audio/ogg');

    audio.play();
    $(audio).on('ended', function () {

        setTimeout(function () {
            $('.strips').removeClass('disabled');
        }, 40);

        $('.strips').removeClass('wrong_opt');

        if (right) {

            var newLevel = parseInt(level) + 1;
            if (newLevel < q_set.length) {
                level = newLevel;

                loadQuestion(newLevel);

            } else {
                gameOver = true;
                $('.strips').addClass('no_pointer');
                $('.content').addClass('d-none');
                $('#main').addClass('d-none');

            }
        }

    })
}
