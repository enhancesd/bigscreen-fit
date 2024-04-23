import { DirectiveOptions, ref, watch, WatchStopHandle, VueConstructor } from 'vue';
// @ts-ignore
import lodashMerge from 'lodash/merge';
import { ScaleFitOptions } from '../options';
import { defaultDesign, useBgsTransform } from '../../components/bigscreen-fit/src/bigscreen-fit';
import { useScreenResize } from '../../components/bs-config-provider/src/bs-config-provider';
import { BsConfigProviderInterface } from '../../components/bs-config-provider/src/types';

export const directiveHooks = {
    bind: 'bind',
    inserted: 'inserted',
    update: 'update',
    componentUpdated: 'componentUpdated',
    unbind: 'unbind',
}
export function useScaleFitV2(_Vue: VueConstructor, options: ScaleFitOptions = {}): DirectiveOptions {
    options = lodashMerge({}, defaultDesign, options);
    const _tempProvider = ref<BsConfigProviderInterface>({
        isFullScreen: false,
        win: {
            innerHeight: innerHeight,
            innerWidth: innerWidth
        }
    });
    useScreenResize((win) => {
        _tempProvider.value!.win = win;
    });
    const bgsTransform = useBgsTransform(options, _tempProvider);

    function updateEl(el: HTMLElement) {
        el.style.setProperty('transform-origin', options.origin ?? 'center center');
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
    function restart(el: HTMLElement) {
        updateEl(el);
        watchStopHandle?.();
        watchStopHandle = watch(() => bgsTransform.value, () => {
            updateEl(el);
        });
    }
    return {
        [directiveHooks.bind]: restart,
        [directiveHooks.update]: restart,
        [directiveHooks.unbind]: function () {
            watchStopHandle?.();
        }
    }
}