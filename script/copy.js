var person = localStorage.getItem("name") ;
let message = document.getElementById("content");
let mainUrl = 'JOSN_SERVER_URL'

async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return response.json()
}
refresh();
function refresh(){
    fetch(mainUrl + '/chat')
    .then((response) => { return response.json(); }).then((data) => {
        let output = "";
        for (const iterator of data) {
            if (iterator.username == person) { output += `<p>${iterator.username}:<br> ${iterator.text} </p>`; }
            else { output += `<div>${iterator.username}:<br> ${iterator.text} </div>` }
        }
        document.getElementById("content").innerHTML = output;
    })
    setTimeout(refresh,1000);
}


async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    refresh();
    return response.json()
}

function submit() {
    url = mainUrl + "/chat";
    text = document.getElementById("text").value;
    data = {
        username: person,
        "text": text
    }
    postData(url, data);
}
async function editData(url, data) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return response.json()
}