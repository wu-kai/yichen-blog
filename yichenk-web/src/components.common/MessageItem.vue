<template>
  <div class="item">
    <div class="head">
      <span class="name" v-text="item.name"></span>
      <span class="time" v-text="time"></span>
      <span class="city" v-text="item.city?'在'+item.city+'说':'说'"></span>
    </div>
    <p v-text="item.comment"></p>
  </div>
</template>

<script>
	export default {
		name: '',
    props:['item'],
    computed:{
		  time(){
		    return (new Date(this.item.createdAt).toLocaleString()).split(':')[0]+'点';
      }
    }
	}
</script>

<style scoped>
  .item{
    text-align: left;
    margin-top: 26px;
  }
  .item .head span{

  }
  .item .head span.name{
    display: block;
    font-size: 20px;
  }
  .item .head span.time,.item .head span.city{
    color: #898989;
  }
  .item p{
    background: rgba(249, 249, 249, 0.87);
    padding: 20px 20px;
    border-radius: 5px;
    margin-top: 6px;
  }
</style>
