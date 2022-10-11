// Main Page Variables
let submitButton = $('#submitBtn');
let firstName = $('#first_name');
let userMotivator = $('#motivator');
let userInfo = {};
let exp = 0;
let level = 1;
var easyEXP = document.querySelector("#easy");
var mediumEXP = document.querySelector("#medium");
var hardEXP = document.querySelector("#hard");
let lightMode = true;
let darkMode = false;
// Hobby Page Variables
let userNameHere = $('#userNameHere');
let taskButton = $('#taskBtn');
let listedTasks = $('#taskList');
let modeToggle = $(`input:checkbox`);
let youtubeAPIKey = `AIzaSyAeZ3OPG8Md9rwhI3CzE3KoUWYC45JHKWw`;


// Stores the user's info locally and then changes the page to the main hobby tracker page
submitButton.on('click', function() {
    console.log("clicked");


    let userInfo ={
        name: firstName.val(),
        motivator: userMotivator.val()
    };

    localStorage.setItem("User", JSON.stringify(userInfo));

    window.location.assign("./../index.html");

});


// On page load inserts a welcome message for the user based on the name they stored locally
function loadUserData() {
    let loadUser = JSON.parse(localStorage.getItem("User"));
    console.log(loadUser.name);
    document.querySelector('#userNameHere').textContent = "Welcome, " + loadUser.name;
};

// Launches welcome statement
loadUserData();

// Turns numeric values from dropdown input into words
function dropdownTranslate2() {
    let storedTasks = JSON.parse(localStorage.getItem("Task"));

    let label = document.createElement("label");
    let createInput = document.createElement("input");
    createInput.setAttribute("type", "checkbox");
    


    if (storedTasks.subtasks == 1) {
        return div.append(label), label.append(createInput);
    } else if (storedTasks.subtasks == 2) {
        return div.append(label), label.append(createInput), div.append(label), label.append(createInput);
    } else (storedTasks.subtasks == 3) 
        return div.append(label), label.append(createInput), div.append(label), label.append(createInput), div.append(label), label.append(createInput);
    

};

function dropdownTranslate1() {
    let storedTasks = JSON.parse(localStorage.getItem("Task"));

    if (storedTasks.exp == 1) {
        return "Easy";
    } else if (storedTasks.exp == 2) {
        return "Medium"; 
    } else    {
        return "Hard";
        }
};





// TODO: Create a card for task(s)
function createCard() {
    let storedTasks = JSON.parse(localStorage.getItem("Task"));

    console.log("taskbutton clicked");
    let div = document.createElement("div");
    let h3 = document.createElement("h3");
    let h4 = document.createElement("h4");
    let p = document.createElement("p");
    let textarea = document.createElement("textarea");
    
    
    div.setAttribute("class", "task container z-depth-3 p-2");
    h3.innerText = storedTasks.taskName;
    h4.innerText = dropdownTranslate1();
    textarea.innerText = "Notes go here!";
    textarea.setAttribute("class", "white");
           
    
    listedTasks.append(div);
    div.append(h3);
    div.append(h4);
    div.append(p);
    div.append(textarea);


};

// Modal function
$(document).ready(function() {
    $('.modal').modal();
    $('.parallax').parallax();
});


// Launches the modal window
function toggleModal() {
    var instance = M.Modal.getInstance($('#modal3'))
    instance.open();
};


// Creates an object that CURRENTLY locally stores the most recent input value
function createTask() {
    
    let taskDetails = {
        taskName: document.querySelector('#taskName').value,
        exp: document.querySelector('#difficultySelect').value,
        subtasks: document.querySelector('#subtaskSelect').value
    };
    
    localStorage.setItem("Task", JSON.stringify(taskDetails));
    
    console.log(taskDetails);

    createCard();
};


// proof of concept youtube API fetch
fetch (`https://www.googleapis.com/youtube/v3/search?part=snippet&q=dogs&key=AIzaSyAeZ3OPG8Md9rwhI3CzE3KoUWYC45JHKWw`)
.then (function(response) {
    return response.json()
})
.then (function (data) {
    console.log (data)
})


// proof of concept motivational quote api
fetch (`https://motivational-quote-api.herokuapp.com/quotes/random`)
.then (function (response) {
    return response.json()
})
.then (function (data) {
    console.log(data)
})


// proof of concept pirate translator api
function displayPirate(pwords) {
    console.log(pwords)
    var pirateSec = document.querySelector("#motivating")
    pirateSec.textContent = pwords.contents.translated
    console.log(pwords.contents.translated)
}

var pirateURL = "https://api.funtranslations.com/translate/pirate.json?text=Hello%20sir%21%20my%20mother%20goes%20with%20me%20to%20the%20ocean"
fetch(pirateURL)
    .then(function (response) {
        console.log(response);
        if (response.ok) {
            response.json().then(function (data) {

                displayPirate(data);
            })
        }
    })

    // ======================================================================== 

function updateEasy()
{
    exp += 25;
    
    if(exp >= 100)
    {
        level += 1;
        //add a level up
        document.querySelector(".levelPrcnt").textContent = "LEVELED UP!";
        document.querySelector(".skillLevel").textContent = `${"Level: " + level}`;
        exp -= 100;
    }
  document.querySelector(".levelFill").style.width = `${exp}%`;
  document.querySelector(".levelPrcnt").textContent = `${exp}%`;
}

function updateMedium()
{
    exp += 50;

    if(exp >= 100)
    {
        level += 1;
        //add a level up
        document.querySelector(".skillLevel").textContent = `${"Level: " + level}`;
        exp -= 100;
    }

  document.querySelector(".levelFill").style.width = `${exp}%`;
  document.querySelector(".levelPrcnt").textContent = `${exp}%`;
}

function updateHard()
{
    exp += 75;

    if(exp >= 100)
    {
        level += 1;
        //add a level up
        document.querySelector(".skillLevel").textContent = `${"Level: " + level}`;
        exp -= 100;
    }


  document.querySelector(".levelFill").style.width = `${exp}%`;
  document.querySelector(".levelPrcnt").textContent = `${exp}%`;
}

  easyEXP.addEventListener("click", updateEasy);
  mediumEXP.addEventListener("click", updateMedium);
  hardEXP.addEventListener("click", updateHard);

//   dark mode/light mode functions
function changeDark () {
    console.log(`I will change to dark mode`)
}
function changeLight () {
    console.log(`I will change to light mode`)
}


// dark mode toggle
modeToggle.on(`change`, function () {
    if (lightMode === true) {
        lightMode = false;
        darkMode = true;
        changeDark();
    } else {
        lightMode = true;
        darkMode = false;
        changeLight();
    }
})
