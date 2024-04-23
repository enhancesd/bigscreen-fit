<template>
   <div class="bs-config-provider" :id="id">
    <slot></slot>
   </div>
</template>
<script setup lang="ts">
import { onUnmounted, provide, ref } from 'vue';
import { BsConfigProviderInterface } from './types';
import { onFullScreenChange, enterFullScreen, exitFullScreen, isFullScreen } from '../../../share';
import { useScreenResize } from './bs-config-provider';

export interface PropsType {
    id?: string,
}
const props = withDefaults(defineProps<PropsType>(), {
    id: 'bigscreen-config-provid',
});

const configProvider = ref<BsConfigProviderInterface>({
    isFullScreen: isFullScreen(),
    ...(props),
    win: {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth
    },
});

const { updateWinOption } = useScreenResize((win) => {
    configProvider.value.win = win;
});

provide(props.id, configProvider);


function keyupHan(e: KeyboardEvent) {
    if(e.key === 'F11') {
        !configProvider.value.isFullScreen ? enterFullScreen() : exitFullScreen();
    }
}
onFullScreenChange((is) => {
    configProvider.value.isFullScreen = is;
});
window.addEventListener('keyup', keyupHan);
onUnmounted(() => {
    window.removeEventListener('keyup', keyupHan);
});

defineExpose({
    updateWinOption,
});
</script>
<style lang="scss">
html {
    width: 100vw;
    height: 100vh;
}
</style>