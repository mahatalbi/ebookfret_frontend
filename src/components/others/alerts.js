import React, { Component } from 'react';

import {
    MDBInput, 
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBBadge,
    MDBDataTable,
    MDBIcon,
    MDBSelect,
    MDBSelectInput,
    MDBSelectOptions,
    MDBSelectOption,
    MDBDatePicker,
    MDBTooltip,
    MDBSimpleChart,
    MDBView,
    MDBBtn,
    MDBPagination,
    MDBPageItem,
    MDBPageNav,
    MDBCardHeader,
    MDBListGroup,
    MDBListGroupItem,
    MDBProgress,
    MDBTable,
    MDBBtnFixed,
    MDBBtnFixedItem,
    MDBModal, 
    MDBModalBody,
    MDBModalHeader, 
    MDBModalFooter,
    MDBContainer,
    MDBFormInline,
    MDBTableBody,
    MDBTableHead

} from 'mdbreact';
import { Line } from "react-chartjs-2";

class DV1 extends Component {

    state = {
        buttonStyle: {
            transform: "scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0)",
            opacity: "0"
        },
        reservation:[],
        reservation_number:"",
        unit_number:"",
        truck_number:"",
        tray_number:"",
        approved:false,
        validated:false,
        urlAPI:"",
        modal: false,
        modal1: false,
        transporter:false,
        automatically:false,
        radio: "",
        id:null,
        unit_plate_number: null,
        tray_plate_number: null,
        truck_plate_number:null,
        length:null,
        hight:null,
        width:null,
        etd:null ,
        eta:null 
    }
    
componentDidMount()
{

    this.fetchReservations();
}


saveRes =()=>{
	this.setState({
		modal: !this.state.modal
	  });
    // l'URL du Service Web
    let url = 'http://localhost:8080/reservation/savereservation';
    // Les données du POST
    let data = {
      id:this.state.id,
      unit_plate_number: this.state.unit_plate_number, 
      tray_plate_number: this.state.tray_plate_number,
      truck_plate_number: this.state.truck_plate_number,
      length: this.state.length,
      hight: this.state.hight,
      width: this.state.width,
      etd: this.state.etd,
      eta: this.state.eta
  };
  console.log(data);
// Les options de la requete
let options = {
	method: 'POST',
	body: JSON.stringify(data),
	headers: { "Content-type": "application/json; charset=UTF-8"}
  };

  fetch(url, options)
      .then(response => {
		if(response.status === 200) {
		alert("New Reservation saved successfully");
		}
	});
//	.catch( alert("something is wrong Reservoir not saved successfully"))
	
   }
handleCheckbox = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
  }

changeHandler = event => {
    console.log([event.target.name]+"->"+ event.target.value );
    this.setState({ [event.target.name]: event.target.value });
  };

submitHandler = event => {
    event.preventDefault();

    var reservation =this.state.reservation_number;
    var unit_number = this.state.unit_number;
    var truck_number = this.state.truck_number;
    var tray_number = this.state.tray_number;
    var validated = this.state.validated;
    var approved = this.state.approved;
    var transporter = this.state.transporter;
    var automatically = this.state.automatically;
    this.buildURL(reservation,unit_number,truck_number,tray_number,validated,approved);
   
  };
  buildURL=(reservation,unit_number,truck_number,tray_number,validated,approved)=>{
    var urlparam = []; 
    
    if (reservation) {
      urlparam.push( "reservation_number="+reservation );     
    }
    if (unit_number) {
      urlparam.push( "&unit_number="+unit_number );
    }
    if (truck_number) {
      urlparam.push( "&truck_number="+truck_number );
    }
    if (tray_number) {
      urlparam.push( "&tray_number="+tray_number );
    }
    if (validated) {
      urlparam.push( "&validated="+validated );
    }
    //case of validated equals false
    if(typeof validated === 'boolean' && validated === false) {
      urlparam.push( "&validated="+validated );
     }
    if (approved) {
      urlparam.push( "&approved="+approved );
    }
    if(typeof approved === 'boolean' && approved === false) {
      urlparam.push( "&approved="+approved );
     }
    var url = urlparam.join("");
    //setState() does not immediately mutate this.state 
    //but creates a pending state transition. 
    //Accessing this.state after calling this method can potentially return the existing value.
    // There is no guarantee of synchronous operation of calls to setState 
    //and calls may be batched for performance gains.
    //If you want a function to be executed after the state change occurs, pass it in as a callback.
    this.setState({urlAPI:url}, function () {
      this.filterReservations(this.state.urlAPI);    
  });
  };

