import UserDAO from "../DAO/classes/usersDAO.model.js";
import transport from "../utils/nodemailer.js";

const userDAO = new UserDAO();

class UserServices{
    async profile(userData){
        try{
            const profileFound = await userDAO.profile(userData);
            return profileFound;
        }
        catch{
            return { code: 400, result: { status: "error", message: "Error getting the user" } };
        }
    }

    async admpanel(){
        try{
            const users = await userDAO.admpanel()
            return users;
        }
        catch{
            return { code: 400, result: { status: "error", message: "Error getting all the users" } };
        }
    }

    async updateToPremium(userFound){
        try{
            const userUpdated = await userDAO.updateToPremium(userFound);
            return userUpdated
        }
        catch{
            return { code: 400, result: { status: "error", message: "Error updating the users" } };
        }
    }

    async innactiveUsers(){
            try {
                const allUsers = await userDAO.getAllUsers();
                const usersToDelete = allUsers.filter((user) => {
                    const today = new Date();
                    const lastConnection = new Date(user.lastConection);
                    const diffTime = Math.abs(today.getTime() - lastConnection.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays > 2 && user.role == "user";
                });
                await userDAO.deleteUsers(usersToDelete);
                usersToDelete.forEach(async (user) => {
                    await transport.sendMail({
                        from: "LOTRShop <gregodelgado182@gmail.com>",
                        to: user.email,
                        subject: "Account deleted",
                        html: `<p>Your account has been deleted due to innactivity.</p>`,
                    });
                });
                return { code: 200, result: { status: "success", message: "all inactive users has been deleted" } };
            }
        catch(err){
            
            return { code: 400, result: { status: "error", message: "Error deleting the users" } };
        }
    }

    async deleteUser(userFound){
        try{
            const user = await userDAO.deleteUser(userFound)

            return user;
        }
        catch{
            return { code: 400, result: { status: "error", message: "Error deleting the users" } };
        }
    }
}

export default UserServices;