import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {AppUser} from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {
  }

  save(user: firebase.User) {
    this.doesUserExists(user).then(value => {
      if (value) {
        this.login(user);
      } else {
        this.newUser(user);
      }
    });
  }

  doesUserExists(user: firebase.User) {
    return this.db.database.ref('users')
      .once('value')
      .then(function(snapshot) {
        return snapshot.child(user.uid).exists();
      });
  }

  get(uid: string): Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();
  }

  update(appUser: AppUser) {
    return this.db.object('/users/' + appUser.uid).update(appUser);
  }

  private login(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  private newUser(user: firebase.User) {
    this.db.object('/users/' + user.uid).set({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      isAdmin: false
    });
  }
}
