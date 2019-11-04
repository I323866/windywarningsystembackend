import oracledb from 'oracledb'

const config = {
  user: 'userdbs', // 用户名SYSTEM
  password: 'userdbs', // 密码123456
  // IP:数据库IP地址，PORT:数据库端口，SCHEMA:数据库名称
  connectString: '172.23.6.34:1521/ZSSS' //localhost:1521/ORCL
}
let connection: any = ''
async function executeQuery(sql: string, paramArr: any) {
  try {
    connection = await oracledb.getConnection(config)
    oracledb.fetchAsBuffer = [oracledb.BLOB]
    oracledb.fetchAsString = [oracledb.CLOB]

    const result = await connection.execute(
      // The statement to execute
      sql
    )

    // console.log(result.metaData) // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
    // console.log(result.rows) // [ [ 180, 'Construction' ] ]
    return result
  } catch (err) {
    console.error(err)
  } finally {
    doRelease(connection)
  }
}

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
export { executeQuery }
