import React from 'react'
import {Nav,Navbar,Container} from 'react-bootstrap';
const Header = () => {
    return (
        <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="links"
          >
            <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
            <Nav.Link href="/login"><i className="fas fa-user"></i>Sign in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
        </header>
    )
}

export default Header
