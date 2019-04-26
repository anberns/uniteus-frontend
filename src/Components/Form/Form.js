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
    setFirstName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setFirstName(event.target.value);
  }

  useEffect(() => {
    fetchServices(); 
    console.log(firstName)
  });

  return(
    <div>
      <h1>New Assistance Request</h1>
      <hr></hr>
      <form>
        <input type="text" value={firstName} onChange={handleFirstNameChange} /><br></br>
        <input type="text" value={lastName} onChange={handleLastNameChange} /><br></br>
        <input type="text" value={email} onChange={handleEmailChange} /><br></br>
      </form>
    </div>
  );
}

export default Form;