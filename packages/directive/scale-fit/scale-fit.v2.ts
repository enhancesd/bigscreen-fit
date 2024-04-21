import { DirectiveFunction, ref, watch, WatchStopHandle } from 'vue';
// @ts-ignore
import lodashMerge from 'lodash/merge';
import { ScaleFitOptions } from '../options';
import { defaultDesign, useBgsTransform } from 'packages/components/bigscreen-fit/src/bigscreen-fit';
import { useScreenResize } from 'packages/components/bs-config-provider/src/bs-config-provider';
import { BsConfigProviderInterface } from 'packages/components/bs-config-provider/src/types';


export function useScaleFitV2(options: ScaleFitOptions = {}): DirectiveFunction {
    options = lodashMerge({}, defaultDesign, options);
    const _tempProvider = ref<BsConfigProviderInterface>({
        isFullScreen: false,
        win: {
            innerHeight: 0,
            innerWidth: 0
        }
    });
    useScreenResize((win) => {
        _tempProvider.value!.win = win;
    });
    const bgsTransform = useBgsTransform(options, _tempProvider);

    function updateEl(el: HTMLElement) {
        el.style.setProperty('transform-origin', options.origin ?? '');
        el.style.setProperty('transform', `${bgsTransform.value.cssScale} ${options.cssTranslate}`);
        for (let key in bgsTransform.value.customClass) {
            if (bgsTransform.value.customClass.hasOwnProperty(key)) {
                const _value = Reflect.get(bgsTransform.value.customClass, key, false);
                if (_value) {
                    el.classList.add(key);
                } else if (el.classList.contains(key)) {
                    el.classList.remove(key);
                }
            }
        }
    }
    let watchStopHandle: WatchStopHandle | null = null;
    return function (el, binding, vnode, oldVnode) {
        updateEl(el);
        watchStopHandle?.();
        watchStopHandle = watch(() => bgsTransform.value, () => {
            updateEl(el);
        });
    }
}