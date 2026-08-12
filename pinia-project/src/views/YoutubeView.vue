<template>
    <div class="container">
        <div class="row">
            <input type="text" size="20"
             class="input-sm" v-model="title" @keydown.enter="find">
            <button type="button" class="btn-sm btn-primary" @click="find">검색</button>
        </div>
        <div class="row" style="margin-top: 10px;">
            <div class="col-sm-4" v-for="(vo,index) in youtubes" :key="index">
                <div class="thumbnail">
                    <iframe style="width: 280px;height: 180px;"
                     :src="`https://www.youtube.com/embed/${vo.id.videoId}`"
                    ></iframe>
                    <div class="caption">
                        <p>{{ vo.snippet.title }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
const title=ref("서울여행")
// react => const title=useState('')
const youtubes = ref([])
onMounted(()=>{
    find()
})
const find=async()=>{
    try
    {
        const response=await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${title.value}&type=video&key="MYKEY"
        `)
        // 결과값 받기
        const result=await response.json()
        console.log(result)
        console.log(result.items)
        youtubes.value=result.items
    }catch(error){
        console.log("error",error)
    }
}
</script>
<style>
.row{
    width: 960px;
    margin: 0px auto;
}
button{
    margin-left: 10px;
}
p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>