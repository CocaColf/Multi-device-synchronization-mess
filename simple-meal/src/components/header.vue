<template>
    <div class="simple-meal-header">
        <div class="title">
            <span>朴素一餐</span>
        </div>

        <div class="simple-meal-create">
            <van-icon name="plus" />
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .simple-meal-header {
        width: 100%;
        height: 32px;
        display: flex;
        align-items: center;
    }
    .title {
        margin-left: 12px;
    }
    .simple-meal-create {
        margin-right: 12px;
        position: absolute;
        right: 0;
        line-height: 32px;
        font-size: 16px;
    }
</style>