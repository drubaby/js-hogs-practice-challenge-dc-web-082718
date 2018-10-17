//DELIVERABLES

// 1: render all hogs to page
// create divs and give them class 'hog-card' for style
//display greased as a checkbox
// DONE

// 2: create a form that will both post new hog to server and render fresh hog on the page
// DONE

// 3: give all hogs a delete button which will delete from db and clear it from page
// DONE

// 4: make the checkboxes toggle hog grease on back end
//
const HOGS_URL = 'http://localhost:3000/hogs'

document.addEventListener('DOMContentLoaded', function(){
  fetchAllHogs()
  submitListener()
})

function fetchAllHogs(){

  fetch (HOGS_URL)
    .then(res => res.json())
    .then(data => data.forEach(hog => renderHog(hog)))
    //render hog here
}

function renderHog(hog){
  //parent container
  let hogContainer = document.querySelector('#hog-container')


  //create div for hog
  let hogDiv = document.createElement('div')
  hogDiv.className = 'hog-card'
  hogDiv.setAttribute('id', `${hog.id}`)
  hogContainer.appendChild(hogDiv)

  //h3 for hog name
  let hogName = document.createElement('h3')
  hogName.innerText = hog.name
  hogDiv.appendChild(hogName)
  //p for hog specialty
  let hogSpecialty = document.createElement('p')
  hogSpecialty.innerText = `Specialty: ${hog.specialty}`
  hogDiv.appendChild(hogSpecialty)
  //p for medal
  let hogMedal = document.createElement('p')
  hogMedal.innerText = `Highest Medal Achieved: ${hog["highest medal achieved"]
}`
  hogDiv.appendChild(hogMedal)
  //hog image
  let hogPic = document.createElement('img')
  hogPic.setAttribute('src', `${hog.image}`)
  hogDiv.appendChild(hogPic)
  //p for hog weight
  let hogWeight = document.createElement('p')
  hogWeight.innerText = `Weight (as a ratio of hog to LG - 24.7 Cu. Ft. French
     Door Refrigerator with Thru-the-Door Ice and Water):
     ${hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]
}`
  hogDiv.appendChild(hogWeight)

  //checkbox for greased
  let checkboxDiv = document.createElement('div')
  checkboxDiv.innerText = "Greased: "
  let hogCheckbox = document.createElement('input')
  hogCheckbox.setAttribute('type', 'checkbox')
  if (hog.greased === true) {
    hogCheckbox.checked = true
  }
  hogDiv.appendChild(checkboxDiv)
  checkboxDiv.appendChild(hogCheckbox)
  hogCheckbox.addEventListener('change', greaseToggler)

  // delete button
  let deleteBtn = document.createElement('button')
  deleteBtn.innerText = "Delete Hog"
  deleteBtn.setAttribute('id', `${hog.id}`)
  hogDiv.appendChild(deleteBtn)
  deleteBtn.addEventListener('click', deletePiggy)
}

// New Hog Form
function submitListener(){
  let form = document.querySelector('#hog-form')
  form.addEventListener('submit', submitHog)
}

function submitHog(){
  event.preventDefault()
  let name = event.target.elements.name.value
  let specialty = event.target.elements.specialty.value
  let medal = event.target.elements.medal.value
  let weight = event.target.elements.weight.value
  let imgUrl = event.target.elements.img.value
  let greased = event.target.elements.greased.checked
  let body = {
    'name': name,
    'specialty': specialty,
    'greased': greased,
    'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water': weight,
    'highest medal achieved': medal,
    'image': imgUrl
  }
  // debugger
  fetch(HOGS_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }).then(res => res.json())
    .then(hog => renderHog(hog))
}

function deletePiggy(){
  let hogId = event.target.id
  fetch(`${HOGS_URL}/${hogId}`, {
    method: "DELETE"
  }).then(res => res.json())
  .then(() => {
    document.getElementById('hog-container')
    .removeChild(document.getElementById(hogId))
  })
}

function greaseToggler(){
  let newGreaseState = event.target.checked
  // debugger
  let hogId = event.target.parentElement.parentElement.id
  console.log(newGreaseState)
  console.log(hogId)
  body = { 'greased': newGreaseState}
  fetch(`${HOGS_URL}/${hogId}`, {
    method: "PATCH",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
}
