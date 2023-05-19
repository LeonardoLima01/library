import { useState, useEffect } from "react";
import Modal from "./Modal";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  browserSessionPersistence,
  setPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  onSnapshot,
  collection,
  addDoc,
  setDoc,
  doc,
  docs,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Card from "./Card";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf8InZUUzmZf0ucyFKzcuBrJJ5TKDb-yM",
  authDomain: "library-c52cb.firebaseapp.com",
  projectId: "library-c52cb",
  storageBucket: "library-c52cb.appspot.com",
  messagingSenderId: "802653896323",
  appId: "1:802653896323:web:074a02c71e16a43b0e25b6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Add book to database on form submit
export const handleFormSubmit = async (e, user) => {
  e.preventDefault(); // Prevent form submit

  const authorName = document.querySelector("#author").value;
  const bookName = document.querySelector("#name").value;
  const pagesQuantity = Number(document.querySelector("#pages").value);
  const isBookRead = document.querySelector("#read-checkbox").checked;

  if (user) {
    const userRef = doc(collection(db, "users"), user.uid);
    const booksCollectionRef = collection(userRef, "books");

    try {
      const bookData = {
        bookName: bookName,
        authorName: authorName,
        pages: pagesQuantity,
        read: isBookRead,
      };

      // Add book to firestore db
      const bookDocRef = await addDoc(booksCollectionRef, bookData);

      // Get the ID of the newly created book document
      const bookId = bookDocRef.id;

      // Update the book data with the ID
      bookData.bookId = bookId;

      // Update the book document with the book ID in Firestore
      await updateDoc(bookDocRef, { id: bookId });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }
};

export default function Main() {
  let [openModal, setOpenModal] = useState(false);
  let [isLogged, setIsLogged] = useState(false);
  let [user, setUser] = useState([]);
  let [userData, setUserData] = useState([]);

  // Handle log-in button click
  const handleLogin = () => {
    if (isLogged) {
      signOut(auth)
        .then(() => {})
        .catch((err) => {
          // An error happened.
          console.log(err);
        });
    } else {
      signInWithPopup(auth, provider)
        .then(() => {})
        .catch((err) => {
          // An error happened.
          console.error(err);
        });
    }
  };

  const getUserData = async () => {
    if (user && user.uid) {
      const userRef = doc(collection(db, "users"), user.uid);
      const booksCollectionRef = collection(userRef, "books");

      onSnapshot(booksCollectionRef, (snapshot) => {
        const updatedUserData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserData(updatedUserData);
      });
    }
  };

  // Event listener to change IsLogged state based on user auth state
  useEffect(() => {
    setPersistence(auth, browserSessionPersistence) // Set long-term persistence
      .then(() => {
        // Auth state persistence is set
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsLogged(true);
            setUser(user);
            getUserData();
          } else {
            setIsLogged(false);
            setUser([]);
          }
        });
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (isLogged) {
      getUserData();
    }
  }, [user]);

  return (
    <main>
      <button
        onClick={handleLogin}
        className={(isLogged && "not-read") || "read"}
      >
        {(isLogged && "Sign out") || "Sign in"}
      </button>
      {isLogged && (
        <button onClick={() => setOpenModal(true)}>+ Add book</button>
      )}
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          handleFormSubmit={handleFormSubmit}
          user={user}
        />
      )}
      {(isLogged && (
        <div className="cards-grid">
          {userData &&
            Array.isArray(userData) &&
            userData.map((i, index) => {
              return (
                <Card
                  key={index}
                  name={i.bookName}
                  author={i.authorName}
                  pages={i.pages}
                  read={i.read}
                  bookId={i.id}
                  userId={user.uid}
                />
              );
            })}
        </div>
      )) || <h3>Sign in to add books</h3>}
    </main>
  );
}
