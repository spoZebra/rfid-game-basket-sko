import {Injectable} from '@angular/core';
import firebase from "firebase/compat/app";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor() {
    this.initFirebase()
  }

  private initFirebase() {
    firebase.initializeApp(environment.firebase)
    firebase.firestore().settings({
      ignoreUndefinedProperties: true,
      cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
      merge: true
    });
    firebase.firestore().enablePersistence().catch((err) => {
      if (err.code == 'failed-precondition') {
        console.error('Multiple tabs open, persistence can only be enabled in one tab at a a time.')
      } else if (err.code == 'unimplemented') {
        console.error('The current browser does not support all of the features required to enable persistence');
      }
    });
  }

  async insertPlayer(name: string, points: number) {
    await firebase.firestore().collection('players').add({
      name: name.toUpperCase(),
      points: points,
      date: new Date().toISOString()
    });
  }

  async getPlayers() {
    const players: any = [];
    const snapshot = await firebase.firestore().collection('players').get();
    snapshot.forEach((doc) => players.push(doc.data()));
    return players
  }
}
