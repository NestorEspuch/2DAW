const os = require('os');
try{
    console.log(os.userInfo().username);
}catch(e){
    console.log(e);
}