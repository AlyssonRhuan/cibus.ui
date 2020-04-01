import CategoryView from '../views/categoryView/Category';
import ProductView from '../views/productView/Product';
import MeView from '../views/meView/Me';
import Icons from '../utils/IconsUtils';

export default function Routes() {
    const rotas = [
        {
            path: "/me",
            name: "Me",
            view: MeView,
            icon: Icons.MeWhite
        },
        {
            path: "/product",
            name: "Product",
            view: ProductView,
            icon: Icons.ProductWhite
        },
        {
            path: "/category",
            name: "Category",
            view: CategoryView,
            icon: Icons.CategoryWhite
        }
    ];

    return rotas;
}
