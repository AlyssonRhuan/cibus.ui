import CategoryView from '../views/categoryView/Category';
import ProductView from '../views/productView/Product';
import SaleView from '../views/saleView/Sale';
import { AiOutlineUser, AiOutlineAppstore, AiOutlineBulb, AiFillCreditCard, AiOutlineShoppingCart } from "react-icons/ai";
import { MdNotifications, MdAttachMoney } from 'react-icons/md';
import { FaCashRegister } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import ReportView from '../views/reportView/Report';
import PaymentView from '../views/paymentView/Payment';
import ShopView from '../views/shopView/Shop';
import UnavailableService from '../views/errorsView/UnavailableService';
import CashView from '../views/cashView/Cash';
import NotificationView from '../views/notificationView/Notifications';
import UserView from '../views/userView/User';
import React from 'react';

export default function Routes() {
    const rotas = [
        // {
        //     path: "/shop",
        //     name: "Loja",
        //     view: ShopView,
        //     icon: <AiOutlineShoppingCart />,
        //     isInSideBar: true,
        //     roles: ['ROLE_CLIENT']
        // },
        // {
        //     path: "/",
        //     name: "Loja",
        //     view: ShopView,
        //     icon: <AiOutlineShoppingCart />,
        //     isInSideBar: true,
        //     roles: ['ROLE_CLIENT']
        // },
        {
            path: "portal/category",
            name: "Categorias",
            view: CategoryView,
            icon: <AiOutlineAppstore />,
            isInSideBar: true,
            roles: ['ROLE_ADMIN'],
            isAuth: () => {
                return false;
            }
        },
        {
            path: "portal/product",
            name: "Produtos",
            view: ProductView,
            icon: <AiOutlineBulb />,
            isInSideBar: true,
            roles: ['ROLE_ADMIN']
        },
        {
            path: "portal/users",
            name: "Usuários",
            view: UserView,
            icon: < FiUsers />,
            isInSideBar: true,
            roles: ['ROLE_ADMIN']
        },
        {
            path: "portal/cash",
            name: "Caixas",
            view: CashView,
            icon: <FaCashRegister />,
            isInSideBar: true,
            roles: ['ROLE_ADMIN']
        },
        {
            path: "portal/sale",
            name: "Vendas",
            view: SaleView,
            icon: <AiFillCreditCard />,
            isInSideBar: true,
            roles: ['ROLE_ADMIN']
        },
        {
            path: "portal/payment",
            name: "Pagamentos",
            view: PaymentView,
            icon: <MdAttachMoney />,
            isInSideBar: true,
            roles: ['ROLE_ADMIN']
        },
        {
            path: "portal/notifications",
            name: "Notificações",
            view: NotificationView,
            icon: <MdNotifications />,
            isInSideBar: true,
            roles: ['ROLE_ADMIN', 'ROLE_CLIENT']
        },
        {
            path: "portal/report",
            name: "Relatórios",
            view: ReportView,
            icon: <HiOutlineDocumentReport />,
            isInSideBar: true,
            roles: ['ROLE_ADMIN']
        },
        {
            path: "portal/unavailableservice",
            name: "UnavailableService",
            view: UnavailableService,
            icon: <AiOutlineUser />,
            isInSideBar: false,
            roles: ['ROLE_ADMIN', 'ROLE_CLIENT']
        }
    ];

    return rotas;
}