const { trace } = require('console');
const fs = require('fs');
const { prependOnceListener } = require('process');
const prompt = require("prompt-sync")();
let date=new Date();

function generateRandomToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }

    return token;
}

const readPeople = () => {
    const rawData = fs.readFileSync('people.json');
    return JSON.parse(rawData);
};

const readDep = () => {
    const rawData = fs.readFileSync('Dep.json');
    return JSON.parse(rawData);
};

const readActivities = () => {
    const rawData = fs.readFileSync('Activities.json');
    return JSON.parse(rawData);
};

let peopleData = readPeople();
let depData = readDep();

let activitieslist=readActivities();


let deplist  = depData.map((depname)=>{
    return{
        "Dep_Id":depname.id,
        "Dep_name":depname.departmentName,
        "permissions":depname.permissions,
    };
    
});

function checkToken(token){
    try {
        check=false;
        findpeople=peopleData.filter((people)=>{
            
          if(token==people.token){
            if(people["permissions"].includes('isCreate')==true){
                check=true;
            }
            //return people;
          }
        });
           return check;
        
    } catch (error) {
        console.log(error);
    }
    }
function checkUpdatePermission(token){
    try {
        findpeople=peopleData.filter((people)=>{
            if(token==people.token){
                return people;
            }
            });
            //console.log(findpeople)
            findpeople=findpeople[0];
            return findpeople;
        
        
    } catch (error) {
        console.log(error);
    }
    }
function creataDep(id,name,contact,permissions){
    try {
        dep= {
            "id": id,
            "departmentName": name,
            "contactNo":contact,
            "permissions": permissions,
            "createdAt": date.toString(),
            "updatedAt": ""
          }
         depData.push(dep);
         deplist.push(name);
    } catch (error) {
        console.log(error);
    }

     
}
function isName(input) {
    const namePattern = /^[a-zA-Z\s]+$/;
    return namePattern.test(input);
}
function pushActivity(id,text){
    activitieslist.push({
        "id":id,
        "Activity":text,
        "Date":date.toString(),
      });
}
function isNumeric(input) {
    const numericPattern = /^-?\d*\.?\d+$/;
    return numericPattern.test(input);
}
function creataEmp(ID,activityID){
   try {
    token=prompt("Please Enter Your Token of Verfication ");
    
    if(checkToken(token)==true){
        
        while(true){
        empname=prompt("Please Enter New Employee Name ");
        if(isName(empname)){
           break;
        }
    }    
        while(true){
            salary=prompt("Please Enter New Employee Salary ");
            if(isNumeric(salary)){
            break;
        }
    }
        while(true){
            age=prompt("Please Enter New Employee Age ");
            if(isNumeric(age)){
               break;
        }
    }
    address=prompt("Please Enter New Employee Address ");
    contact=prompt("Please Enter New Employee Contact ");
    console.log("Please See The Gaven Below Departement List and Enter Name as gaven below");
    deplist.forEach(element => {
        console.log(element.Dep_name);
    });
    dep=prompt();
    depid=0;
    deplist.filter((value)=>{
        if(dep==value.Dep_name){
            //console.log(value.Dep_Id);
            depid=value.Dep_Id
            return value;
        }
    });
    emptoken=generateRandomToken(12);
    people={
        "id": ID,
        "name": empname,
        "age": age,
        "salary": salary,
        "token":emptoken,
        "contactDetails": [
          {
            "phone": contact,
            "address":address
          }
        ],
        "permissions":[],
        "departmentId": depid,
        "createdAt": date.toString(),
        "updatedAt": ""
      };
      peopleData.push(people);
      createpeople=checkUpdatePermission(token);
      
      
      pushActivity(activityID,text=`The ${createpeople.name} has Created an Employee ${people.name}`); 
      console.log('THE Employee has Been Created');
      console.table(people); 

    }else{
    console.log('You Are Not Autherizated To Make Employes');
    
    }
   } catch (error) {
    console.log(error);
   } 
    
}

const saveData = () => {
    fs.writeFileSync('Dep.json', JSON.stringify(depData, null, 4));
    fs.writeFileSync('people.json', JSON.stringify(peopleData, null, 4));
    fs.writeFileSync('Activities.json', JSON.stringify(activitieslist, null, 4));
};

function creataAdmin(ID,adminobj){
    try {
     emptoken=generateRandomToken(12);
     people={
         "id": ID,
         "name":adminobj.name,
         "age": adminobj.age,
         "salary":adminobj.salary,
         "token":emptoken,
         "contactDetails": [
           {
             "phone": adminobj.contact,
             "address":adminobj.address
           }
         ],
         "permissions":["isCreate","isDelete","isUpdate"],
         "departmentId": 1,
         "createdAt": date.toString(),
         "updatedAt": ""
       };
       peopleData.push(people);
       
 
     
    } catch (error) {
     console.log(error);
    } 
     
 }


