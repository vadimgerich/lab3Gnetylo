<template>
  <div id="app">    
    <messageSystem></messageSystem>
    <searchString></searchString>
    <hr>
    <queryForm></queryForm>
    <hr>
    <input type="button" @click="showAddForm" value=" Додати кнгу" />
    <tournirTable></tournirTable>
    <tournirForm></tournirForm>
  </div>
</template>

<script>
import Vue from "vue";
import forumTable from "./components/forumTable";
import forumForm from "./components/forumForm";
import searchString from "./components/searchString";
import queryForm from "./components/queryForm";
import messageSystem from "./components/messageSystem";
import axios from "axios";
import { mapActions } from 'vuex';

export default {
  //назва компоненту, співпадає із назвою файла  
  name: "app",
  //компоненти які використовуються в додатку
  components: {
    tournirTable,
    tournirForm,
    searchString,
    queryForm,
    messageSystem
  },
  //дані компонента на початку
  data() {
    return {        
    };
  },
  //коли додаток створено то треба завантажити список книг із сервера 
  mounted() {    
    this.getTournirs(); 
  },  //методи 
  methods: {
    ...mapActions(["showMessageForTime", "getTournirs", "showAddForm"]),   
  },
  
};
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
}
</style>