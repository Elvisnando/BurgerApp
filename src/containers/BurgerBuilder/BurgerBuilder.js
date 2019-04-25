import React, { Component } from 'react';
import Aux from '../../hoc/Auxx/Auxx';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.7,
    bacon: 1,
    meat: 2
};


class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 2,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get('https://my-burger-78c99.firebaseio.com/ingredients.json')
            .then(respose => {

                this.setState({ ingredients: respose.data });
                console.log(this.state.ingredients);
            })
            .catch( error => {
                this.setState({error: true});
            });
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

        this.setState({ purchasable: sum > 0 });

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredient = {
            ...this.state.ingredients
        };

        updateIngredient[type] = updateCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updateIngredient });
        this.updatePurchasableState(updateIngredient);


    }

    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredient = {
            ...this.state.ingredients
        };

        updateIngredient[type] = updateCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updateIngredient });
        this.updatePurchasableState(updateIngredient);



    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //alert('You continue');
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customers: {
                name: 'Elvis Nazifi',
                adress: {
                    street: 'Irisweg 1',
                    zipCode: '41351',
                    contry: 'Germany'
                },
                email: 'test@test.com'
            },
            deliverMethod: 'By track'
        }
        axios.post('/orders.json', order)
            .then(respose => {

                this.setState({ loading: false, purchasing: false });

            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });

    }
    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p>:  <Spinner />
        
        if ( this.state.ingredients ) {
            
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientsAdded={this.addIngredientHandler}
                        ingredientsRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCanceld={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice} />
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

export default withErrorHandler(BurgerBuilder, axios);