function showDetails(){
    ID=prompt("Enter The Employee ID ");
    peopleData.filter((people)=>{
        
        if(ID==people.id){
          console.table(people);
        }
      });
}
function showALL(){
   for(let x of peopleData){
    console.table(x);
   }
}
function GavePermission(value){
ans=prompt('Do you Want To Gave All The Permission To The '+ value +' (y/n)');
if(ans=='y' || ans=='Y'){
    return ['isCreate','isDelete','isUpdate']
}
else{
    ans=prompt('Do you Want To Gave  The Permission For Create and Update To The '+ value +' (y/n)');
    if(ans=='y' || ans=='Y'){
        return ['isCreate','isUpdate']
    }else{
        ans=prompt('Do you Want To Gave The Permission For Create and Delete To The '+ value +' (y/n)');
            if(ans=='y' || ans=='Y'){
                return ['isCreate','isDelete']
            }else{
                ans=prompt('Do you Want To Gave The Permission For Delete and Update To The '+ value +' (y/n)');
                    if(ans=='y' || ans=='Y'){
                        return ['isDelete','isUpdate']
                    }else{
                        ans=prompt('Do you Want To Gave The Permission For just To Create  To The '+ value +' (y/n)');
                            if(ans=='y' || ans=='Y'){
                                return ['isCreate']
                            }else{
                                ans=prompt('Do you Want To Gave The Permission For just Update To The '+ value +' (y/n)');
                                    if(ans=='y' || ans=='Y'){
                                        return ['isUpdate']
                                    }else{
                                        ans=prompt('Do you Want To Gave The Permission For just Delete To The '+ value +' (y/n)');
                                            if(ans=='y' || ans=='Y'){
                                                return ['isDelete']
                                            }else{
                                               return [];
                                            }
                                    }
                            }   
                    }
            }
    }
}

}


function othercreataDep(id,token,activityID){
    try {
        if(checkToken(token)==true){
            depname=prompt("Please Enter New Departement Name ");
            number=prompt("Please Enter  Contact Number ");
            permissions=GavePermission('Departement');         
            dep= {
               "id": id,
               "departmentName": depname,
               "contactNo":number,
               "permissions": permissions,
               "createdAt": date.toString(),
               "updatedAt": ""
             }
            depData.push(dep);
            deplist.push({"Dep_Id":id,"Dep_name":depname,"permissions":permissions});
            createpeople=checkUpdatePermission(token);
      
            

            pushActivity(activityID,text=`The ${createpeople.name} has Created an Department ${depname}`);
        }else{
            console.log("YOU DOES NOT HAVE PREMISSION TO MAKE Departement");
        }
        
    } catch (error) {
        console.log(error);
    }
     
}


function getEmpID(ID){
        try {
           findpeople=peopleData.filter((people)=>{
               if(ID==people.id){
                 return people;
               }
             });
             //console.log(findpeople)
             findpeople=findpeople[0];
             return findpeople;
         
           
        } catch (error) {
           console.log('NOT WORKING');
        }
       }
   

