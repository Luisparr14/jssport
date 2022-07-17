import { Button, Toast } from "flowbite-react";

export default function CustomToast({ title, message, onClose, show, onClick}){
  return (
    <div>
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">{title}</strong>
          <small>{new Date().toLocaleTimeString()}</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
        <Toast.Footer>
          <Button onClick={onClick}>
            OK
          </Button>
        </Toast.Footer>
      </Toast>
    </div>
  );
}