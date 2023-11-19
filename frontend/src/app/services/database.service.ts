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
    const docList = firebase.firestore().collection("players").where("name", "==", name).limit(1)
    docList.get().then(docs => {
      const doc = docs.docs.at(0)
      if (doc != null && doc.exists && points > doc.get("points")) {
        console.log("Player already exists, updating the score")
        console.log(doc.id, " => ", doc.data());
        doc.ref.set({
            name: name,
            points: points,
            date: new Date().toISOString()
          }
        )
      } else if (doc == null || !doc.exists) {
        console.log("New player detected, insert new record")
        firebase.firestore().collection('players').doc().set({
          name: name,
          points: points,
          date: new Date().toISOString()
        });
      }
    })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  async getPlayers() {
    const players: any = [];
    const docList = await firebase.firestore().collection("players").orderBy("points", "desc").get()
    docList.forEach((doc) => {
      console.log("Player: " + doc.data())
      players.push(doc.data());
    })
    return players
  }
}
