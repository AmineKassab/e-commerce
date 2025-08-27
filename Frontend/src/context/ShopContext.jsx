import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from "react";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [products,setProducts]=useState([])
    const [token,setToken]=useState('')
    const navigate=useNavigate();
    
    // Fonction pour charger le panier depuis localStorage
    /*const loadCartFromStorage = () => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                // Convertir le format tableau en format objet pour cartItems
                const cartItemsFormat = {};
                
                parsedCart.forEach(item => {
                    if (!cartItemsFormat[item._id]) {
                        cartItemsFormat[item._id] = {};
                    }
                    cartItemsFormat[item._id][item.size] = item.quantity;
                });
                
                return cartItemsFormat;
            }
        } catch (error) {
            console.error('Erreur lors du chargement du panier:', error);
        }
        return {};
    };*/

    // Initialiser cartItems avec les données du localStorage
    const [cartItems, setCartItems] = useState({});
    const [cartTotal, setCartTotal] = useState(0);

    // Fonction pour sauvegarder dans localStorage
    /*const saveCartToStorage = (cartData) => {
        const cartArray = [];
        for (const productId in cartData) {
            for (const size in cartData[productId]) {
                if (cartData[productId][size] > 0) {
                    cartArray.push({
                        _id: productId,
                        size,
                        quantity: cartData[productId][size],
                    });
                }
            }
        }
        localStorage.setItem('cart', JSON.stringify(cartArray));
    };*/

    // Sauvegarder automatiquement quand cartItems change
    /*useEffect(() => {
        saveCartToStorage(cartItems);
    }, [cartItems]);*/

    const addToCart = async (itemId, size) => {
        if (size) {
            setCartItems((prevCart) => {
                const updatedCart = { ...prevCart };

                if (!updatedCart[itemId]) {
                    updatedCart[itemId] = {};
                }

                if (!updatedCart[itemId][size]) {
                    updatedCart[itemId][size] = 1;
                } else {
                    updatedCart[itemId][size] += 1;
                }

                return updatedCart;
            });

        }
        if(token){
            try {
               await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers: {Authorization: `Bearer ${token}`}})

            } catch (error) {
               console.log(error) 
               toast.error(error.message)
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error("Erreur:", error);
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = async(itemId, size, quantity) => {
        setCartItems((prev) => {
            const cartData = structuredClone(prev);

            if (quantity > 0) {
                cartData[itemId][size] = quantity;
            } else {
                delete cartData[itemId][size];
                
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }

            return cartData;
        });
        if(token){
            try {
               await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers: {Authorization: `Bearer ${token}`}})

            } catch (error) {
               console.log(error) 
               toast.error(error.message)
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        
        for (const productId in cartItems) {
            const itemInfo = products.find(pro => pro._id == productId);
            if (!itemInfo) continue; 

            for (const size in cartItems[productId]) {
                const quantity = cartItems[productId][size];
                if (quantity > 0) {
                    totalAmount += quantity * Number(itemInfo.price);
                }
            }
        }

        return totalAmount;
    };

    const getProductsData=async()=>{
        try {
            const response=await axios.get(backendUrl+'/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message) 
        }
    }

    const  getUserCart=async(token)=>{
        try {
            const response = await axios.post(backendUrl+'/api/cart/get',{},{headers: {Authorization: `Bearer ${token}`}})
            if(response.data.success){
                setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.log(error) 
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        cartTotal,
        setCartTotal,
        navigate,
        backendUrl,
        token,
        setToken,
        setCartItems
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;