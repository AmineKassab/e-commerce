import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import SearchIcon from '@mui/icons-material/Search';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useLocation } from 'react-router';

function SearchBar() {



  const {search,setSearch,showSearch,setShowSearch} = useContext(ShopContext);
  const location=useLocation();
  const [visible,setVisible]=useState(false);
  

  useEffect(()=>{
    if(location.pathname.includes('collection')){
        setVisible(true);
    }else{
        setVisible(false)
    }
  },[location])

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w1/2 '>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
            <SearchIcon  />
        </div>
        <CloseRoundedIcon onClick={()=>setShowSearch(false)} className=' cursor-pointer' />
    </div>
  ):null
}

export default SearchBar