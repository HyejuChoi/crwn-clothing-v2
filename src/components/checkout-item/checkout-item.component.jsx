import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {
    CheckoutItemContainer, 
    ImageContainer, 
    Img,
    Name,
    Quantity,
    Price,
    Arrow,
    Value,
    RemoveButton
} from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, quantity, price} = cartItem;

    const { addItemToCart, removeItemToCart, clearItemToCart } = useContext(CartContext);
    
    const clearItemHandler = () => clearItemToCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);
    return (
        <CheckoutItemContainer>
            <ImageContainer><Img src={imageUrl} alt={`${name}`} /></ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <Price>${price}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>         
        </CheckoutItemContainer>
    );                
}

export default CheckoutItem;