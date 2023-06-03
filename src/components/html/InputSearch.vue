<template>
    <form class="select search" :class="{open: options.length}" @submit.prevent="searchSubmit">
        <button type="submit" class="search__btn">
            <svg width="20" height="20" viewBox="0 0 20 20"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"></circle><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"></path></svg>
        </button>
        <input
                type="text"
                maxlength="7"
                class="select-trigger input"
                placeholder="Search all"
                v-model="searchInput"
                @input="inputChange"
        >
        <div v-if="options.length" class="options">
            <span
                    class="option"
                    v-for="option in options"
                    :key="option.id"
                    @click="optionClick(option.id, $event.target)"
            >
                <span v-html="optionValue(option)"></span>
            </span>
        </div>
        <SelectCloseBtn v-if="btnCloseFlag && searchInput" @click="filterReset" />
    </form>
</template>

<script>
import {ref, toRefs, watch} from "vue";
import SelectCloseBtn from "@/components/html/SelectCloseBtn.vue";
import {usersStore} from "@/stores/UsersFilters";

export default {
    name: "InputSearch",
    components: {SelectCloseBtn},
    props: {
        getUsersFilters: Array
    },
    setup(props){
        let searchInput = ref('')
        let options = ref([])
        let btnCloseFlag = ref(false)
        let usersFiltersId = []
        const USERS_STORE = usersStore()
        const {creativeStatus} = toRefs(USERS_STORE)

        function inputChange(){
            options.value = []
            usersFiltersId = []

            if(searchInput.value.length > 7) return

            if(searchInput.value.length > 2 && props.getUsersFilters.length){

                searchInput.value = searchInput.value.toLowerCase()

                const keys = Object.keys(props.getUsersFilters[0])
                btnCloseFlag.value = true

                keys.forEach(key => {
                    props.getUsersFilters.forEach(el => {
                        const val = typeof el[key] === 'string' ? el[key].toLowerCase().indexOf(searchInput.value) : -1

                        if(val >= 0){

                            let indexValue = {'start' : val, 'end' : val + searchInput.value.length, key}
                            options.value.push({...el, ...indexValue})
                            usersFiltersId.push(el['id'])

                        }
                    })

                })

            } else USERS_STORE.usersFiltersReset('usersFiltersId')
        }

        function filterReset(){
            options.value = []
            btnCloseFlag.value = false
            searchInput.value = ''
            USERS_STORE.usersFiltersReset('usersFiltersId')
        }

        function searchSubmit(){
            if(Object.keys(usersFiltersId).length){
                USERS_STORE.usersFiltersReset('usersFiltersId')
                const arr = [...new Set(usersFiltersId)]
                USERS_STORE.usersFiltersChange({value : arr, id : 'usersFiltersId'})
                options.value = []
            }
        }

        function optionClick(id, target){
            searchInput.value = target.textContent
            let arr = [id]
            USERS_STORE.usersFiltersChange({value : arr, id : 'usersFiltersId'})
            options.value = []
            document.addEventListener('click', searchActiveRemove)
        }

        function optionValue(option){
            let str = option[option.key]
            let val = str.slice(option[0], option.start) +
                `<span style="background: #a89afc">${str.slice(option.start, option.end)}</span>` +
                str.slice(option.end)

            return `<b>${option.key}:</b> ${val}`
        }

        function searchActiveRemove(e){
            if(e.target.closest('.search.open') === null){
                options.value = []
                document.removeEventListener('click', searchActiveRemove)
            }
        }

        watch( creativeStatus, (newValue, oldValue) => {
            searchInput.value = ''
        })

        return {
            searchInput,
            options,
            btnCloseFlag,
            inputChange,
            filterReset,
            searchSubmit,
            optionValue,
            optionClick
        }
    }
}
</script>

<style lang="scss">
.search{

  &__btn{
    position: absolute;
    right: 0;
    left: auto;
    cursor: pointer;
    height: 44px;
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    fill: currentcolor;
    z-index: 1;
    // normalize
    border: none;
    background-color: transparent;
  }
}
.input{
  border: none;
  -webkit-appearance: none;
  utline: none;
  appearance: none;
  cursor: inherit;

  &.select-trigger{
    padding-right: 72px;
  }
}
</style>