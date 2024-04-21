<template>
   <div class="bs-config-provider" :id="id">
    <slot></slot>
   </div>
</template>
<script setup lang="ts">
import { onUnmounted, provide, ref } from 'vue-demi';
import { BsConfigProviderInterface } from './types';
import { onFullScreenChange, enterFullScreen, exitFullScreen, isFullScreen } from 'packages/share';

export interface PropsType {
    id?: string,
}
const props = withDefaults(defineProps<PropsType>(), {
    id: 'bigscreen-config-provid',
});

const configProvider = ref<BsConfigProviderInterface>({
    isFullScreen: false,
    ...(props),
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
})
</script>
<style lang="scss">
html {
    width: 100vw;
    height: 100vh;
}
</style>
<style lang="scss" scoped>
@import '../style/index.scss';
</style>