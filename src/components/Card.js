import {
  doc,
  getDoc,
  deleteDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./Main";

export default function Card(props) {
  const removeDoc = async (docId) => {
    const userRef = doc(db, `users/${props.userId}`);
    const booksCollectionRef = collection(userRef, "books");
    const docToDeleteRef = doc(booksCollectionRef, docId);

    //  Delete doc
    await deleteDoc(docToDeleteRef);
  };

  const toggleRead = async (docId) => {
    const userRef = doc(db, `users/${props.userId}`);
    const booksCollectionRef = collection(userRef, "books");
    const docToToggle = doc(booksCollectionRef, docId);

    try {
      // Get the current document data
      const docSnapshot = await getDoc(docToToggle);
      const currentData = docSnapshot.data();

      // Toggle the value of the "read" field
      const updatedReadValue = !currentData.read;

      // Update the document with the new "read" value
      await updateDoc(docToToggle, { read: updatedReadValue });
    } catch (error) {
      console.error("Error toggling read status:", error);
    }
  };

  return (
    <div className="card-container">
      <p>"{(props.name === "" && "Empty book name") || props.name}"</p>
      <p>{(props.author === "" && "Empty author name") || props.author}</p>
      <p>{props.pages} pages</p>
      <button
        onClick={() => toggleRead(props.bookId)}
        className={
          (props.read && "card-read-button read") || "card-read-button not-read"
        }
      >
        {(props.read && "Read") || "Not read"}
      </button>
      <button
        onClick={() => removeDoc(props.bookId)}
        className="card-remove-button"
      >
        Remove
      </button>
    </div>
  );
}
