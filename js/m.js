let search = document.querySelector('#search');
//console.log(search);
search.addEventListener('keyup', (e) => {
  let searchText = e.target.value;
  SearchMovies(searchText);

  //when key press hide form text and h1 from dome
  let formText = document.getElementById('divBlock');
  formText.style.display = 'none';
  search.classList.add('afterkeyPress');
  document.querySelector('#formBlock').classList.add('afterkey_formBlock');
});

//speech recognition api
let speechSearch = document.getElementById('speechIcon');
speechSearch.addEventListener('click', () => {
  //when key press hide form text and h1 from dome
  let formText = document.getElementById('divBlock');
  formText.style.display = 'none';
  search.classList.add('afterkeyPress');
  document.querySelector('#formBlock').classList.add('afterkey_formBlock');

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  let p = document.createElement('p');
  recognition.interimResults = true;

  recognition.addEventListener('result', (e) => {
    let transcript = [...e.results]
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join(' ');

    //console.log(transcript);
    search.value = transcript;
    if (e.results[0].isFinal) {
      p = document.createElement('p');
      p.innerHTML = transcript;
      let searchText = transcript;
      SearchMovies(searchText);
    }
  });
  recognition.start();
});

function SearchMovies(searchText) {
  const imdbApi = `http://www.omdbapi.com/?s=${searchText}&apikey=f5d8c5d1`;
  window
    .fetch(imdbApi)
    .then((data) => {
      data
        .json()
        .then((movieData) => {
          let movies = movieData.Search;
          let output = [];
          for (let movie of movies) {
            let defaultImg =
              movie.Poster === 'N/A'
                ? 'https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg'
                : movie.Poster;
            console.log(movie);
            output += `

              <div>
              <img src="${defaultImg}"/>
              <h1>${movie.Title}</h1>
              <p>${movie.Year}</p>
              <a href="http://www.omdbapi.com/?i=${movie.imdbID}/"target="_blank">Movie Details</a>
              </div>
              
              `;

            // document.getElementById('template').innerHTML = output;
          }
          document.getElementById('template').innerHTML = output;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
