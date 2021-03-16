import useFetch from "./hooks/useFetch";
import { useParams, useHistory } from "react-router-dom";

const Details = () => {
    const { id } = useParams();

    const { data: design, isPending, error } = useFetch('http://localhost:3037/api/details/'+id);
    const history = useHistory();
    console.log('fetched design', design);

    const handleDelete = () => {
        fetch('/api/details/' + id, {   //TODO
            method: "DELETE"
        })
        .then(() => {
            history.push('/browse');
        })
    };

    return ( 
        <div className="design-details">
            <h2>Design Details - { id }</h2>
            {error && <div>{ error }</div>}
            {isPending && <div>Loading...</div>}
            {design && (

                <article>
                    <h3>{design[0].name}</h3>
                    <h4>{design[0].creator}</h4>
                    <p>{design[0].imageUrl}</p>
                    <p>{design[0].description}</p>
                    <p>{design[0].length}</p>
                    <p>{design[0].width}</p>
                    <p>{design[0].height}</p>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
     );
}
 
export default Details;