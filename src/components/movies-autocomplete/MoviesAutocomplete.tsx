import React, { useState } from "react";
import Autocomplete, { AutocompleteOption } from "../autocomplete/Autocomplete";
import Fetch from "../fetch/Fetch";
import Movie from "../../models/Movie";

const MoviesAutocomplete: React.FC = () => {
  const [query, setQuery] = useState("");
  const [movieId, setMovieId] = useState<number | null>(null);

  const url =
    query.length > 0
      ? `https://api.themoviedb.org/3/search/movie?api_key=46adf19d446a9d45cb333774af099e25&query=${query}`
      : null;

  const movieTransformer = ({
    results,
  }: {
    results: Movie[];
  }): AutocompleteOption[] =>
    results.map((movie) => ({
      label: movie.title,
      value: movie.id,
    }));

  return (
    <div>
      <Fetch
        url={url}
        responseTransformer={movieTransformer}
        render={({ isLoading, hasFailed, data: movies }) => (
          <Autocomplete
            label="Movie name"
            isLoading={isLoading}
            emptyMessage="No movies with this title"
            errorMessage={
              hasFailed ? "Could not load suggestions for movies" : undefined
            }
            options={movies}
            value={movieId}
            onChange={(id) => setMovieId(id as number)}
            typedValue={query}
            onChangeTypedValue={setQuery}
          />
        )}
      />
      <p>Selected movie ID: {movieId || "none"}</p>
    </div>
  );
};

export default MoviesAutocomplete;
