import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postaCode: ''
        },
        loading: false
    }

    orderHandler =  (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState({ loading: false });
                this.props.history.push('/');


            })
            .catch(error => {
                this.setState({ loading: false });
            });
        
    }

    render() {
        let form = (
            <form>
                    <Input inputtype="input" type="text" name="email" placeholder="Your Mail" />
                    <Input inputtype="input" type="text" name="street" placeholder="Street" />
                    <Input inputtype="input" type="text" name="name" placeholder="Your name" />
                    <Input inputtype="input" type="text" name="postal" placeholder="Postal code" />
                    <Button btnType="Success" cliked={this.orderHandler}>ORDER</Button>
                </form>

        );
        if(this.state.loading) {
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