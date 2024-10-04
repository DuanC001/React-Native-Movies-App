import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";

const DetailScreen = ({ route }) => {
  const { movieId } = route.params; 
  const [movie, setMovie] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const apiKey = "2ad24314a9184f2f514a48f6ffe0870d"; 
  const apiUrl = "https://api.themoviedb.org/3/movie/";

  useEffect(() => {
    fetchMovieDetail(movieId);
  }, [movieId]);

  const fetchMovieDetail = async (id) => {
    setLoading(true); 
    setError(null); 
    try {
      const response = await fetch(`${apiUrl}${id}?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovie(data); 
    } catch (error) {
      setError(error.message); 
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6200EE" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!movie) {
    return <Text style={styles.errorText}>No movie found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={styles.image}
      />
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.popularity}>
        Popularity: {movie.popularity} | Release Date: {movie.release_date}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  overview: {
    fontSize: 16,
    marginBottom: 16,
  },
  popularity: {
    fontSize: 14,
    color: "#555",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default DetailScreen;
