<?php
//echo("here");
//print_r($_POST);
$txt_file  = file_get_contents('scores.txt');
$rows        = explode("\n", $txt_file);
array_pop($rows);

foreach($rows as $row => $data)
{
    $row_data = explode(' ', $data);
    $info[$row]['name']  = $row_data[0];
    $info[$row]['score'] = $row_data[1];
}

usort($info, "cmp");
array_push($info,['name' => $_POST['name'] , 'score' => $_POST['score']]);
//print_r($info);
usort($info, "cmp");
array_pop($info);
//print_r($info);

$file = fopen("scores.txt","w");
foreach ($info as $row => $data) {
	# code...
	if($row >= 10 )
		break ;
	fwrite($file,$data['name']." ".$data['score']."\n");
}

fclose($file);

//header("Location: idx.html");

function cmp($a,$b)
{
	return $a['score'] < $b['score'];
}



?>
<!DOCTYPE html>
<html>
<head>
	<title>Scores in Pacman</title>
	<style type="text/css">
	h1{
		color : red;
	}
	</style>
</head>
<body>
	<h1><?="1 ".$info[0]['name']." ".$info[0]['score']."\n"?></h1>
	<h1><?="2 ".$info[1]['name']." ".$info[1]['score']."\n"?></h1>
	<h1><?="3 ".$info[2]['name']." ".$info[2]['score']."\n"?></h1>
	<h1><?="4 ".$info[3]['name']." ".$info[3]['score']."\n"?></h1>
	<h1><?="5 ".$info[4]['name']." ".$info[4]['score']."\n"?></h1>
	<h1><?="6 ".$info[5]['name']." ".$info[5]['score']."\n"?></h1>
	<h1><?="7 ".$info[6]['name']." ".$info[6]['score']."\n"?></h1>
	<h1><?="8 ".$info[7]['name']." ".$info[7]['score']."\n"?></h1>
	<h1><?="9 ".$info[8]['name']." ".$info[8]['score']."\n"?></h1>
	<h1><?="10 ".$info[9]['name']." ".$info[9]['score']."\n"?></h1>

</body>
</html>