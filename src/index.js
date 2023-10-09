import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, where, serverTimestamp, orderBy, updateDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

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
const auth= getAuth();
const colRef= collection(db,"Movie"); //service name, collection name
const qRef= query(colRef, where("Category","==","drama"), orderBy("CreatedAt"));

const documentReference= doc(db, "Movie", "TyozMEseQgkTCGOivIeK");
onSnapshot(documentReference, (document)=>{
    console.log(document.data(), document.ID);
})

getDocs(qRef)
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

//  onSnapshot(colRef, (data)=>{
//     let movies=[];
//     data.docs.forEach(document => {
//         movies.push({...document.data(), ID: document.id});
//     });
//     console.log(movies);
// });

const addForm=document.querySelector(".add");
addForm.addEventListener("submit", event=>{
    event.preventDefault();
    addDoc(colRef, {
        Name: addForm.name.value,
        Category: addForm.category.value,
        CreatedAt: serverTimestamp(),
        UpdatedAt: serverTimestamp()
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

const updateForm= document.querySelector(".update");
updateForm.addEventListener("submit", event=>{
    event.preventDefault();

    const documentReference= doc(db, "Movie", updateForm.ID.value);
    updateDoc(documentReference,{
        Name: updateForm.name.value,
        UpdatedAt: serverTimestamp()
    })
    .then(()=>{
        updateForm.reset();
    });
});


const registerForm= document.querySelector(".register");
registerForm.addEventListener("submit", event=>{
    event.preventDefault();

    createUserWithEmailAndPassword(auth, registerForm.email.value, registerForm.password.value)
     .then(credentials =>{
        console.log(credentials);
        registerForm.reset();
     })
     .catch(error=>{
        console.log(error);
     })
});

const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", event=>{
    signOut(auth)
        .then(()=>{
            console.log("User Logged Out !!");
        })
        .catch(error=>{
            console.log(error);
        })
});

const loginForm= document.querySelector(".login");
loginForm.addEventListener("submit", event=>{
    event.preventDefault();

    signInWithEmailAndPassword(auth, loginForm.email.value, loginForm.password.value)
     .then(credentials =>{
        console.log(credentials);
        loginForm.reset();
     })
     .catch(error=>{
        console.log(error);
     })
});