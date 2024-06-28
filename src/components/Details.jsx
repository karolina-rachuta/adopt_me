import { useParams } from "react-router";

function Details() {
    const params = useParams();
    return (
        <>
        <h1>It works!haha {params.id}</h1>
        </>
    );
}

export default Details;