(function(e){function n(n){for(var r,i,l=n[0],u=n[1],s=n[2],d=0,p=[];d<l.length;d++)i=l[d],a[i]&&p.push(a[i][0]),a[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);c&&c(n);while(p.length)p.shift()();return o.push.apply(o,s||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],r=!0,l=1;l<t.length;l++){var u=t[l];0!==a[u]&&(r=!1)}r&&(o.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},a={2:0},o=[];function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=n,l=l.slice();for(var s=0;s<l.length;s++)n(l[s]);var c=u;o.push([2,0]),t()})({2:function(e,n,t){e.exports=t("mUv+")},"mUv+":function(e,n,t){"use strict";t.r(n);t("Vd3H"),t("VRzm");var r=t("VphZ");window.d3=r;var a=r["select"]("body").append("svg").append("g");a.append("g").attr("class","slices"),a.append("g").attr("class","labels"),a.append("g").attr("class","lines");var o=960,i=450,l=Math.min(o,i)/2,u=r["pie"]().sort(null).value(function(e){return e.value}),s=r["arc"]().outerRadius(.8*l).innerRadius(.4*l);r["arc"]().innerRadius(.9*l).outerRadius(.9*l);a.attr("transform","translate("+o/2+","+i/2+")");var c=r["scaleOrdinal"]().domain(["Lorem ipsum","dolor sit","amet","consectetur","adipisicing","elit","sed","do","eiusmod","tempor","incididunt"]).range(["#98abc5","#8a89a6","#7b6888","#6b486b","#a05d56","#d0743c","#ff8c00"]);function d(){var e=c.domain();return e.map(function(e){return{label:e,value:Math.random()}})}function p(e){var n=a.select(".slices").selectAll("path.slice").data(u(e));n.transition().duration(1e3).attrTween("d",function(e){console.info("更新");var n=e.startAngle,t=e.endAngle,a=r["interpolate"](this._angle,{startAngle:n,endAngle:t});return this._angle={startAngle:n,endAngle:t},function(e){return s(a(e))}}),n.exit().remove(),n.enter().insert("path").style("fill",function(e){return c(e.data.label)}).attr("class","slice").transition().duration(1e3).attrTween("d",function(e){console.info("添加");var n=e.startAngle,t=e.endAngle;this._angle={startAngle:n,endAngle:t};var a=r["interpolate"]({startAngle:0,endAngle:0},{startAngle:n,endAngle:t});return function(e){return s(a(e))}})}p(d()),r["select"](".randomize").on("click",function(){p(d())})}});
//# sourceMappingURL=test3.3bf2170f.js.map