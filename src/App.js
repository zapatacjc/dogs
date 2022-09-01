import { useQuery } from "react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import DogList from "./DogList";

import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

import TextField from "@mui/material/TextField";

export default function App() {
  const getDogsQuery = useQuery("getDogsRq", async () => {
    return axios.get(`https://dog.ceo/api/breeds/list/all`);
  });

  const [dogList, setDogsList] = useState([]);
  const [filteredDogsList, setFilteredDogsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const result = getDogsQuery?.data?.data?.message;
    if (result) {
      const breedList = Object.keys(result).map((breed) =>
        !result[breed].length
          ? breed
          : result[breed].reduce((subBreed) => subBreed)
      );
      setDogsList(breedList);
    } else {
      setDogsList([]);
    }
  }, [getDogsQuery.data]);

  useEffect(() => {
    if (searchInput) {
      const filterResult = dogList.filter((dog) => {
        return dog.includes(searchInput);
      });
      setFilteredDogsList(filterResult);
    } else {
      setFilteredDogsList(dogList);
    }
  }, [dogList, searchInput]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <Container maxWidth="sm">
      <h1>Dogs</h1>
      <TextField
        label="Search Breed"
        value={searchInput}
        onChange={handleChange}
      ></TextField>
      <div>
        {getDogsQuery.isLoading ? (
          <CircularProgress />
        ) : (
          <DogList filteredDogsList={filteredDogsList} />
        )}
      </div>
    </Container>
  );
}
