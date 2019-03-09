import axios from 'axios';
const instance =axios.create({
    baseURL:'https://5c824dfb2d2ad30014be5158.mockapi.io'
});

export default instance;