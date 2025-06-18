import { Question, QuestionType } from './types';

// 题库类 - 管理所有题目
export class QuestionBank {
  private static instance: QuestionBank;
  private questionPool: { [category: string]: Question[] } = {};

  private constructor() {
    this.initializeQuestionBank();
  }

  public static getInstance(): QuestionBank {
    if (!QuestionBank.instance) {
      QuestionBank.instance = new QuestionBank();
    }
    return QuestionBank.instance;
  }

  private initializeQuestionBank() {
    this.questionPool = {
      '认识平面图形': this.generateShapeQuestions(),
      '20以内退位减法': this.generateSubtractionQuestions(),
      '100以内数的认识': this.generateNumberRecognitionQuestions(),
      '100以内口算': this.generateMentalMathQuestions(),
      '100以内笔算': this.generateWrittenMathQuestions(),
      '数量关系': this.generateRelationshipQuestions(),
      '人民币认识': this.generateMoneyQuestions()
    };
  }

  // 随机获取10道题目（从7个类别中随机选择）
  public getRandomQuestions(count: number = 10): Question[] {
    const categories = Object.keys(this.questionPool);
    const selectedQuestions: Question[] = [];
    const usedIds = new Set<string>();
    
    for (let i = 0; i < count; i++) {
      let attempts = 0;
      let question: Question;
      
      do {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const categoryQuestions = this.questionPool[randomCategory];
        question = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
        attempts++;
      } while (usedIds.has(question.id) && attempts < 100);
      
      if (!usedIds.has(question.id)) {
        selectedQuestions.push({ ...question });
        usedIds.add(question.id);
      }
    }
    
    return selectedQuestions;
  }

