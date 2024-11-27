import React from 'react';
import Backtab from '../../../components/Backtab';

export default function Contactme() {
  return (
    <>
      <Backtab text="设置" href="/setting"></Backtab>
      <div className="flex justify-center items-center">
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=x2890901420@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          x2890901420@gmail.com
        </a>
      </div>
    </>
  );
}
