# 📘 Vue Day 01 — Pinia 프로젝트 세팅 + Recipe Store 연동

> 이 프론트엔드는 **SpringBoot 레포의 Recipe REST API**(`/recipe/*_vue`)를 axios로 호출해서 동작합니다.
> 백엔드 쪽 Recipe 관련 정리: [springboot_day05.md](../SpringBoot레포/springboot_day05.md), [springboot_day06.md](../SpringBoot레포/springboot_day06.md) 참고 (경로는 실제 레포 구조에 맞게 수정)

## 0. 핵심 빠른 참조

| 구분 | Vuex (이전, Day03 정리) | Pinia (오늘) |
|------|--------------------------|--------------|
| 정의 방식 | `createStore({modules:{...}})` + 모듈별 `state/mutations/actions` | `defineStore('이름', {state, actions})` — **모듈 등록용 index.js 자체가 불필요** |
| state 변경 | 반드시 `mutations`를 거쳐 `commit`으로만 변경 | **actions 안에서 state를 직접 대입** (`this.recipe_list = response.data`) — mutation 단계 삭제 |
| 컴포넌트 연동 | `store.state.xxx`, `store.commit('mutation명')` | `storeToRefs(store)`로 반응형 변수 꺼내 쓰기, `store.action명()` 직접 호출 |
| TypeScript / Devtools | 지원 약함 | **TypeScript 공식 지원, Devtools 연동 강화** |
| Composition API | 별도 대응 필요 | **`setup()`/`<script setup>`과 자연스럽게 결합** |

| 신규 개념 | Vuex 대비 달라진 점 |
|-----------|----------------------|
| `storeToRefs(store)` | store의 state를 반응형 `ref`로 꺼내서 `<template>`에서 `.value` 없이 바로 사용 가능하게 해줌 |
| `<script setup>` | Options API(`data/methods/mounted`) 없이 변수·함수 선언만으로 템플릿과 자동 연동 |
| `useRoute()` | Vue Router의 현재 라우트 정보(파라미터 등)를 컴포지션 함수로 바로 가져옴 (Day05 Thymeleaf의 `@RequestParam`과 대응되는 개념) |

---

## 1. Pinia 개념 정리 (`App.vue` 주석 그대로)

```text
Pinia
 => Vue.js의 공식 라이브러리 : 상태관리
    상태관리 = 데이터의 변경을 관리 → HTML에 반영
 => 특징
    가볍다 → 성능 최적화
    TypeScript를 지원 (WebStorm)
    어려운 부분을 삭제 : Mutation(수정/삭제) 개념 없앰
    Composition API를 지원 : setup()
    Devtools 연동
 => 구성요소
    1. Store  : 상태관리의 핵심 (데이터 변경 관리+감지+HTML 반영)
    2. State  : 데이터 저장소 (전역 처리)
    3. Getter : computed — 가공된 값을 반환
    4. Action : 서버연결 → 데이터를 읽어온다
```

---

## 2. 프로젝트 세팅 순서

```bash
vue create pinia-project
```
```text
src 폴더에 추가로 생성
  router/  → 화면 이동 라우팅
  store/   → Pinia 스토어 파일들
  views/   → 실제 페이지 컴포넌트
```

### package.json — 추가된 의존성
```json
"dependencies": {
  "core-js": "^3.8.3",
  "vue": "^3.2.13",
  "axios": "1.19.0",       // 추가
  "vue-router": "5.2.0",   // 추가
  "pinia": "4.0.2"         // 추가
}
```
```bash
npm install          # 라이브러리 설치
```
- 크롬 확장 **Vue Devtools** 추가 설치 (Pinia store 상태를 브라우저에서 실시간 확인)

### index.html
```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
```
- 지금까지 Thymeleaf 화면(main.html)에서 쓰던 Bootstrap/jQuery CDN을 Vue 쪽 `index.html`에도 동일하게 추가 → 클래스명(`.thumbnail`, `.pagination` 등)을 그대로 재사용할 수 있게 맞춤

### main.js
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'   // 추가
import router from './router'          // 추가

const app = createApp(App)
const pinia = createPinia()            // 추가
app.use(pinia)                         // 추가
app.use(router)                        // 추가
app.mount('#app')
```

---

## 3. 라우터 — `router/index.js`

```javascript
// router ==> @GetMapping / @PostMapping (스프링 컨트롤러 매핑과 같은 역할이라는 주석)
import HomeView from '@/views/HomeView.vue'
import RecipeDetailView from '@/views/RecipeDetailView.vue'
import RecipeFindView from '@/views/RecipeFindView.vue'
import YoutubeView from '@/views/YoutubeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: "/", name: 'home', component: HomeView },
  { path: "/recipe/detail/:no", name: "recipe_detail", component: RecipeDetailView },
  { path: "/youtube/list", name: 'youtube', component: YoutubeView },
  { path: "/recipe/find", name: "recipe_find", component: RecipeFindView }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
