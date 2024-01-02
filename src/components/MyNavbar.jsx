import React from 'react'
import { Container, Navbar, Row, Col, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function MyNavbar() {
    return (
        <Navbar expand className='navbar-dark bg-dark'>
            <Container>
                <Row>
                    <Col xs={12}>
                        <Navbar.Collapse id="navbarNav">
                            <Nav>
                                <Nav.Item>
                                    <NavLink to="/users" className="nav-link px-0 pe-4">Users</NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink to="/photos" className="nav-link px-0 pe-4">Photos</NavLink>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}
