import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const SearchResultScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("multi");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = "2ad24314a9184f2f514a48f6ffe0870d";
  const apiUrl = "https://api.themoviedb.org/3/search/";

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${apiUrl}${searchType}?api_key=${apiKey}&query=${encodeURIComponent(
          searchQuery
        )}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderResultItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "https://via.placeholder.com/150",
          }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.resultTitle}>{item.title || item.name}</Text>
          <Text style={styles.resultPopularity}>
            Popularity: {item.popularity}
          </Text>
          <Text style={styles.resultReleaseDate}>
            Release Date: {item.release_date || item.first_air_date}
          </Text>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() =>
              navigation.navigate("MovieDetail", { movieId: item.id })
            }
          >
            <Text style={styles.detailsButtonText}>More Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search Movie/TV Show Name</Text>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Enter movie or TV show name"
      />

      <Text style={styles.label}>Choose Search Type</Text>
      <SelectList
        setSelected={setSearchType}
        data={[
          { key: "multi", value: "Multi" },
          { key: "movie", value: "Movie" },
          { key: "tv", value: "TV" },
        ]}
        placeholder="Select Type"
        search={false}
        dropdownStyles={styles.dropdownMenu}
        boxStyles={styles.dropdownButton}
        dropdownTextStyles={styles.dropdownButtonText}
        defaultOption={{ key: "multi", value: "Multi" }} 
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#6200EE"
          style={styles.loadingIndicator}
        />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : results.length === 0 ? (
        <Text style={styles.errorText}>No results found.</Text>
      ) : (
        <FlatList
          data={results}
          renderItem={renderResultItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
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
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#6200EE",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
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
  dropdownMenu: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  resultsList: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 2,
    marginBottom: 16,
    padding: 10,
  },
  cardImage: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resultPopularity: {
    fontSize: 14,
    color: "#555",
  },
  resultReleaseDate: {
    fontSize: 14,
    color: "#555",
  },
  detailsButton: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  detailsButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default SearchResultScreen;
