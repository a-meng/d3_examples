<template>
    <div>
        <VPie class="my-pie" :data="vdata"/>
        <button @click="randomData">更新</button>
    </div>
</template>

<script>
    import VPie from './Pie.vue'

    export default {
        data() {
            return {
                vdata: []
            }
        },
        components: {VPie},
        methods: {
            randomData() {
                let len = parseInt(5 * Math.random() + 2);
                let arr = [];
                for (let i = 0; i < len; i++) {
                    arr.push({
                        name: '项目' + i,
                        value: 10 * Math.random()
                    })
                }
                this.vdata = Object.freeze(arr);
            }
        },
        created() {
            this.randomData()
        }
    }
</script>

<style>
    .my-pie {
        display: block;
        width: 400px;
        height: 400px;
        border: 1px solid gray;
        margin: 20px;
    }
</style>