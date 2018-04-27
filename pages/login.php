<?php
include "checkout.php";
if ($json['errorcode'] == true) {
    echo json_encode($json);
} else {
    echo "continue";
}