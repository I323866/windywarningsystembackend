import oracledb from 'oracledb'

const config = {
  user: 'SYSTEM', // 用户名
  password: '123456', // 密码
  // IP:数据库IP地址，PORT:数据库端口，SCHEMA:数据库名称
  connectString: 'localhost:1521/ORCL'
}
let connection:any ="";
async function executeQuery(sql:string, paramArr:any) {
  try {
    connection = await oracledb.getConnection(config)
    oracledb.fetchAsBuffer = [oracledb.BLOB]
    oracledb.fetchAsString = [oracledb.CLOB]

    const result = await connection.execute(
      // The statement to execute
      sql
    )

    console.log(result.metaData) // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
    console.log(result.rows) // [ [ 180, 'Construction' ] ]
    return result
  } catch (err) {
    console.error(err)
  } finally {
     doRelease(connection)
  }
}
// async function executeQuery(sql:string, paramArr:any) {
//   return async function (callback:any) {// 这里是给async提供的回调
//     oracledb.getConnection(config,
//       async  function (err, connection) {
//               if (err) {
//                   console.error(err.message);
//                   return;
//               }
//               const result = await connection.execute(
//                   sql,
//                   function (err:any, result:any) {
//                       if (err) {
//                           console.error(err.message);
//                           return;
//                       }
//                       doRelease(connection);
//                       return callback(err, result);
//                   });
//                   return result
//           });
//   }
// }
function doRelease(connection: any) {
  connection.close(
    // tslint:disable-next-line:only-arrow-functions
    function(err: any) {
      if (err) {
        console.error(err.message)
      }
    }
  )
}
export const  getRNO01 = () => {
  return executeQuery('select * from user_tables where rownum=1', '')
}

export const getRNO02 = () => {
  const data = executeQuery('select * from user_tables where rownum=1', '')
  return data
}

export const getRNO03 = () => {
  const data = executeQuery('select * from user_tables where rownum=1', '')
  return data
}
