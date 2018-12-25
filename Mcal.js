/**
 *
 * @version 0.0.1
 * @date 2018/12/18
 * @author jinghh_bj@163.com
 */

/**
 * Date Picker
 * @param   minDate  '1990-01-01'
 * @param   maxDate
 * @param   dateFormat 'yyyy-mm 或者 yyyy/mm'
 * demo:
 *    $('#cal').Mcal({
        minDate:'2017/05',
        maxDate:'2018/12'
    })
 */
$.fn.Mcal = function(options) {
    var style = '<style id="Mcal_style">.Mcal{display:none;position:absolute;top:0;left:0;min-width:100px;border-radius:5px;border:1px solid #eee;overflow:hidden;box-shadow:2px 2px 2px #eee}.Mcal-year{height:30px;line-height:30px;font-size:14px;border-bottom:1px solid #eee;background:#92C143;color:#fff;text-align:center;position:relative}.Mcal-year .pre-year,.Mcal-year .next-year{width:30px;height:30px;position:absolute;top:0;cursor:pointer;background-size:50%;background-repeat:no-repeat;background-position:center}.Mcal-year .pre-year{left:0;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA6ElEQVRYR9XXXQ7CIAwHcDiBeAN5oM8eSW+mJ9Fz8FIPQlJDshjnPigbLXGvI/x/oaHdrOn82M755n8BiHjKp+e9f+05xU0nEGM8W2sfOTiEcFQFfIU7IroDwEUN0Do8w9klkAhnA6TCWQDJ8CJAOnwVoBG+CNAKnwVohk8A2uEjACK6lBIaY5p0OG53/DSiAZAHy4GIbgBw5W6yZ92oEw4leGoiJq1YGzE7CzQRi8NIC7E6DTUQxXEsjSgC8hWTRLAAkgg2QApRBZBAVAN+EPmz3DVrxTUbdf0xqYGW1m4qQWnTmvfdAW+Xz8YhHJFj1gAAAABJRU5ErkJggg==)}.Mcal-year .next-year{right:0;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA2klEQVRYR+XXwQ3CMAxAUWeY+MwIjFI2gElgA2ASVuBsDxMUCaTSQ2s7NlFLj1Wl/+RISZqg85M692EbACLaIeLTMs3mCTDzEQDOpZQbIh60CA/AHgAeNWxBNANqmIiGlNLVgnABtCDcAFaEK8CCcAdoESEADSIMIEWEAiSIcMAS4ieAKQIATjnnS33/H4DJVn1HxOFzaIVPYC4evgRL8VCAJB4GkMZDAJq4O0AbdwVY4m4Aa9wFwMzjS+nXJiO5ITdvRKNruTruMoH3QdPvx0Qy5rlvmpdg9YAX88PCIUoA0kEAAAAASUVORK5CYII=)}.Mcal-Months{padding:0;margin:0;font-size:0;text-align:center;width:100%;height:100%;background:#fff}.Mcal-Months li{color:#92C143;cursor:pointer;font-size:12px;display:inline-block;width:25%;height:30px;line-height:30px}.Mcal-Months li.disabled{color:#eee;cursor:no-drop}</style>',
        $cal = $('<div class="Mcal"><div class="Mcal-year"><div class="btn-year pre-year"></div><span class="year">2018</span>年<div class="btn-year next-year"></div></div><ul class="Mcal-Months"><li data-val="01" class="month-item"><span>1月</span></li><li data-val="02" class="month-item"><span>2月</span></li><li data-val="03" class="month-item"><span>3月</span></li><li data-val="04" class="month-item"><span>4月</span></li><li data-val="05" class="month-item"><span>5月</span></li><li data-val="06" class="month-item"><span>6月</span></li><li data-val="07" class="month-item"><span>7月</span></li><li data-val="08" class="month-item"><span>8月</span></li><li data-val="09" class="month-item"><span>9月</span></li><li data-val="10" class="month-item"><span>10月</span></li><li data-val="11" class="month-item"><span>11月</span></li><li data-val="12" class="month-item"><span>12月</span></li></ul></div>'),//日历面板
        $year = $cal.find('.year'),
        $month = $cal.find('.month-item'),
        $input = this,
        cur_year = new Date().getFullYear(),//当前时间年份
        cur_month = new Date().getMonth(),//当前时间月份
        show_year = cur_year,//当前选择的年份
        needPosition = true,
        show_month = cur_month;//当前选择的月份

    if($('#Mcal_style').length==0){
        $('head').append(style)
    }
    $('body').append($cal);

    setDisabledMonth();

    $input.click(function(){
        if(needPosition){
            setPosition();
            needPosition = false;
        }
        $cal.slideDown(200);
    }).attr('readonly',true);
    //定位
    function setPosition(){
        $cal.css({
            top:$input.offset().top + $input.outerHeight() + 3,
            left:$input.offset().left,
            width:$input.outerWidth()
        });
    }
    //减年份
    $cal.find('.pre-year').click(function(){
        if($(this).hasClass('disabled'))
            return;
        show_year--;
        $year.html(show_year);
        setDisabledMonth()
    })
    //加年份
    $cal.find('.next-year').click(function(){
        if($(this).hasClass('disabled'))
            return;
        show_year++;
        $year.html(show_year);
        setDisabledMonth()
    })
    //选择月份
    $month.click(function(){
        if($(this).hasClass('disabled'))
            return;
        show_month = $(this).attr('data-val');
        $input.val(show_year+'-'+show_month);
        $cal.slideUp(200);
    });
    //设置禁止点击
    function setDisabledMonth(){
        var mindate = new Date(options.minDate),
            maxdate = new Date(options.maxDate);
        $month.each(function(){
            var curdate = new Date(show_year+'-'+ $(this).data('val'));
            if(curdate > maxdate || curdate < mindate ){
                $(this).addClass('disabled')
            }else{
                $(this).removeClass('disabled')
            }
        });
    }
    //点击范围外关闭日历
    $(document).click(function(e){
        if(e.target!=$input[0] && $(e.target).closest('.Mcal').length==0){
            $cal.slideUp(200);
        }
    });
}