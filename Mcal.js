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
 * demo:
 *    $('#cal').Mcal({
        minDate:'2017/05',
        maxDate:'2018/12'
    })
 */
$.fn.Mcal = function(options) {
    var $cal = $('<div class="Mcal"><div class="Mcal-year"><div class="btn-year pre-year"></div><span class="year">2018</span>年<div class="btn-year next-year"></div></div><ul class="Mcal-Months"><li data-val="01" class="month-item"><span>1月</span></li><li data-val="02" class="month-item"><span>2月</span></li><li data-val="03" class="month-item"><span>3月</span></li><li data-val="04" class="month-item"><span>4月</span></li><li data-val="05" class="month-item"><span>5月</span></li><li data-val="06" class="month-item"><span>6月</span></li><li data-val="07" class="month-item"><span>7月</span></li><li data-val="08" class="month-item"><span>8月</span></li><li data-val="09" class="month-item"><span>9月</span></li><li data-val="10" class="month-item"><span>10月</span></li><li data-val="11" class="month-item"><span>11月</span></li><li data-val="12" class="month-item"><span>12月</span></li></ul></div>'),//日历面板
        $year = $cal.find('.year'),
        $month = $cal.find('.month-item'),
        $input = this,
        cur_year = new Date().getFullYear(),//当前时间年份
        cur_month = new Date().getMonth(),//当前时间月份
        show_year = cur_year,//当前选择的年份
        show_month = cur_month;//当前选择的月份

        //定位
        $cal.css({
            top:$input.offset().top + $input.outerHeight() + 3,
            left:$input.offset().left
        });
        $('body').append($cal);
       
    setDisabledMonth();

    $input.click(function(){
        $cal.show();
    }).attr('readonly',true);
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
        $cal.hide();
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
            $cal.hide();
        }
    });
}