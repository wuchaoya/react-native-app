import HttpUitl from './HttpUitl'

const HttpRequest = {
    getHomeImg:HttpUitl.post('/v2/homepage',{},null)
}

module.exports = HttpRequest