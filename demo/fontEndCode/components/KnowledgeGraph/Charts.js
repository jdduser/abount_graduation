/**
 * Created by chaijiang on 2017/3/31.
 */

import React, {Component} from 'react'
import $ from 'jquery'
import '../../node_modules/echarts/map/js/china';

export default class Charts extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
        this.initLine = this.initLine.bind(this)
    }

    componentDidMount() {
        this.initLine()
    }
    componentDidUpdate(){
        this.initLine()
    }

    initLine(){

        const index = this.props.index

        const dom = $('#' + index)

        const chartData = this.props.data
        dom.css({
            width: '100%',
            height: '100%'
        })

        let echarts = require('echarts');

        // 基于准备好的dom，初始化echarts实例

        let myChart = echarts.init(document.getElementById(index));
        // 绘制图表

        myChart.setOption({
            title: {
                text: chartData.title,
                textAlign:'left',
                textStyle:{
                    fontSize:17,
                    fontWeight:'bold'
                },
                top:10,
                left:20
            },
            tooltip: {
                trigger: chartData.tooltip,
                formatter:chartData.tooltipset
            },
            legend: {
                data: chartData.type,
                top: 200
            },

            xAxis : chartData.xAxisData,
            // xAxis:[
            //     {
            //         data : chartData.xAxisData,
            //         axisLabel:{
            //             interval: 0 ,
            //             rotate:40
            //         }
            //     }
            // ],

            yAxis : chartData.yAxisData,
            color: chartData.color,
            visualMap: chartData.visualMap,

            series : chartData.data,
            //animation : chartData.animation
        });

        myChart.on('click', this.pieClick);
    }
    pieClick(param){
        let host=location.host
        if(param.data.time) {
            window.open('http://' + host + '/video.html?time=' + param.data.time, 'video')
        }else{
            window.open('https://zh.wikipedia.org/wiki/'+param.data.name)
        }
    }
    render() {

        const styles = {
            root: {
                width: '100%',
                height: '600px',
                margin: 0,
                padding: 0,
                textAlign: 'center',
            },

        }

        return (
            <div style={styles.root} id={this.props.index}>

            </div>
        )
    }
}