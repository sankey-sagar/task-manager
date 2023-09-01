let a=document.getElementById("submit");
 parentTask=[]
// displayObjectData();
a.addEventListener("click",()=>{
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
                'subtask':[]
            })
            displayObjectData();
        }
    }
});

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
    cellstask.innerHTML = `<input type="button" onclick=subtaskpopup(${item.tid}) name="submit" id="submit"> ` ;
    celledit.innerHTML = `<input type="button" onclick=edititempop(${item.tid},${item.tname}) name="submit" id="edit">` ;
    celldelet.innerHTML = `<input type="button" onclick=deleteitem(${item.tid},this) name="submit" id="delete">`;
    
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
    console.log(deltedTask);
}
function edititempop(tid,tname,sdate,edate,status){
    alert("presssed")
    let a=document.getElementById("subtask");
    a.innerHTML=`<form action="/" name="editinfo">
    <input type="number" name="tid" value="${tid}">
    <input type="text" name="tname" value="${tname}">
    <input type="text" name="sdate" value="${sdate}">
    <input type="text" name="edate" value="${edate}">
    <select name="status" id="status" value="value="${status}">
        <option value="inprogress">In-Progress</option>
        <option value="completed">completed</option>
        <option value="cancled">cancled</option>
        <option value="deupassed">deupassed</option>
    </select>
    <input type="button" onclick=edititem(${tid},this) name="submit" id="submit">
</form>`;
}
function edititem(tid,button){
    alert("this is edit button");
    let newtid=document.forms["editinfo"]['tid'].value;
    let tname=document.forms["editinfo"]['tname'].value;
    let sdate=document.forms["editinfo"]['sdate'].value;
    let edate=document.forms["editinfo"]['edate'].value;
    let status=document.forms["editinfo"]['status'].value;

    var row = button.parentNode.parentNode;
    var rowIndex = row.rowIndex;
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
            row.cells[0].innerHTML = newtid;
            row.cells[1].innerHTML = tname;
            row.cells[2].innerHTML = sdate;
            row.cells[3].innerHTML = edate;
            row.cells[4].innerHTML = status ;

        }
    }

}
function addsubtask(tid,button){
    let stid =document.forms['stinfo']['tid'].value;
    let tname=document.forms["stinfo"]['tname'].value;
    let sdate=document.forms["stinfo"]['sdate'].value;
    let edate=document.forms["stinfo"]['edate'].value;
    let status=document.forms["stinfo"]['status'].value;
    for(let i=0;i<parentTask.length;i++){
        let j=1;
        if(parentTask[i].tid==tid){
            j=parentTask[i].subtask.length;
            console.log(j);
            parentTask[i].subtask.push({
                'stid':j,
                "ptid":tid,
                'tname':tname,
                'sdate':sdate,
                'edate':edate,
                'status':status
                
            });
        }
    }
    console.log(parentTask)
    let a=document.getElementById("subtask");
    a.innerHTML=` `;
}
function subtaskpopup(tid){
    let a=document.getElementById("subtask");
    a.innerHTML=`<form action="/" name="stinfo">
    <input type="number" name="tid" value="${tid}">
    <input type="text" name="tname" placeholder="task">
    <input type="text" name="sdate" placeholder="sdate">
    <input type="text" name="edate" placeholder="sdate">
    <select name="status" id="status" >
        <option value="inprogress">In-Progress</option>
        <option value="completed">completed</option>
        <option value="cancled">cancled</option>
        <option value="deupassed">deupassed</option>
    </select>
    <input type="button" onclick=addsubtask(${tid},this) name="submit" id="submit">
</form>`;
}
