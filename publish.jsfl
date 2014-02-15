/*
ファイル名
  publish.jsfl 

処理概要
  相対パスを自動で取得して、flaファイルを一括パブリッシュする。

使い方
  1. publish.jsfl と同じディレクトリに fla ディレクトリを作成し、flaファイルを格納する。
  2. publish.jsfl を実行する。
  
出力結果
　publish.jsfl と同じディレクトリに swf ディレクトリが作成され、その中にswfファイルが作られる。

補足
　ディレクトリ構成は下記参照

pwd
|
|--publish.jsfl
|--fla
| |--hoge.fla
| |--hogehoge.fla
| |--.....
|
|--swf
  |--hoge.swf
  |--hogehoge.swf
  |--.....

更新履歴
　2014/2/15 新規作成　さきやまてるひさ

*/

fl.trace("------------------ publish.jsfl start ------------------")

var pwd = getPwd();
var targetFolder = "swf/";
var flaFolder = "fla/"

if (false == FLfile.exists(pwd+targetFolder)) {
	FLfile.createFolder(pwd+targetFolder);
}

var flaFileList = FLfile.listFolder(pwd + flaFolder + "*.fla","files");
for (var i = 0; i < flaFileList.length ; i++) {
	fl.trace("fla "+ i +" : " + flaFileList[i]);
	var swfFileName = getSwfFileName(flaFileList[i]);
	fl.trace("swf "+ i +" : " + swfFileName);
	var doc = fl.openDocument(pwd + flaFolder + flaFileList[i]);
	doc.exportSWF(pwd + targetFolder + swfFileName);
	doc.close();
}


function getPwd(){
	var scriptUri = fl.scriptURI;
	var a = scriptUri.split("/");
	var scriptName = a[a.length - 1];
	var i = scriptUri.indexOf(scriptName)
	var pwd = scriptUri.substring(i,-1)
	fl.trace("pwd : " + pwd);
	return (pwd);
}


function getSwfFileName(flaFileName){
	var i = flaFileName.indexOf(".fla");
	var swf = flaFileName.substring(i,-1);
	swf = swf + ".swf"
	return (swf);
}

fl.trace("------------------ publish.jsfl end ------------------")
