/**
 * Created by chaijiang on 2017/3/31.
 */
import React, {Component} from 'react'

import Search from './Search'
import RenderChart from './RenderChart'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import { Input, Select, Icon } from 'antd';
const Option = Select.Option;
import { Button } from 'antd';

module.exports= class View extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current:'1',
        }
    }

    componentWillUnmount(){
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        const styles = {
            root:{
                width: '80%',
                marginTop: '20px',
                marginLeft: '10%',
                background:'white',
                borderRadius:'5px',
                marginBottom:'20px'
            },
            search:{
                width:'100%',
                background:'#fff',
                height:40,
                borderRadius:'5px',
                color:'black'
            },
            result:{
                borderRadius:'5px',
                marginTop:20
            }
        }

        return (
            <div style={styles.root}>
                <Tabs onChange={this.callback} type="card">
                    <TabPane tab="纪录片查询" key="1">
                        <div style={styles.root}>
                            <div style={styles.search}>
                                <span>请输入查询项：</span>
                                <Search source="documentary"/>
                            </div>
                            <div style={styles.result}>
                                <RenderChart index="documentary"/>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="关键字索引查询" key="2">
                        <div style={styles.root}>
                            <div style={styles.search}>
                                <span>请输入查询项：</span>
                                <Search source="key"/>
                            </div>
                            <div style={styles.result}>
                                <RenderChart index="key"/>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="信息录入" key="3">
                        <div style={{textAlign:"center"}}>
                            <div style={{width:'300px',marginBottom:'20px' ,display:"inline-block"}}>
                                <Input addonBefore="关 键 词："  defaultValue="" />
                            </div>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <div style={{width:'300px',marginBottom:'20px' ,display:"inline-block"}} >
                                <Input addonBefore="所在纪录片："  defaultValue="" />
                            </div>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <div style={{width:'300px',marginBottom:'20px' ,display:"inline-block"}}>
                                <Input addonBefore="时间点：" addonAfter="s" defaultValue="" />
                            </div>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <div style={{display:"inline-block",marginBottom:'20px'}}>
                                <Button type="primary">提交</Button>
                                <div style={{width:'20px',display:"inline-block"}}></div>
                                <Button>取消</Button>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>

        )
    }
}

