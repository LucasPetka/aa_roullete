<template>
  <div>
    <h5>Log</h5>

    <div class="container">
      <code>
        <ul id="example-1" class="bg-light text-dark rounded border border-dark pl-1 pb-2" style="list-style-type: none;">
          <li v-for="item in this.$store.getters.getLog" :key="item.message">
            {{ item }}
          </li>
        </ul>
      </code>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Log'
}
</script>

