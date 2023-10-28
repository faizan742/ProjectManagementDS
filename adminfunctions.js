const fs = require('fs');
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
    };
    
});


function creataDep(id,name,contact,permissions){
    
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
     
}

function creataEmp(ID){
   try {
    token=prompt("Please Enter Your Token of Verfication ");
    
    if(token.length!=0){
    
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
      console.log('THE Employee has Been Created')

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

module.exports={creataDep,saveData,creataEmp,creataAdmin};
