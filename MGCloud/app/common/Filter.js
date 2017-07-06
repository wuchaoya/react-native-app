const Filter ={
    dirtyData:(data)=>{
        if(Object.prototype.toString.call(data)!=='[object Array]'){
            return
        }
        let arr=[]
        data.forEach((item)=>{
            console.log(item)
            if(item.name!==null&&item.icon!==null&&item.gid!==null){
                arr.push(item)
            }
        })
        return arr
    }
}
module.exports = Filter