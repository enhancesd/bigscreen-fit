import { ref, nextTick } from 'vue-demi';
// @ts-ignore
import debounce from 'lodash/debounce';
import { WinType } from './types';

export function useScreenResize(callback?: (win: WinType) => void) {
    const win = ref<WinType>({
        innerWidth:  window.innerWidth,
        innerHeight:  window.innerHeight,
    })
    function updateWinOption() {
        win.value.innerWidth = window.innerWidth;
        win.value.innerHeight = window.innerHeight;
        callback?.(win.value);
    }
    const debounceUpdate = debounce(() => {
        nextTick(updateWinOption)
    }, 300);
    window.addEventListener('resize', debounceUpdate);
    updateWinOption();
    return {
        win,
        updateWinOption,
    };
}