import {AppUser} from './app-user';

export class User implements AppUser {
  public isAdmin: boolean;

  constructor(public email: string,
              public name: string,
              public uid: string) {}

  public mockStats(): AppUser {
    this.isAdmin = false;

    return this;
  }
}
