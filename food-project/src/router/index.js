import FoodDetailView from "@/views/FoodDetailView.vue";
import FoodFindView from "@/views/FoodFindView.vue";
import HomeView from "@/views/HomeView.vue";
import {createRouter,createWebHistory} from 'vue-router'
// @Controller 
const routes=[
    {
        path:'/',
        name:'home',
        component:HomeView
    },
    {
        path:'/food/detail/:no',
        name:'food_detail',
        component:FoodDetailView
    },
    {
        path:'/food/find',
        name:'food_find',
        component:FoodFindView
    }
]
const router=createRouter({
    history:createWebHistory(process.env.BASE_URL),
    routes
})
export default router