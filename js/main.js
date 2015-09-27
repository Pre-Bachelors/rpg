// get elements
var achieve = document.querySelectorAll('.no');
var currentlevel = document.querySelectorAll('.level');
var nextLevel = document.querySelectorAll('.next_level');
var progressBar = document.getElementById('p_bar');
var prize = document.getElementById('prize');
var currentExp = document.getElementById('exp');
var nextEpx = document.getElementById('next_exp');

// define points per achievement, exp necessary and prize per level up
var points = [300, 75, 1000, 100, 150, 50, 500];
var levelUp = [500, 1250, 2500, 4250, 6500, 9250, 12500, 16250, 20500, 25250, 30500];  //250*(x^2) + 250
var prizes = ["1 trip wherever<br />1 extra episode", "1 extra movie<br />treat yourself to a nice gift", "you can add a \'modify\' webpage to this website, allowing the user to update the rewards there (and optionally allow them to define level up exp, and achievement exp)<br />do something nice (i.e. go out for sushi)", "Celebrate!", "l5", "l6", "l7", "l8", "l9", "l10 + exp. bonus"];
var exp = 0;
var level = 0;
var achievements;

// create or retrieve object containing data
if (!localStorage["achievements"]) {
    achievements = new Object();
    if (achieve.length > 0) {
        for (var i = 0; i < achieve.length; i++) {
            achievements[achieve[i].id] = 0;
        }
    }
} else {
    // access memory to get object  
    achievements = load();
}

// update achievements and calculate experience
if (achieve.length > 0) {
    for (var i = 0; i < achieve.length; i++) {
        achieve[i].textContent = achievements[achieve[i].id] + "x ";
        exp += achievements[achieve[i].id] * points[i];
    }
}

// calculate level
for (var i = 0; exp > levelUp[i]; i++) {
    level++;
}

// update level, next level
if (currentlevel.length > 0) {
    for (var i = 0; i < currentlevel.length; i++) {
        currentlevel[i].textContent = level;
    }
}
if (nextLevel.length > 0) {
    for (var i = 0; i < nextLevel.length; i++) {
        nextLevel[i].textContent = level + 1;
    }
}

//update progress bar
progressBar.setAttribute('value', exp);
progressBar.setAttribute('max', levelUp[level]);
progressBar.textContent = exp;

// update prizes
prize.innerHTML = prizes[level];

// update exp and level up exp - spaces added for esthetical reasons
currentExp.textContent = exp;
nextEpx.textContent = levelUp[level];



// Functions to load & save objects using localStorage, credit to Dan Cruickshank,
// http://getfishtank.ca/blog/using-html5-localstorage-to-store-json
function load() {
  	return JSON.parse(localStorage["achievements"]);
}
 
function save(obj) {
		localStorage["achievements"] = JSON.stringify(obj);
}