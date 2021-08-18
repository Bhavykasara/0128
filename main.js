song="";
sound="";

function preload() {
    //song=loadSound("music.mp3");
    //sound=loadSound("m2.mp3");
}

song = new Audio('music.mp3');
sound= new Audio('m2.mp3');

rws=0;
lws=0;
rwx=0;
rwy=0;
lwx=0;
lwy=0;

function setup() {
    canvas=createCanvas(400,300);
    canvas.center();

    vedio=createCapture(VIDEO);
    vedio.hide();

    poseNet=ml5.poseNet(vedio,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded() {
    console.log("model is loaded");
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results);

        rws=results[0].pose.keypoints[10].score;
        lws=results[0].pose.keypoints[9].score;

        rwx=results[0].pose.rightWrist.x;
        rwy=results[0].pose.rightWrist.y;

        lwx=results[0].pose.leftWrist.x;
        lwy=results[0].pose.leftWrist.y;
    }
}

function draw() {
    image(vedio,0,0,400,300);
    
    if (lws>0.1) {
        song.pause();
        sound.play();
        //document.getElementById("sang").innerHTML="Song - One more Round";
    }

    if (rws>0.1) {
        sound.pause();
        song.play();
        //document.getElementById("sang").innerHTML="Song - One more Round";
    }
}