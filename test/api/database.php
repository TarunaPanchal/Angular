<?php

session_start();

$user = $_SESSION['user'];
if($user == 'admin'){
    echo '{
        "message": "Admin",
        "success": true
    }';
}else{
    echo '{
        "message": "Who r you??",
        "success": false
    }';
}

?>