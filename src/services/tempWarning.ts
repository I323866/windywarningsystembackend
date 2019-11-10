import * as db from '../dao/getdb'
import message from './message'
export const checkTEMPWarning = async () => {
  const HQlatestdata = await getHQLatest()
  const HQlatesttemp1 = HQlatestdata.rows[0][0]
  const HQlatesttemp2 = HQlatestdata.rows[1][0]
  if (HQlatestdata) {
    const receivetime = HQlatestdata.rows[0][1]
    return {
      warning1: checkTemp(HQlatesttemp1, HQlatesttemp2), //告警内容【类别：2.1本场温度变化≥2℃】
      warning3: checkTEMPMAXMIN(HQlatesttemp1), //告警内容【类别：2.3低温高温】
      receivetime: receivetime
    }
}
//  告警内容【类别：风向趋势告警，内容：注意风向变化】
function checkTemp(TEMP1: any, TEMP2: any) {
  if (Math.abs(TEMP1 - TEMP2) >= 2) {
    const data = {
      type: '温度告警',
      category : '2.1',
      content: '温度快速变化 '
    }
    message.addMessage(data)
    return data
  }
}
function checkTEMPMAXMIN(TEMP1: any) {
  if (TEMP1 >= 35 || TEMP1 <= 0 ) {
    const data = {
      type: '低温高温告警',
      category : '2.3',
      content: '注意低温高温'
    }
    message.addMessage(data)
    return data
  }
}
async function getHQLatest() {
  const sql =
    "select TEMPERATURE , receivetime from MHAPP.ELE01_SASP t where  cccc='ZSSS' and rownum<3 order by receivetime desc"
  return db.executeQuery(sql, '')
}
}
