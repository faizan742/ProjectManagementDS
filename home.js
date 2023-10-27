const prompt = require("prompt-sync")();
const fs = require('fs');
let impdata = require("./data.js");
let functionality = require('./adminfunctions.js');
// console.log(impdata);
// impdata['UserID']=impdata.UserID+1;





if(impdata.RunProgram==0){
    
    impdata['RunProgram']=impdata.RunProgram+1;
    functionality.creataDep(impdata['DepID'],'Faizan Zia','03066956149',["isCreate","isDelete","isUpdate"]);
    
}
else
{

}
while(true){
    console.log('Welcome To Developers Studio Employee Management System');
    console.log('1: Create Employee');
    console.log('2: Update Employee');
    console.log('3: Create New Department');
    console.log('4: Add Employee permissions');
    console.log('5: Remove Employee Permissions');
    console.log('6: Delete Employee');
    console.log('7: Get Employee Details');
    console.log('0: Exit')

    var op=prompt("Please Enter Your Option ");
    let option = parseInt(op);
    

    if (!isNaN(option)) {
        switch (option) {
            case 0:    
                saveImpData();      
                process.exit(0);
                break;
            case 1:
              functionality.creataEmp(impdata['UserID']);
              impdata['UserID']=impdata.UserID+1;
              break;
            case 2:
               console.log( "Tuesday")
              break;
            case 3:
              console.log("Wednesday")
              break;
            case 4:
              console.log("Thursday");
              break;
            case 5:
              console.log("Friday")
              break;
            case  6:
              console.log("Saturday");
              break;
            default:
               break;
          }
    } else {

       console.log("You did not enter a valid integer.");
    }
}
function saveImpData(){
    fs.writeFileSync('data.js',"module.exports=filedata=" +JSON.stringify(impdata, null, 4) , "utf-8",function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
}

