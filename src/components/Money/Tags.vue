<template>
  <div class="tags">

    <div class="new">
      <button @click="add">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag"
      @click="toggle(tag)"
      :class="{selected:selectedTags.indexOf(tag)>=0}">
        {{tag}}
      </li>

    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Types extends Vue{
  @Prop(Array) readonly dataSource: string[]|undefined;
  selectedTags: string[] = [];
  add(){
    const tagName = window.prompt('请输入标签名')
   if(tagName === ''){
     window.alert('标签名不能为空')
   }else if(this.dataSource){
      this.$emit('update:dataSource',[...this.dataSource,tagName])
   }
  }
  toggle(tag:string){
    const index = this.selectedTags.indexOf(tag)
    if(index>=0){
      this.selectedTags.splice(index,1)
    }else{
      this.selectedTags.push(tag)
    }

  }
}
</script>

<style lang="scss" scoped>
.tags {
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      $bg:#d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      padding: 0 16px;
      margin-right: 12px;
      border-radius: $h/2;
      margin-top: 4px;
      &.selected{
        background: darken($bg,50%);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 3px;
    }
  }
}
</style>