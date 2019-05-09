import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {

    state = {
        orderForm: {
            control: [],
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Strett'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLenght: 5,
                    maxLenght: 5
                },
                valid: false,
                touched:false
            },
            contry: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your-Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            deliverMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', dispalyValue: 'Fastest' },
                        { value: 'cheapest', dispalyValue: 'Cheapest' },
                    ]
                },
                value: '',
                touched:false

            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdf in this.state.orderForm) {
            formData[formElementIdf] = this.state.orderForm[formElementIdf].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(respose => {
                this.setState({ loading: false });
                this.props.history.push('/');


            })
            .catch(error => {
                this.setState({ loading: false });
            });

    }

    checkValidity(value, rules) {
        let isValid = true;
        if(rules) {
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLenght) {
            isValid = value.length >= rules.minLenght && isValid;
        }

        if(rules.maxLenght) {
            isValid = value.length <= rules.maxLenght && isValid;
        }
    }
        console.log(isValid);

        return isValid;
    }

    inputChangeHandler = (event, inputIdentifi) => {
        const updateOrderForm = {
            ...this.state.orderForm
        };
        const updateFormElement = {
            ...updateOrderForm[inputIdentifi]
        };
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateOrderForm[inputIdentifi] = updateFormElement;
        

        let formIsValid = true;
        for (let inputIdentifi in updateOrderForm) {
            formIsValid = updateOrderForm[inputIdentifi].valid && formIsValid;
        }

        this.setState({ orderForm: updateOrderForm, formIsValid : formIsValid });
    }



    render() {
        let formElementtsArray = [];

        for (let key in this.state.orderForm) {

            formElementtsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });

        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementtsArray.map(formElement => (
                    

                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched = {formElement.config.touched}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter you Contact Data</h4>
                {form}
            </div>

        );
    }
}
export default ContactData;