import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Navbar from './components/parts/Navbar';
import Footer from './components/parts/Footer';
import Sidebar from './components/parts/Sidebar';
import Welcome from './components/Welcome';
import Register from './components/Register';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import Browse from './components/Browse';

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <div className="Content">
                    <Sidebar />
                    <Switch>
                        <Route exact path="/">
                            <Welcome />
                        </Route>
                        <Route path="/login">
                            <Login />
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
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
