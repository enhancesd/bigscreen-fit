<template>
    <div class="demo_box left">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
.demo_box {
        width: 600px;
        flex: 1;
        background: url('~@/assets/1712837989168.jpg');
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        box-sizing: border-box;
    }
</style>