import axios, {AxiosInstance} from 'axios';

import {ISvApi} from './ISvApi';

export default class ProductionApi implements ISvApi {
  static instance: ISvApi;
  axios: AxiosInstance;

  private constructor() {
    this.axios = axios.create({
      //   baseURL: publicRuntimeConfig.apiBaseURL,
      //   headers: {'api-key': publicRuntimeConfig.apiAuthorizationKey},
    });
  }

  static get shared() {
    if (!ProductionApi.instance) ProductionApi.instance = new ProductionApi();
    return ProductionApi.instance;
  }

  setAuthToken(accessToken: string) {
    this.axios.defaults.headers['Authorization'] = 'Bearer ' + accessToken;
  }

  setBaseUrl(baseURL: string) {
    this.axios.defaults.baseURL = baseURL;
  }
}
