import express from "express"
import { login, register } from "../controller/userController.js"
import { isAuthenticate } from "../middleware/userMiddleware.js"

const router = express.Router()

router.post('/register',register)
router.post('/login',login)

router.get('/me',isAuthenticate,async(req,res)=>{
    res.status(200).json(req.user)
})
export default router