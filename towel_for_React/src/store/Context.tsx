/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { initSocket } from '../socket/socket';
import { SelectLightorDarkProvider } from './selectLightorDark';
import {
  useMessageResponseData,
  MessageResponseDataProvider,
} from './MessageResponseData';
import { PrivateChatProvider, usePrivateChatContext } from './privateChat';
import { NoReadNumbers, useNoReadNumbers } from './noReadNumbers';
import { LanguageProvider } from './LanguageContext';
import ConnectWallet from './ConnectWallet';
import AddPostContext from './AddPostContext';

export default function Context({ children }) {
  const { setNoReadNumber } = useNoReadNumbers();
  const { setPrivateChatData } = usePrivateChatContext() as { setPrivateChatData };
  const { setMessageResponseData } = useMessageResponseData();
  const [loginData, setLoginData] = useState(localStorage.getItem('loginData'));

  useEffect(() => {
    const handleStorageChange = () => {
      setLoginData(localStorage.getItem('loginData'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if(localStorage.getItem('loginData')===null)return;
    if (localStorage.getItem('loginData') !== '{}') {
      const localStorageDatas = JSON.parse(localStorage.getItem('loginData') as string);
      let socket = initSocket(localStorageDatas.userid);
      socket.on(`${localStorageDatas.userid}`, data => {
        setMessageResponseData(data.datas);
        const filterData = data.datas.filter(a => a.read === false);
        setNoReadNumber(filterData.length);
      });
      socket.on(`sendMsg`, data => {
        setPrivateChatData(prevChatData => [...prevChatData, data]);
      });
    }
  }, [loginData]);
  return (
    <LanguageProvider>
      <PrivateChatProvider>
        <NoReadNumbers>
          <MessageResponseDataProvider>
            <SelectLightorDarkProvider>
              {/* <ConnectWallet> */}
              <AddPostContext>
                {children}
              </AddPostContext>
              {/* </ConnectWallet> */}
            </SelectLightorDarkProvider>
          </MessageResponseDataProvider>
        </NoReadNumbers>
      </PrivateChatProvider>
    </LanguageProvider>
  );
}
