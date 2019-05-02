import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            bacon: 1,
            cheese: 1
        }
    }

    componentDidMount () {
        const querry = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let param of querry.entries()) {
            ingredients[param[0]] = + param[1];
        }

        this.setState({ingredients:ingredients});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutContinued = {this.checkoutContinueHandler}
                onChekoutCancel = {this.checkoutCancelledHandler} />
            </div>
        );
    }

}

export default Checkout;