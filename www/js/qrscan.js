let QRScan = function() {
    let init = function(){
    QRScanner.prepare(onDone);
          QRScanner.show();
          //scannen
         QRScanner.scan(displayContents);


        function onDone(err, status){
            if (err) {
                //error noteren
                console.error(err);
            }

        }
        function displayContents(err, url){
                if(err){
                    console.log("an error occurred, or the scan was canceled (error code `6`");
                } else {
                    // The scan completed, display the contents of the QR code:
                    var openUrl = confirm("Open '"+url+ "' in browser?");
                    if (openUrl) {
                        window.open(url)
                    }
                    //opnieuw beginnen met scannen
                    QRScanner.scan(displayContents);
                }
        }

    }
    let stop =function () {
        QRScanner.destroy();
        $("main").addClass("bg-gradient")
    }
    return{init:init,stop:stop
    }
}
();