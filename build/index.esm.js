'use client';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

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

var DinoGameInternal = function () {
    var _a = useState(false), mounted = _a[0], setMounted = _a[1];
    var dinoRef = useRef(null);
    var cactusRef = useRef(null);
    var _b = useState(0), score = _b[0], setScore = _b[1];
    var _c = useState(false), isJumping = _c[0], setIsJumping = _c[1];
    var gameOver = false;
    // Jump Logic
    var jump = function () {
        if (isJumping || gameOver)
            return;
        setIsJumping(true);
        var pos = 0;
        var upInterval = setInterval(function () {
            if (pos >= 90) {
                clearInterval(upInterval);
                var downInterval_1 = setInterval(function () {
                    if (pos <= 0) {
                        clearInterval(downInterval_1);
                        setIsJumping(false);
                    }
                    else {
                        pos -= 4;
                        if (dinoRef.current)
                            dinoRef.current.style.bottom = "".concat(pos, "px");
                    }
                }, 25);
            }
            else {
                pos += 4;
                if (dinoRef.current)
                    dinoRef.current.style.bottom = "".concat(pos, "px");
            }
        }, 20);
    };
    // Handle mounting and key listener
    useEffect(function () {
        setMounted(true);
        var handleKey = function (e) {
            if (e.code === 'Space' || e.code === 'ArrowUp')
                jump();
        };
        window.addEventListener('keydown', handleKey);
        return function () { return window.removeEventListener('keydown', handleKey); };
    }, [isJumping, gameOver]);
    // Collision + Score Logic
    useEffect(function () {
        var interval = setInterval(function () {
            if (dinoRef.current && cactusRef.current) {
                var dinoRect = dinoRef.current.getBoundingClientRect();
                var cactusRect = cactusRef.current.getBoundingClientRect();
                if (cactusRect.left < dinoRect.right &&
                    cactusRect.right > dinoRect.left &&
                    cactusRect.bottom > dinoRect.top) ;
                else {
                    setScore(function (prev) { return prev + 1; });
                }
            }
        }, 100);
        return function () { return clearInterval(interval); };
    }, [gameOver, score]);
    if (!mounted) {
        return jsx("div", { className: "game", style: { visibility: 'hidden' } });
    }
    return (jsxs("div", __assign({ className: "game" }, { children: [jsxs("div", __assign({ className: "mountains" }, { children: [jsx("div", { className: "mountain mountain1" }), jsx("div", { className: "mountain mountain2" })] })), jsx("div", __assign({ className: "bumpy-wrapper" }, { children: jsx("svg", __assign({ className: "bumpy-svg", viewBox: "0 0 600 100", preserveAspectRatio: "none" }, { children: jsx("path", { className: "bumpy-path", d: "M0,100 \n         L0,80 \n         Q30,60 60,80 \n         Q90,40 120,80 \n         Q150,60 180,70 \n         Q210,30 240,80 \n         Q270,50 300,70 \n         Q330,40 360,80 \n         Q390,60 420,70 \n         Q450,50 480,80 \n         Q510,60 540,70 \n         Q570,55 600,80 \n         L600,100 Z" }) })) })), jsx("div", { className: "tree tree1" }), jsx("div", { className: "tree tree2" }), jsx("div", { className: "tree tree3" }), jsx("div", { className: "cloud cloud1" }), jsx("div", { className: "cloud cloud2" }), jsx("div", { className: "ground" }), jsx("div", __assign({ ref: dinoRef, className: "dino" }, { children: jsx("img", { style: { width: '100%' }, src: "https://img.itch.zone/aW1hZ2UvNTA5MzIwLzI2NDIzNTEucG5n/347x500/kwmG6Z.png" }) })), jsx("div", __assign({ ref: cactusRef, className: "cactus" }, { children: jsx("img", { style: { width: '100%' }, src: "https://img.itch.zone/aW1hZ2UvNTA5MzIwLzI2NDIzNTcucG5n/347x500/%2FqbQKf.png" }) })), jsxs("div", __assign({ className: "score" }, { children: ["Score: ", score] }))] })));
};

export { DinoGameInternal as default };
//# sourceMappingURL=index.esm.js.map
