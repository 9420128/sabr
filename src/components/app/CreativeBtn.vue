<template>
<div class="creative-btn" @click="btnClick">
    <span class="creative-btn__body" :class="{'creative-btn__active': btnFlag}">
        <svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="white" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.3,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6"></path><polyline fill="none" stroke="white" points="11.75 16 9.5 18.25 7.25 16"></polyline><path fill="none" stroke="white" d="M9.5,18 L9.5,9.5"></path></svg>
    </span>
</div>
</template>

<script>
import {defineComponent, ref} from "vue";
import {usersStore} from "@/stores/UsersFilters";

export default defineComponent ({
    name: "CreativeBtn",
    setup(){
        const USERS_STORE = usersStore()
        let btnFlag = ref(false)
        async function btnClick(){
            btnFlag.value = !btnFlag.value

            if(btnFlag.value === true) {
                USERS_STORE.creativeStatusChange(true)
                try {
                    USERS_STORE.creativeStatePreloaderChange(true)
                    fetch('https://jsonplaceholder.typicode.com/users')
                        .then(response => response.json())
                        .then(json => {
                            let arrUsers = []
                            let arrFilters = {username: [], city: [], name: []}
                            json.forEach((el, i) => {
                                let obj = {
                                    id: el.id,
                                    avatar: `https://cdn.vuetifyjs.com/images/lists/${el.id > 5 ? el.id - 5 : el.id}.jpg`,
                                    title: el.name,
                                    subtitle: el.company.catchPhrase,
                                    address: el.address.city + ', st. ' + el.address.street,
                                    score: el.username,
                                    // filter data
                                    username: el.username,
                                    city: el.company.catchPhrase,
                                    name: el.name,
                                }

                                arrUsers.push(obj)
                                arrFilters.username.push({id: el.id, title: obj.score})
                                arrFilters.city.push({id: el.id, title: obj.city})
                                arrFilters.name.push({id: el.id, title: obj.title})
                            })

                            USERS_STORE.setCreativeFilters(arrFilters)
                            USERS_STORE.setCreativeUsers(arrUsers)
                            USERS_STORE.creativeStatePreloaderChange(false)

                        })
                } catch (e) {
                    console.error(e)
                }
            }
            else{
                USERS_STORE.creativeStatusChange(false)
            }
        }

        return {
            btnClick,
            btnFlag
        }
    }
})
</script>

<style lang="scss">
.creative-btn{
  position: fixed;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  right: 40px;
  top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--red-color);
  cursor: pointer;
  z-index: 3;
  transition: .3ms;

  &__active{
    transform: rotate(180deg);
  }

  &:hover{
    box-shadow: var(--card-shadow);
  }

  &__body{
    font-size: 1.7rem;
  }
}
</style>