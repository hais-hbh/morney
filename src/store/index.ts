import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/idCreator';

Vue.use(Vuex);
type RootState = {
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag
}
const store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: [],
        currentTag: undefined
    } as RootState,
    mutations: {
        initTagList(state) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
        },
        createTag(state, tagName: string) {
            const id = createId().toString();
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(tagName) >= 0) {
                window.alert('标签名重复');
            }
            state.tagList.push({id, name: tagName});
            store.commit('saveTag');
            window.alert('添加成功');
        },
        saveTag(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
        removeTag(state, id: string) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            state.tagList.splice(index, 1);
            window.alert('删除成功')

            store.commit('saveTag');
        },
        updateTag(state, payload:{id: string, name: string}) {
            const {id,name}=payload
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复')
                } else {
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit('saveTag');
                }
            }
        },

        setCurrentTag(state,id:string){
            store.commit('initTagList')
            state.currentTag =state.tagList.filter(t => t.id === id)[0]
        },


        initRecordList(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        createRecord(state, record) {
            const newRecord: RecordItem = clone(record);
            newRecord.createTime = new Date();
            state.recordList.push(newRecord);
            store.commit('saveRecords');
            console.log(state.recordList);
        },
        saveRecords(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        }
    },
    actions: {},
    modules: {}
});
export default store;