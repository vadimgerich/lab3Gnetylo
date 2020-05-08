<template>
    <form v-if="visible" @submit.prevent> <!-- якщо форма видима то показати її і відмінити надсилання запиту за замовчуванням-->
        <label> ПІБ <input type="text" v-model="tournir.pib" required> </label> <br>
        <label> Пол <input type="text" v-model="tournir.pol"> <inputt></label> <br>
        <label> Вік <input type="text" v-model="tournir.age"> </label> <br>
        <label> Країна <input type="number" v-model="tournir.country"> </label> <br>
        <label> Оцінки <input type="number" v-model.number="tournir.points" min="0" step="0.01"> </label> <br>  
        <input type="button" @click="save()" value="Зберегти">     
    </form>
</template>

<script>
import setInput from "./setInput";
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: "tournirForm",   
    data(){
        return{            
        }
    },
    components:{
        setInput
    },
    computed:{
        ...mapState({
            tournir:"formTournir",
            visible:"formVisible",
            newMode:"formNewMode"
        })
    },
    methods:{
        ...mapActions(["patchTournir","postTournir"]),
        ...mapMutations(["hideForm"]),
        async save(){
            if (this.newMode)
                await this.postForum(this.tournir);
            else
                await this.patchForum(this.tournir);    
            this.hideForm();         
        }
    }
}
</script>
<style scoped>
    form{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: white ;
    }
</style>