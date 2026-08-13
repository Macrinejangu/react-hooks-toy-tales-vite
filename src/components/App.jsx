import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const BASE_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET: fetch all toys once, when the page loads
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((toysFromServer) => setToys(toysFromServer));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Called by ToyForm after its own POST request succeeds.
  // Adds the new toy (returned by the server) onto the end of state.
  function handleAddToy(newToy) {
    setToys((toys) => [...toys, newToy]);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} />
    </>
  );
}

export default App;