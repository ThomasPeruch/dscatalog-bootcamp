import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { Link } from 'react-router-dom';
import './styles.scss';
import { makeRequest } from '../../core/utils/request';
import { ProductsResponse } from '../../core/types/Product';
import ProductCardLoader from './components/ProductCardLoader';

function Catalog(){
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const[isLoading, setIsLoading] = useState(false);

    useEffect(function(){
        const params= {
            page: 0, 
            linesPerPage: 12
        }

        setIsLoading(true);
        makeRequest({ url: '/products',params})
            .then(response => setProductsResponse(response.data))
            .finally(() => {setIsLoading(false)})
    },[]);
    return(
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálogo de produtos 
            </h1>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <ProductCard product={product}/>
                        </Link>
                    ))
                )}
                {}   
            </div>
        </div>
    )
};

export default Catalog;