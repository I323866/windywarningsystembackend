import * as db from '../dao/getdb'

export const checkCloudWarning = async () => {
  const HQCloudLatest = await getHQCloudLatest()
  const HQCloudLatest1 = HQCloudLatest.rows[0][0]
  const HQCloudLatest120 = HQCloudLatest.rows[119][0]
  const PDCloudLatest = await getPDCloudLatest()
  const PDCloudLatest1 = PDCloudLatest.rows[0][0]
  const HQRHLatest = await getRHLatest()
  const receivetime = HQCloudLatest.rows[0][1]
  return {
    warning1: checkHQCloud(HQCloudLatest1), //告警内容【类别：5.1注意低云
    warning2: checkPDCloud(PDCloudLatest1), //告警内容【类别：5.2浦东已出现低云
    warning3: checkRH(HQRHLatest), //告警内容【类别：5.3相对湿度高，注意云高
    // warning3: checkVISMIN(VISLatest1), //告警内容【类别：4.3本场出现短时强降水】
    warning5: checkCloud(HQCloudLatest1,HQCloudLatest120), //告警内容【类别：5.5云高快速下降
    receivetime: receivetime
  }
  
  function checkHQCloud(CloudLatest: any) {
    if  (CloudLatest <= 100 && CloudLatest != "") {
      const data = {
        type: '云高告警',
        category: '5.1',
        content: '注意底云'
      }
      return data
    }
  }
  function checkPDCloud(CloudLatest: any) {
    if  (CloudLatest <= 90 && CloudLatest != "") {
      const data = {
        type: '云高告警',
        category: '5.2',
        content: '浦东已出现低云'
      }
      return data
    }
  }
  function checkRH(HQRHLatest1: any) {
    if  (HQRHLatest1 >= 98) {
      const data = {
        type: '云高告警',
        category: '5.3',
        content: '相对湿度高，注意云高'
      }
      return data
    }
  }
  function checkCloud(HQCloudLatest1: any,HQCloudLatest120:any ) {
    if  (Math.abs(HQCloudLatest1 - HQCloudLatest120) / HQCloudLatest1 >= 0.3 && ( HQCloudLatest1 <= 450 || HQCloudLatest120 <= 450 )) {
      const data = {
        type: '云高变化告警',
        category: '5.5',
        content: '云高快速下降'
      }
      return data
    }
  }
  async function getHQCloudLatest() {
    const sql =
      "select END_CLD_HL, receivetime from MHAPP.ELE01_AWOS t where  cccc='ZSSS' and RNO='02' and rownum<=121 order by receivetime desc"
    return db.executeQuery(sql, '')
  }
  async function getPDCloudLatest() {
    const sql =
      "select END_CLD_HL, receivetime from MHAPP.ELE01_AWOS t where  cccc='ZSPD' and RNO='01' and rownum=1 order by receivetime desc"
    return db.executeQuery(sql, '')
  }
  async function getRHLatest() {
    const sql =
      "select END_HUMID, receivetime from MHAPP.ELE01_AWOS t where  cccc='ZSSS' and RNO='02' and rownum=1 order by receivetime desc"
    return db.executeQuery(sql, '')
  }
}
