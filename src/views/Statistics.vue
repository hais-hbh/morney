<template>
  <Layout>
    <Tabs :data-source="typeList" :value.sync="selected" class-prefix="type"/>
    <ol>
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }} <span>￥{{group.total}}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import typeList from '@/constants/typeList';

@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }


  }

  tagString(tags: string[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    if(recordList.length === 0){return []}
    type Result = {title:string,total?:number,items:RecordItem[]}[]

    const  newList = clone(recordList).filter(r=>r.type===this.selected).sort((a,b)=>dayjs(b.createTime).valueOf()-dayjs(a.createTime).valueOf())
    if(newList.length===0){
      return [] as Result
    }
    console.log(newList);
    const result:Result = [{title:dayjs(recordList[0].createTime).format('YYYY-MM-DD'),items:[recordList[0]]}]
    for(let i=1;i<newList.length;i++){
      const current = newList[i]
      const last = result[result.length-1]
      if(dayjs(last.title).isSame(dayjs(current.createTime),'day')){
        last.items.push(current)
      }else{
        result.push({title: dayjs(current.createTime).format('YYYY-MM-DD'),items: [current]})
      }
    }
   result.map(group=>{
      group.total = group.items.reduce((sum,item)=>sum+item.amount,0)
    })
    return result
  }

  beforeCreate() {
    this.$store.commit('initRecordList');
  }

  selected = '-';
  typeList = typeList;
};
</script>

<style scoped lang="scss">
::v-deep {
  .type-tabs-item {
    background: #c4c4c4;

    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  @extend %item
}

.record {
  background: white;
  @extend %item
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999999;
}

</style>