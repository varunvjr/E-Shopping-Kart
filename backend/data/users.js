import bcrypt from 'bcryptjs';
const users=[
    {
        name:"ellie",
        email:"ellie@Ekart.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:false
    },
    {
        name:"Allan",
        email:"Allan@Ekart.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:false
    },
    {
        name:"Adam",
        email:"Adam@Ekart.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:false
    },
    {
        name:"Rowan",
        email:"Rowan@Ekart.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:true
    }
]
export default users;