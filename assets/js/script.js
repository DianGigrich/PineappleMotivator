// Main Page Variables
let submitButton = $('#submitBtn');
let firstName = $('#first_name');
let userMotivator = $('#motivator');
let userInfo = {};

// Hobby Page Variables
let userNameHere = $('#userNameHere');
let taskButton = $('#taskBtn');
let listedTasks = $('#taskList');
let youtubeAPIKey = `AIzaSyAeZ3OPG8Md9rwhI3CzE3KoUWYC45JHKWw`


// Stores the user's info locally and then changes the page to the main hobby tracker page
submitButton.on('click', function() {
    console.log("clicked");


    let userInfo ={
        name: firstName.val(),
        motivator: userMotivator.val()
    };

    localStorage.setItem("User", JSON.stringify(userInfo));

    window.location.assign("file:///C:/Users/Erik/code/PineappleMotivator/index.html");

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
    let label = document.createElement("label");
    let checkbox = document.createElement('input');
    let span = document.createElement('span');
    let textarea = document.createElement('textarea');

    checkbox.type = 'checkbox';
    checkbox.id = 'subtask';
    checkbox.name = 'subtask';
    
    
    div.setAttribute("class", "task container z-depth-3 p-2");
    h3.innerText = storedTasks.taskName;
    h4.innerText= dropdownTranslate1();
    span.innerText="Red";
           
    
    listedTasks.append(div);
    div.append(h3);
    div.append(h4);
    div.append(p);
    div.append(label);
    label.append(createInput);

};

// Modal function
$(document).ready(function() {
    $('.modal').modal();
    $('.parallax').parallax();
});




// TODO: grabbing an option from the modal

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


// proof of concept motivational quote api
fetch (`https://motivational-quote-api.herokuapp.com/quotes/random`)
.then (function (response) {
    return response.json()
})
.then (function (data) {
    console.log(data)
})

// proof of concept Pirate API fetch
fetch("https://pirate.monkeyness.com/api/insult")
.then(function(response)
{console.log(response);
    //return response.json();
    }).then(function(data){
    console.log(data)
    })

