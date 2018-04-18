/**
 * Created by chaijiang on 2017/11/5.
 */
import React, {Component} from 'react'
import util from '../common/util'
module.exports = class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 0
        }
    }
    componentWillMount(){
        this.setState({
            time:util.getparam('time')
        })
    }

    componentDidMount() {
        this.refs.video.src = "./components/KnowledgeGraph/assets/test1.mp4"
        this.refs.video.addEventListener(
            "loadedmetadata",
            function (p) {
                return function () {
                    this.currentTime = p; //单位为秒
                }
            }(this.state.time));
    }
    render() {
        const styles = {
            root:{
                position:'relative',
                width:'100%',
                height:'100%',
                backgroundImage:'url(./components/KnowledgeGraph/assets/timg.jpeg)',
            },
            filter:{
                width:'100%',
                height:'100%',
                position:'absolute',
                top:'0',
                left:'0',
            },
            video: {
                width: '80%',
                height: '80%',
                margin:'0 auto ',
                position:'absolute',
                top:'50%',
                left:'50%',
                transform:'translate(-50%,-50%)',
                zIndex:100
            }
        }
        return (
            <div style={styles.root}>
                <div style={styles.filter}>
                    <video ref="video" style={styles.video} controls></video>
                </div>
            </div>
        )
    }
}
