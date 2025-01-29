// Firebase initialization
const firebaseConfig = {
    apiKey: "AIzaSyBoFWaIbuzfn6hLH84n1HxAebcG16O9UYQ",
    authDomain: "film-rec-app.firebaseapp.com",
    databaseURL: "https://film-rec-app-default-rtdb.firebaseio.com",
    projectId: "film-rec-app",
    storageBucket: "film-rec-app.firebasestorage.app",
    messagingSenderId: "626874820258",
    appId: "1:626874820258:web:85d0834f6e682386a299fb",
    measurementId: "G-LVLYMVNGQD"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Keep track of all movies and genres
let allMovies = [];
let allGenres = new Set();
let selectedMovieTitle = null;

// Load and maintain genres
function updateGenres() {
    database.ref('movies').once('value', (snapshot) => {
        allGenres.clear();
        snapshot.forEach((childSnapshot) => {
            const movie = childSnapshot.val();
            if (movie.genre) {
                allGenres.add(movie.genre);
            }
        });
        
        // Update genre select dropdowns
        const genreSelect = document.getElementById('genreSelect');
        genreSelect.innerHTML = '<option value="">Select Genre</option>';
        [...allGenres].sort().forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreSelect.appendChild(option);
        });
    });
}

// Genre input handling
const genreInput = document.getElementById('genre');
const genreSuggestions = document.getElementById('genreSuggestions');

genreInput.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    const filteredGenres = [...allGenres].filter(genre => 
        genre.toLowerCase().includes(value)
    );
    
    genreSuggestions.innerHTML = '';
    if (filteredGenres.length > 0 && value) {
        genreSuggestions.style.display = 'block';
        filteredGenres.forEach(genre => {
            const div = document.createElement('div');
            div.className = 'genre-suggestion-item';
            div.textContent = genre;
            div.onclick = () => {
                genreInput.value = genre;
                genreSuggestions.style.display = 'none';
            };
            genreSuggestions.appendChild(div);
        });
    } else {
        genreSuggestions.style.display = 'none';
    }
});

document.addEventListener('click', function(e) {
    if (!genreInput.contains(e.target) && !genreSuggestions.contains(e.target)) {
        genreSuggestions.style.display = 'none';
    }
});

// Movie search functionality
let selectedMovieId = null;
const movieSearch = document.getElementById('movieSearch');
const searchResults = document.getElementById('searchResults');

movieSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    database.ref('movies').once('value', (snapshot) => {
        searchResults.innerHTML = '';
        if (!searchTerm) {
            searchResults.style.display = 'none';
            return;
        }
        
        const matches = [];
        snapshot.forEach((childSnapshot) => {
            const movie = childSnapshot.val();
            const id = childSnapshot.key;
            if (movie.title.toLowerCase().includes(searchTerm)) {
                matches.push({ id, ...movie });
            }
        });

        if (matches.length > 0) {
            searchResults.style.display = 'block';
            matches.forEach(movie => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.innerHTML = `
                    <strong>${movie.title}</strong>
                    <br>
                    <small>${movie.director || 'Unknown director'} (${movie.year || 'Year unknown'})</small>
                `;
                div.onclick = () => selectMovie(movie.id);
                searchResults.appendChild(div);
            });
        } else {
            searchResults.style.display = 'none';
        }
    });
});

function selectMovie(movieId) {
    selectedMovieId = movieId;
    
    // Get the movie title
    database.ref(`movies/${movieId}`).once('value', (snapshot) => {
        const movie = snapshot.val();
        selectedMovieTitle = movie.title;
        
        // Update the UI
        searchResults.style.display = 'none';
        const ratingOptions = document.getElementById('ratingOptions');
        ratingOptions.style.display = 'block';
        
        // Add or update the title display
        let titleDisplay = document.getElementById('selectedMovieTitle');
        if (!titleDisplay) {
            titleDisplay = document.createElement('div');
            titleDisplay.id = 'selectedMovieTitle';
            titleDisplay.className = 'selected-movie-title';
            ratingOptions.insertBefore(titleDisplay, ratingOptions.firstChild);
        }
        titleDisplay.textContent = selectedMovieTitle;
    });
}

// Recommendation functions
function recommendRandom() {
    const selectedGenre = document.getElementById('genreSelect').value;
    
    database.ref('movies').once('value', (snapshot) => {
        const movies = [];
        snapshot.forEach((childSnapshot) => {
            const movie = childSnapshot.val();
            // If a genre is selected, only include movies of that genre
            if (!selectedGenre || movie.genre === selectedGenre) {
                movies.push(movie);
            }
        });
        
        if (movies.length > 0) {
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            displayRecommendation(randomMovie);
        } else {
            document.getElementById('recommendedMovie').innerHTML = 
                '<div class="movie-card">No movies found ' + 
                (selectedGenre ? 'in the selected genre.' : 'in the database.') + 
                '</div>';
        }
    });
}

function displayRecommendation(movie) {
    const recommendedMovie = document.getElementById('recommendedMovie');
    recommendedMovie.innerHTML = `
        <div class="movie-card">
            <h3>${movie.title}</h3>
            <p>Director: ${movie.director || 'Unknown'}</p>
            <p>Year: ${movie.year || 'Unknown'}</p>
            <p>Genre: ${movie.genre}</p>
        </div>
    `;
}

function addMovie(event) {
    event.preventDefault();
    const movie = {
        title: document.getElementById('title').value,
        director: document.getElementById('director').value,
        year: document.getElementById('year').value,
        genre: document.getElementById('genre').value
    };

    database.ref('movies').push(movie)
        .then(() => {
            const successMsg = document.getElementById('addSuccess');
            successMsg.textContent = 'Film successfully added!';
            successMsg.style.display = 'block';
            document.getElementById('addError').style.display = 'none';
            event.target.reset();
            updateGenres();
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        })
        .catch((error) => {
            console.error('Error adding movie:', error);
            const errorMsg = document.getElementById('addError');
            errorMsg.textContent = 'Error adding film. Please try again.';
            errorMsg.style.display = 'block';
            document.getElementById('addSuccess').style.display = 'none';
            setTimeout(() => {
                errorMsg.style.display = 'none';
            }, 3000);
        });
}

function rateMovie(rating) {
    if (!selectedMovieId) return;

    database.ref(`movies/${selectedMovieId}`).once('value', (snapshot) => {
        const movie = snapshot.val();
        
        database.ref('watched').push({
            ...movie,
            rating: rating,
            watchedDate: new Date().toISOString()
        })
        .then(() => {
            return database.ref(`movies/${selectedMovieId}`).remove();
        })
        .then(() => {
            const successMsg = document.getElementById('rateSuccess');
            successMsg.textContent = 'Rating saved successfully!';
            successMsg.style.display = 'block';
            document.getElementById('rateError').style.display = 'none';
            document.getElementById('ratingOptions').style.display = 'none';
            document.getElementById('movieSearch').value = '';
            document.getElementById('selectedMovieTitle').textContent = '';
            selectedMovieId = null;
            selectedMovieTitle = null;
            updateGenres();
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        })
        .catch((error) => {
            console.error('Error rating movie:', error);
            const errorMsg = document.getElementById('rateError');
            errorMsg.textContent = 'Error saving rating. Please try again.';
            errorMsg.style.display = 'block';
            document.getElementById('rateSuccess').style.display = 'none';
            setTimeout(() => {
                errorMsg.style.display = 'none';
            }, 3000);
        });
    });
}

// Initialize
updateGenres();