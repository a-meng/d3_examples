import * as d3 from 'd3'

window.d3 = d3;
//添加 svg,g标签
var svg = d3.select("body")
    .append("svg")
    .append("g");

svg.append("g")
    .attr("class", "slices");
svg.append("g")
    .attr("class", "labels");
svg.append("g")
    .attr("class", "lines");

var width = 960,
    height = 450,
    radius = Math.min(width, height) / 2;

//饼图角度计算器
var pie = d3.pie()
    .sort(null)
    .value(function (d) {
        return d.value;
    });

//弧形生成器
var arc = d3.arc()
    .outerRadius(radius * 0.8)
    .innerRadius(radius * 0.4);

//外弧 用于画折线
var outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

//移动中心点
svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//获取数据标题
var key = function (d) {
    return d.data.label;
};

var color = d3.scaleOrdinal()
    .domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

//模拟数据更新
function randomData() {
    var labels = color.domain();
    return labels.map(function (label) {
        return {label: label, value: Math.random()}
    });
}

change(randomData());

d3.select(".randomize")
    .on("click", function () {
        change(randomData());
    });

function change(data) {

    /* ------- 画饼图 -------*/
    var slice = svg.select(".slices")
        .selectAll("path.slice")
        //key 参数 描述data的索引
        .data(pie(data));

    /*更新操作*/
    //这个是更新动画
    slice.transition()
        .duration(1000)
        .attrTween("d", function (d) {
            console.info('更新')
            let {startAngle, endAngle} = d;
            let _interpolate = d3.interpolate(
                this._angle,
                {startAngle, endAngle}
            );
            this._angle = {startAngle, endAngle};
            return function (t) {
                return arc(_interpolate(t));
            };
        });
    //删除多余
    slice.exit().remove();

    //插入新的
    slice.enter()
        .insert("path")
        .style("fill", function (d) {
            return color(d.data.label);
        })
        .attr("class", "slice")
        //动画
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
            console.info('添加');
            let {startAngle, endAngle} = d;
            this._angle = {startAngle, endAngle};//留给更新的时候用
            let _interpolate = d3.interpolate(
                {startAngle: 0, endAngle: 0},
                {startAngle, endAngle}
            );
            return function (t) {
                return arc(_interpolate(t));
            };
        });


    /*
    slice.exit()
        .remove();*/

    /* ------- TEXT LABELS -------*/

    /* var text = svg.select(".labels").selectAll("text")
         .data(pie(data), key);

     text.enter()
         .append("text")
         .attr("dy", ".35em")
         .text(function (d) {
             return d.data.label;
         });

     function midAngle(d) {
         return d.startAngle + (d.endAngle - d.startAngle) / 2;
     }

     text.transition().duration(1000)
         .attrTween("transform", function (d) {
             this._current = this._current || d;
             var interpolate = d3.interpolate(this._current, d);
             this._current = interpolate(0);
             return function (t) {
                 var d2 = interpolate(t);
                 var pos = outerArc.centroid(d2);
                 pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                 return "translate(" + pos + ")";
             };
         })
         .styleTween("text-anchor", function (d) {
             this._current = this._current || d;
             var interpolate = d3.interpolate(this._current, d);
             this._current = interpolate(0);
             return function (t) {
                 var d2 = interpolate(t);
                 return midAngle(d2) < Math.PI ? "start" : "end";
             };
         });

     text.exit()
         .remove();*/

    /* ------- SLICE TO TEXT POLYLINES -------*/

    /*var polyline = svg.select(".lines").selectAll("polyline")
        .data(pie(data), key);

    polyline.enter()
        .append("polyline");

    polyline.transition().duration(1000)
        .attrTween("points", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                return [arc.centroid(d2), outerArc.centroid(d2), pos];
            };
        });

    polyline.exit()
        .remove();*/
};
