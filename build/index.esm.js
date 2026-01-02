'use client';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".game{background:#fff;.dino{height:50px;left:50px}.cactus,.dino{bottom:0;position:absolute;width:50px}.cactus{animation:moveCactus 2s linear infinite;left:600px}.score{font-weight:700;left:10px;position:absolute;top:10px}@keyframes moveCactus{0%{left:600px}to{left:-20px}}}.game{background:#cceffc;border:2px solid #333;height:200px;margin:100px auto;overflow:hidden;position:relative;width:600px}.ground{bottom:0;position:absolute;width:100%}.cloud{animation:moveCloud 30s linear infinite;background:#fff;border-radius:50px;height:40px;opacity:.7;position:absolute;width:80px}.cloud:after,.cloud:before{background:#fff;border-radius:50%;content:\"\";position:absolute}.cloud:before{height:40px;left:10px;top:-10px;width:40px}.cloud:after{height:30px;left:40px;top:0;width:30px}.cloud1{animation-delay:0s;left:100%;top:20px}.cloud2{animation-delay:10s;left:150%;top:60px}@keyframes moveCloud{0%{left:100%}to{left:-100px}}.mountains{pointer-events:none;width:100%}.mountain,.mountains{bottom:0;height:100px;position:absolute}.mountain{background:#99b3cc;clip-path:polygon(50% 0,0 100%,100% 100%);opacity:.8;width:120px}.mountain1{background:#89aacc;height:90px;left:100px;width:120px}.mountain2{background:#79b;height:50px;left:300px;width:50px}.tree{animation:moveTree 12s linear infinite;background:#3e6131;bottom:0;height:20px;position:absolute;width:10px;z-index:0}.tree:before{background:#4caf50;border-radius:50%;bottom:15px;content:\"\";height:25px;left:-10px;position:absolute;width:30px;z-index:-1}.tree1{animation-delay:0s;left:50%}.tree2{animation-delay:5s;left:100%}.tree3{animation-delay:10s;left:150%}@keyframes moveTree{0%{left:100%}to{left:-40px}}.bumpy-wrapper{bottom:0;height:20px;overflow:hidden;position:absolute;width:100%}.bumpy-svg{animation:moveBumps 10s linear infinite;height:100%;position:absolute;width:200%}.bumpy-path{fill:#888}@keyframes moveBumps{0%{transform:translateX(0)}to{transform:translateX(-50%)}}";
styleInject(css_248z);

const DinoGameInternal = () => {
    const [mounted, setMounted] = useState(false);
    const dinoRef = useRef(null);
    const cactusRef = useRef(null);
    const [score, setScore] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    // Jump Logic
    const jump = () => {
        if (isJumping)
            return;
        setIsJumping(true);
        let pos = 0;
        const upInterval = setInterval(() => {
            if (pos >= 90) {
                clearInterval(upInterval);
                const downInterval = setInterval(() => {
                    if (pos <= 0) {
                        clearInterval(downInterval);
                        setIsJumping(false);
                    }
                    else {
                        pos -= 4;
                        if (dinoRef.current)
                            dinoRef.current.style.bottom = `${pos}px`;
                    }
                }, 25);
            }
            else {
                pos += 4;
                if (dinoRef.current)
                    dinoRef.current.style.bottom = `${pos}px`;
            }
        }, 20);
    };
    // Handle mounting and key listener
    useEffect(() => {
        setMounted(true);
        const handleKey = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp')
                jump();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isJumping]);
    // Collision + Score Logic
    useEffect(() => {
        const interval = setInterval(() => {
            if (dinoRef.current && cactusRef.current) {
                const dinoRect = dinoRef.current.getBoundingClientRect();
                const cactusRect = cactusRef.current.getBoundingClientRect();
                if (cactusRect.left < dinoRect.right &&
                    cactusRect.right > dinoRect.left &&
                    cactusRect.bottom > dinoRect.top) ;
                else {
                    setScore((prev) => prev + 1);
                }
            }
        }, 100);
        return () => clearInterval(interval);
    }, [score]);
    if (!mounted) {
        return jsx("div", { className: "game", style: { visibility: 'hidden' } });
    }
    return (jsxs("div", Object.assign({ className: "game" }, { children: [jsxs("div", Object.assign({ className: "mountains" }, { children: [jsx("div", { className: "mountain mountain1" }), jsx("div", { className: "mountain mountain2" })] })), jsx("div", Object.assign({ className: "bumpy-wrapper" }, { children: jsx("svg", Object.assign({ className: "bumpy-svg", viewBox: "0 0 600 100", preserveAspectRatio: "none" }, { children: jsx("path", { className: "bumpy-path", d: "M0,100 \n         L0,80 \n         Q30,60 60,80 \n         Q90,40 120,80 \n         Q150,60 180,70 \n         Q210,30 240,80 \n         Q270,50 300,70 \n         Q330,40 360,80 \n         Q390,60 420,70 \n         Q450,50 480,80 \n         Q510,60 540,70 \n         Q570,55 600,80 \n         L600,100 Z" }) })) })), jsx("div", { className: "tree tree1" }), jsx("div", { className: "tree tree2" }), jsx("div", { className: "tree tree3" }), jsx("div", { className: "cloud cloud1" }), jsx("div", { className: "cloud cloud2" }), jsx("div", { className: "ground" }), jsx("div", Object.assign({ ref: dinoRef, className: "dino" }, { children: jsx("img", { style: { width: '100%' }, src: "https://img.itch.zone/aW1hZ2UvNTA5MzIwLzI2NDIzNTEucG5n/347x500/kwmG6Z.png", alt: "Dino character" }) })), jsx("div", Object.assign({ ref: cactusRef, className: "cactus" }, { children: jsx("img", { style: { width: '100%' }, src: "https://img.itch.zone/aW1hZ2UvNTA5MzIwLzI2NDIzNTcucG5n/347x500/%2FqbQKf.png", alt: "Cactus obstacle" }) })), jsxs("div", Object.assign({ className: "score" }, { children: ["Score: ", score] }))] })));
};

export { DinoGameInternal as default };
//# sourceMappingURL=index.esm.js.map
