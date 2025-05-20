import React from 'react';  
import '../styles/footer.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Footer() {  
    return (  
        <footer className="footer">   
            <ul>  
                <li className="nav-bar li"> 
                    <Link to="/about" >Nosotros</Link>
                </li>  
                <li className="nav-bar li">
                    <Link to="/contacto" >Contacto</Link>
                </li>  
            </ul>   
            <p>&copy; 2025 - Caro devorando en react</p> 
        </footer>  
    );  
}  

export default Footer;  