

const select = document.getElementById('breeds'); // <select>
const card = document.querySelector('.card'); // <div>
const form = document.querySelector('form'); // <form>
 
fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())    
    .then(data => generateImage(data.message));

// PAS 3: obtine o lista de rase de caini (https://dog.ceo/api/breeds/list)
// Apeleaza functia custom generateOptions, care afiseaza raspunsul in <select> 
fetch('https://dog.ceo/api/breeds/list')
  .then(response => response.json())  
  .then(data => generateOptions(data.message));  
 

// PAS 4: la schimbarea optiunii din <select> afiseaza o imagine din rasa selectata
select.addEventListener('change', function(){
  const breed = this.value;  
  const url = 'https://dog.ceo/api/breed/' + breed + '/images/random';  
  fetch(url)  
    .then(response => response.json())
    .then(data => generateImage(data.message, breed));  
})

// PAS 5: la click in interiorul <div>-ului afiseaza alta imagine din rasa selectata
card.addEventListener('click', function(){
  const breed = select.value;
  const url = 'https://dog.ceo/api/breed/' + breed + '/images/random';
  fetch(url)
    .then(response => response.json())
    .then(data => generateImage(data.message, breed));     
})

function generateImage(src, alt = 'Random image') {  
  const html = `
    <img src='${src}' alt='${alt}' title='${alt}'>
    <p>Click to view images of ${select.value}s</p>`;
    
    card.innerHTML = html;
}

function generateOptions(data){
  const options = data.map(item =>
    `<option value='${item}'>${item}</option>`) 
    .join('');
  select.innerHTML = options;
}

// PAS 8: Posteaza 
document.getElementById('submit').addEventListener('click', postData);

function postData(event){
  
   event.preventDefault();

   let url = document.querySelector('.card').firstElementChild.src;
   let user = document.getElementById('user').value;
   let comment = document.getElementById('comment').value;

   let options = {
      method: "POST",
      mode: "cors",
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "url=" + url + "&" + "user=" + user + "&" + "comment=" + comment
    } 

   fetch('http://localhost/post_request/index.php', options)
      .then(response => {
         console.log(response)
         return response.text();
      })
      .then(data => console.log(data));
}