  // 获取特定类别的题目
  public getQuestionsByCategory(category: string, count: number = 10): Question[] {
    const categoryQuestions = this.questionPool[category] || [];
    const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // 1. 🔷 认识平面图形 (50题)：图形识别→特征分析→拼组练习→实际应用
  private generateShapeQuestions(): Question[] {
    const questions: Question[] = [];
    const shapes = ['长方形', '正方形', '三角形', '圆形', '平行四边形'];
    const shapeProperties = {
      '长方形': '4条直边，对边相等',
      '正方形': '4条直边，4边相等',
      '三角形': '3条直边，3个角',
      '圆形': '由曲线围成，无角',
      '平行四边形': '对边平行且相等'
    };

    // 图形识别题（12道）- 增加图形标识符
    const identificationScenarios = [
      { scene: '🏠 小明家的窗户是什么形状？', shape: '长方形', emoji: '▭' },
      { scene: '📱 手机屏幕是什么形状？', shape: '长方形', emoji: '▭' },
      { scene: '🎪 马戏团的帐篷顶是什么形状？', shape: '三角形', emoji: '🔺' },
      { scene: '🍕 披萨是什么形状？', shape: '圆形', emoji: '⭕' },
      { scene: '📚 课本封面是什么形状？', shape: '长方形', emoji: '▭' },
      { scene: '🎯 飞镖盘是什么形状？', shape: '圆形', emoji: '⭕' },
      { scene: '🏁 方格旗的每个格子是什么形状？', shape: '正方形', emoji: '⬜' },
      { scene: '🚩 三角旗是什么形状？', shape: '三角形', emoji: '🔺' },
      { scene: '🪙 硬币是什么形状？', shape: '圆形', emoji: '⭕' },
      { scene: '📄 A4纸是什么形状？', shape: '长方形', emoji: '▭' },
      { scene: '🎲 骰子的每个面是什么形状？', shape: '正方形', emoji: '⬜' },
      { scene: '⚠️ 警示牌是什么形状？', shape: '三角形', emoji: '🔺' }
    ];

    for (let i = 0; i < 12; i++) {
      const scenario = identificationScenarios[i];
      const wrongOptions = shapes.filter(s => s !== scenario.shape);
      const options = [scenario.shape, ...wrongOptions.slice(0, 3)].sort(() => Math.random() - 0.5);
      
      questions.push({
        id: `shape_identify_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: `${scenario.scene} ${scenario.emoji}`,
        options,
        correctAnswer: options.indexOf(scenario.shape),
        explanation: `这是${scenario.shape}，${shapeProperties[scenario.shape]}`,
        difficulty: 1,
        category: '认识平面图形'
      });
    }

    // 特征分析题（12道）
    const featureQuestions = [
      { shape: '正方形', feature: '4条边都相等', wrong: ['只有2条边相等', '有5条边', '没有角'], emoji: '⬜' },
      { shape: '长方形', feature: '对边相等', wrong: ['4条边都相等', '只有1条边', '是圆形'], emoji: '▭' },
      { shape: '三角形', feature: '有3个角', wrong: ['有4个角', '没有角', '有5个角'], emoji: '🔺' },
      { shape: '圆形', feature: '没有角', wrong: ['有3个角', '有4个角', '有直边'], emoji: '⭕' },
      { shape: '平行四边形', feature: '对边平行', wrong: ['没有平行边', '只有1条边', '是圆形'], emoji: '▱' }
    ];

    for (let i = 0; i < 12; i++) {
      const questionData = featureQuestions[i % featureQuestions.length];
      const options = [questionData.feature, ...questionData.wrong].sort(() => Math.random() - 0.5);
      
      questions.push({
        id: `shape_feature_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: `🔍 ${questionData.shape} ${questionData.emoji} 有什么特点？`,
        options,
        correctAnswer: options.indexOf(questionData.feature),
        explanation: `${questionData.shape}的特点是：${questionData.feature}`,
        difficulty: 2,
        category: '认识平面图形'
      });
    }

    // 七巧板拼组练习题（13道）- 新增内容
    const tangramQuestions = [
      {
        question: '🧩 七巧板中，两个小三角形可以拼成什么？',
        options: ['平行四边形', '圆形', '五角形', '没法拼'],
        correct: 0,
        explanation: '两个相同的小三角形可以拼成平行四边形或更大的三角形'
      },
      {
        question: '🔷 用4个相同的小正方形可以拼成什么？',
        options: ['大正方形', '圆形', '三角形', '五角形'],
        correct: 0,
        explanation: '4个相同的小正方形可以拼成一个大正方形'
      },
      {
        question: '🎯 七巧板一共有几个三角形？',
        options: ['5个', '3个', '7个', '4个'],
        correct: 0,
        explanation: '七巧板有5个三角形（2个大、1个中、2个小）'
      },
      {
        question: '🧩 七巧板中最大的图形是什么？',
        options: ['大三角形', '正方形', '平行四边形', '小三角形'],
        correct: 0,
        explanation: '七巧板中有2个大三角形，是最大的图形'
      },
      {
        question: '🔺 用七巧板可以拼出什么动物？',
        options: ['兔子', '鱼', '鸟', '以上都可以'],
        correct: 3,
        explanation: '七巧板可以拼出很多动物形状，如兔子、鱼、鸟等'
      }
    ];

    for (let i = 0; i < 13; i++) {
      const baseQuestion = tangramQuestions[i % tangramQuestions.length];
      questions.push({
        id: `shape_tangram_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: baseQuestion.question,
        options: baseQuestion.options,
        correctAnswer: baseQuestion.correct,
        explanation: baseQuestion.explanation,
        difficulty: 2,
        category: '认识平面图形'
      });
    }

    // 实际应用题（13道）- 改进严谨性
    const applicationQuestions = [
      {
        question: '🏗️ 建筑工人要铺地砖，哪种形状的砖能无缝拼接？',
        options: ['正方形', '圆形', '五角星', '心形'],
        correct: 0,
        explanation: '正方形可以无缝拼接，不留空隙'
      },
      {
        question: '🎨 美术课上，老师让画一个有4条边且4个角都相等的图形，应该画什么？',
        options: ['正方形', '长方形', '三角形', '圆形'],
        correct: 0,
        explanation: '正方形有4条相等的边和4个相等的角'
      },
      {
        question: '🚗 车轮为什么做成圆形？',
        options: ['滚动平稳', '好看', '省材料', '容易做'],
        correct: 0,
        explanation: '圆形车轮滚动时中心高度不变，行驶平稳'
      },
      {
        question: '📐 以下哪种四边形的对角线一定相等？',
        options: ['长方形（包括正方形）', '一般平行四边形', '梯形', '任意四边形'],
        correct: 0,
        explanation: '长方形（包括正方形）的对角线一定相等'
      },
      {
        question: '🔺 三角形有几条边？',
        options: ['3条', '4条', '5条', '6条'],
        correct: 0,
        explanation: '三角形有3条边，这是三角形的基本特征'
      },
      {
        question: '📦 纸箱展开后是什么平面图形？',
        options: ['多个长方形组合', '一个长方形', '圆形', '三角形'],
        correct: 0,
        explanation: '长方体展开后是6个长方形组成的平面图'
      },
      {
        question: '⚽ 什么物体可以滚得最远？',
        options: ['球体', '圆柱', '立方体', '圆锥'],
        correct: 0,
        explanation: '球体没有棱角，可以连续滚动'
      },
      {
        question: '🎪 帐篷的底面通常是什么形状？',
        options: ['圆形或多边形', '三角形', '只能是正方形', '必须是长方形'],
        correct: 0,
        explanation: '帐篷底面可以是圆形、正方形、长方形等多种形状'
      }
    ];

    for (let i = 0; i < 13; i++) {
      const baseQuestion = applicationQuestions[i % applicationQuestions.length];
      questions.push({
        id: `shape_application_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: baseQuestion.question,
        options: baseQuestion.options,
        correctAnswer: baseQuestion.correct,
        explanation: baseQuestion.explanation,
        difficulty: 3,
        category: '认识平面图形'
      });
    }

    return questions;
  }

  // 2. ➖ 20以内退位减法 (50题)：基础减法→破十法→想加算减→应用题
  private generateSubtractionQuestions(): Question[] {
    const questions: Question[] = [];

    // 基础减法（15道）- 确保需要退位
    for (let i = 0; i < 15; i++) {
      const minuend = Math.floor(Math.random() * 8) + 12; // 12-19
      const subtrahend = Math.floor(Math.random() * 7) + 3; // 3-9
      
      // 确保个位需要退位
      const minuendOnes = minuend % 10;
      const subtrahendOnes = subtrahend % 10;
      
      if (minuendOnes < subtrahendOnes) {
        const result = minuend - subtrahend;
        
        const wrongAnswers = [
          result + 1,
          result - 1,
          result + 2
        ].filter(n => n >= 0 && n <= 20 && n !== result);
        
        const options = [result, ...wrongAnswers.slice(0, 3)].sort(() => Math.random() - 0.5);
        
        questions.push({
          id: `subtraction_basic_${i + 1}`,
          type: QuestionType.MULTIPLE_CHOICE,
          question: `🧮 计算：${minuend} - ${subtrahend} = ?`,
          options: options.map(String),
          correctAnswer: options.indexOf(result),
          explanation: `${minuend} - ${subtrahend} = ${result}（需要退位计算）`,
          difficulty: 1,
          category: '20以内退位减法'
        });
      } else {
        i--; // 重新生成
      }
    }

    // 破十法（15道）
    const breakTenQuestions = [
      { minuend: 15, subtrahend: 9, explanation: '破十法：15-9，先算10-9=1，再算1+5=6' },
      { minuend: 14, subtrahend: 8, explanation: '破十法：14-8，先算10-8=2，再算2+4=6' },
      { minuend: 13, subtrahend: 7, explanation: '破十法：13-7，先算10-7=3，再算3+3=6' },
      { minuend: 16, subtrahend: 9, explanation: '破十法：16-9，先算10-9=1，再算1+6=7' },
      { minuend: 17, subtrahend: 8, explanation: '破十法：17-8，先算10-8=2，再算2+7=9' },
      { minuend: 12, subtrahend: 5, explanation: '破十法：12-5，先算10-5=5，再算5+2=7' },
      { minuend: 18, subtrahend: 9, explanation: '破十法：18-9，先算10-9=1，再算1+8=9' }
    ];

    for (let i = 0; i < 15; i++) {
      const questionData = breakTenQuestions[i % breakTenQuestions.length];
      const result = questionData.minuend - questionData.subtrahend;
      const wrongAnswers = [result + 1, result - 1, result + 2].filter(n => n >= 0 && n <= 20 && n !== result);
      const options = [result, ...wrongAnswers.slice(0, 3)].sort(() => Math.random() - 0.5);
      
      questions.push({
        id: `subtraction_break_ten_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: `🔟 用破十法计算：${questionData.minuend} - ${questionData.subtrahend} = ?`,
        options: options.map(String),
        correctAnswer: options.indexOf(result),
        explanation: questionData.explanation,
        difficulty: 2,
        category: '20以内退位减法'
      });
    }

    // 想加算减（10道）
    for (let i = 0; i < 10; i++) {
      const addend1 = Math.floor(Math.random() * 7) + 3; // 3-9
      const addend2 = Math.floor(Math.random() * 7) + 3; // 3-9
      const sum = addend1 + addend2;
      
      if (sum <= 20) {
        const wrongAnswers = [addend2 + 1, addend2 - 1, addend2 + 2]
          .filter(n => n >= 0 && n <= 20 && n !== addend2);
        const options = [addend2, ...wrongAnswers.slice(0, 3)].sort(() => Math.random() - 0.5);
        
        questions.push({
          id: `subtraction_think_add_${i + 1}`,
          type: QuestionType.MULTIPLE_CHOICE,
          question: `🤔 想加算减：${addend1} + ? = ${sum}，所以 ${sum} - ${addend1} = ?`,
          options: options.map(String),
          correctAnswer: options.indexOf(addend2),
          explanation: `因为 ${addend1} + ${addend2} = ${sum}，所以 ${sum} - ${addend1} = ${addend2}`,
          difficulty: 2,
          category: '20以内退位减法'
        });
      } else {
        i--; // 重新生成
      }
    }

    // 应用题（10道）- 改进：统一选项格式带单位
    const applicationScenarios = [
      { template: '🎈 小明有{minuend}个气球，送给朋友{subtrahend}个，还剩多少个？', unit: '个' },
      { template: '🍎 妈妈买了{minuend}个苹果，吃了{subtrahend}个，还有多少个？', unit: '个' },
      { template: '📚 书架上有{minuend}本书，借走了{subtrahend}本，还剩多少本？', unit: '本' },
      { template: '🌟 小红收集了{minuend}颗星星贴纸，用掉了{subtrahend}颗，还有多少颗？', unit: '颗' },
      { template: '🚗 停车场有{minuend}辆车，开走了{subtrahend}辆，还有多少辆？', unit: '辆' }
    ];

    for (let i = 0; i < 10; i++) {
      const minuend = Math.floor(Math.random() * 8) + 12; // 12-19
      const subtrahend = Math.floor(Math.random() * 7) + 3; // 3-9
      const result = minuend - subtrahend;
      const scenarioData = applicationScenarios[i % applicationScenarios.length];
      const scenario = scenarioData.template
        .replace('{minuend}', minuend.toString())
        .replace('{subtrahend}', subtrahend.toString());
      
      const wrongAnswers = [result + 1, result - 1, result + 2]
        .filter(n => n >= 0 && n <= 20 && n !== result);
      const options = [result, ...wrongAnswers.slice(0, 3)].sort(() => Math.random() - 0.5);
      
      questions.push({
        id: `subtraction_application_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: scenario,
        options: options.map(n => `${n}${scenarioData.unit}`), // 改进：选项带单位
        correctAnswer: options.indexOf(result),
        explanation: `用减法计算：${minuend} - ${subtrahend} = ${result}${scenarioData.unit}`,
        difficulty: 2,
        category: '20以内退位减法'
      });
    }

    return questions;
  }

  // 3. 🔢 100以内数的认识 (50题)：数数→组成→比较→数位概念
  private generateNumberRecognitionQuestions(): Question[] {
    const questions: Question[] = [];

    // 数数（15道）- 改进：更真实的场景描述
    const countingScenarios = [
      { template: '📚 书架上有{start}本书，按顺序下一本是第几本？', type: 'next' },
      { template: '🎯 排队买票：小明前面有{start}人，他是第几个？', type: 'position' },
      { template: '🔢 按规律数数：{start}, {next1}, ?, {next3}', type: 'sequence' },
      { template: '🏃 跑步比赛：第{start}名后面是第几名？', type: 'next' },
      { template: '📊 计数器显示{start}，再数2个是多少？', type: 'add2' }
    ];

    for (let i = 0; i < 15; i++) {
      const start = Math.floor(Math.random() * 80) + 10;
      const scenarioData = countingScenarios[i % countingScenarios.length];
      let question: string;
      let correctAnswer: number;
      
      switch (scenarioData.type) {
        case 'next':
          question = scenarioData.template.replace('{start}', start.toString());
          correctAnswer = start + 1;
          break;
        case 'position':
          question = scenarioData.template.replace('{start}', start.toString());
          correctAnswer = start + 1;
          break;
        case 'sequence':
          question = scenarioData.template
            .replace('{start}', start.toString())
            .replace('{next1}', (start + 1).toString())
            .replace('{next3}', (start + 3).toString());
          correctAnswer = start + 2;
          break;
        case 'add2':
          question = scenarioData.template.replace('{start}', start.toString());
          correctAnswer = start + 2;
          break;
        default:
          correctAnswer = start + 1;
          question = scenarioData.template.replace('{start}', start.toString());
      }
      
      const options = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2]
        .sort(() => Math.random() - 0.5);
      
      questions.push({
        id: `number_counting_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question,
        options: options.map(String),
        correctAnswer: options.indexOf(correctAnswer),
        explanation: `按顺序递增，答案是${correctAnswer}`,
        difficulty: 1,
        category: '100以内数的认识'
      });
    }

    // 组成（15道）
    for (let i = 0; i < 15; i++) {
      const number = Math.floor(Math.random() * 90) + 10;
      const tens = Math.floor(number / 10);
      const ones = number % 10;
      
      const questionTypes = [
        `🎯 ${number}由几个十和几个一组成？`,
        `🔢 ${number}里面有几个十？几个一？`,
        `📊 把${number}分解：( )个十 + ( )个一`,
        `🧮 计数器显示${number}，十位是几？个位是几？`
      ];
      
      questions.push({
        id: `number_composition_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: questionTypes[i % questionTypes.length],
        options: [
          `${tens}个十${ones}个一`,
          `${ones}个十${tens}个一`,
          `${tens + 1}个十${ones - 1}个一`,
          `${tens - 1}个十${ones + 1}个一`
        ],
        correctAnswer: 0,
        explanation: `${number} = ${tens}个十 + ${ones}个一`,
        difficulty: 2,
        category: '100以内数的认识'
      });
    }

    // 比较（10道）
    for (let i = 0; i < 10; i++) {
      const num1 = Math.floor(Math.random() * 90) + 10;
      const num2 = Math.floor(Math.random() * 90) + 10;
      
      let question: string;
      let correctAnswer: number;
      let options: string[];
      
      const scenarios = [
        `🔢 比较大小：${num1} ○ ${num2}`,
        `📊 哪个数更大？${num1} 和 ${num2}`,
        `🎯 填入合适的符号：${num1} ( ) ${num2}`
      ];
      
      if (num1 > num2) {
        question = scenarios[i % scenarios.length];
        options = ['>', '<', '=', '无法比较'];
        correctAnswer = 0;
      } else if (num1 < num2) {
        question = scenarios[i % scenarios.length];
        options = ['>', '<', '=', '无法比较'];
        correctAnswer = 1;
      } else {
        question = scenarios[i % scenarios.length];
        options = ['>', '<', '=', '无法比较'];
        correctAnswer = 2;
      }
      
      questions.push({
        id: `number_compare_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question,
        options,
        correctAnswer,
        explanation: `比较时先看十位，十位相同再看个位`,
        difficulty: 1,
        category: '100以内数的认识'
      });
    }

    // 数位概念（10道）- 增加计数器表示
    const placeValueQuestions = [
      {
        question: '🔢 在数字56中，5在什么位上？',
        options: ['十位', '个位', '百位', '千位'],
        correct: 0,
        explanation: '5在十位上，表示5个十'
      },
      {
        question: '📊 数字73中，个位上的数字是几？',
        options: ['3', '7', '73', '30'],
        correct: 0,
        explanation: '个位上的数字是3'
      },
      {
        question: '🎯 十位上是4，个位上是2，这个数是多少？',
        options: ['42', '24', '4', '2'],
        correct: 0,
        explanation: '十位是4，个位是2，组成42'
      },
      {
        question: '🧮 计数器显示：十位3，个位7，这个数是？',
        options: ['37', '73', '3', '7'],
        correct: 0,
        explanation: '十位3，个位7，组成37'
      },
      {
        question: '📐 数字89中，哪个数位上的数字更大？',
        options: ['个位', '十位', '一样大', '无法比较'],
        correct: 1,
        explanation: '十位上是8，个位上是9，个位上的数字更大'
      }
    ];

    for (let i = 0; i < 10; i++) {
      const baseQuestion = placeValueQuestions[i % placeValueQuestions.length];
      questions.push({
        id: `number_place_value_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: baseQuestion.question,
        options: baseQuestion.options,
        correctAnswer: baseQuestion.correct,
        explanation: baseQuestion.explanation,
        difficulty: 2,
        category: '100以内数的认识'
      });
    }

    return questions;
  }

