import {useState} from "react";
import {useHistory} from "react-router-dom";

const Login = ({setUser}) => {
    const history = useHistory();

    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const [isPending, setIsPending] = useState(false);

    const handleChange = (event) => {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const userCredentials = {
            email: input.email,
            password: input.password,
        };

        console.log('userCredentials', userCredentials);

        setIsPending(true);

        fetch('/api/users/login', {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(userCredentials)
        })
        .then(() => {
            console.log('logged in as', userCredentials);
            setIsPending(false);
            setUser(input.email);
            history.push('/');
        })
        .catch(err => {
            console.log(err);
            setIsPending(false);
        });
    };

    return ( 
        <div>
            <h2>Login To Your Account</h2>
            <form id="login-form">
                <label htmlFor="email">Email</label>
                <input onChange={handleChange} value={input.email} id="email" name="email" type="text" />
                <label htmlFor="password">Password</label>
                <input onChange={handleChange} value={input.password} id="password" name="password" type="password" />
                { !isPending &&<button onClick={handleSubmit}>Login</button> }
                { isPending && <button disabled>Processing...</button> }
            </form>
        </div>
     );
}
 
export default Login;