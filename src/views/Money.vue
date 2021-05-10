<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem file-name="备注" @update:value="onUpdateNotes" placeholder="在这里输入备注"/>
    </div>

    <Tags/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';

import {Component} from 'vue-property-decorator';
import store from '@/store/index2';

@Component({
  components: {Tags, FormItem, Types, NumberPad}
})
export default class Money extends Vue {
  recordList:RecordItem[]|undefined = store.recordList
  record:RecordItem = {
    tags:[],
    notes:'',
    type:'-',
    amount:'0',
    createTime:new Date()
  }
  onUpdateNotes(value: string) {
    this.record.notes = value
  }
  saveRecord(){
    store.createRecord(this.record)
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