```
- `/recipe/detail/:no` 처럼 **URL 경로에 파라미터를 직접 포함**시키는 방식 — Thymeleaf의 `@{/recipe/detail(no=${vo.no})}`(쿼리스트링) 방식과 다르게 **path 파라미터**로 설계됨

> ⚠️ **정리 메모**: 프로젝트 안에 Vuex 방식의 `store/index (1).js`(`createStore({modules:{recipes}}))`)가 함께 남아있는데, **Pinia에서는 이런 중앙 등록용 index.js가 필요 없음** — 각 View에서 `useRecipeStore()`처럼 스토어 파일을 바로 import해서 쓰면 됨. 이전 Vuex 흔적이므로 실제 사용 여부 확인 필요.

---

## 4. Pinia Store — `store/recipe.js`

```javascript
import { defineStore } from "pinia"
import axios from "axios"

export const useRecipeStore = defineStore('recipe', {
    // 1. 저장 공간(데이터) => state, Vue의 data()에 대응
    state: () => ({
        recipe_list:   { list: [], pages: [], count: 0 },
        recipe_detail: { vo: {}, mList: [], iList: [] },
        find_list:     { list: [], pages: [] }
    }),
    // 2. action => 서버와 연결, 데이터 처리 (비동기, Redux의 액션과 유사하다는 주석)
    actions: {
        async recipeListData(page) {
            const response = await axios.get('http://localhost:8080/recipe/list_vue', { params: { page } })
            this.recipe_list = response.data       // mutation 없이 바로 대입
        },
        async recipeDetailData(no) {
            const response = await axios.get('http://localhost:8080/recipe/detail_vue', { params: { no } })
            this.recipe_detail = response.data
        },
        async recipeFindData(page, fd) {
            const response = await axios.get('http://localhost:8080/recipe/find_vue', { params: { page, fd } })
            this.find_list = response.data          // store에 저장 → 모든 View에서 공유 가능
        }
    }
})
```

### ⚠️ 백엔드(SpringBoot) 확인 필요 사항
- `/recipe/find_vue`는 **Day05 정리에 이미 존재**하는 API (반환 형태 `{list, pages}`도 동일)
- `/recipe/list_vue`, `/recipe/detail_vue`는 **이번 Vue 코드에서 새로 호출하는 엔드포인트** — 지금까지 정리한 `RecipeRestController`(Day05)에는 없었으므로, **SpringBoot 쪽에 이 두 API를 추가로 구현해야 프론트가 정상 동작**함 (목록/상세를 REST로 반환하는 컨트롤러 신설 필요)

---

## 5. 화면(View) 구성

### App.vue — 전체 뼈대
```html
<template>
  <HeaderCont/>
  <router-View/>
</template>
```
- Thymeleaf의 `main.html`(`th:include="main/header"` + `th:include="${main_html}"`) 구조와 **완전히 동일한 개념** — 헤더 고정 + 본문만 라우터로 교체

### HeaderCont.vue — 네비게이션
```html
<router-link class="navbar-brand" to="/">Boot+JPA</router-link>
...
<li><router-link to="/recipe/find">레시피 검색</router-link></li>
<li><router-link to="/databoard/list">자료실</router-link></li>
<li><router-link to="/youtube/list">동영상 검색</router-link></li>
```
- Thymeleaf `<a href="...">` 대신 **`<router-link>`**로 SPA 방식 이동(새로고침 없이 화면 전환)
- `/databoard/list` 메뉴가 이미 걸려있음 — 다음 정리 때 DataBoard용 View도 추가될 것으로 예상

### HomeView.vue — 목록 + Pinia 연동 (핵심 흐름)
```text
HomeView 실행(브라우저에서 "/")
   |
<script setup> 실행
   |
Pinia recipeStore 생성 (useRecipeStore())
   |
storeToRefs()로 store에 저장된 state를 반응형으로 꺼냄
   |
onMounted() 실행
   |
recipeListData(1) 호출
   |
Pinia actions 실행 (axios 요청)
   |
recipe_list가 갱신
   |
HTML이 자동으로 갱신
```
```javascript
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRecipeStore } from '@/store/recipe'

const recipeStore = useRecipeStore()
const { recipe_list } = storeToRefs(recipeStore)   // state를 반응형으로 읽어옴

const recipeListData = async (page) => {
    await recipeStore.recipeListData(page)          // action 함수 호출
}
onMounted(() => { recipeListData(1) })               // 시작과 동시에 서버 연결

