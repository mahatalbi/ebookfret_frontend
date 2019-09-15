import React from 'react';
import {
  MDBSideNavLink,
  MDBSideNavCat,
  MDBSideNavNav,
  MDBSideNav,
  MDBIcon
} from 'mdbreact';

class SideNavigation extends React.Component {
  // render MDBSideNav Link
  rSNL(to, text) {
    return (
      <MDBSideNavLink to={to} onClick={this.props.onLinkClick}>
        {text}
      </MDBSideNavLink>
    );
  }

  render() {
    const { onLinkClick } = this.props;
    return (
      <div className="white-skin">
        <MDBSideNav
          logo="http://www.tmpa.ma/wp-content/themes/tmpa/images/logo_tmpa.png"
          bg="https://mdbootstrap.com/img/Photos/Others/sidenav4.jpg"
          mask="strong"
          fixed
          breakWidth={this.props.breakWidth}
          triggerOpening={this.props.triggerOpening}
          style={{ transition: 'padding-left .3s' }}
        >
          <MDBSideNavNav>

            

            <MDBSideNavLink topLevel to="/home" onClick={onLinkClick}>
              <MDBIcon icon="home mr-2" />
              Home
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to="/about" onClick={onLinkClick}>
              <MDBIcon icon="id-card-alt mr-2" />
              About us
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to="/profile" onClick={onLinkClick}>
              <MDBIcon icon="user-check mr-2" />
              Profile
            </MDBSideNavLink>

            
          </MDBSideNavNav>
        </MDBSideNav>
      </div>
    );
  }
}

export default SideNavigation;
