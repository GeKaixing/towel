// src/LanguageContext.js
import React, { createContext, useContext, useState } from 'react';
// 定义上下文类型
interface LanguageContextType {
    language: string;
    switchLanguage: (lang: string) => void;
    t: (key: string) => string;
}
const defaultState={
    language: 'en',
    switchLanguage: () => {},
    t: (key: string) => key
}
// 语言资源
const resources = {
    zh: {
        home: "主页",
        ai: "llama",
        add: '发贴',
        post: '文章',
        message: '消息',
        blog: '博客',
        setting: '设置',
        followRecommend: '推荐关注',
        follow: '关注',
        more: "更多",
        hotHews: '今日头条',
        addposettitle: '标题,最多30个字哦',
        comment: '评论',
        send: '发表',
        reply: '回复',
        noReply: '展时没有回复哦',
        showReply: '显示回复',
        delete: '删除',
        intoPost: '进入文章',
        privateChat: '私聊',
        my: '我的',
        close: '关闭',
        report: '举报',
        register: "注册",
        login: "登陆",
        logout: '登出',
        signin: '登陆',
        name: '名字',
        password: '密码',
        background: '背景',
        auto: '跟随系统',
        dark: '晚上',
        white: '白天',
        authority: '权限',
        accountInformation: '账号信息',
        forgetPassword: '忘记密码',
        cancelAccount: '注销账号',
        orderForm: '订单',
        contactMe: '联系我',
        customerService: '客服',
        about: '关于',
        PostDeleted: '文章已删除',
        AccountDuplication: '账号重复',
        SendVerificationCode: '发送验证码',
        Verification: '验证码',
        EmailTheVerificationCode: '电子邮件发送验证码',
        Use_bing_Daily_wallpapers: '使用bing每日壁纸',
        uploading: "上传",
        Authority_to_notify: "通知权限",
        amend: '修改',
        email: "电子邮件",
        phonenumber: "手机号码",
        birthday: '生日',
        date_created: '创建日期',
        enter: '确认',
        nothing: "无",
        Cancellation_of_account_is_different: '注销账号不同逆',
        Please_enter_your_username_or_email_address: '请输入用户名或者电子邮件',
        minutes5: '您的验证码已经到达邮件,注意5分钟后过期',
        incorrect: '用户名或邮箱错误',
        submit: "提交",
        newPassword: "新密码",
        enterPassword: '确认密码',
        Language: 'Language'
    },
    en: {
        home: "home",
        ai: "llama",
        add: 'add post',
        post: 'post',
        message: 'message',
        blog: 'blog',
        setting: 'setting',
        followRecommend: 'Follow Recommend',
        follow: 'follow',
        more: "more",
        hotHews: 'hot Hews',
        addposettitle: 'The title can be up to 30 words',
        wordsMax: "10,000 words Max",
        comment: 'comment',
        send: 'send',
        reply: 'reply',
        showReply: 'show Reply',
        noReply: 'There is no reply to the display',
        delete: 'delete',
        intoPost: 'into post',
        privateChat: 'private chat',
        my: 'my',
        report: 'report',
        close: 'close',
        login: "login",
        register: "register",
        logout: 'logout',
        signin: 'signin',
        name: 'name',
        password: 'password',
        background: 'background',
        auto: 'auto',
        dark: 'dark',
        white: 'white',
        authority: 'authority',
        accountInformation: 'account information',
        forgetPassword: 'forget password',
        cancelAccount: 'cancel account',
        orderForm: 'order form',
        contactMe: 'contact me',
        customerService: 'customer service',
        about: 'about',
        PostDeleted: "Post deleted",
        AccountDuplication: 'Account duplication',
        SendVerificationCode: 'Send verification code',
        Verification: 'Verification',
        EmailTheVerificationCode: 'Email the verification code',
        Use_bing_Daily_wallpapers: 'Use bing Daily wallpapers',
        uploading: 'uploading',
        Authority_to_notify: 'Authority to notify',
        amend: 'amend',
        email: 'email',
        phonenumber: 'phonenumber',
        birthday: 'birthday',
        date_created: 'date created',
        enter: 'enter',
        nothing: 'none',
        Cancellation_of_account_is_different: 'Cancellation of account is different',
        Please_enter_your_username_or_email_address: 'Please enter your username or email address',
        minutes5: 'Your verification code has arrived in the email, note that it will expire in 5 minutes'
        , incorrect: 'The user name or email address is incorrect',
        submit: "submit",
        newPassword: 'new pawssword',
        enterPassword: 'enterPassword',
        Language: '语言'
    }
};

const LanguageContext = createContext<LanguageContextType >(defaultState);

export const useLanguage = () => {
    return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
    // 尝试从 localStorage 获取保存的语言，默认是 'en'
  const savedLanguage = localStorage.getItem('language') || 'en';
    const [language, setLanguage] = useState(savedLanguage);

    const switchLanguage = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, switchLanguage, t: (key) => resources[language][key] }}>
            {children}
        </LanguageContext.Provider>
    );
};
