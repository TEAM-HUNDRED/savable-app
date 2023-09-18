import axios, {AxiosInstance} from 'axios';
import {API_URL} from '@env';

import {ISvApi} from './ISvApi';

export default class MockApi implements ISvApi {
  static instance: ISvApi;
  axios: AxiosInstance;

  private constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
      //   headers: {'api-key': publicRuntimeConfig.apiAuthorizationKey},
    });
  }

  static get shared() {
    if (!MockApi.instance) MockApi.instance = new MockApi();
    return MockApi.instance;
  }

  setAuthToken(accessToken: string) {
    this.axios.defaults.headers['Authorization'] = 'Bearer ' + accessToken;
  }

  setBaseUrl(baseURL: string) {
    this.axios.defaults.baseURL = baseURL;
  }
}
