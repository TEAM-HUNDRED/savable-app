import {ISvApi} from './ISvApi';
import ProductionApi from './ProductionApi';
import MockApi from './MockApi';

export default class Api {
  private static instance: ISvApi;

  private constructor() {
    Api.instance = ProductionApi.shared;
    // Api.instance = MockApi.shared;
  }

  static get shared(): ISvApi {
    if (!Api.instance) new Api();
    return Api.instance;
  }
}
