var express=require("express");
var  router=express.Router();
var  pool=require("../pool")
router.post("/addcart",(req,res)=>{

	var  obj=req.body
		var  n=400
		for(var  key in obj){
			n++;
			if(!obj[key]){
				res.send(`{code:${n},msg:${key} is required}`)
					return 
			}
		}
		var  sql	=`select * from  xz_shoppingcart_item  where  user_id=? and  product_id=?`
		pool.query(sql,[obj.user_id,obj.product_id],(err,result)=>{
			if(err) throw  err;
			if(result.length>0){   //有   update  
				console.log(result)
				var  sql=`update  xz_shoppingcart_item  set  count=count+ ?   where  user_id=? and  product_id=?`
				pool.query(sql,[obj.count,obj.user_id,obj.product_id],(err,result)=>{
					if(err) throw  err;
					if(result.affectedRows>0){   // 更新成功
						res.send(`{
							code:200,msg:"update  success"
						}`)
					}else{   //更新失败
						res.send(`{
							code:204,msg:"update  fail"
						}`)
					}
				})
			}else{   //  无   insert
				var  sql=`insert into xz_shoppingcart_item  set  ? `
				pool.query(sql,[obj],(err,result)=>{
					if(err) throw  err;
					if(result.affectedRows>0){   // insert成功
						res.send(`{
							code:300,msg:"insert  success"
						}`)
					}else{   //insert  失败
						res.send(`{
							code:304,msg:"insert  fail"
						}`)
					}
				})
			}
		})
})
module.exports=router