import MoviesAutocomplete from "./components/movies-autocomplete/MoviesAutocomplete";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.root}>
      <p>Search for movies below:</p>
      <MoviesAutocomplete />
    </div>
  );
}

export default App;
