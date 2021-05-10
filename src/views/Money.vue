<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="types" :value.sync="record.type"/>
    <div class="notes">
      <FormItem file-name="备注" placeholder="在这里输入备注" :value.sync="record.notes"/>
    </div>

    <Tags @update:selected="record.tags = $event"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';

import {Component, Prop} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import types from '@/constants/typeList';

@Component({
  components: {Tabs, Tags, FormItem,  NumberPad},
})
export default class Money extends Vue {
  get recordList(){
    return this.$store.state.recordList
  }
  types = types
  record:RecordItem = {
    tags:[],
    notes:'',
    type:'-',
    amount:0,
    createTime:''
  }
  created(){
    this.$store.commit('initRecordList')
  }
  saveRecord(){
    if(!this.record.tags||this.record.tags.length===0){
      return window.alert('请至少选择一个标签')
    }
    this.$store.commit('createRecord',this.record)
    if(this.$store.state.createRecordError===null){
      window.alert('添加成功')
      this.record.notes=''

    }

  }
};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped>
.notes{
  padding: 12px 0;
}
</style>