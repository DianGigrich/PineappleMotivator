// Main Page Variables
let submitButton = $('#submitBtn');
let firstName = $('#first_name');
let userMotivator = $('#motivator');
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


// Stores the user's info locally and then changes the page to the main hobby tracker page
submitButton.on('click', function() {
    console.log("clicked");
    
    let localStoredTaskList = [];
    console.log(localStoredTaskList);

    let userInfo ={
        name: firstName.val(),
        motivator: userMotivator.val()
    };

    localStoredTaskList.push(userInfo);
    console.log(localStoredTaskList);


    localStorage.setItem("User", JSON.stringify(userInfo));

    window.location.assign("C:\Users\krist\code\bootcamp\challenges\PineappleMotivator\index.html");

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
    let checkbox = document.querySelector("#hiddenCheckbox");
    let clonedCheckbox = checkbox.cloneNode(true);

    let textarea = document.createElement("textarea");
    
    
    div.setAttribute("class", "task container z-depth-3 p-2");
    h3.innerText = storedTasks.taskName;
    h4.innerText = dropdownTranslate1();
    subtaskBtn.innerText = `Create Subtask`;
    textarea.innerText = "Notes go here!";
    textarea.setAttribute("class", "white");
    clonedCheckbox.classList.remove("hide");


           
    
    listedTasks.append(div);
    div.append(h3);
    div.append(h4);

    div.append(p);
    div.append(clonedCheckbox);
    div.append(textarea);


    div.append(subtaskBtn);
    div.append(textarea);

};

// create subtasks button
subtaskBtn.click(function () {
    console.log(`clicked`)
})

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
fetch (`https://www.googleapis.com/youtube/v3/search?part=snippet&q=cats&key=AIzaSyAeZ3OPG8Md9rwhI3CzE3KoUWYC45JHKWw`)
.then (function(response) {
    return response.json()
})
.then (function (data) {
    console.log (data)
})

var motivSec = ("");
// proof of concept motivational quote api
function displayMotiv(mwords) {
    console.log(mwords)
    motivSec = document.querySelector("#motivating")
   motivSec.textContent = mwords.quote + ". " + mwords.person
   motivSec = mwords.quote + ". "
    console.log(mwords.quote, "1")
    // pirate translator api
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

                displayPirate(data);
            })
        }
    })
return motivSec
    
}
fetch (`https://motivational-quote-api.herokuapp.com/quotes/random`)
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

//                 displayPirate(data);
//             })
//         }
//     })
// ========================================================

function updateEasy()
{
    exp += 25;
    
    if(exp >= 100)
    {
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

function updateMedium()
{
    exp += 50;

    if(exp >= 100)
    {
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

function updateHard()
{
    exp += 75;

    if(exp >= 100)
    {
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

  easyEXP.addEventListener("click", updateEasy);
  mediumEXP.addEventListener("click", updateMedium);
  hardEXP.addEventListener("click", updateHard);