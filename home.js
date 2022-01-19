var s = 0;
var task = ["apple", "rain", "waterslide", "camouflage", "ladder", "beach", "line", "smiley face", "butterFly", "bottle", "guitar"];
var result = "";
var ans = "";
score = 0;
var target = "";
s = 0;

//randomizing the target
random = Math.floor(Math.random() * 10) + 1;
document.getElementById("target").innerHTML = "Draw :" + task[random];
target = task[random];

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
    canvas = createCanvas(700, 650);
    canvas.position(600, 250);
    background("white");
    canvas.mouseReleased(classify_canvas);
    synth = window.speechSynthesis;
}

function draw() {
    strokeWeight(5);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX - 20, pmouseY - 20, mouseX - 20, mouseY - 20);
    }
}

function erase() {
    background("white");
    document.getElementById("result").innerHTML = "Result :-";
}

function classify_canvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);

    document.getElementById("result").innerHTML = "Result :-" + results[0].label;
    ans = results[0].label;
    document.getElementById("confidence").innerHTML = "Confidence :-" + Math.round(results[0].confidence * 100);

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
};

function start() {
    //setting the visiblity
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("next").style.visibility = "visible";

    background("white");
    t = setInterval(timer, 1000);

    document.getElementById("result").innerHTML = "Result :-";


};

function timer() {
    //setting the timer
    s = s + 1;
    if (s < 10) {
        document.getElementById("timer_p").innerHTML = "00 :" + " 0" + s;
    } else {
        document.getElementById("timer_p").innerHTML = "00 : " + s;
    };
    //for points
    console.log(ans)
    if (target == ans) {
        var score = score + 10;
        document.getElementById("score").innerHTML = "Points :" + score;
        console.log(score);
    }
    //
    if (s == 20) {
        clearInterval(t);
        document.getElementById("timer_p").innerHTML = "00 : 00";
        s = 0;
        background("white");
        document.getElementById("next").style.visibility = "hidden";
        document.getElementById("start").style.visibility = "visible";

        document.getElementById("result").innerHTML = "Result :-";

        random = Math.floor(Math.random() * 10) + 1;
        document.getElementById("target").innerHTML = "Draw :" + task[random];
        target = task[random];
    };
    points();
}

function next() {

    document.getElementById("timer_p").innerHTML = "00 : 00";
    s = 0
    clearInterval(t);


    //randomizing the target
    random = Math.floor(Math.random() * 10) + 1;
    document.getElementById("target").innerHTML = "Draw :" + task[random];
    target = task[random];

    document.getElementById("next").style.visibility = "hidden";
    document.getElementById("start").style.visibility = "visible";

    document.getElementById("result").innerHTML = "Result :-";

    canvas.strokeWeight(0);
    canvas.stroke(0);

}

function points() {
    console.log(target);
    if (target == ans) {
        document.getElementById("next").style.visibility = "hidden";
        document.getElementById("start").style.visibility = "visible";

        random = Math.floor(Math.random() * 10) + 1;
        document.getElementById("target").innerHTML = "Draw :" + task[random];
        target = task[random];

        score = score + 10;
        document.getElementById("score").innerHTML = "Points :" + score;
        console.log(score);
        document.getElementById("timer_p").innerHTML = "00 : 00";
        s = 0;

        document.getElementById("result").innerHTML = "Result :-";

        clearInterval(t);
        background("white");
    }
}