<template>
    <div>
        <strong>svg基础</strong>
        <svg xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink">

            <g transform="translate(10 10)">
                <rect x="0" y="0" width="50%" height="25" stroke="green" fill="none"></rect>
                <text x="25%" y="20">矩形</text>
            </g>

            <g transform="translate(50 100)">
                <!--cx cy 默认为零  一般话图形 在原点画 然后 用偏移定位比较多-->
                <circle r="50" fill="none" stroke="red"></circle>
                <text y="10">圆</text>
            </g>

            <g transform="translate(400 50)">
                <ellipse rx="40" ry="50" stroke="red" fill="none"></ellipse>
                <text y="10">椭圆</text>
            </g>

            <line x1="10" y1="10" x2="90%" y2="50" stroke="red"></line>
            <polyline points="5 5 ,20 50,500 40" fill="none" stroke="gray"/>

            <polygon points="50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180"
                     fill="green"/>


            <path id="MyPath"
                  stroke="red"
                  fill="none"
                  d="M 20 250
                     l 50 0
                     m 20 10 l 180 30
                     h 80
                     v -100"/>
            <text font-family="Verdana" style="text-anchor:start">
                <textPath xlink:href="#MyPath">
                    l命令 m,l命令,移开再划 h水平线&nbsp;&nbsp;&nbsp;&nbsp; v垂直线
                </textPath>
            </text>

        </svg>

        <strong>path 更重要的是曲线</strong>
        <svg xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink">
            <g>
                <path id="MyPath2"
                      stroke="red"
                      fill="none"
                      d="M 50 50
                     C 50 150,350 150,350 50"/>
                <text font-family="Verdana" style="text-anchor:start">
                    <textPath xlink:href="#MyPath2">
                        2次曲线
                    </textPath>
                </text>
                <!--标注操作线-->
                <line x1="50" y1="50" x2="50" y2="150" stroke="green"></line>
                <line x1="350" y1="50" x2="350" y2="150" stroke="green"></line>
            </g>


            <g transform="translate(0 130)">
                <path id="MyPath3"
                      stroke="red"
                      fill="none"
                      d="M 50 50
                     C 50 150,300 150,300 50
                     S 599 -50,599 50"/>
                <text font-family="Verdana" style="text-anchor:start">
                    <textPath xlink:href="#MyPath3">
                        又一条2次曲线延长
                    </textPath>
                </text>

                <line x1="50" y1="50" x2="50" y2="150" stroke="green"></line>
                <line x1="300" y1="50" x2="300" y2="150" stroke="green"></line>
                <line x1="599" y1="50" x2="599" y2="-50" stroke="green"></line>
            </g>


        </svg>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                shape: ''
            }

        }
    }
</script>
<style scoped>
    svg {
        display: block;
        width: 600px;
        height: 300px;
        border: 1px solid gray;
    }

    svg text {
        font-size: 20;
        fill: gray;
        text-anchor: middle;
    }
</style>

