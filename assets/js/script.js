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
    let div = document.querySelector("#taskDiv");
    let checkbox = document.querySelector('#checkboxHidden');
    let clonedCheckbox = checkbox.cloneNode(true);

    clonedCheckbox.id = 'subtaskCheckbox';
    clonedCheckbox.classList.remove("hide");
  
    if (storedTasks.subtasks == 1) {
        div.append(clonedCheckbox);
    } else if (storedTasks.subtasks == 2) {
        div.append(clonedCheckbox), div.append(clonedCheckbox);
    } else (storedTasks.subtasks == 3) 
        div.append(clonedCheckbox), div.append(clonedCheckbox), div.append(clonedCheckbox);
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
    let checkbox = document.querySelector('#checkboxHidden');
    let clonedCheckbox = checkbox.cloneNode(true);

    
    
    div.setAttribute("class", "task container z-depth-3 p-2");
    div.id = "taskDiv";
    h3.innerText = storedTasks.taskName;
    h4.innerText = dropdownTranslate1();
    clonedCheckbox.id = 'subtaskCheckbox';
    clonedCheckbox.classList.remove("hide");
           
    
    listedTasks.append(div);
    div.append(h3);
    div.append(h4);
    div.append(p);
    dropdownTranslate2();
 
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

// // proof of concept Pirate API fetch
// fetch("https://pirate.monkeyness.com/api/insult")
// .then(function(response)
// {console.log(response);
//     //return response.json();
//     }).then(function(data){
//     console.log(data)
//     })

