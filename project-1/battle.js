var charHp = 100;
var charTotalHp = 100;
var mob = null;
//var clickAtk = atkBtn.addEventListener("click", attackMode);

var hpReset = function(){
    charHp = charTotalHp; //reset character hp
};

var enterBattle = function(){
    eastBtn.style.visibility = 'hidden';
    westBtn.style.visibility = 'hidden';
    nthBtn.style.visibility = 'hidden';
    sthBtn.style.visibility = 'hidden';
    atkBtn.style.visibility = 'visible';
    fleeBtn.style.visibility = 'visible';

    mob = Math.floor(Math.random() * monster.length); //get random array number for total number of monsters
    console.log ("mob is: " + mob + "monster length: "+ monster.length);


    atkBtn.addEventListener("click", attackMode);

    // var fleeBtn = document.getElementById("fleeBtn");
    fleeBtn.addEventListener("click", function(){
        var canFlee = Math.random();
        console.log(canFlee);
        if (canFlee < 0.6){
            display(`You run for your life!`);
            fleeBtn.style.visibility = 'hidden';
            atkBtn.style.visibility = 'hidden';
            //hpReset();
            currentRm = 2;
            setTimeout(function() {
                display(rooms[currentRm].description);
                mainImg.src= rooms[currentRm].imgsrc;
                navVis();
            }, 2000);
        } else {
            display(`You failed to flee...`);
            fleeBtn.style.visibility = 'hidden';
             setTimeout(function(){
                display(`Going in to battle! Get ready!`);
                attackMode();
             }, 2000);
        }
    });
};


var attackMode = function() {
    //mainImg.src= "images/forest-battle.jpg";
    console.log('Start attack mode');
    var mobHp = monster[mob].monHp;
    console.log("monster is: " + mob);
    if (mobHp > 0 && charHp > 0) {
        // atkBtn.addEventListener("click", attackMode);
        fleeBtn.style.visibility = 'hidden';
        var dmg = Math.floor(Math.random() * 11); //your damage
        mobHp = mobHp - dmg;
        console.log("mob hp: " + mobHp);
        var mobDmg = Math.floor(Math.random() * 10);
        charHp = charHp - mobDmg;
        console.log("char hp: " + mobHp);
        if (mobHp <= 0 && charHp > 0){
            console.log('In 1st if loop. mobHp is: ' + mobHp);
            display(`You've killed the ${monster[mob].name}!`);
            atkBtn.style.visibility = 'hidden';
            hpReset();
            navVis();
        } else if (mobHp > 0 && charHp <= 0){
            display(`Sorry, you have died.`);
            atkBtn.style.visibility = 'hidden';
            var createRestart = document.createElement("button"); //create restart button
            createRestart.innerText = "Restart the game"
            createRestart.setAttribute("id", "restartBtn");
            document.body.appendChild(createRestart);
            var restartBtn = document.getElementById("restartBtn");
            restartBtn.addEventListener("click", function(){location.reload();});
        } else if (mobHp <= 0 && charHp <=0){
            display(`Sorry, you have died, but at least the ${monster[mob].name} is dead too!`);
            atkBtn.style.visibility = 'hidden';
            var createRestart = document.createElement("button"); //create restart button
            createRestart.innerText = "Restart the game"
            createRestart.setAttribute("id", "restartBtn");
            document.body.appendChild(createRestart);
            var restartBtn = document.getElementById("restartBtn");
            restartBtn.addEventListener("click", function(){location.reload();});
        } else {
            console.log("Character hp: " + charHp);
            display(`You did ${dmg} damage! The ${monster[mob].name}'s hp is ${mobHp}. <br> The mob has hit you for ${mobDmg} damage! Your hp is now ${charHp}.`);
        }
    }
};