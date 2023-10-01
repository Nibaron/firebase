import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyApo0r62iqy7srW0Bm3KiW0z6BNHomNzj8",
  authDomain: "notnotion-21c26.firebaseapp.com",
  projectId: "notnotion-21c26",
  storageBucket: "notnotion-21c26.appspot.com",
  messagingSenderId: "86807844819",
  appId: "1:86807844819:web:4191ab0f2e093e90940126"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(); //service name
const colRef= collection(db,"Movie"); //service name, collection name

getDocs(colRef)
    .then( data=>{
        let movies=[];
        data.docs.forEach(document=>{
            movies.push({...document.data(), ID: document.id});
        })
        console.log(movies);
    })

    .catch(error=>{
        console.log(error);
    })

const addForm=document.querySelector(".add");
addForm.addEventListener("submit", event=>{
    event.preventDefault();
    addDoc(colRef, {
        Name: addForm.name.value,
        Description: addForm.description.value
    })
    .then(()=>{
        addForm.reset();
    })
})

const deleteForm= document.querySelector(".delete");
deleteForm.addEventListener("submit", event=>{
    event.preventDefault();

    const documentReference= doc(db, "Movie", deleteForm.ID.value);
    deleteDoc(documentReference)
    .then(()=>{
        deleteForm.reset();
    })
})