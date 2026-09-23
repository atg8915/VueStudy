<template>
    <div class="container">
	  <div class="row">
	    <table class="table">
	      <tr>
	        <td width=30% class="text-center" rowspan="8">
	          <img :src="vo.poster " style="width:290px;height: 250px; ">
	        </td>
	        <td colspan="2">
	          <h3>{{ vo.name }}&nbsp;<span style="color:orange;">{{ vo.score }}</span></h3>
	        </td>
	      </tr>
	      <tr>
	        <td width="15%" style="color: gray">주소</td>
	        <td width="55%">{{ vo.address }}</td>
	      </tr>
	      <tr>
	        <td width="15%" style="color: gray">전화</td>
	        <td width="55%">{{ vo.phone }}</td>
	      </tr>
	      <tr>
	        <td width="15%" style="color: gray">음식종류</td>
	        <td width="55%">{{ vo.type }}</td>
	      </tr>
	      <tr>
	        <td width="15%" style="color: gray">가격대</td>
	        <td width="55%">{{ vo.price }}</td>
	      </tr>
	      <tr>
	        <td width="15%" style="color: gray">영업시간</td>
	        <td width="55%">{{ vo.time }}</td>
	      </tr>
	      <tr>
	        <td width="15%" style="color: gray">주차</td>
	        <td width="55%">{{ vo.parking }}</td>
	      </tr>
	      <tr>
	        <td width="15%" style="color: gray">테마</td>
	        <td width="55%">{{ vo.theme }}</td>
	      </tr>
	      <tr>
	        <td colspan="3">{{ vo.content }}</td>
	      </tr>
	      <tr>
	        <td colspan="3" class="text-right"></td>
	        <a href="javascript:history.back()" class="btn btn-sm btn-danger">목록</a>
	      </tr>
	    </table>
	  </div>  
	</div>
</template>
<script>
import axios from 'axios'
export default({
    data(){
        return {
            no:0,
            vo:{}
        }
    },
    // 생명주기 함수 = 자동 호출
    created(){
        // vue 객체 생성
        // 다른 화면에서 데이터를 전송 : 값읽기
        this.no=this.$route.params.no
    },
    mounted(){
        // 서버 연결
        axios.get('http://localhost:8080/web/food/detail_vue.do',{
            params:{
                no:this.no
            }
        }).then(response=>{
            console.log(response.data)
            this.vo=response.data
        })
    }
})
</script>
<style>
.row{
    margin:0px auto;
    width: 960px;
}
</style>