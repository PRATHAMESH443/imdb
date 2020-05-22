let search = document.querySelector('#search');

search.addEventListener('keyup', (e) => {
  let searchText = e.target.value;
  searchMovies(searchText);
  //when key press hide from text and h1
  let formText=document.getElementById("divBlock");
  formText.style.display="none";

  search.classList.add("afterkeyPress");
  document.querySelector("#formBlock").classList.add("afterkey_formBlock");

  //speech recognition api
  let speechSearch=document.getElementById("speechIcon");
  speechSearch.addEventListener("click",()=>{
    let formText=document.getElementById("divBlock");
    formText.style.display = "none";
    search.classList.add("afterkeyPress");
    document.querySelector("#formBlock").classList.add("afterkey_formBlock");
  
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition; //statement

  let recognition = new SpeechRecognition();
  let p = document.createElement('p');
  recognition.interimResults = true;

  recognition.addEventListener("result",(e)=>{
  let transcript = [...e.results]
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join(' ');

    search.value = transcript;
    if (e.results[0].isFinal) {
    p = document.createElement('p');
    p.innerHTML=transcript;
    searchMovies(searchText);
  }
  
});
  recognition.start();
  });

function searchMovies(searchText) {
  const imdbApi = `http://www.omdbapi.com/?s=${searchText}&apikey=f5d8c5d1`;
  window
    .fetch(imdbApi)
    .then((data) => {
      data
        .json()
        .then((movie) => {
          let movies = movie.Search;
          let output=[];
          for(let movie of movies){
            let defaultImg=
            movie.Poster==="N/A"? 
            "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg"
            :movie.Poster;
              output += `
              <div>
              <img src="${defaultImg}"/>
              <h1>${movie.Title}</h1>
              <p>${movie.Year}</p>
              <a href="http://www.imdb.com/title/${movie.imdbID}/" target="_blank">Movie Detials</a>
               </div>`;
          }
          document.getElementById("template").innerHTML = output
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
