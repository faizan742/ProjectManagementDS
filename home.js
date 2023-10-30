const prompt = require("prompt-sync")();
const fs = require('fs');
let impdata = require("./data.js");
let functionality = require('./adminfunctions.js');

// console.log(impdata);
// impdata['UserID']=impdata.UserID+1;





if(impdata.RunProgram==0){
    
    impdata['RunProgram']=impdata.RunProgram+1;
    functionality.creataDep(impdata['DepID'],'Admin Dep','0425689741',["isCreate","isDelete","isUpdate"]);
    adminobj={
      "name":'Faizan zia',
      "age":23,
      "salary":3000000,
      "contact":'0306-6956149',
      "address":"House no 1 Lahore"
    };
    functionality.creataAdmin(impdata['UserID'],adminobj);
    impdata['DepID'] = impdata.DepID+1;
    impdata['UserID'] = impdata.UserID+1;
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
    console.log('8: ALL Employee\'s Details');
    console.log('0: Exit')

    var op=prompt("Please Enter Your Option ");
    let option = parseInt(op);
    

    if (!isNaN(option)) {
        switch (option) {
            case 0:    
                saveImpData();      
                functionality.saveData();
                process.exit(0);
                break;
            case 1:
              functionality.creataEmp(impdata['UserID']);
              impdata['UserID']=impdata.UserID+1;
              break;
            case 2:
               functionality.UpdateEmp();
              break;
            case 3:
              token=prompt("Please Enter Your Token ");
              functionality.othercreataDep(impdata['DepID']);
              impdata['DepID']=impdata.DepID+1;
              break;
            case 4:
              functionality.AddPermission();
              break;
            case 5:
              functionality.RemovePermission();
              break;
            case  6:
              functionality.DeleteEmployee();
              break;
            case  7:
                functionality.showDetails();
                break;
            case  8:
              functionality.showALL();
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

