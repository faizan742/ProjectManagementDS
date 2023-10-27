const prompt=require("prompt-sync")();

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
                process.exit(0);
              break;
            case 1:
              console.log( "Monday");
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

