  const addUserBtn= document.getElementById('addUser');

  const BtnText= addUserBtn.innerText;
  const usernameTextField=document.getElementById('username');
  const recordsDisplay=document.getElementById('records');


  let userArray=[];

  let edit_id=null;
//    take data from localstorage which is in form of string
  let objStr=localStorage.getItem('users');
//   and string is convert into obj by this function
  if(objStr!=null){
  userArray=JSON.parse(objStr);
  }

  DisplayInfo();
//   console.log(userArray);


    addUserBtn.onclick=()=>{
        const name= usernameTextField.value;
        if(edit_id!=null){
            // edit
            userArray.splice(edit_id,1,{'name': name})
        }else{
            // insert
            userArray.push({'name': name});
            edit_id=null;
        }
  
    SaveInfo(userArray);
    usernameTextField.value='';
    DisplayInfo();
    addUserBtn.innerText='add User ';
   
     
  }

  function SaveInfo(userArray){
    //all object change to string by JSON
    let str = JSON.stringify(userArray);
    localStorage.setItem('users',str);
    

  }
  function DisplayInfo(){
    let statement='';
    userArray.forEach( (user,i)=>{
         statement+=` <tr>
         <th scope="row">${i+1}</th>
         <td>${user.name}</td>
         <td class="btn-ed">
            <i class='btn  border border-info fa fa-edit  btn-outline-info 'onclick='EditInfo(${i})' ></i>
             <i class=' btn  btn-outline-danger  fa fa-trash' onclick='DeleteInfo(${i})'></i></td>

       </tr> `
        
    } );

    recordsDisplay.innerHTML=statement;

  }


  function EditInfo(id){
    edit_id=id;
    usernameTextField.value =userArray[id].name;
    addUserBtn.innerText='save Changes'; 
   

 

  }
          
  function DeleteInfo(id){
    // delete ho gya
    userArray.splice(id,1);
    // yha save kara lenge
    SaveInfo(userArray);
    DisplayInfo();
   
  }