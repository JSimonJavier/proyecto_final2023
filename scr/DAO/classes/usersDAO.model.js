import { UserModel } from "../models/users.model.js";

class UserDAO{

    async admpanel(){
        const users = (await UserModel.find().lean());
        return users;
    }

    async deleteUsers(usersToBeDeleted){
        const deleteManyQuery = {
            _id: {
                $in: usersToBeDeleted.map((user) => user._id),
            },
        };
        await UserModel.deleteMany(deleteManyQuery);
    }

    async findById(profileFound){
        
        const userData = await UserModel.findById(profileFound)

        return userData;
    }


    async profile(profileFound){
        
        const userData = await UserModel.findOne({email: profileFound.email})

        return userData;
    }

    
    async updateToPremium(userFound){

        const userUpdate = await UserModel.updateOne({ _id: userFound },  {role: "premium"} )

        return userUpdate;
    }

    async deleteUser(userFound){

        const userDelete = await UserModel.findByIdAndDelete(userFound);

        return userDelete;
    }
}

export default UserDAO;