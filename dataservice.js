database={


    1000:{acno:1000,uname:"anu",password:1000},
    1001:{acno:1001,uname:"manu",password:1001},
    1002:{acno:1002,uname:"sanu",password:1002}
  }

//   login definition



const login= (acno,password,uname)=>{

    if(acno in this.database){
      return false
    }
    else{

      database[acno]={
        acno,
        uname,
        password
     

      }
      console.log(database);
      return true

    }

}
module.exports={
    login
}