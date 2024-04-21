<template>
    <div class="center_box">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
.center_box {
        width: 700px;
        height: 600px;
        flex: 1;
        background: url('~@/assets/5f4387ad5a1e01598261165341.png');
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        box-sizing: border-box;
        box-shadow: 10px 10px 100px 0px #6a99ff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>