function getDepID(depID){
    try {
        Depname=deplist.filter((value)=>{
            if(value.Dep_Id==depID){
                return value.Dep_name;
            }
           });
           Depname=Depname[0];
           return Depname;
        
    } catch (error) {
        console.log('NOT WORKING');
    }

}
function checkingPremission(deppre, perList){
    try {
        for (const value of perList) {
            if (!deppre.includes(value)) {
              return false;
            }
          }
          return true;
        
    } catch (error) {
        console.log('NOT WORKING');
    }

}
function AddPermission(activityID){
    try {
        token=prompt("Enter The Editor Token ");
        ID=prompt("Enter The Employee ID ");
        user1=checkUpdatePermission(token);
        user2=getEmpID(ID);
    
        user1dep=getDepID(user1.departmentId);
        user2dep=getDepID(user2.departmentId);
    
        
        if((user1dep.Dep_name == "Hr Dep" || user1dep.Dep_name == "Admin Dep" || user1dep.Dep_name == user2dep.Dep_name) && user1.permissions.includes('isUpdate')==true){
            deppre=[];
            deplist.forEach((value)=>{
                if(value.Dep_Id==user2.departmentId){
                    deppre=value.permissions;
                    console.log(value.permissions);
                }
    
            })
               console.log("Please Write The Correct Spellings and place (,) after each permission and \n you can only gave the permission show above");
               perList=prompt('Please Enter The Permission You want To gave ');
               perList=perList.split(',');
               perList=perList.filter(item => item.trim() !== '');
               
               const result = checkingPremission(deppre, perList);
    
                if (result) {
                    for(let people of peopleData){
                        if(people.id===user2.id){
                            for(let x of perList){
                                if(people['permissions'].includes(x)==false){
                                    people['permissions'].push(x);

                                }
                                
                            }
                            people['updatedAt']=date.toString();
                            
                        }
                    }
                    // activitieslist.push({
                    //     "id":activityID,
                    //     "Activity":`The ${user1.name} has Updated Premissions of  Employee ${user2.name}`,
                    //     "Date":date.toString(),
                    //   });
                    pushActivity(activityID,text=`The ${user1.name} has Updated Premissions of  Employee ${user2.name}`);

                } else {
                console.log("NO PreMission Added");
                }
    
    
        }else{
            console.log('You can Not Add Permission')
        }
        
    } catch (error) {
        console.log('NOT WORKING');
    }

}
function  DeleteEmployee(activityID){
    try {
    token=prompt("Enter The Editor Token ");
    ID=prompt("Enter The Employee ID ");
    user1=checkUpdatePermission(token);
    user2=getEmpID(ID);

    user1dep=getDepID(user1.departmentId);
    user2dep=getDepID(user2.departmentId);

    if(user1dep.Dep_name=="Admin Dep" && user2dep.Dep_name=="Admin Dep"){
        if(user1.permissions.includes('isDelete')==true){
            peopleData = peopleData.filter(obj => obj.id !== user2.id);
            // console.log('Employee has Been Deleted');
            // activitieslist.push({
            //     "id":activityID,
            //     "Activity":`The ${user1.name} has Deleted an Employee ${user2.name}`,
            //     "Date":date.toString(),
            //   });
            pushActivity(activityID,text=`The ${user1.name} has Deleted an Employee ${user2.name}`);
        }else{
            console.log('Employee has not Been Deleted');
        }
            
    }else if(user1dep.Dep_name!="Admin Dep" && user2dep.Dep_name=="Admin Dep"){
        console.log('YOU Can Not Delete an Admin ');
    }else
    {
        if((user1dep.Dep_name == "Hr Dep" || user1dep.Dep_name == "Admin Dep" || user1dep.Dep_name == user2dep.Dep_name) && user1.permissions.includes('isDelete')==true){
            peopleData = peopleData.filter(obj => obj.id !== user2.id);
            console.log('Employee has Been Deleted');
            // activitieslist.push({
            //     "id":activityID,
            //     "Activity":`The ${user1.name} has Deleted an Employee ${user2.name}`,
            //     "Date":date.toString(),
            //   });
              pushActivity(activityID,text=`The ${user1.name} has Deleted an Employee ${user2.name}`);    
        }else{
            console.log('You can Not Delete Employee')
        }
    }
        
    } catch (error) {
        console.log('NOT WORKING');
    }
}
function RemovePermission(activityID){
    try {
        token=prompt("Enter The Editor Token ");
        ID=prompt("Enter The Employee ID ");
        user1=checkUpdatePermission(token);
        user2=getEmpID(ID);
        
        user1dep=getDepID(user1.departmentId);
        user2dep=getDepID(user2.departmentId);
        
        if(user1dep.Dep_name=="Admin Dep" && user2dep.Dep_name=="Admin Dep"){
            if(user1.permissions.includes('isUpdate')==true){
                deppre=[];
               console.log(user2.permissions);
               console.log("Please Write The Correct Spellings and place (,) after each permission and \n You can only gave the permission show above");
               perList=prompt('Please Enter The Permission You want To Remove ');
               perList=perList.split(',');
               perList=perList.filter(item => item.trim() !== '');
               
               const result = checkingPremission(user2.permissions, perList);
    
                if (result) {
                    for(let value of perList){
                        if(user2.permissions.includes(value)==true){
                            index = user2.permissions.indexOf(value);
                            user2.permissions.splice(index, 1);
                        }
                    }

                    for(let people of peopleData){
                        if(people.id==user2.id){
                            people['permissions']=user2.permissions;
                            people['updatedAt']=date.toString();
                        }
                    }

                    // activitieslist.push({
                    //     "id":activityID,
                    //     "Activity":`The ${user1.name} has Removed The Premissions of Employee ${user2.name}`,
                    //     "Date":date.toString(),
                    // });
                    pushActivity(activityID,text=`The ${user1.name} has Removed The Premissions of Employee ${user2.name}`);
                console.log('Employee has Been Updated');
            }
        }else{
                console.log('Employee has Not Been Updated');
            }
                
        }else if(user1dep.Dep_name!="Admin Dep" && user2dep.Dep_name =="Admin Dep"){
            console.log('YOU Can Not Update an Admin ');
        }else
        {
            if((user1dep.Dep_name == "Hr Dep" || user1dep.Dep_name == "Admin Dep" || user1dep.Dep_name == user2dep.Dep_name) && user1.permissions.includes('isUpdate')==true){
                deppre=[];
                console.log(user2.permissions);
                   console.log("Please Write The Correct Spellings and place (,) after each permission and \n You can only gave the permission show above");
                   perList=prompt('Please Enter The Permission You want To Remove ');
                   perList=perList.split(',');
                   perList=perList.filter(item => item.trim() !== '');
                   
                   const result = checkingPremission(user2.permissions, perList);
        
                    if (result) {
                        for(let value of perList){
                            if(user2.permissions.includes(value)==true){
                                index = user2.permissions.indexOf(value);
                                user2.permissions.splice(index, 1);
                            }
                        }
    
                        for(let people of peopleData){
                            if(people.id==user2.id){
                                people['permissions']=user2.permissions;
                                people['updatedAt']=date.toString();
                            }
                        }
                        pushActivity(activityID,text=`The ${user1.name} has Removed The Premissions of Employee ${user2.name}`);
                    } else {
                    console.log("NO PreMission Added");
                    }
            }else{
                console.log('You can Not Remove Permission')
            }
        }
    
    } catch (error) {
        console.log('NOT WORKING');
    }
}

