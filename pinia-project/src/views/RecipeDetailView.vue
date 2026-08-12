<template>
  <div class="container">
    <div class="row">
      <table class="table">
        <tbody>
        <tr>
          <td colspan="3" class="text-center">
            <img :src="recipe_detail.vo.poster" style="width: 750px;height: 350px;object-fit:cover">
          </td>
        </tr>
        <tr>
          <td colspan="3" class="text-center">
            <h3>{{ recipe_detail.vo.title }}</h3>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="text-center">
            {{ recipe_detail.vo.content }}
          </td>
        </tr>
        <tr>
          <td colspan="3" class="text-center">
            <a href="javascript:history.back()" class="btn btn-sm btn-danger">목록</a>
          </td>
        </tr>
        <tr>
          <td class="text-center"><img src="/icon/a1.png"></td>
          <td class="text-center"><img src="/icon/a2.png"></td>
          <td class="text-center"><img src="/icon/a3.png"></td>
        </tr>
        <tr>
          <td class="text-center">{{ recipe_detail.vo.info1 }}</td>
          <td class="text-center">{{ recipe_detail.vo.info2 }}</td>
          <td class="text-center">{{ recipe_detail.vo.info3 }}</td>
        </tr>
        </tbody>
      </table>

      <table>
        <table>
        <tr>
          <td colspan="2"><h3>[조리순서]</h3></td>
        </tr>
        <tr>
          <td>
            <table
              class="table"
              v-for="(m, index) in recipe_detail.mList"
              :key="index"
            >
              <tr>
                <td width="80%" class="text-left">{{ m }}</td>
                <td width="20%" class="text-right">
                  <img
                    :src="recipe_detail.iList[index]"
                    style="width: 170px;height: 120px"
                    class="img-rounded"
                  >
                </td>
              </tr>
            </table>
          </td>
        </tr>
        </table>
      </table>

      <table class="table">
        <table>
        <tr>
          <td colspan="2"><h3>[레시피 작성자]</h3></td>
        </tr>
        <tr>
          <td width="30%" class="text-center" rowspan="2">
            <img
              :src="recipe_detail.vo.chef_poster"
              style="width: 100px;height: 100px"
              class="img-circle"
            >
          </td>
          <td width="70%"><b>{{ recipe_detail.vo.chef }}</b></td>
        </tr>
        <tr>
          <td width="70%">{{ recipe_detail.vo.chef_profile }}</td>
        </tr>
        </table>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'; // action에 등록 함수
import { useRecipeStore } from '@/store/recipe';

const route = useRoute(); // HomeView에 넘겨준 데이터를 받는 경우
const recipeStore = useRecipeStore();
const { recipe_detail } = storeToRefs(recipeStore);

onMounted(() => {
  recipeStore.recipeDetailData(route.params.no);
  console.log(route.params.no);
});
</script>

<style>
.row {
  margin: 0px auto;
  width: 850px;
}
</style>