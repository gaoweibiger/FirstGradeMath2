#!/bin/bash

# Cloudflare Pages 部署脚本
echo "开始构建 FirstGradeMath2 项目..."

# 安装依赖
echo "安装依赖..."
npm ci

# 构建项目
echo "构建项目..."
npm run build

# 检查构建结果
if [ -d "dist" ]; then
    echo "构建成功！"
    echo "构建文件列表："
    ls -la dist/
    
    echo "index.html 内容："
    cat dist/index.html
    
    echo "部署准备完成！"
else
    echo "构建失败！"
    exit 1
fi
