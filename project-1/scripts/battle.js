var charHp = 100;
var charTotalHp = 100;
var mob = null;
var mobHp = 0;
var battleWin = 0;
var questCounter = 0;
//var clickAtk = atkBtn.addEventListener("click", attackMode);

var hpReset = function(){
    charHp = charTotalHp; //reset character hp
};

var createRestart = function() {
    var restartBtn = document.createElement("button"); //create restart button
    restartBtn.innerText = "Restart the game"
    restartBtn.setAttribute("id", "restartBtn");
    document.getElementById("btns1").appendChild(restartBtn);
    restartBtn.addEventListener("click", function(){location.reload();});
};



var enterBattle = function(){
    console.log("battle start. Room is: " + rooms[currentRm]);
    eastBtn.style.visibility = 'hidden';
    westBtn.style.visibility = 'hidden';
    nthBtn.style.visibility = 'hidden';
    sthBtn.style.visibility = 'hidden';
    atkBtn.style.visibility = 'visible';
    fleeBtn.style.visibility = 'visible';

    mob = Math.floor(Math.random() * monster.length); //get random array number for total number of monsters
    console.log ("mob is: " + mob + "monster length: "+ monster.length);
    mobHp = monster[mob].monHp;
    monsterImg.src = monster[mob].imgsrc;
    monsterImg.style.visibility = 'visible';
    battleMode = true;

};


var attackMode = function() {
    console.log('Start attack mode');
    console.log("monster is: " + mob);
    if (mobHp > 0 && charHp > 0) {
        fleeBtn.style.visibility = 'hidden';
        var dmg = Math.floor(Math.random() * 11 + 3); //your damage
        mobHp = mobHp - dmg;
        console.log("mob hp: " + mobHp);
        var mobDmg = Math.floor(Math.random() * 10);
        charHp = charHp - mobDmg;
        console.log("char hp: " + mobHp);
        if (mobHp <= 0 && charHp > 0){
            console.log('In 1st if loop. mobHp is: ' + mobHp);
            display(`You've killed the ${monster[mob].name}!`);
            monsterImg.style.visibility = 'hidden';
            atkBtn.style.visibility = 'hidden';
            hpReset();
            if (battleWin < allQuest[questCounter].battleNeeded ){
                battleWin++;
                console.log("battleWin: "+ battleWin);
                if (battleWin === allQuest[questCounter].battleNeeded ){
                    alert(`You've completed the quest ${allQuest[questCounter].name}!`)
                    questComplete.push(allQuest[questCounter]);
                    questCounter++;
                }
            }
            battleMode = false;
            console.log("battle ended")
            navVis();
        } else if (mobHp > 0 && charHp <= 0){
            display(`Sorry, you have died.`);
            atkBtn.style.visibility = 'hidden';

            createRestart();

            battleMode = false;
        } else if (mobHp <= 0 && charHp <=0){
            display(`Sorry, you have died, but at least the ${monster[mob].name} is dead too!`);
            atkBtn.style.visibility = 'hidden';

            createRestart();

            battleMode = false;
        } else {
            console.log("Character hp: " + charHp);
            display(`You did ${dmg} damage! The ${monster[mob].name}'s hp is ${mobHp}. <br> The mob has hit you for ${mobDmg} damage! Your hp is now ${charHp}.`);
        }
    }
};