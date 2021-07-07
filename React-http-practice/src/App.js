import React,{useState,useCallback,useEffect} from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  /** Fetching data from server */
  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Some thing went wrong');
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(transformedMovies);
    } catch (err) {
      setIsError(err.message);
    }
    setIsLoading(false);
  },[]);

  useEffect(() => {
    fetchMovies();
  },[fetchMovies])
  
  /** Post request - Adding data to a database */
  const addMovieHandler = async (movie) => {
    // try {
    //   const response = await fetch('', {
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json'
    //     }

    //   });
    //   if (!response.ok) {
    //     throw new Error('Some thing went wrong');
    //   }
    //   const data = await response.json();
    //   console.log(data);
    // } catch (err) {
    //   setIsError(err.message);
    // }
    console.log(movie);
    
  };

  let content = <p>Found no movies...</p>;
  
  if (movies.length > 0) {
    content = <MoviesList movies={ movies }/>
  }

  if (isError) {
    content = <p>{ isError }</p>
  }

  if (isLoading) {
    content=<p>Loading.....</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={ addMovieHandler }/>
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
