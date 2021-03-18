import {useState} from "react";
import {useHistory} from "react-router-dom";


const Register = () => {
    const history = useHistory();

    const [input, setInput] = useState({
        email: "",
        password: "",
        repeatPassword: ""
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

        const newUser = {
            email: input.email,
            password: input.password,
            repeatPassword: input.repeatPassword
        };

        console.log('new user', newUser);

        setIsPending(true);

        fetch('/api/users/register', {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(newUser)
        })
        .then(() => {
            console.log('new user posted', newUser);
            setIsPending(false);
            history.push('/');
        })
        .catch(err => {
            console.log(err);
            setIsPending(false);
        });
    };

    return ( 
        <div>
            <h2>Register a user</h2>
            <form id="register-form">
                <label htmlFor="email">Email</label>
                <input onChange={handleChange} value={input.email} id="email" name="email" type="text" required minLength="5" />
                <label htmlFor="password">Password</label>
                <input onChange={handleChange} value={input.password} id="password" name="password" type="password" required minLength="5" />
                <label htmlFor="repeatPassword">Repeat Password</label>
                <input onChange={handleChange} value={input.repeatPassword} id="repeatPassword" name="repeatPassword" type="password" required minLength="5" />
                { }
                { !isPending &&<button onClick={handleSubmit}>Register</button> }
                { isPending && <button disabled>Processing...</button> }
            </form>
        </div>
     );
}
 
export default Register;