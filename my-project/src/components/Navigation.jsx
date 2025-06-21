import React from 'react';
import { NAVIGATION_LINKS } from '../utils/constants';

const Navigation = () => {
  return (
    <nav className="flex items-center gap-8">
      {NAVIGATION_LINKS.map((link) => (
        <a 
          key={link.label}
          href={link.href} 
          className={link.className}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};

export default Navigation; 