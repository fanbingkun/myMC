var express = require('express')

var config = require('./config/index')

var axios = require('axios')
const app = express()//请求server
var apiRoutes = express.Router()


app.get('/api/getDiscList', (req, res) => {
    var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    axios.get(url,{
      headers:{
        referer:'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response)=>{
      res.json(response.data)
    }).catch((e)=>{
      console.log(e)
    })
  })
  app.get('/api/lyric', (req, res) => {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
    axios.get(url,{
      headers:{
        referer:'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response)=>{
      var ret = response.data
      if(typeof ret === 'string'){
        var reg = /^\w+\(({[^()]+})\)$/
        var matches = ret.match(reg)
        if(matches){
          ret = JSON.parse(matches[1])
        }
      }
      res.json(ret)
    }).catch((e)=>{
      console.log(e)
    })
  })
  app.get('/api/disc', (req, res) => {
    var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    axios.get(url,{
      headers:{
        referer:'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response)=>{
      res.json(response.data)
    }).catch((e)=>{
      console.log(e)
    })
  })

  app.use('/api', apiRoutes)//通过路由请求数据

  app.use(express.static('./dist'))

  var port = process.env.PORT || config.build.port

  module.exports = app.listen(port,function(err){
    if(err){
        console.log(err)
        return 
    }
    console.log('listen at ' + port + '\n')
  })


