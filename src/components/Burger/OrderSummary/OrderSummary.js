import React, { Component } from 'react';

import Aux from '../../../hoc/Auxx/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
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
                <p><strong>Price:{this.props.price.toFixed(2)} $</strong> </p>

                <p>Continue to Checkout</p>
                <Button btnType="Danger" cliked={this.props.purchaseCanceld}>CANCEL</Button>
                <Button btnType="Success" cliked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    }




};

export default OrderSummary;