// Main Page Variables
// let submitButton = $('#submitBtn');
// let firstName = $('#first_name');
// let userMotivator = $('#motivator');
let userInfo = {};

// exp bar
let exp = 0;
let level = 1;
var easyEXP = document.querySelector(".easy");
var mediumEXP = document.querySelector(".medium");
var hardEXP = document.querySelector(".hard");
var lvlNotify = document.querySelector(".levelNotify");
var lvlPercentage = document.querySelector(".levelPrcnt");
// Hobby Page Variables
let userNameHere = $('#userNameHere');
let taskButton = $('#taskBtn');
let listedTasks = $('#taskList');
let youtubeAPIKey1 = `AIzaSyAeZ3OPG8Md9rwhI3CzE3KoUWYC45JHKWw`;
let youtubeAPIKey2 = `AIzaSyCeygEJTKDYacxfKLnZwWv2EiFnAhQUb_8`;
let youtubeSearch = ``;
let youtubeFetchBtn = $(`#youtube-fetch-btn`)
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
    youtubeSearch = loadUser.motivator
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
    let subtaskBtn = document.createElement("button");
    let completeBtn = document.createElement("button");
    let removeBtn = document.createElement("button");
    let textarea = document.createElement("textarea");


    div.setAttribute("class", "task container z-depth-3 p-2");
    completeBtn.innerText = `Project Completed!`;
    //completeBtn.setAttribute(`class`,`complete-project`);
    h3.innerText = task.taskName;
    h4.innerText = dropdownTranslate1(task.exp);
    subtaskBtn.innerText = `Create Subtask`;
    subtaskBtn.setAttribute(`class`,`subtask-btn`)
    textarea.innerText = "Notes go here!";
    textarea.setAttribute("class", "white");
    removeBtn.innerText = `Delete Project`;
    removeBtn.setAttribute(`class`,`delete-project`)
    
    if (task.exp == 1)
    {
        completeBtn.setAttribute('class', 'easy');
        div.append(completeBtn);
    }
    else if (task.exp == 2)
    {
        completeBtn.setAttribute('class', 'medium');
        div.append(completeBtn);
    }
    else
    {
        completeBtn.setAttribute('class', 'hard');
        div.append(completeBtn);
    }


    listedTasks.append(div);
    div.append(h3, h4, p, textarea, subtaskBtn, textarea, removeBtn);
    p.append(img);
};

// create subtasks, complete project, delete project
$(document).click(function (event) {
    var clicked = event.target;
    console.log(clicked)
    if (clicked.className ===`subtask-btn`) {
        console.log(`subtask button clicked`);
        var checkboxContainer = $(`<form><p>
        <label>
          <input type="checkbox" />
          <span><input type="text"</span>
        </label>
      </p></form>`)
        $(clicked).parent(`div`).append(checkboxContainer)
        // clicked.after(checkboxContainer)
    } 
    else if (clicked.className === `easy`)
    {
        // run exp function
        updateEasy();
        $(clicked).parent(`div`).hide()
    }
    
    else if (clicked.className === `medium`)
    {
        // run exp function
        updateMedium();
        $(clicked).parent(`div`).hide()
    } 

    else if (clicked.className === `hard`)
    {
        // run exp function
        updateHard();
        $(clicked).parent(`div`).hide()
    } 

    else if (clicked.className === `delete-project`) 
    {
        $(clicked).parent(`div`).hide()
    }
    else 
    {
        return;
    }
})


// Launches the modal window
function toggleModal() {
    var instance = M.Modal.getInstance($('#modal3'))
    instance.open();
};

function toggleYoutubeModal() {
    $(document).ready(function() {
        $('#modal4').modal();
        $('#modal4').modal(`open`);
        // $('.parallax').parallax();
    }); 
}


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
function fetchYoutube () {
    fetch (`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${youtubeSearch}&safeSearch=strict&videoDuration=short&key=AIzaSyCeygEJTKDYacxfKLnZwWv2EiFnAhQUb_8`)
    .then (function(response) {
        return response.json()
    })
    .then (function (data) {
        console.log (data)
        for (let i=0; i<5;i++) {
            $(`#url-${i+1}`).attr(`href`,`https://www.youtube.com/watch?v=${data.items[i].id.videoId}`)
            $(`#thumbnail-${i+1}`).attr(`src`,`${data.items[i].snippet.thumbnails.default.url}`)
            $(`#title-${i+1}`).text(`${data.items[i].snippet.title}`)
        }
    })  
}


