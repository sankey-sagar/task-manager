parentTask=[]

function newtaskpopup(){

    let newTaskForm=document.getElementById("new-task-form");
    newTaskForm.style=`display:block;`
}


function addnewtask(){
    let tid=document.forms["info"]['tid'].value;
    let tname=document.forms["info"]['tname'].value;
    let sdate=document.forms["info"]['sdate'].value;
    let edate=document.forms["info"]['edate'].value;
    let status=document.forms["info"]['status'].value;
    let a=false;
    for(let i=0;i<parentTask.length;i++){
        if(tid==parentTask[i].tid){
            a=true
        }
    }
    if(a){
        alert("duplicate element")
    }
    else{
        for(let i=0;i<deltedTask.length;i++){
            if(tid==deltedTask[i]){
                a=true
            }
        }
        if(a){
            alert("this is delted id use different id")
        }
        else{

            parentTask.push({
                'tid':tid,
                'tname':tname,
                'sdate':sdate,
                'edate':edate,
                'status':status,
                'subtask':[{}]
            })
            displayObjectData();
            closepopup();
        }
    }
};

function displayObjectData() {
    var tableBody = document.querySelector('#data-table tbody');
  // Populate the table
    let item=parentTask[parentTask.length-1];
    // console.log(item)
    var row = tableBody.insertRow();
    var cellid = row.insertCell(0);
    var cellName = row.insertCell(1);
    var cellsdate = row.insertCell(2);
    var celledate = row.insertCell(3);
    var cellstatus = row.insertCell(4);
    var cellstask = row.insertCell(5);
    var celledit = row.insertCell(6);
    var celldelet = row.insertCell(7);

    cellid.innerHTML = item.tid;
    cellName.innerHTML = item.tname;
    cellsdate.innerHTML = item.sdate;
    celledate.innerHTML = item.edate;
    cellstatus.innerHTML = item.status ;
    console.log(item.tid);
    console.log(item.tname);
    celledit.innerHTML = `<input type="button" onclick="edititempop(${item.tid}, \' ${item.tname} \', \' ${item.sdate} \', \' ${item.edate} \', \' ${item.status} \',this)" name="submit" id="edit" value="Edit"> ` ;
    celldelet.innerHTML = `<input type="button" onclick=deleteitem(${item.tid},this) name="submit" id="delete" value="Delete">`;
    
    cellstask.innerHTML = `<input type="button" onclick="view(${item.tid}, \' ${item.tname} \', \' ${item.sdate} \', \' ${item.edate} \', \' ${item.status} \')" name="submit" id="view" value="View"> ` ;
    
}

var deltedTask=[]
let newid=0;

function deleteitem(tid,button){
    deltedTask.push(tid); 
    for(let i=0;i<parentTask.length;i++){
        if(tid==parentTask[i].tid){
            newid=i;
        }
    }
    parentTask=parentTask.filter(function(item) {
        return item.tid != tid;
      });
 
    var row = button.parentNode.parentNode; // Get the row element
 
    var table = row.parentNode; // Get the table element
 

    table.deleteRow(row.rowIndex-1); // Delete the row based on its index
}

function edititempop(tid,tname,sdate,edate,status,button){
    
    let a=document.getElementById("subtask");
    a.innerHTML=`<h2 id="close1">X</h2>
    <form action="/" name="editinfo">
    <input type="number" name="tid" value="${tid}">
    <input type="text" name="tname" value="${tname}">
    <input type="datetime-local" name="sdate" value="${sdate}">
    <input type="datetime-local" name="edate" value="${edate}">
    <select name="status" id="status" value="value="${status}">
        <option value="inprogress">In-Progress</option>
        <option value="completed">completed</option>
        <option value="cancled">cancled</option>
        <option value="deupassed">deupassed</option>
    </select>
    <input type="button"  name="submit" id="submit-edit" value="Submit">
</form>`;
    a.style="display:block";
    var row = button.parentNode.parentNode;
    var rowIndex = row.rowIndex;
    let c=document.getElementById("submit-edit");
    c.addEventListener("submit",()=>{
    let newtid=document.forms["editinfo"]['tid'].value;
    let tname=document.forms["editinfo"]['tname'].value;
    let sdate=document.forms["editinfo"]['sdate'].value;
    let edate=document.forms["editinfo"]['edate'].value;
    let status=document.forms["editinfo"]['status'].value;
    console.log(newtid);
    })

    let closepopup=document.getElementById("close1");
    closepopup.addEventListener("click",()=>{
        document.getElementById("subtask").style=`display:none;`
    })
}

function edititem(id){
    // console.log(id);
    // let rowIndex=0
    // for(let i=0 ;i<parentTask.length;i++){
    //     if(id==parentTask[i].tid){
    //         rowIndex=i;
    //     }
    //     console.log(parentTask[i].tid)
    // }
    let newtid=document.forms["editinfo"]['tid'].value;
    let tname=document.forms["editinfo"]['tname'].value;
    let sdate=document.forms["editinfo"]['sdate'].value;
    let edate=document.forms["editinfo"]['edate'].value;
    let status=document.forms["editinfo"]['status'].value;

    var row = button.parentNode.parentNode;
    var rowIndex = row.rowIndex;

    // let a=false;
    // for(let i=0;i<parentTask.length;i++){
    //     if(newtid==parentTask[i].tid){
    //         a=true;
    //     }
    // }
    // if(a){
    //     alert("duplicate element")
    // }
    // else{
    //     for(let i=0;i<deltedTask.length;i++){
    //         if(newtidtid==deltedTask[i]){
    //             a=true
    //         }
    //     }
    //     if(a){
    //         alert("this is delted id use different id")
    //     }
    //     else{
            row.cells[0].innerHTML = "sagar";
            row.cells[1].innerHTML = "tname";
            row.cells[2].innerHTML = "sdate";
            // row.cells[3].innerHTML = edate;
            // row.cells[4].innerHTML = status ;

    //     }
    // }
    closepopup()

}

