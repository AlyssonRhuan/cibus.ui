import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default class Auth{
    static isAuthenticated(){
        return false;
    }

    static async getUserId(){
        return await localStorage.getItem("AuthorizationId"); 
    }

    static async getToken(){
        return await localStorage.getItem("Authorization"); 
    }

    static async onLogout(){
        await localStorage.removeItem("Authorization");
        await localStorage.removeItem("AuthorizationId");
        // <Redirect to="/login" />
    }

    static async onLogin(authorization, userId) {
        await localStorage.setItem("Authorization", authorization);
        await localStorage.setItem("AuthorizationId", userId);
        // <Redirect to="/" />
    }
}