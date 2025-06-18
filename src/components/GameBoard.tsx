import React, { useState, useEffect } from 'react';
import { QuestionCard } from './QuestionCard';
import { GameResult } from './GameResult';
import { Question, GameState, WrongAnswer } from '../types';
import { QuestionBank } from '../questionBank';
import { Star, Trophy, RotateCcw, Play, CheckCircle } from 'lucide-react';

interface GameBoardProps {
  onGameComplete: (result: GameResult) => void;
  onBackToMenu: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ onGameComplete, onBackToMenu }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    currentQuestion: 0,
    score: 0,
    totalQuestions: 10,
    questions: [],
    answers: [],
    isGameComplete: false,
    showResult: false,
    stars: 0
  });

  const [showExplanation, setShowExplanation] = useState(false);
  const [questionBank] = useState(QuestionBank.getInstance());
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    startNewGame();
  }, []);

  // 自动进入下一题的逻辑
  useEffect(() => {
    if (showExplanation && isCorrect) {
      const timer = setTimeout(() => {
        nextQuestion();
      }, 500); // 正确答案显示1.5秒后自动进入下一题

      return () => clearTimeout(timer);
    }
  }, [showExplanation, isCorrect]);

  const startNewGame = () => {
    const questions = questionBank.getRandomQuestions(10);
    setGameState({
      currentLevel: gameState.currentLevel,
      currentQuestion: 0,
      score: 0,
      totalQuestions: 10,
      questions,
      answers: new Array(10).fill(null),
      isGameComplete: false,
      showResult: false,
      stars: 0
    });
    setGameResult(null);
    setIsCorrect(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (gameState.showResult) return;

    const newAnswers = [...gameState.answers];
    newAnswers[gameState.currentQuestion] = answerIndex;
    
    const isAnswerCorrect = answerIndex === gameState.questions[gameState.currentQuestion].correctAnswer;
    const newScore = gameState.score + (isAnswerCorrect ? 1 : 0);

    setGameState({
      ...gameState,
      answers: newAnswers,
      score: newScore,
      showResult: true
    });

    setShowExplanation(true);
    setIsCorrect(isAnswerCorrect);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setIsCorrect(null);
    
    if (gameState.currentQuestion < gameState.totalQuestions - 1) {
      setGameState({
        ...gameState,
        currentQuestion: gameState.currentQuestion + 1,
        showResult: false
      });
    } else {
      // 游戏结束，生成结果
      const finalScore = gameState.score;
      const stars = finalScore >= 9 ? 3 : finalScore >= 7 ? 2 : finalScore >= 5 ? 1 : 0;
      
      const wrongAnswers: WrongAnswer[] = [];
      const correctAnswers: number[] = [];
      
      gameState.questions.forEach((question, index) => {
        const selectedAnswer = gameState.answers[index];
        if (selectedAnswer === question.correctAnswer) {
          correctAnswers.push(index);
        } else {
          wrongAnswers.push({
            question,
            selectedAnswer: selectedAnswer || -1,
            correctAnswer: question.correctAnswer
          });
        }
      });

      const result: GameResult = {
        score: finalScore,
        totalQuestions: gameState.totalQuestions,
        stars,
        correctAnswers,
        wrongAnswers,
        completedAt: new Date()
      };
      
      setGameResult(result);
      setGameState({
        ...gameState,
        isGameComplete: true,
        stars
      });
      
      onGameComplete(result);
    }
  };

  const continueGame = () => {
    const questions = questionBank.getRandomQuestions(10);
    setGameState({
      ...gameState,
      currentLevel: gameState.currentLevel + 1,
      currentQuestion: 0,
      score: 0,
      questions,
      answers: new Array(10).fill(null),
      isGameComplete: false,
      showResult: false,
      stars: 0
    });
    setGameResult(null);
    setIsCorrect(null);
  };

  if (gameState.questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-xl text-white">正在准备题目...</p>
        </div>
      </div>
    );
  }

  if (gameState.isGameComplete && gameResult) {
    return (
      <GameResult
        result={gameResult}
        onContinue={continueGame}
        onRestart={startNewGame}
        onBackToMenu={onBackToMenu}
      />
    );
  }

  const currentQuestion = gameState.questions[gameState.currentQuestion];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* 顶部状态栏 */}
      <div className="w-full max-w-2xl mb-6">
        <div className="bg-white bg-opacity-90 rounded-xl p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold text-purple-600">第 {gameState.currentLevel} 关</span>
              <span className="text-sm text-gray-600">得分: {gameState.score}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">目标: 7题得⭐⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* 题目卡片 */}
      <QuestionCard
        question={currentQuestion}
        selectedAnswer={gameState.answers[gameState.currentQuestion]}
        onAnswerSelect={handleAnswerSelect}
        showResult={gameState.showResult}
        questionNumber={gameState.currentQuestion + 1}
        totalQuestions={gameState.totalQuestions}
      />

      {/* 答错时显示下一题按钮 */}
      {showExplanation && !isCorrect && (
        <div className="mt-6 animate-fadeIn">
          <button
            onClick={nextQuestion}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-8 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
          >
            <CheckCircle className="w-5 h-5" />
            <span>
              {gameState.currentQuestion === gameState.totalQuestions - 1 ? '查看成绩' : '下一题'}
            </span>
          </button>
        </div>
      )}

      {/* 答对时显示自动进入提示 */}
      {showExplanation && isCorrect && (
        <div className="mt-6 animate-fadeIn">
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-xl flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium">
              {gameState.currentQuestion === gameState.totalQuestions - 1 
                ? '正在生成成绩报告...' 
                : '回答正确！正在进入下一题...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};