import { useContext, useEffect, useState } from "react";
import useBreedList from "../hooks/useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";
import { useSearchParams } from "react-router-dom";

const animals = ["bird", "cat", "dog", "rabbit", "reptile"];

function SearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [location, setLocation] = useState(searchParams.get('location') || "");
  const [animal, setAnimal] = useState(searchParams.get("animal" || ""));
  const [breed, setBreed] = useState(searchParams.get('breed' || ""));
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    requestPets().catch(() => {});
    console.log(searchParams)
  }, []);

  async function requestPets() {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
    );

    const data = await response.json();
    setPets(data.pets);
  }

  function handleSubmit(event) {
    event.preventDefault();
    requestPets();
    const queryParams = {};
    if (location) queryParams.location = location;
    if (breed) queryParams.breed = breed;
    if (animal) queryParams.animal = animal;

    setSearchParams(queryParams);
  }

  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          placeholder="Location"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />

        <label htmlFor="animal">Animal</label>
        <select
          id="animal"
          value={animal}
          onChange={(e) => {
            setAnimal(e.target.value);
          }}
          onBlur={(e) => {
            setAnimal(e.target.value);
          }}
        >
          <option />
          {animals.map((animal) => (
            <option value={animal} key={animal}>
              {animal}
            </option>
          ))}
          ;
        </select>

        <label htmlFor="breed">Breed</label>
        <select
          id="breed"
          disabled={!breeds.length}
          value={breed}
          onChange={(e) => {
            setBreed(e.target.value);
          }}
          onBlur={(e) => {
            setBreed(e.target.value);
          }}
        >
          <option />
          {breeds.map((breed) => (
            <option value={breed} key={breed}>
              {breed}
            </option>
          ))}
          ;
        </select>

        <label htmlFor="theme">Choose theme:</label>
        <select
          value={theme}
          id="theme"
          onChange={(e) => setTheme(e.target.value)}
          onBlur={(e) => setTheme(e.target.value)}
        >
          <option value="peru">Peru</option>
          <option value="pink">Pink</option>
          <option value="blue">Blue</option>
        </select>

        <button type="submit" style={{ backgroundColor: theme }}>
          Submit
        </button>
      </form>

      <Results pets={pets} />
    </div>
  );
}

export default SearchParams;
