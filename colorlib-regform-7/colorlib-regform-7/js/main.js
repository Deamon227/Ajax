function checkLogin() {
    let name = document.getElementById("name").value;
    let pass = document.getElementById("pass").value;
    let user = {
        "username": name,
        "password": pass
    }
    event.preventDefault;
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(user),
        url: "http://localhost:8080/api/auth/login",
            success: function(data){
                console.log(data),
                localStorage.setItem("object", JSON.stringify(data)),
                window.location.href = "file:///C:/Users/ADMIN/OneDrive/Desktop/VSC/51680/site/contacts.html"
            }
    })
}