// рядок що відбражає 1 книгу
<template>
    <tr>        
        <td> {{index}} </td>
        <td> {{tournir.pib}} </td>
        <td> {{tournir.age}} </td>
        <td> {{tournir.pol}} </td>
        <td> {{tournir.country}} </td>
        <td> {{tournir.points}} </td>
        <td>
            <input type="button" value="Вилучити" @click="remove(index)">
            <input type="button" value="Редагувати" @click="update(index)">
        </td>        
    </tr>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name:"tournirTableRow",
    props:{
        index:Number,
        tournir:Object        
    },
    data(){   
        return{

        }
    },
    methods:{ 
        ...mapActions(["deleteTournir", "showUpdateForm"]),
        updated(){
        console.log(this.tournir);
        }            
    }
}
</script>

<style scoped>
    td{
        border: 1px solid black;
    }
</style>