  // 4. 🧮 100以内口算 (50题)：整十运算→拆分计算→连续运算→心算技巧
  private generateMentalMathQuestions(): Question[] {
    const questions: Question[] = [];

    // 整十运算（15道）
    for (let i = 0; i < 15; i++) {
      const isAddition = Math.random() > 0.5;
      
      if (isAddition) {
        const num1 = (Math.floor(Math.random() * 5) + 2) * 10; // 20,30,40,50,60
        const num2 = (Math.floor(Math.random() * 3) + 1) * 10; // 10,20,30
        const result = num1 + num2;
        
        if (result <= 100) {
          const options = [result, result + 10, result - 10, result + 20]
            .sort(() => Math.random() - 0.5);
          
          questions.push({
            id: `mental_whole_ten_add_${i + 1}`,
            type: QuestionType.MULTIPLE_CHOICE,
            question: `⚡ 整十数加法：${num1} + ${num2} = ?`,
            options: options.map(String),
            correctAnswer: options.indexOf(result),
            explanation: `整十数相加：${num1} + ${num2} = ${result}`,
            difficulty: 1,
            category: '100以内口算'
          });
        } else {
          i--; // 重新生成
        }
      } else {
        const num1 = (Math.floor(Math.random() * 6) + 4) * 10; // 40,50,60,70,80,90
        const num2 = (Math.floor(Math.random() * 3) + 1) * 10; // 10,20,30
        const result = num1 - num2;
        
        const options = [result, result + 10, result - 10, result + 20]
          .sort(() => Math.random() - 0.5);
        
        questions.push({
          id: `mental_whole_ten_sub_${i + 1}`,
          type: QuestionType.MULTIPLE_CHOICE,
          question: `⚡ 整十数减法：${num1} - ${num2} = ?`,
          options: options.map(String),
          correctAnswer: options.indexOf(result),
          explanation: `整十数相减：${num1} - ${num2} = ${result}`,
          difficulty: 1,
          category: '100以内口算'
        });
      }
    }

    // 拆分计算（15道）
    for (let i = 0; i < 15; i++) {
      const isAddition = Math.random() > 0.5;
      
      if (isAddition) {
        const num1 = Math.floor(Math.random() * 60) + 20; // 20-79
        const num2 = Math.floor(Math.random() * 9) + 1; // 1-9
        const result = num1 + num2;
        
        if (result <= 100) {
          const options = [result, result + 1, result - 1, result + 2]
            .sort(() => Math.random() - 0.5);
          
          questions.push({
            id: `mental_split_add_${i + 1}`,
            type: QuestionType.MULTIPLE_CHOICE,
            question: `🔢 拆分计算：${num1} + ${num2} = ?`,
            options: options.map(String),
            correctAnswer: options.indexOf(result),
            explanation: `拆分法：${num1} + ${num2} = ${result}`,
            difficulty: 2,
            category: '100以内口算'
          });
        } else {
          i--; // 重新生成
        }
      } else {
        const num1 = Math.floor(Math.random() * 60) + 30; // 30-89
        const num2 = Math.floor(Math.random() * 9) + 1; // 1-9
        const result = num1 - num2;
        
        const options = [result, result + 1, result - 1, result + 2]
          .sort(() => Math.random() - 0.5);
        
        questions.push({
          id: `mental_split_sub_${i + 1}`,
          type: QuestionType.MULTIPLE_CHOICE,
          question: `🔢 拆分计算：${num1} - ${num2} = ?`,
          options: options.map(String),
          correctAnswer: options.indexOf(result),
          explanation: `拆分法：${num1} - ${num2} = ${result}`,
          difficulty: 2,
          category: '100以内口算'
        });
      }
    }

    // 连续运算（10道）
    for (let i = 0; i < 10; i++) {
      const num1 = Math.floor(Math.random() * 40) + 20; // 20-59
      const num2 = Math.floor(Math.random() * 10) + 5; // 5-14
      const num3 = Math.floor(Math.random() * 10) + 5; // 5-14
      const result = num1 + num2 - num3;
      
      if (result > 0 && result <= 100) {
        const options = [result, result + 1, result - 1, result + 2]
          .filter(n => n > 0)
          .sort(() => Math.random() - 0.5);
        
        questions.push({
          id: `mental_continuous_${i + 1}`,
          type: QuestionType.MULTIPLE_CHOICE,
          question: `🎯 连续运算：${num1} + ${num2} - ${num3} = ?`,
          options: options.map(String),
          correctAnswer: options.indexOf(result),
          explanation: `从左到右计算：${num1} + ${num2} = ${num1 + num2}，${num1 + num2} - ${num3} = ${result}`,
          difficulty: 3,
          category: '100以内口算'
        });
      } else {
        i--; // 重新生成
      }
    }

    // 心算技巧（10道）
    const mentalTricks = [
      {
        question: '🧠 巧算：25 + 37 + 25 = ?',
        options: ['87', '77', '97', '67'],
        correct: 0,
        explanation: '先算25 + 25 = 50，再算50 + 37 = 87'
      },
      {
        question: '🧠 巧算：46 + 19 = ?',
        options: ['65', '55', '75', '45'],
        correct: 0,
        explanation: '46 + 19 = 46 + 20 - 1 = 66 - 1 = 65'
      },
      {
        question: '🧠 巧算：73 - 18 = ?',
        options: ['55', '45', '65', '35'],
        correct: 0,
        explanation: '73 - 18 = 73 - 20 + 2 = 53 + 2 = 55'
      },
      {
        question: '🧠 巧算：34 + 28 = ?',
        options: ['62', '52', '72', '42'],
        correct: 0,
        explanation: '34 + 28 = 34 + 30 - 2 = 64 - 2 = 62'
      },
      {
        question: '🧠 巧算：50 - 23 = ?',
        options: ['27', '37', '17', '47'],
        correct: 0,
        explanation: '50 - 23 = 50 - 20 - 3 = 30 - 3 = 27'
      }
    ];

    for (let i = 0; i < 10; i++) {
      const baseQuestion = mentalTricks[i % mentalTricks.length];
      questions.push({
        id: `mental_tricks_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: baseQuestion.question,
        options: baseQuestion.options,
        correctAnswer: baseQuestion.correct,
        explanation: baseQuestion.explanation,
        difficulty: 3,
        category: '100以内口算'
      });
    }

    return questions;
  }

  // 5. ✏️ 100以内笔算 (50题)：不进位加法→进位加法→不退位减法→退位减法
  private generateWrittenMathQuestions(): Question[] {
    const questions: Question[] = [];

    // 不进位加法（15道）- 修正：确保个位相加<10
    for (let i = 0; i < 15; i++) {
      const tens1 = Math.floor(Math.random() * 4) + 2; // 2-5
      const ones1 = Math.floor(Math.random() * 4) + 1; // 1-4
      const tens2 = Math.floor(Math.random() * 3) + 1; // 1-3
      const ones2 = Math.floor(Math.random() * (9 - ones1)) + 1; // 修正：确保ones1+ones2<10
      
      const num1 = tens1 * 10 + ones1;
      const num2 = tens2 * 10 + ones2;
      const result = num1 + num2;
      
      if (result <= 100 && (ones1 + ones2) < 10) { // 修正：确保不进位
        const options = [result, result + 1, result - 1, result + 10]
          .sort(() => Math.random() - 0.5);
        
        questions.push({
          id: `written_no_carry_add_${i + 1}`,
          type: QuestionType.MULTIPLE_CHOICE,
          question: `📝 不进位加法：${num1} + ${num2} = ?`,
          options: options.map(String),
          correctAnswer: options.indexOf(result),
          explanation: `竖式计算：个位${ones1}+${ones2}=${ones1+ones2}，十位${tens1}+${tens2}=${tens1+tens2}`,
          difficulty: 1,
          category: '100以内笔算'
        });
      } else {
        i--; // 重新生成
      }
    }

    // 进位加法（15道）- 修正：确保个位相加≥10
    for (let i = 0; i < 15; i++) {
      const tens1 = Math.floor(Math.random() * 3) + 2; // 2-4
      const ones1 = Math.floor(Math.random() * 4) + 6; // 6-9 修正：确保进位
      const tens2 = Math.floor(Math.random() * 3) + 1; // 1-3
      const ones2 = Math.floor(Math.random() * 4) + 6; // 6-9 修正：确保进位
      
      const num1 = tens1 * 10 + ones1;
      const num2 = tens2 * 10 + ones2;
      const result = num1 + num2;
      
      if (result <= 100 && (ones1 + ones2) >= 10) { // 修正：确保进位
        const options = [result, result + 1, result - 1, result - 10]
          .sort(() => Math.random() - 0.5);
        
        questions.push({
          id: `written_carry_add_${i + 1}`,
          type: QuestionType.MULTIPLE_CHOICE,
          question: `📝 进位加法：${num1} + ${num2} = ?`,
          options: options.map(String),
          correctAnswer: options.indexOf(result),
          explanation: `竖式计算：个位${ones1}+${ones2}=${ones1+ones2}，满十进位`,
          difficulty: 2,
          category: '100以内笔算'
        });
      } else {
        i--; // 重新生成
      }
    }

    // 不退位减法（10道）- 修正：确保个位够减
    for (let i = 0; i < 10; i++) {
      const tens1 = Math.floor(Math.random() * 4) + 4; // 4-7
      const ones1 = Math.floor(Math.random() * 6) + 4; // 4-9
      const tens2 = Math.floor(Math.random() * 3) + 1; // 1-3
      const ones2 = Math.floor(Math.random() * ones1) + 1; // 修正：确保ones2 <= ones1
      
      const num1 = tens1 * 10 + ones1;
      const num2 = tens2 * 10 + ones2;
      const result = num1 - num2;
      
      if (ones1 >= ones2) { // 修正：确保不退位
        const options = [result, result + 1, result - 1, result + 10]
          .sort(() => Math.random() - 0.5);
        
        questions.push({
          id: `written_no_borrow_sub_${i + 1}`,
          type: QuestionType.MULTIPLE_CHOICE,
          question: `📝 不退位减法：${num1} - ${num2} = ?`,
          options: options.map(String),
          correctAnswer: options.indexOf(result),
          explanation: `竖式计算：个位${ones1}-${ones2}=${ones1-ones2}，十位${tens1}-${tens2}=${tens1-tens2}`,
          difficulty: 1,
          category: '100以内笔算'
        });
      } else {
        i--; // 重新生成
      }
    }

    // 退位减法（10道）- 修正：确保需要退位
    for (let i = 0; i < 10; i++) {
      const tens1 = Math.floor(Math.random() * 4) + 4; // 4-7
      const ones1 = Math.floor(Math.random() * 4) + 1; // 1-4
      const tens2 = Math.floor(Math.random() * 2) + 1; // 1-2
      const ones2 = Math.floor(Math.random() * 4) + 6; // 6-9 修正：确保ones2 > ones1
      
      const num1 = tens1 * 10 + ones1;
      const num2 = tens2 * 10 + ones2;
      const result = num1 - num2;
      
      if (result > 0 && ones1 < ones2) { // 修正：确保需要退位
        const options = [result, result + 1, result - 1, result + 10]
          .filter(n => n > 0)
          .sort(() => Math.random() - 0.5);
        
        questions.push({
          id: `written_borrow_sub_${i + 1}`,
          type: QuestionType.MULTIPLE_CHOICE,
          question: `📝 退位减法：${num1} - ${num2} = ?`,
          options: options.map(String),
          correctAnswer: options.indexOf(result),
          explanation: `竖式计算：个位不够减，从十位退1，${ones1+10}-${ones2}=${ones1+10-ones2}`,
          difficulty: 2,
          category: '100以内笔算'
        });
      } else {
        i--; // 重新生成
      }
    }

    return questions;
  }

  // 6. 🔗 数量关系 (50题)：部分整体→比多少→两步应用题→综合应用
  private generateRelationshipQuestions(): Question[] {
    const questions: Question[] = [];

    // 部分整体（15道）
    const partWholeScenarios = [
      '🎈 小明有{part1}个红气球，{part2}个蓝气球，一共有多少个气球？',
      '📚 书架上有{part1}本故事书，{part2}本科学书，一共有多少本书？',
      '🌟 小红收集了{part1}颗红星星，{part2}颗黄星星，一共收集了多少颗星星？',
      '🚗 停车场有{part1}辆小汽车，{part2}辆大卡车，一共有多少辆车？',
      '🍎 篮子里有{part1}个苹果，{part2}个橘子，一共有多少个水果？'
    ];

    for (let i = 0; i < 15; i++) {
      const part1 = Math.floor(Math.random() * 30) + 10;
      const part2 = Math.floor(Math.random() * 30) + 10;
      const total = part1 + part2;
      
      const scenario = partWholeScenarios[i % partWholeScenarios.length]
        .replace('{part1}', part1.toString())
        .replace('{part2}', part2.toString());
      
      const options = [total, total + 1, total - 1, total + 2]
        .sort(() => Math.random() - 0.5);
      
      questions.push({
        id: `relationship_part_whole_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: `${scenario} (答案填数字)`,
        options: options.map(String),
        correctAnswer: options.indexOf(total),
        explanation: `部分+部分=总数：${part1} + ${part2} = ${total}`,
        difficulty: 1,
        category: '数量关系'
      });
    }

    // 比多少（15道）
    const compareScenarios = [
      '🏃 一班有{more}人，二班有{less}人，一班比二班多多少人？',
      '🌸 花园里有{more}朵红花，{less}朵白花，红花比白花多多少朵？',
      '📖 小明读了{more}页书，小红读了{less}页，小明比小红多读多少页？',
      '🎯 小华得了{more}分，小李得了{less}分，小华比小李多得多少分？',
      '🍓 妈妈买了{more}个草莓，{less}个樱桃，草莓比樱桃多多少个？'
    ];

    for (let i = 0; i < 15; i++) {
      const less = Math.floor(Math.random() * 30) + 10;
      const difference = Math.floor(Math.random() * 15) + 5;
      const more = less + difference;
      
      const scenario = compareScenarios[i % compareScenarios.length]
        .replace('{more}', more.toString())
        .replace('{less}', less.toString());
      
      const options = [difference, difference + 1, difference - 1, difference + 2]
        .filter(n => n > 0)
        .sort(() => Math.random() - 0.5);
      
      questions.push({
        id: `relationship_compare_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: `${scenario} (答案填数字)`,
        options: options.map(String),
        correctAnswer: options.indexOf(difference),
        explanation: `求多多少用减法：${more} - ${less} = ${difference}`,
        difficulty: 2,
        category: '数量关系'
      });
    }

    // 两步应用题（10道）
    const twoStepScenarios = [
      '🛍️ 妈妈买了{num1}个苹果，又买了{num2}个，吃了{num3}个，还剩多少个？',
      '📚 图书馆有{num1}本书，又买来{num2}本，借出{num3}本，现在有多少本？',
      '🎈 小明有{num1}个气球，朋友给了{num2}个，送人{num3}个，还有多少个？',
      '💰 小红有{num1}元钱，妈妈给了{num2}元，买东西花了{num3}元，还剩多少元？',
      '🌟 小华收集了{num1}颗星星，又收集了{num2}颗，送给同学{num3}颗，还有多少颗？'
    ];

    for (let i = 0; i < 10; i++) {
      const num1 = Math.floor(Math.random() * 20) + 15;
      const num2 = Math.floor(Math.random() * 15) + 10;
      const num3 = Math.floor(Math.random() * 15) + 5;
      const result = num1 + num2 - num3;
      
      if (result > 0) {
        const scenario = twoStepScenarios[i % twoStepScenarios.length]
          .replace('{num1}', num1.toString())
          .replace('{num2}', num2.toString())
          .replace('{num3}', num3.toString());
        
        const options = [result, result + 1, result - 1, result + 2]
          .filter(n => n > 0)
          .sort(() => Math.random() - 0.5);
        
        questions.push({
          id: `relationship_two_step_${i + 1}`,
          type: QuestionType.MULTIPLE_CHOICE,
          question: `${scenario} (答案填数字)`,
          options: options.map(String),
          correctAnswer: options.indexOf(result),
          explanation: `两步计算：先算${num1} + ${num2} = ${num1 + num2}，再算${num1 + num2} - ${num3} = ${result}`,
          difficulty: 3,
          category: '数量关系'
        });
      } else {
        i--; // 重新生成
      }
    }

    // 综合应用（10道）- 修正：公交车问题等
    const comprehensiveScenarios = [
      {
        template: '🎪 马戏团有{total}张票，上午卖了{sold1}张，下午卖了{sold2}张，还剩多少张？',
        operation: 'subtract_both', // total - sold1 - sold2
        explanation: '总数减去卖出的：{total} - {sold1} - {sold2} = {result}'
      },
      {
        template: '🍰 蛋糕店做了{total}个蛋糕，卖出{sold1}个，又做了{made}个，现在有多少个？',
        operation: 'subtract_add', // total - sold1 + made
        explanation: '先减后加：{total} - {sold1} + {made} = {result}'
      },
      {
        template: '🚌 公交车上有{total}人，到站下了{off}人，又上了{on}人，现在有多少人？',
        operation: 'subtract_add', // total - off + on 修正：下车减，上车加
        explanation: '下车用减法，上车用加法：{total} - {off} + {on} = {result}'
      },
      {
        template: '📦 仓库有{total}箱货物，运走{out1}箱，又运走{out2}箱，还剩多少箱？',
        operation: 'subtract_both', // total - out1 - out2
        explanation: '总数减去运走的：{total} - {out1} - {out2} = {result}'
      },
      {
        template: '🎁 商店有{total}份礼品，送出{give}份，又进了{add}份，现在有多少份？',
        operation: 'subtract_add', // total - give + add
        explanation: '先减后加：{total} - {give} + {add} = {result}'
      }
    ];

    for (let i = 0; i < 10; i++) {
      const scenarioData = comprehensiveScenarios[i % comprehensiveScenarios.length];
      const total = Math.floor(Math.random() * 30) + 40;
      const num1 = Math.floor(Math.random() * 15) + 10;
      const num2 = Math.floor(Math.random() * 15) + 10;
      
      let result: number;
      let explanation: string;
      
      if (scenarioData.operation === 'subtract_both') {
        result = total - num1 - num2;
        explanation = scenarioData.explanation
          .replace('{total}', total.toString())
          .replace('{sold1}', num1.toString())
          .replace('{sold2}', num2.toString())
          .replace('{out1}', num1.toString())
          .replace('{out2}', num2.toString())
          .replace('{result}', result.toString());
      } else { // subtract_add 修正：公交车问题逻辑
        result = total - num1 + num2;
        explanation = scenarioData.explanation
          .replace('{total}', total.toString())
          .replace('{sold1}', num1.toString())
          .replace('{made}', num2.toString())
          .replace('{off}', num1.toString())
          .replace('{on}', num2.toString())
          .replace('{give}', num1.toString())
          .replace('{add}', num2.toString())
          .replace('{result}', result.toString());
      }
      
      if (result > 0) {
        const scenario = scenarioData.template
          .replace('{total}', total.toString())
          .replace('{sold1}', num1.toString())
          .replace('{sold2}', num2.toString())
          .replace('{made}', num2.toString())
          .replace('{off}', num1.toString())
          .replace('{on}', num2.toString())
          .replace('{out1}', num1.toString())
          .replace('{out2}', num2.toString())
          .replace('{give}', num1.toString())
          .replace('{add}', num2.toString());
        
        const options = [result, result + 1, result - 1, result + 2]
          .filter(n => n > 0)
          .sort(() => Math.random() - 0.5);
        
        questions.push({
          id: `relationship_comprehensive_${i + 1}`,
          type: QuestionType.MULTIPLE_CHOICE,
          question: `${scenario} (答案填数字)`,
          options: options.map(String),
          correctAnswer: options.indexOf(result),
          explanation,
          difficulty: 3,
          category: '数量关系'
        });
      } else {
        i--; // 重新生成
      }
    }

    return questions;
  }

  // 7. 💰 人民币认识 (50题)：面额识别→单位换算→购物计算→找零问题
  private generateMoneyQuestions(): Question[] {
    const questions: Question[] = [];

    // 面额识别（12道）
    const denominationQuestions = [
      {
        question: '💰 1元等于多少角？',
        options: ['10角', '5角', '100角', '20角'],
        correct: 0,
        explanation: '1元=10角'
      },
      {
        question: '💰 1角等于多少分？',
        options: ['10分', '5分', '100分', '20分'],
        correct: 0,
        explanation: '1角=10分'
      },
      {
        question: '💰 5角等于多少分？',
        options: ['50分', '5分', '25分', '10分'],
        correct: 0,
        explanation: '5角=50分'
      },
      {
        question: '💰 2元等于多少角？',
        options: ['20角', '10角', '200角', '2角'],
        correct: 0,
        explanation: '2元=20角'
      },
      {
        question: '💰 50分等于多少角？',
        options: ['5角', '50角', '10角', '1角'],
        correct: 0,
        explanation: '50分=5角'
      },
      {
        question: '💰 1元5角等于多少角？',
        options: ['15角', '6角', '10角', '5角'],
        correct: 0,
        explanation: '1元5角=10角+5角=15角'
      }
    ];

    for (let i = 0; i < 12; i++) {
      const baseQuestion = denominationQuestions[i % denominationQuestions.length];
      questions.push({
        id: `money_denomination_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: baseQuestion.question,
        options: baseQuestion.options,
        correctAnswer: baseQuestion.correct,
        explanation: baseQuestion.explanation,
        difficulty: 1,
        category: '人民币认识'
      });
    }

    // 单位换算（13道）- 增加不同面额组合
    const exchangeQuestions = [
      {
        question: '💱 1张10元可以换几张5元？',
        options: ['2张', '1张', '3张', '5张'],
        correct: 0,
        explanation: '10元 ÷ 5元 = 2张'
      },
      {
        question: '💱 1张5元可以换几张1元？',
        options: ['5张', '2张', '10张', '3张'],
        correct: 0,
        explanation: '5元 ÷ 1元 = 5张'
      },
      {
        question: '💱 2张5元等于几张1元？',
        options: ['10张', '5张', '2张', '15张'],
        correct: 0,
        explanation: '2×5元 = 10元 = 10张1元'
      },
      {
        question: '💱 1张20元可以换几张10元？',
        options: ['2张', '1张', '4张', '20张'],
        correct: 0,
        explanation: '20元 ÷ 10元 = 2张'
      },
      {
        question: '💱 5张1元等于几张5元？',
        options: ['1张', '5张', '10张', '2张'],
        correct: 0,
        explanation: '5×1元 = 5元 = 1张5元'
      },
      {
        question: '💱 1张50元可以换几张10元？',
        options: ['5张', '10张', '2张', '50张'],
        correct: 0,
        explanation: '50元 ÷ 10元 = 5张'
      },
      {
        question: '💱 3张10元等于几张5元？',
        options: ['6张', '3张', '10张', '15张'],
        correct: 0,
        explanation: '3×10元 = 30元，30元 ÷ 5元 = 6张'
      }
    ];

    for (let i = 0; i < 13; i++) {
      const baseQuestion = exchangeQuestions[i % exchangeQuestions.length];
      questions.push({
        id: `money_exchange_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: baseQuestion.question,
        options: baseQuestion.options,
        correctAnswer: baseQuestion.correct,
        explanation: baseQuestion.explanation,
        difficulty: 2,
        category: '人民币认识'
      });
    }

    // 购物计算（12道）- 增加组合支付场景
    const shoppingScenarios = [
      { item1: '铅笔', price1: 2, item2: '橡皮', price2: 3 },
      { item1: '尺子', price1: 4, item2: '本子', price2: 5 },
      { item1: '贴纸', price1: 6, item2: '彩笔', price2: 8 },
      { item1: '书签', price1: 3, item2: '胶水', price2: 4 },
      { item1: '文具盒', price1: 12, item2: '笔记本', price2: 8 },
      { item1: '水彩笔', price1: 15, item2: '画本', price2: 7 }
    ];

    for (let i = 0; i < 12; i++) {
      const scenario = shoppingScenarios[i % shoppingScenarios.length];
      const total = scenario.price1 + scenario.price2;
      
      const options = [total, total + 1, total - 1, total + 2]
        .sort(() => Math.random() - 0.5);
      
      questions.push({
        id: `money_shopping_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: `🛒 买一个${scenario.item1}(${scenario.price1}元)和一个${scenario.item2}(${scenario.price2}元)，一共要多少钱？`,
        options: options.map(n => `${n}元`),
        correctAnswer: options.indexOf(total),
        explanation: `购物计算：${scenario.price1}元 + ${scenario.price2}元 = ${total}元`,
        difficulty: 2,
        category: '人民币认识'
      });
    }

    // 找零问题（13道）- 改进：不同面额组合
    const changeScenarios = [
      { price: 3, paid: 10, item: '玩具车' },
      { price: 8, paid: 20, item: '绘本' },
      { price: 12, paid: 20, item: '文具盒' },
      { price: 6, paid: 10, item: '贴纸' },
      { price: 15, paid: 20, item: '彩笔套装' },
      { price: 7, paid: 10, item: '小玩具' },
      { price: 18, paid: 20, item: '故事书' },
      { price: 4, paid: 5, item: '橡皮' },
      { price: 9, paid: 10, item: '笔记本' },
      { price: 13, paid: 20, item: '水彩笔' },
      { price: 5, paid: 10, item: '尺子' },
      { price: 16, paid: 20, item: '文具套装' },
      { price: 2, paid: 5, item: '铅笔' }
    ];

    for (let i = 0; i < 13; i++) {
      const scenario = changeScenarios[i % changeScenarios.length];
      const change = scenario.paid - scenario.price;
      
      const options = [change, change + 1, change - 1, change + 2]
        .filter(n => n >= 0 && n <= scenario.paid) // 改进：确保找零合理
        .sort(() => Math.random() - 0.5);
      
      questions.push({
        id: `money_change_${i + 1}`,
        type: QuestionType.MULTIPLE_CHOICE,
        question: `💸 买${scenario.price}元的${scenario.item}，付${scenario.paid}元，应找回多少钱？`,
        options: options.map(n => `${n}元`), // 改进：统一带单位
        correctAnswer: options.indexOf(change),
        explanation: `找零计算：付的钱 - 物品价格 = ${scenario.paid}元 - ${scenario.price}元 = ${change}元`,
        difficulty: 2,
        category: '人民币认识'
      });
    }

    return questions;
  }

  private getShapeEmoji(shape: string): string {
    const emojiMap: { [key: string]: string } = {
      '长方形': '▭',
      '正方形': '⬜',
      '三角形': '🔺',
      '圆形': '⭕',
      '平行四边形': '▱'
    };
    return emojiMap[shape] || '🔷';
  }

  // 获取题库统计信息
  public getStatistics() {
    const stats: { [category: string]: number } = {};
    Object.keys(this.questionPool).forEach(category => {
      stats[category] = this.questionPool[category].length;
    });
    return stats;
  }
}