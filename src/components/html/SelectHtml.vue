<template>
    <div class="select" :class="{open: selectClass}">
        <span class="select-trigger" @click="triggerClick" :id="id" ref="sel">
            {{ label }}
        </span>
        <div class="options">
            <span
                    class="option"
                    :data-id="id"
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
        modelValue: { type: String },
        modelResetValue: { type: String },
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
            removeClassHelper('.select', 'open')
            event.target.classList.add('active')
            sel._value.textContent = event.target.textContent
            emit('selectChange', event.target)
        }

        function triggerClick(){
            removeClassHelper('.select', 'open')
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
                removeClassHelper('.select', 'open')
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
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    margin-left: auto;
    background-image: var(--bs-accordion-icon);
    background-repeat: no-repeat;
    background-size: 1em;
    -webkit-transition: -webkit-transform 0.2s ease-in-out;
    transition: -webkit-transform 0.2s ease-in-out;
    -o-transition: transform 0.2s ease-in-out;
    transition: transform 0.2s ease-in-out;
    position: absolute;
    right: 1em;
    top: calc(100% - 30px);
  }

  &-trigger{
    font-size: 14px;
    font-weight: 500;
    line-height: 140%;
    -webkit-box-align: center;
    -ms-flex-align: center;
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
  border-radius: var(--b-radius);
  box-shadow: var(--card-shadow);
  background-color: #FFFFFF;
  //border-color: #FFFFFF;
  color: var(--h1-color);
  overflow: auto;
  max-height: 220px;
}

.option {
  padding: 13px 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  cursor: pointer;
  transition: var(--selct-transition);
}

.select.open .options {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}

.select.open::after {
  -webkit-transform: rotate(-180deg);
  -ms-transform: rotate(-180deg);
  transform: rotate(-180deg);
}

.option.active{
  opacity: .8;
}

.option:hover, .option.active {
  background: var(--selct-hover-color);
}

</style>