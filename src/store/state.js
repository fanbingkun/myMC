import {playMode} from 'common/js/config'
import {loadSearch} from 'common/js/cache'
///sequenceList 是当前的正常播放列表
// playlist 是当前随机的播放列表
const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist:[],
    sequenceList:[],
    mode:playMode.sequence,
    currentIndex:-1,
    disc:{},
    topList:{},
    searchHistory:loadSearch()
}
export default state