let G_url=function () {

    let init =function () {

        const domain = 'https://albert.sinners.be/';
        // All records
        console.log('test0');
        let master_url = `${domain}bqscanner_url_php/geschiedenis_url.php`;
        $.getJSON(master_url,function(data) {
            console.log("test1")
            console.log(data);
            $.each(data, function(index) {
                let row = `<li class="list-group-item"><a href="${this.url}">${this.url}</a></li>`;
                $('#data_url').append(row);
            })
        }).fail(function(jqxhr, textStatus, error) {
            console.error(jqxhr);
        });
    }

return{
    init:init
}

}();