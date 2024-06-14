## 演示 Demo
!['演示'](https://github.com/programmer1000/Ai-video-clip/blob/main/public/CPT2406140917-1769x797.gif)
## 在线访问链接
https://ai-video-demo.vercel.app/
## 技术选型
```js
  1、基础框架使用 nextjs 全栈框架

      说明：

          a、考虑到实现 视频上传 和 前端页面的交互，所以这里综合考虑直接使用 nextjs 全栈开发。

          b、页面样式使用 tailwindcss

  2、拖拽库使用 dnd-kit

      说明: react 生态周边有很多优秀的拖拽库，这里选择了使用 dnd-kit 作为本项目使用，主要是考虑到以下几点：

        a、首先 考虑 github start，npm 下载量，代码更新时间，npm 发布频率，文档是否通俗易懂，是否有相关健全的 demo

        b、基于上面的考虑，一共挑选出下面几个库：React-dnd、React-beautiful-dnd、sortable.js、dnd-kit

          - 具体分析

            - React-dnd：

              - 优点：1、github star 多，代码更新及时 2、npm 下载量大

              - 缺点：1、文档不易读 2、demo 较复杂

            - React-beautiful-dnd

              - 优点：1、github star 多  2、npm 下载量大

              - 缺点：1、代码更新不及时  2、文档显示 暂无精力维护  3、不支持 react18 严格模式

            - sortable.js

              - 优点：存在比较久的拖拽 lib, 不依赖于 react 和 vue.

              - 缺点：官方提供了 react 版本 react-sortablejs，但是提示不建议用于生产环境

            - dnd-kit

              - 优点：github star 还可以，npm 下载量还可以，代码更新及时，文档 demo 通俗易懂


  3、调整 ui 组件元素的大小使用 react-resizable

      说明： 插件实现了用户拖动交互改变元素的尺寸大小，支持水平方向和垂直方向
```
## 实现功能点：
```js
  1、视频文件上传:

     a、上传的视频存储在云服务

     b、支持视频拖拽上传

  2、拖拽使用三方库: dnd-kit      

  3、拖拽视频生成 clip，支持长度裁剪
```
## 安装环境
  执行 npm install
## 启动命令
  执行 npm run dev

  
