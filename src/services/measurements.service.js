import axios from 'axios';

const API_URL = 'http://localhost:8080/api/aquariums/';
import authHeader from './auth-header';

class MeasurementDataService {
    getAll(id) {
        return axios.get(API_URL + id + '/measurements', { headers: authHeader() });
    }

    create(id, data) {
        return axios.post(API_URL + id + '/measurements', data, { headers: authHeader() });
    }

    deleteAll(id) {
        return axios.delete(API_URL + id + '/measurements', { headers: authHeader() });
    }
}
  
export default new MeasurementDataService();