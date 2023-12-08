import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/categories.context';

import { Title, CategoryContaier } from './category.styles';
import ProductCard from '../../components/product-card/product-card-component';

const Category = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    const { category } = useParams();
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title> 
            <CategoryContaier>            
                {
                    products && products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </CategoryContaier>
        </Fragment>
    );
};

export default Category; 