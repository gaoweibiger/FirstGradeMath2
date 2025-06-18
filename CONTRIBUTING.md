# 贡献指南

感谢您对"数学大冒险"项目的关注！我们欢迎各种形式的贡献。

## 🚀 如何贡献

### 报告问题
- 使用 GitHub Issues 报告 bug
- 提供详细的问题描述和复现步骤
- 包含屏幕截图（如适用）

### 提出功能建议
- 在 Issues 中标记为 "enhancement"
- 详细描述建议的功能和使用场景
- 解释为什么这个功能对用户有价值

### 代码贡献

#### 开发环境设置
1. Fork 本仓库
2. 克隆到本地：
   ```bash
   git clone https://github.com/your-username/math-adventure.git
   cd math-adventure
   ```
3. 安装依赖：
   ```bash
   npm install
   ```
4. 启动开发服务器：
   ```bash
   npm run dev
   ```

#### 提交代码
1. 创建新分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. 进行更改并测试
3. 提交更改：
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. 推送到 GitHub：
   ```bash
   git push origin feature/your-feature-name
   ```
5. 创建 Pull Request

## 📝 代码规范

### TypeScript
- 使用严格的 TypeScript 配置
- 为所有函数和组件提供类型注解
- 避免使用 `any` 类型

### React 组件
- 使用函数组件和 Hooks
- 组件名使用 PascalCase
- Props 接口以组件名 + Props 命名

### 样式
- 使用 Tailwind CSS 类名
- 保持响应式设计
- 遵循设计系统的颜色和间距规范

### 提交信息
使用约定式提交格式：
- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

## 🎯 题目贡献

### 添加新题目
1. 在 `src/questionBank.ts` 中找到对应类别
2. 按照现有格式添加题目
3. 确保题目符合一年级学生水平
4. 提供清晰的解题思路

### 题目质量标准
- 语言简洁易懂
- 情景贴近生活
- 选项设置合理
- 解析详细准确

## 🧪 测试

在提交 PR 前，请确保：
- [ ] 代码通过 ESLint 检查
- [ ] 应用可以正常构建
- [ ] 新功能在不同屏幕尺寸下正常工作
- [ ] 题目逻辑正确，答案准确

## 📋 Pull Request 检查清单

- [ ] 代码遵循项目规范
- [ ] 提交信息清晰明确
- [ ] 包含必要的文档更新
- [ ] 测试通过
- [ ] 没有引入新的警告或错误

## 🤝 行为准则

- 尊重所有贡献者
- 保持友好和专业的交流
- 专注于建设性的反馈
- 欢迎新手贡献者

## 📞 获取帮助

如果您在贡献过程中遇到问题：
- 查看现有的 Issues 和 Discussions
- 创建新的 Issue 寻求帮助
- 在 PR 中 @维护者

感谢您的贡献！🎉