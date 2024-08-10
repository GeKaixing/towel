### js节流和防抖函数
#### 节流函数/throttling
   * 以一定时间执行，在一秒中不管点击多少次button只有一秒后会执行
   * 应有场景：window对象的resize、scroll事件，拖拽时的mousemove事件，网络请求等
   * 第一个参数是要执行的函数，第二个参数要执行函数的间隔
```js
 function th(fn, delay) {
        let lasttime = 0;
        return function (...args) {
            const nowtime = new Date()
            if (nowtime - lasttime > delay) {
                console.log('当前时间' + nowtime);
                console.log('当前时间-旧时间', nowtime - lasttime);
                fn.call(this, args)
                lasttime = nowtime;
            }
        }
    }
    const dd = th(test, 1000)
    function test() {
        console.log('hello world');
    }
    document.querySelector('button').addEventListener('click', () => {
        dd()
    })
```
#### 防抖函数/debouncing
   * 以一定时间内点击button都会从重新计时，计时结束后才开始执行函数，在计时期间点击了button将重新计算
   * 应有场景：文字输入、自动完成的keyup事件，窗口大小等
   * 第一个参数是要执行的函数，第二个参数要执行函数的间隔
```js
 function de(fn, delay) {
        let time;
        return function (...args) {
            clearTimeout(time)
            time = setTimeout(() => {
                fn.call(this, args)
            }, delay);
        }
    }
    function fn() { console.log('防抖函数执行了'); }
    const ff = de(fn, 1000)
    document.querySelector('button').addEventListener('click', () => {
        ff()
    })
```