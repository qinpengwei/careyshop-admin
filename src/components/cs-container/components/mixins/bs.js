import BScroll from 'better-scroll'

export default {
  props: {
    // 滚动优化的选项
    betterScrollOptions: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {
      BS: null
    }
  },
  mounted() {
    this.scrollInit()
  },
  beforeDestroy() {
    this.scrollDestroy()
  },
  methods: {
    scrollInit() {
      // 初始化 bs
      this.BS = new BScroll(this.$refs.wrapper, Object.assign({
        mouseWheel: true,
        click: true,
        preventDefault: false,
        scrollbar: {
          fade: true,
          interactive: false
        }
      }, this.betterScrollOptions))

      // 滚动时发出事件 并且统一返回的数据格式
      this.BS.on('scroll', ({ x, y }) => {
        this.$emit('scroll', {
          x: -x,
          y: -y
        })
      })
    },
    scrollDestroy() {
      try {
        this.BS.destroy()
      } catch (e) {
        delete this.BS
        this.BS = null
      }
    },
    // 外部调用的方法 返回顶部
    backToTop() {
      if (this.BS) {
        this.BS.scrollTo(this.BS.x, 0)
      }
    },
    // 手动触发滚动事件
    setScroll() {
      if (this.BS) {
        this.$emit('scroll', {
          x: -this.BS.x,
          y: -this.BS.y
        })
      }
    }
  }
}
