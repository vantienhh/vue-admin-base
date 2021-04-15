import BaseApi from '@/api/baseApi';

export class User extends BaseApi {
  url(): string {
    return '/user';
  }
}