var motivSec;
// proof of concept motivational quote api
function displayMotiv(mwords) {
    console.log(mwords)
    motivSec = document.querySelector("#motivating")
    motivSec.textContent = mwords.quote + ". " + mwords.person
    motivSec = mwords.quote + ". " + mwords.person
    console.log(mwords.quote, "1")
    // pirate translator api==================================================
    function displayPirate(pwords) {
        console.log(pwords)
        var pirateSec = document.querySelector("#demotivating")
        pirateSec.textContent = pwords.contents.translated
        console.log(pwords.contents.translated)

        
    }

    var pirateURL = 'https://api.funtranslations.com/translate/pirate.json?text='+ motivSec;
    console.log(pirateURL)
    fetch(pirateURL)
        .then(function (response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function (data) {
                 
                   displayPirate()
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
// ======================================ran out of times to do it, but it worked!
// proof of concept pirate translator api
// function displayPirate(pwords) {
//     console.log(pwords)
//     var pirateSec = document.querySelector("#demotivating")
//     pirateSec.textContent = pwords.contents.translated
//     console.log(pwords.contents.translated)
// }

// var pirateURL = 'https://api.funtranslations.com/translate/pirate.json?text='+ motivSec;
// console.log(pirateURL)
// fetch(pirateURL)
//     .then(function (response) {
//         console.log(response);
//         if (response.ok) {
//             response.json().then(function (data) {


// ========================================================

function updateEXP()
{
    level += 1;
        //add a level up
        toggleYoutubeModal()
        document.querySelector(".skillLevel").textContent = `${"Level: " + level}`;
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

function updateEasy() 
{
    exp += 25;

    if (exp >= 100) 
    {
        updateEXP();
    }
    document.querySelector(".levelFill").style.width = `${exp}%`;
    document.querySelector(".levelPrcnt").textContent = `${exp}%`;
}

function updateMedium()
{
    exp += 50;

    if (exp >= 100) 
    {
        updateEXP();
    }

    document.querySelector(".levelFill").style.width = `${exp}%`;
    document.querySelector(".levelPrcnt").textContent = `${exp}%`;
}

function updateHard() 
{
    exp += 75;

    if (exp >= 100) 
    {
        updateEXP();
    }

    document.querySelector(".levelFill").style.width = `${exp}%`;
    document.querySelector(".levelPrcnt").textContent = `${exp}%`;
}

// easyEXP.addEventListener("click", () => updateEasy(25));
// completebtn.addEventListener("click", function(event) {
// figure out exp diffculty of completede task 
// updateexp(expvalue)
// })

// Launches welcome statement
loadUserData();

// Modal function
$(document).ready(function () {
    $('.modal').modal();
    $('.parallax').parallax();
});

// pirate mode
var motivationalsChange = document.querySelector("article")

let modeToggle = $(`input:checkbox`);

// default mode to light
var mode = "light"

function toPirate () {
    console.log(`I will change to dark mode`)
    $(body).setAttrube("pirateBody")
}
function removePirate () {
    console.log(`I will change to light mode`)
}

// dark mode toggle
modeToggle.on(`change`, function () {
    if (mode === "light") {
        mode = "pirate"
       $('body').addClass("pirateBody")
       motivationalsChange.setAttribute("class", "pirateMotivationals")
     } 
    // remove pirate mode
    else {
        mode = "pirate";
       $('body').removeClass("pirateBody")
       motivationalsChange.removeAttribute("class", "pirateMotivationals")
       motivationalsChange.setAttribute("class", "motivationals")
    }
})
// fetches youtube data on button click
youtubeFetchBtn.on(`click`, fetchYoutube)