function addsubtask(tid,button){
    let tname=document.forms["stinfo"]['tname'].value;
    let sdate=document.forms["stinfo"]['sdate'].value;
    let edate=document.forms["stinfo"]['edate'].value;
    let status=document.forms["stinfo"]['status'].value;
    for(let i=0;i<parentTask.length;i++){
        let j=1;
        if(parentTask[i].tid==tid){
            j=parentTask[i].subtask.length;
            // console.log(j);
            parentTask[i].subtask.push({
                'stid':j,
                "ptid":tid,
                'tname':tname,
                'sdate':sdate,
                'edate':edate,
                'status':status
                
            });
            showsubtask(parentTask[i].subtask[j])
            console.log(parentTask[i]);
            console.log(parentTask[i].subtask[j])
            // console.log(parentTask[i].subtask);
        }
    }
    // console.log(parentTask)
    let a=document.getElementById("subtask");
    a.innerHTML=` `;
    closepopup();
}

function subtaskpopup(tid){
    let a=document.getElementById("subtask");
    console.log(tid,"this is subtask")
    a.innerHTML=`<h2 id="close" onclick="closepopup()">X</h2>
    <form action="/" name="stinfo">
        <input type="text" name="tname" placeholder="task">
        <input type="datetime-local" name="sdate" placeholder="sdate">
        <input type="datetime-local" name="edate" placeholder="sdate">
        <select name="status" id="status" >
            <option value="inprogress">In-Progress</option>
            <option value="completed">completed</option>
            <option value="cancled">cancled</option>
            <option value="deupassed">deupassed</option>
        </select>
        <input type="button" onclick=addsubtask(${tid},this) name="submit" id="submit" value="Add sub Task">
    </form>`;
    a.style="display:block;";
}

function view(id,tname,sdate,edate,status){
    let o=document.getElementById("viewobject");
    // console.log(item);
    // console.log(tname);
    o.innerHTML=`<div id="objecviewclose">
    <h1 id="closeview">X</h1>
</div>
<div id="objecthisplay">
    <h1 >${id}</h1>
    <h1>${tname}</h1>
    <h2>${sdate}</h2>
    <h2>${edate}</h2>
    <h2>${status}</h2>
    <input type="button" onclick=subtaskpopup(${id}) name="submit" id="view" value="Add Sub Task">
    <p>Sub-Task</p>
    <table id="sub-data-table">
        <thead>
        <tr>
            <th>id</th>
            <th>name</th>
            <th>sdate</th>
            <th>edate</th>
            <th>status</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <!-- Table data will be populated here -->
        <tr>
            <td>1</td>
            <td>This is demo task</td>
            <td>23/5/2023</td>
            <td>25/5/2023</td>
            <td>In-progress</td>
            <td><input type="button" onclick=edititempop(0) name="submit" id="edit" value="Edit"></td>
            <td><input type="button" onclick=deleteitem(0) name="submit" id="delete" value="Delete"></td>
            <!-- <td><input type="button" onclick=subtaskpopup(0) name="submit" id="view" value="View"></td> -->
        </tr>
        </tbody>
    </table>
</div>`   ;
// let a=parentTask.filter((e)=>{
//     return e.tid==id;
// });
// for(let i=1;i<=a.length;i++){
//     console.log(i)
//     // showsubtask(parentTask.subtask[i]);
// }
o.style="display:block";
let closepopup=document.getElementById("closeview");
    closepopup.addEventListener("click",()=>{
        document.getElementById("viewobject").style=`display:none;`
    })
}
function showsubtask(item){
    var tableBody = document.querySelector('#sub-data-table tbody');
  // Populate the table
    // let item=parentTask.subtask;
    console.log(item);
    var row = tableBody.insertRow();
    var cellid = row.insertCell(0);
    var cellName = row.insertCell(1);
    var cellsdate = row.insertCell(2);
    var celledate = row.insertCell(3);
    var cellstatus = row.insertCell(4);
    var cellstask = row.insertCell(5);
    var celledit = row.insertCell(6);
    var celldelet = row.insertCell(7);

    cellid.innerHTML = item.stid;
    cellName.innerHTML = item.tname;
    cellsdate.innerHTML = item.sdate;
    celledate.innerHTML = item.edate;
    cellstatus.innerHTML = item.status ;
    celledit.innerHTML = `<input type="button" onclick=edititempop(0) name="submit" id="edit" value="Edit"> ` ;
    celldelet.innerHTML = `<input type="button" onclick=deleteitem(${item.tid},this) name="submit" id="delete" value="Delete"> ` ;
}
function closepopup(){
        document.getElementById("new-task-form").style=`display:none;`
        document.getElementById("subtask").style=`display:none;`

}