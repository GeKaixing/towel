# towel/毛巾
<div align=center>
<img src='https://github.com/GeKaixing/towel/raw/main/README_static/logo.png'/>
</div>

一个 web/android/ios/uniapp 小程序的论坛app，将````持续开源和维护````    
[towel静态部署,在线查看](https://gekaixing.top/)````https://gekaixing.top````  
[微信小程序搜索==>towel毛巾,或者微信扫码在线查看]  
<div align=center>   
<img src="https://raw.githubusercontent.com/GeKaixing/towel/main/README_static/wexinapp.jpg" width="100" height="100" alt='微信小程序分享二维码'/>  
</div>   

主题颜色:rgba(134, 196, 248, 1)             
副颜色:rgba(248, 196, 134, 1)  
[logo详细](https://github.com/GeKaixing/towel/raw/main/README_static/wexinapp.jpg)
## 1. 项目启动
开发环境：macOS monterey 12.7
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

    nodex index.js

使用nodemon自动刷新

    nodemon

当window系统无法识别nodemon(修改执行策略)

    Set-ExecutionPolicy RemoteSigned

安装Llama 3.1 本地部署

    https://llama.meta.com/docs/overview

### 1.1项目目录结构
web端目录结构
````
src
├── App.js                               根组件
├── assets                               静态资源
│   ├── json                             测试数据
│   │   └── post.json                    测试数据
|   ├── markdown                         博客数据
│   └── static                           静态资源
│       ├── MainMenuIcon                 菜单图标
│       │   ├── 提示.svg
│       │   ├── 添加.svg
│       │   ├── 设置.svg
│       │   ├── 评论.svg
│       │   ├── 进入.svg
│       │   └── 首页.svg
│       ├── MainMenuIconPitchUp          菜单触发图标
│       │   ├── 提示.svg
│       │   ├── 添加.svg
│       │   ├── 设置.svg
│       │   ├── 评论.svg
│       │   ├── 进入.svg
│       │   └── 首页.svg
│       ├── otherIcon                    其他图标
│       │   ├── head-img.svg
│       │   ├── 左_left.svg
│       │   ├── 搜索.svg
│       │   ├── 图片添加.svg
│       │   ├── 预览关闭.svg
│       │   └── 预览打开.svg
│       ├── otherIconPitchUp             其他触发图标
│       │   ├── 搜索.svg
│       │   └── 图片添加.svg
│       ├── postIcon                     帖子图标
│       │   ├── 赞.svg
│       │   ├── 分享.svg
│       │   ├── 星星.svg
│       │   └── 评论.svg
│       └── postIconPitchUp              帖子触发图标
│           ├── 赞.svg
│           ├── 分享.svg
│           ├── 星星.svg
│           └── 评论.svg
├── components                           复用组件
│   ├── DeleteBox.js                     删除弹窗
│   ├── H5header.js                      h5显示的头部
│   ├── MainMenuLink.js                  菜单链接
│   ├── MainMenuTitle.js                 菜单标题
│   ├── NotRouter.js                     404路由
│   ├── Portal.js                        模态弹窗
│   └── Search.js                        搜索组件
├── hooks                                自定义hooks  
│   ├── useClickOutside.js               鼠标点击外部 hook
│   └── useLocaStorage.js                获取locastorage数据 hook
├── index.css                            全局样式
├── index.js                             根组件
├── router                               路由
│   ├── Protected.js                     路由守卫
│   ├── Routers.js                       路由入口
│   └── Routers.module.css               路由样式
├── services                             api
│   ├── Signup                           注册 API
│   │   └── signup.js
│   ├── add                              添加 API
│   │   └── add.js  
│   ├── ai                               ai API
│   │   └── ai.js  
│   ├── config.js                        配置 API
│   ├── login                            登录 API
│   │   └── login.js
│   ├── message                          消息 API
│   │   └── Message.js
│   ├── nodemailerRegister               验证码 API
│   │   └── nodemailerRegister.js
│   ├── post                             发布 API
│   │   └── post.js
│   ├── setting                          设置 API
│   │   └── setting.js
│   └── user                             用户 API
│       └── user.js
├── socket                               socket API
│   └── socket.js
├── store                                状态管理
│   ├── Context.js                       状态管理入口
│   ├── MessageResponseData.js           消息页面状态
│   ├── noReadNumbers.js                 未读消息状态
│   ├── privateChat.js                   私聊状态
│   ├── searchData.js                    搜索页面状态
│   └── selectLightorDark.js             颜色背景状态
└── view                                 页面
    ├── body                             主体/页面中间的部分
    │   ├── aboutComponents              关于组件
    │   │   └── About.js                 关于页面
    │   ├── addComponents                添加组件
    │   │   ├── AddContent.js            添加页面
    │   │   └── AddContent.module.css
    │   ├── AiComponents                 AI组件
    │   │   ├── AiContent.js             AI页面
    │   ├── blogComponents               博客组件
    │   │   ├── BlogContent.js           博客页面
    |   |   ├── Blog.module.css          博客样式
    │   ├── messageComponents            消息组件
    |   |   ├── PrivateChat.js           私信页面
    │   │   ├── Message.module.css
    │   │   └── MessageConten.js         消息页面
    │   ├── postComponents               帖子
    │   │   ├── Post.js                  帖子组件
    │   │   ├── Post.module.css
    │   │   ├── PostPage.js              帖子页面
    │   │   └── postContent              帖子内容   
    │   │       ├── PostComment.js       评论内容
    │   │       ├── PostComment.module.css
    │   │       ├── PostCommentButton.js评论按钮
    │   │       ├── PostCommentButton.module.css
    │   │       ├── PostContent.js       帖子内容
    │   │       ├── PostContent.module.css
    │   │       ├── PostInput.js         评论/回复输入框
    │   │       ├── PostInput.module.css
    │   │       ├── PostReplyContent.js  回复内容
    │   │       └── PostReplyContent.module.css
    │   ├── settingComponents            设置頁面
    │   │   ├── SettingBackground.js     黑白设置
    │   │   ├── SettingBackground.module.css
    │   │   ├── SettingBackgroundPage    自定义背景/bing背景
    │   │   │   ├── SettingBackgroundImg.js
    │   │   │   └── SettingBackgroundImg.module.css
    │   │   ├── SettingContent.js        设置页面
    │   │   ├── SettingContent.module.css
    │   │   ├── SettingUser.js           用户设置
    │   │   ├── SettingUser.module.css
    │   │   └── SettingUserPage          用户信息设置
    │   │       ├── SettingAccount.js    账号信息设置
    │   │       ├── SettingAccount.module.css
    │   │       ├── SettingDeactivate.js 账号注销设置
    │   │       ├── SettingDeactivate.module.css
    │   │       ├── SettingUserForgetPage.js忘记密码设置
    │   │       └── SettingUserForgetPage.module.css
    │   └── userComponents               用户组件
    │       ├── Login.js                 登录页面
    │       ├── Login.module.css    
    │       ├── Signup.js                注册页面
    │       ├── Signup.module.css
    │       └── userHomePageComponts     用户主页组件
    │           ├── UserArticle.js       用户文章页面
    │           ├── UserComment.js       用户评论页面
    │           ├── UserContent.js       用户主页页面
    │           ├── UserHomePage.module.css
    │           └── UserReply.js         用户回复页面
    ├── foot                             页脚/页面右侧
    │   ├── User.js
    │   └── User.module.css
    └── head                             头部/页面左侧
        ├── MainMenu.js                  导航栏            
        └── MainMenu.module.css
````
后端目录结构
````
src
├── DB                                   数据库模块
│   ├── commentModule.js                 评论表
│   ├── favoriftModule.js                收藏表
│   ├── index.js                         数据库模块入口
│   ├── likeModule.js                    喜欢表
│   ├── mentionModule.js                 提醒消息表
│   ├── postModule.js                    帖子表
│   ├── replyModule.js                   评论表
│   ├── staticdataModule.js              静态资源地址表
│   ├── userModule.js                    用户表
│   └── verificationcodeModule.js        验证码表
├── Ai                                   Ai路由
│   └── Llama.js  
├── auth                                 权鉴模块    
│   └── index.js                         
├── authRoute                            权鉴路由
│   └── index.js 
├── commonRoute                          公开路由
│   └── index.js
└── socket                               消息通知
   └── index.js 
├── index.js                             主入口
````
## 2. 项目使用的技术栈，npm i安装了对应不同技术栈，编写时间2024/11/10
web端使用技术栈react/react-router/axios/socket/ts

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
* AI Llama3.1 8b 模型 （Llama3.1的实践）  
* react/Rn 使用同一技术栈react，小程序使用uniapp/vue
* RN使用expo 开发环境，快速开发
* 小程序和RN和web使用同一个ui/ux，ui统一，icon统一使用[iconpark](https://iconpark.oceanengine.com/home)
* 均使用socket.io进行消息推送，axios进行数据请求
* Eslint 工程化（Web）
### 3.1项目疑惑和不足
为什么没有使用typescript？
* 因为是个人开发，使用TS编译消耗时间长，使用代码变得冗长，所以并没有采用了typescript。 
* 11月11日还是有typescript重构了。      
为什么没有使用react rudex
* 更多的是使用react的useReduce和useContext做状态管理或者状态提升，使用状态管理的组件并不多，没有必要引入redux框。  
为什么叫towel/毛巾
* 因为我的毛巾烂掉了，没有任何含义
  
不足：
* 未做性能优化
* 未使用reids去做缓存
### 3.2 后续将完成的功能
* 使用redis进行后端的性能优化，实现排行榜功能，数据缓存等，首页文章推送算法 （太难了）
* 使用socket.io私聊功能（已完成）
* 后端并没有去模块化，目录不清晰，1117行代码在同一个文件中，后续将进行模块化 （进行中）
* 工程化较弱目前仅使用git做项目提交和版本管理，（目前添加eslint）
* 将添加广告模块 
* 完善web的响应式布局  
* 权限设计
## 4 项目整体架构
<img src="https://github.com/GeKaixing/towel/raw/main/README_static/Frame%201.png" alt="架构" width="400" height="450"  />

[架构修改](https://www.figma.com/design/vnC7Axj82RQ5kOXDD56Elb/Untitled?node-id=1-2&t=X9Wmf6wcpk2Dfj7Y-1)
## 5. 项目截图
UI/UX原型图 
* [移动端](https://www.figma.com/design/2gIurz4y0gsaTvm834N7C2/towel?node-id=0-1&t=w9M5U50Kbn8FrIIS-1) 
* [web端](https://www.figma.com/design/e13QKKoeeCC2t0cufq3cUp/towel?m=auto&t=w9M5U50Kbn8FrIIS-6)

web项目截图
![项目截图](https://github.com/GeKaixing/towel/raw/main/README_static/web/home.png)
![项目截图](https://github.com/GeKaixing/towel/raw/main/README_static/web/about.png)
![项目截图](https://github.com/GeKaixing/towel/raw/main/README_static/web/llama.png)
![项目截图](https://github.com/GeKaixing/towel/raw/main/README_static/web/add.png)
![项目截图](https://github.com/GeKaixing/towel/raw/main/README_static/web/blog.png)
![项目截图](https://github.com/GeKaixing/towel/raw/main/README_static/web/user.png)
![项目截图](https://github.com/GeKaixing/towel/raw/main/README_static/web/setting.png)

小程序项目/N项目截图截图
<div>
<img src="https://github.com/GeKaixing/towel/raw/main/README_static/uni_towel.png" width="200" height="400" />
<img src="https://github.com/GeKaixing/towel/raw/main/README_static/RN_towel.png" width="200" height="400" />
</div>

### 其他

* uniapp 目录结构               

````

│  App.vue                               app入口
│  main.js                               main入口
│  manifest.json
│  pages.json                            页面文件  
│  shime-uni.d.ts
│  uni.scss
│
├─components                             公共组件
│      modal.vue                         模态窗口
│      post.vue                          post组件
│      userReply.vue                     用户回复组件
│
├─pages                                  页面
│  ├─add        
│  │      add.vue                        添加页面
│  │    
│  ├─post                                主页/帖子页面
│  │  │  post.vue
│  │  │
│  │  ├─postContent                      帖子二级页面
│  │  │      postComment.vue             评论组件
│  │  │      postContent.vue             二级页面入口
│  │  │      postInput.vue               输入组件
│  │  │      postReply.vue               回复组件
│  │  │
│  │  └─search                           主页搜索组件
│  │          search.vue                 搜索组件
│  │
│  └─user                                个人页面
│          login.vue                     登录页面
│          signup.vue                    注册页面
│          user.vue                      个人页面入口
│
├─socket                                    
│      socket.js                         socket组件
│
├─static                                 静态资源
│  │  logo.png                           logo
│  │
│  ├─addIcon                             添加页面icon
│  │      图片添加.svg
│  │      添加.svg
│  │
│  ├─postIcon                            帖子页面icon
│  │      分享.svg
│  │      星星.svg
│  │      评论.svg
│  │      赞.svg
│  │
│  └─tarBar                              导航栏icon
│          头像_avatar.png
│          头像_avatar2.png
│          添加.png
│          添加2.png
│          评论.png
│          评论2.png
│          首页.png
│          首页2.png
│
├─store                                   状态管理
│      postStore.js
│
└─style                                   公共样式
        pageLayoutStyle.vue
````
重构微信小程序  
技术栈 uniapp socket  
取消使用pinia状态管理使用状态提升和使用响应式api reactive()进行简单的状态管理  
简化代码结构

github towel 目录结构

````
├─.vscode                       vscode配置文件
├─Next_towel_official_website   towel门户网站
├─React_towelClient             towel网站
├─README_static                 readme静态资源
├─RN_towelClient                towel移动端
├─towel_admin                   towel后台管理
├─towel_Server                  towel服务器
├─Uniapp_refactor_towelClient   towel小程序重构
├─uniapp_towelClient            towel小程序
├─Vue_towelClient               towel网站vue3版本
├─.gitignore                    git忽略文件
├─LICENSE                       开源协议
├─README.md                     readme
````