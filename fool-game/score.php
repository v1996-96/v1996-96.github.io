<?php
	$base=fopen("base.txt","r");
	$buffer=fgets($base);
	$bufArr=explode("##",$buffer);
	for($i=0; $i<count($bufArr); $i++){
		list($name,$score)=explode("&&",$bufArr[$i]);
		$rec[$i+1]["name"]=$name;
		$rec[$i+1]["score"]=$score;
	}
	$numRec=count($bufArr);
	
	if((isset($_POST["name"])) && (isset($_POST["score"]))){
		$newPlayer["name"]=$_POST["name"];
		$newPlayer["score"]=$_POST["score"];
		if($newPlayer["name"]==""){
			$newPlayer["name"]="Пользователь";
		}
		for($i=1; $i<=$numRec; $i++){
			if((integer)$newPlayer["score"]>(integer)$rec[$i]["score"]){
				insertPlayer($i); break;
			}
		}
		fclose($base);
		$base=fopen("base.txt","w");
		$buffer="";
		for($i=1; $i<$numRec; $i++){
			$buffer.=$rec[$i]['name'].'&&'.$rec[$i]['score'].'##';
		}
		$buffer.=$rec[$numRec]['name'].'&&'.$rec[$numRec]['score'];
		fwrite($base,$buffer);
		fclose($base);
		
		$table="<table border=1>";
		$table.="<tr><th>№</th><th>Имя игрока</th><th>Счет</th></tr>";
		for($i=1; $i<=$numRec; $i++){
			$table.="<tr><td>".$i."</td><td>".$rec[$i]["name"]."</td><td>".$rec[$i]["score"]."</td></tr>";
		}
		$table.="</table>";
		echo $table;
	} else {
		$table="<table>";
		$table.="<tr><th>№</th><th>Имя игрока</th><th>Счет</th></tr>";
		for($i=1; $i<=$numRec; $i++){
			$table.="<tr><td>".$i."</td><td>".$rec[$i]["name"]."</td><td>".$rec[$i]["score"]."</td></tr>";
		}
		$table.="</table>";
		echo $table;
	}
	
	function insertPlayer($n){
		global $numRec, $newPlayer, $rec;
		for($i=$numRec; $i>$n; $i--){
			$rec[$i]=$rec[$i-1];
		}
		$rec[$n]["name"]=$newPlayer["name"];
		$rec[$n]["score"]=$newPlayer["score"];
	}
?>