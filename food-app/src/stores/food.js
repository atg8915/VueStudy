import axios from "axios";
/*
    데이터 관리 => 데이터 저장 
    FoodVO = {}
    Map = {}
    List = []
    yes/no = ''
    1,3,10.0 = 0, 0.0
    true/false = true/false 
                 let bCheck=true
    vue3  vuex  pinia
    JSP   MVC   Spring
    react  redux next = tanStack-Query

    data(){
      return {
      }
    }
    1. 중앙 집중적 저장소 
       = 공유하는 데이터 모아서 관리 : state
       state:{
          count:0,
          food_list:[],
          food_detail:{}..
       }
       = 모든 컴포넌트가 접근이 가능
       = state가 변경되면 자동으로 화면 UI가 변경
         -----------
         store.state == 호출 
    2. 수정 , 삭제 , 추가 
       mutation : state변경할때 사용 
       mutation:{
          increment(state)
          {
            state.count++
          }
          decrement(state)
          {
            state.count--
          }
          => 게시판 수정 , 삭제 
       }   
       동기화 함수 이용 : commit 
       store.commit('increment')
    2. action : 비동기적 함수 
       서버와 통신 
       | axios : 서버에 요청 
         | fetch 
         | 결과값 읽기 => then
         | commit => mutation에 전송 = store저장 
                                      | 공유해서 사용
       데이터 흐름 
        Commponent(~View) => actions
                             |
                            dispatch(action)
                            |
                            commit(mutation)
                            |
                            state
                            |
                            UI 반영
    store : 모든 데이터를 저장하는 공간 
    action : 비동기 = 서버연결 = 데이터 읽기 =store
    mutation : 동기적으로 저장 = 유일하게 state변경이 가능 

    state: 공유하는 데이터 모음 

    component ==== action ==== mutation == store
               |           |             state
                          commit
              dispatch
    
*/
export default{
    namespaced:true,
    // 서버에서 전송하는 데이터 변수
    state:{
        food_data:{}, // Map
        food_detail:{} 
    },
    mutations:{
        SET_FOOD_DATA(state,payload){
           state.food_data=payload
        },
        SET_FOOD_DETAIL(state,payload){
           state.food_detail=payload
        }

    },
    // 서버와 연결 = 요청 담당
    /*
        vuex의 구성요소 
        1. state : vuex에 관리 실제 데이터 
        2. mutation : state를 동기적으로 저장 (수정,삭제)
        3. actions : 서버 연결 => 데이터 처리 
        4. mudules : store에 저장된 영역 (분리해서 관리)

        순서  
        => views에 저장 
         component => .vue (<template> HTML)
         폴더 
           components : 공통기반 => Header,Footer..
           views : 출력 화면 
           router : 화면 이동 => index.js
           store : 공통 데이터 관리 
                   나눠서 작업 
                     => food.js
                     => board.js
                     => goods.js
                   모아서 관리 => index.js
         => state프로그램 
            상태 관리 프로그램 

    */
   // 서버와 연결 => 비동기화 
   actions:{
      async foodListData({commit},page){
        await axios.get('http://localhost:8080/food/list_vue',{
            params:{
                page
            }
        }).then(response=>{
            commit('SET_FOOD_DATA',response.data)
            // commit => mutation을 호출 
            // mutation => state에 저장 
        })
      }
   }
}