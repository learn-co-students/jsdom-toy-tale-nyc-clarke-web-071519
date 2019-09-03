getAllToyData() 
// ? -----------------Grab Elements Off The DOM--------------------------
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const creationForm = document.querySelector('.add-toy-form')
const toyCollection =  document.querySelector("#toy-collection")

let addToy = false

// ? ------------------Add Event Listeners to DOM Elements -------------------------
addBtn.addEventListener('click', hideAndShowForm)
creationForm.addEventListener('submit', getDataFromForm)



// ? ----------------- Talk to server useing Fetch -----------------------------  
// function to fetch toy data
function getAllToyData() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => createToyCards(data))
    // .then(toyData => createToyCards(toyData))
}

function postFetch(toyObj){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(createToyCards)
}


// ? ----------------- Logic/DOM Manipulation Functions ------------------
  function  hideAndShowForm() {  
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
}

function createToyCards(toys) {
  
  let toyArray = Array.isArray(toys) ? toys : [toys]

  toyArray.forEach(toy => {
    let toyDiv = document.createElement('DIV')
    toyDiv.className = 'card'

    toyDiv.innerHTML += `
      <h2>Woody</h2>
      <img src=toy_image_url class="toy-avatar" />
      <p>4 Likes </p>
      <button class="like-btn">Like <3</button>
    `
    toyCollection.append(toyDiv)
  })
}

function getDataFromForm(event){
  event.preventDefault()
  let name = event.target.name.value
  let imageUrl = event.target.image.value

  let toyObj = {
    name: name,
    image: imageUrl
  }

  postFetch(toyObj)
}