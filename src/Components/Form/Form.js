import React, { useState, useEffect } from 'react'

function Form(props) {

  const [services, setServices] = useState();

  useEffect(() => {
    fetch('localhost:49567/api/service-type')
    .then(response => response.json)
    .then(json => setServices(json))
  });

  return(
    <div>
      {services}
    </div>
  );
}

export default Form;