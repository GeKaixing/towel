import React from 'react';
import Backtab from '../../../components/Backtab';
import { useLanguage } from '../../../store/LanguageContext';

export default function Contactme() {
  const { t } = useLanguage();
  return (
    <>
      <Backtab text={t('setting')} href="/setting"></Backtab>
      <div className="flex justify-center items-center">
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=x2890901420@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className='text-[--fontColor] underline'
        >
          x2890901420@gmail.com
        </a>
      </div>
    </>
  );
}
