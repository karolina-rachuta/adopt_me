import { useEffect, useState } from "react";
import Pet from "./Pet";
import useBreedList from "../hooks/useBreedList";


const animals = ["bird", "cat", "dog", "rabbit", "reptile"];

function SearchParams() {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets().catch(() => {});
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
        <button type="submit">Submit</button>
      </form>

      {pets.map(({name, animal, breed, id}) => (
        <Pet name={name} animal={animal} breed={breed} key={id}/>
      ))}
    </div>
  );
}

export default SearchParams;