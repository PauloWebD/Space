import React, { useState, useEffect } from 'react';

const ChatBox = (props) => {
    const [messageList, setMessageList] = useState([]);

    // Fonction pour ajouter un message à la liste
    const addMessage = (message) => {
        setMessageList((prevMessages) => [...prevMessages, message]);
    };

    // Supprimer les messages expirés après 5 minutes
    useEffect(() => {
        const removeExpiredMessages = () => {
            const currentTime = Date.now();
            setMessageList((prevMessages) =>
                prevMessages.filter(
                    (message) => currentTime - message.time < 5 * 60 * 1000
                )
            );
        };

        const interval = setInterval(removeExpiredMessages, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    console.log(` ==> test1 `, props.username);
    // Gestionnaire d'événement pour l'envoi de message
    const handleSendMessage = (event) => {
        event.preventDefault();

        const input = document.getElementById('message-input');
        const message = input.value;

        if (message !== '') {
            const currentTime = Date.now();
            addMessage({ text: message, time: currentTime });
            input.value = '';
        }
    };

    return (
        <div>
            <h1>ChatBox</h1>
            <ul>

                {messageList.map((message, index) => (
                    <li key={index}>
                        {props.userId}: {message.text}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSendMessage}>
                <input type="text" id="message-input" placeholder="Entrez votre message" />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
};

export default ChatBox;
