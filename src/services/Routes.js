import CategoryView from '../views/categoryView/Category';
import ProductView from '../views/productView/Product';
import SaleView from '../views/saleView/Sale';
import { AiOutlineUser, AiOutlineAppstore, AiOutlineBulb, AiFillCreditCard, AiOutlineShoppingCart } from "react-icons/ai";
import { MdNotifications } from 'react-icons/md';
import { FaCashRegister } from "react-icons/fa";
import MeView from '../views/meView/Me';
import ShopView from '../views/shopView/Shop';
import React from 'react';
import UnavailableService from '../views/errorsView/UnavailableService';
import CashView from '../views/cashView/Cash';
import NotificationView from '../views/notificationView/Notifications';


export default function Routes() {
    const rotas = [
        {
            path: "/category",
            name: "Categorias",
            view: CategoryView,
            icon: <AiOutlineAppstore/>,
            isInSideBar: true
        },
        {
            path: "/product",
            name: "Produtos",
            view: ProductView,
            icon: <AiOutlineBulb/>,
            isInSideBar: true
        },
        {
            path: "/cash",
            name: "Caixas",
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
            path: "/notifications",
            name: "Notificações",
            view: NotificationView,
            icon: <MdNotifications/>,
            isInSideBar: true,
        },
        {
            path: "/me",
            name: "Eu",
            view: MeView,
            icon: <AiOutlineUser/>,
            isInSideBar: true
        },
        {
            path: "/shop",
            name: "Loja",
            view: ShopView,
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
