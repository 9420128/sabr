<template>
    <div class="user-filters" >
        <InputSearch :getUsersFilters="USERS_STORE.getUsersFilters"/>
    </div>

    <div class="user-filters" v-for="(filter, i) in USERS_STORE.getFilters" :key="i">
        <SelectHtml
                :label="'Filter by ' + i"
                :id="i"
                :options="filter"
                @selectChange="filterChange"
                @selectReset="filterReset"
        />
    </div>
</template>

<script>
import SelectHtml from "@/components/html/SelectHtml.vue";
import {usersStore} from "@/stores/UsersFilters";
import {defineComponent} from "vue";
import {removeClassHelper} from "@/helpers/removeClassHelper";
import InputSearch from "@/components/html/InputSearch.vue";

export default defineComponent({
    components: {InputSearch, SelectHtml},
    setup(){
        const USERS_STORE = usersStore()
        function filterChange(target){
            const parentsEl = target.closest('.options').previousElementSibling
            USERS_STORE.usersFiltersChange({value: target.textContent, id: parentsEl.id})
        }

        function filterReset(id){
            removeClassHelper('.select', 'open')
            USERS_STORE.usersFiltersReset(id)
        }

        return {
            filterChange,
            filterReset,
            USERS_STORE
        }
    }
})
</script>

<style>
</style>