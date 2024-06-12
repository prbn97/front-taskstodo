import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap';
import logo from './img/logo.svg';
import login from './img/login.svg';

function Header() {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        <h4 className="mb-0 ms-2">
                            Tasks to <strong className='text-Dark'>Do</strong>
                        </h4>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-end">
                        <Nav className="d-flex align-items-center">
                            <Nav.Link onClick={handleOpenModal}>
                                Create Task
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login" className="d-flex align-items-center">
                                <img
                                    alt=""
                                    src={login}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Aqui você pode colocar seu formulário de criação de tarefa */}
                    <p>Form to create Task</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Header;
