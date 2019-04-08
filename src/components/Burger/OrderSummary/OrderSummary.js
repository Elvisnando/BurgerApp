import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return (
        <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>
        );
    })
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Price:{props.price.toFixed(2)} $</strong> </p>

            <p>Continue to Checkout</p> 
            <Button btnType="Danger" cliked={props.purchaseCanceld}>CANCEL</Button>
            <Button btnType="Success" cliked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>

    );


};

export default orderSummary;