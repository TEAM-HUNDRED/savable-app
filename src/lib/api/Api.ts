import ProductionApi from './ProductionApi';
import {ISvApi} from './ISvApi';

export default class Api {
  private static instance: ISvApi;

  private constructor() {
    Api.instance = ProductionApi.shared;
    // switch (publicRuntimeConfig.reactAppApiVersion) {
    //   case 'local':
    //     Api.instance = ProductionApi.shared;
    //     break;
    //   case 'development':
    //     Api.instance = ProductionApi.shared;
    //     break;
    //   case 'production':
    //     Api.instance = ProductionApi.shared;
    //     break;
    //   case 'test':
    //     Api.instance = MockApi.shared;
    //     break;
    //   default:
    //     if (!process.env.REACT_APP_API_VERSION) {
    //       throw new Error(
    //         'An API version was not provided. Make sure "REACT_APP_API_VERSION" env variable is defined',
    //       );
    //     }
    //     throw new Error(
    //       `Unsupported api version "${process.env.REACT_APP_API_VERSION}" was provided`,
    //     );
    // }
  }

  static get shared(): ISvApi {
    if (!Api.instance) new Api();
    return Api.instance;
  }
}
