<template>
    <svg viewBox="0 0 100 100">
        <defs>
            <filter :id="'pie_f'+uid" x="-50" y="-50" width="150" height="150">
                <feGaussianBlur result="blur" in="SourceAlpha" stdDeviation="7"></feGaussianBlur>
                <feBlend in="SourceGraphic" out="blur"></feBlend>
            </filter>
        </defs>
        <g transform="translate(50,50)">
            <path v-for="s in sector"
                  @mouseover="onMouseover(s)"
                  :fill="s.color"
                  :d="vArc(s)"></path>

            <path v-if="hover"
                  :fill="hover.color"
                  :filter="`url(#pie_f${uid})`"
                  @mouseout="hover=null"
                  :d="vArc(hover)"></path>
        </g>
    </svg>
</template>

<script>
    import * as d3 from 'd3'

    window.d3 = d3;
    import {pie, arc, timer} from 'd3'


    let vPie = pie().value(d => d.value).sort(null);
    let vArc = arc().innerRadius(10);

    //一个动画工具方法
    function anim(duration, cb) {
        let d = duration * 1000;
        let t = timer(function (elapsed) {
            let progress = elapsed / d;
            cb(progress);
            if (progress >= 1) {
                t.stop();
            }
        })
    }


    export default {
        //[{name,value}]
        props: ['data'],

        data() {
            return {
                //唯一id
                uid: Date.now() + '' + parseInt(Math.random() * 1000),
                // 一组默认颜色
                colors: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],

                //高亮结点
                hover: null,
            }
        },
        computed: {
            //绘制图形基本数据
            sector() {
                let {data, colors, hover} = this;
                return vPie(data).map((e, i) => {
                    return {
                        name: e.data.name,
                        outerRadius: 42,
                        color: colors[i],
                        startAngle: e.startAngle,
                        endAngle: e.endAngle
                    }
                });
            }
        },
        watch: {
            hover(val) {
                if (val) {
                    let W = val.outerRadius;
                    let w = val.outerRadius * .08;
                    anim(.3, function (t) {
                        val.outerRadius = W + w * d3.easeExpOut(t);
                    });
                }
            }
        },
        methods: {
            vArc,
            onMouseover(s) {
                this.hover = JSON.parse(JSON.stringify(s));

            }
        }
    }
</script>