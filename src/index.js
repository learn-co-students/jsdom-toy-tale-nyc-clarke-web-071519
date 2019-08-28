const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// When the page loads, make a 'GET' request to fetch all the toy objects
// With the response data
// 1. make a <div class="card"> for each toy
// 2. add it to the toy-collection div

const toyCollection = document.querySelector("div#toy-collection");

function makeToyCardDiv(toyName, toyImage, toyLikes, toyId) {
  const toyCardDiv = document.createElement('div');
  toyCardDiv.dataset.id = toyId
  toyCardDiv.className = "card"
  toyCardDiv.innerHTML = `<h2>${toyName}</h2><img src=${toyImage} class="toy-avatar" /><p>${toyLikes} Likes </p><button class="like-btn">Like <3</button>`;
  toyCollection.appendChild(toyCardDiv);
}

const toysListUrl = "http://localhost:3000/toys"

document.addEventListener('DOMContentLoaded', function() {
  fetch(toysListUrl)
    .then(response => response.json())
    .then( function(json) {
      json.forEach(function(toy) {
        makeToyCardDiv(toy.name, toy.image, toy.likes, toy.id);
      })
    })
})

// When a user clicks on the add new toy button
// 1. A POST request is sent to http://localhost:3000/toys
// 2. the new toy is added to Andy's Toy Collection.
 
toyForm.addEventListener('submit',function(event){
  event.preventDefault();
  
  let formData = {
    name: event.srcElement[0].value,
    image: event.srcElement[1].value,
    likes: 0
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch(toysListUrl, configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(toy) {
      makeToyCardDiv(toy.name, toy.image, toy.likes, toy.id);
    });
})

toyCollection.addEventListener("click", function(event) {
  if (event.target.tagName === "BUTTON") {
    const toyUrl = `http://localhost:3000/toys/${event.target.parentNode.dataset.id}`;
    
    let formData = {
      likes: Number(event.target.previousElementSibling.innerText.slice(0,-6)) + 1
    };
    
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch(toyUrl, configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        event.target.previousElementSibling.innerText = `${json.likes} Likes`;
      });
  }
})

// OR HERE!
