export function cls(...args) {
    const classList = [];
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (typeof arg === 'string') {
            classList.push(arg);
        }
        else if (Array.isArray(arg)) {
            classList.push(cls(...arg));
        }
        else if (typeof arg === 'object') {
            for (let k in arg) {
                if (arg[k]) {
                    classList.push(k);
                }
            }
        }
    }
    return classList.join(' ').replace(/\s+/g, ' ').trim() || void 0;
}
export function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
export function debounce(fn, timeout) {
    let timer = 0;
    return function (...args) {
        clearTimeout(timer);
        return new Promise((resolve) => {
            timer = setTimeout(() => {
                resolve(fn.apply(this, args));
            }, timeout);
        });
    };
}
export function throttle(fn, timeout) {
    let timer = 0;
    return function (...args) {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            timer = 0;
        }, timeout);
        return fn.apply(this, args);
    };
}
