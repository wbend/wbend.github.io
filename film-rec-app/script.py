import csv
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Genre corrections dictionary
genre_corrections = {
    "Hundreds of Beavers": "Comedy",
    "Do Not Expect Too Much from the End of the World": "Drama",
    "From Dusk till Dawn": "Action",
    "The Brutalist": "Drama",
    "Crimes and Misdemeanors": "Drama",
    "Welcome to the Dollhouse": "Drama",
    "Cold War": "Drama",
    "Breakfast at Tiffany's": "Drama",
    "Final Fantasy: The Spirits Within": "Animated",
    "Berserk": "Animated",
    "The Killer": "Thriller",
    "Rebel Ridge": "Action",
    "Jeanne Dielman, 23 quai du Commerce, 1080 Bruxelles": "Drama",
    "Logan's Run": "Science Fiction",
    "The Judge": "Drama",
    "Beyond the Valley of the Dolls": "Drama",
    "Long Day's Journey into Night": "Drama",
    "The Wages of Fear": "Thriller",
    "Sorcerer": "Thriller",
    "Happiness": "Drama",
    "Orpheus": "Fantasy",
    "The Taking of Pelham One Two Three": "Thriller",
    "Vox Lux": "Drama",
    "Dangerous Liaisons": "Drama",
    "City Lights": "Comedy",
    "Cruising": "Thriller",
    "Dark City": "Science Fiction"
}

def process_movies(input_file):
    """Process the movie database and return cleaned data."""
    movies = {}  # Using dict for deduplication
    
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader)  # Skip header row
        
        for row in reader:
            if len(row) < 4:  # Skip malformed rows
                continue
                
            title = row[0].strip('"')
            director = row[1].strip('"')
            year = row[2].strip('"')
            genre = row[3].strip('"')
            
            # Skip entries with insufficient data
            if not title or title == "Anora":
                continue
            
            # Clean up year
            try:
                year = int(year) if year else None
            except ValueError:
                year = None
            
            # Apply genre correction if needed
            if genre == "Unsorted" and title in genre_corrections:
                genre = genre_corrections[title]
            
            # Create movie object
            movie = {
                "title": title,
                "director": director,
                "year": year,
                "genre": genre
            }
            
            # Update dictionary, preferring entries with non-Unsorted genres
            if title not in movies or (
                movies[title]["genre"] == "Unsorted" and genre != "Unsorted"
            ):
                movies[title] = movie
    
    # Convert to list and sort by title
    return sorted(movies.values(), key=lambda x: x["title"])

def upload_to_firebase(movies):
    """Upload movies to Firebase."""
    # Initialize Firebase with your credentials file
    cred = credentials.Certificate("film-rec-app-firebase-adminsdk-fbsvc-a86a44c28f.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://film-rec-app-default-rtdb.firebaseio.com'
    })
    
    # Clear existing movies
    ref = db.reference('movies')
    ref.delete()
    
    # Upload new movies
    for movie in movies:
        ref.push(movie)
        print(f"Added: {movie['title']} ({movie['genre']})")

def main():
    try:
        # First, process the movies
        movies = process_movies('movies-database.txt')
        
        # Print summary of changes
        print(f"\nProcessed {len(movies)} unique movies.")
        print("\nSample of processed movies:")
        for movie in movies[:5]:
            print(f"{movie['title']} ({movie['genre']})")
        
        # Ask for confirmation before uploading
        response = input("\nWould you like to upload these to Firebase? (yes/no): ")
        if response.lower() == 'yes':
            upload_to_firebase(movies)
            print("\nUpload complete!")
        else:
            # Save to JSON file instead
            with open('processed_movies.json', 'w', encoding='utf-8') as f:
                json.dump(movies, f, indent=2)
            print("\nSaved to processed_movies.json")
            
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        print("\nSaving current progress to processed_movies.json...")
        try:
            with open('processed_movies.json', 'w', encoding='utf-8') as f:
                json.dump(movies, f, indent=2)
            print("Progress saved successfully.")
        except:
            print("Could not save progress.")

if __name__ == "__main__":
    main()