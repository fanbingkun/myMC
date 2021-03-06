import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const playlistMixin = {
  mounted(){
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  computed:{
    ...mapGetters([
      'playlist'
    ])
  },
  watch:{
    playlist(newVal){
      this.handlePlaylist(newVal)
    }
  },
  methods:{
    handlePlaylist(){
      throw new Error('component must implement handlePlayList method')
    }
  }
}


export const playerMixin = {
  computed:{
    iconMode(){
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop?'icon-loop':'icon-random'
    },
    ...mapGetters([
      'playlist',
      'currentSong',
      'mode',
      'sequenceList',
      'favoriteList'
    ])
  },
  methods:{
    changeMode(){
      
      const mode = (this.mode + 1) % 3  
      console.log(mode)
      this.setPlayMode(mode)
      let list = null
      if(mode === playMode.random) {
          list = shuffle(this.sequenceList)
      }else{
          list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex(list){
        let index = list.findIndex((item)=>{
            return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
    },
    toggleFavorite(song){
      if(this.isFavorite(song)){
        this.deleteFavoriteList(song)
      }else{
        this.saveFavoriteList(song)
      }
    },
    getFavoriteIcon(song){
      if(this.isFavorite(song)){
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    isFavorite(song){
      const index = this.favoriteList.findIndex((item)=>{
        return item.id === song.id
      })
      return index > -1
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode : 'SET_PLAY_MODE',
      setPlayList : 'SET_PLAYLIST'
    }),
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  },

}


export const searchMixin = {
  data(){
    return {
      query:'',
      refreshDelay:100
    }
  },
  computed:{
    ...mapGetters([
      'searchHistory'
    ]),
  },
  methods:{
    blurInput(){
      this.$refs.searchBox.blur()
    },
    saveSearch(){
      this.saveSearchHistory(this.query)
    },
    addQuery(val){
      this.$refs.searchBox.setQuery(val)
    },
    onQueryChange(query){
      console.log(query)
      this.query = query
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}