import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteColumns = (props) => {
  const { DeleteColumns, handleSetShowDeleteColumns } = props;

  return (
    <>
      <Modal show={DeleteColumns} onHide={handleSetShowDeleteColumns}>
        <Modal.Header closeButton>
          <Modal.Title> Delete confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          Are you sure to delete task : <b>{} </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSetShowDeleteColumns}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSetShowDeleteColumns}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteColumns;
