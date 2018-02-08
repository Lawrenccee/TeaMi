import React from 'react';
import {FaGithub, FaLinkedin} from 'react-icons/lib/fa';

const Footer = () => (
  <div className='footer'>
    <a 
      target="_blank"
      href="https://github.com/Lawrenccee">
      GitHub <FaGithub style={{ verticalAlign: 'bottom' }} />
    </a>
    <a
      target="_blank"
      href="https://www.linkedin.com/in/lawrence-guintu-96a81a101/">
      LinkedIn <FaLinkedin style={{ verticalAlign: 'bottom' }} />
    </a>
  </div>
);

export default Footer;