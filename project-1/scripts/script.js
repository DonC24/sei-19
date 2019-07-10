console.log("hello script js");

var display = function( data ){
    var output = document.querySelector('#output');
    output.innerHTML = data;
};

var pEle = null;
var playerName = null;
var currentRm = 0;
var playerTurnCount = 0;
var mainImg = document.getElementById("main-img-tag");
var miniMap = document.getElementById("mapimg");
var monsterImg = document.getElementById("monster-img");
var rmExits = Object.keys(rooms[currentRm].exits);
var battleMode = false; //check if in battle

var nthBtn = document.getElementById("btn-north");
var sthBtn = document.getElementById("btn-south");
var eastBtn = document.getElementById("btn-east");
var westBtn = document.getElementById("btn-west");
var atkBtn = document.getElementById("atkBtn");
var fleeBtn = document.getElementById("fleeBtn");
var charaBtn = document.getElementById("chara");

if (currentRm === 0 && playerTurnCount === 0){ //just to ensure it is a new game
    mainImg.src= "images/entrance-resized.jpg";
    display(`Hello adventurer. Welcome to the novice academy. How shall we address you?`);
    nthBtn.style.visibility = 'hidden';
    sthBtn.style.visibility = 'hidden';
    eastBtn.style.visibility = 'hidden';
    westBtn.style.visibility = 'hidden';
    atkBtn.style.visibility = 'hidden';
    fleeBtn.style.visibility = 'hidden';
    charaBtn.style.visibility = 'hidden';
}

var navVis = function() { //check exits and updates movement buttons
    console.log('in navVis func, current room is: ' + currentRm);
    charaBtn.style.visibility = 'visible';
    atkBtn.style.visibility = 'hidden';
    fleeBtn.style.visibility = 'hidden';
    rmExits = Object.keys(rooms[currentRm].exits);
    if (rmExits.includes("north")){
        console.log('North btn is visible');
        //console.log("north btn. current room is " + currentRm);
        // nthBtn.style.visibility = 'visible';
        nthBtn.disabled = false;
    } else {
        console.log('North btn is not visible');
        //nthBtn.style.visibility = 'hidden';
        nthBtn.disabled = true;
    }
    if (rmExits.includes("south")){
        console.log('south btn is visible');
        // sthBtn.style.visibility = 'visible';
        sthBtn.disabled = false;
    } else {
        console.log('south btn is not visible');
        //sthBtn.style.visibility = 'hidden';
        sthBtn.disabled = true;
    }
    if (rmExits.includes("east")){
        console.log('east btn is visible');
        // eastBtn.style.visibility = 'visible';
        eastBtn.disabled = false;
    } else {
        console.log('east btn is not visible');
        //eastBtn.style.visibility = 'hidden';
        eastBtn.disabled = true;
    }
    if (rmExits.includes("west")){
        console.log('west btn is visible');
        // westBtn.style.visibility = 'visible';
        westBtn.disabled = false;
    } else {
        console.log('west btn is not visible');
        //westBtn.style.visibility = 'hidden';
        westBtn.disabled = true;
    }
};



document.getElementById("submit-btn").addEventListener("click", function(){ //first run only. waiting for player to input name
    var inputResults = document.getElementById('inputtxt').value;
    console.log("input value: " + inputResults);
    if(playerTurnCount === 0){
        playerName = inputResults;
        console.log("player name: " + playerName);
        playerTurnCount++;
    }
    var output = `Welcome ${playerName}! The novice academy will prepare you for the world outside. Feel free to explore our academy, but be warned that you might encounter some danger while on our grounds. <p>The first quest that you shall receive is ${allQuest[questCounter].name}, please ${allQuest[questCounter].objective}.</p> <p>I look forward to seeing you again.</p>`
    display(output);
    document.getElementById("submit-btn").style.visibility = 'hidden';
    document.getElementById("inputtxt").style.visibility = 'hidden';
    nthBtn.style.visibility = 'visible';
    sthBtn.style.visibility = 'visible';
    eastBtn.style.visibility = 'visible';
    westBtn.style.visibility = 'visible';
    currentRm = 0;
    mainImg.src = rooms[currentRm].imgsrc;
    miniMap.src= rooms[currentRm].map;
    navVis();
});

