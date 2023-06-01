<template>
    <div class="user-list">
        <div class="user-list__img-link">
            <img :src="img" alt="" class="user-list__img" @click="addressFlag = !addressFlag">
            <Address
                    v-if="addressFlag"
                    :data="address"
            />
        </div>
        <div class="user-list__body">
            <h3 v-html="title"></h3>
            <div class="user-list__subtitle" v-html="subtitle"></div>
        </div>
    </div>
</template>

<script>
import Address from "@/components/app/Address.vue";
import {defineComponent, onMounted, ref} from "vue";

export default defineComponent ({
    components: {Address},
    props: {
        img: String,
        title: String,
        subtitle: String,
        address: String
    },
    setup(){
        const addressFlag = ref(false)

        function addressRemove(e){
            if(e.target.closest('.user-list__img') === null){
                addressFlag.value = false
            }
        }

        onMounted(() => {
            document.addEventListener('click', addressRemove)
        })

        return {
            addressFlag
        }
    }
})
</script>

<style lang="scss">
.user-list__anime .user-list,
.user-list__anime .user-list:nth-child(odd){
  transform: translateX(0);
  opacity: 1;
}
.user-list{
  display: flex;
  min-height: 88px;
  position: relative;
  transition: 0.3s;
  transform: translateX(100%);
  opacity: 0;

  &:nth-child(odd){
    transform: translateX(-100%);
  }

  &:not(:last-child):after,
  &:not(:last-child):before{
    content: '';
    position: absolute;
    left: 72px;
    //left: calc(100% - 72px);
    height: 1px;
    bottom: 16px;
    right: 0;
    background-color: var(--border-solid);
    transition: right 0.3s ease-out
  }

  &:not(:last-child):before{
    right: 100%;
  }

  &:hover::before,
  &:focus::before {
    right: 0;
    background-color: red;
  }

  > * {
    display: flex;
    box-sizing: border-box;
  }

  &__img-link{
    padding: 0 15px;
    position: relative;
  }

  &__img{
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }

  &__body{
    flex-direction: column;

    > * {
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      padding-right: 16px;
    }

    > h3{
      color: var(--h1-color);
      padding-bottom: 2px;
      white-space: nowrap;
      font-size: 1rem;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  &__subtitle{
    white-space: initial;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    padding-right: 16px;
    color: var(--h2-color);
    font-size: 0.875rem;
  }

  .text--primary{
    color: var(--h1-color)
  }

  .grey--text {
      color: #bdbdbd;
      caret-color: #bdbdbd
    }
}
</style>