import React, { useState, useEffect } from 'react';

const Test = () => {
    const [stuff, setStuff] = useState([]);

    useEffect(() => {
        const fetchStuff = async () => {
            const response = await fetch('http://localhost:3000/api/stuff');
            const data = await response.json();
            setStuff(data);
        };

        fetchStuff();
    }, []);

    return (
        <div>
            {stuff.map(item => (
                <div key={item._id}>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <img src={item.imageUrl} alt={item.title} />
                    <p>{item.price}</p>
                    <p>{item.userId}</p>
                </div>
            ))}
        </div>
    );
};

export default Test;