var completed = function() {
        pEle = document.createElement("span");
        pEle.innerHTML = `<h3>Player Name: ${playerName}</h3> <br> <p>Player HP: ${charHp}/${charTotalHp} <br> Class: Novice <br> Currently there are no stats to display.</p> <hr> <h3>Quest Log</h3> <br> Name: ${allQuest[questCounter].name} <br> Quest: ${allQuest[questCounter].objective} <br> <br> <h3>Completed Quests</h3> <br> `
        var ulEle = document.createElement("ul");
        for (let i = 0; i < questComplete.length; i++){
            var liEle = document.createElement("li");
            console.log(questComplete[i].name);
            console.log(questComplete[i].objective);
            liEle.innerHTML = `Name: ${questComplete[i].name} <br> Quest: ${questComplete[i].objective}`;
            ulEle.appendChild(liEle);
            ulEle.style.listStyleType = "none";
        }
        pEle.appendChild(ulEle);

    }

var createScore = function(){ //create score sheet
    var scorediv = document.getElementById("overlay");
    while (scorediv.hasChildNodes()){
        scorediv.removeChild(scorediv.firstChild);
    }

    console.log("in create score");

    completed();

    scorediv.appendChild(pEle);
    scorediv.style.display = "flex";


};

var newCanFlee = function() { //calculate if can flee
    if (battleMode === true) {
        var canFlee = Math.random();
        console.log(canFlee);
        console.log("current room: " + currentRm);
        if (canFlee > 0.6){
            console.log("you fleee");
            display(`You run for your life!`);
            fleeBtn.style.visibility = 'hidden';
            atkBtn.style.visibility = 'hidden';
            currentRm = 2;
            setTimeout(function() {
                console.log("battle flee")
                display(rooms[currentRm].description);
                mainImg.src= rooms[currentRm].imgsrc;
                miniMap.src= rooms[currentRm].map;
                monsterImg.style.visibility = 'hidden';
                navVis();
            }, 2000);
            battleMode = false;
        }
        else {
            console.log("you failed to flee");
            display(`You failed to flee...`);
            fleeBtn.style.visibility = 'hidden';
             setTimeout(function(){
                //display(`Going in to battle! Get ready!`);
                attackMode();
             }, 2000);
        }
    }
};



window.onload = function() {

        atkBtn.addEventListener("click", attackMode); //attack button


    // var fleeBtn = document.getElementById("fleeBtn");
    fleeBtn.addEventListener("click", newCanFlee); //flee button

    charaBtn.addEventListener("click", createScore); //score button
    document.getElementById("overlay").addEventListener("click", function(){
        document.getElementById("overlay").style.display = "none";
    })

    //movement button event listeners
    nthBtn.addEventListener("click", function(){
            var newRm = rooms[currentRm].exits.north;
            currentRm = newRm;
            console.log(`north bth is clicked. Current room is ${currentRm}`);
            if (currentRm === 3 && Math.random() <= 0.8){
                mainImg.src= "images/forest-battle-resized.jpg"; //battle img
                miniMap.src= rooms[currentRm].map;
                enterBattle();
            } else {
            mainImg.src = rooms[currentRm].imgsrc;
            miniMap.src= rooms[currentRm].map;
            display(rooms[currentRm].description); //set room image
            console.log('current room is: ' + currentRm + ' New room: ' + newRm);
            navVis();
            return currentRm;
            }
        });

    sthBtn.addEventListener("click", function(){
            var newRm = rooms[currentRm].exits.south;
            currentRm = newRm;
            mainImg.src= rooms[currentRm].imgsrc;
            miniMap.src= rooms[currentRm].map;
            display(rooms[currentRm].description);
            console.log('current room is: ' + currentRm + ' New room: ' + newRm);
            navVis();
            return currentRm;
        });

    eastBtn.addEventListener("click", function(){
            var newRm = rooms[currentRm].exits.east;
            currentRm = newRm;
            mainImg.src= rooms[currentRm].imgsrc;
            miniMap.src= rooms[currentRm].map;
            display(rooms[currentRm].description);
            console.log('current room is: ' + currentRm + ' New room: ' + newRm);
            navVis();
            return currentRm;
        });

    westBtn.addEventListener("click", function(){
            var newRm = rooms[currentRm].exits.west;
            currentRm = newRm;
            mainImg.src= rooms[currentRm].imgsrc;
            miniMap.src= rooms[currentRm].map;
            display(rooms[currentRm].description);
            console.log('current room is: ' + currentRm + ' New room: ' + newRm);
            navVis();
            return currentRm;
        });
}



/*function goto(direction){
    console.log('went to '+direction)
    direction = 'west'
    exits[direction]
    exits.west
}

gotoWestFunction = goto.bind(null, 'west')
EQUIVALENT TO
function gotoWestFunction(direction=west){
    blahblah
}*/