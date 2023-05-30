import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import parse from 'html-react-parser';

const ConfirmModal = (props) => {
//  const [show, setSow] = useState(false);
//  const handleClose = () => setSow(false);
//  const handleShow = () => setSow(true);

const {title, content, show, onAction} = props;

  return (
    <>
<Modal show={show} onHide={() => onAction('close')} backdrop='static'>
    <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{parse(content)}</Modal.Body>
    <Modal.Footer>
        <Button variant='secondary' onClick={() => onAction('close')}>
            Close
        </Button>
        <Button variant='primary' onClick={() => onAction('confirm')}>
            Confirm
        </Button>
    </Modal.Footer>
</Modal>
      
    </>
  )
}

export default ConfirmModal
