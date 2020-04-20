import {AppUser} from './app-user';
import {Nutrients} from './nutrients';
import {NutrientsPercentage} from './nutrients-percentage';
import {Somatotype} from './somatotype';
import {Trainings} from './trainings';

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
