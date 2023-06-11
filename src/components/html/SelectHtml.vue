<template>
    <div class="select" :class="{open: selectClass}">
        <span class="select-trigger" @click="triggerClick" :id="id" ref="sel">
            {{ label }}
        </span>
        <div class="options">
            <span
                    class="option"
                    v-for="option in options"
                    :key="option.id"
                    @click="changeOption"
            >
                {{ option.title }}
            </span>
        </div>
        <SelectCloseBtn v-if="btnCloseFlag" @click="filterReset(id)" />
    </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import SelectCloseBtn from "@/components/html/SelectCloseBtn.vue";
import {removeClassHelper} from "@/helpers/removeClassHelper";

export default defineComponent ({
    components: {SelectCloseBtn},
    props: {
        modelValue: String,
        modelResetValue: String,
        id: [String, Number],
        label: String,
        options: Array,
    },
    emits: ['selectChange', 'selectReset'],
    setup(props, { emit }){
        let btnCloseFlag = ref(false)
        const sel = ref(0)
        let selectClass = ref(false)

        function changeOption(event) {
            btnCloseFlag.value = true
            removeClassHelper('.option', 'active')
            selectClass.value = false
            event.target.classList.add('active')
            sel._value.textContent = event.target.textContent
            emit('selectChange', event.target)
        }

        function triggerClick(){
            selectClass.value = !selectClass.value
            document.addEventListener('click', selectActiveRemove)
        }

        function filterReset(id){
            btnCloseFlag.value = false
            removeClassHelper('.option', 'active')
            selectClass.value = false
            emit('selectReset', id)
            sel._value.textContent = props.label
        }

        function selectActiveRemove(e){
            if(e.target.closest('.select.open') === null){
                selectClass.value = false
                    document.removeEventListener('click', selectActiveRemove)
            }
        }

        return{
            btnCloseFlag,
            sel,
            selectClass,
            changeOption,
            triggerClick,
            filterReset,
        }
    },

})

</script>

<style lang="scss">
.select{
  display: flex;
  align-items: center;
  gap: 0.25em;
  flex-direction: column;
  width: 100%;
  position: relative;
  transition: .3s;

  &:hover{
    box-shadow: var(--card-shadow);
  }

  &::after{
    content: "";
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    margin-left: auto;
    background-repeat: no-repeat;
    background-size: 1em;
    transition: transform 0.2s ease-in-out;
    position: absolute;
    right: 14px;
    top: calc(100% - 30px);
  }

  &:not(.search):after{
    background-image: var(--accordion-icon);
  }

  &-trigger{
    font-size: 14px;
    font-weight: 500;
    line-height: 140%;
    align-items: center;
    width: 100%;
    height: 44px;
    cursor: pointer;
    padding: 0 60px 0 18px;
    display: flex;
    border-bottom: 1px solid var(--border-solid);
    background: #fff;
    box-sizing: border-box;
  }
}

.options{
  position: absolute;
  flex-direction: column;
  z-index: 11;
  top: 100%;
  left: 0;
  right: 0;
  transition: var(--selct-transition);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  display: flex;
  box-shadow: var(--card-shadow);
  background-color: #FFFFFF;
  color: var(--h1-color);
  overflow: auto;
  max-height: 220px;
}

.option {
  padding: 13px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: var(--selct-transition);
}

.select.open .options {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}

.select.open:not(.search)::after {
  transform: rotate(-180deg);
}

.option.active{
  opacity: .8;
}

.option:hover, .option.active {
  background: var(--selct-hover-color);
}

</style>