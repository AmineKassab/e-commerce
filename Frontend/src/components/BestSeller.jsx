import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

function BestSeller() {
    const {products}=useContext(ShopContext);
    const [bestSeller,setBestSeller]=useState([]);
    useEffect(()=>{
        const bestProduct=products.filter((pro)=>{
            return(pro.bestseller);
        })
        setBestSeller(bestProduct.slice(1,6));
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, corporis ad autem delectus deserunt </p>
             
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((pro,index)=>{
                    return(
                        <ProductItem key={index} id={pro._id} image={pro.image} name={pro.name} price={pro.price} />
                    )
                    
                })
            }
        </div>

    </div>
  )
}

export default BestSeller