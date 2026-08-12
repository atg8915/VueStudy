<div align="center">

# 🖼️ VueStudy

**Vue 3 + Pinia 기반 프론트엔드 학습 저장소**
SpringBoot 백엔드(REST API)와 연동하며 매일 배운 내용을 정리합니다.

![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-State%20Management-FFD859?logo=pinia&logoColor=black)
![Vue Router](https://img.shields.io/badge/Vue%20Router-5.x-4FC08D?logo=vuedotjs&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?logo=axios&logoColor=white)
![License](https://img.shields.io/badge/study-personal-lightgrey)

</div>

---

## 📌 소개

이 저장소는 **Vue 3(Composition API) + Pinia**를 학습하며 매일 정리한 노트를 쌓아두는 공간입니다.
백엔드는 별도 저장소인 **[SpringBoot 레포](../SpringBoot레포)** 에서 관리하며, 이 프론트엔드는 그 REST API(`/recipe/*_vue`, `/food/*_vue` 등)를 axios로 호출해 동작합니다.

> 🔗 **백엔드 연동 저장소**: [SpringBoot-RecipeApp](../SpringBoot레포) — 실제 경로로 교체해서 사용하세요

---

## 🗂️ 학습 목차

| Day | 주제 | 핵심 내용 | 노트 |
|:---:|------|-----------|:---:|
| 01 | Pinia 프로젝트 세팅 | Pinia+Router+axios 세팅, recipe Store(state/actions), Home·Detail·Find·Youtube View 구현 | [📄 보기](./study-notes/vue_day01.md) |
| 02 | *(다음 학습 예정)* | | |

> 새 학습일이 추가되면 이 표에 한 줄씩 이어서 채워주세요.

---

## 🧱 기술 스택

<div align="center">

| 분류 | 기술 |
|------|------|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| 상태관리 | Pinia (`defineStore`, `storeToRefs`) |
| 라우팅 | Vue Router 5 (`createWebHistory`) |
| HTTP 통신 | Axios |
| UI | Bootstrap 3 (CDN), jQuery (CDN) |
| 연동 백엔드 | Spring Boot REST API (`@CrossOrigin`) |

</div>

---

## 📁 프로젝트 구조

```text
src/
 ├─ components/
 │   └─ HeaderCont.vue      # 공통 네비게이션 (App.vue에 고정)
 ├─ views/                  # 라우터로 연결되는 실제 화면
 │   ├─ HomeView.vue
 │   ├─ RecipeDetailView.vue
 │   ├─ RecipeFindView.vue
 │   └─ YoutubeView.vue
 ├─ router/
 │   └─ index.js            # 경로 ↔ 컴포넌트 매핑
 ├─ store/
 │   └─ recipe.js           # Pinia store (state + actions)
 ├─ App.vue                 # 공통 레이아웃 뼈대 (Header + router-view)
 └─ main.js                 # Pinia/Router 앱 등록
```

---

## 🔄 Pinia 데이터 흐름

```text
View(onMounted)
   │
   ▼
useXxxStore()  →  storeToRefs(store)  →  state를 반응형으로 구독
   │
   ▼
store.action() 호출
   │
   ▼
axios.get(SpringBoot API)
   │
   ▼
this.state = response.data   (mutation 없이 즉시 반영)
   │
   ▼
템플릿 자동 갱신
```

---

## ⚙️ 실행 방법

```bash
npm install     # 의존성 설치 (axios / vue-router / pinia 포함)
npm run serve   # 개발 서버 실행
```

> 백엔드(SpringBoot)가 `localhost:8080`에서 `@CrossOrigin`으로 함께 떠 있어야 API 호출이 정상 동작합니다.

---

## 📝 정리 규칙

각 `Day` 노트는 아래 구성을 기본으로 합니다.

1. **핵심 빠른 참조** — 어제 대비 달라진 점을 표로 요약
2. **개념/코드 정리** — 원본 주석을 최대한 살려서 섹션별 정리
3. **비교표** — Vuex ↔ Pinia, Thymeleaf ↔ Vue처럼 대응 개념 정리
4. **다시 만들 때 체크리스트** — 재현 가능하도록 순서대로 정리
5. **README 한 줄 요약** — 위 목차 표에 추가할 문구
