const btn = document.getElementById("btn");
const wrappers = document.querySelector(".wrapper");
function getMovie(movies) {
  let html = `

        <div class="container">
        <div class="cont-1">
            <p class="year" style="color:#fff;">${movies.Year}</p>
            <a href="https://www.imdb.com/title/${movies.imdbID}"><img src="./imdb.svg" height=20 width=30></img></a>
            <button class="favourite" onclick=setFavourite();>🌟</button>
        </div>

        <div class="cont-2">
        <a href="https://www.imdb.com/title/${movies.imdbID}"><img src="${movies.Poster} " height="auto" width="200px" alt="movie"></a>
        </div>

        <div class="cont-3">
            <h3>${movies.Title}</h3>
        </div>
        </div>
        </div>
    `;
  return html;
}

// Function to open the popup
function openPopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "block";
}

// Function to close the popup
function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

// ... Your existing code
let id = 1;
async function fetchMovie(movie, id) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${movie}&apikey=bf014a82&page=${id}`
    );
    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    if (!data.Search || data.Search.length === 0) {
      if(id == 1){
        openPopup();
        return; // Exit the function
      }
      else{
        alert("No next page availabel");
        return;
      }
    }

    let arr = data.Search;

    for (let movie of arr) {
      const html = getMovie(movie);
      wrappers.innerHTML += html;
    }
    wrappers.innerHTML +=
      "<div class='next'><div class='n1'><p>next -></p></div></div>";
    let next = document.querySelector(".n1");
    next.addEventListener("click", function () {
      wrappers.innerHTML = "";
      fetchMovie(movie, ++id);
    });
  } catch (error) {
    // Display an alert if an error occurs
    alert(`Error: ${error.message}`);
  }
}
// when type movie name and click on btn search for tha tparticular movie

let movieSearch = document.querySelector("#hello");

// movieSearch.addEventListener("focus", () => {
//   wrappers.innerHTML = "";
// });

btn.addEventListener("click", () => {
  wrappers.innerHTML = "";
  let movie = document.querySelector("#hello").value;

  // wrappers.innerHTML="";
  if (movie == "") {
    alert("Enter a movie name");
  } else {
    fetchMovie(movie, id);
    movieSearch.value = "";
  }
});