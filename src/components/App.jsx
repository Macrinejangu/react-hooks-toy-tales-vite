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

  // PATCH: increase a toy's likes by 1
  function handleLikeToy(id, currentLikes) {
    fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: currentLikes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        // map (not filter+push) so the toy keeps its original position in the list
        setToys((toys) =>
          toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
        );
      });
  }

  // DELETE: donate (remove) a toy
  function handleDonateToy(id) {
    fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys((toys) => toys.filter((toy) => toy.id !== id));
    });
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLikeToy={handleLikeToy}
        onDonateToy={handleDonateToy}
      />
    </>
  );
}

export default App;
