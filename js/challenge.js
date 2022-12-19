let counter = 0 

//timer increments seconds once page loads
const updateCounter = () => {
    counter++ //adds to counter by increments of 1
    document.getElementById('counter').textContent = counter //we are updating the text content of the counter id with the value currently stored in our counter variable
}
let timer = setInterval(updateCounter, 1000); //calls updateCounter function every 1000 milliseconds (1 second)

//manually decrement counter
function subtractFromCounter () {
    counter--; //subtracts from counter by increments of 1
    document.getElementById('counter').textContent = counter //location
}
document.getElementById('minus').addEventListener('click', subtractFromCounter); //calls function when clicked

//manually increment counter 
document.getElementById('plus').addEventListener('click',updateCounter); // calls fxn when clicked

//like an individual number of the counter
let heart = 0
let likeButton = document.getElementById('heart') //creating shortcut to like button
let likesList = document.getElementsByClassName('likes')[0];//sets a var for the first element on page with class name 'likes' 
let countLikes = {} //creates empty "object literal" => we need this because we are keeping track of pairs of info: a given count with a number of likes (counter1: 3 likes, counter2: 3 likes 4 likes)

likeButton.addEventListener("click", () => {
    let countValue = counter; //countValue matches the current count
    let numLikes = countLikes[countValue] // 
    if (numLikes) {
        numLikes++;
    }else {
        numLikes = 1;
    }
    countLikes[countValue] = numLikes
    const likesItem = document.createElement('li');
    likesItem.textContent = `${counter} has been liked ${numLikes} ${numLikes === 1? 'time' : 'times'}.`
    
    likesList.appendChild(likesItem);
})

//pause the counter
pauseButton = document.getElementById('pause');

let isPaused = false;

pauseButton.addEventListener('click', () => {
    if (isPaused) {
        //resume the counter
        timer = setInterval(updateCounter, 1000);
        isPaused = false;
        pauseButton.innerText = '⏸️';
    
        // enable all buttons
        let buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
          button.disabled = false;
        });
      } else {
        //pause the counter
        clearInterval(timer);
        isPaused = true;
        pauseButton.innerText = '▶️';
    
        // disable all buttons except pauseButton
        let buttons = document.querySelectorAll('button:not(#pause, #restart)');
        buttons.forEach(button => {
          button.disabled = true;
        });
      }
    }); 

let restartButton = document.getElementById('restart');

restartButton.addEventListener('click', () => {
    clearInterval(timer);
    counter = 0;
    document.getElementById('counter').textContent = counter;
    timer = setInterval(updateCounter, 1000);

    isPaused = false;
    pauseButton.innerText = '⏸️'

    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = false;
    });

    likesList.innerText = '';
    countLikes = {};//resolves issue of like count not resetting when restart clicked
    let commentsList = document.querySelector('.comments');
    commentsList.innerText = '';
});

let submitButton = document.querySelector('#submit');
let form = document.querySelector('#comment-form');

function submitComment(event) {
   event.preventDefault();  // prevent the form from refreshing page upon submission

  let commentInput = document.querySelector('#comment-input');
  let comment = commentInput.value;

  let commentsList = document.querySelector('.comments');
  let newComment = document.createElement('li');
  newComment.textContent = comment;

  commentsList.appendChild(newComment);

  form.reset();  // reset the form
}
submitButton.addEventListener('click', submitComment);
