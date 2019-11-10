import * as db from '../dao/getdb'
import message from './message'

export const checkCloudWarning = async () => {
  const HQCloudLatest = await getHQCloudLatest()
  const HQCloudLatest1 = HQCloudLatest.rows[0][0]
  const PDCloudLatest = await getHQCloudLatest()
  const PDCloudLatest1 = PDCloudLatest.rows[0][0]
  const CZCloudLatest = await getHQCloudLatest()
  const CZCloudLatest1 = CZCloudLatest.rows[0][0]
  const NTCloudLatest = await getHQCloudLatest()
  const NTCloudLatest1 = NTCloudLatest.rows[0][0]
  const receivetime = HQCloudLatest.rows[0][1]
   
  return {
    warning1: checkCloudCB(HQCloudLatest1), //告警内容【类别：4.1本场出现CB云
    warning2: checkCloudTS(HQCloudLatest1), //告警内容【类别：4.2本场出现雷暴】
    // warning3: checkVISMIN(VISLatest1), //告警内容【类别：4.3本场出现短时强降水】
    warning4: checkOtherCloudTS(PDCloudLatest1,CZCloudLatest1,NTCloudLatest1), //告警内容【类别：4.4周边出现雷暴
    receivetime: receivetime
  }
  
  function checkCloudCB(CloudLatest: any) {
    if  (CloudLatest == "CB") {
      const data = {
        type: '云高告警',
        category: '4.1',
        content: '本场出现CB云'
      }
      message.addMessage(data)
      return data
    }
  }
  function checkCloudTS(CloudLatest: any) {
    if  (CloudLatest == "TS") {
      const data = {
        type: '雷暴告警',
        category: '4.2',
        content: '本场出现雷暴' 
      }
      message.addMessage(data)
      return data
    }
  }
  function checkOtherCloudTS(PDCloudLatest1: any,CZCloudLatest1: any,NTCloudLatest1: any) {
    if  (PDCloudLatest1 == "TS" || CZCloudLatest1 == "TS" || NTCloudLatest1 == "TS") {
      const data = {
        type: '雷暴告警',
        category: '4.4',
        content: 'ZSPD/ZSCG/ZSNT出现雷暴'
      }
      message.addMessage(data)
      return data
    }
  }
  async function getHQCloudLatest() {
    const sql =
      "select CLOUDINFO, receivetime from MHAPP.ELE01_SASP t where  cccc='ZSSS' and rownum=1 order by receivetime desc"
    return db.executeQuery(sql, '')
  }
  async function getPDCloudLatest() {
    const sql =
      "select CLOUDINFO, receivetime from MHAPP.ELE01_SASP t where  cccc='ZSSS' and rownum=1 order by receivetime desc"
    return db.executeQuery(sql, '')
  }
  async function getCZCloudLatest() {
    const sql =
      "select CLOUDINFO, receivetime from MHAPP.ELE01_SASP t where  cccc='ZSCG' and rownum=1 order by receivetime desc"
    return db.executeQuery(sql, '')
  }
  async function getNTCloudLatest() {
    const sql =
      "select CLOUDINFO, receivetime from MHAPP.ELE01_SASP t where  cccc='ZSNT' and rownum=1 order by receivetime desc"
    return db.executeQuery(sql, '')
  }
}
