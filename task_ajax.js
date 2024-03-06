function showListTask() {
    $.ajax({
        type : "GET",
        url : "http://localhost:8080/api/task",
        success : function (data){
            // console.log(data);
            let content = "";
            for (let i = 0; i < data.length; i++){
                content += `<tr>
                <td>${data[i].id}</td>
                <td>${data[i].name}</td>
                <td>${data[i].type.name}</td>
                </tr>`
            }
            document.getElementById("content").innerHTML = content;
        }
    })
}
showListTask();

function getAllType() {
    $.ajax({
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
getAllType();

function createNewTask() {
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
            'content-type' : 'application/json'
        },
        type : "POST",
        data: JSON.stringify(newTask),
        url : "http://localhost:8080/api/task",
        success : showListTask
    })
}
