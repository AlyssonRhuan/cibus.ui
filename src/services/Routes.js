import CategoryView from '../views/categoryView/Category';
import ProductView from '../views/productView/Product';
import SaleView from '../views/saleView/Sale';
import { AiOutlineUser, AiOutlineAppstore, AiOutlineBulb, AiFillCreditCard, AiOutlineShoppingCart } from "react-icons/ai";
import { FaCashRegister } from "react-icons/fa";
import MeView from '../views/meView/Me';
import PurchaseView from '../views/purchaseView/Purchase';
import React from 'react';
import UnavailableService from '../views/errorsView/UnavailableService';
import CashView from '../views/cashView/Cash';


export default function Routes() {
    const rotas = [
        {
            path: "/category",
            name: "Categoria",
            view: CategoryView,
            icon: <AiOutlineAppstore/>,
            isInSideBar: true
        },
        {
            path: "/product",
            name: "Produto",
            view: ProductView,
            icon: <AiOutlineBulb/>,
            isInSideBar: true
        },
        {
            path: "/cash",
            name: "Caixa",
            view: CashView,
            icon: <FaCashRegister/>,
            isInSideBar: true
        },
        {
            path: "/sale",
            name: "Vendas",
            view: SaleView,
            icon: <AiFillCreditCard/>,
            isInSideBar: true
        },
        {
            path: "/me",
            name: "Eu",
            view: MeView,
            icon: <AiOutlineUser/>,
            isInSideBar: true
        },
        {
            path: "/purchase",
            name: "Loja",
            view: PurchaseView,
            icon: <AiOutlineShoppingCart/>,
            isInSideBar: true,
            style: {
                marginTop: '20px'
            }
        },
        {
            path: "/unavailableservice",
            name: "UnavailableService",
            view: UnavailableService,
            icon: <AiOutlineUser/>,
            isInSideBar: false
        }
    ];

    return rotas;
}
