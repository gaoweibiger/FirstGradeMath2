import React, { useState, useEffect } from 'react';
import { Background } from './components/Background';
import { GameBoard } from './components/GameBoard';
import { GameResult as GameResultType } from './types';
import { BookOpen, Star, Trophy, Play, Target, Brain, Calculator } from 'lucide-react';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 添加错误边界
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('App error:', error);
      setHasError(true);
      setErrorMessage(error.message || 'Unknown error occurred');
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // 如果有错误，显示错误页面
  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">应用错误</h1>
          <p className="text-gray-600 mb-4">应用程序遇到了问题：</p>
          <p className="text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded">{errorMessage}</p>
          <button
            onClick={() => {
              setHasError(false);
              setErrorMessage('');
              window.location.reload();
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  const handleGameComplete = (result: GameResultType) => {
    // 这里可以添加成绩保存逻辑
    console.log('游戏完成！', result);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowWelcome(false);
  };

  const backToMenu = () => {
    setGameStarted(false);
    setShowWelcome(true);
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen relative">
        <Background />

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="bg-white bg-opacity-95 rounded-3xl shadow-2xl p-8 text-center max-w-4xl w-full animate-slideUp">
            {/* Logo区域 */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                数学大冒险
              </h1>
              <p className="text-gray-600 text-xl">小学一年级数学闯关游戏</p>
            </div>

            {/* 特色介绍 */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center space-y-3 p-4 bg-purple-50 rounded-xl">
                <Trophy className="w-8 h-8 text-purple-500" />
                <span className="text-purple-700 font-medium text-center">每关10题<br/>挑战数学思维</span>
              </div>

              <div className="flex flex-col items-center space-y-3 p-4 bg-pink-50 rounded-xl">
                <Star className="w-8 h-8 text-pink-500" />
                <span className="text-pink-700 font-medium text-center">星级评价<br/>激励学习兴趣</span>
              </div>

              <div className="flex flex-col items-center space-y-3 p-4 bg-blue-50 rounded-xl">
                <Target className="w-8 h-8 text-blue-500" />
                <span className="text-blue-700 font-medium text-center">7大知识体系<br/>350道精选题目</span>
              </div>
            </div>

            {/* 7大知识体系展示 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center justify-center">
                <Calculator className="w-6 h-6 mr-2" />
                7大知识体系
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-lg">
                  <div className="text-lg font-bold text-purple-700 mb-2">🔷 认识平面图形</div>
                  <div className="text-purple-600">图形识别 • 特征分析 • 拼组练习 • 实际应用</div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-lg">
                  <div className="text-lg font-bold text-blue-700 mb-2">➖ 20以内退位减法</div>
                  <div className="text-blue-600">基础减法 • 破十法 • 想加算减 • 应用题</div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg">
                  <div className="text-lg font-bold text-green-700 mb-2">🔢 100以内数的认识</div>
                  <div className="text-green-600">数数 • 组成 • 比较 • 数位概念</div>
                </div>

                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg">
                  <div className="text-lg font-bold text-orange-700 mb-2">🧮 100以内口算</div>
                  <div className="text-orange-600">整十运算 • 拆分计算 • 连续运算 • 心算技巧</div>
                </div>

                <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-lg">
                  <div className="text-lg font-bold text-red-700 mb-2">✏️ 100以内笔算</div>
                  <div className="text-red-600">不进位加法 • 进位加法 • 不退位减法 • 退位减法</div>
                </div>

                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg">
                  <div className="text-lg font-bold text-indigo-700 mb-2">🔗 数量关系</div>
                  <div className="text-indigo-600">部分整体 • 比多少 • 两步应用题 • 综合应用</div>
                </div>

                <div className="bg-gradient-to-r from-teal-100 to-green-100 p-4 rounded-lg md:col-span-2 lg:col-span-1">
                  <div className="text-lg font-bold text-teal-700 mb-2">💰 人民币认识</div>
                  <div className="text-teal-600">面额识别 • 单位换算 • 购物计算 • 找零问题</div>
                </div>
              </div>
            </div>

            {/* 学习特色 */}
            <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">🎯 学习特色</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-gray-700">情景化题目，贴近生活</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span className="text-gray-700">循序渐进，难度递增</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-700">详细解析，理解透彻</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700">错题回顾，查漏补缺</span>
                </div>
              </div>
            </div>

            {/* 开始按钮 */}
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-8 rounded-2xl text-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3"
            >
              <Play className="w-6 h-6" />
              <span>开始闯关</span>
            </button>

            <p className="text-xs text-gray-500 mt-4">
              适合小学一年级学生 • 基于人教版教材设计 • 350道精选题目
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (gameStarted) {
    return (
      <div className="min-h-screen relative">
        <Background />
        <div className="relative z-10">
          <GameBoard
            onGameComplete={handleGameComplete}
            onBackToMenu={backToMenu}
          />
        </div>

        {/* 返回主页按钮 */}
        <button
          onClick={backToMenu}
          className="fixed top-4 left-4 z-20 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
          title="返回主页"
        >
          <BookOpen className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return null;
}

export default App;