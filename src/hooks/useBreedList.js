import { useEffect, useState } from "react";

//ma zgarniac liste breedow w zaleznosci od animal
function useBreedList(animal) {
    //potrzebujemy gdzies trzymac liste tych wszystkich ras:
    const [breedList, setBreedList] = useState([]);

    //use effect aby wywolac request
    useEffect(()=> {
        requestBreedList().catch(() => {});
    }, [animal]);

    async function requestBreedList() {
        setBreedList([]);
        const response = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
        const data = await response.json();
        //jesli data.breeds jest undefined to trzeba zaladowac mu pusta tablice
        setBreedList(data.breeds || []);
    }
    //bedzie dwuwymiarowa tablica
    return [breedList];
};

export default useBreedList;