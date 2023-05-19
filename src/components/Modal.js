import { useRef, useEffect } from "react";

export default function Modal(props) {
  let modalRef = useRef();

  // Close modal on click outside of modal
  useEffect(() => {
    let handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        props.setOpenModal(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div id="modal-background">
      <div id="modal-container" ref={modalRef}>
        <h1>Add book</h1>
        <form
          onSubmit={(e) => {
            props.handleFormSubmit(e, props.user);
            props.setOpenModal(false);
          }}
        >
          <input placeholder="Name" id="name" />
          <input placeholder="Author" id="author" />
          <input placeholder="Pages" id="pages" type="number" />
          <div id="read-container">
            <label htmlFor="read">Have you read it?</label>
            <input type="checkbox" id="read-checkbox" />
          </div>
          <button id="modal-add-button">Add book</button>
        </form>
      </div>
    </div>
  );
}
