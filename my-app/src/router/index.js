import FoodDetail from '@/components/FoodDetail.vue';
import FoodList from '@/components/FoodList.vue';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'home',
        component: FoodList 
    },
    {
        path: '/detail',
        name: 'detail',
        component:FoodDetail
    }

]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router
