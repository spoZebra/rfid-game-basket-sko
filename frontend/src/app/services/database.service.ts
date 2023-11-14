import {Injectable} from '@angular/core';
import firebase from "firebase/compat/app";
import {environment} from "../../environments/environment";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

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
    const docRef = firebase.firestore().collection("players").doc(name)
    docRef.get().then(doc => {
        if (doc.exists && points > doc.get("points")) {
          console.log("Player already exists, updating the score")
          docRef.set({
              name: name,
              points: points,
              date: new Date().toISOString()
            }
          )
        } else if (!doc.exists) {
          console.log("New player detected, insert new record")
          firebase.firestore().collection('players').doc(name).set({
            name: name,
            points: points,
            date: new Date().toISOString()
          });
        }
      }
    )
  }

  async getPlayers() {
    const players: any = [];
    const snapshot = await firebase.firestore().collection('players').get();
    snapshot.forEach((doc) => players.push(doc.data()));
    return players
  }
}
