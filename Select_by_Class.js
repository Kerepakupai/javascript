/**
 * Created by DGF on 18-10-2017.
 */
$( document ).ready(function () {
    $('.auditschedules').find('.date_1_*').bind('change',function(){
        $(".date_1_*").val($(this).val());
    });

    $('.auditschedules').find('.date_2_*').bind('change',function(){
        $(".date_2_*").val($(this).val());
    });

    $('.auditschedules').find('.date_3_*').bind('change',function(){
        $(".date_3_*").val($(this).val());
    });

    $('.auditschedules').find('.date_4_*').bind('change',function(){
        $(".date_4_*").val($(this).val());
    });
});