import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  showResult: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResult,
  questionNumber,
  totalQuestions
}) => {
  const getOptionClass = (index: number) => {
    let baseClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 text-lg font-medium ";
    
    if (!showResult) {
      if (selectedAnswer === index) {
        baseClass += "border-blue-400 bg-blue-50 text-blue-800 transform scale-105 shadow-lg";
      } else {
        baseClass += "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50 hover:transform hover:scale-102 shadow-md";
      }
    } else {
      if (index === question.correctAnswer) {
        baseClass += "border-green-400 bg-green-100 text-green-800 shadow-lg animate-pulse";
      } else if (selectedAnswer === index && index !== question.correctAnswer) {
        baseClass += "border-red-400 bg-red-100 text-red-800 shadow-lg";
      } else {
        baseClass += "border-gray-200 bg-gray-50 text-gray-600";
      }
    }
    
    return baseClass;
  };

  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(difficulty);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      '认识平面图形': 'bg-pink-100 text-pink-800',
      '20以内的退位减法': 'bg-blue-100 text-blue-800',
      '100以内数的认识': 'bg-green-100 text-green-800',
      '100以内的口算加减法': 'bg-yellow-100 text-yellow-800',
      '100以内的笔算加减法': 'bg-purple-100 text-purple-800',
      '数量间的加减关系': 'bg-indigo-100 text-indigo-800',
      '人民币认识': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideIn">
      {/* 头部信息 */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">第 {questionNumber} 题</span>
            <span className="text-lg opacity-80">/ {totalQuestions}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">{getDifficultyStars(question.difficulty)}</span>
          </div>
        </div>
        
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mb-4">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
        
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(question.category)}`}>
          {question.category}
        </div>
      </div>

      {/* 题目内容 */}
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 leading-relaxed whitespace-pre-line">
            {question.question}
          </h2>
        </div>

        {/* 选项 */}
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && onAnswerSelect(index)}
              disabled={showResult}
              className={getOptionClass(index)}
            >
              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showResult && index === question.correctAnswer && (
                  <span className="text-green-600 text-xl">✓</span>
                )}
                {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                  <span className="text-red-600 text-xl">✗</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* 解释 */}
        {showResult && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400 animate-fadeIn">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-xl">💡</span>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">解题思路：</h4>
                <p className="text-blue-700">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};