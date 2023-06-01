<template>
<div v-if="USERS_STORE.creativeStatePreloader" class="preloader">
    <h2>Загрузка ...</h2>
</div>
</template>

<script>
import {usersStore} from "@/stores/UsersFilters";

export default {
    name: "Preloader",
    setup(){
        const USERS_STORE = usersStore()

        return {
            USERS_STORE
        }
    }
}
</script>

<style scoped>
.preloader{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.99);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}
</style>