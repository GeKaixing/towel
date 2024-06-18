# towel/毛巾
一个 web/android/ios/uniapp 小程序的论坛app，将````持续开源和维护````
## 1. 项目启动
开发环境：macOS monterey 12.4
安装[node](https://nodejs.org/en)和[git](https://git-scm.com/downloads)     
1. node版本>=21.6.1，下载适合的系统相对应的版本  
   * 验证node版本和是否安装成功
````
 node -v
````
1. 安装[git](https://git-scm.com/downloads)下载适合的系统相对应的版本   
   * 验证git版本和是否安装成功
````
 git -v
````
1. 安装[mongoDB](https://www.mongodb.com/try/download/community)下载适合的系统相对应的版本   
   * 验证mongosh版本和是否安装成功
````
 mongosh --version
````
**web端启动**，须安装node和git
   

    git clone https://github.com/GeKaixing/towel.git  

进入根目录

    cd Web_towelClient
安装所需要的依赖包   

    npm i  

启动开发服务器  

    npm run start
安装服务器 **须安装node和mongodb** 

    cd towelSever
安装所需要的依赖包   

    npm i  
启动开发服务器  

    nodemon
### 1.1项目目录结构
web端目录结构
````
├── App.js    二级主入口
├── components    组件 
│   ├── MainMenu.js    导航栏
│   ├── MainMenu.module.css
│   └── mainMenuComponents    导航栏组件
│       ├── About.js    关于
│       ├── About.module.css
│       ├── Add.js    添加
│       ├── Message.js    消息
│       ├── Post.js     文章
│       ├── Post.module.css
│       ├── Search.js     搜索
│       ├── User.js    用户
│       ├── User.module.css
│       ├── addComponents  添加组件
│       │   ├── AddContent.js    添加主页
│       │   └── AddContent.module.css
│       ├── messageComponents    消息组件
│       │   ├── Message.module.css
│       │   └── MessageConten.js    消息主页
│       ├── postComponents    文章组件
│       │   ├── Post.js    文章主页
│       │   ├── Post.module.css
│       │   ├── PostPage.js    文章数据
│       │   └── postContent    进入文章/文章详细页
│       │       ├── PostComment.js    文章回复
│       │       ├── PostComment.module.css
│       │       ├── PostCommentButton.js    文章回复按钮
│       │       ├── PostCommentButton.module.css
│       │       ├── PostContent.js    文章内容/入口
│       │       ├── PostContent.module.css
│       │       ├── PostInput.js    文章回复评论框
│       │       ├── PostInput.module.css
│       │       ├── PostReplyContent.js    回复内容/二级评论内容
│       │       └── PostReplyContent.module.css
│       └── userComponents    组件
│           ├── Login.js    登录
│           ├── Login.module.css
│           ├── Signup.js    注册
│           ├── Signup.module.css
│           └── userHomePageComponts    用户管理组件
│               ├── UserArticle.js    用户文章
│               ├── UserComment.js    用户评论
│               ├── UserHomePage.js    用户主页/入口
│               ├── UserHomePage.module.css    
│               └── UserReply.js    用户回复
├── context
│   ├── noReadNumbers.js    消息数量数据
│   └── searchData.js    搜索数据
├── index.css
├── index.js    主入口
├── router
│   ├── Protected.js    路由守卫
│   ├── Routers.js    路由入口
│   └── Routers.module.css
└── socket
    └── socket.js


````
后端目录结构
````
├── index.js 主入口，全部代码
````
## 2. 项目使用的技术栈，npm i安装了对应不同技术栈，编写时间2024/06/15
web端使用技术栈react/react-router/axios/socket

[![react](https://img.shields.io/badge/react-18.2.0-red 'react')](https://react.dev/ 'react')
[![reactRouter](https://img.shields.io/badge/reactRouter-6.13.0-brightgreen 'react')](https://reactrouter.com/en/main 'reactRouter')
[![axios](https://img.shields.io/badge/axios-1.4.0-blue 'axios')](https://axios-http.com/docs/intro 'axios')
[![socket](https://img.shields.io/badge/socket.io-4.6.2-yellow 'socket')](https://socket.io/ 'socket')

移动端技术栈 react-native/expo/axios/reactnative-navigation/socket

[![react](https://img.shields.io/badge/react-18.2.0-red 'react')](https://react.dev/ 'react')
[![expo](https://img.shields.io/badge/expo-51.0.8-brightgreen 'expo')](https://expo.dev/ 'expo')
[![reactNative](https://img.shields.io/badge/reactNative-0.74.1-green 'reactNative')](https://rn.nodejs.cn/ 'reactNative')
[![axios](https://img.shields.io/badge/axios-1.4.0-blue 'axios')](https://axios-http.com/docs/intro 'axios')
[![socket](https://img.shields.io/badge/socket.io-4.6.2-yellow 'socket')](https://socket.io/ 'socket')


小程序 uniapp/vue/axios/socket/pinia  

[![vue](https://img.shields.io/badge/vue-3.3.11-red 'vue')](https://v3.cn.vuejs.org/ 'vue')
[![pinia](https://img.shields.io/badge/pinia-2.0.36-brightgreen 'pinia')](https://pinia.vuejs.cn/ 'pinia')
[![uniapp](https://img.shields.io/badge/uniapp-3.1.14-green 'uniapp')](https://uniapp.dcloud.net.cn/ 'uniapp')
[![axios](https://img.shields.io/badge/axios-1.4.0-blue 'axios')](https://axios-http.com/docs/intro 'axios')
[![socket](https://img.shields.io/badge/socket.io-4.6.2-yellow 'socket')](https://socket.io/ 'socket')

后端 node/express/mongodb/socket/jwt/multer/nodemailer

[![node](https://img.shields.io/badge/node-21.6.1-red 'node')](https://nodejs.org/en/ 'node')
[![express](https://img.shields.io/badge/express-4.18.3-brightgreen 'express')](https://expressjs.com/ 'express')
[![mongoose](https://img.shields.io/badge/mongoose-8.2.1-green 'mongoose')](https://www.mongodb.com/ 'mongoose')
[![socket](https://img.shields.io/badge/socket.io-4.7.5-yellow 'socket')](https://socket.io/ 'socket')
[![multer](https://img.shields.io/badge/multer-1.4.5-orange 'multer')](https://www.npmjs.com/package/multer 'multer')
[![nodemailer](https://img.shields.io/badge/nodemailer-6.9.13-blue 'nodemailer')](https://nodemailer.com/ 'nodemailer')
[![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-9.0.2-violet 'jsonwebtoken')](https://nodemailer.com/ 'jsonwebtoken')

## 3. 项目亮点
towel 是一个三端同步的项目，在基于expess框架下编写后端项目从0到1实现
* 8个mongoDB模型 （mongooDB的实践）
* 24个接口其中7个公共接口（express的实践）
* 登录鉴权（jwt鉴权的实践）
* 注册验证（nodemailer的实践）
* 文件上传（multer的实践）
* 消息推送 (socket的实践)
web/移动端 使用同一技术栈react，小程序使用uniapp/vue
* 移动端使用expo 开发环境，快速开发
* 移动端使用同一个ui/ux，ui统一，icon统一使用[iconpark](https://iconpark.oceanengine.com/home)
* 均使用socket.io进行消息推送，axios进行数据请求
### 3.1项目疑惑和不足
为什么没有使用typescript？
* 因为是个人开发，使用TS编译消耗时间长，使用代码变得冗长，所以并没有采用了typescript，
为什么没有使用react rudex
* 更多的是使用react的useReduce和useContext做状态管理或者状态提升，使用状态管理的组件并不多，没有必要引入redux框。
为什么叫towel/毛巾
* 因为我的毛巾烂掉了，没有任何含义

不足：
* 未做性能优化
* 未使用reids去做缓存
* 移动端使用iconpark/web使用ant-design/icons，icon不统一
### 3.2 后续将完成的功能
* 使用redis进行后端的性能优化，实现排行榜功能，数据缓存等，首页文章推送算法
* 使用socket.io私聊功能
* 后端并没有去模块化，目录不清晰，1117行代码在同一个文件中，后续将进行模块化
* 工程化较弱目前仅使用git做项目提交和版本管理
* 使用AI生成logo
* 将添加广告模块
* 完善web的响应式布局
## 4 项目整体架构
* ![架构](https://github.com/GeKaixing/towel/raw/main/README_static/Frame%201.png)
[架构修改](https://www.figma.com/design/vnC7Axj82RQ5kOXDD56Elb/Untitled?node-id=1-2&t=X9Wmf6wcpk2Dfj7Y-1)
## 5. 项目截图
UI/UX原型图 

* [移动端](https://www.figma.com/design/2gIurz4y0gsaTvm834N7C2/towel?node-id=0-1&t=w9M5U50Kbn8FrIIS-1) 
* [web端](https://www.figma.com/design/e13QKKoeeCC2t0cufq3cUp/towel?m=auto&t=w9M5U50Kbn8FrIIS-6)
* 项目截图
![项目截图](https://github.com/GeKaixing/towel/raw/main/README_static/%E6%88%AA%E5%B1%8F2024-06-18%2000.44.03.png)
后续添加其他截图