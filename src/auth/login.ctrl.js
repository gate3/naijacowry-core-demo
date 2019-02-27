
const loginController = ({userModel, encryptionHelper, cacheHelper}) => async ({username, password}) => {
    const cacheResult = await cacheHelper.checkIfInSet(cacheHelper.CONSTANTS.USERNAMES, username)
    const errorMessage = 'Password or username incorrect.';
    if(!cacheResult){
        throw new Error(errorMessage)
    }
    try{
        const result = await userModel.findOne({ username });
        
        if(result == null){
            throw new Error(errorMessage)
        }
        
        if(encryptionHelper.compareSync(password, result.password)){
            const user = result.toObject()
            delete user.password
            return Promise.resolve(user)
        }
        throw new Error(errorMessage)
    }catch(e){
        return Promise.reject(e)
    }
}

module.exports = loginController;