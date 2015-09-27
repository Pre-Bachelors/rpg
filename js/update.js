// get form elements
var no_achieve = document.querySelectorAll('input[type="text"]');
var form = document.getElementsByTagName('form')[0];
var achieve_field = document.getElementsByTagName('div')[0];
var save_home = document.getElementById('save'); 
var updated = false;
var achievements;

//initialize form
function initializeForm() {
    // access memory to get object  
    achievements = load();

    // update achievements input field
    if (no_achieve.length > 0) {
        for(var i = 0; i < no_achieve.length; i++) {
            no_achieve[i].value = achievements[no_achieve[i].id];
        }
    }
}


// make buttons work
function updateForms(e) {
    
    // select button that contains image
    var target = e.target.parentNode;

    // check target is a button
    if (target.className == 'add') {
        // get input el
        var form_input = target.previousSibling;
        // increment and update attribute value
        form_input.value++;
    } else if (target.className == 'minus') {
        // get input el
        var text_input = target.previousSibling.previousSibling;    
        // decrement and update attribute value
        if (text_input.value > 0) {
            text_input.value--;
        }
    }
    e.preventDefault(); 
}

// save form in object
function saveHome(e) {
    
    achievements = new Object();
    
    if (no_achieve.length > 0) {
        for(var i = 0; i < no_achieve.length; i++) {
            achievements[no_achieve[i].id] = no_achieve[i].value;
        }
    }

    // save object
    save(achievements);
    updated = true;
    
    e.preventDefault();
    
    // go back to home screen
    window.location.replace("index.html");
}

// change css class to indicate element is modifiable
function updateInput() {
    if (no_achieve.length > 0) {
        for(var i = 0; i < no_achieve.length; i++) {
            no_achieve[i].className = 'active';
        }
    }
}
function restoreInput() {
    if (no_achieve.length > 0) {
        for(var i = 0; i < no_achieve.length; i++) {
            no_achieve[i].removeAttribute('class');
        }
    }
}


// Functions to load & save objects using localStorage, credit to Dan Cruickshank,
// http://getfishtank.ca/blog/using-html5-localstorage-to-store-json
function load() {
  	return JSON.parse(localStorage["achievements"]);
};
 
function save(obj) {
		localStorage["achievements"] = JSON.stringify(obj);
};


// events
window.addEventListener('load', initializeForm, false);
achieve_field.addEventListener('mouseover', updateInput, false);
achieve_field.addEventListener('mouseout', restoreInput, false);
achieve_field.addEventListener('click', updateForms, false);
form.addEventListener('submit', saveHome, false);


// warn user form has not been saved if they try to leave
window.addEventListener('beforeunload', function() {
    if (!updated) {
        return 'Your changes have not been saved.';
    }
}, false);