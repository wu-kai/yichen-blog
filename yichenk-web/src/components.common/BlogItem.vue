<template>
  <div class="blog">
    <h1 v-text="blog.title||'no title'"></h1>
  </div>
</template>

<script>

	export default {
		name: 'BlogItem',
    props:['blog']
	}
</script>

<style lang="postcss" scoped>
.blog{
  border: 1px solid #d3d3d3;
  margin-top: 16px;
  border-radius: 5px;
}
</style>
