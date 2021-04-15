import router from '@/router';
import Token from '@/services/token';
import { getBaseApiUri } from '@/services/helper';

interface ISuccess {
  success: boolean;
  response: any;
}

abstract class BaseApi {
  // EX: return '/me'
  abstract url(): string;

  getHttpClient() {
    // @ts-ignore
    return window.axios;
  }

  async getDetail(id: string | number, query = {}, headers = {}): Promise<ISuccess> {
    try {
      const response = await this.getHttpClient().get(this.url() + '/' + id, {
        params: query,
        headers: headers
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async create(data: Record<string, any>, query = {}, headers = {}) {
    try {
      const response = await this.getHttpClient().post(this.url(), data, {
        params: query,
        headers: headers
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async update(id: string | number, data: Record<string, any>, query = {}, headers = {}) {
    try {
      const response = await this.getHttpClient().put(this.url() + '/' + id, data, {
        params: query,
        headers: headers
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async delete(id: string | number, query = {}, headers = {}) {
    try {
      const response = await this.getHttpClient().delete(this.url() + '/' + id, {
        params: query,
        headers: headers
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  handlerHttpError(e: any) {
    if (e.response && e.response.data) {
      const data = { ...e.response.data };
      data.status = data.status || e.response.status;
      data.code = data.code || e.response.status;
      return this.error(data);
    } else {
      throw e;
    }
  }

  success(data: any): ISuccess {
    return { success: true, response: data };
  }

  error(error: any): ISuccess {
    switch (error.code) {
      case 406:
        Token.removeTokenFromStorage();
        window.location.href = getBaseApiUri();
        return { success: false, response: error };
      case 403:
        // @ts-ignore
        router.push({ name: 'forbidden' });
        return { success: false, response: error };
      case 404:
        // @ts-ignore
        router.push({ name: 'notfound' });
        return { success: false, response: error };
      default:
        return { success: false, response: error };
    }
  }
}

export default BaseApi;
