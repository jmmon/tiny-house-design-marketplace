const BrowseDesign = ({name, imageUrl, description, length, width, height, creator}) => {
    return ( 
        <div>
            <h3>{name}</h3>
            <h4>{creator}</h4>
            <p>{imageUrl}</p>
            <p>{description}</p>
            <p>{length}</p>
            <p>{width}</p>
            <p>{height}</p>
        </div>
     );
}
 
export default BrowseDesign;