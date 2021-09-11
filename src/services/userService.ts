import { SignInResponse } from './api/authorization';

const userService = {
  set(authData: SignInResponse | null) {
    return localStorage.setItem('user', JSON.stringify(authData));
  },
  get(): SignInResponse | null {
    const JSONUser = localStorage.getItem('user');

    return JSONUser ? JSON.parse(JSONUser) : null;
  },
  remove() {
    localStorage.removeItem('user');
  },
};

export default userService;
