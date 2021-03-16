import {useState} from "react";

const Create = () => {

    const [input, setInput] = useState({
        name: "",
        imageUrl: "",
        description: "",
        length: "",
        width: "",
        height: "",
        creator: ""
    });

    return ( 
        <div>
            Create Design Form
        </div>
     );
}
 
export default Create;