import api from '../services/api'
import Icons from '../utils/IconsUtils'

import NotFoundView from '../views/notFoundView/NotFound'
import HomeView from '../views/homeView/Home'
import UserView from '../views/userView/User'
import ProductView from '../views/productView/Product'
import CategoryView from '../views/categoryView/Category'

export default async function Routes() {        
    const { data } = await api.get(`view`)

    let rotas = []

    data.map(tela => {
        rotas.push({ ...tela, view: NotFoundView });
    })

    rotas.map(tela => {
        switch (tela.path) {
            case "/":
                tela.view = HomeView;
                tela.icon = Icons.HomeWhite;
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
