#!/bin/bash

# 诊断脚本：检查"Cannot create a remote agent with an empty prompt"错误

echo "🔍 开始诊断 'Cannot create a remote agent with an empty prompt' 错误..."
echo "=================================================="

# 检查操作系统
echo "📋 系统信息:"
uname -a
echo ""

# 检查SSH Agent状态
echo "🔑 SSH Agent 状态:"
if ssh-add -l >/dev/null 2>&1; then
    echo "✅ SSH Agent 正在运行"
    ssh-add -l
else
    echo "❌ SSH Agent 未运行或无密钥"
    echo "错误信息:"
    ssh-add -l 2>&1
fi
echo ""

# 检查SSH配置
echo "⚙️  SSH 配置:"
if [ -f ~/.ssh/config ]; then
    echo "✅ SSH 配置文件存在"
    echo "配置内容:"
    cat ~/.ssh/config
else
    echo "❌ SSH 配置文件不存在"
fi
echo ""

# 检查SSH密钥
echo "🗝️  SSH 密钥:"
if [ -d ~/.ssh ]; then
    echo "SSH 目录内容:"
    ls -la ~/.ssh/
    echo ""
    
    # 检查常见密钥文件
    for key in id_rsa id_ed25519 id_ecdsa; do
        if [ -f ~/.ssh/$key ]; then
            echo "✅ 找到密钥: $key"
            echo "权限: $(ls -l ~/.ssh/$key | awk '{print $1}')"
        fi
    done
else
    echo "❌ SSH 目录不存在"
fi
echo ""

# 检查Git配置
echo "📝 Git 配置:"
echo "用户名: $(git config user.name)"
echo "邮箱: $(git config user.email)"
echo "SSH 命令: $(git config core.sshCommand)"
echo ""

# 测试Git连接
echo "🌐 Git 连接测试:"
if git ls-remote origin >/dev/null 2>&1; then
    echo "✅ Git 远程连接正常"
else
    echo "❌ Git 远程连接失败"
    echo "错误信息:"
    git ls-remote origin 2>&1
fi
echo ""

# 检查环境变量
echo "🌍 环境变量:"
echo "SSH_AUTH_SOCK: ${SSH_AUTH_SOCK:-未设置}"
echo "SSH_AGENT_PID: ${SSH_AGENT_PID:-未设置}"
echo ""

# 检查进程
echo "🔄 相关进程:"
ps aux | grep -E "(ssh-agent|ssh-add)" | grep -v grep
echo ""

# 提供建议
echo "💡 建议解决方案:"
echo "=================================================="

if ! ssh-add -l >/dev/null 2>&1; then
    echo "1. 启动 SSH Agent:"
    echo "   eval \"\$(ssh-agent -s)\""
    echo ""
    echo "2. 添加 SSH 密钥:"
    echo "   ssh-add ~/.ssh/id_rsa"
    echo "   # 或者您的其他密钥文件"
    echo ""
fi

if [ ! -f ~/.ssh/config ]; then
    echo "3. 创建 SSH 配置文件:"
    echo "   touch ~/.ssh/config"
    echo "   chmod 600 ~/.ssh/config"
    echo ""
fi

echo "4. 如果使用 VS Code，尝试:"
echo "   - 重启 VS Code"
echo "   - 运行命令: Remote-SSH: Kill VS Code Server on Host"
echo "   - 更新 Remote Development 扩展"
echo ""

echo "5. 检查 VS Code 设置中的 remote.SSH 配置"
echo ""

echo "诊断完成！请根据上述信息进行相应的修复。"
