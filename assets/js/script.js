// Main Page Variables
let userInfo = {};

// exp bar
let exp = 0;
let savedLevel;
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
let youtubeFetchBtn = $(`#youtube-fetch-btn`);
let storedMultipleTasks;

// Pirate mode variables
var pirateKey = 'gkK3Z1JjIocTV2oE23wLYweF';
var motivationalsChange = document.querySelector("article");
let modeToggle = $(`input:checkbox`);
var motivSec = document.querySelector("#motivating");
var pirateSec = document.querySelector("#demotivating");
// Default mode to 'light'
var mode = "light";

var rewriteMotivator = document.getElementById('rewriteMotivator')


// Checks to see if the user has created a locally stored profile here before, if not then they are sent to the userForm.html page to make a new profile
// On page load inserts a welcome message for the user based on the name they stored locally
function loadUserData() {
    let loadUser = JSON.parse(localStorage.getItem("User"));
    if (loadUser == null) {
        window.location.href = "./pages/userForm.html";
        return
    }
    document.querySelector('#userNameHere').textContent = "Welcome, " + loadUser.name;
    document.getElementById('currentMotivator').textContent = loadUser.motivator;
    checkTasks();
    youtubeSearch = loadUser.motivator


    // load the user's level and exp then display it

    let loadLevel = JSON.parse(localStorage.getItem("savedLevel"));
    document.querySelector(".skillLevel").textContent = `${"Level: " + loadLevel.level}`;
    if (loadLevel.level == null || loadLevel.exp == null) {
        level = 1;
        exp = 0;
    }
    else {
        level = loadLevel.level;
        exp = loadLevel.exp;
        document.querySelector(".levelFill").style.width = `${exp}%`;
        document.querySelector(".levelPrcnt").textContent = `${exp}%`;
    }
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
    let completeBtn = document.createElement("button");
    let removeBtn = document.createElement("button");
    let textarea = document.createElement("textarea");


    div.setAttribute("class", "task card z-depth-3 p-2");
    div.id = task.taskName;
    completeBtn.innerText = `Project Completed!`;
    //completeBtn.setAttribute(`class`,`complete-project`);
    h3.innerText = task.taskName;
    h4.innerText = dropdownTranslate1(task.exp);
    subtaskBtn.innerText = `Create Subtask`;
    subtaskBtn.setAttribute(`class`, `subtask-btn`);
    saveBtn.innerText = "Save changes!";
    saveBtn.setAttribute("class", "saveBtn");
    textarea.innerText = task.savedNote || "Notes go here!";
    textarea.id = "textarea-" + task.taskName;
    textarea.setAttribute("class", "white");
    removeBtn.innerText = `Delete Project`;
    removeBtn.setAttribute(`class`, `delete-project swing`);
    img.setAttribute(`class`, `task-img`)

    if (task.exp == 1) {
        completeBtn.setAttribute('class', 'easy completeBtn');
        div.append(completeBtn);
        let imgSrc = `./assets/Images/pablo-arroyo-_SEbdtH4ZLM-unsplash.jpg`;
        img.setAttribute(`src`, `${imgSrc}`);
    }
    else if (task.exp == 2) {
        completeBtn.setAttribute('class', 'medium completeBtn');
        div.append(completeBtn);
        let imgSrc = `./assets/Images/ashley-whitlatch-JRPTaUQS43g-unsplash.jpg`;
        img.setAttribute(`src`, `${imgSrc}`);
    }
    else {
        completeBtn.setAttribute('class', 'hard completeBtn');
        div.append(completeBtn);
        let imgSrc = `./assets/Images/jess-zoerb-bdYyOOGakBE-unsplash.jpg`;
        img.setAttribute(`src`, `${imgSrc}`);
    }

    // var checked = JSON.parse(localStorage.getItem('checkbox1zaal1'));
    // document.getElementById("checkbox1zaal1").checked = checked;

    listedTasks.append(div);
    // create subtasks button
    div.append(h3, h4, p, textarea, subtaskBtn, textarea);

    // small function that checks if the value passed through is true, and if it is to return "checked", which will leave the checkbox checked.
    function checkboxCheck(ifCheck) {
        if (ifCheck == true)       {
            return "checked"
        } else return 
        };


    for (let i = 0; i < task.subtaskArray.length; i++) {
        var checkboxContainer = $(`<form><p>
        <label>
          <input type="checkbox" class="subtaskCheckbox" id="checkbox-${task.taskName}${(i + 1)}" 
          ${checkboxCheck(task.checkboxArray[i])} 
          />
          <span><textarea id="subtask-${task.taskName}${(i + 1)}">${task.subtaskArray[i]}</textarea></span>
        </label>
      </p></form>`)
        div.append(checkboxContainer[0]);
    };

    div.append(saveBtn, removeBtn);

    p.append(img);

};


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
    taskObject.savedNote = newNotes;


    for (let i = 0; i < taskObject.subtaskArray.length; i++) {
        let subtaskValue = document.getElementById(`subtask-${task}${i + 1}`).value;

        taskObject.subtaskArray[i] = subtaskValue;
    }

    for (let i = 0; i < taskObject.checkboxArray.length; i++) {
        let checkboxValue = document.getElementById(`checkbox-${task}${(i + 1)}`).checked;
        console.log(checkboxValue);

        taskObject.checkboxArray[i] = checkboxValue;
    }

    storedMultipleTasks[index] = taskObject;

    localStorage.setItem("MultiTask", JSON.stringify(storedMultipleTasks));

};

