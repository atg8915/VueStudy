<template>
<div class="container">
    <div class="row">
     <input type=text size=20 class="input-sm" v-model="fd"
      @keydown.enter="find()"
     >
     <button class="btn-sm btn-primary" @click="find()">검색</button>
    </div>
    <div class="row" style="margin-top: 10px">
      <div class="col-sm-3" v-for="(vo,index) in find_list.list" :key="index">
        <a href="#">
          <div class="thumbnail">
            <img :src="vo.poster" 
                 :title="vo.title"
                 style="width: 250px;height: 150px">
            <p>{{vo.chef}}</p>
          </div>
        </a>
      </div>
    </div>
    <div class="row text-center" style="margin-top: 20px">
      <ul class="pagination">
        <li v-if="find_list.pages[2]>1"><a class="a-link" @click="recipeFindData(find_list.pages[2]-1,fd)">&laquo;</a></li>
        
        <li v-for="(i,index) in range(find_list.pages[2],find_list.pages[3])"
            :class="i==find_list.pages[0]?'active':''" :key="index"
        ><a class="a-link" @click="recipeFindData(i,fd)">{{i}}</a></li>
        
        <li v-if="find_list.pages[3]<find_list.pages[1]"><a class="a-link" @click="recipeFindData(find_list.pages[3]+1,fd)">&raquo;</a></li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
// store에 저장된 state를 연결 
import { onMounted,ref } from 'vue';
import { useRecipeStore } from '@/store/recipe';
const fd=ref("고구마")
const recipeStore=useRecipeStore()
const {find_list}=storeToRefs(recipeStore)
// 값을 변경 
// store => action함수 호출 
const recipeFindData=async(page,fd)=>{
    await recipeStore.recipeFindData(page,fd)
}
onMounted(()=>{
    recipeFindData(1,fd.value)
})
const range=(start,end)=>{
     const arr=[]
     const len=end-start
     for(let i=0;i<=len;i++)
     {
        arr[i]=start
        start++
     }
     return arr
}
const find=()=>{
    recipeFindData(1,fd.value)
}
</script>
<style>
.row {
   margin: 0px auto;
   width: 960px;
}
p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.a-link{
  cursor: pointer;
}
</style>