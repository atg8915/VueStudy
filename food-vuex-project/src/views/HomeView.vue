<template>
 <div class="container">
    <div class="row">
      <div class="col-sm-3" v-for="(vo,index) in food_data.list" :key="index">
       <a href="#">
        <div class="thumbnail">
          <img :src="vo.poster" style="width: 250px;height: 130px;object-fit:cover">
          <p>{{vo.name}}</p>
        </div>
       </a>
      </div>
    </div>
  </div>
</template>
<script>
 import { defineComponent,onMounted,computed } from 'vue';
 import { useStore } from 'vuex';
 export default defineComponent({
    setup(){
        const store=useStore()
        const food_data=computed(()=>
             store.state.foods.food_data
        )
        // action 함수 호출 
        const foodListData=async(page)=>{
            await store.dispatch("foods/foodListData",page)
            console.log(food_data.value)
        }
        onMounted(()=>{
            foodListData(1)
        })
        return {
            food_data,
            foodListData
        }
    }
 })
</script>
<style>
 .row {
    margin: 0px auto;
    width: 960px;
 }
 p{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>