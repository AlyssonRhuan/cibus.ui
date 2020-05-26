import CategoryView from '../views/categoryView/Category';
import ProductView from '../views/productView/Product';
import ProductDetailsView from '../views/productDetailsView/ProductDetails';
import MeView from '../views/meView/Me';
import Icons from '../utils/IconsUtils';

export default function Routes() {
    const rotas = [
        {
            path: "/me",
            name: "Me",
            view: MeView,
            icon: Icons.MeWhite,
            isInSideBar: true
        },
        {
            path: "/product",
            name: "Product",
            view: ProductView,
            icon: Icons.ProductWhite,
            isInSideBar: true
        },
        {
            path: "/product/:productId",
            name: "Product details",
            view: ProductDetailsView,
            icon: null,
            isInSideBar: false
        },
        {
            path: "/category",
            name: "Category",
            view: CategoryView,
            icon: Icons.CategoryWhite,
            isInSideBar: true
        },
    ];

    return rotas;
}
