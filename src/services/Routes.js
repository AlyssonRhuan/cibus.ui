import api from './api'
import Icons from '../utils/IconsUtils'

import NotFoundView from '../views/notFoundView/NotFound'
import UserView from '../views/userView/User'
import ProductView from '../views/productView/Product'
import CategoryView from '../views/categoryView/Category'
import MeView from '../views/meView/Me'

export default async function Routes() {       
    const userId = await localStorage.getItem("AuthorizationId"); 
    const { data } = await api.get(`view/user/${userId}`)
    
    let rotas = []

    data.map( 
        (tela, key) => {rotas.push({ ...tela, view: NotFoundView });
    })

    rotas.map(
        (tela, key) => {
        switch (tela.path) {
            case "/me":
                tela.view = MeView;
                tela.icon = Icons.MeWhite;
                tela.iconHome = Icons.MeWColorful;   
                break;
            case "/user":
                tela.view = UserView;
                tela.icon = Icons.UserWhite;   
                tela.iconHome = Icons.UserColorful;             
                break;
            case "/product":
                tela.view = ProductView;
                tela.icon = Icons.ProductWhite;
                tela.iconHome = Icons.ProductColorful;
                break;
            case "/category":
                tela.view = CategoryView;
                tela.icon = Icons.CategoryWhite;
                tela.iconHome = Icons.CategoryColorful;
                break;
            default:
                tela.view = NotFoundView;
                break;
        }
    })

    await Promise.resolve(rotas);
    return rotas;
}