// handle completed subtasks
listedTasks.on("click", ".delete-project", function (event) {
    var clicked = event.target
    let task = clicked.parentElement.id;
    deleteTask(task)
    clicked.parentElement.style.opacity = 0;
    clicked.parentElement.style.transform = 'scale(0)';
    setTimeout(function () {
        clicked.parentElement.style.display = "none";
    }, 1000);
});

// completing projects
listedTasks.on("click", ".completeBtn", function (event) {
    var clicked = event.target
    let task = clicked.parentElement.id;

    if (clicked.className === `easy completeBtn`) {
        // run exp function
        updateEasy();
    }
    else if (clicked.className === `medium completeBtn`) {
        // run exp function
        updateMedium();
    }

    else if (clicked.className === `hard completeBtn`) {
        // run exp function
        updateHard();
    }
    deleteTask(task);
    clicked.parentElement.setAttribute("class", "hide");
})



function deleteTask(task) {
    storedMultipleTasks = storedMultipleTasks.filter(function (e) {
        if (e.taskName === task) {
            return false;
        } else {
            return true;
        }
    })

    localStorage.setItem("MultiTask", JSON.stringify(storedMultipleTasks));
    // window.location.reload();
}



// Launches the modal window
function toggleModal() {
    var instance = M.Modal.getInstance($('#modal3'))
    instance.open();
};

function toggleYoutubeModal() {
    $(document).ready(function () {
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
        savedNote: "",
        subtaskArray: [],
        checkboxArray: []
    };

    // checks to see if there are any other tasks with the same name, if there are then a message is displayed
    let taskNames = storedMultipleTasks.map(function (element) {
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
function fetchYoutube() {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${youtubeSearch}&key=AIzaSyCeygEJTKDYacxfKLnZwWv2EiFnAhQUb_8`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            for (let i = 0; i < 5; i++) {
                $(`#url-${i + 1}`).attr(`href`, `https://www.youtube.com/watch?v=${data.items[i].id.videoId}`)
                $(`#thumbnail-${i + 1}`).attr(`src`, `${data.items[i].snippet.thumbnails.default.url}`)
                $(`#title-${i + 1}`).text(`${data.items[i].snippet.title}`)
            }
        })
}



// proof of concept motivational quote api
function displayMotiv(mwords) {

    console.log(mwords)
    motivSec.textContent = mwords.quote + ". -" + mwords.person
    var motivQuote = mwords.quote + ". -" + mwords.person
    console.log(mwords.quote, "1")

    // pirate translator api==================================================

    function displayPirate(pwords) {
        console.log(pwords)

        pirateSec.textContent = pwords.contents.translated
        console.log(pwords.contents.translated, "2")
    }

    var pirateURL = 'https://api.funtranslations.com/translate/pirate.json?api_key=gkK3Z1JjIocTV2oE23wLYweF&text=' + motivQuote;
    console.log(pirateURL)
    fetch(pirateURL)
        .then(function (response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function (data) {
                    displayPirate(data)
                })
            }
        })
    // return motivSec
    console.log(motivSec, "3")
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

