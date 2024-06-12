import { useState } from 'react'; // Importe useState para usar o estado no componente
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap';
import logo from './img/logo.svg';
import login from './img/login.svg';

function Header() {
    const [showModal, setShowModal] = useState(false); // Defina o estado inicial do modal como false

    const handleCloseModal = () => setShowModal(false); // Função para fechar o modal
    const handleOpenModal = () => setShowModal(true); // Função para abrir o modal

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Tasks toDo
                    </Navbar.Brand>
                    <div className="d-flex">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link onClick={handleOpenModal}>Create Task</Nav.Link>
                                <Nav.Link as={Link} to="/">
                                    <img
                                        alt=""
                                        src={login}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top"
                                    />{' '}
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Aqui você pode colocar seu formulário de criação de tarefa */}
                    <p>Seu formulário de criação de tarefa vai aqui.</p>
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
