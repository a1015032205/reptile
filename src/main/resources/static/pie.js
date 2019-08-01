//加载饼图
$(function () {


    //获得div组件，并且渲染成图表组件
    var echart = echarts.init($("#mydiv")[0]);


    //设置图表的属性
    var option = {
        //大标题
        title: {
            //标题内容
            text: "拉勾网-武汉市java招聘信息",
            //子标题
            subtext: "统计人:秒度",
            //对齐方式
            x: "center"
        },
        //每一个扇区的说明信息
        legend: {
            data: [],
            orient: 'vertical',
            x: "left"
        },
        // 工具栏
        toolbox: {
            show: true,
            feature: {
                mark: {
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: false
                },
                magicType: {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        //鼠标悬停时的提示信息
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        //用于指定要显示的数据
        series: [{
            name: '薪资',
            type: "pie",  //bar柱状图,pie饼图，line:折线图
            roseType: 'angle',//南丁格尔
            radius: "55%",//圆的半径
            data: [],
            itemStyle: {//阴影效果
                normal: {
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 1)'
                }
            }
        }]
    };

    //将属性与渲染后的图表关联
    echart.setOption(option);


    /*************************采用ajax动态加载数据****************************************************/
    $.ajax({
        url: "/pie",
        type: "get",
        success: function (data) {
            alert(data.titles);
            alert(data.vals);
            //根据返回来的数据，绑定到对应的图表中
            echart.setOption({
                //哪些属性，没有值，就给哪些属性赋值
                legend: {
                    data: data.titles,//标题，需要动态加载，1维数组
                    orient: 'vertical',
                    x: "left"
                },
                //要显示的数据
                series: [{
                    name: '薪资',
                    type: "pie",
                    roseType: 'angle',//南丁格尔
                    radius: "55%",//圆的半径
                    data: data.vals,//数据，需要动态加载，2维数组
                    itemStyle: {
                        normal: {
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]

            });
        }
    });

});