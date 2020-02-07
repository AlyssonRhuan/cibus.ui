import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCZ9likzMUDzfnQThg5CMfVMwcJjGJxNS0",
    authDomain: "helloworld-48149.firebaseapp.com",
    databaseURL: "https://helloworld-48149.firebaseio.com",
    projectId: "helloworld-48149",
    storageBucket: "helloworld-48149.appspot.com",
    messagingSenderId: "119997730847",
    appId: "1:119997730847:web:a4513c7b6d2dd435b1452a",
    measurementId: "G-STCQQ93KE6"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();