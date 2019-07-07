var charHp = 50;
var mobHp = 50;

var enterBattle = function(){
    eastBtn.style.visibility = 'hidden';
    westBtn.style.visibility = 'hidden';
    nthBtn.style.visibility = 'hidden';
    sthBtn.style.visibility = 'hidden';
    atkBtn.style.visibility = 'visible';
    fleeBtn.style.visibility = 'visible';
/*    var createAtkBtn = document.createElement("button"); //create attack button
    createAtkBtn.innerText = "Attack"
    createAtkBtn.setAttribute("class", "battle");
    createAtkBtn.setAttribute("id", "atkBtn");
    document.body.appendChild(createAtkBtn);
    var createFleeBtn = document.createElement("button"); //create flee button
    createFleeBtn.innerText = "Flee";
    createFleeBtn.setAttribute("class", "battle");
    createFleeBtn.setAttribute("id", "fleeBtn");
    document.body.appendChild(createFleeBtn);*/

    // var atkBtn = document.getElementById("atkBtn");
    atkBtn.addEventListener("click", attackMode);

    // var fleeBtn = document.getElementById("fleeBtn");
    fleeBtn.addEventListener("click", function(){
        var canFlee = Math.random();
        if (canFlee <= 0.6){
            display(`You run for your life!`);
            fleeBtn.style.visibility = 'hidden';
            atkBtn.style.visibility = 'hidden';
            navVis();
        } else {
            display(`You failed to flee...`);
            setTimeout(attackMode, 5000);
        }
    });
};

var attackMode = function() {
    if (mobHp > 0 && charHp > 0) {
        atkBtn.addEventListener("click", attackMode);
        fleeBtn.style.visibility = 'hidden';
        var dmg = Math.floor(Math.random() * 10); //your damage
        mobHp = mobHp - dmg;
        console.log("mob hp: " + mobHp);
        var mobDmg = Math.floor(Math.random() * 10);
        charHp = charHp - mobDmg;
        console.log("Character hp: " + charHp);
        display(`You did ${dmg} damage! the mob's hp is ${mobHp}. <br> The mob has hit you for ${mobDmg} damage! Your hp is now ${charHp}.`);
    } else if (mobHp > 0 && charHp <=0){
        display(`sorry, you have died.`);
    } else if (mobHp <= 0 && charHp > 0){
        console.log('mobHp is: ' + mobHp);
        setTimeout(function(){display(`You've killed the monster!`);}, 5000);
        atkBtn.style.visibility = 'hidden';
        navVis();
    }
};