/**
 * Created by chaijiang on 2018/3/1.
 */
/**
 * Created by chaijiang on 2017/3/31.
 */
import React, {Component} from 'react'
import bisheDispatcher from '../../dispatcher/BisheDispatcher'
import AppStore from '../../stores/GraphStore'
import Charts from './DataChart'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;


module.exports= class visualPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current: '2',
            Appstore:AppStore
        }
    }

    componentWillMount() {
        console.log("will mount")
        AppStore.addChangeListener(this._onChange.bind(this))
        bisheDispatcher.dispatch({
            action: 'GET_showdata',
        })


    }
    componentWillUnmount(){
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
            return;
        };
    }
    componentDidMount(){

    }
    _onChange(){
        this.setState({})
        console.log("listener....")
    }
    callback(key) {
    }

    render() {
        console.log('render ....')
        console.log(AppStore.visualData.top10)

        const styles = {
            root: {
                width: '80%',
                marginTop: '20px',
                marginBottom:'20px',
                background: 'white',
                marginLeft: '10%',
                borderRadius:'10px'
            },
            chart: {
                width: '80%',
                marginLeft: '10%',
                background: 'white',
                height: '500px',
            },

        }

        return (
           <div>
                <div style={styles.root}>
                    <Tabs onChange={this.callback} type="card">
                        <TabPane tab="优酷" key="1">
                            <div style={styles.chart}>
                                <Charts style={{background:'white'}} data={AppStore.visualData.top10.yk} index="topyk"/>
                            </div>
                        </TabPane>
                        <TabPane tab="爱奇艺" key="2">
                            <div style={styles.chart}>
                                <Charts style={{background:'white'}} data={AppStore.visualData.top10.iqiyi} index="topiqiyi"/>
                            </div>
                        </TabPane>
                        {/*<TabPane tab="腾讯" key="3">
                            <div style={styles.chart}>
                                <Charts style={{background:'white'}} data={AppStore.visualData.top10.tecent} index="toptecent"/>
                            </div>
                        </TabPane>
                        */}
                    </Tabs>
                </div>
               <div style={styles.root}>
                   <div style={styles.chart}>
                       <Charts style={{background:'white'}} data={AppStore.visualData.typeCount} index="typecount"/>
                   </div>
               </div>
               <div style={styles.root}>
                   <Tabs onChange={this.callback} type="card">
                       <TabPane tab="优酷" key="1">
                           <div style={styles.chart}>
                               <Charts style={{background:'white'}} data={AppStore.visualData.score.yk} index="scoreyk"/>
                           </div>
                       </TabPane>
                       <TabPane tab="爱奇艺" key="2">
                           <div style={styles.chart}>
                               <Charts style={{background:'white'}} data={AppStore.visualData.score.iqiyi} index="scoreiqiyi"/>
                           </div>
                       </TabPane>
                       {/*
                       <TabPane tab="腾讯" key="3">
                           <div style={styles.chart}>
                               <Charts style={{background:'white'}} data={AppStore.visualData.score.tecent} index="scoretecent"/>
                           </div>
                       </TabPane>
                        */}
                   </Tabs>
               </div>
           </div>
        )
    }
}

