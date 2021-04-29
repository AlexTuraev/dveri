import React from 'react';

const getProductsForCategory = (categoryId, products=[]) =>{
    return products.filter(product => {
        return (product.categoryId === categoryId);
    });
}

const withItemsGrid = (Wrapped) => ({openCategories, products}) => {
    const filteredProducts = getProductsForCategory(openCategories[openCategories.length-1], products);
    console.log(filteredProducts);
    return <Wrapped filteredProducts={filteredProducts} />
}

export default withItemsGrid;