import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./movieModal.module.css";

// Component for the modals for watchlist and movie list
// Params are the children which is the movie component and the handleadd function for adding movies to watch list
export const MovieModal = ({ children, handleAdd }) => {
  // Use state for showing the modal window
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function for adding the movie to the watch list from the modal window
  const handleSave = (event) => {
    handleAdd(event);
    setShow(false);
  };

  return (
    <>
      {/* If the modal window is not showing is renders the movies */}
      <span className={styles.movieModal} onClick={handleShow}>
        {children}
      </span>

      <Modal size="sm" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add to watch list?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleSave(children.key)}>
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// Component for the watch list modal uses mostly same functions as the movie modal
export const WatchListModal = ({ children, handleRemove }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function for deletion of the movie from watch list
  const handleDelete = (event) => {
    handleRemove(event);
    setShow(false);
  };

  return (
    <>
      <span className={styles.movieModal} onClick={handleShow}>
        {children}
      </span>

      <Modal size="sm" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove from watch list?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleDelete(children.key)}>
            Remove
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};