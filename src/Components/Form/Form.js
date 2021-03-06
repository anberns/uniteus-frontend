import React, { useState, useEffect } from 'react'
import TextInput from '../TextInput/TextInput';
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
        event.target.checked ? setAccept(true) : setAccept(false) 
        break;
      default:
        break;
    }
  }

  // post form data
  const handleSubmit = (event) => {
    event.preventDefault();

    // validate fields and POST
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
      fetch('http://localhost:49567/api/assistance-requests', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(json => {

        // check for successful response
        if (json.echo) {
          let form = document.getElementById("form-div")
          form.style.display = "none"
          let successDiv = document.getElementById("success-message")
          successDiv.innerHTML = json.message; 
        } else {
          alert(json.message);
        }
      })
    }
  }

  const validateField = (field, invalidValue, valId) => {
    if (field === invalidValue) {
      let element = document.getElementById(valId);
      element.style.visibility = "visible";
      return false;
    }
    return true;
  }

  const validateFields = () => {

    // reset validation message divs
    const valDivs = document.getElementsByClassName("val-div");
    for (const i of valDivs) {
      i.style.visibility = 'hidden';
    }
    document.getElementById("email-val").innerHTML = "required";
    let allValid = true;

    if (!validateField(firstName, "", "fname-val")) {
      allValid = false;
    }
    if (!validateField(lastName, "", "lname-val")) {
      allValid = false;
    }
    if (!validateField(service, undefined, "service-val")) {
      allValid = false;
    } 
    if (!validateField(accept, false, "check-val")) {
      allValid = false;
    } 
    if (validateField(email, "", "email-val")) {
      if (!emailIsValid(email)) {
        let emailMessageDiv = document.getElementById("email-val");
        emailMessageDiv.innerHTML = "invalid email address";
        emailMessageDiv.style.visibility = "visible";
        allValid = false;
      }
    } else {
      allValid = false;
    }     
    return allValid;
  }

  // validate email, from https://tylermcginnis.com/validate-email-address-javascript/
  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // create select options
  let serviceOptions = [<option key="" disabled >Select Service Type</option>];
  if (services) {
    let dynamicOptions = services.map( (service) =>
      <option key={service.id}>{service.display_name}</option>
    )
    serviceOptions = [...serviceOptions, ...dynamicOptions];
  }

  return(
    <div className="container">
      <div id="success-message"></div>
      <div id="form-div">
        <h1>{props.title}</h1>
        <hr></hr>
        <form id="request-form" className="needs-validation" onSubmit={handleSubmit} noValidate>
          <TextInput 
            inputClass="form-control"  
            inputId="fname"
            inputName="fname" 
            inputValue={firstName} 
            onchange={handleChange} 
            placeholder="First Name"
            valId="fname-val"
            valClass="val-div"
            type="text"
          />
          <TextInput 
            inputClass="form-control"  
            inputId="lname"
            inputName="lname" 
            inputValue={lastName} 
            onchange={handleChange} 
            placeholder="Last Name"
            valId="lname-val"
            valClass="val-div"
            type="text"
          />
          <TextInput 
            inputClass="form-control"  
            inputId="email"
            inputName="email" 
            inputValue={email} 
            onchange={handleChange} 
            placeholder="Email"
            valId="email-val"
            valClass="val-div"
            type="email"
          />
          <select className="form-control" value={service} name="service" onChange={handleChange}>
            {serviceOptions}
          </select>
          <div className="val-div" id="service-val">required</div>
          <textarea 
            className="form-control" 
            id="desc" 
            name="desc" 
            value={description}
            onChange={handleChange}
          />
          <input type="checkbox" checked={accept} name="check" onChange={handleChange}/>
          <span> I hereby accept the terms of service for THE NETWORK and the Privacy Policy.</span><br></br>
          <div className="val-div left" id="check-val">Acceptance of terms required</div>
          <div className="right">
            <input id="submitButton" className="btn btn-primary btn-sm" type="submit" value="Get Assistance"/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;