import * as db  from '../dao/getdb'

export const  getRNO01 = () => {
  const sql = "select  * from MHAPP.ELE01_AWOS t where  cccc='ZSSS' and RNO='02' and odate = to_char(sysdate,'yyyymmdd') and otime = to_char(sysdate,'hh24mi')";
  return db.executeQuery(sql, '')
}

export const getRNO02 = () => {
  return db.executeQuery('select * from user_tables where rownum=1', '')
}

