<template>
<div class="user-list__wrap" :class="{'user-list__anime': animeClass}">
    <h3>{{ heading }}</h3>
    <Preloader/>
    <users-list-item
            v-if="users.getUsersFilters.length"
            v-for = '(user, i) in users.getUsersFilters'
            :key = 'i'
            :img = 'user.avatar'
            :title = 'user.title'
            :subtitle = 'user.subtitle'
            :address = 'user.address'
    />
    <div v-else class="user-list__empty user-list">
        <h3>Not found ;)</h3>
    </div>
</div>
</template>

<script>
import UsersListItem from "@/components/app/filters/list/UsersListItem.vue";
import { usersStore } from "@/stores/UsersFilters"
import {defineComponent, ref, watch} from "vue";
import Preloader from "@/components/app/Preloader.vue";

export default defineComponent({
    components: {Preloader, UsersListItem},
    setup(){
        const heading = 'List'
        let animeClass = ref(true)
        const users = usersStore()

        watch(users, () => {
            animeClass.value = false
            setTimeout(() => {
                animeClass.value = true
            }, 300)
        })

        return {
            users,
            heading,
            animeClass
        }
    }

})
</script>

<style lang="scss">
.user-list__wrap{
  display: block;
  max-width: 450px;
  box-shadow: var(--card-shadow);
  background-color: #FFFFFF;
  border-color: #FFFFFF;
  color: var(--h1-color);
  transition: .3s;
  opacity: 0;

  > h3 {
    color: var(--h2-color);
    display: flex;
    align-items: center;
    height: 48px;
    font-size: 0.875rem;
    font-weight: 400;
    padding: 0 16px 0 16px;
  }
}

.user-list__empty{
  width: 320px;

  >h3{
    font-size: 1em;
    padding: 0 16px;
  }
}

.user-list__anime{
  opacity: 1;
}

@media (max-width: 960px) {
  .user-list__wrap{
    margin: auto;
  }
}
</style>