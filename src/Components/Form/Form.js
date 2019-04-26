import React, { useState, useEffect } from 'react'

function Form(props) {

  const [services, setServices] = useState(null);
  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState("Last Name");
  const [email, setEmail] = useState("Email");

  const fetchServices = () => {
    if (services === null) {
      fetch('http://localhost:49567/api/service-types')
        .then(response => response.json())
        .then(json => setServices(json.data))
    }
  }
  
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  useEffect(() => {
    fetchServices(); 
    console.log(firstName)
  });

  let serviceOptions = [];
  if (services) {
    serviceOptions = services.map( (service) =>
      <option key={service.id}>{service.display_name}</option>
    );
  }


  return(
    <div>
      <h1>New Assistance Request</h1>
      <hr></hr>
      <form>
        <input type="text" value={firstName} onChange={handleFirstNameChange} /><br></br>
        <input type="text" value={lastName} onChange={handleLastNameChange} /><br></br>
        <input type="text" value={email} onChange={handleEmailChange} /><br></br>
        <select>
          {serviceOptions}
        </select>
      </form>
    </div>
  );
}

export default Form;