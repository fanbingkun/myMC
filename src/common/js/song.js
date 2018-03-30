import {ERR_OK} from 'api/config'
import {getLyric} from 'api/song'
import {Base64} from 'js-base64'

export default class Song{
  constructor({id,mid,singer,name,album,duration,image,url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric(){
    if(this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject)=>{
      getLyric(this.mid).then((res)=>{
        if(res.retcode === ERR_OK){
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        }else{
          reject('no lyric')
        }
      })
    })

    
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name:musicData.songname,
    album:musicData.albumname,
    duration:musicData.interval,
    image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url:`http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=8960262792&vkey=D81BAF34040CA32F6F31930B57597C36EF9C818100A1A3C5C0C68B846503D7F7E43884390AAAB2E740B34EFDE500111BB2BB64562CC1E931&uin=0&fromtag=38`
  })
}

export function filterSinger(singer) {
  let ret = []
  if(!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })

  return ret.join('/')
}