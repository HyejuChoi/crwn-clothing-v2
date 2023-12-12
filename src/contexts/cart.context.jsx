import { createContext, useReducer } from "react";

import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    // If found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
        cartItem.id === productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        );
    }
    // return new array with modified cartItems/new cart item
    return [...cartItems, {...productToAdd, quantity: 1} ]
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }

    // If found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
        cartItem.id === cartItemToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
        );        
    }

    // return new array with modified cartItems/new cart item
    return [...cartItems, {...cartItemToRemove, quantity: 1} ]
};

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false, 
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    cartItemToClear: () => {},
    cartCount: 0,
    setCartCount: () => {},
    cartTotal: 0,
    setCartTotal: () => {},
})

const CART_ACTION_TYPE = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
    isCartOpen: false, 
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
   const { type, payload } = action;

   switch(type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS:        
        return {
            ...state,
            ...payload,             
        }
    case CART_ACTION_TYPE.SET_IS_CART_OPEN:
        return {
            ...state,
            isCartOpen: payload,
        }
    default:
        throw new Error(`Unhandled type of ${type} in cartReducer`)
   }
}

export const CartProvider = ({children}) => {
    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemReducer = (cartItems) => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        
        const payroad = {
            cartItems, 
            cartTotal: newCartTotal, 
            cartCount: newCartCount
        }

        dispatch(
            createAction(CART_ACTION_TYPE.SET_CART_ITEMS, payroad))
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    }

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemReducer(newCartItems);
    }

    const clearItemToCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool));
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemToCart, 
        clearItemToCart, 
        cartItems, 
        cartCount, 
        cartTotal
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}