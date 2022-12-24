let mainUrl = 'JOSN_SERVER_URL'
function showpass() {
    let pass = document.getElementById("password");
    if (pass.type === "password") { pass.type = "text"; }
    else { pass.type = "password"; }
}

function submitpass() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let count = 0;
    localStorage.setItem("name", user);
    url = mainUrl + '/user';
    fetch(url)
        .then((response) => { return response.json(); })
        .then((data) => {
            for (const iterator of data) {
                if (iterator.username == user) {
                    count++;
                    if (iterator.password == pass) {
                        location.href = './chatapp.html';
                    }
                    else { document.getElementById("error").innerHTML = "Wrong password, please try again.<br>"; }
                }
            }
            if (count == 0) {
                postData(url, {
                    "username": user,
                    "password": pass
                })
            }
            return data;
        })
}
function signup() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let count = 0;
    localStorage.setItem("name", user);
    url = mainUrl + '/user';
    fetch(url)
        .then((response) => { return response.json(); })
        .then((data) => {
            for (const iterator of data) {
                if (iterator.username == user) {
                    count++;
                    document.getElementById("error").innerHTML = "Username exists, please enter a new one.<br>";
                }
            }
            if (count == 0) {
                postData(url, {
                    "username": user,
                    "password": pass
                })
            }
            return data;
        })
}
async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return response.json()
}