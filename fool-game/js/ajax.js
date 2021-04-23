function getLeaderSheetD(){
	$.post("score.php",function(data){
		leaderSheetD=data;
	});
}
function sendNewPlayer(na, sc){
	$.post("score.php",{"name":na,"score":sc});
}