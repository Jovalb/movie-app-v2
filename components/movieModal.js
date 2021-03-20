import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./movieModal.module.css";

export const MovieModal = ({ children, handleAdd }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = (event) => {
    console.log("Her er target", event);
    handleAdd(event);
    setShow(false);
  };

  return (
    <>
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

export const WatchListModal = ({ children, handleRemove }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

// export const AlertModal = ({ children, responseBol }) => {
//   const [show, setShow] = useState(false);

//   if (responseBol == true) {
//     setShow(true);
//   }

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <span>{children}</span>

//       <Modal size="sm" centered show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>This is an error</Modal.Title>
//         </Modal.Header>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };
