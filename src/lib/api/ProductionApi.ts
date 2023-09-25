import axios, {AxiosInstance} from 'axios';
import {API_URL} from '@env';

import {ISvApi} from './ISvApi';

export default class ProductionApi implements ISvApi {
  static instance: ISvApi;
  axios: AxiosInstance;

  private constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
    });
  }

  static get shared() {
    if (!ProductionApi.instance) ProductionApi.instance = new ProductionApi();
    return ProductionApi.instance;
  }

  setBaseUrl(baseURL: string) {
    this.axios.defaults.baseURL = baseURL;
  }

  public getChallengeList = async () => {
    const {data: challengeList} = await this.axios.get('challenges');

    return challengeList.data;
  };

  public getChallengeDetail = async (challengeId: number) => {
    const {data: challengeDetail} = await this.axios.get(
      `challenges/${challengeId}`,
    );

    return challengeDetail.data;
  };
}
