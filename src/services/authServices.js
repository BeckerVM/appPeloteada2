import axios from 'axios';
import {API_URL, authHeader} from '../utils/api';

class AuthService {
  //PARA LOGUEAR LOS USUARIOS PUESSSSSSSS!
  login(email, password) {
    return axios.post(`${API_URL}/auth/login/user`, {
      email,
      password,
    });
  }

  register(name, email, password, surname) {
    //SON CADENAS
    return axios.post(`${API_URL}/user/register`, {
      name,
      email,
      password,
      lastName: surname,
    });
  }

  async logout() {
    const headers = await authHeader();
    return axios.get(`${API_URL}/auth/logout/user`, {headers});
  }

  async addToFavorites(courtId, businessId) {
    const headers = await authHeader();

    return axios.post(
      `${API_URL}/user/favorite/add`,
      {
        court: courtId,
        business: businessId,
      },
      {headers},
    );
  }

  async deleteFavorites(courtId) {
    const headers = await authHeader();

    return axios.post(
      `${API_URL}/user/favorite/delete`,
      {
        court: courtId,
      },
      {headers},
    );
  }

  async getFavorites() {
    const headers = await authHeader();
    return axios.get(`${API_URL}/user/favorite`, {headers});
  }

  //RECUPERACION DE CONTRASEÑA
  async forgotPassword(email) {
    return axios.post(`${API_URL}/auth/user/forgot/email`, {
      email,
    });
  }

  async verificationCode(email, code) {
    return axios.post(`${API_URL}/auth/user/forgot/verification`, {
      email,
      code,
    });
  }

  async sendNewPassword(email, newPassword, repeatPassword) {
    return axios.post(`${API_URL}/auth/user/forgot/pass`, {
      email,
      password: newPassword,
      repeat_password: repeatPassword,
    });
  }
}

export default new AuthService();
