
    $.ajax({
        type:"GET",
        url: "./json.json",
        dataType: "json",
        success: function(data) {
            console.log('data',data);
            console.log('data',data.data[0].img);
            console.log(`data길이 ${data.data.length}`);

            for (i = 0; i < data.data.length; i++) {
                
                var img_ = '<li><img src="' + data.data[i].img + '" alt="' + data.data[i].text + '"></li>';
                console.log(`img_ ${img_}`);

                ($('#wrapper')).append(img_);
            }
        },
        error: err => console.log(err)
    });
    console.log('aaaaaaaaaaaaaa');