
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'down',
        hoverEnabled: false
    });
    $('#menu a').click(function () {
        $('#tabBonnen').removeClass('d-block');
        $('.spa').hide();
        $('#' + $(this).data('show')).show();
    });
    $('#menu_masterpage a').click(function () {
        $('.spa').hide();
        $('#' + $(this).data('show')).show();
    });
    //welkomstbericht
    $('#WB').text(wBericht())
    //aanal opgeslagen bonnen
    let _a_bonnen=[];
    let bonnen_str = localStorage.getItem('bon');
    if (bonnen_str !== null) {
        _a_bonnen = JSON.parse(bonnen_str);
    }
    //het aantal bonnen tonen op het beginscherm
    $('#aantalBonnen').text((_a_bonnen.length).toString())
});


function onDeviceReady() {
    //achtergrond kleur toevoegen aan de body
    $('main').addClass("bg-gradient");

    //bonScanner initialiseren
    prepareBonScanner = function () {
        BonScan.init();
    };
    //bonnenlijst initialiseren
     toonBonnenlijst=function (){
        BonScan.initiateLijst();
     }
    //qr scanner initialiseren
    prepareQRScanner = function () {
        //de scanner wordt geïnitialiseerd
        QRScan.init();
        //achtergrond kleur van de body wordt weggehaald
        $("main").removeClass("bg-gradient");
    }
    // url geschiedenis initialiseren
    $('#tabURLgeschiedenis').click(G_url.init());
    //foto bon tonen
    show_image = function(i) {
        console.log("display image ...",i);
        BonScan.displayImage(i);
    }
    //knop om terug naar bonnenlijst te gaan
    $('#terugBonnenLijst').click(function () {
        $('#divImgTag').css({"display": "none"});
        $('#bonnenlijst').css({"display": "block"});
        $('header div a').css({"display": "block"});
    });
    //bon verwijderen
    $('ul').on('click', '.deleteTask', function(){
        console.log('bon wissen');
        let id = $(this).data('task');   // id = waarde x uit data-task="x"
        BonScan.deleteBon();
    });

}

//welkomstbericht
function wBericht() {
    var uur=new Date();
    switch(uur.getHours()){
        case 22:case 23:case 0:case 1:case 2:case 3:case 4:
            return "Hallo nachtraaf!";
            break;
        case 5:case 6:case 7:case 8:case 9:case 10:case 11:
            return "Goedemorgen!";
            break;
        case 12:case 13:case 14:case 15:case 16:case 17:
            return "Goedemiddag!";
            break;
        case 18:case 19:case 20:case 21:
            return "Goedenavond!";
            break;
        default:
            return "Hey, Welkom!"
    }
}