// ========================================================

function saveUserLvl() {
    let currentLevel = {
        exp: exp.valueOf(),
        level: level.valueOf()
    }
    localStorage.setItem("savedLevel", JSON.stringify(currentLevel));
}

function updateEXP() {
    level += 1;
    //add a level up
    toggleYoutubeModal()
    document.querySelector(".skillLevel").textContent = `${"Level: " + level}`;
    exp -= 100;
    saveUserLvl();

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

function updateEasy() {
    exp += 25;
    saveUserLvl();
    if (exp >= 100) {
        updateEXP();
    }
    document.querySelector(".levelFill").style.width = `${exp}%`;
    document.querySelector(".levelPrcnt").textContent = `${exp}%`;
}

function updateMedium() {
    exp += 50;
    saveUserLvl();
    if (exp >= 100) {
        updateEXP();
    }

    document.querySelector(".levelFill").style.width = `${exp}%`;
    document.querySelector(".levelPrcnt").textContent = `${exp}%`;
}

function updateHard() {
    exp += 75;
    saveUserLvl();
    if (exp >= 100) {
        updateEXP();
    }

    document.querySelector(".levelFill").style.width = `${exp}%`;
    document.querySelector(".levelPrcnt").textContent = `${exp}%`;
}

// pirate mode


// dark mode toggle
modeToggle.on(`change`, function () {
    if (mode === "light") {
        mode = "pirate"
        $('body').addClass("pirateBody")
        motivationalsChange.setAttribute("class", "pirateMotivationals")
        pirateSec.removeAttribute("class", "hidden")
        motivSec.setAttribute("class", "hide")

    }
    // remove pirate mode
    else {
        mode = "light";
        $('body').removeClass("pirateBody")
        motivationalsChange.removeAttribute("class", "pirateMotivationals")
        motivationalsChange.setAttribute("class", "motivationals")
        pirateSec.setAttribute("class", "hide")
        motivSec.removeAttribute("class", "hide")

    }
})



// fetches youtube data on button click
youtubeFetchBtn.on(`click`, fetchYoutube)

// rewrite Favorites

var Makeitso = document.getElementById("Makeitso")
Makeitso.addEventListener('click', function (e) {
    e.preventDefault()
    let localStoredTaskList = [];
    let loadUser = JSON.parse(localStorage.getItem("User"));
    var newMotivator = document.getElementById('newMotivator').value
    var sameName = loadUser.name
    console.log(loadUser.name, "IS THIS IT")
    console.log(newMotivator)
    var objUser = {
        name: sameName,
        motivator: newMotivator
    }
    console.log(objUser);
    console.log('click')
    console.log(e)
    localStoredTaskList.push(objUser);
    localStorage.setItem("User", JSON.stringify(objUser))
    document.querySelector('#userNameHere').textContent = "Welcome, " + sameName;
    document.getElementById('currentMotivator').textContent = newMotivator;
    youtubeSearch = loadUser.motivator
    return
})




loadUserData();

// Modal function
$(document).ready(function () {
    $('.modal').modal();
    $('.parallax').parallax();
});

listedTasks.on("click", ".saveBtn", function (event) {
    saveChanges(event.target);
})

// create subtasks, complete project, delete project
listedTasks.on("click", ".subtask-btn", function (event) {
    var clicked = event.target;
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

    let currentSubtasksAmount = taskObject.subtaskArray.length;
    let currentCheckBoxAmount = taskObject.checkboxArray.length;

    if (clicked.className === `subtask-btn`) {
        var checkboxContainer = $(`<form><p>
        <label>
          <input type="checkbox" class="subtaskCheckbox" id="checkbox-${task}${(currentCheckBoxAmount + 1)}" />
          <span><textarea id="subtask-${task}${(currentSubtasksAmount + 1)}"></textarea></span>
        </label>
      </p></form>`)
        $(clicked).parent(`div`).append(checkboxContainer)
        // clicked.after(checkboxContainer)
        storedMultipleTasks[index].checkboxArray.push("");
        storedMultipleTasks[index].subtaskArray.push("");
    }
})