# 数学大冒险 - 小学一年级数学闯关游戏

一个专为小学一年级学生设计的数学学习游戏，包含7大知识体系，350道精选题目。

## 🎯 项目特色

- **7大知识体系**：涵盖认识平面图形、20以内退位减法、100以内数的认识等
- **350道精选题目**：基于人教版教材设计，难度循序渐进
- **星级评价系统**：激励学习兴趣，提供成就感
- **错题回顾功能**：帮助查漏补缺，巩固知识点
- **精美界面设计**：采用现代化UI设计，提升学习体验

## 📚 知识体系

1. **🔷 认识平面图形** - 图形识别、特征分析、拼组练习、实际应用
2. **➖ 20以内退位减法** - 基础减法、破十法、想加算减、应用题
3. **🔢 100以内数的认识** - 数数、组成、比较、数位概念
4. **🧮 100以内口算** - 整十运算、拆分计算、连续运算、心算技巧
5. **✏️ 100以内笔算** - 不进位加法、进位加法、不退位减法、退位减法
6. **🔗 数量关系** - 部分整体、比多少、两步应用题、综合应用
7. **💰 人民币认识** - 面额识别、单位换算、购物计算、找零问题

## 🚀 技术栈

- **前端框架**: React 18 + TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **构建工具**: Vite
- **代码规范**: ESLint + TypeScript ESLint

## 📦 安装与运行

### 环境要求
- Node.js 16.0 或更高版本
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 🎮 游戏玩法

1. **开始闯关**：点击主页的"开始闯关"按钮
2. **答题过程**：每关包含10道题目，选择正确答案
3. **查看解析**：答题后可查看详细解题思路
4. **星级评价**：
   - ⭐⭐⭐：9-10题正确（完美表现）
   - ⭐⭐：7-8题正确（表现很棒）
   - ⭐：5-6题正确（不错的开始）
5. **错题回顾**：游戏结束后可查看错题和详细解析
6. **继续闯关**：完成一关后可继续挑战下一关

## 📁 项目结构

```
src/
├── components/          # React组件
│   ├── Background.tsx   # 动态背景组件
│   ├── GameBoard.tsx    # 游戏主界面
│   ├── GameResult.tsx   # 成绩展示组件
│   └── QuestionCard.tsx # 题目卡片组件
├── questionBank.ts      # 题库管理
├── types.ts            # TypeScript类型定义
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 🎨 设计特色

- **现代化UI**：采用渐变色彩和圆角设计
- **动态背景**：粒子动画背景增强视觉效果
- **响应式设计**：适配各种屏幕尺寸
- **微交互**：按钮悬停、点击动效
- **无障碍设计**：良好的对比度和可读性

## 🔧 自定义配置

### 修改题目数量
在 `src/questionBank.ts` 中调整各类别题目数量：

```typescript
// 例如：修改图形识别题数量
for (let i = 0; i < 12; i++) { // 修改这里的数字
  // 题目生成逻辑
}
```

### 添加新题目类型
1. 在 `src/types.ts` 中定义新的题目类型
2. 在 `src/questionBank.ts` 中添加生成逻辑
3. 更新相关组件以支持新类型

## 📱 部署

### Netlify部署
项目已配置自动部署到Netlify：
- 构建命令：`npm run build`
- 发布目录：`dist`

### 其他平台部署
项目构建后生成静态文件，可部署到任何静态托管平台：
- Vercel
- GitHub Pages
- 阿里云OSS
- 腾讯云COS

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢所有为小学数学教育贡献力量的老师和开发者
- 题目设计参考了人教版小学一年级数学教材
- UI设计灵感来源于现代教育应用的最佳实践

## 📞 联系方式

如有问题或建议，欢迎通过以下方式联系：
- 提交 Issue
- 发起 Discussion
- 邮件联系：[your-email@example.com]

---

**让数学学习变得更有趣！** 🎉