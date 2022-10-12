// Main Page Variables
// let submitButton = $('#submitBtn');
// let firstName = $('#first_name');
// let userMotivator = $('#motivator');
let userInfo = {};

// exp bar
let exp = 0;
let level = 1;
var easyEXP = document.querySelector("#easy");
var mediumEXP = document.querySelector("#medium");
var hardEXP = document.querySelector("#hard");
var lvlNotify = document.querySelector(".levelNotify");
var lvlPercentage = document.querySelector(".levelPrcnt");
// Hobby Page Variables
let userNameHere = $('#userNameHere');
let taskButton = $('#taskBtn');
let listedTasks = $('#taskList');
let subtaskBtn = document.createElement("button");
let youtubeAPIKey = `AIzaSyAeZ3OPG8Md9rwhI3CzE3KoUWYC45JHKWw`
let storedMultipleTasks



// Checks to see if the user has created a locally stored profile here before, if not then they are sent to the userForm.html page to make a new profile
// On page load inserts a welcome message for the user based on the name they stored locally
function loadUserData() {
    let loadUser = JSON.parse(localStorage.getItem("User"));
    if (loadUser == null) {
        window.location.href = "./pages/userForm.html";
        return
    }
    document.querySelector('#userNameHere').textContent = "Welcome, " + loadUser.name;
    checkTasks();
};



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


// takes the exp value from the task object and returns a string equivalent to the exp level.
function dropdownTranslate1(exp) {
    if (exp == 1) {
        return "Easy";
    } else if (exp == 2) {
        return "Medium";
    } else {
        return "Hard";
    }
};

// Checks if there are stored tasks in local storage, if there are none then it changes a global variable (storedMultipleTasks) to an empty array
// For each item in the array, run a for loop that runs createCard on that task
function checkTasks() {
    storedMultipleTasks = JSON.parse(localStorage.getItem("MultiTask"));
    console.log(storedMultipleTasks);
    if (storedMultipleTasks == null) {
        storedMultipleTasks = [];
    }
    console.log(storedMultipleTasks);
    for (let i = 0; i < storedMultipleTasks.length; i++) {
        createCard(storedMultipleTasks[i]);
    }
};


// TODO: Create a card for task(s)
function createCard(task) {

    console.log("taskbutton clicked");
    let div = document.createElement("div");
    let h3 = document.createElement("h3");
    let h4 = document.createElement("h4");
    let p = document.createElement("p");
    let img = document.createElement("img");
    let textarea = document.createElement("textarea");


    div.setAttribute("class", "task container z-depth-3 p-2");
    h3.innerText = task.taskName;
    h4.innerText = dropdownTranslate1(task.exp);
    subtaskBtn.innerText = `Create Subtask`;
    subtaskBtn.setAttribute(`id`, `subtask-btn`)
    textarea.innerText = "Notes go here!";
    textarea.setAttribute("class", "white");

    listedTasks.append(div);
    div.append(h3, h4, p, textarea, subtaskBtn, textarea);
    p.append(img);
};

// create subtasks button
$(document).click(function (event) {
    if (event.target.id === `subtask-btn`) {
        console.log(`subtask button clicked`);
        var checkboxContainer = $(`<form><p>
        <label>
          <input type="checkbox" />
          <span><input type="text"</span>
        </label>
      </p></form>`)
        $(`textarea`).after(checkboxContainer)
    } else {
        return;
    }
})


// Launches the modal window
function toggleModal() {
    var instance = M.Modal.getInstance($('#modal3'))
    instance.open();
};


// Creates an object that locally stores the most recent input value
// Adds that object to the global variable (which is an array) storedMultipleTasks
// Makes a new card with the most recent taskDetails
function createTask() {
    let taskDetails = {
        taskName: document.querySelector('#taskName').value,
        exp: document.querySelector('#difficultySelect').value,
        // subtasks: document.querySelector('#subtaskSelect').value
    };

    storedMultipleTasks.push(taskDetails);
    localStorage.setItem("MultiTask", JSON.stringify(storedMultipleTasks));
    createCard(taskDetails);
};

