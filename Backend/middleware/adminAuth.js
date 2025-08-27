import jwt from 'jsonwebtoken'

const adminAuth=async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.json({sucess:false,message:"Not Authorized Login Again"})
        }
        const token = authHeader.split(' ')[1];
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        req.admin = {adminEmail:token_decode.email}
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default adminAuth;