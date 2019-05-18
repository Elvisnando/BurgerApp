import * as actionType from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice: 2,

};

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.7,
    bacon: 1,
    meat: 2
};


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state, // only so we don't creat a deep clone of the object
                ingredients: {
                    ...state.ingredients, //for that reason i need another copy
                    //I use [] Es6 for selec and ovveraid a proprety in this case a ingredit
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            };
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state, // only so we don't creat a deep clone of the object
                ingredients: {
                    ...state.ingredients, //for that reason i need another copy
                    //I use [] Es6 for selec and ovveraid a proprety in this case a ingredit
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]

            };
        default:
    }


    return state;


};

export default reducer;