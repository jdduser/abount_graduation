/**
 * Created by chaijiang on 2017/5/11.
 */

import React, {Component} from 'react'
import {Icon, Input, AutoComplete} from 'antd';
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
import bisheDispatcher from '../../dispatcher/BisheDispatcher'

export default class search extends Component {

    constructor(props) {
        super(props)
        this.mounted = true;
        this.state = {
            //para:ListStore.data.pansect.PortData,
        }

    }

    componentWillMount() {
        if (this.props.source == 'key') {
            bisheDispatcher.dispatch({
                action: 'GET_People',
                data: {
                    type: '关键词',
                    item: "",
                }
            })
        }else{
            bisheDispatcher.dispatch({
                action: 'GET_People',
                data: {
                    type: '纪录片',
                    item: "纪录片",
                }
            })
        }

    }

    componentDidMount() {
    }

    componentWillUnmount() {
    };

    search(value, option) {

        bisheDispatcher.dispatch({
            action: 'GET_People',
            data: {
                type: option.props.type,
                item: value,
            }
        })
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
            },
        }

        const dataSourceDocumentary = [
            {
                title: '纪录片',
                children: [{
                    title: '纪录片',
                    count: 10000,
                }, {
                    title: '探索类纪录片',
                    count: 10000,
                }, {
                    title: '奇闻天下',
                    count: 10600,
                },{
                    title: '互联网时代',
                    count: 10600,
                }],
            }]
        const dataSourceKey = [
            {
                title: '人物',
                children: [{
                    title: '谢尔盖-赫鲁晓夫',
                    count: 60100,
                }, {
                    title: '凯文·凯利',
                    count: 30010,
                }],
            }]


        function renderTitle(title) {
            return (
                <span>
                        {title}


                </span>
            );
        }
        var dataSource;
        if (this.props.source == 'key') {
            dataSource = dataSourceKey
        } else {
            dataSource = dataSourceDocumentary
        }
        const options = dataSource.map(group => (
            <OptGroup
                key={group.title}
                label={renderTitle(group.title)}
            >
                {group.children.map(opt => (
                    <Option key={opt.title} value={opt.title} type={group.title}>
                        {opt.title}
                        { /*<span className="certain-search-item-count">{opt.count} 人 关注</span> */}
                    </Option>
                ))}
            </OptGroup>
        ));


        return (

            <div className="certain-category-search-wrapper" style={{width: 250, height: 40, display: 'inline-block'}}>

                <AutoComplete
                    className="certain-category-search"
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={false}
                    dropdownStyle={{width: 300}}
                    size="large"
                    style={{width: '100%'}}
                    dataSource={options}
                    placeholder="input here"
                    optionLabelProp="value"
                    onSelect={this.search}
                    defaultValue="纪录片"
                >
                    <Input suffix={<Icon type="search" className="certain-category-icon"/>}/>
                </AutoComplete>

            </div>
        )
    }
}


