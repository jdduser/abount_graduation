/**
 * Created by chaijiang on 2017/8/14.
 */
/**
 * Created by chaijiang on 2017/6/8.
 */


var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var GraphStore =Object.assign({}, EventEmitter.prototype, {

    knowledgeGraphData: {
        title: '结果显示',
        tooltip: {},
        type:'',
        data : [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 50,
                //力图
                layout:'force',
                initLayout:'circular',
                draggable:true,
                //力图排斥力
                force: {
                    repulsion: 2000
                },
                tooltip:'item',
                tooltipset:function(params) {
                        var res = params.data+'<br/>';
                        return '111';
                },
                label: {
                    normal: {
                        show: true
                    }
                },
                edgeSymbol: ['circle'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 10
                        }
                    }
                },
                data: [
                    {
                        name: '乔布斯',
                        x: 200,
                        y: 600,
                        itemStyle: {
                            normal: {
                                color: "#c23531"
                            }
                        },
                        //time:120,
                        //flag:'hhh',
                        tooltip:{
                            trigger:'item',
                            formatter:function(params) {
                                var res = params.data.name+'<br/>';
                                return res;
                            },
                        },
                    },
                    {
                        name: '第一集',
                        x: 100,
                        y: 300,
                        itemStyle: {
                            normal: {
                                color: "#61a0a8"
                            }
                        },
                        time:120,
                        tooltip:{
                            trigger:'item',
                            formatter:function(params) {
                                var res = params.data.name+":"+params.data.time+'秒<br/>';
                                return res;
                            },
                        },

                    }, {
                        name: '第三集',
                        x: 800,
                        y: 300,
                        itemStyle: {
                            normal: {
                                color: "#61a0a8"
                            }
                        },
                        time:240,
                        tooltip:{
                            trigger:'item',
                            formatter:function(params) {
                                var res = params.data.name+":"+params.data.time+'秒<br/>';
                                return res;
                            },
                        },

                    }, {
                        name: '第六集',
                        x: 550,
                        y: 100,
                        itemStyle: {
                            normal: {
                                color: "#61a0a8"
                            }
                        },
                        time:600,
                        tooltip:{
                            trigger:'item',
                            formatter:function(params) {
                                var res = params.data.name+":"+params.data.time+'秒<br/>';
                                return res;
                            },
                        },
                    }
                ],
                links: [
                    {
                        source: 0,
                        target: 1,
                    }, {
                        source: 0,
                        target: 2,
                    }, {
                        source: 0,
                        target: 3,
                    }
                ],
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            }
        ],
    },
    keyData: {
        title: '结果显示',
        tooltip: {},
        type:'',
        data : [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 50,
                //力图
                layout:'force',
                initLayout:'circular',
                draggable:true,
                //力图排斥力
                force: {
                    repulsion: 2000
                },
                tooltip:'item',
                tooltipset:function(params) {
                    var res = params.data+'<br/>';
                    return '111';
                },
                label: {
                    normal: {
                        show: true
                    }
                },
                edgeSymbol: ['circle'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 10
                        }
                    }
                },
                data: [
                    {
                        name: '乔布斯',
                        x: 200,
                        y: 600,
                        itemStyle: {
                            normal: {
                                color: "#c23531"
                            }
                        },
                        //time:120,
                        //flag:'hhh',
                        tooltip:{
                            trigger:'item',
                            formatter:function(params) {
                                var res = params.data.name+'<br/>';
                                return res;
                            },
                        },
                    },
                    {
                        name: '第一集',
                        x: 100,
                        y: 300,
                        itemStyle: {
                            normal: {
                                color: "#61a0a8"
                            }
                        },
                        time:120,
                        tooltip:{
                            trigger:'item',
                            formatter:function(params) {
                                var res = params.data.name+":"+params.data.time+'秒<br/>';
                                return res;
                            },
                        },

                    }, {
                        name: '第三集',
                        x: 800,
                        y: 300,
                        itemStyle: {
                            normal: {
                                color: "#61a0a8"
                            }
                        },
                        time:240,
                        tooltip:{
                            trigger:'item',
                            formatter:function(params) {
                                var res = params.data.name+":"+params.data.time+'秒<br/>';
                                return res;
                            },
                        },

                    }, {
                        name: '第六集',
                        x: 550,
                        y: 100,
                        itemStyle: {
                            normal: {
                                color: "#61a0a8"
                            }
                        },
                        time:600,
                        tooltip:{
                            trigger:'item',
                            formatter:function(params) {
                                var res = params.data.name+":"+params.data.time+'秒<br/>';
                                return res;
                            },
                        },
                    }
                ],
                links: [
                    {
                        source: 0,
                        target: 1,
                    }, {
                        source: 0,
                        target: 2,
                    }, {
                        source: 0,
                        target: 3,
                    }
                ],
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            }
        ],
    },
    visualData:{
        top10:{
            yk:{
                title: '优酷TOP10',
                text: 'TOP10',
                x: '纪录片名称',
                xType:'category',
                y: '播放量',
                type: ['优酷'],
                xAxisData: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                color: ['#c23531','#d48265', '#91c7ae','#749f83' ,'#2f4554', '#61a0a8',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                boundaryGap: false,
                dataZoom: false,
                nameLocation: 'end',
                nameGap: 22,
                data:[
                    {
                        type: 'bar',
                        name: '优酷',
                        data: [14000,10320,15000,12300,15000,13070,15600,12000,16000,13000,12500,14700],
                        barWidth: 15
                    },
                ]
            },
            iqiyi:{
                title: '爱奇艺TOP10',
                text: 'TOP10',
                x: '纪录片名称',
                xType:'category',
                y: '播放量',
                type: ['爱奇艺'],
                xAxisData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                color: ['#c23531','#d48265', '#91c7ae','#749f83' ,'#2f4554', '#61a0a8',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                boundaryGap: false,
                dataZoom: false,
                nameLocation: 'end',
                nameGap: 22,
                data:[
                    {
                        type: 'bar',
                        name: '爱奇艺',
                        data: [14000,10320,15000,12300,15000,13070,15600,12000,16000,13000,12500,14700],
                        barWidth: 15
                    },
                ]
            },
            tecent:{
                title: '腾讯TOP10',
                text: 'TOP10',
                x: '纪录片名称',
                xType:'category',
                y: '播放量',
                type: ['腾讯'],
                xAxisData: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                color: ['#c23531','#d48265', '#91c7ae','#749f83' ,'#2f4554', '#61a0a8',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                boundaryGap: false,
                dataZoom: false,
                nameLocation: 'end',
                nameGap: 22,
                data:[
                    {
                        type: 'bar',
                        name: '腾讯',
                        data: [14000,10320,15000,12300,15000,13070,15600,12000,16000,13000,12500,14700],
                        barWidth: 15
                    },
                ]
            }
        },
        typeCount:{
            title: '各类型占比',
            type: ['文化','历史'],
            // tooltip : {
            //     trigger: 'item',
            //     formatter: "{a} <br/>{b} : {c} ({d}%)"
            // },
            color: ['#c23531','#d48265', '#91c7ae','#749f83' ,'#2f4554', '#61a0a8',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
            data:[
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        },
        score:{
            yk:{
                title: '优酷评分',
                    text: 'TOP10',
                    x: '纪录片名称',
                    xType:'category',
                    y: '评分',
                    type: ['优酷'],
                    xAxisData: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                    color: ['#c23531','#d48265', '#91c7ae','#749f83' ,'#2f4554', '#61a0a8',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                    boundaryGap: false,
                    dataZoom: false,
                    nameLocation: 'end',
                    nameGap: 22,
                    data:[
                    {
                        type: 'line',
                        name: '优酷',
                        data: [14000,10320,15000,12300,15000,13070,15600,12000,16000,13000,12500,14700],
                        barWidth: 15
                    },
                ]
            },
            iqiyi:{
                title: '爱奇艺评分',
                    text: 'TOP10',
                    x: '纪录片名称',
                    xType:'category',
                    y: '播放量',
                    type: ['爱奇艺'],
                    xAxisData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                    color: ['#c23531','#d48265', '#91c7ae','#749f83' ,'#2f4554', '#61a0a8',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                    boundaryGap: false,
                    dataZoom: false,
                    nameLocation: 'end',
                    nameGap: 22,
                    data:[
                    {
                        type: 'line',
                        name: '爱奇艺',
                        data: [14000,10320,15000,12300,15000,13070,15600,12000,16000,13000,12500,14700],
                        barWidth: 15
                    },
                ]
            },
            tecent:{
                title: '腾讯评分',
                    text: 'TOP10',
                    x: '纪录片名称',
                    xType:'category',
                    y: '播放量',
                    type: ['腾讯'],
                    xAxisData: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                    color: ['#c23531','#d48265', '#91c7ae','#749f83' ,'#2f4554', '#61a0a8',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                    boundaryGap: false,
                    dataZoom: false,
                    nameLocation: 'end',
                    nameGap: 22,
                    data:[
                    {
                        type: 'line',
                        name: '腾讯',
                        data: [14000,10320,15000,12300,15000,13070,15600,12000,16000,13000,12500,14700],
                        barWidth: 15
                    },
                ]
            }
        }

    },
    // Emit Change event
    emitChange: function (value) {
        this.emit('change')
        console.log('emit.....')
    },

    // Add change listener
    addChangeListener: function (callback) {
        this.on('change', callback)
    },

    // Remove change listener
    removeChangeListener: function (callback) {
        this.removeListener('change', callback)
    }
})

module.exports = GraphStore;