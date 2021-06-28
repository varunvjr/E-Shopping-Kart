import React from 'react'
import {LinkContainer} from 'react-router-bootstrap';
import {Nav,Navbar,Container,NavDropdown} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import {logout} from "../actions/userActions"
import {useHistory} from 'react-router-dom'
import SearchBox from "../components/SearchBox";
const Header = () => {
   const dispatch = useDispatch();
   const history=useHistory();
   const userLogin=useSelector(state=>state.userLogin)
   const {userInfo}=userLogin;
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
          <SearchBox/>
            <LinkContainer to="/cart">
            <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
            </LinkContainer>
            {
              
              userInfo?(<NavDropdown title={userInfo.name} id='username'>
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
           {userInfo&&userInfo.isAdmin&&(
            <NavDropdown title='Admin' id='username'>
            <LinkContainer to="/admin/userList">
              <NavDropdown.Item>Users</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/productList">
              <NavDropdown.Item>Products</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/orderList">
            <NavDropdown.Item>Orders</NavDropdown.Item>
          </LinkContainer>
          </NavDropdown>
           )  }
            
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
        </header>
    )
}

export default Header