function UpdateEmpValue(){
    try {
        upobj = {};
        ans = prompt('Do you Want Update Employee Data  (y/n)');
        if (ans == 'y' || ans == 'Y') {
            ans = prompt('Do you Want Enter New name (y/n)');
            if (ans == 'y' || ans == 'Y') {
                ans = prompt('Please Enter the New Name ');
                upobj["name"] = ans;
            }
            ans = prompt('Do you Want Enter The Age (y/n)');
            if (ans == 'y' || ans == 'Y') {
                ans = prompt('Please Enter the New Age ');
                upobj["age"] = ans;
            }
            ans = prompt('Do you Want New Salary (y/n)');
            if (ans == 'y' || ans == 'Y') {
                ans = prompt('Please Enter the New Salary ');
                upobj["salary"] = ans;
            }
        
            ans = prompt('Do you Want New Contact (y/n)');
            if (ans == 'y' || ans == 'Y') {
                upobj["contactDetails"] = {}; // Create the contactDetails object
                ans = prompt('Please Enter the New Contact Number ');
                upobj["contactDetails"]["phone"] = ans;
            }
            
            ans = prompt('Do you Want New Address (y/n)');
            if (ans == 'y' || ans == 'Y') {
                if (!upobj["contactDetails"]) {
                    upobj["contactDetails"] = {}; // Create the contactDetails object if it doesn't exist
                }
                ans = prompt('Please Enter the New Address ');
                upobj["contactDetails"]["address"] = ans;
            }
        
            //console.log(upobj);
            return upobj;
        } else {
            console.log("No updates requested.");
            return upobj;
        }
    } catch (error) {
        console.log('NOT WORKING');
    }



    
}

function UpdateEmp(activityID){
    try {
    token=prompt("Enter The Editor Token ");
    ID=prompt("Enter The Employee ID ");
    user1=checkUpdatePermission(token);
    user2=getEmpID(ID);

    user1dep=getDepID(user1.departmentId);
    user2dep=getDepID(user2.departmentId);

    
    if((user1dep.Dep_name == "Hr Dep" || user1dep.Dep_name == "Admin Dep" || user1dep.Dep_name == user2dep.Dep_name) && user1.permissions.includes('isUpdate')==true){
       upobj=UpdateEmpValue();
       upobj["updatedAt"]=date.toString();
       if(Object.keys(upobj).length != 0){
        const personIndex = peopleData.findIndex((p) => p.id === user2.id);
        if (personIndex !== -1) {
            peopleData[personIndex] = { ...peopleData[personIndex], ...upobj };
            
        }
       }
    //   activitieslist.push({
    //     "id":activityID,
    //     "Activity":`The ${user1.name} has Updated an Employee ${user2.name}`,
    //     "Date":date.toString(),
    //   });                    
    pushActivity(activityID,text=`The ${user1.name} has Updated The Employee ${user2.name}`);
    }else{
        console.log('You can Not Upadete This Employee')
    }
    } catch (error) {
        console.log('NOT WORKING');
    }
}

function showactivity(){
    try {
        token=prompt("Enter The Editor Token ");
        user1=checkUpdatePermission(token);
        
        user1dep=getDepID(user1.departmentId);
        console.log(user1dep);
        
        if(user1dep.Dep_name == "Admin Dep"){
           console.table(activitieslist);                    
    
        }else{
            console.log('You can NOT See Actvities')
        }
        } catch (error) {
            console.log('NOT ALLOWED');
        }
}
module.exports={creataDep,saveData,creataEmp,creataAdmin,showDetails,othercreataDep,AddPermission,DeleteEmployee,RemovePermission,UpdateEmp,showALL,showactivity};
