<template>
  <cs-container :is-back-to-top="true">
    <page-main
      :loading="loading"
      :table-data="table"
      @refresh="handleSubmit"/>
  </cs-container>
</template>

<script>
import { getUserLevelList } from '@/api/user/level'

export default {
  name: 'member-user-level',
  components: {
    'PageMain': () => import('./components/PageMain')
  },
  data() {
    return {
      table: [],
      loading: true
    }
  },
  mounted() {
    this.handleSubmit()
  },
  methods: {
    // 确定查询
    handleSubmit() {
      this.loading = true
      getUserLevelList()
        .then(res => {
          this.table = res.data || []
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
