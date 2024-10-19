let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  function loadToy() {
  const toyCollection = document.querySelector('#toy-collection')
  fetch('http://localhost:3000/toys')
  .then((response)=> response.json())
  .then((data)=> {
    
    data.forEach(toy => {
      
      let toyDiv = document.createElement('div')
      toyDiv.classList.add('card')
      let toyTitle = document.createElement('h2')
      toyTitle.textContent = toy.name
      let toyImg = document.createElement('img')
      toyImg.src = toy.image
      toyImg.classList.add('toy-avatar')
      let toyLikes = document.createElement('p')
      let likes = toy.likes
      toyLikes.textContent= `${likes} Likes`
      let toyButton = document.createElement('button')
      toyButton.textContent= 'Like ❤️'
      toyButton.classList.add('like-btn')
      toyButton.setAttribute('id', 'toy_id')
      
      
        toyDiv.appendChild(toyTitle);
        toyDiv.appendChild(toyImg);
        toyDiv.appendChild(toyLikes);
        toyDiv.appendChild(toyButton);

        toyCollection.appendChild(toyDiv)
       
    }) 
    
    
    // let likebtn = document.querySelectorAll('#toy_id')
    // likebtn.forEach(btn =>{
    //   btn.addEventListener('click', (e)=>{
        
    //     (document.querySelector('.card p'))
        
    //   })
    // })

  })
}


const toyForm = document.querySelector('.add-toy-form')
toyForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let toyObj ={
    name:e.target.querySelector('.input-text').value,
    image:e.target.querySelector('.input-img').value,
    likes:0
  };
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toyObj)
  })
    .then((response)=> response.json())
    .then((data)=> loadToy(data))
    .catch((error)=> console.error('Error:', error))
});


loadToy()

});
