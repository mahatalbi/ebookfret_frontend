import React from 'react';
import { MDBFooter } from 'mdbreact';

const Copyrights = (props) => {
  const date = new Date().getFullYear()
  return (
    <MDBFooter className={props.className} style={{ ...props.style, zIndex: 2 }}>
      <p className="footer-copyright mb-0 py-3 text-center">
        &copy; {date} Copyright: <a href="https://www.MDBootstrap.com"> Ebookfret| Email:ebookfret@tangermed.ma | Tel: 06-61-61-61-61 | Fax : 05-39-39-39-39 | Adresse: La Gare Maritime - Port Tanger Med</a></p>
    </MDBFooter>
  )
}
export default Copyrights