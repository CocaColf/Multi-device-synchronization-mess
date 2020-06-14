<template>
    <div>
        <van-tabs v-model="active">
            <van-tab title="全部">
                <div v-for="(item, index) in mealDataList" :key="index">
                    <one-meal :params="item" />
                </div>
            </van-tab>
            <van-tab title="拿手">拿手</van-tab>
        </van-tabs>
    </div>    
</template>

<script>
import OneMeal from './one_meal/index';

export default {
    components: {
        OneMeal
    },

    data () {
        return {
            active: 0,
            mealDataList: []
        }
    },

    mounted () {
        this.getAllMeal();
    },

    methods: {
        getAllMeal () {
            this.$axios.get('http://localhost:8091/upload-file/foodRecordList').then((respone) => {
                console.log(respone)
                this.mealDataList = respone.data.data;
            })
        }
    }
}
</script>

<style scoped>

</style>