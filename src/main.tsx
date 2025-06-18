import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 添加错误处理
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// 确保DOM已加载
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Loading Error</h1><p>Root element not found. Please check the HTML structure.</p></div>';
} else {
  try {
    // 隐藏加载提示
    const loadingFallback = document.getElementById('loading-fallback');
    if (loadingFallback) {
      loadingFallback.style.display = 'none';
    }

    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering app:', error);
    // 显示错误信息
    rootElement.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: Arial, sans-serif; background: #f5f5f5;">
        <div style="text-align: center; max-width: 500px; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="font-size: 48px; margin-bottom: 20px;">❌</div>
          <h1 style="margin: 0 0 20px 0; color: #e74c3c;">渲染错误</h1>
          <p style="margin: 0 0 20px 0; color: #666; line-height: 1.5;">
            应用程序渲染失败。错误信息：<br>
            <code style="background: #f8f9fa; padding: 5px; border-radius: 3px; font-size: 12px;">${error.message}</code>
          </p>
          <button onclick="window.location.reload()" style="
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          ">
            刷新页面
          </button>
        </div>
      </div>
    `;
  }
}
