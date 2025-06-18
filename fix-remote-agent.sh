#!/bin/bash

# 自动修复 "Cannot create a remote agent with an empty prompt" 错误

echo "🔧 开始修复 'Cannot create a remote agent with an empty prompt' 错误..."
echo "=================================================="

# 1. 启动 SSH Agent
echo "1️⃣ 启动 SSH Agent..."
eval "$(ssh-agent -s)"
if [ $? -eq 0 ]; then
    echo "✅ SSH Agent 启动成功"
    echo "SSH_AUTH_SOCK: $SSH_AUTH_SOCK"
    echo "SSH_AGENT_PID: $SSH_AGENT_PID"
else
    echo "❌ SSH Agent 启动失败"
    exit 1
fi
echo ""

# 2. 检查是否存在SSH密钥，如果不存在则生成
echo "2️⃣ 检查SSH密钥..."
if [ ! -f ~/.ssh/id_rsa ] && [ ! -f ~/.ssh/id_ed25519 ]; then
    echo "📝 未找到SSH密钥，正在生成新的ED25519密钥..."
    ssh-keygen -t ed25519 -C "160695728+gaoweibiger@users.noreply.github.com" -f ~/.ssh/id_ed25519 -N ""
    if [ $? -eq 0 ]; then
        echo "✅ SSH密钥生成成功"
        echo "公钥内容:"
        cat ~/.ssh/id_ed25519.pub
        echo ""
        echo "⚠️  请将上述公钥添加到您的GitHub账户中："
        echo "   1. 访问 https://github.com/settings/keys"
        echo "   2. 点击 'New SSH key'"
        echo "   3. 粘贴上述公钥内容"
        echo ""
    else
        echo "❌ SSH密钥生成失败"
        exit 1
    fi
else
    echo "✅ 找到现有SSH密钥"
fi
echo ""

# 3. 添加SSH密钥到agent
echo "3️⃣ 添加SSH密钥到agent..."
for key in ~/.ssh/id_rsa ~/.ssh/id_ed25519; do
    if [ -f "$key" ]; then
        ssh-add "$key"
        if [ $? -eq 0 ]; then
            echo "✅ 成功添加密钥: $key"
        else
            echo "⚠️  添加密钥失败: $key"
        fi
    fi
done
echo ""

# 4. 创建SSH配置文件
echo "4️⃣ 创建SSH配置文件..."
if [ ! -f ~/.ssh/config ]; then
    cat > ~/.ssh/config << 'EOF'
# GitHub配置
Host github.com
    HostName github.com
    User git
    IdentitiesOnly yes
    IdentityFile ~/.ssh/id_ed25519

# 默认配置
Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentitiesOnly yes
EOF
    chmod 600 ~/.ssh/config
    echo "✅ SSH配置文件创建成功"
else
    echo "✅ SSH配置文件已存在"
fi
echo ""

# 5. 测试SSH连接
echo "5️⃣ 测试SSH连接..."
ssh -T git@github.com -o StrictHostKeyChecking=no 2>&1 | head -5
echo ""

# 6. 测试Git连接
echo "6️⃣ 测试Git连接..."
if git ls-remote origin >/dev/null 2>&1; then
    echo "✅ Git远程连接测试成功"
else
    echo "⚠️  Git远程连接测试失败，可能需要添加SSH密钥到GitHub"
fi
echo ""

# 7. 设置环境变量持久化
echo "7️⃣ 设置环境变量持久化..."
if ! grep -q "ssh-agent" ~/.bashrc 2>/dev/null; then
    cat >> ~/.bashrc << 'EOF'

# SSH Agent 自动启动
if [ -z "$SSH_AUTH_SOCK" ]; then
    eval "$(ssh-agent -s)" > /dev/null
    ssh-add ~/.ssh/id_ed25519 2>/dev/null
    ssh-add ~/.ssh/id_rsa 2>/dev/null
fi
EOF
    echo "✅ 已添加SSH Agent自动启动到 ~/.bashrc"
else
    echo "✅ SSH Agent自动启动已配置"
fi
echo ""

# 8. 显示当前状态
echo "8️⃣ 当前SSH状态:"
echo "SSH Agent PID: $SSH_AGENT_PID"
echo "已加载的密钥:"
ssh-add -l 2>/dev/null || echo "无密钥或SSH Agent未运行"
echo ""

echo "🎉 修复完成！"
echo "=================================================="
echo ""
echo "📋 后续步骤:"
echo "1. 如果生成了新的SSH密钥，请将公钥添加到GitHub"
echo "2. 重启您的终端或运行: source ~/.bashrc"
echo "3. 如果使用VS Code，请重启VS Code"
echo "4. 在VS Code中运行命令: Remote-SSH: Kill VS Code Server on Host"
echo ""
echo "🔍 如果问题仍然存在，请检查:"
echo "- VS Code的Remote Development扩展是否最新"
echo "- VS Code设置中的remote.SSH配置"
echo "- 防火墙或网络设置"
