var charHp = 50;
var mobHp = 50;

//var clickAtk = atkBtn.addEventListener("click", attackMode);

var hpReset = function(){
    charHp = 50; //reset character hp
    mobHp = 50; //reset mob hp
};

var enterBattle = function(){
    eastBtn.style.visibility = 'hidden';
    westBtn.style.visibility = 'hidden';
    nthBtn.style.visibility = 'hidden';
    sthBtn.style.visibility = 'hidden';
    atkBtn.style.visibility = 'visible';
    fleeBtn.style.visibility = 'visible';

    atkBtn.addEventListener("click", attackMode);

    // var fleeBtn = document.getElementById("fleeBtn");
    fleeBtn.addEventListener("click", function(){
        var canFlee = Math.random();
        if (canFlee < 0.6){
            display(`You run for your life!`);
            fleeBtn.style.visibility = 'hidden';
            atkBtn.style.visibility = 'hidden';
            hpReset();
            currentRm = 2;
            setTimeout(function() {
                display(rooms[currentRm].description);
                navVis();
            }, 3000);

        } else {
            display(`You failed to flee...`); //why does failing to flee still proc navVis????
            setTimeout(function(){
                display(`Going in to battle! Get ready!`);
                attackMode();
            }, 3000);
            //setTimeout(attackMode, 5000);
        }
    });
};


var attackMode = function() {
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
            display(`You've killed the monster!`);
            atkBtn.style.visibility = 'hidden';
            hpReset();
            navVis();
        } else if (mobHp > 0 && charHp < 0){
            display(`Sorry, you have died.`);
            atkBtn.style.visibility = 'hidden';
            var createRestart = document.createElement("button"); //create restart button
            createRestart.innerText = "Restart the game"
            createRestart.setAttribute("id", "restartBtn");
            document.body.appendChild(createRestart);
            var restartBtn = document.getElementById("restartBtn");
            restartBtn.addEventListener("click", function(){location.reload();});
        } else if (mobHp <= 0 && charHp <=0){
            display(`Sorry, you have died, but at least the monster is dead too!`);
            atkBtn.style.visibility = 'hidden';
            var createRestart = document.createElement("button"); //create restart button
            createRestart.innerText = "Restart the game"
            createRestart.setAttribute("id", "restartBtn");
            document.body.appendChild(createRestart);
            var restartBtn = document.getElementById("restartBtn");
            restartBtn.addEventListener("click", function(){location.reload();});
        } else {
            console.log("Character hp: " + charHp);
            display(`You did ${dmg} damage! The mob's hp is ${mobHp}. <br> The mob has hit you for ${mobDmg} damage! Your hp is now ${charHp}.`);
        }
    }
};