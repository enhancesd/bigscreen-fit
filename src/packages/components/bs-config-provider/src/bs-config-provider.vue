<template>
    <div class="bs-config-provider" :id="id">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent, onUnmounted, provide, ref, PropType } from 'vue-demi';
import { BsConfigProviderInterface } from './types';
import { onFullScreenChange, enterFullScreen, exitFullScreen, isFullScreen } from '../../../share';
import { useScreenResize } from './bs-config-provider';

export interface PropsType {
    id: string,
}
export default defineComponent({
    props: {
        id: {
            type: String as PropType<PropsType['id']>,
            default: 'bigscreen-config-provid',
        }
    },
    setup(props) {
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
            if (e.key === 'F11') {
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

        return {
            updateWinOption,
        }
    }
});
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