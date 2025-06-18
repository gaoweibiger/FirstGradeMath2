import React, { useState } from 'react';
import { GameResult as GameResultType, WrongAnswer } from '../types';
import { Star, Trophy, RotateCcw, Play, BookOpen, ChevronDown, ChevronUp, X } from 'lucide-react';

interface GameResultProps {
  result: GameResultType;
  onContinue: () => void;
  onRestart: () => void;
  onBackToMenu: () => void;
}

export const GameResult: React.FC<GameResultProps> = ({
  result,
  onContinue,
  onRestart,
  onBackToMenu
}) => {
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);

  const getPerformanceMessage = (stars: number) => {
    switch (stars) {
      case 3: return '🎉 完美表现！你是数学小天才！';
      case 2: return '👏 表现很棒！继续保持！';
      case 1: return '💪 不错的开始！继续努力！';
      default: return '📚 多练习就会进步的！';
    }
  };

  const getAccuracyColor = (score: number, total: number) => {
    const accuracy = (score / total) * 100;
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 70) return 'text-blue-600';
    if (accuracy >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-2xl w-full animate-bounceIn">
        {/* 成绩展示 */}
        <div className="mb-8">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">闯关完成！</h2>
          <p className="text-lg text-gray-600 mb-4">{getPerformanceMessage(result.stars)}</p>
          
          {/* 星级评价 */}
          <div className="flex justify-center mb-6">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={`w-10 h-10 mx-1 ${
                  star <= result.stars 
                    ? 'text-yellow-400 fill-current animate-pulse' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          {/* 详细成绩 */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className={`text-3xl font-bold ${getAccuracyColor(result.score, result.totalQuestions)}`}>
                  {result.score}/{result.totalQuestions}
                </div>
                <div className="text-sm text-gray-600">答对题数</div>
              </div>
              <div>
                <div className={`text-3xl font-bold ${getAccuracyColor(result.score, result.totalQuestions)}`}>
                  {Math.round((result.score / result.totalQuestions) * 100)}%
                </div>
                <div className="text-sm text-gray-600">正确率</div>
              </div>
            </div>
          </div>
        </div>

        {/* 错题回顾 */}
        {result.wrongAnswers.length > 0 && (
          <div className="mb-8">
            <button
              onClick={() => setShowWrongAnswers(!showWrongAnswers)}
              className="flex items-center justify-center space-x-2 mx-auto mb-4 text-red-600 hover:text-red-700 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>查看错题 ({result.wrongAnswers.length}道)</span>
              {showWrongAnswers ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showWrongAnswers && (
              <div className="bg-red-50 rounded-xl p-4 text-left max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {result.wrongAnswers.map((wrongAnswer, index) => (
                    <div key={index} className="border-b border-red-200 pb-4 last:border-b-0">
                      <div className="mb-2">
                        <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium mb-2">
                          {wrongAnswer.question.category}
                        </span>
                        <p className="font-medium text-gray-800">{wrongAnswer.question.question}</p>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-2">
                          <X className="w-4 h-4 text-red-500" />
                          <span className="text-red-600">
                            你的答案: {wrongAnswer.selectedAnswer >= 0 ? wrongAnswer.question.options[wrongAnswer.selectedAnswer] : '未选择'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-4 h-4 text-green-500 text-center">✓</span>
                          <span className="text-green-600">
                            正确答案: {wrongAnswer.question.options[wrongAnswer.correctAnswer]}
                          </span>
                        </div>
                        <div className="mt-2 p-2 bg-blue-50 rounded text-blue-700">
                          <strong>解析:</strong> {wrongAnswer.question.explanation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 操作按钮 */}
        <div className="space-y-3">
          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
          >
            <Play className="w-5 h-5" />
            <span>继续闯关</span>
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onRestart}
              className="bg-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新挑战</span>
            </button>
            
            <button
              onClick={onBackToMenu}
              className="bg-gray-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>返回主页</span>
            </button>
          </div>
        </div>

        {/* 完成时间 */}
        <div className="mt-6 text-xs text-gray-500">
          完成时间: {result.completedAt.toLocaleString()}
        </div>
      </div>
    </div>
  );
};