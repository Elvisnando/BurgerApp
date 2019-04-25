import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxx/Auxx';
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component  {

        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterc = axios.interceptors.request.use(req =>{
                this.setState({error: null});
                return req;
            });
            this.resInterc= axios.interceptors.response.use(res => res,error => {
                this.setState({error: error});
            });


        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterc);
            axios.interceptors.request.eject(this.resInterc);

        }

        errorConfirmedHandler = () => {
            this.setState({error:null});

        }

        render() {
        return (
            <Aux>
                <Modal 
                modalClosed={this.errorConfirmedHandler}
                show = {this.state.error}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>
        );
        }
    }
}

export default withErrorHandler;