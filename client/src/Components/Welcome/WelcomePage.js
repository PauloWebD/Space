import React, { useState } from 'react';
import questionsData from './questions.json';
import './WelcomePage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import rankImageExpert from '../3D/assets/rank/1.png';
import rankImageAvance from '../3D/assets/rank/3.png';
import rankImageDebutant from '../3D/assets/rank/2.png';

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
            window.location.href = '/userPage'; // Redirection vers la page de Profil après la déconnexion
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

    const updateRankInDatabase = async (currentScore) => {
        try {
            await axios.post(`http://localhost:3001/api/users/updateRank/${userId}`, {
                rank: getRank(currentScore)
            });
        } catch (error) {
            console.log(error);
        }
    };

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
            <div>
                <h1>Quiz sur l'univers et le système solaire</h1>
                {currentQuestion < totalQuestions ? (
                    <div>

                        <div>
                            {rank === 'Expert' && <img src={rankImageExpert} alt="Rank" />} {/* Image pour le rang "Expert" */}
                            {rank === 'Avancé' && <img src={rankImageAvance} alt="Rank" />} {/* Image pour le rang "Avancé" */}
                            {rank === 'Débutant' && <img src={rankImageDebutant} alt="Rank" />} {/* Image pour le rang "Débutant" */}
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
                            <button onClick={handleNextQuestion}>{currentQuestion + 1 === 10 ? "Terminer" : 'Suivant'}</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>Score: {score}</h2>
                        <button onClick={restartQuiz}>Recommencer le quiz</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WelcomePage;
