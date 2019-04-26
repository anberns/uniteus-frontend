import React, { useState, useEffect } from 'react'

function Form(props) {

  const [services, setServices] = useState(null);

  const fetchServices = () => {
    if (services === null) {
      fetch('http://localhost:49567/api/service-types')
        .then(response => response.json())
        .then(json => setServices(json.data))
    }
  }

  useEffect(() => {
    fetchServices(); 
  });

  console.log(services)

  return(
    <div>
      hi
    </div>
  );
}

export default Form;