<template>
  <div class="common_container details">
    <img src="" alt="">
    <h2 v-text="blog.title"></h2>
    <div class="content-info">
      <span v-text="contentTime"></span>
      <span v-text="contentLabel"></span>
      <span v-text="contentAuthor"></span>
    </div>
    <div v-text="contentInfo" class="introduction"></div>
    <p class="content" v-html="blog.body"></p>
    <div class="editBlog">
      <modal title="输入许可指令" :width="520"
             :is-show="isShow"
             transition="fadeDown"
             @close="isShow=false" :on-ok="submit" :on-cancel="cancel">
        <p class="control">
          <input class="input" type="text" v-model="key">
        </p>
      </modal>
      <button @click="toggle" class="button is-primary">编辑</button>
    </div>
  </div>


</template>

<script>
  import _ from 'lodash'

  export default {
    name: '',
    data() {
      return {
        blog: this.$store.state.blog.currentBlog,
        isShow: false,
        key: ''
      }
    },
    computed: {
      contentTime() {
        return '创建日期 : ' + (new Date(this.blog.createTime)).Format('yyyy-MM-dd hh:mm:ss')
      },
      contentLabel() {
        return '标签 : ' + (_.isArray(this.blog.label) ? this.blog.label[0] : '')
      },
      contentAuthor() {
        return '作者 : ' + this.blog.author
      },
      contentInfo() {
        return '导读 : ' + this.blog.info
      }
    },
    mounted() {
      if (!this.blog.createTime) {
        this.$router.push('/blogList')
      }
    },
    methods: {
      toggle() {
        this.isShow = !this.isShow;
      },
      submit() {
        const self = this;
        if (this.key) {
          this.$store.dispatch('validate', this.key)
            .then(function (data) {
              if(data.result){
                self.$router.push('/manage/'+self.blog._id)
              }else{
                self.$notify.danger({
                  content: '你没有权限进行修改',
                  duration: 3000
                });
                self.key = '';
              }
            })
        }
      },
      cancel() {
        this.key = '';
      }
    }
  }
</script>

<style scoped>
  .details {
    min-height: 100%;
    padding: 30px;
    text-align: left;
  }

  .details img {
    width: 100%;
    min-height: 100px;
    display: block;
  }

  h2 {
    font-size: 28px;
    text-align: left;
    color: #1565c0;
  }

  .content-info {
    color: #dcdcdc;
    margin-top: 10px;
  }

  .content-info span {
    padding: 10px 30px;
  }

  .content-info span:first-child {
    padding-left: 0;
  }

  p.content {
    text-align: left;
    padding: 30px 0;
    margin-top: 20px;
    overflow: hidden;
    border-bottom: 1px solid #bbdefb;
    border-top: 1px solid #bbdefb;
    min-height: 200px;
  }

  .introduction {
    margin-top: 30px;
    padding-bottom: 20px;
    color: #bbdefb;
  }

  .control {
    margin-top: 0;
  }
  .editBlog{
    margin-top: 50px;
    text-align: right;
  }
  .editBlog button{
    width: 100px;
    background: #cedff5;
  }
</style>
