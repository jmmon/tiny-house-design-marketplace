import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import {useState, useCallback, useEffect} from "react";

import Navbar from './components/parts/Navbar';
import Footer from './components/parts/Footer';
import Sidebar from './components/parts/Sidebar';
import Welcome from './components/Welcome';
import Register from './components/Register';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import Browse from './components/Browse';
import Details from './components/Details';
import Create from './components/Create';

import axios from "axios";
import Auth from './components/Auth/Auth';
import {AuthContext} from "./context/auth-context";

import Spinner from "./Containers/Spinner/Spinner";

let logoutTimer;

function App(props) {
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    //const [user, setUser] = useState();

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        setUserId(uid);
        setIsLoading(false);
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(expirationDate);
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: uid,
                token: token,
                expiration: tokenExpirationDate.toISOString()
            })
        );
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }, []);

    const logout = useCallback(() => {
        setToken(null);
    })

    return (
        <div className="App">
            <Router>
                <Navbar user={user}/>
                <Sidebar />
                <div className="Content">
                    <Switch>
                        <Route exact path="/">
                            <Welcome />
                        </Route>
                        <Route path="/login">
                            <Login setUser={setUser}/>
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/browse">
                            <Browse />
                        </Route>
                        <Route path="/create">
                            <Create />
                        </Route>
                        <Route path="/details/:id">
                            <Details />
                        </Route>
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
