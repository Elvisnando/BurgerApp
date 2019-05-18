import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxx/Auxx';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionType from '../../store/actions';

/*const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.7,
    bacon: 1,
    meat: 2
};*/


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        console.log(this.props);
        /*axios.get('https://my-burger-78c99.firebaseio.com/ingredients.json')
            .then(respose => {

                this.setState({ ingredients: respose.data });
                console.log(this.state.ingredients);
            })
            .catch( error => {
                this.setState({error: true});
            });*/
    }

    updatePurchasableState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                //console.log(sum);
                return ingredients[igKey]
            })
            .reduce((sum1, el) => {
                return sum1 + el;
            }, 0);

        return sum > 0;

    }



    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }
    
    render() {

        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.props.ings) {

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientsAdded={this.props.onIngredientAdded}
                        ingredientsRemoved={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchasableState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCanceld={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemove: (ingName) => dispatch({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));