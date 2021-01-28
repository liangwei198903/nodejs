const  express=require('express');
var  app=express();
var  indexRouter=require("./routes/cart.js")
var  bodyParser=require("body-parser")
app.listen(8099,()=>{
	console.log('server create ok and listen 8099 ；'+new Date().toLocaleString())
})
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({
	extended:false
}))
app.use("/cart",indexRouter)