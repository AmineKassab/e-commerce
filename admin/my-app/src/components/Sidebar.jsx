import React from 'react'
import {NavLink} from 'react-router'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';


const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
       <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px] '>
          <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/add" >
              <AddCircleOutlineIcon style={{fontSize:"30px"}} /> 
              <p className='hidden md:block'>Add Items</p>
          </NavLink>
          <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/list" >
              <AssignmentTurnedInIcon style={{fontSize:"30px"}} /> 
              <p className='hidden md:block'>List Items</p>
          </NavLink>
          <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/orders" >
              <ReceiptLongIcon style={{fontSize:"30px"}} /> 
              <p className='hidden md:block'>Orders</p>
          </NavLink>
       </div> 
    </div>
  )
}

export default Sidebar ;