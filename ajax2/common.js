
    $.ajax({
        type:"GET",
        url: "./json.json",
        dataType: "json",
        success: function(data) {
            console.log('data',data);
            console.log('data',data.data[0].img);
            // var src = $(data).find('img');
            $('img').attr('src', data.data[0].img)
        },
        error: err => console.log(err)
    });
    console.log('aaaaaaaaaaaaaa');