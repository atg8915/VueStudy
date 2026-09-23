import HomeView from "@/views/HomeView.vue";
import { createRouter,createWebHistory } from "vue-router";
// 화면 이동 => @Controller
const routes=[
    {
        path:'/',
        name:'home',
        component:HomeView
    }
]
const router=createRouter({
    history:createWebHistory(process.env.BASE_URL),
    routes
})
export default router