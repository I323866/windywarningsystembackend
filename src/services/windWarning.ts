import * as db from '../dao/getdb'
import _ from 'lodash'
import message from './message'
export const checkWindWarning = async () => {
  const latestdata = await getHQLatest()
  const latestMin10data = await getHQLatestMin10()
  const latestPDTDZdata = await getPDLatestTDZ()
  const latestAVGdata = await getAVG()
  const latestwinddir = Math.round(latestdata.rows[0][1] / 10) * 10
  const latestmin10winddir = Math.round(latestMin10data.rows[9][1] / 10) * 10
  const latestPDTDZwinddir = Math.round(latestPDTDZdata.rows[0][1] / 10) * 10

  const latestwindspeed = latestdata.rows[0][0]
  const latestmin10windspeed = latestMin10data.rows[9][0]
  const latestAVGdata1 = latestAVGdata.rows[0][0]
  const latestAVGdata2 = latestAVGdata.rows[1][0]
  if (latestdata) {
    const data = latestdata.rows[0]
    const wind = data[0]
    const receivetime = data[2]
    if (parseInt(wind) >= 4) {
      return {
        warning1: checkWindDir(latestwinddir, latestmin10winddir), //告警内容【类别：1.1本场风向变化大】
        warning2: checkPDWindDir(latestwinddir, latestPDTDZwinddir), //告警内容【类别：1.2虹浦两场风向差大】
        warning3: checkWindSpeed(latestwindspeed, latestmin10windspeed), //告警内容【类别：风速趋势告警，内容：1.3本场风速快速变化】
        warning4: checkBlastofWind(latestwindspeed), //告警内容【类别：阵风告警，内容：1.4注意本场阵风】
        warning6: checkTwiceBlastofWind(latestAVGdata1, latestAVGdata2), //告警内容【类别：大风告警，内容：1.6本场出现大风】
        receivetime: receivetime
      }
    } else {
      // no warning
    }
  } else {
    // to do popup error message
  }
}
//  告警内容【类别：风向趋势告警，内容：注意风向变化】
function checkWindDir(latestwind: any, latestmin10wind: any) {
  if (Math.abs(latestwind - latestmin10wind) >= 60) {
    const data = {
      type: '风向趋势告警',
      category: '1.1',
      content: '本场风向变化大'
    }
    message.addMessage(data)
    return data
  }
}
function checkPDWindDir(latestwind: any, latestmin10wind: any) {
  if (Math.abs(latestwind - latestmin10wind) >= 60) {
    const data = {
      type: '风向趋势告警',
      category: '1.2',
      content: '虹浦两场风向差大'
    }
    message.addMessage(data)
    return data
  }
}
//告警内容【类别：风速趋势告警，内容：风速快速变化】
function checkWindSpeed(latestwind: any, latestmin10wind: any) {
  if (Math.abs(parseFloat(latestwind) - parseFloat(latestmin10wind)) >= 4) {
    const data = {
      type: '风速趋势告警',
      category: '1.3',
      content: '本场风速快速变化'
    }
    message.addMessage(data)
    return data
  }
}
//告警内容【类别：阵风告警，内容：注意阵风】
function checkBlastofWind(latestwind: any) {
  if (parseFloat(latestwind) >= 10) {
    const data = {
      type: '阵风告警',
      category: '1.4',
      content: '注意本场阵风'
    }
    message.addMessage(data)
    return data
  }
}
//告警内容【类别：大风告警，内容：注意大风】
function checkTwiceBlastofWind(latestAVGdata1: any, latestAVGdata2: any) {
  if (parseFloat(latestAVGdata1) >= 10 && parseFloat(latestAVGdata2) >= 10) {
    const data = {
      type: '大风告警',
      category: '1.6',
      content: '本场出现大风'
    }
    message.addMessage(data)
    return data
  }
}
async function getHQLatest() {
  const sql =
    "select END_WIND_F10, END_WIND_D10, receivetime from MHAPP.ELE01_AWOS t where  cccc='ZSSS' and RNO='02' and rownum=1 order by receivetime desc"
  return db.executeQuery(sql, '')
}
async function getHQLatestMin10() {
  const sql =
    "select END_WIND_F10, END_WIND_D10 from MHAPP.ELE01_AWOS t where  cccc='ZSSS' and RNO='02' and rownum<11 order by receivetime desc"
  return db.executeQuery(sql, '')
}
async function getPDLatestTDZ() {
  const sql =
    "select TDZ_WIND_F10, TDZ_WIND_D10 from MHAPP.ELE01_AWOS t where  cccc='ZSPD' and RNO='01' and rownum=1 order by receivetime desc"
  return db.executeQuery(sql, '')
}
async function getAVG() {
  const sql =
    "select AVGWINDSPEED  from MHAPP.ELE01_SASP t where  cccc='ZSSS' and RNO='02' and rownum<3 order by receivetime desc"
  return db.executeQuery(sql, '')
}
