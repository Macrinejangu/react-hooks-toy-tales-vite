import React, { useState } from "react";

const BASE_URL = "http://localhost:3001/toys";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleImageChange(e) {
    setImage(e.target.value);
  }

  // POST: create a new toy, likes always starts at 0
  function handleSubmit(e) {
    e.preventDefault();

    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, image, likes: 0 }),
    })
      .then((res) => res.json())
      .then((toyFromServer) => {
        onAddToy(toyFromServer);
        setName("");
        setImage("");
      });
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name}
          onChange={handleNameChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}
          onChange={handleImageChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;