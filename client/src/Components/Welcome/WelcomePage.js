import React, { useState } from 'react';
import questionsData from './questions.json';
import './WelcomePage.css';

const WelcomePage = ({ onStart }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [rank, setRank] = useState('');

    const totalQuestions = questionsData.length;

    const handleAnswerSelect = (selectedOption) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = selectedOption;
        setAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < totalQuestions) {
            setCurrentQuestion(nextQuestion);
        } else {
            calculateScore();
        }
    };

    const calculateScore = () => {
        let currentScore = 0;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i] === questionsData[i].answer) {
                currentScore++;
            }
        }
        setScore(currentScore);

        // Assigner un rang en fonction du score
        if (currentScore >= 8) {
            setRank('Expert');
        } else if (currentScore >= 5) {
            setRank('Avancé');
        } else {
            setRank('Débutant');
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setScore(0);
        setRank('');
    };

    return (
        <div className="quizPage">
            {score < 6 ? (
                <div>
                    <h1>Quiz sur l'univers et le système solaire</h1>
                    <p>Question {currentQuestion + 1} sur {totalQuestions}</p>
                    <p>{questionsData[currentQuestion].question}</p>
                    <ul>
                        {questionsData[currentQuestion].options.map((option, optionIndex) => (
                            <li key={optionIndex}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion}`}
                                        value={option}
                                        onChange={() => handleAnswerSelect(option)}
                                    />
                                    {option}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleNextQuestion}>Suivant</button>
                </div>
            ) : (
                currentQuestion >= totalQuestions && (
                    <div className="homePage">
                        <h1>Bienvenue sur notre site sur les planètes du système solaire en 3D !</h1>
                        <p>Explorez les merveilles de l'espace et découvrez les caractéristiques fascinantes de chaque planète.</p>
                        <button onClick={onStart}>Commencer</button>
                    </div>
                )
            )}

            {score < 6 && (
                <div>
                    <h2>Score: {score}</h2>
                    <h2>Rang: {rank}</h2>
                    <button onClick={restartQuiz}>Recommencer le quiz</button>
                </div>
            )}
        </div>
    );
};

export default WelcomePage;
