<template>
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

export default defineComponent({
    components: {SelectHtml},
    setup(){
        const USERS_STORE = usersStore()
        function filterChange(target){
            USERS_STORE.usersFiltersChange({value: target.textContent, id: target.dataset.id})
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