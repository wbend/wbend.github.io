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
let selectedMovieId = null;

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

// Movie search functionality with support for new movies
const movieSearch = document.getElementById('movieSearch');
const searchResults = document.getElementById('searchResults');

movieSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    
    if (!searchTerm) {
        searchResults.style.display = 'none';
        return;
    }

    database.ref('movies').once('value', (snapshot) => {
        searchResults.innerHTML = '';
        
        const matches = [];
        snapshot.forEach((childSnapshot) => {
            const movie = childSnapshot.val();
            const id = childSnapshot.key;
            if (movie.title.toLowerCase().includes(searchTerm)) {
                matches.push({ id, ...movie });
            }
        });

        searchResults.style.display = 'block';

        // Show existing matches
        matches.forEach(movie => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.innerHTML = `
                <strong>${movie.title}</strong>
                <br>
                <small>${movie.director || 'Unknown director'} (${movie.year || 'Year unknown'})</small>
            `;
            div.onclick = () => selectMovie(movie.id, movie.title);
            searchResults.appendChild(div);
        });

        // Always show option to add as new movie
        const div = document.createElement('div');
        div.className = 'search-result-item new-movie';
        div.innerHTML = `
            <strong>Add "${searchTerm}" as new movie</strong>
            <br>
            <small>Add to watched list</small>
        `;
        div.onclick = () => selectNewMovie(searchTerm);
        searchResults.appendChild(div);
    });
});

function selectMovie(movieId, movieTitle) {
    selectedMovieId = movieId;
    selectedMovieTitle = movieTitle;
    
    searchResults.style.display = 'none';
    const ratingOptions = document.getElementById('ratingOptions');
    ratingOptions.style.display = 'block';
    
    // Update the UI
    let titleDisplay = document.getElementById('selectedMovieTitle');
    if (!titleDisplay) {
        titleDisplay = document.createElement('div');
        titleDisplay.id = 'selectedMovieTitle';
        titleDisplay.className = 'selected-movie-title';
        ratingOptions.insertBefore(titleDisplay, ratingOptions.firstChild);
    }
    titleDisplay.textContent = selectedMovieTitle;

    // Remove any existing new movie fields
    const existingFields = document.getElementById('newMovieFields');
    if (existingFields) {
        existingFields.remove();
    }
}

function selectNewMovie(title) {
    selectedMovieId = null;
    selectedMovieTitle = title;
    
    searchResults.style.display = 'none';
    const ratingOptions = document.getElementById('ratingOptions');
    ratingOptions.style.display = 'block';
    
    let titleDisplay = document.getElementById('selectedMovieTitle');
    if (!titleDisplay) {
        titleDisplay = document.createElement('div');
        titleDisplay.id = 'selectedMovieTitle';
        titleDisplay.className = 'selected-movie-title';
        ratingOptions.insertBefore(titleDisplay, ratingOptions.firstChild);
    }
    titleDisplay.textContent = selectedMovieTitle;
    
    // Add fields for new movie details
    const existingFields = document.getElementById('newMovieFields');
    if (existingFields) {
        existingFields.remove();
    }

    const additionalFields = document.createElement('div');
    additionalFields.id = 'newMovieFields';
    additionalFields.className = 'new-movie-fields';
    additionalFields.innerHTML = `
        <input type="text" id="newMovieDirector" placeholder="Director (optional)" class="mobile-friendly-input">
        <input type="number" id="newMovieYear" placeholder="Year (optional)" class="mobile-friendly-input">
        <input type="text" id="newMovieGenre" placeholder="Genre (optional)" class="mobile-friendly-input">
    `;
    ratingOptions.insertBefore(additionalFields, ratingOptions.children[1]);
}

