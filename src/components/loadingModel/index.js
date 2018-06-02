import loadingModel from './loadingModel.vue'
const Loading = {
    install: function (Vue) {
        Vue.component('Loading', loadingModel)
    }
}

export default Loading
