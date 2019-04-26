import React, { useState, useEffect } from 'react'

function Form(props) {

  // state
  const [services, setServices] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState();
  const [comments, setComments] = useState("");
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
        setComments(event.target.value); 
        break;
      case "check":
        setAccept(event.target.value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:49567/api/assistance-requests', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "assistance_request": {
          "contact": {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
          },
          "service_type": service,
          "description": comments
          }
      })
    })
      .then(response => {
        handleResponse(response.status)
      })
  }

  const handleResponse = (status) => {
    let messageDiv = document.getElementById("response-message")
    let form = document.getElementById("form-div")
    form.style.display = "none"
    switch (status) {
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
          <input className="form-control" required type="text" name="fname" value={firstName} onChange={handleChange} placeholder="First Name"/><br></br>
          <input className="form-control" required type="text" name="lname" value={lastName} onChange={handleChange} placeholder="Last Name"/><br></br>
          <input className="form-control" required type="text" name="email" value={email} onChange={handleChange} placeholder="Email"/><br></br>
          <select className="form-control" value={service} name="service" onChange={handleChange}>
            {serviceOptions}
          </select><br></br>
          <input className="form-control" type="textarea" name="desc" value={comments} onChange={handleChange} /><br></br>
          <input type="checkbox" checked={accept} name="check" onChange={handleChange}/>
          <label>I hereby accept the terms of service for THE NETWORK and the Privacy Policy.</label><br></br>
          <input className="btn btn-primary btn-sm" type="submit" value="Get Assistance"/>
        </form>
      </div>
    </div>
  );
}

export default Form;