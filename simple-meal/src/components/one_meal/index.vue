<template>
    <div class="one-meal">
        <div>
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" />
            </van-swipe-item>
        </div>

        <p>{{ params.foodDesc }}</p>

        <div style="font-size: 14px;
    color: blue;">
            <span>删除</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        params: {
            type: Object,
            default ()  {
                return {};
            }
        }
    },

    computed: {
        images () {
            let curList = [];
            let prefix = 'http://localhost:8091/'
            this.params.picList.forEach(item => {
                curList.push(`${prefix}${item.path}`);
            });
            console.log(curList)
            return [
                'http://localhost:8091/public/uploads/test5.040755218766757.png',
                'http://localhost:8091/public/uploads/test5.040755218766757.png'
            ];
        },

        _id () {
            return this.params._id;
        }
    }
}
</script>

<style scoped>
.one-meal {
    margin-top: 24px;
}
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
</style>