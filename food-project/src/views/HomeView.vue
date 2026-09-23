<template>
  <div class="container">
    <div class="row">
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
/*
     1. JSP  <c:forEach>  = ${}
     2. Vue  v-for=""   {{}}
     3. ThymeLeaf th:each="" [[]]
     4. React  arr.map(()=>{}) {}

     => npm run lint -- --no-cache
*/
import axios from "axios";
export default {
  data() {
    return {
      food_list: [],
      curpage: 1,
      totalpage: 0,
      startPage: 0,
      endPage: 0,
    };
  },
  mounted() {
    this.dataRecv();
  },
  methods: {
    dataRecv() {
      axios
        .get("http://localhost:8080/web/food/list_vue.do", {
          params: {
            page: this.curpage,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.food_list = response.data.list;
          this.curpage = response.data.curpage;
          this.totalpage = response.data.totalpage;
          this.startPage = response.data.startPage;
          this.endPage = response.data.endPage;
        });
    },
    range(start, end) {
      let arr = [];
      let len = end - start;
      for (let i = 0; i <= len; i++) {
        arr[i] = start;
        start++;
      }
      return arr;
    },
    move(page) {
      this.curpage = page;
      this.dataRecv();
    },
  },
};
</script>
<style>
p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.row {
  width: 960px;
  margin: 0px auto;
}
.a-link {
  cursor: pointer;
}
</style>