const range = (start, end) => { /* Day02~05와 동일한 페이지 번호 배열 생성 로직 */ }
```
> 주석으로 남긴 비교: **Options API(`data/methods/mounted`) 구식 방식** vs **`<script setup>`은 변수/함수 선언만으로 템플릿과 자동 연동** — Options API를 먼저 떠올리고 Composition API로 옮기는 방식으로 학습한 흔적

- 화면: `router-link :to="{name:'recipe_detail', params:{no:vo.no}}"`로 상세 이동, 페이지 번호 배열은 Day04의 `pages[]` 패턴을 그대로 `recipe_list.pages[0]~[3]`로 사용

### RecipeDetailView.vue — 상세 + 라우트 파라미터
```javascript
import { useRoute } from 'vue-router'
const route = useRoute()                              // HomeView에서 넘겨준 :no 파라미터 받기
const recipeStore = useRecipeStore()
const { recipe_detail } = storeToRefs(recipeStore)

onMounted(() => {
  recipeStore.recipeDetailData(route.params.no)        // /recipe/detail/:no 의 no값 사용
})
```
```html
<table v-for="(m, index) in recipe_detail.mList" :key="index">
  <td>{{ m }}</td>
  <td><img :src="recipe_detail.iList[index]"></td>     <!-- 인덱스로 두 배열 매칭 -->
</table>
```
- Day05 Thymeleaf `th:each="m,stat:${mList}"` + `iList[stat.index]` 패턴을 Vue의 `v-for="(m,index)"` + `iList[index]`로 **그대로 옮긴 것** — 서버 렌더링에서 클라이언트 렌더링으로 같은 로직을 이식

### RecipeFindView.vue — 검색
```javascript
const fd = ref("고구마")     // 검색어 초기값 (반응형 ref)
const recipeFindData = async (page, fd) => { await recipeStore.recipeFindData(page, fd) }
onMounted(() => { recipeFindData(1, fd.value) })
const find = () => { recipeFindData(1, fd.value) }
```
- `v-model="fd"` + `@keydown.enter="find()"` — Day05 `upload3.html`(jQuery) 없이도 Vue의 양방향 바인딩만으로 검색어 입력 처리

### YoutubeView.vue — Pinia 미사용, 순수 컴포넌트 상태 (신규 기능)
```javascript
const title = ref("서울여행")
const youtubes = ref([])
const find = async () => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${title.value}&type=video&key="MYKEY"`
    )
    const result = await response.json()
    youtubes.value = result.items
}
onMounted(() => { find() })
```
- **Pinia store를 거치지 않고** 컴포넌트 안에서 `ref`로만 상태 관리 — 다른 화면과 공유할 필요 없는 데이터는 굳이 store에 안 넣어도 된다는 걸 보여주는 예시
- YouTube Data API를 axios가 아니라 **fetch**로 직접 호출 (API 키는 `"MYKEY"`로 자리만 잡아둔 상태, 실제 키 입력 필요)
- `:src="`https://www.youtube.com/embed/${vo.id.videoId}`"` — 템플릿 리터럴을 `:src` 바인딩 안에서 사용

---

## 6. 다시 만들 때 체크리스트

```text
[프로젝트 세팅]
① vue create 프로젝트명 → src에 router/store/views 폴더 생성
② npm install axios vue-router pinia (버전은 package.json에 명시)
③ index.html에 필요한 CDN(Bootstrap/jQuery 등) 백엔드 화면과 통일해서 추가
④ main.js: createPinia() → app.use(pinia), createRouter → app.use(router)

[라우터]
⑤ routes 배열에 path/name/component 정의, path에 :파라미터 넣으면 useRoute().params로 수신
⑥ App.vue는 공통 Header + <router-View/>로 뼈대만 구성 (Thymeleaf layout include와 동일 개념)

[Pinia Store]
⑦ defineStore('이름', {state:()=>({...}), actions:{...}})만 작성하면 끝 — Vuex처럼 index.js에 모듈 등록 불필요
⑧ actions 안에서 axios 호출 후 this.state이름 = response.data 로 바로 대입 (mutation 단계 없음)
⑨ 여러 화면이 공유해야 하는 데이터만 store에 넣고, 화면 전용 데이터(예: Youtube 검색어)는 로컬 ref로 처리

[View 컴포넌트]
⑩ <script setup> + storeToRefs(store)로 state를 반응형으로 꺼내 템플릿에 바로 바인딩
⑪ onMounted()에서 최초 데이터 로드 (Thymeleaf의 Controller 진입 시 Model 세팅과 같은 타이밍 개념)
⑫ 목록↔상세 이동은 router-link :to="{name, params}", 페이지네이션은 Day04 pages[] 배열 패턴 재사용

[백엔드 연동 확인]
⑬ Vue가 호출하는 API(list_vue/detail_vue/find_vue 등)가 SpringBoot RestController에 실제로 존재하는지 항상 교차 확인
⑭ 없는 API는 SpringBoot 레포 쪽 작업으로 별도 기록해두기 (오늘은 list_vue, detail_vue 신규 구현 필요)
```

---
