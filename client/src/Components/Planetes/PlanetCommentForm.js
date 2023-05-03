import React, { useState } from "react";

const PlanetCommentForm = ({ handleSubmit, planetId }) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit({ name, comment, planetId });
        setName('');
        setComment('');
    }

    return (
        <form onSubmit={handleFormSubmit}>

            <label>
                Commentaire :
                <textarea value={comment} onChange={handleCommentChange} />
            </label>
            <button type="submit">Envoyer</button>
        </form>
    );
}

export default PlanetCommentForm;
