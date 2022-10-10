# PineappleMotivator


# USER STORY
AS A user I need motivation
I WANT help tracking my projects and staying motivated
SO THAT I can complete my projects

# Acceptance
GIVEN I enter the site for the time
THEN I can enter my name and favorite thing

GIVEN I enter the site for the first time
THEN I am greeted by a motivational quote

WHEN I click the dark mode toggle
THEN my motivational quote and display turn dark

GIVEN I have a project to start
WHEN I enter the site
THEN I am prompted to enter my project name and difficulty

GIVEN I sumbited that information
WHEN I return to the site
THEN  I can see it and my progress tracker towards my favorite thing

GIVEN I can see it
WHEN I can enter subtasks
THEN I can add tasks and delete them

WHEN I finish a project
THEN it goes away and I can access it later

WHEN I finish a task
THEN the progress tracker fills up

WHEN the progress tracker is full
THEN a youtube video pops up of your favorite thing and I can choose from 5 videos


MANATEE TANK
wireframe
role breakdown
kanban board w/ tasks assigned
api;s make sure they work
rouch schedule, tasks/ milestones
=======
html psuedo
//seperate loading page**
//   asks for name and fav things
//main page**
//header*
//welcomes user by name (storage) 
//exp bar 
//completed projects history button (redirects to different page?)
//main* section 1*
//motivational quote
//toggle for dark mode
//create a task button
//brings up modal with difficulty selection, project name, # of subtasks, picture?
//tasks housed in section 2*
//hamburger menu to see subtasks, delete button, place for notes?


JavaScript
//if local storage empty, direct to form page, else load main page
//tasks in local storage
//event listener create task button brings up modal
//if exp >= limit show Youtube video selection
//reset exp back to 0
//if time-- make limit increase exponetnially
//fetch motivationl quote and display on page
//event listener for light mode/dark mode toggle
//fetch demotivational 'quote' and display on page for dark mode
//event listener for hamburger menu
//on tasks prevent defualt to save checkbox (subtasks) input -> local storage 

