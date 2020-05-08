import Vuex from 'vuex';
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        pib:"",
        age:"",
        pol: "",
        country:"",
        points:0
    },
    getters: {
        firstMessage(state) {
            return state.messages[0];
        },
        areSomeMessages(state) {
            return state.messages.length > 0;
        },
        messagesCount(state) {
            return state.messages.length
        },
        filtredTournirs(state) {
            let result = state.tournirs;
            if (state.searchString)
                result = result.filter(tournir =>
                    tournir.title.toLowerCase().includes(state.searchString.toLowerCase())
                );
            return result;
        },

    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message);
        },
        removeMessage(state) {
            state.messages.shift();
        },


        setTournirs(state, tournirs) {
            state.tournirs = tournirs;
        },
        addTournir(state, tournir) {
            state.tournirs.push(tournir);
        },
        removeTournir(state, tournir) {
            const index = state.tournirs.indexOf(tournir);
            state.tournirs.splice(index, 1);
        },
        updateTournir(state, tournir) {
            const index = state.tournirs.findIndex(b => b._id == tournir._id);
            Vue.set(state.tournirs, index, tournir);
        },
        sortTournirs(state, field) {
            state.tournirs.sort((b1, b2) => b1[field] >= b2[field] ? 1 : -1);
        },

        showForm(state) {
            state.formVisible = true;
        },
        hideForm(state) {
            state.formVisible = false;
        },
        newFormMode(state) {
            state.formNewMode = true;
        },
        updateFormMode(state) {
            state.formNewMode = false;
        },

        clearFormTournir(state) {
            Object.assign(state.formForum, {
                pib: "",
                pol: "",
                age:0,
                country:"",
                point: 0,
            });
        },
        setFormTournir(state, tournir) {
            state.formTournir = tournir;
        },
        setSerchString(state, string){
            state.searchString = string;
        }
    },
    actions: {
        async showMessageForTime(context, options) {
            const delay = options.delay || 5000;
            context.commit('addMessage', options.message);
            setTimeout(function () {
                if (context.getters.areSomeMessages)
                    context.commit('removeMessage');
            },
                delay);
        },


        async getTournirs(context) {
            try {
                let resp = await axios.get("http://localhost:5000/tournir");
                context.commit("setTournirs", resp.data);
                await context.dispatch("showMessageForTime", { message: "новини завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async getTournirById(context, id) {
            try {
                let resp = await axios.get(`http://localhost:5000/tournir/${id}`);
                await context.dispatch("showMessageForTime", { message: "Новини завантажено", delay: 500 });
                return resp.data;
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async getTournirsByQuery(context, query) {
            try {
                let resp = await axios.get("http://localhost:5000/tournir", { params: query });
                context.commit("setNews", resp.data);
                await context.dispatch("showMessageForTime", { message: "Новини завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }

        },
        async postTournir(context, tournir) {
            try {
                let resp = await axios.post("http://localhost:5000/tournir", tournir);
                context.commit("addTournir", resp.data);
                await context.dispatch("showMessageForTime", { message: "Новину додано", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async deleteTournir(context, tournir) {
            try {
                let resp = await axios.delete(`http://localhost:5000/tournir/${tournir._id}`);
                context.commit("removeTournir", resp.data);
                await context.dispatch("showMessageForTime", { message: "Новини вилучено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async patchTournir(context, tournir) {
            try {
                let resp = await axios.patch(`http://localhost:5000/tournir/${tournir._id}`, tournir);
                context.commit("updateTournir", resp.data);
                await context.dispatch("showMessageForTime", { message: "Новини оновлено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async showUpdateForm(context, tournir) {
            tournir = await context.dispatch("getTournirById", tournir._id);
            context.commit("setFormTournir", tournir);
            context.commit("updateFormMode");
            context.commit("showForm");
        },
        showAddForm(context) {
            context.commit("clearFormTournir");
            context.commit("newFormMode");
            context.commit("showForm");
        }
    }
});
export default store;
