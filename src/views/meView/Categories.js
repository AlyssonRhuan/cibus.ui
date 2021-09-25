import React, { useState, useEffect } from 'react';

function Categories(props) {
    const [activeCategory, setActiveCategory] = useState(1);

    function onCategorySelected(categoryId) {
        setActiveCategory(categoryId);
        props.onChangeCategory(categoryId);
    }

    const categories = [
        { id: 1, label: 'Perfil'},
        { id: 2, label: 'Senha'},
        { id: 3, label: 'Meu saldo'},
        { id: 0, label: 'Configurações'}
    ]

    return (
        <main className="col-12 px-0" style={{zIndex: '0'}}>
            <div className="list-group col-12 mx-0 px-0">
                {
                    categories && categories.map((category, key) => {
                        return <a href="#" key={category.id} className={`list-group-item list-group-item-action ${activeCategory === category.id ? "active" : ""}`}
                            onClick={() => onCategorySelected(category.id)}>{category.label}</a>
                    })
                }
            </div>
        </main>
    );
}

export default Categories;