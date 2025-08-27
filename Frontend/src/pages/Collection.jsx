import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import Title  from '../components/Title';
import ProductItem from '../components/ProductItem';
import { Link } from 'react-router';

function Collection() {

  const {products,search,showSearch}=useContext(ShopContext);
  const [showfilter,setShowfilter]=useState(true);
  const [filterProducts,setFilterProducts]=useState([]);
  const [Category,setCategory]=useState([]);
  const [subCategory,setSubCategory]=useState([]);
  const [sortType,setSortType]=useState('relavent')

  const toggleCategory=(e)=>{
    if(Category.includes(e.target.value)){
      setCategory((prev)=>{
        return(prev.filter((pro)=>{
        return(
          pro!== e.target.value
        )
      }))})
    }else{
      setCategory((prev)=>{
        return([...prev,e.target.value]);
      });
    }
  }

  const toggleSubCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory((prev)=>{
        return(prev.filter((pro)=>{
        return(
          pro!== e.target.value
        )
      }))})
    }else{
      setSubCategory((prev)=>{
        return([...prev,e.target.value]);
      });
    }
  }
  const filterAndSortProducts=()=>{
    let productsCopy = products.slice();
    if(showSearch && search){
      productsCopy = productsCopy.filter((pro)=>{
        return(pro.name.toLowerCase().includes(search.toLowerCase()))
      })
    }
    if(Category.length >0){
      productsCopy = productsCopy.filter((pro)=>{
        return(Category.includes(pro.category))
      })
    }
    if(subCategory.length >0){
      productsCopy = productsCopy.filter((pro)=>{
        return(subCategory.includes(pro.subCategory))
      })
    }

    switch(sortType){
      case 'low-high':
        setFilterProducts(productsCopy.sort((a,b)=>(a.price - b.price)))
        break ;

      case 'high-low':
        setFilterProducts(productsCopy.sort((a,b)=>(b.price - a.price)))
        break ;

      default:
        
        break;
      
      
    }


    
     setFilterProducts(() => {
        return productsCopy; 
    });
  }

  

  useEffect(() => {
    filterAndSortProducts();
  }, [Category, subCategory, sortType,search,showSearch,products]);



  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t '>
      {/* filter options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowfilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          
          <ArrowDropDownCircleOutlinedIcon className={`  -mt-1! sm:hidden!  transition-transform ${showfilter ? '' : 'rotate-270'}`}/>
        
          
        </p>
        {/** Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' : 'hidden'} sm:block! `}>
          <p className='mb-3 text-sm font-medium '>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
            </p>

          </div>

        </div>
        {/** subCategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showfilter ? '' : 'hidden'} sm:block! `}>
          <p className='mb-3 text-sm font-medium '>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
            </p>

          </div>

        </div>

      </div>
      {/** right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4  '>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          <select onChange={(e)=>setSortType(e.target.value)} className='rounded border-2 border-gray-300 text-sm px-2 '>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
          
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 '>
          {
            filterProducts.map((pro,index)=>{
                return(
                  <Link key={index} to={`/product/${pro._id}`}>
                    <ProductItem key={index} id={pro._id} image={pro.image} name={pro.name} price={pro.price} />
                  </Link>
                  
                )
            })
          }
        </div>

      </div>
    </div>
  )
}

export default Collection