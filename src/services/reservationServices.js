import axios from 'axios';
import {API_URL, authHeader} from '../utils/api';

class ReservationService {
  async getFieldsByBusiness(data) {
    const headers = await authHeader();
    return axios.post(`${API_URL}/court/list`, data, {headers});
  }

  async getFieldsInBusiness(data) {
    const headers = await authHeader();
    return axios.post(`${API_URL}/court/list/business`, data, {headers});
  }

  async saveReservation(data) {
    const headers = await authHeader();
    return axios.post(`${API_URL}/reservation/register`, data, {headers});
  }

  async getMyReservations() {
    const headers = await authHeader();
    return axios.get(`${API_URL}/reservation/list`, {headers});
  }

  async saveSubscriptionNotificationReservation(userId) {
    const headers = await authHeader();
    return axios.post(
      `${API_URL}/auth/subscribe/user`,
      {subscription: userId},
      {headers},
    );
  }

  async getInfoBusiness(businessId) {
    const headers = await authHeader();
    return axios.get(`${API_URL}/business/profile/${businessId}`, {headers});
  }

  async getStatusFavoriteField(data) {
    //PARA VER SI ESTA DIPONIBLE LA CANCHA FAVORITA
    const headers = await authHeader();
    return axios.post(`${API_URL}/court/status`, {...data}, {headers});
  }
}

export default new ReservationService();
