const api = "api.php";


// Display Result
function showResult(method, data) {

    let result = "";

    if (method === "POST") {

        result = `
            <h3>POST REQUEST</h3>

            <p>${data.message}</p>

            ${data.game ? `
            <p>
                Game ID: ${data.game.id}<br>
                Game Title: ${data.game.title}<br>
                Genre: ${data.game.genre}<br>
                Platform: ${data.game.platform}<br>
                Price: ${data.game.price}
            </p>
            ` : ""}
        `;

    } else if (method === "GET") {

        result = `
            <h3>GET REQUEST</h3>

            <p>${data.message}</p>

            ${data.game ? `
            <p>
                Game ID: ${data.game.id}<br>
                Game Title: ${data.game.title}<br>
                Genre: ${data.game.genre}<br>
                Platform: ${data.game.platform}<br>
                Price: ${data.game.price}
            </p>
            ` : ""}
        `;

    } else if (method === "PUT") {

        result = `
            <h3>PUT REQUEST</h3>

            <p>${data.message}</p>

            ${data.game ? `
            <p>
                Game ID: ${data.game.id}<br>
                Game Title: ${data.game.title}<br>
                Genre: ${data.game.genre}<br>
                Platform: ${data.game.platform}<br>
                Price: ${data.game.price}
            </p>
            ` : ""}
        `;

    } else if (method === "PATCH") {

        result = `
            <h3>PATCH REQUEST</h3>

            <p>${data.message}</p>

            ${data.game ? `
            <p>
                Game ID: ${data.game.id}<br>
                Game Title: ${data.game.title}<br>
                Genre: ${data.game.genre}<br>
                Platform: ${data.game.platform}<br>
                Price: ${data.game.price}
            </p>
            ` : ""}
        `;

    } else if (method === "DELETE") {

        result = `
            <h3>DELETE REQUEST</h3>

            <p>${data.message}</p>

            ${data.game ? `
            <p>
                Game ID: ${data.game.id}<br>
                Game Title: ${data.game.title}<br>
                Genre: ${data.game.genre}<br>
                Platform: ${data.game.platform}<br>
                Price: ${data.game.price}
            </p>
            ` : ""}
        `;
    }

    document.getElementById("result").innerHTML = result;
}


// POST
function addGame() {

    const game = {
        id: document.getElementById("postId").value,
        title: document.getElementById("postTitle").value,
        genre: document.getElementById("postGenre").value,
        platform: document.getElementById("postPlatform").value,
        price: document.getElementById("postPrice").value
    };

    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    })
    .then(response => response.json())
    .then(data => showResult("POST", data))
    .catch(error => {
        showResult("POST", {
            message: "Error: " + error.message
        });
    });
}


// GET
function getGame() {

    const id = document.getElementById("getId").value;

    fetch(api + "?id=" + encodeURIComponent(id), {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => showResult("GET", data))
    .catch(error => {
        showResult("GET", {
            message: "Error: " + error.message
        });
    });
}


// PUT
function replaceGame() {

    const game = {
        id: document.getElementById("putId").value,
        title: document.getElementById("putTitle").value,
        genre: document.getElementById("putGenre").value,
        platform: document.getElementById("putPlatform").value,
        price: document.getElementById("putPrice").value
    };

    fetch(api, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    })
    .then(response => response.json())
    .then(data => showResult("PUT", data))
    .catch(error => {
        showResult("PUT", {
            message: "Error: " + error.message
        });
    });
}


// PATCH
function patchGame() {

    const id = document.getElementById("patchId").value;
    const field = document.getElementById("patchField").value;
    const value = document.getElementById("patchValue").value;

    const data = {
        id: id,
        field: field,
        value: value
    };

    fetch(api, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => showResult("PATCH", data))
    .catch(error => {
        showResult("PATCH", {
            message: "Error: " + error.message
        });
    });
}


// DELETE
function deleteGame() {

    const id = document.getElementById("deleteId").value;

    fetch(api + "?id=" + encodeURIComponent(id), {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => showResult("DELETE", data))
    .catch(error => {
        showResult("DELETE", {
            message: "Error: " + error.message
        });
    });
}