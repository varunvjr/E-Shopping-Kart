import React from 'react'
import {LinkContainer} from 'react-router-bootstrap';
import {Nav,Navbar,Container,NavDropdown} from 'react-bootstrap';
import {useSelector,useDispatch,useEffect} from 'react-redux';
import {logout} from "../actions/userActions"
import {useHistory} from 'react-router-dom'
const Header = () => {
   const dispatch = useDispatch();
   const history=useHistory();
   const userInfo=localStorage.getItem('userInfo')
   const userData=JSON.parse(userInfo)
  const logoutHandler=()=>{
     dispatch(logout());
     history.push("/");
  }
    return (
        <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
        <LinkContainer to="/">
        <Navbar.Brand>Home</Navbar.Brand>
        </LinkContainer>
       
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="links"
          >
            <LinkContainer to="/cart">
            <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
            </LinkContainer>
            {
              
              userInfo?(<NavDropdown title={userData.name} id='username'>
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>):(
                <LinkContainer to="/login">
                <Nav.Link><i className="fas fa-user"></i>Sign in</Nav.Link>
                </LinkContainer>
              )
            }
           
            
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
        </header>
    )
}

export default Header
