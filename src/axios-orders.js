import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://my-burger-78c99.firebaseio.com/'
});

export default instance;