import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">Job Hunt</h2>
          <p className="text-sm">
            © {new Date().getFullYear()} Job Hunt. All rights reserved.
          </p>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://github.com/kr1sh5harma"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.302 
              3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
              0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.087-.744.084-.729.084-.729 
              1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.304 
              3.495.997.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 
              0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 
              0 0 1.005-.322 3.3 1.23a11.49 11.49 0 0 1 3-.405c1.02.005 
              2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 
              1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 
              0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 
              0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 
              22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/harsh-sharma-26b151306/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.854 0-2.137 1.445-2.137 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.368-1.852 3.6 0 4.266 2.368 4.266 5.448v6.295zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM6.982 20.452H3.69V9h3.292v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
