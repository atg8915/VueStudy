<template>
    <div class="container">
    <div class="row">
      <select class="input-sm" v-model="column">
        <option value="address">주소</option>
        <option value="type">음식종류</option>
        <option value="name">업체명</option>
      </select>
      <input type="text" size="20" class="input-sm" v-model="fd"
       @keydown.enter="find" ref="fd"
       >
      >
      <button class="btn-sm btn-primary" type="button" @click="find">검색</button>
    </div>
    <div class="row" style="margin: 10px;">
      <div class="col-md-3" v-for="(vo, index) in food_list" :key="index">
        <div class="thumbnail">
          <router-link :to="{ name: 'food_detail', params: { no: vo.no } }">
            <img
              :src="vo.poster"
              :title="vo.address"
              style="width: 250px; height: 130px; object-fit: cover"
            />
            <div class="caption">
              <p>{{ vo.name }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row text-center" style="margin-top: 10px">
      <ul class="pagination">
        <li v-if="startPage > 1">
          <a class="a-link" @click="move(startPage - 1)">&laquo;</a>
        </li>
        <li
          v-for="(i, index) in range(startPage, endPage)"
          :key="index"
          :class="i === curpage ? 'active' : ''"
        >
          <a class="a-link" @click="move(i)">{{ i }}</a>
        </li>
        <li v-if="endPage < totalpage">
          <a class="a-link" @click="move(endPage + 1)">&raquo;</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
//import {ref} from 'vue'
import axios from 'axios';
export default({
    data(){
        return {
            // 멤버변수 = HTML에 변경시 적용 
            food_list:[],
            column:'address',
            fd:'마포',
            curpage:1,
            totalpage:0,
            startPage:0,
            endPage:0
        }
    },
    mounted(){
         this.dataRecv()
    },
    methods:{
        // 페이지 번호 출력 
        range(start,end){
            const len=end-start
            const arr=[]
            for(let i=0;i<=len;i++)
            {
               arr[i]=start
               start++
            }
            return arr
        },
        move(page){
            this.curpage=page
            this.dataRecv()
        },
        find(){
            if(this.fd==="")
            {                
                this.$refs.fd.focus()
                return
            }
            this.curpage=1
            this.dataRecv()
        },
        dataRecv(){
            axios.get('http://localhost:8080/web/food/find_vue.do',{
                params:{
                    page:this.curpage,
                    column:this.column,
                    fd:this.fd
                }
                
            }).then(response=>{
                console.log(response.data)
                this.food_list=response.data.list
                this.curpage=response.data.curpage
                this.totalpage=response.data.totalpage
                this.startPage=response.data.startPage
                this.endPage=response.data.endPage
            })
        }
    }
})
</script>
<style>
.row{
  width:960px;
  margin: 0px auto;
}
p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.a-link{
    cursor: pointer;
}
</style>