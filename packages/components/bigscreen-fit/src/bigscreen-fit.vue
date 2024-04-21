<template>
    <div ref="bigscreenFitRef" class="bigscreen_fit" :class="customClass" :style="customProperty">
        <slot :customClass="customClass"></slot>
    </div>
</template>
<script setup lang="ts">
export interface PropsType {
    designWidth?: number;
    designHeight?: number;
    zoom?: number | ((isFullScreen: boolean) => number);
    id?: string;
    push?: boolean;
    compress?: boolean | 'auto';
    origin?: string;
    customScale?: string | 'auto';
    zIndex?: number;
    cssTranslate?: string;
}

import { Ref, computed, inject, onMounted, shallowRef, watch } from 'vue-demi';
import { BsConfigProviderInterface } from '../../bs-config-provider/src/types';
import { useDesignValue, useBgsTransform, defaultDesign } from './bigscreen-fit';

const bigscreenFitRef = shallowRef();
const oldParentElement = shallowRef();
const props = withDefaults(defineProps<PropsType>(), {
    designWidth: defaultDesign.width,
    designHeight: defaultDesign.height,
    zoom: defaultDesign.zoom,
    id: defaultDesign.id,
    push: defaultDesign.push,
    origin: defaultDesign.origin,
    customScale: defaultDesign.customScale,
    zIndex: defaultDesign.zIndex,
    compress: defaultDesign.compress,
    cssTranslate: defaultDesign.cssTranslate,
});
const bigscreenConfigProvid = inject<Ref<BsConfigProviderInterface>>(props.id, {
    value: { isFullScreen: false, id: '', el: null,  },
} as Ref);

const bgsTransform = useBgsTransform(props, bigscreenConfigProvid);

const customProperty = computed(() => {
    return {
        '--design-width': useDesignValue(bgsTransform.value.fixRationWith(props.designWidth)),
        '--design-height': useDesignValue(props.designHeight),
        '--bgs-fit-transform': bgsTransform.value.fitTransform,
        '--origin': props.origin,
        '--z-index': props.zIndex,
    }
});

const customClass = computed(() => {
    return {
        ...bgsTransform.value.customClass,
    }
})

function resetMoutedEl() {
    if(!bigscreenFitRef.value || !oldParentElement.value) {
        return;
    }
    const iscontains = oldParentElement.value?.contains?.(bigscreenFitRef.value);
    if(!iscontains) {
        oldParentElement.value.appendChild(bigscreenFitRef.value);
    }
}

function pushEffect() {
    const id = bigscreenConfigProvid.value.id;
    if(!props.push || !id || !bigscreenFitRef.value) {
        resetMoutedEl();
        return;
    }
    const bigscreenProvidElement = document.querySelector(`#${id}`);
    if(!bigscreenProvidElement) {
        return;
    }
    bigscreenProvidElement.appendChild(bigscreenFitRef.value);
}
onMounted(() => {
    oldParentElement.value = bigscreenFitRef.value.parentNode;
    pushEffect();
    watch(() => props.push,pushEffect);
});

</script>
<style lang="scss" scoped>
@import '../style/index.scss';
</style>