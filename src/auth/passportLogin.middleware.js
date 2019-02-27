const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {container} = require('../../initAwilix');

const localStrategyObject = {    
    usernameField: 'username',
    passwordField: 'password'  
}

passport.use('login', new LocalStrategy(localStrategyObject), async (username, password, done)=>{
    try{
        const user = await container.resolve('loginCtrl')({username, password});
        return done(null, user)
    }catch(e){
        return done(e, false)
    }
});
