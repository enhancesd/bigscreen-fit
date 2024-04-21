import { Ref, computed, ref, nextTick } from "vue-demi";
import { PropsType } from './bigscreen-fit.vue';
// @ts-ignore
import debounce from 'lodash/debounce';
import { BsConfigProviderInterface } from '../../bs-config-provider/src/types';


export const defaultDesign = {
    width: 1920,
    height: 1080,
    zoom: 1,
}

interface WinType {
    innerHeight: number;
    innerWidth: number;
}
export function useScreenResize() {
    const win = ref<WinType>({
        innerWidth: 1920,
        innerHeight: 1080,
    })
    function updateWinOption() {
        win.value.innerWidth = window.innerWidth;
        win.value.innerHeight = window.innerHeight;

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

/**
 * 
 * @param {string|number} val 
 * @param unit 
 * @returns 
 */
export function useDesignValue(val: string | number, unit = 'px') {
    return typeof val === 'number' ? `${val}${unit}` : val;
}

export function useBgsTransform<
    T extends PropsType,
    W extends Ref<WinType>,
    P extends Ref<BsConfigProviderInterface>
>(props: T, win: W, bigscreenConfigProvid: P) {
    return computed(() => {
        const x = win.value.innerWidth / (props.designWidth ?? defaultDesign.width);
        const y = win.value.innerHeight / (props.designHeight ?? defaultDesign.height);
        const _isFullScreen = bigscreenConfigProvid.value.isFullScreen;
        const _zoom = typeof props.zoom === 'function' ? props.zoom(_isFullScreen) : (props.zoom ?? defaultDesign.zoom);
        const _isCompress = props.compress === 'auto' ? !props.push : props.compress; // 是否压缩
        const _scales = props.push ? [x * _zoom, y * _zoom] : [x, y];
        const scale = _isCompress ? _scales.join(',') : Math.min.apply(Math, _scales);

        const _tempScale = props.customScale === 'auto' ? `scale(${scale})` : `scale(${props.customScale})`;
        const fitTransform = `${_tempScale} translate(-50%, -50%)`;
        const customClass = {
            'bs-no-compress': !_isCompress,
            'bs-compress': _isCompress && !_isFullScreen,
            'bs-fullscreen': _isFullScreen,
            'bs-no-fullscreen': !_isFullScreen,
        };
        function fixRationWith(width: number | string) {
            let [x, y] = _scales;
            if (_isFullScreen || _isCompress || x < y) {
                return width;
            }
            width = typeof width === 'string' ? parseFloat(width) : width;
            return width * (x / y);
        }
        return {
            fitTransform,
            customClass,
            _isCompress,
            fixRationWith,
        }

    })


}