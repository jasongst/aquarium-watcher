import axios from 'axios';

const API_URL = 'http://localhost:8080/api/aquariums/';
const user = JSON.parse(localStorage.getItem('user'));
import authHeader from './auth-header';

class AquariumDataService {
    getAll() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    get(id) {
        return axios.get(API_URL + id, { headers: authHeader() });
    }

    create(data) {
        console.log(data);
        return axios.post(API_URL, data, { headers: authHeader() });
    }

    update(id, data) {
        data.userId = user.id;
        return axios.put(API_URL + id, data, { headers: authHeader() });
    }

    delete(id) {
        return axios.delete(API_URL + id, { headers: authHeader() });
    }

    deleteAll() {
        return axios.delete(API_URL, { headers: authHeader() });
    }
}
  
export default new AquariumDataService();