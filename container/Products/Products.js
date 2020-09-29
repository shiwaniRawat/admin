import React from 'react'
import ProductsLeft from '../../component/ProductPage/ProductLeft/ProductLeft';
import ProductRight from '../../component/ProductPage/ProductRight/ProductRight';

import classes from "./Products.module.css" 
// import { useHistory } from 'react-router-dom'



function Products() {
    // const history =useHistory();
    return (
    <div className={classes.ProductPageContainer}>
        <div className={classes.ProductWrapper}>
         <ProductsLeft/> 
         <ProductRight/>
         {/* <Add /> */}
        </div>
    </div>
    )
}


export default Products ; 