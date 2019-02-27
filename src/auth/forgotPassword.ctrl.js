
const forgotPasswordController = ({userModel, randomNumberGenerator, cacheHelper, encryptionHelper}) => async ({username}) => {
    const user = await userModel.findOne({ username });
    try{
        if(user == null){
            throw new Error(errorMessage)
        }else{
            const newPassword = randomNumberGenerator.generate({
                length: 8,
                charset: 'numeric'
            });
            const encryptedTempPass = encryptionHelper.hashSync(newPassword);
            user.temporary_password = encryptedTempPass
            const result = await user.save()
            await sendNewPassword(newPassword)
            return Promise.resolve('New password sent')
        }
    }catch(e){
        return Promise.reject(e)
    }
}

const sendNewPassword = (newPassword) => {
    console.log(newPassword)//simulate send, this function will later take a notifications function
    return Promise.resolve(true)
}

module.exports = forgotPasswordController;
