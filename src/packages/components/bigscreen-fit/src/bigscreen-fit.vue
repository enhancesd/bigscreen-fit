<template>
    <div ref="bigscreenFitRef" class="bigscreen_fit" :class="customClass" :style="customProperty">
        <slot :customClass="customClass"></slot>
    </div>
</template>
<script lang="ts">
export interface PropsType {
    designWidth: number;
    designHeight: number;
    zoom?: number | ((isFullScreen: boolean) => number);
    id: string;
    push?: boolean;
    compress?: boolean | 'auto';
    origin?: string;
    customScale?: string | 'auto';
    zIndex: number;
    cssTranslate?: string;
}

import { Ref, computed, inject, onMounted, shallowRef, watch, defineComponent, PropType } from 'vue-demi';
import { BsConfigProviderInterface } from '../../bs-config-provider/src/types';
import { useDesignValue, useBgsTransform, defaultDesign } from './bigscreen-fit';

export default defineComponent({
    props: {
        designWidth: {
            type: Number as PropType<PropsType['designWidth']>,
            default: defaultDesign.width,
        },
        designHeight: {
            type: Number as PropType<PropsType['designHeight']>,
            default: defaultDesign.height,
        },
        zoom: {
            type: Number as PropType<PropsType['zoom']>,
            default: defaultDesign.zoom,
        },
        id: {
            type: String as PropType<PropsType['id']>,
            default: defaultDesign.id,
        },
        push: {
            type: Boolean as PropType<PropsType['push']>,
            default: defaultDesign.push,
        },
        origin: {
            type: String as PropType<PropsType['origin']>,
            default: defaultDesign.origin,
        },
        customScale: {
            type: String as PropType<PropsType['customScale']>,
            default: defaultDesign.customScale,
        },
        zIndex: {
            type: Number as PropType<PropsType['zIndex']>,
            default: defaultDesign.zIndex,
        },
        compress: {
            type: [Boolean, String] as PropType<PropsType['compress'] | boolean>,
            default: defaultDesign.compress,
        },
        cssTranslate: {
            type: String as PropType<PropsType['cssTranslate']>,
            default: defaultDesign.cssTranslate,
        },
    },
    setup(props) {
        const bigscreenFitRef = shallowRef();
        const oldParentElement = shallowRef();
        const bigscreenConfigProvid = inject(props.id, {
            value: {
                id: '',
                isFullScreen: false,
                win: {
                    innerHeight: innerHeight,
                    innerWidth: innerWidth
                },
            },
        });
        const bgsTransform = useBgsTransform(props, bigscreenConfigProvid as Ref<BsConfigProviderInterface>);

        const customProperty = computed(() => {
            return {
                '--design-width': useDesignValue(bgsTransform?.value?.fixRationWith?.(props.designWidth) ?? props.designWidth),
                '--design-height': useDesignValue(props.designHeight),
                '--bgs-fit-transform': bgsTransform.value.fitTransform,
                '--origin': props.origin,
                '--z-index': `${props.zIndex}`,
            }
        }) as any;

        const customClass = computed(() => {
            if (!bgsTransform?.value) return {}
            return {
                ...bgsTransform.value.customClass,
            }
        })

        function resetMoutedEl() {
            if (!bigscreenFitRef.value || !oldParentElement.value) {
                return;
            }
            const iscontains = oldParentElement.value?.contains?.(bigscreenFitRef.value);
            if (!iscontains) {
                oldParentElement.value.appendChild(bigscreenFitRef.value);
            }
        }

        function pushEffect() {
            const id = bigscreenConfigProvid?.value?.id;
            if (!props.push || !id || !bigscreenFitRef.value) {
                resetMoutedEl();
                return;
            }
            const bigscreenProvidElement = document.querySelector(`#${id}`);
            if (!bigscreenProvidElement) {
                return;
            }
            bigscreenProvidElement.appendChild(bigscreenFitRef.value);
        }
        onMounted(() => {
            oldParentElement.value = bigscreenFitRef.value.parentNode;
            pushEffect();
            watch(() => props.push, pushEffect);
        });

        return {
            bigscreenFitRef,
            customProperty,
            customClass,
        }
    }
});

</script>
<style lang="scss" scoped>
@import '../style/index.scss';
</style>