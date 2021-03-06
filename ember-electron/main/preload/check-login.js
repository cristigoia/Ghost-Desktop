'use strict';

/**
 * Simple timeout function checking for
 * a) failed login
 * b) successful loaded
 */
function checkStatus() {
    const err    = document.querySelector('p.main-error');
    const loaded = document.querySelector('a[title="New Post"]');

    if (err && ((err.childElementCount && err.childElementCount > 0) || (err.textContent && err.textContent.length > 0))) {
        // Noooo, login errors!
        console.log('login-error');
    } else if (loaded) {
        // Yay, successfully loaded - let's give the renderer 200 more ms
        // for rendering
        setTimeout(() => console.log('loaded'), 200);
    } else {
        setTimeout(checkStatus, 100);
    }
}

/**
 * We defer to the actual click on the login button
 * before we check whether or not the login actually
 * succeeded
 */
function init() {
    const element = document.querySelector('button.login');
    const $element = (window.$) ? window.$(element) : null;
    const clickHandler = () => {
        console.log('login-check-again');
        setTimeout(checkStatus, 100);
    };

    if ($element) {
        $element.off('click');
        $element.on('click', clickHandler);
    } else if (element) {
        element.removeEventListener('click', clickHandler);
        element.addEventListener('click', clickHandler);
    } else {
        setTimeout(init, 100);
    }
}

/**
 * Init
 */
setTimeout(init, 100);
