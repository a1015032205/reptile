layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element', 'slider'], function () {

    var table = layui.table,
        layer = layui.layer,
        $ = jQuery = layui.$;

    //第一个实例
    table.render({
        elem: '#demo'
        , even: true //开启隔行背景
        , text: "数据显示异常"
        //, height: 312
        , skin: 'line' //行边框风格
        , url: '/findAll' //数据接口
        , size: 'lg' //大尺寸的表格
        , page: true //开启分页
        , limit: 10//默认每一页显示的条数
        , limits: [1, 2, 3, 5, 10, 15, 20, 30, 50, 100]//提示的每页条数的列表
        , title: "lagou网招聘信息" //设置导出文件时的标题
        , toolbar: "#addDemo" //显示工具栏
        , loading: true
        , cols: [[ //表头
            {field: 'no', type: 'checkbox', width: "3%", fixed: 'left', align: "center"}
            , {field: 'id', type: "numbers", title: '序号', width: "5%", sort: true, fixed: 'left', align: "center"}
            //  , {field: 'webId', title: '编号', width: "8%", sort: true, align: "center"}
            , {field: 'companyName', title: '公司', width: "10%", sort: true, align: "center"}
            , {field: 'region', title: '区域', width: "10%", sort: true, align: "center"}
            , {field: 'financing', title: '融资', width: "10%", sort: true, align: "center"}
            , {field: 'people', title: '人数', width: "10%", sort: true, align: "center"}
            , {field: 'workExp', title: '经验', width: "8%", sort: true, align: "center"}
            , {field: 'school', title: '学历', width: "5%", sort: true, align: "center"}
            , {field: 'money', title: '工资', width: "8%", sort: true, align: "center"}
            , {field: 'welfare', title: '待遇', width: "15%", sort: true, align: "center"}
            , {field: 'ftime', title: '时间', width: "10%", sort: true, align: "center"}
            , {field: 'work', title: '操作', width: "6%", align: "center", toolbar: '#barDemo'}
        ]]
    });


    //监听头工具栏事件
    table.on('toolbar(test)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id)
            , data = checkStatus.data; //获取选中的数据
        switch (obj.event) {
            case 'pie':
                window.open("/showPie");
                break;
        }
    });

    //监听行工具事件
    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'detail') {
            window.open("https://www.lagou.com/jobs/" + data.webId + ".html");
        } else if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                $.ajax({
                    url: "/del",
                    type: "get",
                    data: {"id": data.id},
                    success: function () {
                        table.reload('demo', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            }
                        }); //只重载数据
                        layer.close(index);
                    }
                })
            });
        } else if (layEvent === 'edit') {
        }
    });


});