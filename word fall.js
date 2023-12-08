var wordsArray = [];
//var txtFile = ; 

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt', true);
//call back function for onreadystatechange event
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
        var xmlDoc = xhr.responseXML;

        var wordsArray = [];
        var txtFile = xmlDoc.getElementsByTagName('txtFile');

        //pushing the txtFile instance into the array
        for(var i = 0; i < txtFile.length; i++){
            wordsArray.push(txtFile[i].textContent);
        }

        //converting txt file to JSON string & saving it in local storage
        localStorage.setTxtFile('xmlWordsArray', JSON.stringify(wordsArray));
    }
};
xhr.send();