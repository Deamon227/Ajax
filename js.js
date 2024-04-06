function showList() {
    let object = getHeaderToken();
    if (object == null){
        window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/login.html"
    }else{
        // let token = object.token;
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // "Authorization": "Bearer " + token
        },
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
}

function createNewType(){
    // b1 lay du lieu
        let object = getHeaderToken();
        if (object == null){
            window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/login.html"
        }else{
            // let token = object.token
        let name = document.getElementById("name").value;
            let newType = {
                "name": name
            }
        //     B2: goi AJAX
            $.ajax({
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    // "Authorization": "Bearer " + token
                },
                type: "POST",
                data: JSON.stringify(newType),
                url: "http://localhost:8080/api/type",
                success: showList
            })  
        }
    }

function showFormEdit(id) {
    //lay data cu
    let object = getHeaderToken();
    if (object == null){
        window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/login.html"
    }else{
        // let token = object.token;
        document.getElementById("edit").style.display = "block";
        //goi ajax de show form
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                // "Authorization": "Bearer " + token
            },
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
}

function saveEdit(){
    // b1 lay du lieu
    event.preventDefault;
    let object =getHeaderToken();
    if (object == null){
        window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/login.html"
    }else{
        // let token = object.token;
    let newname = document.getElementById("nameedit").value;
    let newid = document.getElementById("idedit").value;
    let editType = {
        "name": newname
    }
    document.getElementById("edit").style.display = "none";
    // B2: goi AJAX
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // "Authorization": "Bearer " + token
        },
        type: "PUT",
        data: JSON.stringify(editType),
        url: "http://localhost:8080/api/type/" + newid,
        success: showList
    })
    }
}

function deleteType(id){
    event.preventDefault;
    let object = getHeaderToken();
    if (object == null){
        window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/login.html"
    }else{
        // let token = object.token;
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // "Authorization": "Bearer " + token
        },
        type : "Delete",
        url : "http://localhost:8080/api/type/" + id,
        success: showList
    })
    }
}

function getHeaderToken(){
    let a = JSON.parse(localStorage.getItem("object"));
    return a;
}

function logout(){
    localStorage.removeItem("object");
    window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/login.html"
}

function showTaskNo(){
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // "Authorization": "Bearer " + token
        },
        type : "GET",
        url : "http://localhost:8080/api/type/count",
        success : function(data){
            console.log(data);
            let noidung = "";
            for (let i = 0; i < data.length; i++) {
                noidung+= `<tr>
             <td>${data[i].name}</td>
             <td>${data[i].taskNo}</td>
             </tr>`
            }
            document.getElementById("content1").innerHTML =noidung;
        }
    });
}

function searchType(){
    event.preventDefault;
    let search = document.getElementById("search").value;
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // "Authorization": "Bearer " + token
        },
        type : "GET",
        url : "http://localhost:8080/api/type/search?key=" + search,
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

function countUser(){
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // "Authorization": "Bearer " + token
        },
        type : "GET",
        url : "http://localhost:8080/api/role",
        success : function(data){
            console.log(data);
            let noidung = "";
            for (let i = 0; i < data.length; i++) {
                noidung+= `<div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" aria-expanded="true"
                        aria-controls="collapseOne">
                        ${data[i].name} has ${data[i].userNo} user(s)
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show"
                    aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body" id="content3">
                    ${getUserByRole(data[i].id)}
                    </div>
                </div>
            </div>`
            }
            document.getElementById("content2").innerHTML =noidung;
        }
    });
}

function getUserByRole(id){
    let noidung = "";
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // "Authorization": "Bearer " + token
        },
        type : "GET",
        url : "http://localhost:8080/api/user/" + id,
        success : function(data){
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                noidung+= `<p>${data[i].name}</p>`
            }
        }
    })
    return noidung;
}
// function showListSearch() {
//     let object = getHeaderToken();
//     let search = document.getElementById("search").value;
//     if (object == null){
//         window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/login.html"
//     }else{
//         // let token = object.token;
//     $.ajax({
//         headers:{
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//             // "Authorization": "Bearer " + token
//         },
//         type : "GET",
//         url : "http://localhost:8080/api/search?key=" + search,
//         success : function (data) {
//             let noidung = "";
//             for (let i = 0; i < data.length; i++) {
//                 noidung+= `<tr>
//              <td>${data[i].id}</td>
//              <td>${data[i].name}</td>
//              <td><p onclick = showFormEdit(${data[i].id})>update</p></td>
//              <td><p onclick = deleteType(${data[i].id})>delete</p></td>
//              </tr>`
//             }
//             document.getElementById("content").innerHTML =noidung;
//         }
//     })
//     }
// }
// showListSearch();