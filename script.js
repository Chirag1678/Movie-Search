const btn=document.getElementById("mera-button");
const wrappers=document.querySelector(".wrapper");
function getMovie(movies){

    let html=`

        <div class="container">
        <div class="cont-1">
            <p class="year" style="color:#fff;">${movies.Year}</p>
            <a href="https://www.imdb.com/title/${movies.imdbID}"><img src="./imdb.svg" height=20 width=30></img></a>
            <button class="favourite" onclick=setFavourite();>⭐</button>
        </div>

        <div class="cont-2">
            <img src="${movies.Poster} " height="auto" width="200px" alt="movie">
        </div>

        <div class="cont-3">
            <h3>${movies.Title}</h3>
        </div>
        </div>
        </div>
    `
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
  
  async function fetchMovie(movie) {
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=ec357c06`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
  
      if (!data.Search || data.Search.length === 0) {
        openPopup(); // Display the popup if no data is found
        return; // Exit the function
      }
  
      let arr = data.Search;
  
      for (let movie of arr) {
        const html = getMovie(movie);
        wrappers.innerHTML += html;
      }
    } catch (error) {
      // Display an alert if an error occurs
      alert(`Error: ${error.message}`);
    }
  }
// when type movie name and click on btn search for tha tparticular movie

let movieSearch=document.querySelector("[search-movie]");

movieSearch.addEventListener('focus',()=>{
    wrappers.innerHTML="";
})


btn.addEventListener('click',()=>{
    let movie=document.querySelector("#hello").value;

    // wrappers.innerHTML="";
    if(movie==""){
        alert("Enter a movie name");
    }  
    else{
        fetchMovie(movie);
        movieSearch.value="";
    }
})
