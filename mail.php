<?php

$eName = $_POST['event-name'];
$eDate = $_POST['event-date'];

$table = $_POST['table'];
$tablePlace = $_POST['table-place'];
$name = $_POST['name'];
$phone = $_POST['phone'];

$eName = htmlspecialchars(urldecode(trim($eName)));
$eDate = htmlspecialchars(urldecode(trim($eDate)));
$table = htmlspecialchars(urldecode(trim($table)));
$tablePlace = htmlspecialchars(urldecode(trim($tablePlace)));
$name = htmlspecialchars(urldecode(trim($name)));
$phone = htmlspecialchars(urldecode(trim($phone)));

$to = 'anatolywagner@gmail.com';
$subject = 'Письмо с сайта';
$message = $eName . ' — Название ивента <br>' .
			$eDate . ' — Дата ивента <br>'.
			$table . ' — Номер стола <br>'.
			$tablePlace . ' — Номер места за столом <br>'.
			$name . ' — Имя клиента <br>'.
			$phone . ' — Номер телефона клиента <br>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 

echo $eName . ' — Название ивента <br />';
echo $eDate . ' — Дата ивента <br />';
echo $table . ' — Номер стола <br />';
echo $tablePlace . ' — Номер места за столом <br />';
echo $name . ' — Имя клиента <br />';
echo $phone . ' — Номер телефона клиента <br />';

mail($to, $subject, $message, $headers, "From: anatolywgnr@gmail.com");
