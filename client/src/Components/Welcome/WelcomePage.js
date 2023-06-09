import React, { useState } from 'react';
import questionsData from './questions.json';
import './WelcomePage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';

const WelcomePage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [rank, setRank] = useState('');
    const { userId } = useParams();
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

        // Assign a rank based on the score
        if (currentScore >= 8) {
            setRank('Expert');
        } else if (currentScore >= 5) {
            setRank('Avancé');
        } else {
            setRank('Débutant');
        }

        updateRankInDatabase(currentScore);
    };
    console.log(userId);
    const updateRankInDatabase = async (currentScore) => {
        try {
            await axios.post(`http://localhost:3001/api/users/updateRank/${userId}`, {
                rank: getRank(currentScore)
            });
        } catch (error) {
            console.log(error);
        }
    };
    console.log(userId);
    const getRank = (currentScore) => {
        if (currentScore >= 8) {
            return 'Expert';
        } else if (currentScore >= 5) {
            return 'Avancé';
        } else {
            return 'Débutant';
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
            <Navbar />
            <div>
                <h1>Quiz sur l'univers et le système solaire</h1>
                {currentQuestion < totalQuestions ? (
                    <div>
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
                    <div>
                        <h2>Score: {score}</h2>
                        <h2>Rang: {rank}</h2>
                        <button onClick={restartQuiz}>Recommencer le quiz</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WelcomePage;
