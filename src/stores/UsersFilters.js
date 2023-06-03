import { defineStore } from 'pinia'
import {filterHelper} from "@/helpers/filterHelper";

export const usersStore = defineStore('usersFilters',{
    id: 'usersFilters',
    state: () => ({
        usersFiltersEl: {},
        usersFilters: {
            country: [
                {id: 1, value: 1, title: 'russia'},
                {id: 2, value: 2, title: 'usa'}
            ],
            score: [
                {id: 1, value: 1, title: '> 20'},
                {id: 2, value: 2, title: '< 10'}
            ]
        },
        users: [
            {
                id: 1,
                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                title: 'Brunch this weekend? <span class="grey--text text--lighten-1">72</span>',
                subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                country: 'russia',
                score: 72,
                address: 'Russia, Lenina st., kv 28'
            },
            {
                id: 2,
                avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                title: 'Summer BBQ <span class="grey--text text--lighten-1">usa 7</span>',
                subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
                country: 'usa',
                score: 7,
                address: 'USA, Busha st., kv 28'
            },
            {
                id: 3,
                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                title: 'Oui oui',
                subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
                country: 'usa',
                score: 7,
                address: 'USA, Abama st., kv 28'
            },
            {
                id: 4,
                avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                title: 'Birthday gift',
                subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
                country: 'usa',
                score: 72,
                address: 'USA, Trampa st., kv 28'
            },
            {
                id: 5,
                avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                title: 'Recipe to try',
                subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                country: 'russia',
                score: 7,
                address: 'Russia, Stalina st., kv 28'
            },
        ],
        //
        // creative
        //
        creativeStatus: false,
        creativeStatePreloader: false,
        creativeFilters: {},
        creativeUsers: []
    }),
    getters: {
        getFilters(state){
            if(state.creativeStatus) {
                return state.creativeFilters
            }
            else return state.usersFilters
        },
        getUsersFilters(state){

            const array = state.creativeStatus ? state.creativeUsers : state.users

            let usersStore = []

            if(Object.keys(state.usersFiltersEl).length){

                for(let key in state.usersFiltersEl) {

                    const filter = state.usersFiltersEl[key]

                    if(array.length) {

                        const regZnack = /^[><]/gm.exec(filter)
                        const regNum = /\d+/gm.exec(filter)
                        const znack = regZnack !== null ? regZnack[0] : null
                        const data = znack !== null && regNum !== null ? regNum[0] : filter

                        if(usersStore.length) {

                            return filterHelper(usersStore, key, data, znack)

                        }

                        usersStore = filterHelper(array, key, data, znack)

                    }

                }

                return usersStore

            } else return array

        }

    },
    actions: {
        usersFiltersChange({value, id}) {
            this.usersFiltersEl[id] = value
            return true
        },
        usersFiltersReset(id){
            delete this.usersFiltersEl[id]
        },
        //
        // creative
        //
        setCreativeFilters(val){
            this.creativeFilters = val
        },
        setCreativeUsers(val){
            this.creativeUsers = val
        },
        creativeStatePreloaderChange(val){
            this.creativeStatePreloader = val
        },
        creativeStatusChange(val){
            this.creativeStatus = val
            this.usersFiltersEl = {}
        },
    }
})