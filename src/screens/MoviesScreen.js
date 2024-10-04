import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list"; 

const MoviesScreen = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "2ad24314a9184f2f514a48f6ffe0870d";
  const apiUrl = "https://api.themoviedb.org/3/movie/";

  useEffect(() => {
    fetchMovies(selectedCategory);
  }, [selectedCategory]);

  const fetchMovies = async (category) => {
    setLoading(true); // Set loading to true before fetching
    setError(null); // Reset error state
    try {
      const response = await fetch(
        `${apiUrl}${category}?api_key=${apiKey}&page=1`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      setError(error.message); 
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  const renderMovieCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.popularity}>Popularity: {item.popularity}</Text>
          <Text style={styles.releaseDate}>
            Release Date: {item.release_date}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("MovieDetail", { movieId: item.id })
            }
          >
            <Text style={styles.buttonText}>More Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SelectList
        setSelected={setSelectedCategory}
        data={[
          { key: "now_playing", value: "Now Playing" },
          { key: "popular", value: "Popular" },
          { key: "top_rated", value: "Top Rated" },
          { key: "upcoming", value: "Upcoming" },
        ]}
        placeholder="Popular"
        search={false}
        dropdownStyles={styles.dropdownMenu}
        boxStyles={styles.dropdownButton}
        dropdownTextStyles={styles.dropdownButtonText}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text> //
      ) : movies.length === 0 ? (
        <Text style={styles.errorText}>No movies found.</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  dropdownButton: {
    height: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#6200EE",
    borderRadius: 5,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#6200EE",
  },
  dropdownMenu: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginBottom: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  popularity: {
    fontSize: 14,
    color: "#555",
  },
  releaseDate: {
    fontSize: 14,
    color: "#555",
  },
  button: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default MoviesScreen;
