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


let peopleData = readPeople();
let depData = readDep();




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

function creataEmp(ID){
   try {
    token=prompt("Please Enter Your Token of Verfication ");
    
    if(checkToken(token)==true){
    
    empname=prompt("Please Enter New Employee Name ");
    salary=prompt("Please Enter New Employee Salary ");
    age=prompt("Please Enter New Employee Age ");
    address=prompt("Please Enter New Employee Address ");
    contact=prompt("Please Enter New Employee Contact ");
    console.log("Please See The Gaven Below Departement List and Enter Name as gaven below");
    deplist.forEach(element => {
        console.log(element.Dep_name);
    });
    dep=prompt();
    depid=1;
    depid=deplist.filter((value)=>{
        if(dep==value.Dep_name){
            console.log(dep.Dep_Id);
            return dep.Dep_Id;
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
    token=prompt("Enter The Employee Token ");
    peopleData.filter((people)=>{
        
        if(token==people.token){
          console.table(people);
        }
      });
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


function othercreataDep(id,token){
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
        }else{
            console.log("YOU DOES NOT HAVE PREMISSION TO MAKE Departement");
        }
        
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

function getDepID(depID){
    try {
        Depname=deplist.filter((value)=>{
            if(value.Dep_Id==depID){
                return value.Dep_name;
            }
           });
           Depname=Depname.toString();
           return Depname;
        
    } catch (error) {
        console.log(error);
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
        console.log(error);
    }

}
function AddPermission(){
    try {
        token=prompt("Enter The Editor Token ");
        token2=prompt("Enter The Employee Token ");
        user1=checkUpdatePermission(token);
        user2=checkUpdatePermission(token2);
    
        user1dep=getDepID(user1.departmentId);
        user2dep=getDepID(user2.departmentId);
    
        
        if((user1dep == "Hr Dep" || user1dep == "Admin Dep" || user1dep == user2dep) && user1.permissions.includes('isUpdate')==true){
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
                            people['permissions']=perList;
                        }
                    }
                } else {
                console.log("NO PreMission Added");
                }
    
    
        }else{
            console.log('You can Not Add Permission')
        }
        
    } catch (error) {
        console.log(error);
    }

}
function  DeleteEmployee(){
    try {
    token=prompt("Enter The Editor Token ");
    token2=prompt("Enter The Employee Token");
    user1=checkUpdatePermission(token);
    user2=checkUpdatePermission(token2);

    user1dep=getDepID(user1.departmentId);
    user2dep=getDepID(user2.departmentId);

    if(user1dep=="Admin Dep" && user2dep=="Admin Dep"){
        if(user1.permissions.includes('isDelete')==true){
            peopleData = listOfObjects.filter(obj => obj.id !== user2.id);
            console.log('Employee has Been Deleted');
        }else{
            console.log('Employee has not Been Deleted');
        }
            
    }else if(user1dep!="Admin Dep" && user2dep=="Admin Dep"){
        console.log('YOU Can Not Delete an Admin ');
    }else
    {
        if((user1dep == "Hr Dep" || user1dep == "Admin Dep" || user1dep == user2dep) && user1.permissions.includes('isDelete')==true){
            peopleData = listOfObjects.filter(obj => obj.id !== user2.id);
            console.log('Employee has Been Deleted');
    
        }else{
            console.log('You can Not Delete Employee')
        }
    }
        
    } catch (error) {
        console.log(error);
    }
}
function RemovePermission(){
    try {
        token=prompt("Enter The Editor Token ");
        token2=prompt("Enter The Employee Token ");
        user1=checkUpdatePermission(token);
        user2=checkUpdatePermission(token2);
        
        user1dep=getDepID(user1.departmentId);
        user2dep=getDepID(user2.departmentId);
    
        
        if((user1dep == "Hr Dep" || user1dep == "Admin Dep" || user1dep == user2dep) && user1.permissions.includes('isUpdate')==true){
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
                        }
                    }
                } else {
                console.log("NO PreMission Added");
                }
    
    
        }else{
            console.log('You can Not Add Permission')
        }    
    } catch (error) {
        console.log(error);
    }
    
}

function UpdateEmpValue(){
    try {
        upobj = {};
        ans = prompt('Do you Want Update Employee Data  (y/n)');
        if (ans == 'y' || ans == 'Y') {
            ans = prompt('Do you Want Enter New name (y/n)');
            if (ans == 'y' || ans == 'Y') {
                ans = prompt('Please Enter the New Name');
                upobj["name"] = ans;
            }
            ans = prompt('Do you Want Enter The Age (y/n)');
            if (ans == 'y' || ans == 'Y') {
                ans = prompt('Please Enter the New Age');
                upobj["age"] = ans;
            }
            ans = prompt('Do you Want New Salary (y/n)');
            if (ans == 'y' || ans == 'Y') {
                ans = prompt('Please Enter the New Salary');
                upobj["salary"] = ans;
            }
        
            ans = prompt('Do you Want New Contact (y/n)');
            if (ans == 'y' || ans == 'Y') {
                upobj["contactDetails"] = {}; // Create the contactDetails object
                ans = prompt('Please Enter the New Contact Number');
                upobj["contactDetails"]["phone"] = ans;
            }
            
            ans = prompt('Do you Want New Address (y/n)');
            if (ans == 'y' || ans == 'Y') {
                if (!upobj["contactDetails"]) {
                    upobj["contactDetails"] = {}; // Create the contactDetails object if it doesn't exist
                }
                ans = prompt('Please Enter the New Address');
                upobj["contactDetails"]["address"] = ans;
            }
        
            //console.log(upobj);
            return upobj;
        } else {
            console.log("No updates requested.");
            return upobj;
        }
    } catch (error) {
        console.log(error);
    }



    
}

function UpdateEmp(){
    try {
    token=prompt("Enter The Editor Token ");
    token2=prompt("Enter The Employee Token ");
    user1=checkUpdatePermission(token);
    user2=checkUpdatePermission(token2);

    user1dep=getDepID(user1.departmentId);
    user2dep=getDepID(user2.departmentId);

    
    if((user1dep == "Hr Dep" || user1dep == "Admin Dep" || user1dep == user2dep) && user1.permissions.includes('isUpdate')==true){
       upobj=UpdateEmpValue();
       upobj["updatedAt"]=date.toString();
       if(Object.keys(upobj).length != 0){
        const personIndex = peopleData.findIndex((p) => p.id === user2.id);
        if (personIndex !== -1) {
            peopleData[personIndex] = { ...peopleData[personIndex], ...upobj };
        }
       }
                           

    }else{
        console.log('You can Not Upadete This Employee')
    }
    } catch (error) {
        console.log(error);
    }
}


module.exports={creataDep,saveData,creataEmp,creataAdmin,showDetails,othercreataDep,AddPermission,DeleteEmployee,RemovePermission,UpdateEmp};
