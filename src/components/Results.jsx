import Pet from "./Pet";

function Results({ pets }) {
  return (
    <>
      {!pets.length ? (
        <h1>No pets found.</h1>
      ) : (
        pets.map(({ name, animal, breed, id, images, city, state }) => (
          <Pet
            name={name}
            animal={animal}
            breed={breed}
            key={id}
            images={images}
            location={`${city}, ${state}`}
            id={id}
          />
        ))
      )}
    </>
  );
}

export default Results;
