import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Span,
    Total,
} from './checkout.styles';

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);
    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <Span>Product</Span>
                </HeaderBlock>
                <HeaderBlock>
                    <Span>Description</Span>
                </HeaderBlock>
                <HeaderBlock>
                    <Span>Quantity</Span>
                </HeaderBlock>
                <HeaderBlock>
                    <Span>Price</Span>
                </HeaderBlock>
                <HeaderBlock>
                    <Span>Remove</Span>
                </HeaderBlock>
            </CheckoutHeader>            
            {cartItems.map((cartItem)=> (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}            
            <Total>Total: ${cartTotal}</Total>              
        </CheckoutContainer>
    );
}

export default Checkout;