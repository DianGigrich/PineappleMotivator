let submitUserInfoForm = $('#userInfoSubmitForm');
let firstName = $('#first_name');
let userMotivator = $('#motivator');

// Stores the user's info locally and then changes the page to the main hobby tracker page
submitUserInfoForm.submit(function(event) {
    event.preventDefault();
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

    window.location.assign("../index.html");

});