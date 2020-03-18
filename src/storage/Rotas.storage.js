import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default class Rotas{
    static async getRotas(){
        return await localStorage.getItem("Rotas"); 
    }

    static async onLogout(){
        await localStorage.removeItem("Rotas");
    }

    static async onLogin(rotas) {
        await localStorage.setItem("Rotas", rotas);
    }
}