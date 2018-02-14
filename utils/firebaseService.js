import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig.json';

export function initializeFirebase() {
  // Initialize Firebase
  if (!firebaseConfig || !firebaseConfig.apiKey || firebaseConfig.apiKey === '<YOUR-API-KEY>') {
    throw new Error('Add your own firebaseConfig.json file in the folder /utils/firebaseConfig.json');
  }
  firebase.initializeApp(firebaseConfig);
}

