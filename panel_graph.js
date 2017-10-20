/**
 * Created by DFZ on 18-10-2017.
 */
$(document).ready(function() {

    // Obtener Información del Indicador y definir variable Opciones
    $.getJSON( HOME + "/panel/ajax/indicator", {
        kpi_id: 7
    }, function( data ) {
        var slug = data[0].Slug;
        var graph_type = data[0].Graph;
        var indicator_name = data[0].Indicador;
        var frequency_type = data[0].Frequency;
        // Agregamos <Div> donse se agregara la Grafica
        $.fn.addDiv( slug );

        // Generamos definicion del Grafico
        var options = $.fn.generateOptionsVar(slug, graph_type, indicator_name, frequency_type);

        // Generamos data para el Grafico
        // var series_data = $.fn.populateData();
        var series_data = [];
        $.getJSON(HOME + "/panel/ajax/datos", {
            formula_id: 2
        }, function (formula_values) {
            $.each(formula_values, function ( key, item ) {
                console.log(key + ":" + item);
                series_data.push(item);
            });
            options.series.push({
                name: 'Nombre de Formula',
                data: series_data
            });
        });
        var chart = new Highcharts.Chart( options );

        $.fn.populateData(chart, 2);
    });
});

$.fn.message = function(msg) {
    alert(msg);
};

$.fn.populateCategories = function(frequency) {
    switch (frequency) {
        case 'Monthly':
            categories_period = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
            /*
             for (var $i = 1; $i <= 12; $i++) {
             num = (Math.random() * 150) + 50;
             data1.push(num);
             }
             */
            break;
        case 'Bimonthly':
            categories_period = ['Ene - Feb', 'Mar - Abr', 'May - Jun', 'Jul - Ago', 'Sep - Oct', 'Nov - Dic'];
            /*
             for (var $i = 1; $i <= 6; $i++) {
             num = (Math.random() * 150) + 50;
             data1.push(num);
             }
             */
            break;
        case 'Quarterly':
            categories_period = ['Primer Trimestre', 'Segundo Trimestre', 'Tercer Trimestre', 'Cuarto Trimeste'];
            /*
             for (var $i = 1; $i <= 4; $i++) {
             num = (Math.random() * 150) + 50;
             data1.push(num);
             }
             */
            break;
        case 'Fourmonth':
            categories_period = ['Ene - Abr', 'May - Ago', 'Sep - Dic'];
            /*
             for (var $i = 1; $i <= 3; $i++) {
             num = (Math.random() * 150) + 50;
             data1.push(num);
             }
             */
            break;
        case 'Semester':
            categories_period = ['Primer Semestre', 'Segundo Semestre'];
            /*
             for (var $i = 1; $i <= 2; $i++) {
             num = (Math.random() * 150) + 50;
             data1.push(num);
             }
             */
            break;
        case 'Yearly':
            categories_period = [2017];
            /*
             for (var $i = 1; $i <= 1; $i++) {
             num = (Math.random() * 150) + 50;
             data1.push(num);
             }
             */
            break;
    }
    return categories_period;
};

$.fn.addDiv = function (slug) {
    var div = "<div id='" + slug + "' style='min-width: 310px; height: 400px; margin: 0 auto'></div>";
    $("#graficos").append( div );
};

$.fn.generateOptionsVar = function (slug, graphType, indicatorName, frequencyType) {
    var my_options = {
        chart: {
            renderTo: slug,
            type: graphType
        },
        title: {
            text: indicatorName
        },
        subtitle: {
            text: 'Subtitulo'
        },
        xAxis: {
            categories: $.fn.populateCategories(frequencyType),
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: []
    };

    return my_options;
};

$.fn.populateData = function(chart, formula_id) {
    var my_data = [];

    $.getJSON(HOME + "/panel/ajax/datos", {
        formula_id: formula_id
    }, function (formula_values) {
        $.each(formula_values, function ( key, item ) {
            console.log(key + " : " + item);
            my_data.push(item);
        });
        chart.addSeries({
            name: "mentions",
            data: my_data
        });
    });
};

