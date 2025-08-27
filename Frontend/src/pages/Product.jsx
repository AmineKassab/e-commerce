import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ShopContext } from '../context/ShopContext';
import StarRateIcon from '@mui/icons-material/StarRate';
import RelatedProducts from '../components/RelatedProducts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Product() {
  const {productId}=useParams();
  const {products,currency,addToCart}=useContext(ShopContext);
  const [productData,setProductData]=useState(null);
  const[image,setImage]=useState('');
  const [size,setSize]=useState()

  const handleError = () => {
    toast.error('Select Product Size');
  };

  const fetchProductData=()=>{
    const foundProduct = products.find((pro)=>{
      
      return(pro._id === (productId));
      
    })
    
    if (foundProduct) {
      setImage(foundProduct.image[0])
      setProductData(foundProduct);
    }
     
      
     
     
  }

  useEffect(()=>{
    if(products && products.length > 0 && productId){
      fetchProductData();
      console.log(productData)
    }
    
  },[productId,products])
  
 console.log('test from product')

  
  console.log(productData)
  
  return  (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-100 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/**product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row h-[500px]'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-24 gap-2'>
            
            {
            productData && Array.isArray(productData.image) && productData.image.length > 0 ? (
              productData.image.map((pht, index) => (
                <img 
                  
                  src={pht} 
                  key={index} 
                  className='w-[162px] h-[162px] object-cover flex-shrink-0 cursor-pointer '
                  onClick={() => setImage(pht)}
                  alt={`Image ${index + 1}`}
                />
              ))
            ) : (
              <p>Aucune image disponible</p>
            )
          }
          </div>
          <div className='flex-1'>
            {image != '' ?
            <img src={image} alt="" className='w-full h-full object-cover ' />:<p></p>
            }
          </div>
        </div>
        {/**product info */}
        <div className='flex-1'>
          {productData ? (
            <>
              <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
              <div className='flex items-center gap-1 mt-2'>
                <StarRateIcon className='text-yellow-500' />
                <StarRateIcon className='text-yellow-500'/>
                <StarRateIcon className='text-yellow-500'/>
                <StarRateIcon className='text-yellow-500'/>
                <StarRateIcon className='text-gray-300'/>
                <p className='pl-2'>(112)</p>
              </div>
              <p className='mt-5 text-3xl font-medium '>{currency}{productData.price}</p>
              <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
              <div className='flex flex-col gap-4 my-8'>
                <p>Select Size</p>
                <div className='flex gap-2 '>
                  {
                  productData.sizes.map((sz,index)=>{
                    return(
                      <button onClick={()=>{setSize(sz)}} key={index} className={`cursor-pointer border py-2 px-4 bg-gray-100 ${sz === size? 'border-orange-500' : '' }`} >{sz}</button>
                    )
                    
                  })
                  }
                </div>
              </div>
              {
                productData ? 
                <button
                  onClick={() => {
                    if (!size) {
                      handleError();
                    }
                    addToCart(productData._id, size); // Add to cart
                  }}
                  disabled={!productData}
                  className={`cursor-pointer bg-black text-white px-8 py-3 text-sm active:bg-gray-700`}
                >
                  ADD TO CART
                </button>: <p></p>
              }
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored" // ou "light" si tu veux du blanc
              />
              
              <hr className='mt-8 sm:w-4/5' />
              <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>100% Original product</p>
                <p>Cash on delivery is available on this product</p>
                <p>Easy return and exchange policy within 7 days</p>
              </div>
            </>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      {/** description & preview */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (419)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident eum facilis quo ea necessitatibus placeat? Voluptas, dignissimos quam! Iste, perspiciatis? Perferendis in facilis possimus alias dolorem dignissimos. Possimus magni itaque maxime deleniti dolore illo inventore molestiae iste? Recusandae, ab, non vero repellat exercitationem perspiciatis quaerat praesentium dicta, iste quis eligendi.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias earum labore, est vero iste perferendis nemo tempora dignissimos sunt fuga alias incidunt! Repellendus possimus saepe at, quidem rerum molestiae repellat.</p>

        </div>
      </div>
      {/** related product */}
      {
        (productData)?
          <RelatedProducts category={productData.category} subcategory={productData.subCategory} />
        :<div></div>
      }
    </div>
  ) 
}

export default Product