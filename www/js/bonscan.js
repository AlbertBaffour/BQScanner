let BonScan = function(){
    var imageBon;
    var succesvol=false;
    let _bonnen=[];
    let init =function() {
        function setOptions(srcType) {
            var options = {
                // Some common settings are 20, 50, and 100
                quality: 20,
                destinationType: Camera.DestinationType.FILE_URI,
                // In this app, dynamically set the picture source, Camera or photo gallery
                sourceType: srcType,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
                allowEdit: false,
                correctOrientation: true
            }
            return options;
        }
        var srcType = Camera.PictureSourceType.CAMERA;
        var options = setOptions(srcType);
        navigator.camera.getPicture(cameraSuccess, cameraError, options);


        function cameraSuccess(imageUri) {
            console.log("Succesvol 0");
            imageBon = imageUri;
            succesvol=true;
            if (succesvol) {
                $('.spa').hide();
                addBon();
                succesvol = false;
            }
        }
        function cameraError(error) {
            console.debug("Unable to obtain picture: " + error, "app");

        }
    }
    let _bonnenlijst = function() {
        console.log('voeg alle bonnen aan de ul-tag toe');
        $('#bonnenlijst').empty();    // verwijder alle li-tags
        // met for-loop

        for(let i = 0; i < _bonnen.length; i++) {
            let item = `<li class="min-h-55 collection-item avatar"> 
<i class="material-icons red circle deleteTask" data-task="${i}">clear</i>
			<div class="title" data-task="${i}"><a href="#" onclick="show_image(${i});">${_bonnen[i][0]}</a></div>
				</li>`;
            $('#bonnenlijst').append(item);
        }
        $('#tabBonnen').addClass('d-block');
    };
    //localstorage
    let _setLocalStorage = function() {
        console.log('_bonnen[]', _bonnen);
        localStorage.setItem('bon', JSON.stringify(_bonnen));  // localStorage.setItem('key', 'value')
        _bonnenlijst();
    };

        //initiate list
    let initiateLijst = function(){
        let bonnen_str = localStorage.getItem('bon');
        if (bonnen_str !== null) {
            _bonnen = [];   // Maak array leeg
            _bonnen = JSON.parse(bonnen_str);
        }
        $('#aantalBonnen').text((_bonnen.length).toString());

        _bonnenlijst();
    };
         //opslaan
    let addBon = function() {
        var naamBon = prompt("Naam van de bon: ");
        var datum = new Date();
        var d = datum.getDate() + "/" + (datum.getMonth() + 1) + "/" + datum.getFullYear();
        console.log('nieuwe bon toevoegen');
        _bonnen.unshift([(naamBon + " (" + d + ") "), imageBon]);  // / Voeg achteraan (push) of vooraan (unshift) de array de tekst
        _setLocalStorage();
    };

    let displayImage = function(x){
        console.log('_bonnen[]', _bonnen);
        console.log(x);
        console.log( _bonnen[x][1]);
        let item = "<img id='imgTag' src='"+_bonnen[x][1]+"'>"
        $('#divImgTag img').replaceWith(item);
        $('#captionBon').text(_bonnen[x][0]);
        $('#divImgTag').css({"display": "block"});
        $('#bonnenlijst').css({"display": "none"});
        $('header div a').css({"display": "none"});

    };
    //bon wissen
    let deleteBon = function(id){
        console.log(`bon wissen: id = ${id}`);
        if(confirm('Deze bon wissen?')) {
            _bonnen.splice(id,1);   // Verwijder het x-de element uit de array
            _setLocalStorage();
        }
    };

    let stop = function () {
        $("main").addClass("bg-gradient");
        navigator.camera.cleanup(onSuccess, onFail);
        function onSuccess() {
            //succesvol
        }
        function onFail(message) {
            console.log('Error: ' + message);
        }

    }
        return{
            init:init,stop:stop,
            addBon:addBon,
            initiateLijst:initiateLijst,
            displayImage:displayImage,
            deleteBon : deleteBon
        }

}();
