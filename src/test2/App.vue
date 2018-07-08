<template>
    <div>
        <svg viewBox="0 0 120 100">
            <defs>
                <filter id="filter1" x="-50" y="-50" width="150" height="150">
                    <feGaussianBlur result="blur" in="SourceAlpha" stdDeviation="4"/>
                    <feBlend in="SourceGraphic" out="blur"/>
                </filter>
            </defs>
            <g transform="translate(60 50)">
                <path v-for="node in vnodes"
                      :d="node.d"
                      :fill="node.color"
                      @mouseover="onMouseover($event,node)"
                      @mouseout="onMouseout($event,node)"
                />
            </g>
            <g transform="translate(60 50)">
                <text font-size="3"
                      v-for="node in vnodes"
                      :x="node.endPoint[0]"
                      :y="node.endPoint[1]"
                      dy="1"
                      :text-anchor="node.endPoint[0]>0?'start':'end'"
                >
                    {{node.data.name}}
                </text>
            </g>
            <g transform="translate(60 50)">
                <polyline v-for="node in vnodes"
                          stroke-width=".2"
                          stroke="black"
                          fill="none"
                          :points="node.points"/>
            </g>
        </svg>
        <button @click="updateData">更新数据</button>
        <pre>
            知识点：
            1. d3.interpolateRgb  #颜色差值器
            2. d3.pie             #饼图角度计算器
            3. d3.arc             #弧形生成器
        </pre>
    </div>
</template>

<script>
    import * as d3 from 'd3'

    let interpolate = d3.interpolateRgb('yellow', 'red');//颜色插值器

    export default {
        data() {
            return {
                vdata: [],
            }
        },
        computed: {
            vnodes() {
                //生成角度列表
                let nodes = d3.pie()
                    .value(d => d.value)(this.vdata);
                let max = Math.max(...this.vdata.map(e => e.value));
                nodes.forEach(e => {
                    let {startAngle, endAngle} = e;
                    let arc = d3.arc()
                        .startAngle(startAngle)
                        .endAngle(endAngle)
                        .innerRadius(5)
                        .outerRadius(40);
                    //生成扇形路径
                    e.d = arc();
                    e.innerRadius = 5;
                    e.outerRadius = 40;
                    e.value = ((endAngle - startAngle) / (2 * Math.PI));
                    //生成颜色
                    e.color = interpolate(e.data.value / max);

                    //生成折线路径
                    let midAngle = startAngle + (endAngle - startAngle) / 2;
                    let innerCenter = arc.centroid();
                    let outerCenter = arc.innerRadius(40).outerRadius(50).centroid();

                    let endPoint = [outerCenter[0] > 0 ? 45 : -45, outerCenter[1]];
                    e.endPoint = endPoint;
                    e.points = `${innerCenter},${outerCenter},${endPoint}`
                });
                return nodes;
            }
        },
        methods: {
            onMouseover(e, node) {
                let d = d3.arc()({
                    ...node,
                    outerRadius: node.outerRadius * 1.1
                });
                e.target.setAttribute('d', d);
                e.target.setAttribute('filter', 'url(#filter1)');
                e.target.parentNode.append(e.target)
            },
            onMouseout(e, node) {
                let d = d3.arc()(node);
                e.target.setAttribute('d', d);
                e.target.setAttribute('filter', '');
            },
            //构造数据
            updateData() {
                let arr = [];
                let len = parseInt(10 * Math.random()) + 3;
                for (let i = 1; i < len; i++) {
                    arr.push({
                        name: '项目' + i,
                        value: parseInt(100 * Math.random() + 10)
                    })
                }
                this.vdata = arr;
            }
        },
        mounted() {
            this.updateData();
        }
    }
</script>

<style scoped>
    svg {
        display: block;
        width: 600px;
        height: 500px;
        border: 1px solid gray;
        margin: 50px auto;
    }
</style>