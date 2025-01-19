/* eslint-disable */
import React, { useEffect } from 'react';
import { initSocket } from '../socket/socket';
import { SelectLightorDarkProvider } from './selectLightorDark.tsx';
import {
  useMessageResponseData,
  MessageResponseDataProvider,
} from './MessageResponseData.tsx';
import { PrivateChatProvider, usePrivateChatContext } from './privateChat.tsx';
import { NoReadNumbers, useNoReadNumbers } from './noReadNumbers.tsx';
import { LanguageProvider } from './LanguageContext';
import ConnectWallet from './ConnectWallet.tsx';
import AddPostContext from './AddPostContext.tsx';

export default function Context({ children }) {
  const { setNoReadNumber } = useNoReadNumbers();
  const { setPrivateChatData } = usePrivateChatContext() as { setPrivateChatData };
  const { setMessageResponseData } = useMessageResponseData();

  useEffect(() => {
    if (localStorage.getItem('loginData')) {
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
  }, []);
  return (
    <LanguageProvider>
      <PrivateChatProvider>
        <NoReadNumbers>
          <MessageResponseDataProvider>
            <SelectLightorDarkProvider>
              <ConnectWallet>
                <AddPostContext>
                  {children}
                </AddPostContext>
              </ConnectWallet>
            </SelectLightorDarkProvider>
          </MessageResponseDataProvider>
        </NoReadNumbers>
      </PrivateChatProvider>
    </LanguageProvider>
  );
}
