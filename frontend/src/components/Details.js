import useFetch from "./hooks/useFetch";
import { useParams, useHistory, Link } from "react-router-dom";

const Details = () => {
    const { id } = useParams();

    const { data: design, isPending, error } = useFetch('/api/designs/'+id);
    const history = useHistory();
    console.log('fetched design', design);

    const handleDelete = () => {
        fetch('/api/designs/' + id, {   //TODO
            method: "DELETE"
        })
        .then(() => {
            history.push('/browse');
        })
    };

    return ( 
        <div className="container">
            {design && <h1>Design Details - { design.name }</h1>}
            {error && <div>{ error }</div>}
            {isPending && <div>Loading...</div>}
            {design && (
                <article class="design-details">
                    <h3>{design.name}</h3>
                    <h4>{design.creator}</h4>
                    <p>{design.imageUrl}</p>
                    <p>{design.description}</p>
                    <p>{design.length}</p>
                    <p>{design.width}</p>
                    <p>{design.height}</p>
                    <Link to="/browse"><button>Back</button></Link>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
     );
}
 
export default Details;