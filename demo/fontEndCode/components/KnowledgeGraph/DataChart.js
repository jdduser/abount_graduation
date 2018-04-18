
import React , {Component} from 'react'

import $ from 'jquery'

export default class DataChart extends Component{

    constructor(props){
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
        if(index!='typecount') {
            myChart.setOption({
                title: {
                    text: chartData.title,
                    textAlign: 'left',
                    textStyle: {
                        fontSize: 17,
                        fontWeight: 'bold'
                    },
                    top: 20,
                    left: 20

                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: chartData.type,
                    top: 430
                },

                toolbox: {
                    show: false
                },
                calculable: true,
                xAxis: [
                    {
                        type: chartData.xType,
                        name: chartData.x,
                        boundaryGap: true,
                        data: chartData.xAxisData,
                        nameLocation: chartData.nameLocation,
                        nameGap: chartData.nameGap,
                        axisLabel: {
                            interval: 0,
                            rotate: 40
                        }
                    }
                ],
                yAxis: [
                    {
                        type: chartData.yType,
                        name: chartData.y,
                        data: chartData.yAxisData,
                        scale: true,
                        min: chartData.min,
                        max: chartData.max
                    }
                ],
                color: chartData.color,
                grid: {
                    left: '40px',
                    right: '100px',
                    bottom: '90px',
                    top: '90px',
                    containLabel: true,

                },
                series: chartData.data,
                animation: chartData.animation
            });
        }else{
            myChart.setOption({
                title: {
                    text: chartData.title,
                    textAlign: 'left',
                    textStyle: {
                        fontSize: 17,
                        fontWeight: 'bold'
                    },
                    top: 20,
                    left: 20

                },

                tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                legend: {
                    data: chartData.type,
                    top: 450
                },

                color: chartData.color,
                grid: {
                    left: '40px',
                    right: '100px',
                    bottom: '90px',
                    top: '90px',
                    containLabel: true,

                },
                series: chartData.data,
                animation: chartData.animation
            });
        }
        console.log('initline....')
    }

    render(){
        console.log("charts render ....")
        const styles = {
            root: {
                width: '100%',
                height: '100%',
                background: 'white',
                float: 'left'
            }
        }

        return(
            <div style={styles.root} id={this.props.index} >

            </div>
        )
    }
}