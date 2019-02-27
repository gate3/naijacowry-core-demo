
const signupController = ({userModel, encryptionHelper, cacheHelper}) => async ({username, first_name, last_name, password}) => {
    try{
        const user = new userModel();
        user.first_name = first_name;
        user.last_name = last_name;
        user.username = username;
        const pass = encryptionHelper.hashSync(password);
        user.password = pass;
        const result = await user.save();
        await cacheHelper.addToSet(cacheHelper.CONSTANTS.USERNAMES, username)
        return Promise.resolve(result)
    }catch(e){
        if(e.code === 11000) {
            return Promise.reject('Usernmae already exists');
        } 
        return Promise.reject(e)
    }
}

module.exports = signupController;