// proof of concept youtube API fetch
fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=cats&key=AIzaSyAeZ3OPG8Md9rwhI3CzE3KoUWYC45JHKWw`)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
    })

var motivSec = ("");
// proof of concept motivational quote api
function displayMotiv(mwords) {
    console.log(mwords)
    motivSec = document.querySelector("#motivating")
    motivSec.textContent = mwords.quote + ". " + mwords.person
    motivSec = mwords.quote + ". " + mwords.person
    console.log(mwords.quote, "1")
    // pirate translator api
    function displayPirate(pwords) {
        console.log(pwords)
        var pirateSec = document.querySelector("#demotivating")
        pirateSec.textContent = pwords.contents.translated
        console.log(pwords.contents.translated)
    }

    var pirateURL = 'https://api.funtranslations.com/translate/pirate.json?text=' + motivSec;
    console.log(pirateURL)
    fetch(pirateURL)
        .then(function (response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function (data) {

                    displayPirate(data);
                })
            }
        })
    return motivSec

}
fetch(`https://motivational-quote-api.herokuapp.com/quotes/random`)
    .then(function (response) {
        console.log(response);
        if (response.ok) {
            response.json().then(function (data) {

                displayMotiv(data);
            })
        }
    })
console.log(motivSec, "after return")

// ========================================================

function updateEasy() {
    exp += 25;

    if (exp >= 100) {
        level += 1;
        //add a level up
        document.querySelector(".skillLevel").textContent = `${level}`;
        exp -= 100;

        //remove the percentage then show again
        lvlPercentage.style.visibility = "hidden";
        setTimeout(() => {
            lvlPercentage.style.visibility = "visible";
        }, 4000);
        //notify the user that they lvled up
        lvlNotify.style.transition = 'none';
        lvlNotify.style.opacity = '1';
        void lvlNotify.offsetWidth;

        lvlNotify.style.transition = 'opacity 5s';
        lvlNotify.style.opacity = '0';
    }
    document.querySelector(".levelFill").style.width = `${exp}%`;
    document.querySelector(".levelPrcnt").textContent = `${exp}%`;
}

function updateMedium() {
    exp += 50;

    if (exp >= 100) {
        level += 1;
        //add a level up
        document.querySelector(".skillLevel").textContent = `${level}`;
        exp -= 100;

        //remove the percentage then show again
        lvlPercentage.style.visibility = "hidden";
        setTimeout(() => {
            lvlPercentage.style.visibility = "visible";
        }, 4000);
        //notify the user that they lvled up
        lvlNotify.style.transition = 'none';
        lvlNotify.style.opacity = '1';
        void lvlNotify.offsetWidth;

        lvlNotify.style.transition = 'opacity 5s';
        lvlNotify.style.opacity = '0';
    }

    document.querySelector(".levelFill").style.width = `${exp}%`;
    document.querySelector(".levelPrcnt").textContent = `${exp}%`;
}

function updateHard() {
    exp += 75;

    if (exp >= 100) {
        level += 1;
        //add a level up
        document.querySelector(".skillLevel").textContent = `${level}`;
        exp -= 100;

        //remove the percentage then show again
        lvlPercentage.style.visibility = "hidden";
        setTimeout(() => {
            lvlPercentage.style.visibility = "visible";
        }, 4000);
        //notify the user that they lvled up
        lvlNotify.style.transition = 'none';
        lvlNotify.style.opacity = '1';
        void lvlNotify.offsetWidth;

        lvlNotify.style.transition = 'opacity 5s';
        lvlNotify.style.opacity = '0';
    }

    document.querySelector(".levelFill").style.width = `${exp}%`;
    document.querySelector(".levelPrcnt").textContent = `${exp}%`;
}

// easyEXP.addEventListener("click", () => updateEasy(25));
// completebtn.addEventListener("click", function(event) {
// figure out exp diffculty of completede task 
// updateexp(expvalue)
// })
easyEXP.addEventListener("click", updateEasy);
mediumEXP.addEventListener("click", updateMedium);
hardEXP.addEventListener("click", updateHard);

// Launches welcome statement
loadUserData();

// Modal function
$(document).ready(function () {
    $('.modal').modal();
    $('.parallax').parallax();
});