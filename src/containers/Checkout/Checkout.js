import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {  Route  } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component {
 

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
                    ingredients={this.props.ings}
                    checkoutContinued={this.checkoutContinueHandler}
                    onChekoutCancel={this.checkoutCancelledHandler} />
                    <Route path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        );
    }

}
// when you don't need to dispatch actions we can only create map state to props and not mapStatetoDispatch
const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}
// if i have only to dispatch action i can't pass only thaht to connect 
//but like this (connect(null,mapStateToDispatch))
export default connect(mapStateToProps)(Checkout);