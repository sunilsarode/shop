import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { User } from '../models/oshop-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private db:AngularFireDatabase) { 
  }

  save(user: firebase.User){
    this.db.object('/user/' + user.uid).update({
      name:user.displayName,
      email:user.email
    })
  }

  getUser(uid: string | undefined):Observable<User> {
     return this.db.object('/user/'+ uid).valueChanges() as Observable<User>;
  }
}