// Recommendation functions
function recommendRandom() {
    const selectedGenre = document.getElementById('genreSelect').value;
    
    database.ref('movies').once('value', (snapshot) => {
        const movies = [];
        snapshot.forEach((childSnapshot) => {
            const movie = childSnapshot.val();
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
            <p>Genre: ${movie.genre || 'Unspecified'}</p>
            <p class="rating-info">${movie.rating ? `Rating: ${'★'.repeat(movie.rating)}${'☆'.repeat(5-movie.rating)}` : ''}</p>
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
    const movieData = {
        title: selectedMovieTitle,
        rating: rating,
        watchedDate: new Date().toISOString()
    };

    if (selectedMovieId) {
        // Existing movie flow
        database.ref(`movies/${selectedMovieId}`).once('value', (snapshot) => {
            const movie = snapshot.val();
            movieData.director = movie.director;
            movieData.year = movie.year;
            movieData.genre = movie.genre;
            
            saveRating(movieData, selectedMovieId);
        });
    } else {
        // New movie flow
        const newMovieFields = document.getElementById('newMovieFields');
        if (newMovieFields) {
            movieData.director = document.getElementById('newMovieDirector').value;
            movieData.year = document.getElementById('newMovieYear').value;
            movieData.genre = document.getElementById('newMovieGenre').value || 'Unspecified';
        }
        
        saveRating(movieData, null);
    }
}

function saveRating(movieData, movieId) {
    database.ref('watched').push(movieData)
        .then(() => {
            if (movieId) {
                return database.ref(`movies/${movieId}`).remove();
            }
        })
        .then(() => {
            const successMsg = document.getElementById('rateSuccess');
            successMsg.textContent = 'Rating saved successfully!';
            successMsg.style.display = 'block';
            document.getElementById('rateError').style.display = 'none';
            resetRatingUI();
            updateGenres();
            
            // Refresh watched movies list if it's visible
            const watchedMoviesContainer = document.getElementById('watchedMovies');
            if (watchedMoviesContainer.children.length > 0) {
                loadWatchedMovies();
            }
        })
        .catch((error) => {
            console.error('Error rating movie:', error);
            const errorMsg = document.getElementById('rateError');
            errorMsg.textContent = 'Error saving rating. Please try again.';
            errorMsg.style.display = 'block';
            document.getElementById('rateSuccess').style.display = 'none';
        });
}

function resetRatingUI() {
    const ratingOptions = document.getElementById('ratingOptions');
    ratingOptions.style.display = 'none';
    document.getElementById('movieSearch').value = '';
    const newMovieFields = document.getElementById('newMovieFields');
    if (newMovieFields) {
        newMovieFields.remove();
    }
    const titleDisplay = document.getElementById('selectedMovieTitle');
    if (titleDisplay) {
        titleDisplay.textContent = '';
    }
    selectedMovieId = null;
    selectedMovieTitle = null;
}

// Watched movies functionality
function loadWatchedMovies() {
    const watchedMoviesContainer = document.getElementById('watchedMovies');
    watchedMoviesContainer.innerHTML = '<h3>Loading...</h3>';
    
    database.ref('watched').orderByChild('watchedDate').once('value', (snapshot) => {
        watchedMoviesContainer.innerHTML = '';
        
        if (!snapshot.exists()) {
            watchedMoviesContainer.innerHTML = '<p>No watched movies yet.</p>';
            return;
        }

        const movies = [];
        snapshot.forEach((childSnapshot) => {
            movies.unshift({ id: childSnapshot.key, ...childSnapshot.val() });
        });

        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card watched-movie';
            movieCard.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Director: ${movie.director || 'Unknown'}</p>
                <p>Year: ${movie.year || 'Unknown'}</p>
                <p>Genre: ${movie.genre || 'Unspecified'}</p>
                <p class="rating">Rating: ${'★'.repeat(movie.rating)}${'☆'.repeat(5-movie.rating)}</p>
                <p class="watched-date">Watched: ${new Date(movie.watchedDate).toLocaleDateString()}</p>
                <button onclick="unarchiveMovie('${movie.id}')" class="secondary-button">
                    Move back to watchlist
                </button>
            `;
            watchedMoviesContainer.appendChild(movieCard);
        });
    });
}

function unarchiveMovie(watchedId) {
    database.ref(`watched/${watchedId}`).once('value', (snapshot) => {
        const movie = snapshot.val();
        
        // Remove rating and watched date before adding back to movies
        const movieData = {
            title: movie.title,
            director: movie.director,
            year: movie.year,
            genre: movie.genre
        };
        
        database.ref('movies').push(movieData)
            .then(() => {
                return database.ref(`watched/${watchedId}`).remove();
            })
            .then(() => {
                loadWatchedMovies();
                updateGenres();
                
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message floating';
                successMsg.textContent = 'Movie moved back to watchlist!';
                document.body.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
            })
            .catch((error) => {
                console.error('Error unarchiving movie:', error);
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message floating';
                errorMsg.textContent = 'Error moving movie. Please try again.';
                document.body.appendChild(errorMsg);
                
                setTimeout(() => {
                    errorMsg.remove();
                }, 3000);
            });
    });
}

// Initialize the application
updateGenres();