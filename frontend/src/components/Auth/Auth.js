import Axios from "axios";
import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import validateForm from "../../utils/validateform"
import validEmailRegex from "../../utils/emailRegex"
import {AuthContext} from "../../context/auth-context"
import Spinner from "../../Containers/Spinner/Spinner"

export class Auth extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                password: '',
            },
            error: {
                message: '',
                code: '',
            },
            isLoading: false,
            isLoginMode: true,

            errors: {
                email: '',
                password: ''
            }
        };
    }

    mySubmitHandler = (event) => {
        this.setState(pre => ({
            isLoading: true
        }));
        const auth = this.context;
        event.preventDefault();

        if (validateForm(this.state.errors)) {

        } else {

        }

        if (this.state.isLoginMode) {
            Axios.post('/users/login', this.state.user)
            .then(response => {
                this.setState(pre => ({
                    isLoading: false
                }));
                this.props.history.push('/');
                auth.login(response.data.userId, response.data.token);
            })
            .catch(e => {
                console.log('error', e)
            });

        } else {
            this.setState(pre => ({
                isLoading: true
            }));
            Axios.post('/users/register', this.state.user)
            .then(response => {
                this.setState(pre => ({
                    isLoading: false
                }));
            })
            .catch(e => {
                this.setState({ error: true });
            });
        }
        this.setState({
            user: { ...this.state.user, email: '', password: ''}
        });
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let errors = this.state.errors;
        this.setState({ errors, user: { ...this.state.user, [nam]: val } }, () => {

        });
    }

    switchLoginhandler = () => {
        this.setState(pre => ({
            isLoginMode: !pre.isLoginMode
        }))
    }

    render() {
        return (
        <>
            <div className="container container-short py-5">
                <h1 className="pt-2 py-2">{this.state.isLoginMode ? 'Login ' : 'Sign Up'}</h1>
                <hr></hr>
                <form onSubmit={this.mySubmitHandler} className="pt-4">
                    <div className="form-group">
                        <label htmlFor="email">Email </label>
                        <input 
                            type="email" 
                            name="email"
                            value={this.state.user.email}
                            className={"form-control " + (this.state.errors.email ? 'is-invalid' : '')}
                            placehoder="Enter your Email"
                            required
                            onChange={this.myChangeHandler}
                        />
                        {this.state.errors.email.length > 0 &&
                            <div className="mt-1"><span className="error text-danger">{this.state.errors.email}</span></div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password </label>
                        <input 
                            type="password"
                            name="password"
                            value={this.state.user.password}
                            className={"form-control " + (this.state.errors.password ? 'is-Invalid' : '')}
                            placeholder="Enter your Password"
                            required="required"
                            data-error="Please enter your password."
                            onChange={this.myChangeHandler}
                        />
                        {this.state.errors.password.length > 0 &&
                            <div className="mt-1"> <span className="error text-danger">{this.state.errors.password}</span></div>}
                    </div>

                    <div className="form-group">
                        <button 
                            style={{marginRight: '15px' }}
                            className="btn btn-primary"
                            type="submit"
                            disabled={this.state.user.email && this.state.user.password && (validateForm(this.state.errors)) ? '' : 'disabled'}
                        >
                            {this.state.isLoginMode ? 'Login' : 'Sign Up'}
                        </button>

                        <button 
                            className="btn btn-primary"
                            type="button"
                            onClick={this.switchLoginhandler}
                        >
                            Switch to {this.state.isLoginMode ? 'Sign Up' : 'Login'}
                        </button>
                    </div>
                </form>
                
            </div>
        </>
        )
    }
}

export default withRouter(Auth)