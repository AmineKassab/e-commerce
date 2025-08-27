import React, { useContext, useEffect, useState } from 'react'
import {assets} from'../assets/assets'
import { NavLink,Link } from "react-router";
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import { ShopContext } from '../context/ShopContext';

function Navbar() {
    const [visible,setVisible]=useState(false);
    const {setShowSearch,getCartCount,cartItems,setCartItems,navigate,token,setToken}=useContext(ShopContext)
    const logout=()=>{
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        
        console.log('Déconnexion réussie');
    }
    const [count,setCount]=useState(0);

   /*useEffect(() => {
        const interval = setTimeout(() => {
            const localCart = JSON.parse(localStorage.getItem('cart')) || {};
            const localCount = Object.values(localCart).reduce((acc, item) => acc + item.quantity, 0);
            setCount(localCount);
        }, 200); // petit délai pour laisser le temps à la synchro

        return () => clearTimeout(interval);
        }, []);*/


     useEffect(() => {
            const cartCount = getCartCount()
            setCount(cartCount);
    }, [cartItems]);
    
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to={'/'}><img src={assets.logo} className='w-36' alt='' /></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className={'flex flex-col items-center gap-1'}>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />

            </NavLink>
            <NavLink to='/collection' className={'flex flex-col items-center gap-1'}>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />

            </NavLink>
            <NavLink to='/about' className={'flex flex-col items-center gap-1 '}>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />

            </NavLink>
            <NavLink to='/contact' className={'flex flex-col items-center gap-1'}>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />

            </NavLink>
        </ul>
        <div className='flex items-center gap-6' >
            <Link to={'/collection'}><SearchIcon onClick={()=>setShowSearch(true)} className=' cursor-pointer' alt="" /></Link> 
            <div className='group relative'>
                <PermIdentityIcon className='-mt-2 cursor-pointer' onClick={()=>token ? null : navigate('/login')} />
                {/** drop down menu */}
                {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black '>My Profile</p>
                        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black '>Orders</p>
                        <p onClick={logout} className='cursor-pointer hover:text-black '>Logout</p>
                    </div>
                </div>}
            </div>
            <Link to='/cart' className='relative'>
                <ShoppingBagOutlinedIcon className='!min-w-5 -mt-2 ' />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full aspect-square text-[8px]' >{count}</p>
            </Link>
            <MenuRoundedIcon onClick={()=>setVisible(true)} className='cursor-pointer sm:hidden! '/>

        </div>
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ?"w-full":"w-0"}`} >
            <div className='divide-y divide-gray-300 flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    <ArrowDropDownCircleOutlinedIcon className='rotate-90' />
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>{setVisible(false)}}  className={'py-2 pl-6'} to='/'>HOME</NavLink>
                <NavLink onClick={()=>{setVisible(false)}}  className={'py-2 pl-6 '} to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={()=>{setVisible(false)}}  className={'py-2 pl-6 '} to='/about'>ABOUT</NavLink>
                <NavLink onClick={()=>{setVisible(false)}}  className={'py-2 pl-6 '} to='/contact'>CONTACT</NavLink>
            </div>
        </div>

    </div>
  )
}

export default Navbar