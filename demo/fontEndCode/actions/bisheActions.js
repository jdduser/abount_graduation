/**
 * Created by ccy on 2017/3/2.
 */

import GraphStore from '../stores/GraphStore'
import $ from 'jquery'


//修改要提交给接口的数据
export function getPeople(para) {
    console.log('请求的参数All');
    console.log(para);
    if (para.type == '纪录片') {      //存在一个问题就是纪录片只能属于一种类别
        $.get("http://localhost:3000/getDocumentaryDetail", para,
            function (data, status) {
                console.log('获得的数据:');
                console.log(data);
                if(data=='fail'){    //没有查询到结果

                }else{
                    var res = JSON.parse(data);
                    console.log(res)
                    var items = [];
                    var links = [];
                    var item = {
                        name: '',
                        x: 550,
                        y: 100,
                        itemStyle: {
                            normal: {
                                color: "#c23531"
                            }
                        },
                        tooltip: {
                           // trigger: 'item',
                            // formatter: function (params) {
                            //     var res = params.data.name + ":" + params.data.time + '秒<br/>';
                            //     return res;
                            // },
                        },
                    }
                    item.name = para.item;
                    item.x = Math.ceil(Math.random() * 1000 + Math.random() * 100);
                    item.y = Math.ceil(Math.random() * 1000 + Math.random() * 100);
                    items.push(item);     //先把最原始的节点放进去


                    var disre = [];  //判断重复节点用
                    var count = 1;  //记录target
                    for(var everyrelation in res){
                        console.log(everyrelation)
                        var relation = res[everyrelation]["relation"];   //保存关系类型
                        var alltype = res[everyrelation]["data"];
                        console.log(alltype)
                        // var item = {
                        //     name: '第六集',
                        //     x: 550,
                        //     y: 100,
                        //     itemStyle: {
                        //         normal: {
                        //             color: "#c23531"
                        //         }
                        //     },
                        //     tooltip: {
                        //         trigger: 'item',
                        //         formatter: function (params) {
                        //             var res = params.data.name + '<br/>' + params.data.des + '<br/>' + params.data.search;
                        //             return res;
                        //         },
                        //     },
                        // }
                        if(alltype){
                            for(var everytype in alltype){
                                console.log(everytype)
                                var item = {
                                    name: '',
                                    x: 550,
                                    y: 100,
                                    itemStyle: {
                                        normal: {
                                            color: "#c23531"
                                        }
                                    },
                                    tooltip: {
                                        //trigger: 'item',
                                        // formatter: function (params) {
                                        //     var res = params.data.name + ":" + params.data.time + '秒<br/>';
                                        //     return res;
                                        // },
                                    },
                                }
                                var linkitem = {
                                    source: 0,
                                    target: 1,
                                    label: {
                                        normal: {
                                            show: 'true',
                                            formatter: relation
                                        }
                                    },
                                };     //记录关系

                                //拼凑item元素
                                item.name = everytype;
                                item.x = Math.ceil(Math.random() * 1000 + Math.random() * 10);
                                item.y = Math.ceil(Math.random() * 1000 + Math.random() * 10);
                                item.itemStyle.normal.color = '#61a0a8';   //改变颜色
                                if(disre.indexOf(everytype)!=-1){

                                }else{
                                    items.push(item);
                                    disre.push(everytype);
                                    //拼接links
                                    linkitem.target = count;
                                    links.push(linkitem);
                                    count++;

                                    //构造每种类型下的记录片
                                    var sourcecount=count-1

                                    if( alltype[everytype]){
                                        console.log(alltype[everytype])
                                        var typedata=alltype[everytype]["data"]
                                        for(var everyrelation1 in typedata){
                                            var relation1=typedata[everyrelation1].relation;
                                            var alldocumentary=typedata[everyrelation1].data
                                            if(alldocumentary){
                                                for(var everydocumentary in alldocumentary){
                                                    var item = {
                                                        name: '',
                                                        x: 550,
                                                        y: 100,
                                                        itemStyle: {
                                                            normal: {
                                                                color: "#c23531"
                                                            }
                                                        },
                                                        tooltip: {
                                                            //trigger: 'item',
                                                            // formatter: function (params) {
                                                            //     var res = params.data.name + ":" + params.data.time + '秒<br/>';
                                                            //     return res;
                                                            // },
                                                        },
                                                    }
                                                    var linkitem = {
                                                        source: sourcecount,
                                                        target: 1,
                                                        label: {
                                                            normal: {
                                                                show: 'true',
                                                                formatter: relation1
                                                            }
                                                        },
                                                    };     //记录关系
                                                    //拼凑item元素
                                                    item.name = everydocumentary;
                                                    item.x = Math.ceil(Math.random() * 1000 + Math.random() * 10);
                                                    item.y = Math.ceil(Math.random() * 1000 + Math.random() * 10);
                                                    item.itemStyle.normal.color = '#2f4554';   //改变颜色
                                                    if(disre.indexOf(everydocumentary)!=-1){

                                                    }else {
                                                        items.push(item);
                                                        disre.push(everydocumentary);
                                                        //拼接links
                                                        linkitem.target = count;
                                                        links.push(linkitem);
                                                        count++;
                                                    }

                                                }
                                            }



                                        }
                                    }
                                }


                            }
                        }


                    }
                    console.log("节点。。。。")
                    console.log(items)
                    console.log("关系。。。。。")
                    console.log(links)
                    GraphStore.knowledgeGraphData.data[0].data = items
                    GraphStore.knowledgeGraphData.data[0].links = links
                    GraphStore.emitChange()
                }

            }
        );
    } else {
        $.get("http://localhost:3000/getKeyDetail", para,
            function (data, status) {
                console.log('获得的数据:');
                console.log(data);
                var res = JSON.parse(data)
                var items = [];
                var links = [];
                var contentcolor = '#61a0a8';
                var item = {
                    name: '第六集',
                    x: 550,
                    y: 100,
                    //time: 120,
                    itemStyle: {
                        normal: {
                            color: "#c23531"
                        }
                    },
                    tooltip: {
                        // trigger: 'item',
                        // formatter: function (params) {
                        //     var res = params.data.name + ":" + params.data.time + '秒<br/>';
                        //     return res;
                        // },
                    },
                }
                item.name = para.item;
                item.x = Math.ceil(Math.random() * 1000 + Math.random() * 100);
                item.y = Math.ceil(Math.random() * 1000 + Math.random() * 100);
                items.push(item);

                var disre = [];
                var count = 1;  //记录target
                res.forEach(function (i) {
                    var linkitem = {
                        source: 0,
                        target: 1,
                    };
                    var item = {
                        name: '第六集',
                        x: 550,
                        y: 100,
                        time:120,
                        itemStyle: {
                            normal: {
                                color: "#c23531"
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: function (params) {
                                var res = params.data.name + ":" + params.data.time + '秒<br/>';
                                return res;
                            },
                        },
                    }
                    //不可以重复
                    if (disre.indexOf(i.location) != -1) {

                    } else {
                        //拼凑item元素
                        item.name = i.location;
                        item.x = Math.ceil(Math.random() * 1000 + Math.random() * 10);
                        item.y = Math.ceil(Math.random() * 1000 + Math.random() * 10);
                        item.des = i.description;
                        item.search = i.searchkey;
                        item.time=i.time;
                        item.itemStyle.normal.color = contentcolor;
                        items.push(item);
                        disre.push(i.name);
                        //拼接links
                        linkitem.target = count;
                        links.push(linkitem);
                        count++;
                    }
                })
                console.log("节点。。。。")
                console.log(items)
                console.log("链接。。。。")
                console.log(links)
                GraphStore.keyData.data[0].data = items
                GraphStore.keyData.data[0].links = links
                GraphStore.emitChange()
            }
        );


    }
}

export function getShowData(para) {
    $.get("http://localhost:3000/getTop10", para, function (data, status) {
        if (data) {
            console.log('action getTop10..........')
            data = JSON.parse(data)
            console.log(data)

            GraphStore.visualData.top10.yk.xAxisData = data.yk.xaxis
            GraphStore.visualData.top10.yk.data[0].data = data.yk.yaxis

            GraphStore.visualData.top10.iqiyi.xAxisData = data.iqiyi.xaxis
            GraphStore.visualData.top10.iqiyi.data[0].data = data.iqiyi.yaxis

            GraphStore.visualData.top10.tecent.xAxisData = data.tecent.xaxis
            GraphStore.visualData.top10.tecent.data[0].data = data.tecent.yaxis
            GraphStore.emitChange()
        }
    })
    $.get("http://localhost:3000/getTypeCount", para, function (data, status) {
        if (data) {
            console.log('getTypeCount..........')
            data = JSON.parse(data)
            console.log(data)

            GraphStore.visualData.typeCount.data[0].data = data.data;
            GraphStore.visualData.typeCount.type=data.types
            GraphStore.emitChange()
        }
    })
    $.get("http://localhost:3000/getScore", para, function (data, status) {
        if (data) {
            console.log('getScore..........')
            data = JSON.parse(data)
            console.log(data)

            GraphStore.visualData.score.yk.xAxisData = data.yk.xaxis
            GraphStore.visualData.score.yk.data[0].data = data.yk.yaxis
            GraphStore.visualData.score.iqiyi.xAxisData = data.iqiyi.xaxis
            GraphStore.visualData.score.iqiyi.data[0].data = data.iqiyi.yaxis
            GraphStore.visualData.score.tecent.xAxisData = data.tecent.xaxis
            GraphStore.visualData.score.tecent.data[0].data = data.tecent.yaxis
            GraphStore.emitChange()
        }
    })
}










