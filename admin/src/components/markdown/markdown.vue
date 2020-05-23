<template>
  <div class="markdown-wrapper">
    <textarea ref="editor"></textarea>
    <input style="display:none" accept="image/gif,image/jpeg,image/jpg,image/png" type="file" id="upInput" ref="upInput">
  </div>
</template>

<script>
import Simplemde from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import { imgUpload } from '@/api/upload.js'
import configInfo from '@/config/index.js'
export default {
    naem: 'MarkdownEditor',
    props: {
        value: {
            type: String,
            default: ''
        },
        options: {
            type: Object,
            default: () => {
                return {}
            }
        },
        localCache: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            editor: null
        }
    },
    methods: {
        addEvents () {
            this.editor.codemirror.on('change', () => {
                let value = this.editor.value()
                if (this.localCache) localStorage.markdownContent = value
                this.$emit('input', value)
                this.$emit('on-change', value)
            })
            this.editor.codemirror.on('focus', () => {
                this.$emit('on-focus', this.editor.value())
            })
            this.editor.codemirror.on('blur', () => {
                this.$emit('on-blur', this.editor.value())
            })
        },
        // 上传文件事件
        handerUpload () {
            const input = this.$refs.upInput
            const formData = new FormData()
            formData.append('i', input.files[0])
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            input.value = null
            imgUpload(formData).then(res => {
            /**
             * 判断是开发环境还是正式环境
             */
                let baseUrl = process.env.NODE_ENV == 'development' ? configInfo.baseUrl.imgDev : configInfo.baseUrl.imgPro
                console.log(process.env.NODE_ENV, configInfo.baseUrl.imgDev, configInfo.baseUrl.imgPro, baseUrl)
                var urlname = `![](${baseUrl}${res.data.data})`
                this.editor.value(`${this.editor.value()}${urlname}\n`)
            })
        }
    },
    watch: {
        value (val) {
            if (val === this.editor.value()) return
            this.editor.value(val)
        }
    },
    mounted () {
        let _this = this
        this.editor = new Simplemde(Object.assign(this.options, {
            element: this.$refs.editor,
            initialValue: this.value,
            toolbar: [
                'bold', 'italic', 'heading', '|', 'quote', 'unordered-list', 'ordered-list', '|', 'link', 'table', 'image',
                {
                    name: 'custom',
                    action: function customFunction (editor) {
                        // 添加你的代码
                        //   alert(1)
                        const input = _this.$refs.upInput
                        input.click()
                        input.removeEventListener('change', _this.handerUpload)
                        input.addEventListener('change', _this.handerUpload)
                    },
                    className: 'fa fa-picture-o',
                    title: '图片上传'
                },
                '|', // 分隔符
                'preview', 'side-by-side', 'fullscreen', 'guide'
            ]
        }))
        /**
     * 事件列表为Codemirror编辑器的事件，更多事件类型，请参考：
     * https://codemirror.net/doc/manual.html#events
     */
        this.addEvents()
    }
}
</script>

<style lang="less">
.markdown-wrapper{
  .editor-toolbar.fullscreen{
    z-index: 9999;
  }
  .CodeMirror-fullscreen{
    z-index: 9999;
  }
  .CodeMirror-fullscreen ~ .editor-preview-side{
    z-index: 9999;
  }
}
</style>
