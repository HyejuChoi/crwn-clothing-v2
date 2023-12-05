import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, quantity, price} = cartItem;

    const { addItemToCart, removeItemToCart, clearItemToCart } = useContext(CartContext);
    
    const clearItemHandler = () => clearItemToCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);
    return (
        <div className='checkout-item-container'>
            <div className='image-container'><img src={imageUrl} alt={`${name}`} /></div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
                <div class='value'>{quantity}</div>
                <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className='price'>${price}</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>         
        </div>
    );                
}

export default CheckoutItem;