filterReservations =(param)=>{
  console.log("full URL"+'http://localhost:8080/reservation/filter?'+param)
    fetch('http://localhost:8080/reservation/filter?'+param,
    {
          method: 'get',
          dataType: 'json',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }})
    .then(response => response.json())
    .then(response=>{
      var jsonArray = { ...response };

      for (var i = 0; i < response.length; i++) {
        if (response[i].has_zre === true) {
          response[i].has_zre = [<i key="Dolor" className="fas fa-circle mr-2 green-text" aria-hidden="true"></i>, 'Active'];
        }else
        {
          response[i].has_zre =[<i key="cell1" className="fas fa-circle mr-2 yellow-text" aria-hidden="true"></i>, 'Waiting'];
        }

        if (response[i].has_sas === true) {
          response[i].has_sas = [<i key="Lorem" className="fas fa-circle mr-2 green-text" aria-hidden="true"></i>, 'Active'];
        }else
        {
          response[i].has_sas =[<i key="Dolor" className="fas fa-circle mr-2 yellow-text" aria-hidden="true"></i>, 'Waiting'];
        }
        if (response[i].has_boarded === true) {
          response[i].has_boarded = [<i key="Lorem" className="fas fa-circle mr-2 green-text" aria-hidden="true"></i>, 'Active'];
        }else
        {
          response[i].has_boarded =[<i key="Dolor" className="fas fa-circle mr-2 yellow-text" aria-hidden="true"></i>, 'Waiting'];
        }

      }

        this.setState({reservation:response});
    })
    .catch(err=>console.error(err));
    
}

