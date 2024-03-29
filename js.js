function showList() {
    $.ajax({
        type : "GET",
        url : "http://localhost:8080/api/type",
        success : function (data) {
            let noidung = "";
            for (let i = 0; i < data.length; i++) {
                noidung+= `<tr>
             <td>${data[i].id}</td>
             <td>${data[i].name}</td>
             <td><p onclick = showFormEdit(${data[i].id})>update</p></td>
             <td><p onclick = deleteType(${data[i].id})>delete</p></td>
             </tr>`
            }
            document.getElementById("content").innerHTML =noidung;
        }
    })
}

showList()

function createNewType(){
    // b1 lay du lieu
        let name = document.getElementById("name").value;
        let newType = {
            "name": name
        }
    //     B2: goi AJAX
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(newType),
            url: "http://localhost:8080/api/type",
            success: showList
        })
    }

function showFormEdit(id) {
    //lay data cu
    document.getElementById("edit").style.display = "block";
    //goi ajax de show form
    $.ajax({
        type : "GET",
        url : "http://localhost:8080/api/type/" + id,
        success : function (data) {
            console.log(data, "data");
            document.getElementById("nameedit").value = data.name;
            document.getElementById("idedit").value = data.id;
        }, 
        error: function(){
            console.log();
        }
    })
}

function saveEdit(){
    // b1 lay du lieu
    let newname = document.getElementById("nameedit").value;
    let newid = document.getElementById("idedit").value;
    let editType = {
        "name": newname
    }
    // B2: goi AJAX
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(editType),
        url: "http://localhost:8080/api/type/" + newid,
        success: showList
    })
}

function deleteType(id){
    event.preventDefault;
    $.ajax({
        type : "DELETE",
        url : "http://localhost:8080/api/type/" + id,
        success: showList
    })
}