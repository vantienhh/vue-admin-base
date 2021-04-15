interface IToken {
  token_type: string; // EX: Bearer
  access_token: string;
}

class Token {
  static setTokenToStorage(token: IToken) {
    // @ts-ignore
    window.$cookies.set('token', `${token.token_type} ${token.access_token}`);
  }

  static getTokenFromStorage(): string {
    // @ts-ignore
    return window.$cookies.get('token');
  }

  static removeTokenFromStorage() {
    // @ts-ignore
    window.$cookies.remove('token');
  }
}

export default Token;
