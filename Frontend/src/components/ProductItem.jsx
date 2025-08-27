// ProductItem.jsx
import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

function ProductItem({  image, name, price }) {
  const { currency } = useContext(ShopContext)
  return (
    <div className='cursor-pointer'>
      <div className='overflow-hidden'>
        <img className='max-w-[190px] h-[260px] hover:scale-110 transition ease-in-out' src={image[0]} alt={name} />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </div>
  )
}

export default ProductItem
