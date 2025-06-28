import httpStatus from 'http-status';
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
const register = async (req, res) => {
    const { name, username, password } = req.body;
    try {
        const exisitingUser = await User.findOne({ username });
        if (exisitingUser) {
            return res.status(httpStatus.FOUND).json({
                message: "User already Exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });
        await newUser.save();

        res.status(httpStatus.CREATED).json({
            message: "User Register Successfully"
        })
    } catch (error) {
        res.json({
            message:"Something went wrong"
        })
    }
}

const login = async (req , res)=>{
    const {username, password } = req.body;
    if(!username || !password){
        return res.status(400).json({
            message:"Please Provide"
        })
    }
    try{
        const exisitingUser = await User.findOne({ username });
        if (!exisitingUser) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "User already Exists"
            });
        }
        let isPasswordCorrect = await bcrypt.compare(password , exisitingUser.password );
        if(isPasswordCorrect){
            let token = crypto.randomBytes(20).toString('hex');
           
            exisitingUser.token = token;
            await exisitingUser.save();
            return res.status(httpStatus.OK).json({
                token:token
            });
        }else{
            return res.status(httpStatus.UNAUTHORIZED).json({
                message:"Invalid username or password"
            })
        }

    }catch(error){
         res.status(400).json({
            message:"Something went wrong"
        })
    }
}

export {login , register};