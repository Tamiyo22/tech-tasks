import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";
 
const Navbar = () => {

    
    return (
        <>
            <Nav className="about">
                <NavMenu>
                    <NavLink to="/about" >
                        About
                    </NavLink>
                    <NavLink to="/contact" >
                        Contact Us
                    </NavLink>
                    <NavLink to="/sign-up">
                        Sign Up
                    </NavLink>
                    <NavLink to="/studentsignin">
                        Student Login
                    </NavLink>
                    <NavLink to="/sign-in">
                        Company Login
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;