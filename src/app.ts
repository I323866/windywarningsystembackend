import express from 'express'
import middlewares from './middlewares'
// Create Express server
const app = express()
const port = process.env.PORT || '3000'
app.all('*', function(req, res, next) {    
res.header("Access-Control-Allow-Origin", "*");    
res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");    
res.header("X-Powered-By",' 3.2.1')    
res.header("Content-Type", "application/json;charset=utf-8");    next();});

app.set('port', port)
middlewares(app)
export default app

