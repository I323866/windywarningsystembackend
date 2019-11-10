import * as db from '../dao/getdb'
import message from './message'
export const checkRVRWarning = async () => {
  const VISLatest = await getVISLatest()
  const VISLatest1 = VISLatest.rows[0][0]
  const VISLatest5 = VISLatest.rows[4][0]
  const RVRLatest = await getRVRLatest()
  const RVRLatest1 = RVRLatest.rows[0][0].substr(1)
  const RVRLatest120 = RVRLatest.rows[119][0].substr(1)
  const receivetime = VISLatest.rows[0][1]
  return {
    warning1: checkVIS(VISLatest1, VISLatest5), //告警内容【类别：3.1能见度快速下降】
    warning2: checkRVR(RVRLatest1,RVRLatest120), //告警内容【类别：3.2 RVR 快速下降】
    warning3: checkVISMIN(VISLatest1), //告警内容【类别：3.1能见度快速下降】
    warning4: checkRVRMIN(RVRLatest1), //告警内容【类别：3.1能见度快速下降】
    receivetime: receivetime
  }
  
  function checkVIS(VISLatest1: any, VISLatest5: any) {
    if  (Math.abs(VISLatest1  - VISLatest5) >= 5000 && VISLatest1 <= 5000) {
      const data = {
        type: '能见度变化告警',
        category: '3.1',
        content: '能见度快速下降】'
      }
      message.addMessage(data)
      return data
    }
  }
  function checkRVR(RVRLatest1: any, RVRLatest120: any) {
    if (Math.abs(RVRLatest1 - RVRLatest120) / RVRLatest1 >= 0.3 && RVRLatest1 <= 2000 ){
      const data = {
        type: 'RVR变化告警',
        category: '3.2',
        content: 'RVR快速下降'
      }
      message.addMessage(data)
      return data
    }
  }
  function checkVISMIN(VISLatest1: any) {
    if (VISLatest1 <= 1000 ){
      const data = {
        type: '大雾告警',
        category: '3.3',
        content: '本场出现大雾'
      }
      message.addMessage(data)
      return data
    }
  }
  function checkRVRMIN(RVRLatest1: any) {
    if (RVRLatest1 <= 650 ){
      const data = {
        type: 'RVR告警',
        category: '3.4',
        content: 'RVR已到警戒值'
      }
      message.addMessage(data)
      return data
    }
  }
  async function getVISLatest() {
    const sql =
      "select MINVISIBILITY, receivetime from MHAPP.ELE01_SASP t where  cccc='ZSSS' and rownum=1 order by receivetime desc"
    return db.executeQuery(sql, '')
  }
  async function getRVRLatest() {
    const sql =
      "select END_RVR_10A, receivetime from MHAPP.ELE01_AWOS t where  cccc='ZSSS' and RNO='02' and rownum<121 order by receivetime desc"
    return db.executeQuery(sql, '')
  }
}
