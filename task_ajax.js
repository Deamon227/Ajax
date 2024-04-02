function showListTask() {
    let object = getHeaderToken();
    if (object ==  null){
        window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/login.html"
    }else{
        let token = object.token;
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        type : "GET",
        url : "http://localhost:8080/api/task",
        success : function (data){
            console.log(data);
            let content = "";
            for (let i = 0; i < data.length; i++){
                let contenti = `<tr>
                <td>${data[i].id}</td>
                <td>${data[i].name}</td>`;
                if (data[i].type != null){
                    contenti += `<td>${data[i].type.name}</td>`

                }else{
                    contenti += `<td>None</td>`
                }
                contenti +=
                `<td><p onclick = showFormEdit(${data[i].id})>update</p></td>
                <td><p onclick = deleteTask(${data[i].id})>delete</p></td>
                </tr>`;
                content += contenti;
            }
            document.getElementById("content").innerHTML = content;
            document.getElementById("edit").style.display = "none";
        }
    })
    }
}
showListTask();

function getAllType() {
    let object = getHeaderToken();
    if (object == null){
        window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/login.html"
    }else{
    let token = object.token;
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        type : "GET",
        url : "http://localhost:8080/api/type",
        success : function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++){
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            document.getElementById("type").innerHTML = content;
        }
    })
    }
}
getAllType();

function getAllTypeEdit() {
    let object = getHeaderToken();
    if (object == null){
        window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/login.html"
    }else{
    let token = object.token;
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        type : "GET",
        url : "http://localhost:8080/api/type",
        success : function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++){
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            document.getElementById("typeedit").innerHTML = content;
        }
    })
    }
}
getAllTypeEdit();

function createNewTask() {
    let object = getHeaderToken();
    if (object == null){
        window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/login.html"
    }else{
    let token = object.token;
    let name = document.getElementById("name").value;
    let typeId = document.getElementById("type").value;
    let newTask = {
        "name" : name,
        "type": {
            "id": typeId
        }
    }
    $.ajax({
        headers : {
            'accept' : 'application/json',
            'content-type' : 'application/json',
            "Authorization": "Bearer " + token
        },
        type : "POST",
        data: JSON.stringify(newTask),
        url : "http://localhost:8080/api/task",
        success : showListTask
    })
    }
}

function showFormEdit(id) {
    //lay data cu
    let object = getHeaderToken();
    if (object == null){
        window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/login.html"
    }else{
        let token = object.token;
        document.getElementById("edit").style.display = "block";
        //goi ajax de show form
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type : "GET",
            url : "http://localhost:8080/api/task/" + id,
            success : function (data) {
                console.log(data, "data");
                document.getElementById("nameedit").value = data.name;
                document.getElementById("idedit").value = data.id;
                document.getElementById("typeedit").value = data.typeId;
            }, 
            error: function(){
                console.log();
            }
        })
    }
}

function saveEdit(){
    // b1 lay du lieu
    let object =getHeaderToken();
    if (object == null){
        window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/login.html"
    }else{
        let token = object.token;
    let newname = document.getElementById("nameedit").value;
    let newid = document.getElementById("idedit").value;
    let newtype = document.getElementById("typeedit").value;
    let editType = {
        "name": newname,
        "type": {
            "id": newtype,
        }
    }
    // B2: goi AJAX
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        type: "PUT",
        data: JSON.stringify(editType),
        url: "http://localhost:8080/api/task/" + newid,
        success: showListTask
    })
    }
}

function deleteTask(id){
    event.preventDefault;
    let object = getHeaderToken();
    if (object == null){
        window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/login.html"
    }else{
        let token = object.token;
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        type : "Delete",
        url : "http://localhost:8080/api/task/" + id,
    })
    }
    showListTask();
}

function getHeaderToken(){
    let a = JSON.parse(localStorage.getItem("object"));
    return a;
}
