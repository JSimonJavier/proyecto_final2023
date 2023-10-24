import UserServices from "../services/user.service.js";

const userServices = new UserServices();

class UserController{

    async userLogin(req, res){
            if (!req.user) {
              return res.json({ error: 'invalid credentials' });
            }
            
        
             req.session.user = {  
        
              _id: req.user._id,
              email: req.user.email,
              firstName: req.user.firstName,
              lastName: req.user.lastName,
              role: req.user.role,
              cartId: req.user.cartId
        
            }      
            return res.redirect("/api/products")
              
            }
//-------------------------------------------------------------------------------------------
    async login(req, res){
       return res.render("login",{})
    }
//-------------------------------------------------------------------------------------------
    async failLogin(req, res){
        return res.json({ error: 'fail to login' });
    }
//-------------------------------------------------------------------------------------------
    async logout(req, res){

            req.session.destroy((err)=> {
              if(err){
                return res.json({
                  status: "LogOut ERROR", 
                  body: err
                })
              }
              
              res.render("logout", {});
            })
          
    }
//-------------------------------------------------------------------------------------------
    async register(req, res){
        
        return res.render("register",{})
    }
//-------------------------------------------------------------------------------------------
    async userRegister(req, res){
            try{
              if (!req.user) {
                return res.json({ error: 'something went wrong' });
              }
                req.session.user = {
                  
                  _id: req.user._id,
                  email: req.user.email,
                  firstName: req.user.firstName,
                  lastName: req.user.lastName,
                  role: req.user.role,
                  cartId: req.user.cartId
          
                }
          
               return res.redirect("/api/products")
            }
            catch(err){
                return res.status(401).render("error", {err: "Error creating the account"}) 
            }
          
    }
//-------------------------------------------------------------------------------------------
    async failregister (req, res){
    return res.json({ error: 'fail to register' });
  }
//-------------------------------------------------------------------------------------------
  async profile (req, res){
        
            const profileFound = req.session.user;
           
            const userFound = await userServices.profile(profileFound)

            return res.status(200).render("profile", userFound) 
  }

//-------------------------------------------------------------------------------------------
  async admpanel(req,res){

    const users = await userServices.admpanel()

    return res.status(200).render("adminManagment", {users})
  }
//-------------------------------------------------------------------------------------------
async getAllUsers(req,res){

  const users = await userServices.admpanel()

  return res.status(200).render("users", {users})
}

//-------------------------------------------------------------------------------------------

async innactiveUsers(req, res){

    const userDeletes = await userServices.innactiveUsers();
    return res.status(200).json({data: userDeletes});
}

async updateToPremium(req, res){

    const userFound = req.params.uid

    const userUpdate = await userServices.updateToPremium(userFound)

    return res.status(200).json({
      data: userUpdate
    });
}

async deleteUser(req, res){

  const userFound = req.params.uid

  const userDelete = await userServices.deleteUser(userFound)

  return res.status(200).json({
    data: userDelete
  })
}
} 

export default UserController;