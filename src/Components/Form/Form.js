/*
  to do:
  -form validation
  -echo post data on 201
  -checkbox uncheck
  -style
  -refactor
  -test
*/
import React, { useState, useEffect } from 'react'
import './Form.css';

function Form(props) {

  // state
  const [services, setServices] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState();
  const [description, setDescription] = useState("");
  const [accept, setAccept] = useState(false);


  // lifecycle methods
  useEffect(() => {
    fetchServices(); 
  });

  // fetch select values
  const fetchServices = () => {
    if (services === null) {
      fetch('http://localhost:49567/api/service-types')
        .then(response => response.json())
        .then(json => setServices(json.data))
    }
  }
  
  // click handlers
  const handleChange = (event) => {
    switch (event.target.name) {
      case "fname":
        setFirstName(event.target.value);
        break;
      case "lname":
        setLastName(event.target.value);     
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "service":
        setService(event.target.value); 
        break;
      case "desc":
        setDescription(event.target.value); 
        break;
      case "check":
        setAccept(event.target.value);
        break;
      default:
        break;
    }
  }

  // post form data
  const handleSubmit = (event) => {
    event.preventDefault();

    // validate fields
    if (validateFields()) {

      let data = {
        "assistance_request": {
          "contact": {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
          },
          "service_type": service,
          "description": description === "" ? "none" : description 
          }
      };
      console.log(data)
      

      fetch('http://localhost:49567/api/assistance-requests', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        handleResponse(response)
      })
    }
  }

  const validateFields = () => {

    // reset visibility
    const valDivs = document.getElementsByClassName("val-div");
    for (const i of valDivs) {
      i.style.visibility = 'hidden';
    }

    let allValid = true;

    // firstName
    let firstNameMessageDiv = document.getElementById("fname-val");
    if (firstName === "") {
      firstNameMessageDiv.style.visibility = "visible";
      allValid = false;
    }
    // lastName
    let lastNameMessageDiv = document.getElementById("lname-val");
    if (lastName === "") {
      lastNameMessageDiv.style.visibility = "visible";
      allValid = false;
    }
    // email
    let emailMessageDiv = document.getElementById("email-val");
    if (email === "") {
      emailMessageDiv.innerHTML = "required";
      emailMessageDiv.style.visibility = "visible";
      allValid = false;
    } else if (!emailIsValid(email)) {
      emailMessageDiv.innerHTML = "invalid email address";
      emailMessageDiv.style.visibility = "visible";
      allValid = false;
    }

    // service
    let serviceMessageDiv = document.getElementById("service-val");
    if (service === undefined){
      serviceMessageDiv.style.visibility = "visible";
      allValid = false;
    }
    // checkbox 
    let checkMessageDiv = document.getElementById("check-val");
    if (accept === false) {
      checkMessageDiv.style.visibility = "visible";
      allValid = false;
    }
    return allValid;
  }

  // from https://tylermcginnis.com/validate-email-address-javascript/
  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // display server response
  const handleResponse = (response) => {
    let messageDiv = document.getElementById("response-message")

    // hide form
    let form = document.getElementById("form-div")
    form.style.display = "none"

    switch (response.status) {
      case 201:
        messageDiv.innerHTML = "Your assistance request has been successfully submitted."
        break;
      case 401:
        messageDiv.innerHTML = "Sorry, you are not authorized to make this request."
        break;
      case 500:
        messageDiv.innerHTML = "Oh no! Something completely unexpected happened!"
        break;
      case 503:
        messageDiv.innerHTML = "We're down!!!!!! Come back later.....(please)"
        break;
      default:
         messageDiv.innerHTML = response.statusText;
        break;
    }
  }

  // create select options
  let serviceOptions = [<option key="DEFAULT" >Select Service Type</option>];
  if (services) {
    let dynamicOptions = services.map( (service) =>
      <option key={service.id}>{service.display_name}</option>
    )
    serviceOptions = [...serviceOptions, ...dynamicOptions];
  }

  return(
    <div className="container">
      <div id="response-message"></div>
      <div id="form-div">
        <h1>New Assistance Request</h1>
        <hr></hr>
        <form id="request-form" className="needs-validation" onSubmit={handleSubmit} noValidate>
          <input className="form-control" required type="text" name="fname" value={firstName} onChange={handleChange} placeholder="First Name"/>
          <div className="val-div" id="fname-val">required</div>
          <input className="form-control" required type="text" name="lname" value={lastName} onChange={handleChange} placeholder="Last Name"/>
          <div className="val-div" id="lname-val">required</div>
          <input className="form-control" required type="text" name="email" value={email} onChange={handleChange} placeholder="Email"/>
          <div className="val-div" id="email-val">required</div>
          <select className="form-control" value={service} name="service" onChange={handleChange}>
            {serviceOptions}
          </select>
          <div className="val-div" id="service-val">required</div>
          <input id="desc" className="form-control" type="textarea" name="desc" value={description} onChange={handleChange} /><br></br>
          <input type="checkbox" checked={accept} name="check" onChange={handleChange}/>
          <span> I hereby accept the terms of service for THE NETWORK and the Privacy Policy.</span><br></br>
          <div className="val-div left" id="check-val">Acceptance of terms required</div>
          <div className="right">
            <input className="btn btn-primary btn-sm" type="submit" value="Get Assistance"/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;