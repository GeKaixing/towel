import React, { useEffect, useState } from 'react';
import Backtab from '../../../../components/Backtab';
import Dot from '../../../../components/Dot';
export default function SettingAuth() {
  const [auth, setAuth] = useState(false);

  const checkNotificationPermission = () => {
    Notification.requestPermission().then((result) => {
      setAuth(result === "granted");
    });
  };

  useEffect(() => {
    checkNotificationPermission();
  }, []);
  useEffect(() => {
    console.log(auth);
  }, [auth]); // 在 auth 更新后输出其值

  return (
    <>
      <Backtab text="设置" href="/setting" />
      <div className="flex flex-col items-start text-[--fontColor] absolute left-1/2 -translate-x-1/2 mt-2">
        <div className='flex flex-row items-center'>
          <p className='mr-2'>通知权限</p>
          {auth && <Dot />}
        </div>
      </div>
    </>
  );
}