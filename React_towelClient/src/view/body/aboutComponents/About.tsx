import React from 'react'
import aboutMd from "../../../assets/about/about.md"
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Backtab from '../../../components/Backtab';
export default function About() {
  return (
    <>
      <Backtab text="设置" href="/setting"></Backtab> 
        <div className='flex  px-2 py-2 text-[--fontColor] w-full'>
        <div className='prose lg:prose-xl max-w-none text-wrap ' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(aboutMd)as string) }} ></div>
       {/*  <div>
          <span>卡普空</span>
          <ul>
            <li>鬼泣5 E0110D3FC68AD66CFA4851B86A6F05AC274E3DDD</li>
            <li>生化危机0 ED52B20E2ED3661EB009E09301D2E55EB75A74D0</li>
            <li>生化危机1 04BAF4E12CAA20CCC369780D3AC1786835EC59FE</li>
            <li>生化危机2 3D79012CDEEF1C569E4CE56401B441C3BE9A94EC</li>
            <li>生化危机3 1D6BBB5A98A3F784F8783F7E005BE35B23D02AB2</li>
            <li>生化危机4 A87B44761A1C801D99E26BD8723E9D3732BA08D8</li>
            <li>生化危机5 83C0E864455C0A02B9E9C4AECACBE8D6D2F010F9</li>
            <li>生化危机6 DBDDEBFA0114D85FF30D02307E4A523AAA6F05FF</li>
            <li>生化危机7 6C9223CA62B7E7365C2814B486301D2B96060C0B</li>
            <li>生化危机8 E5A28183E497ADB62FAAE00CF8A180A5F070CF62</li>
            <li>街头霸王</li>
          </ul>
        </div> */}
    </div>
    </>

  )
}
