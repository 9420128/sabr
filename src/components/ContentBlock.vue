<template>
  <div class="content">
    <div class="center">
      <h1 v-if="USERS_STORE.creativeStatus">Fetch 'https://jsonplaceholder.typicode.com/users'</h1>
      <h1 v-else>Pinia storage</h1>
    </div>
    <div class="row">
      <div>
        <UsersFilters/>
      </div>
      <div>
        <UsersList/>
      </div>
    </div>
  </div>
</template>

<script>
import UsersFilters from "@/components/app/filters/UsersFilters.vue";
import UsersList from "@/components/app/filters/list/UsersList.vue";
import {usersStore} from "@/stores/UsersFilters";

export default {
  name: 'ContentBlock',
  components: {UsersList, UsersFilters},
  setup(){
    const USERS_STORE = usersStore()

    return {
      USERS_STORE
    }
  }
}
</script>

<style lang="scss">
  .content{
    max-width: 900px;
    width: 100%;
    padding: 12px;
    margin-right: auto;
    margin-left: auto;
    box-sizing: border-box;
    flex: 1 0 auto;
  }

  .row{
    display: flex;
    //align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    > * {
      flex: 0 0 100%;
      max-width: 100%;
      width: 100%;
      padding: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
  }

  .center{
    text-align: center;
  }

  h1{
    font-size: 1.2rem;
    margin-bottom: 30px;
  }

  h3 {
    margin: 30px 0 0;
  }

  @media (min-width: 960px) {
    .row > * {
      flex: 0 0 33.3333333333%;
      max-width: 33.3333333333%;
      width: 100%;
      padding: 12px;
    }
  }
</style>
