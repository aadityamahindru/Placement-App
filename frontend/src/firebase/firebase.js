import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAlEwJM8cMAvqIrMlur-xpOilvNlnx0MVE",
    authDomain: "placement-app-8f874.firebaseapp.com",
    databaseURL: "https://placement-app-8f874.firebaseio.com",
    projectId: "placement-app-8f874",
    storageBucket: "placement-app-8f874.appspot.com",
    messagingSenderId: "647299102673",
    appId: "1:647299102673:web:527cb49afa8005adcd52f0"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig); 
  const db=firebaseApp.firestore();
  const auth=firebase.auth();

  export {db,auth};