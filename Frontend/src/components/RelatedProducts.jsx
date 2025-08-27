import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import  Title  from './Title.jsx';
import ProductItem from './ProductItem'
import { Link } from 'react-router';

function RelatedProducts({category,subcategory}) {
    const {products}=useContext(ShopContext)
    const [related,setRelated]=useState([]);

    useEffect(()=>{
        if(products.length >0){
            let productsCopy =[...products];
            productsCopy =productsCopy.filter((pro)=>{
                return(pro.category == category && pro.subCategory == subcategory)
            })
            setRelated(productsCopy.slice(0,5));
        }
    },[products])
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={"PRODUCTS"} />
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
            {
                related.map((pro,index)=>{
                    return(
                    <Link key={index} to={`/product/${pro._id}`}>
                        <ProductItem key={index} id={pro._id} image={pro.image} name={pro.name} price={pro.price} />
                    </Link>
                    
                    )   
                })
            }
        </div>
    </div>
  )
}

export default RelatedProducts