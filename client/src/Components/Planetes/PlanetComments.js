import React from 'react';

const PlanetComments = ({ comments }) => {
    return (
        <div>
            {comments.map((comment, index) => (
                <div key={index}>
                    <p>{comment.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default PlanetComments;