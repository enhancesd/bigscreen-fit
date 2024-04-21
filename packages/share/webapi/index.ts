import ResizeObserver from 'resize-observer-polyfill';
import debounce from 'lodash/debounce';

export function usResizeObjserver(el: Element, callback: (val: any) => void) {
    const update = debounce(callback, 200);
    const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
            update?.(entry);
        }
    });
    ro.observe(el);
}

// 进入全屏
export function enterFullScreen() {
    try {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
    } catch (err) {
        console.log(err);
    }
}

// 退出全屏
export function exitFullScreen() {
    try {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    } catch (err) {
        console.log(err)
    }
}

// 判断是否全屏

export function isFullScreen() {
    return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}

export function onFullScreenChange(callback: (isFullScreen: boolean) => void) {
    function han() {
        if (isFullScreen()) {
            console.log('页面已进入全屏模式');
            callback?.(true);
        } else {
            console.log('页面已退出全屏模式');
            callback?.(false);
        }
    }
    // 监听全屏状态变化
    document.addEventListener('fullscreenchange', han);
    return function () {
        document.removeEventListener('fullscreenchange', han);
    }
}