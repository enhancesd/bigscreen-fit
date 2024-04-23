<template>
    <div class="app">
        <BsConfigProvider>
            <BigScreenFit>
                <template v-slot:default="{ customClass }">
                <div class="container">
                    <BigScreenFit :z-index="2" :push="headPush" :custom-scale="headPush ? 'auto' : '1'">
                        <div class="header">
                                <div class="header__text">
                                    <button @click="headPush=!headPush">
                                        {{ headPush ? '已优化': '点击优化头部压缩' }}  {{ customClass }}
                                    </button>
                                </div>
                        </div>
                    </BigScreenFit>
                    <BigScreenFit :push="push" :custom-scale="push ? 'auto' : '1'">
                        <template v-slot:default="{ customClass }">
                            <div class="left_container flex-box">
                            
                                    <DemoBox :class="customClass">
                                        <button @click="push=!push">
                                        {{ push ? '已优化': '点击优化压缩' }}
                                        </button>
                                    </DemoBox>
                                    <DemoBox :class="customClass">
                                        <button @click="push=!push">
                                        {{ push ? '已优化': '点击优化压缩' }}
                                        </button>
                                    </DemoBox>
                                    <DemoBox :class="customClass">
                                        <button @click="push=!push">
                                        {{ push ? '已优化': '点击优化压缩' }}
                                        </button>
                                    </DemoBox>
                                    <DemoBox :class="customClass">
                                        <button @click="push=!push">
                                        {{ push ? '已优化': '点击优化压缩' }}
                                        </button>
                                    </DemoBox>
                            
                            </div>
                            <BigScreenFit :push="true">
                                <CenterBox></CenterBox>
                            </BigScreenFit>
                            <div class="right_container flex-box">
                                    <DemoBox :class="customClass">
                                        <button @click="push=!push">
                                        {{ push ? '已优化': '点击优化压缩' }}
                                        </button>
                                    </DemoBox>
                                    <DemoBox :class="customClass">
                                        <button @click="push=!push">
                                        {{ push ? '已优化': '点击优化压缩' }}
                                        </button>
                                    </DemoBox>
                                    <DemoBox :class="customClass">
                                        <button @click="push=!push">
                                        {{ push ? '已优化': '点击优化压缩' }}
                                        </button>
                                    </DemoBox>
                                    <DemoBox :class="customClass">
                                        <button @click="push=!push">
                                        {{ push ? '已优化': '点击优化压缩' }}
                                        </button>
                                    </DemoBox>
                            
                            </div>
                        </template>
                    </BigScreenFit>
                </div>
            </template>
            </BigScreenFit>
        </BsConfigProvider>
        <div class="dialog" v-scale-fit>
            <p>这是一个APP模态对话框。使用了v-scale-fit指令</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import DemoBox from './comp/demo_box.vue';
import CenterBox from './comp/center.vue';

import { ref } from 'vue-demi';
const push = ref(true);
const headPush = ref(true);
</script>
<style lang="scss">
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>
<style lang="scss" scoped>
.container {
    background: url('~@/assets/bg.png');
    background-size: 100% 100%;
    width: 100%;
    height:1080px;
    display: flex;
    justify-content: space-between;
}

.dialog {
    position: absolute;
    width: 200px;
    height: 100px;
    background: #fff;
    z-index: 99;
    left: 50%;
    top: 50%;
    padding: 10px;
    border-radius: 5px;
}
.left_container {
    position: absolute;
    left: 20px;
   
}
.header {
    width: 100%;
    height: 85px;
    border: 1px solid #fff;
    margin: 3px;
}
.header__text {
    height: 85px;
    display: flex;
    justify-content: center;
    align-items: center;
  
    button {
        font-size: 18px;
        font-weight: 600;
    }
}
.flex-box {
    width: 600px;
    height: calc(1080px - 110px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
    box-sizing: border-box;
    padding: 20px 0;
    margin-top: 110px;
    border: 1px solid #fff;
}
.right_container {
    position: absolute;
    right: 20px;
}
</style>