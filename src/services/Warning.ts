import * as db  from '../dao/getdb'
import _ from 'lodash'

export  const checkWarning = async () => {
  const latestdata = await getLatest()
  const latestMin10data = await getLatestMin10()
  const latestTDZdata = await getLatestTDZ()
  const latestMin2data = await getLatestMin2()
  const latestwinddir  = Math.round(latestdata.rows[0][0]/10) * 10;
  const latestmin10winddir = Math.round(latestMin10data.rows[0][0]/10) * 10
  const latestTDZwinddir = Math.round(latestTDZdata.rows[0][0]/10) * 10
  
  const latestwindspeed  = latestdata.rows[0][1];
  const latestmin10windspeed = latestMin10data.rows[0][1]
  const latestmin2windspeed = latestMin2data.rows[0][1]
  if (latestdata){
    const data = latestdata.rows[0]
    const wind = data[0]
    const receivetime  = data[1]
    if ((parseInt(wind) >= 4)){
      
      return {warning1 : checkWindDir(latestwinddir,latestmin10winddir,latestTDZwinddir) //告警内容【类别：1.1风向趋势告警，内容：注意风向变化】
             ,warning2 : checkWindSpeed(latestwindspeed,latestmin10windspeed) //告警内容【类别：1.2风向趋势告警，内容：注意风向变化】
             ,warning3 : checkBlastofWind(latestwindspeed) //告警内容【类别：1.3阵风告警，内容：注意阵风】
             ,warning5 : checkTwiceBlastofWind(latestwindspeed,latestmin2windspeed) //告警内容【类别：1.4大风告警，内容：注意大风】
             ,receivetime:receivetime }
    }else{
      // no warning
    }
  }else{
    // to do popup error message
  }
}
export  const updateWarningOn = async () => {

  console.log(123)
}
export  const updateDisable = async () => {

  console.log(123)
}
//  告警内容【类别：风向趋势告警，内容：注意风向变化】
async function  checkWindDir (latestwind:any,latestmin10wind:any,latestTDZwind:any) {
    if ((Math.abs(latestwind-latestmin10wind) >= 60) || (Math.abs(latestwind-latestTDZwind) >= 60)){
      const data = {
        type :"风向趋势告警",
        content : "注意风向变化"
      }
      return data
    }
}
//告警内容【类别：风速趋势告警，内容：风速快速变化】
async function  checkWindSpeed (latestwind:any,latestmin10wind:any) {
  if (Math.abs(parseFloat(latestwind)-parseFloat(latestmin10wind)) >= 4) {
    return true
  }else{
    return false
  }
}
//告警内容【类别：阵风告警，内容：注意阵风】
async function  checkBlastofWind (latestwind:any) {
  if (parseFloat(latestwind) >= 10) {
    return true
  }else{
    return false
  }
}

//告警内容【类别：大风告警，内容：注意大风】
async function  checkTwiceBlastofWind (latestwind:any,latestmin2windspeed:any) {
  if (parseFloat(latestwind) >= 10 && parseFloat(latestmin2windspeed) >= 10)  {
    return true
  }else{
    return false
  }
}
async function getLatest  () {
  const sql = "select * from user_tables where rownum=1";
  const data = db.executeQuery(sql, '')
  return data
} 
async function getLatestMin10  () {
  const sql = "select * from user_tables where rownum=1";
  return db.executeQuery(sql, '')
}
async function getLatestMin2  () {
  const sql = "select * from user_tables where rownum=1";
  return db.executeQuery(sql, '')
}
async function getLatestTDZ () {
  const sql = "select * from user_tables where rownum=1";
  return db.executeQuery(sql, '')
}


