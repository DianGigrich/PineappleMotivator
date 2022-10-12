// Main Page Variables
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
let youtubeAPIKey1 = `AIzaSyAeZ3OPG8Md9rwhI3CzE3KoUWYC45JHKWw`;
let youtubeAPIKey2 = `AIzaSyCeygEJTKDYacxfKLnZwWv2EiFnAhQUb_8`;
let youtubeSearch = ``;
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


// Create a card for task(s)
// list of variables that create elements 
// call on said variables in a specific order to create task cards
function createCard(task) {

    console.log("taskbutton clicked");
    let div = document.createElement("div");
    let h3 = document.createElement("h3");
    let h4 = document.createElement("h4");
    let p = document.createElement("p");
    let img = document.createElement("img");
    let subtaskBtn = document.createElement("button");
    let saveBtn = document.createElement("button");
    let textarea = document.createElement("textarea");


    div.setAttribute("class", "task container z-depth-3 p-2");
    div.id = task.taskName;
    h3.innerText = task.taskName;
    h4.innerText = dropdownTranslate1(task.exp);
    subtaskBtn.innerText = `Create Subtask`;
    subtaskBtn.setAttribute(`class`,`subtask-btn`)
    saveBtn.innerText = "Save changes!";
    saveBtn.setAttribute("class", "saveBtn");
    textarea.innerText = task.savedNote || "Notes go here!";
    textarea.id = "textarea-" + task.taskName;  
    textarea.setAttribute("class", "white");

    listedTasks.append(div);
    div.append(h3, h4, p, textarea, subtaskBtn, textarea, saveBtn);
    p.append(img);
};

listedTasks.on("click", ".saveBtn", function(event) {
    saveChanges(event.target);
})

function saveChanges(clicked) {
    // which task
    let task = clicked.parentElement.id;
    let taskObject 
    let index
    for (let i = 0; i < storedMultipleTasks.length; i++) {
        const element = storedMultipleTasks[i];
        if (element.taskName == task) {
            taskObject = element;
            index = i;
        }        
    } 

    let newNotes = document.getElementById("textarea-" + taskObject.taskName).value;
    storedMultipleTasks[index].savedNote = newNotes;
    localStorage.setItem("MultiTask", JSON.stringify(storedMultipleTasks));
    
};

// create subtasks button
$(document).click(function (event) {
    var clicked = event.target;
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
    } else {
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

// textarea local storage pseudo-code
// get the array
// get the specific object (event.target probs?) based on the click
// add another element to that object
//

// what if user creates new subtasks?


// load textarea local storage pseudo-code
// get the array
// get the specific objects
// return them in the same order as they get grabbed? into the corresponding text areas





// Creates an object that locally stores the most recent input value
// Adds that object to the global variable (which is an array) storedMultipleTasks
// Makes a new card with the most recent taskDetails
function createTask() {
    let taskDetails = {
        taskName: document.querySelector('#taskName').value,
        exp: document.querySelector('#difficultySelect').value,
        savedNote: "",
        subtaskArray: []
        // subtasks: document.querySelector('#subtaskSelect').value
    };

    // checks to see if there are any other tasks with the same name, if there are then a message is displayed
    let taskNames = storedMultipleTasks.map(function(element) {
        return element.taskName;    
    })

    if (taskNames.includes(taskDetails.taskName)) {
        $('#taskName').after("You already have a task created with this name");
        return;
    }

    storedMultipleTasks.push(taskDetails);
    localStorage.setItem("MultiTask", JSON.stringify(storedMultipleTasks));
    createCard(taskDetails);
};

// proof of concept youtube API fetch
// fetch (`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${youtubeSearch}&key=AIzaSyCeygEJTKDYacxfKLnZwWv2EiFnAhQUb_8`)
// .then (function(response) {
//     return response.json()
// })
// .then (function (data) {
//     console.log (data)
// })

var motivSec = ("");
// proof of concept motivational quote api
function displayMotiv(mwords) {
    console.log(mwords)
    motivSec = document.querySelector("#motivating")
    motivSec.textContent = mwords.quote + ". " + mwords.person
    motivSec = mwords.quote + ". " + mwords.person
    console.log(mwords.quote, "1")
    // pirate translator api==================================================
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

    //                 displayPirate(data);
    //             })
    //         }
    //     })
    // return motivSec

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
        toggleYoutubeModal()
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
        toggleYoutubeModal()
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
        toggleYoutubeModal()
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