import React from 'react';
import { 
  MDBRow,
  MDBCol,
  MDBCard,
  MDBView,
  MDBCardBody,
  MDBInput,
  MDBContainer,
  MDBAvatar,
  MDBBtn,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText
} from 'mdbreact';

import './v2.css';

const PV2 =  () => {
  return (
    <section>

				<h1 className="section-heading h1 pt-4 my-5 text-center">Ebookfret </h1>
				<h4 className="section-description text-center">Ebookfret is an application that allows to the transporter or to the maritime agent to make reservations in different vessels.</h4>
<br></br>
				<MDBRow className="mb-5">
					<MDBCol md="12" lg="4" className="mb-4">
						<MDBCard narrow>
							<MDBView cascade className="gradient-card-header info-color">
								<h4 className="mb-0">The users of the application</h4>
							</MDBView>
							<MDBCardBody className="text-center">
								There are 2 types of the users:<br></br> -Transporter<br></br>-Maritime agent
							</MDBCardBody>
						</MDBCard>
					</MDBCol>

					<MDBCol md="6" lg="4" className="mb-4">
						<MDBCard narrow>
							<MDBView cascade className="gradient-card-header warning-color">
								<h4 className="mb-0">The goal of the application</h4>
							</MDBView>
							<MDBCardBody className="text-center">
								The goal of this application is to make truck's reservation in the vessel and it is even possible to reschedule your reservation or cancel it if there is any constraint.
							</MDBCardBody>
						</MDBCard>
					</MDBCol>

					<MDBCol md="6" lg="4" className="mb-4">
						<MDBCard narrow>
							<MDBView cascade className="gradient-card-header  red accent-2">
								<h4 className="mb-0">Contact</h4>
							</MDBView>
							<MDBCardBody className="text-center">
								<h6>Email: Ebookfret@tangermed.ma</h6>
                                <h6>Tél: 06-61-61-61-61</h6>
                                <h6>Fax: 05-39-39-39-39</h6>
                                <h6>Adresse: La Gare Maritime - Port Tanger Med</h6>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</section>
  );
}

export default PV2;