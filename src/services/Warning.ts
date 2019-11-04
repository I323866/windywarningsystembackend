import * as db from '../dao/getdb'
import _ from 'lodash'

export const checkWarning = async () => {
  const latestdata = await getLatest()
  const latestMin10data = await getLatestMin10()
  const latestTDZdata = await getLatestTDZ()
  const latestMin2data = await getLatestMin2()
  const latestwinddir = Math.round(latestdata.rows[0][1] / 10) * 10
  const latestmin10winddir = Math.round(latestMin10data.rows[9][1] / 10) * 10
  const latestTDZwinddir = Math.round(latestTDZdata.rows[0][1] / 10) * 10

  const latestwindspeed = latestdata.rows[0][0]
  const latestmin10windspeed = latestMin10data.rows[9][0]
  const latestmin2windspeed = latestMin2data.rows[1][0]
  if (latestdata) {
    const data = latestdata.rows[0]
    const wind = data[0]
    const receivetime = data[2]
    if (parseInt(wind) >= 4) {
      return {
        warning1: checkWindDir(latestwinddir, latestmin10winddir, latestTDZwinddir), //告警内容【类别：1.1风向趋势告警，内容：注意风向变化】
        warning2: checkWindSpeed(latestwindspeed, latestmin10windspeed), //告警内容【类别：风速趋势告警，内容：风速快速变化】
        warning3: checkBlastofWind(latestwindspeed), //告警内容【类别：1.3阵风告警，内容：注意阵风】
        warning5: checkTwiceBlastofWind(latestwindspeed, latestmin2windspeed), //告警内容【类别：1.4大风告警，内容：注意大风】
        receivetime: receivetime
      }
    } else {
      // no warning
    }
  } else {
    // to do popup error message
  }
}
export const updateWarningOn = async () => {
  console.log(123)
}
export const updateDisable = async () => {
  console.log(123)
}
//  告警内容【类别：风向趋势告警，内容：注意风向变化】
function checkWindDir(latestwind: any, latestmin10wind: any, latestTDZwind: any) {
  if (Math.abs(latestwind - latestmin10wind) >= 60 || Math.abs(latestwind - latestTDZwind) >= 60) {
    const data = {
      type: '风向趋势告警',
      content: '注意风向变化'
    }
    return data
  }
}
//告警内容【类别：风速趋势告警，内容：风速快速变化】
function checkWindSpeed(latestwind: any, latestmin10wind: any) {
  if (Math.abs(parseFloat(latestwind) - parseFloat(latestmin10wind)) >= 4) {
    const data = {
      type: '风速趋势告警',
      content: '风速快速变化'
    }
    return data
  }
}
//告警内容【类别：阵风告警，内容：注意阵风】
function checkBlastofWind(latestwind: any) {
  if (parseFloat(latestwind) >= 10) {
    const data = {
      type: '阵风告警',
      content: '注意阵风'
    }
    return data
  }
}
//告警内容【类别：大风告警，内容：注意大风】
function checkTwiceBlastofWind(latestwind: any, latestmin2windspeed: any) {
  if (parseFloat(latestwind) >= 10 && parseFloat(latestmin2windspeed) >= 10) {
    const data = {
      type: '大风告警',
      content: '注意大风'
    }
    return data
  }
}
async function getLatest() {
  const sql =
    "select END_WIND_F10, END_WIND_D10, receivetime from MHAPP.ELE01_AWOS t where  cccc='ZSSS' and RNO='02' and rownum=1 order by receivetime desc"
  const data = db.executeQuery(sql, '')
  return data
}
async function getLatestMin10() {
  const sql =
    "select END_WIND_F10, END_WIND_D10 from MHAPP.ELE01_AWOS t where  cccc='ZSSS' and RNO='02' and rownum<11 order by receivetime desc"
  return db.executeQuery(sql, '')
}
async function getLatestMin2() {
  const sql = "select  AVGWINDSPEED from MHAPP.ELE01_SASP t where  cccc='ZSSS' and rownum<3 order by receivetime desc"
  return db.executeQuery(sql, '')
}
async function getLatestTDZ() {
  const sql =
    "select TDZ_WIND_F10, TDZ_WIND_D10 from MHAPP.ELE01_AWOS t where  cccc='ZSSS' and RNO='02' and rownum=1 order by receivetime desc"
  return db.executeQuery(sql, '')
}
