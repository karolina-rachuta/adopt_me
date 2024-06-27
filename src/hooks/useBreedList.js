import {
    useEffect,
    useState
} from "react";

const localCache = {};

//ma zgarniac liste breedow w zaleznosci od animal
function useBreedList(animal) {
    //potrzebujemy gdzies trzymac liste tych wszystkich ras:
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState("unloaded");

    //use effect aby wywolac request
    // jezeli mamy juz zapisane breeds dla danego animala bierzemy z localCache, jesli nie to robimy requests do servera
    useEffect(() => {
        if (!animal) {
            setBreedList([]);
        } else if (localCache[animal]) {
            setBreedList(localCache[animal])
        } else {
            requestBreedList().catch(() => {});
        }
    }, [animal]);

    async function requestBreedList() {
        setBreedList([]);
        setStatus("loading")
        const response = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
        const data = await response.json();
        //memoizacja
        localCache[animal] = data.breeds;
        //jesli data.breeds jest undefined to trzeba zaladowac mu pusta tablice
        //zmiana na memoizacje i stan pobierany z cache
        setBreedList(localCache[animal]);
        setStatus("loaded");
    }
    //bedzie dwuwymiarowa tablica
    return [breedList, status];
};

export default useBreedList;