fetchReservations =()=>{
    fetch('http://localhost:8080/reservation',
    {
          method: 'get',
          dataType: 'json',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }})
    .then(response => response.json())
    .then(response=>{
      console.log(JSON.stringify(response));
        this.setState({reservation:response});
    })
    .catch(err=>console.error(err));
    
}
    onHover = () => {
        this.setState({
            buttonStyle: {
                transform: "scaleY(1) scaleX(1) translateY(0) translateX(0)",
                opacity: "1"
            }
        });
    }

    onMouseLeave = () => {
        this.setState({
            buttonStyle: {
                transform: "scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0)",
                opacity: "0"
            }
        });
    }
    toggle = () => {
      this.setState({
        modal: !this.state.modal
      });
    }

    toggle1 = () => {
      this.setState({
        modal1: !this.state.modal1
      });
    }
    
    onClick = nr => () => {
      this.setState({
        radio: nr
      });
    }
    
    render() {
                   const data = {
              columns: [
                {
                  label: 'ID',
                  field: 'id',
                  sort: 'asc',
                  width: 150
                },
                {
                  label: 'NUMBER',
                  field: 'reservation_number',
                  sort: 'asc',
                  width: 270
                },
                {
                  label: 'VESSEL NAME',
                  field: 'vessel_name',
                  sort: 'asc',
                  width: 200
                },
                {
                  label: 'ETD',
                  field: 'etd',
                  sort: 'asc',
                  width: 100
                },
                {
                  label: 'ETA',
                  field: 'eta',
                  sort: 'asc',
                  width: 150
                },
                {
                  label: 'UNIT NUMBER',
                  field: 'unit_number',
                  sort: 'asc',
                  width: 100
                },
        
                  {
                    label: 'PASSSED ZRE',
                    field: 'has_zre',
                    sort: 'asc',
                    width: 100
                  },
                  {
                    label: 'PASSED SAS',
                    field: 'has_sas',
                    sort: 'asc',
                    width: 100
                  },
                  {
                    label: 'BOARDED',
                    field: 'has_boarded',
                    sort: 'asc',
                    width: 150
                  },
                  {
                    label: 'ACTION',
                    sort: 'asc',
                    width: 150
                  }
              ],
              rows: this.state.reservation
            };
        return (
            <>
              

                <section className="my-4">
                    <MDBCard cascade narrow>
                
        <div className="p-2 mx-4 mb-5">

                                    <MDBCol xl="12" lg="6" md="12" >

        <form  
        onSubmit={this.submitHandler}
        noValidate>
          <MDBRow>
            <MDBCol md="4">
              <MDBInput
                value={this.state.fname}
                name="reservation_number"
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterNameEx"
                label="Reservation number"
                
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                value={this.state.lname}
                name="unit_number"
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterEmailEx2"
                label="Unit number"
                
              />
            </MDBCol>

          </MDBRow>
          <MDBRow>
            <MDBCol md="4">
              <MDBInput
                value={this.state.city}
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="truck_number"
                label="Truck number"
                
              />
            </MDBCol>
            <MDBCol md="4">
              <MDBInput
                value={this.state.state}
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterPasswordEx4"
                name="tray_number"
                label="Tray number"
                
              />
            </MDBCol>
            
          </MDBRow>
          <MDBRow>
          <center><span class="badge badge-light">Status</span>
          </center>

            <MDBInput
              type="checkbox"
              onChange={this.handleCheckbox}
              value={this.state.approved ? this.state.approved.toString() : "false"}
              id="aprov"
              name= "approved"
              checked={this.state.approved}
              label="Waiting approval"
            />
              <MDBInput
              type="checkbox"
              onChange={this.handleCheckbox}
              value={this.state.validated ? this.state.validated.toString() : "false"}
              id="validat"
              checked={this.state.validated}
              name ="validated"
              
              label="Waiting validation"
            />
          </MDBRow>
          <MDBBtn color="success" type="submit">
            Search reservation
          </MDBBtn>
        </form>
                                    </MDBCol>
                                    
                            </div>
                            <MDBContainer>
      <MDBBtn color="info" onClick={this.toggle}>Create reservation</MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Création de la réservation</MDBModalHeader>
        <MDBModalBody>
        <form  >
          <MDBRow>
            <MDBCol md="5">
              <MDBInput
                value={this.state.unit_plate_number}
                name="unit_plate_number"
                onChange={this.changeHandler}
                id="materialFormCreateResUnit"
                label="Unit plate number"
                
              />
            </MDBCol>
            <MDBCol md="5">
              <MDBInput
                value={this.state.tray_plate_number}
                name="tray_plate_number"
                onChange={this.changeHandler}
                type="text"
                id="materialFormCreateResTray"
                label="Tray plate number"
                
              />
            </MDBCol>

          </MDBRow>
          <MDBRow>
            <MDBCol md="5">
              <MDBInput
                value={this.state.truck_plate_number}
                onChange={this.changeHandler}
                type="text"
                id="materialFormCreateResTray"
                name="truck_plate_number"
                label="Truck plate number"
              />

            </MDBCol>
            <MDBCol md="5">
              <MDBInput
                value={this.state.width}
                onChange={this.changeHandler}
                name="width"
                type="text"
                id="materialFormCreateResWidth"
                label="Width"
                
              />
            </MDBCol>

            { /*<MDBCol md="5">
              <MDBInput
                value={this.state.id}
                onChange={this.changeHandler}
                type="text"
                id="materialFormCreateResId"
                name="id"
                label="ID"
              />

        </MDBCol> */}

              {/* <MDBCol>
             <MDBInput
              type="checkbox"
              value={this.state.unit_plate_number}
                name="unit_plate_number"
                onChange={this.changeHandler}
              id="materialFormCreateTransporter"
              name= "transporter"
              checked={this.state.transporter}
              label="Frigo"
            />  
        
              </MDBCol> */}
            
            
            
          </MDBRow>
          <MDBRow>
            <MDBCol md="5">
              <MDBInput
                
                name="length"
                value={this.state.length}
                onChange={this.changeHandler}
                type="text"
                id="materialFormCreateResLength"
                label="Length"
                
              />
            </MDBCol>
            <MDBCol md="5">
              <MDBInput
                value={this.state.hight}
                name="hight"
                onChange={this.changeHandler}
                type="text"
                id="materialFormCreateResHight"
                label="Hight"
                
              />
            </MDBCol>
            </MDBRow>
            <MDBRow>
            <MDBCol md="5">
          
              <MDBInput
                value={this.state.etd}
                onChange={this.changeHandler}
                name="etd"
                type="text"
                id="materialFormCreateResCall"
                label="ETD"
                
              />
            </MDBCol>
          
            <MDBCol md="5">
              <MDBInput
                value={this.state.eta}
                onChange={this.changeHandler}
                name="eta"
                type="text"
                id="materialFormCreateResCall"
                label="ETA"
                
              />
            </MDBCol>
            </MDBRow>
            {/*<MDBFormInline>
        <MDBInput gap onClick={this.onClick(1)} checked={this.state.radio===1 ? true : false} label="Require transporter approval" type="radio" id="radio1" />
        <MDBInput gap onClick={this.onClick(2)} checked={this.state.radio===2 ? true : false} label="Automatically approved" type="radio" id="radio2" />
            </MDBFormInline> */}

<MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
          <MDBBtn color="primary"  onClick={this.saveRes}>Create reservation</MDBBtn>
          
        </form>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
    <MDBContainer>
    <MDBBtn color="success" onClick={this.toggle1}>Details</MDBBtn>
      <MDBModal isOpen={this.state.modal1} toggle1={this.toggle1}  size="lg">
        <MDBModalHeader toggle1={this.toggle1}>Création de la réservation</MDBModalHeader>
        <MDBModalBody>
          <h5>Reservation details</h5>
          <MDBTable bordered>
          
          <MDBTableHead color="primary-color" textWhite>
        <tr>
          <th>ID</th>
          <th>NUMBER</th>
          <th>LENGTH</th>
          <th>WIDTH</th>
          <th>HEIGHT</th>
          <th>TRUCK PLATE NUMBER</th>
          <th>UNIT PLATE NUMBER</th>
          <th>TRAY PLATE NUMBER</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        
      </MDBTableBody>
    </MDBTable>



    <h5>Reservation status</h5>
          <MDBTable bordered>
          
          <MDBTableHead color="primary-color" textWhite>
        <tr>
          <th>RESERVATION STATUS</th>
          <th>VALIDATED BY CM</th>
          <th>CHECKED IN ZRE</th>
          <th>CHECKED IN SAS EXPORT</th>
          <th>BOARDED IN</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>1</td>
        </tr>
        
      </MDBTableBody>
    </MDBTable>


    <h5>Col details</h5>
          <MDBTable bordered>
          
          <MDBTableHead color="primary-color" textWhite>
        <tr>
          <th>ETA</th>
          <th>ETD</th>
          <th>VESSEL NAME</th>
          
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
        </tr>
        
      </MDBTableBody>
    </MDBTable>
          
<MDBBtn color="secondary" onClick={this.toggle1}>Close</MDBBtn>
</MDBModalBody>
        </MDBModal>
        </MDBContainer>
                        <section>
                            <div className="p-2 mx-4 mb-5" style={{ border: '1px solid #e0e0e9' }}>
                                <MDBRow>

                                    <MDBCol xl="3" lg="6" md="12" style={{ display: 'flex' }}>

                                        <form className="form-inline ml-2">
                                            <div className="form-group md-form py-0 mt-0">
                                                <input className="form-control w-80" type="text" placeholder="Search" />
                                                <MDBBtn size="sm" color="primary" className="d-inline ml-2 px-2"><MDBIcon icon="search" /></MDBBtn>
                                            </div>
                                        </form>
                                    </MDBCol>

                                </MDBRow>
                            </div>
                            <MDBCard narrow className="z-depth-0">

                                <MDBView cascade className="gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center">

                                    <div className="text-left">
                                        <MDBBtn outline color="white" rounded size="sm" className="px-2"><MDBIcon icon="th-large" className="mt-0" /></MDBBtn>
                                        <MDBBtn outline color="white" rounded size="sm" className="px-2"><MDBIcon icon="columns" className="mt-0" /></MDBBtn>
                                    </div>

                                    <a href="#!" className="white-text mx-3">Table name</a>

                                    <div className="text-right">
                                        <MDBBtn outline color="white" rounded size="sm" className="px-2"><MDBIcon icon="pencil-alt" className="mt-0" /></MDBBtn>
                                        <MDBBtn outline color="white" rounded size="sm" className="px-2"><MDBIcon icon="times" className="mt-0" /></MDBBtn>
                                        <MDBBtn outline color="white" rounded size="sm" className="px-2"><MDBIcon icon="info-circle" className="mt-0" /></MDBBtn>
                                    </div>

                                </MDBView>
                                <div className="px-4">
                                <MDBDataTable
                                                    striped
                                                    bordered
                                                    hover
                                                    data={data}
                                                    />
                                    
                                    <hr className="my-0" />
                                    <MDBSelect className="colorful-select w-10 float-left dropdown-primary mt-2 hidden-md-down">
                                        <MDBSelectInput selected="Rows number" />
                                        <MDBSelectOptions>
                                            <MDBSelectOption disabled>Rows number</MDBSelectOption>
                                            <MDBSelectOption value="1">5 rows</MDBSelectOption>
                                            <MDBSelectOption value="2">25 rows</MDBSelectOption>
                                            <MDBSelectOption value="3">50 rows</MDBSelectOption>
                                            <MDBSelectOption value="4">100 rows</MDBSelectOption>
                                        </MDBSelectOptions>
                                    </MDBSelect>

                                    <MDBPagination circle className="my-4 float-right">
                                        <li className="page-item disabled clearfix d-none d-md-block"><a className="page-link" href="#!">First</a></li>
                                        <MDBPageItem disabled>
                                            <MDBPageNav className="page-link" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                                <span className="sr-only">Previous</span>
                                            </MDBPageNav>
                                        </MDBPageItem>
                                        <MDBPageItem active>
                                            <MDBPageNav className="page-link">
                                                1 <span className="sr-only">(current)</span>
                                            </MDBPageNav>
                                        </MDBPageItem>
                                        <MDBPageItem>
                                            <MDBPageNav className="page-link">2</MDBPageNav>
                                        </MDBPageItem>
                                        <MDBPageItem>
                                            <MDBPageNav className="page-link">3</MDBPageNav>
                                        </MDBPageItem>
                                        <MDBPageItem>
                                            <MDBPageNav className="page-link">4</MDBPageNav>
                                        </MDBPageItem>
                                        <MDBPageItem>
                                            <MDBPageNav className="page-link">5</MDBPageNav>
                                        </MDBPageItem>
                                        <MDBPageItem>
                                            <MDBPageNav className="page-link" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                                <span className="sr-only">Next</span>
                                            </MDBPageNav>
                                        </MDBPageItem>
                                    </MDBPagination>
                                </div>
                            </MDBCard>
                        </section>
                    </MDBCard>
                </section>

                
               
                              
            </>
        );
    }
}

export default DV1;
