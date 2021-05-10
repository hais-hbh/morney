<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="types" :value.sync="record.type"/>
    <div class="notes">
      <FormItem file-name="备注" @update:value="onUpdateNotes" placeholder="在这里输入备注"/>
    </div>

    <Tags/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';

import {Component} from 'vue-property-decorator';
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
  onUpdateNotes(value: string) {
    this.record.notes = value
  }
  saveRecord(){
    this.$store.commit('createRecord',this.record)
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