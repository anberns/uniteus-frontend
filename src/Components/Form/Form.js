import React, { useState, useEffect } from 'react'

function Form(props) {

  // state
  const [services, setServices] = useState(null);
  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState("Last Name");
  const [email, setEmail] = useState("Email");
  const [comments, setComments] = useState("");

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
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  // create select options
  let serviceOptions = [<option key="DEFAULT" value="DEFAULT" disabled>Select Service Type</option>];
  if (services) {
    let dynamicOptions = services.map( (service) =>
      <option key={service.id}>{service.display_name}</option>
    )
    serviceOptions = [...serviceOptions, ...dynamicOptions];
  }

  return(
    <div>
      <h1>New Assistance Request</h1>
      <hr></hr>
      <form>
        <input type="text" value={firstName} onChange={handleFirstNameChange} /><br></br>
        <input type="text" value={lastName} onChange={handleLastNameChange} /><br></br>
        <input type="text" value={email} onChange={handleEmailChange} /><br></br>
        <select defaultValue="DEFAULT">
          {serviceOptions}
        </select><br></br>
        <input type="textarea" value={comments} onChange={handleCommentsChange} /><br></br>
        <input type="submit" onClick={handleSubmit} value="Get Assistance"/>
      </form>
    </div>
  );
}

export default Form;