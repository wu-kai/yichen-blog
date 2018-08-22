<template>
  <transition name="blogDetails">
    <div class="blog" v-if="isShowDetails">
      <div v-if="!!blog">
        <h1 v-text="blog.title"></h1>
        <div class="information">
          <span v-text="startTime"></span>
          <span v-text="updateTime"></span>
          <span v-text="author"></span>
        </div>
        <div class="info" v-text="info"></div>
        <div class="content">
          <p v-html="blog.body"></p>
        </div>
        <div class="item-labels">
            <span v-for="label in labels" class="item-label" :key="label">
                <tag type="info" rounded v-text="label"></tag>
            </span>
        </div>
        <div class="switch">
          <span></span>
          <span></span>
          <div class="edit">
            <modal title="输入许可指令" :width="520"
                   :is-show="isShow"
                   transition="fadeDown"
                   @close="isShow=false" :on-ok="submit" :on-cancel="cancel">
              <p class="control">
                <input class="input" type="text" v-model="key">
              </p>
            </modal>
            <button @click="toggle" class="button is-primary">编辑</button>
            <button @click="back" class="button is-danger">返回</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  export default {
    name: 'BlogDetailsBox',
    data: function () {
      return {
        id: '',
        blog: '',
        isShow: false,
        key: '',
        isShowDetails: false,
      }
    },
    computed: {
      info() {
        return (this.blog.info || '作者太懒，没有写内容预览')
      },
      author() {
        return '作者 : ' + this.blog.author
      },
      startTime() {
        return '创建于 : ' + (new Date(this.blog.createTime)).Format('yyyy-MM-dd hh:mm:ss')
      },
      updateTime() {
        return '更新于 : ' + (new Date(this.blog.updated || '')).Format('yyyy-MM-dd hh:mm:ss')
      },
      labels() {
        let arr = [];
        _.each(this.blog.label, function (item) {
          if (item.indexOf('，') !== -1) {
            arr = arr.concat(item.split('，'));
          }
          if (item.indexOf(',') !== -1) {
            arr = arr.concat(item.split(','));
          }
        });
        return arr;
      }
    },
    components: {},
    methods: {
      toggle() {
        this.isShow = !this.isShow;
      },
      submit() {
        const self = this;
        if (this.key) {
          this.$store.dispatch('validate', this.key)
            .then(function (data) {
              if (data.result) {
                self.$router.push('/manage/createBlog/' + self.blog._id)
              } else {
                self.$notify.danger({
                  content: '你没有权限进行修改',
                  duration: 3000
                });
                self.key = '';
              }
            })
        }
      },
      back() {
        this.$router.go(-1);
      },
      cancel() {
        this.key = '';
      }
    },
    created() {
      const self = this;
      this.id = this.$route.params.id;
      if (this.id) {
        this.id = this.$route.params.id;
        this.$store.dispatch('getBlogByID', this.id)
          .then(function (result) {
            self.blog = result;
          }, function (err) {
            console.log(err);
          })
      }
    },
    mounted() {
      this.isShowDetails = true;
    }
  }
</script>

<style scoped>
  .blog {
    width: 100%;
    margin: 0 auto 0;
    position: relative;
    z-index: 999;
    /*border-bottom: 1px dashed #c4c4c4;*/
    transition: all 0.5s;
    box-shadow: 0 0 13px -1px #6f6f6f;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    padding: 16px 20px 36px;
    box-sizing: border-box;
    min-height: 100%;
  }

  h1 {
    font-size: 30px;
  }

  .information {
    font-size: 12px;
    color: #8c8c8c;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #8e9a8c;
  }

  .content {
    background: rgba(255, 255, 255, 0);
    border-radius: 10px;
    box-sizing: border-box;
    text-align: left;
  }

  .info {
    text-align: left;
    padding: 30px 0;
    margin-bottom: 30px;
    font-size: 12px;
    color: #389844;
    border-bottom: 1px dotted rgba(180, 175, 178, 0.81);
  }

  .switch {
    position: absolute;
    bottom: 16px;
    box-sizing: border-box;
    width: 100%;
    left: 0;
  }

  .switch .edit {
    width: 100%;
    text-align: right;
    padding-right: 16px;
  }

  .switch .edit button {
    width: 100px;
    background: #477198;
  }

  .switch .button.is-danger {
    width: 100px;
    background-color: #f56954;
  }

  .item-labels {
    overflow: hidden;
    float: left;
    font-size: 13px;
    width: calc(100% - 100px);
    text-align: left;
  }

  .item-label {
    font-weight: 500;
    color: #858585;
    font-family: Broadway;
    margin-right: 10px;
  }

  .blogDetails-enter {
    transform: translateX(100px);
    opacity: 0;
  }

  .blogDetails-enter-active {
    transition: all 0.7s;
  }

  .blogDetails-leave-to {
  }

  .blogDetails-enter {

  }

  .blogDetails-leave-active {
    transition: all 0.7s;
  }

  .blogDetails-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }

  @media screen and (max-width: 450px) {
    .switch .edit button.button {
      width: 50px;
    }
  }
</style>
