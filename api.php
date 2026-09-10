<?php

session_start();

header("Content-Type: application/json");


// Create empty game list
if (!isset($_SESSION["games"])) {
    $_SESSION["games"] = [];
}


// Get HTTP method
$method = $_SERVER["REQUEST_METHOD"];


// Get JSON data
$input = json_decode(file_get_contents("php://input"), true);


// Send response
function sendResponse($status, $message, $game = null)
{
    http_response_code($status);

    $response = [
        "message" => $message
    ];

    if ($game !== null) {
        $response["game"] = $game;
    }

    echo json_encode($response);
    exit;
}


switch ($method) {


    // =========================
    // POST
    // =========================

    case "POST":

        if (
            empty($input["id"]) ||
            empty($input["title"]) ||
            empty($input["genre"]) ||
            empty($input["platform"]) ||
            !isset($input["price"]) ||
            $input["price"] === ""
        ) {
            sendResponse(400, "Please complete all fields.");
        }

        $id = $input["id"];


        // Check duplicate ID
        if (isset($_SESSION["games"][$id])) {
            sendResponse(409, "Game ID already exists.");
        }


        // Add game
        $_SESSION["games"][$id] = [
            "id" => $id,
            "title" => $input["title"],
            "genre" => $input["genre"],
            "platform" => $input["platform"],
            "price" => $input["price"]
        ];


        sendResponse(
            201,
            "Game added successfully.",
            $_SESSION["games"][$id]
        );

        break;



    // =========================
    // GET
    // =========================

    case "GET":

        $id = $_GET["id"] ?? "";


        if ($id === "") {
            sendResponse(400, "Game ID is required.");
        }


        if (!isset($_SESSION["games"][$id])) {
            sendResponse(404, "Game not found.");
        }


        sendResponse(
            200,
            "Game found.",
            $_SESSION["games"][$id]
        );

        break;



    // =========================
    // PUT
    // =========================

    case "PUT":

        if (
            empty($input["id"]) ||
            empty($input["title"]) ||
            empty($input["genre"]) ||
            empty($input["platform"]) ||
            !isset($input["price"]) ||
            $input["price"] === ""
        ) {
            sendResponse(400, "Please complete all fields.");
        }


        $id = $input["id"];


        if (!isset($_SESSION["games"][$id])) {
            sendResponse(404, "Game not found.");
        }


        // Replace the complete record
        $_SESSION["games"][$id] = [
            "id" => $id,
            "title" => $input["title"],
            "genre" => $input["genre"],
            "platform" => $input["platform"],
            "price" => $input["price"]
        ];


        sendResponse(
            200,
            "Game replaced successfully.",
            $_SESSION["games"][$id]
        );

        break;



    // =========================
    // PATCH
    // =========================

    case "PATCH":

        if (
            empty($input["id"]) ||
            empty($input["field"]) ||
            !isset($input["value"])
        ) {
            sendResponse(400, "Invalid PATCH request.");
        }


        $id = $input["id"];
        $field = $input["field"];
        $value = $input["value"];


        if (!isset($_SESSION["games"][$id])) {
            sendResponse(404, "Game not found.");
        }


        $allowedFields = [
            "title",
            "genre",
            "platform",
            "price"
        ];


        if (!in_array($field, $allowedFields)) {
            sendResponse(400, "Invalid field.");
        }


        // Update only selected field
        $_SESSION["games"][$id][$field] = $value;


        sendResponse(
            200,
            "Game updated successfully.",
            $_SESSION["games"][$id]
        );

        break;



    // =========================
    // DELETE
    // =========================

    case "DELETE":

        $id = $_GET["id"] ?? "";


        if ($id === "") {
            sendResponse(400, "Game ID is required.");
        }


        if (!isset($_SESSION["games"][$id])) {
            sendResponse(404, "Game not found.");
        }


        $deletedGame = $_SESSION["games"][$id];


        // Delete game
        unset($_SESSION["games"][$id]);


        sendResponse(
            200,
            "Game deleted successfully.",
            $deletedGame
        );

        break;



    default:

        sendResponse(405, "Method not allowed.");
}

?>