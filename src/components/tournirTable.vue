<template>
    <div>
        <p v-if="tournirList.length==0" class="alert">
            Новини відсутні
        </p>
        
        <table v-if="tournirList.length>0">
            <tr>
                <th>#</th>
                <th v-on:click="sort('pib')">  ПІБ </th>
                <th v-on:click="sort('pol')"> Пол  </th>
                <th v-on:click="sort('age')">  Вік </th>
                <th v-on:click="sort('country')"> Країна </th>
                <th v-on:click="sort('points')"> Оцінки </th>
                <th></th>
            </tr>
            <tournirTableRow v-for="(tournir,index) in tournirList" 
                v-bind:key="tournir._id" 
                v-bind="{tournir,index}"
                @remove="remove"
                @update="update" 
            >             
            </tournirTableRow>
        </table>
    </div> 
</template>

<script>
import tournirTableRow from "./tournirTableRow";
import { mapGetters, mapMutations} from 'vuex';


export default {
    name:"tournirTable",      
    data(){
        return{         
          
        }
    },
    components:{
        tournirTableRow
    },
    computed:{
       ...mapGetters({
           tournir:"filtredTournirs"
       }) 
    },    
    methods:{
        ...mapMutations({
            sort:"sortTournirs"
        })
    }    
}
</script>

<style scoped>
    .alert{
        background: yellow;
        color: crimson;
    }

    table, table td{
        border-collapse: collapse;
        border: 1px solid black;
        width: 100%;
    }
</style>