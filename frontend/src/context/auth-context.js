import {createContext} from "react";

export const AuthContenxt = createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    login: () => {},
    logout: () => {},
});