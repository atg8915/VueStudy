import { defineStore } from "pinia"; 
import axios from "axios";
export const useRecipeStore=defineStore('recipe',{
    // 1. 저장 공간 (데이터) => state
    // data()
    state:()=>({
       recipe_list:{
          list:[],
          pages:[],
          count:0
       },
       recipe_detail:{
          vo:{},
          mList:[],
          iList:[]
       },
       find_list:{
          list:[],
          pages:[]
       }       
    }),
    // 2. action => 서버와 연결 => 데이터 처리
    // 비동기 형식 => Redux
    actions:{
        async recipeListData(page){
            console.log('recipeListData Call',page)
            const response=await axios.get('http://localhost:8080/recipe/list_vue',{
                params:{
                    page
                }
            })
            console.log(response)
            this.recipe_list=response.data
        },
        async recipeDetailData(no){
            const response=await axios.get('http://localhost:8080/recipe/detail_vue',{
                params:{
                    no
                }
            })
            console.log(response)
            this.recipe_detail=response.data
        },
        async recipeFindData(page,fd){
            console.log("recipeFindData",page,fd)
            const response=await axios.get('http://localhost:8080/recipe/find_vue',{
                params:{
                    page,fd
                }
            })
            console.log(response.data)
            // store에 저장 => state => 전역 (모든 View에서 사용이 가능 한 변수)
            this.find_list=response.data
        }
    }
})