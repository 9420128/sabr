<template>
    <address class="address">
        <div class="address__body">
            {{ data }}
        </div>
    </address>
</template>

<script>
export default {
    name: "Address",
    props: {
        data: String
    }
}
</script>

<style lang="scss">
.address {
  position: absolute;
  height: 40px;
  width: 240px;
  top: -41px;
  padding: 8px 16px;
  margin: 0;
  font-style: normal;
  background-color: var(--selct-hover-color);
  box-sizing: border-box;

  &__body{
    font-size: .9em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

</style>