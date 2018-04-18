/**
 * Created by chaijiang on 2017/8/14.
 */


/**
 * Created by chaijiang on 2017/3/31.
 */

import React, {Component} from 'react'
import AppStore from '../../stores/GraphStore'
import Charts from './Charts'


export default class RenderChart extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        AppStore.addChangeListener(this._onChange.bind(this))
    }

    _onChange() {
        this.setState(AppStore)
        console.log(AppStore)
    }

    componentWillUnmount() {
        //重写组件的setState方法，直接返回空
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        let styles = {
            root: {
                width: '100%',
                height: 'auto',
                margin: 0,
                padding: 0,
                position: 'relative',
                background: 'rgba(78, 94, 120, 1)',
                background: '#fff',
                marginBottom: '20px'
            },
        }
        let content;
        if (this.props.index == 'key') {
            content = (
                <Charts data={AppStore.keyData} index={this.props.index}/>
            )
        } else {
            content = (
                <Charts data={AppStore.knowledgeGraphData} index={this.props.index}/>
            )
        }

        return (
            <div style={styles.root}>
                {content}
            </div>
        )
    }
}
