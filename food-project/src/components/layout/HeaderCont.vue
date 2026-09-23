<template>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
            <router-link class="navbar-brand" to="/">SpringMVC</router-link>
            </div>
            <ul class="nav navbar-nav">
            <li class="active"><router-link to="/">Home</router-link></li>
            <li><router-link to="/food/find">맛집 검색</router-link></li>
            <li><router-link to="/databoard/list">자료실</router-link></li>
            </ul>
        </div>
    </nav>
</template>