/**
 * Created by chaijiang on 2017/7/28.
 */
/**
 * Created by chaijiang on 2017/3/31.
 */
import React, {Component} from 'react'

import View from './KnowledgeGraph/View'
import Video from './KnowledgeGraph/video'
import VisualPage from './KnowledgeGraph/visualPage'



import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;
import { Row, Col } from 'antd';
import { Button } from 'antd';



module.exports= class Bishe extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current:'1',
            style1:'navDetail2',
            style2:'navDetail1',
            style3:'navDetail1',
            style4:'navDetail1',
            style5:'navDetail1',
        }
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleClick2 = this.handleClick2.bind(this)
    }

    /**************************页面加载前********************************************/
    componentWillMount(){

        window.addEventListener('resize', this._resize.bind(this));
    }

    /**************************页面加载前********************************************/

    _onChange(){
    }
    _resize(){

    }
    //*****************************导航切换函数*********************
    handleClick1 () {
        this.setState({
            current: '1',
            style1:'navDetail2',
            style2:'navDetail1',
            style3:'navDetail1',
            style4:'navDetail1',
            style5:'navDetail1',
        });
    }
    handleClick2 () {
        this.setState({
            current: '2',
            style1:'navDetail1',
            style2:'navDetail2',
            style3:'navDetail1',
            style4:'navDetail1',
            style5:'navDetail1',
        });
    }



    render() {
        const styles = {
            root: {
                width: '100%',
                height: 'auto',
                minHeight: '100%',
                margin: 0,
                padding: '0',
                background: 'rgba(78, 94, 120, 1)',
                fontSize:16,
                color:'white',
                position:'relative'
            },
            head:{
                height:90,
                width:'100%',
                background:'rgba(48, 56, 65, 1)',
                color:'white',
                fontSize:30,
                padding:'20 50',
                position:'fixed',
                zIndex:'1',

            },
            nav:{
                float:'left',
                width:'12%',
                fontSize:16,
                height:'100%',
                marginTop:90,
                background:'rgba(57, 69, 88, 1)',
                //background:"-webkit-linear-gradient('rgba(57, 69, 88, 0.5)', 'rgba(57, 69, 88, 1)')",
                color:'rgba(164, 167, 174, 1)',
                position:'fixed',
            },
            navDetail1:{
                width:'100%',
                height:'60px',
                lineHeight:'60px',
                textAlign:'center',
            },
            navDetail2:{
                width:'100%',
                height:'60px',
                lineHeight:'60px',
                textAlign:'center',
                background:'rgba(75, 83, 100, 1)'
            },
            right:{
                float:'right',
                height:'auto',
                width:'88%',
                marginTop:'90px',
            },

        }

        //*******************根据导航切换右边内容***********************************／
        // let divRight= (
        //     <Pandect data={AppStore.data.pansect}/>
        // )
        // if(this.state.current==2){
        //     divRight=(
        //         <Client data={AppStore.data.client}/>
        //     )
        // }
        let divRight='';
        if(this.state.current==2){
            divRight=(
                <View/>

            )
        }
        if(this.state.current==1){
            divRight=(
                <VisualPage/>
            )
        }



        //*****样式控制*************************************／
        let t1= this.state.style1
        let t2= this.state.style2
        let t3= this.state.style3
        let t4= this.state.style4
        let t5= this.state.style5



        return (
            <div style={styles.root}>
                <div style={styles.head}><span>中国纪录片知识图谱构建及可视化展示</span></div>
                <ul style={styles.nav}>
                    <li style={styles.navDetail1}> </li>
                    <li style={styles.navDetail1}> </li>
                    <li key="1" style={styles[t1]}><a style={{color:'rgba(164, 167, 174, 1)'}}  onClick={this.handleClick1}>可视化</a></li>
                    <li key="2" style={styles[t2]}><a style={{color:'rgba(164, 167, 174, 1)'}}  onClick={this.handleClick2}>知识图谱</a></li>

                </ul>
                <div style={styles.right}>
                    {divRight}
                </div>
                <div style={{clear:'both'}}></div>
            </div>

        )
    }
}

