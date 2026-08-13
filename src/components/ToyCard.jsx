import React from "react";

function ToyCard({ toy, onLikeToy, onDonateToy }) {
  const { id, name, image, likes } = toy;

  // Sends the toy's id and current likes count up to App's handleLikeToy
  function handleLikeClick() {
    onLikeToy(id, likes);
  }

  // Sends this toy's id up to App's handleDonateToy
  function handleDonateClick() {
    onDonateToy(id);
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDonateClick}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;