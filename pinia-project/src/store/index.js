import {createStore} from 'vuex'
import recipes from './recipe'

export default createStore({
    modules:{
        recipes
    }
})