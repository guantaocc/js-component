<template>
  <span class="copy-content" ref="copyText">
    <span class="content ellipsis" ref="content">copyText</span>
    <a-tooltip>
      <template slot="title">
        点击复制
      </template>
      <span class="copy-button">
        <a-icon :type="icon" @click="copy" />
      </span>
    </a-tooltip>
  </span>
</template>

<script>
import copy from 'copy-to-clipboard'
export default {
  props: {
    copyText: {
      type: String,
      default: ''
    },
    width: Number
  },
  data() {
    return {
      copyed: false,
      timer: null
    }
  },
  computed: {
    icon() {
      return this.copyed ? 'check' : 'copy'
    }
  },
  mounted() {
    // 观察整体宽度变化并添加省略号
    const ref = this.$refs.copyText
    const resizeObserver = new ResizeObserver(entries => {
      console.log(entries)
      const target = entries[0]
      const domRectWidth = target.contentRect.width
      if (domRectWidth > this.width) {
        this.$refs.content.style.width = this.width - 20 + 'px'
      }
    })
    resizeObserver.observe(ref)
  },
  methods: {
    copy() {
      clearTimeout(this.timer)
      this.copyed = true
      // copyed
      const message = String(this.copyText)
      copy(message)
      this.$message.success('复制成功')
      this.timer = setTimeout(() => {
        this.copyed = false
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.copy-content {
  position: relative;
  box-sizing: border-box;
  padding-right: 20px;
  .copy-button {
    width: 20px;
    height: 100%;
    font-size: 20px;
  }
  .content {
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    width: 20px;
  }
}
.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
