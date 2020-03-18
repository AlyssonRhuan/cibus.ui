import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default class Me{
    static async getMe(){
        return await localStorage.getItem("Me"); 
    }

    static async onLogout(){
        await localStorage.removeItem("Me");
    }

    static async onLogin(me) {
        await localStorage.setItem("Me", me);
    }
}