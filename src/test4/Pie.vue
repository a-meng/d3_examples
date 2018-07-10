<template>
    <svg viewBox="0 0 100 100">
        <defs>
            <filter :id="'pie_f'+uid" x="-50" y="-50" width="150" height="150">
                <feGaussianBlur result="blur" in="SourceAlpha" stdDeviation="5"/>
                <feBlend in="SourceGraphic" out="blur"/>
            </filter>
        </defs>
        <g transform="translate(50,50)" @mouseout="hover=''">
            <path v-for="s in sector"
                  :fill="s.color"
                  @mouseover="hover=s.data.name"
                  :filter="s.filter"
                  :d="s.d"/>
        </g>
    </svg>
</template>

<script>
    import {pie, arc} from 'd3'

    let vPie = pie().value(d => d.value).sort(null);
    let vArc = arc().innerRadius(10);
    export default {
        //[{name,value}]
        props: ['data'],

        data() {
            return {
                //唯一id
                uid: Date.now() + '' + parseInt(Math.random() * 1000),
                // 一组默认颜色
                colors: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],
                hover: ''
            }
        },
        computed: {
            //绘制扇形路径
            sector() {
                let {data, colors, hover, uid} = this;

                let vdata = vPie(data).map((e, i) => {

                    if (e.data.name === hover) {
                        vArc.outerRadius(45);
                        e.filter = `url(#pie_f${uid})`;
                    } else {
                        vArc.outerRadius(42);
                        e.filter = 'none';
                    }
                    e.d = vArc(e);
                    e.color = colors[i];
                    return e;
                });
                //应为svg没有zindex 所以要把带阴影的放最后面一个元素
                vdata.sort((a, b) => {
                    if (a.data.name === hover) return 1;
                });

                return vdata;
            }
        },
        methods: {}
    }
</script>