type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: string
    createTime:Date | undefined
}
type Tag = {
    id: string
    name: string
}
type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => string//success表示成功，duplicated表示标签名重复
    update: (id: string, name: string) => string
    remove: (id: string) => boolean
    save: () => void
}
interface Window{
}