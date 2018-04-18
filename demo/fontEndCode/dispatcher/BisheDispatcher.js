/**
 * Created by chaijiang on 2017/12/5.
 */
import { Dispatcher } from 'flux'

import { getPeople,getShowData } from '../actions/bisheActions'


const BisheDispatcher = new Dispatcher()

BisheDispatcher.register(function(payload) {
    let action = payload.action
    switch(action) {
        case 'GET_People':
            console.log('get people......')
            getPeople(payload.data)
            break
        case 'GET_showdata':
            console.log('dispatcher get showdata......')
            getShowData(payload.data)
            break
    }
    return true
})

export default BisheDispatcher