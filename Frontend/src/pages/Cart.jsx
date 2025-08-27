import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CartTotal from '../components/CartTotal';

function Cart() {
    const { products, currency, cartItems, updateQuantity ,navigate} = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    // Convertir cartItems en format tableau pour l'affichage
    useEffect(() => {
        if(products.length >0){
            const newCartItems = [];

        for (const productId in cartItems) {
            for (const size in cartItems[productId]) {
                if (cartItems[productId][size] > 0) {
                    newCartItems.push({
                        _id: productId,
                        size,
                        quantity: cartItems[productId][size],
                    });
                }
            }
        }

        setCartData(newCartItems);
        }
        
    }, [cartItems,products]);

    function handleDelete(productId, size) {
        updateQuantity(productId, size, 0);
    }

    function handleUpdate(productId, size, quantity) {
        updateQuantity(productId, size, quantity);
    }

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>
            <div>
                {cartData.map((pro, index) => {
                    const productData = products.find((prod) => prod._id == pro._id);

                    if (!productData) return null;

                    return (
                        <div key={index} className='py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                            <div className='flex items-center gap-6'>
                                <img className='w-16 h-20 sm:h-24 sm:w-20' src={productData.image[0]} alt="" />
                                <div>
                                    <p className='text-sm sm:text-lg font-medium'>{productData.name}</p>
                                    <div className='flex items-center gap-5 mt-2'>
                                        <p>{currency}{productData.price}</p>
                                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{pro.size}</p>
                                    </div>
                                </div>
                            </div>
                            <input 
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || value === '0') {
                                        handleDelete(pro._id, pro.size);
                                    } else {
                                        handleUpdate(pro._id, pro.size, Number(value));
                                    }
                                }} 
                                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                                type="number" 
                                min={1} 
                                value={pro.quantity} 
                            />
                            <DeleteRoundedIcon 
                                onClick={() => handleDelete(pro._id, pro.size)} 
                                className='mr-4 cursor-pointer text-gray-500 hover:text-red-500' 
                            />
                        </div>
                    );
                })}
            </div>

            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <div className='w-full text-end ' >
                      <button onClick={()=>navigate('/place-order')}  className='cursor-pointer bg-black text-white text-sm my-8 px-8 py-3 '>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;