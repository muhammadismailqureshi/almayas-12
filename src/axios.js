import axios from "axios";


const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001/almayas-12/us-central1/api' // the API base URL
 
});


export default instance;