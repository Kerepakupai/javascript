/**
 * Created by DFZ on 18-10-2017.
 */
$(document).ready(function() {
    $.fn.generateGraph(7);
});

$.fn.generateGraph = function (kpi_id) {
    $.getJSON( HOME + "/panel/ajax/indicator", {
        kpi_id: kpi_id
    }, function( data ) {
        var slug = data[0].slug;
        var graph_type = data[0].graph;
        var indicator_name = data[0].name;
        var frequency_type = data[0].frequency;

        // Agregamos <Div> donse se agregara la Grafica
        $.fn.addDiv( slug );

        // Generamos definicion del Grafico
        var options = $.fn.generateOptionsVar(slug, graph_type, indicator_name, frequency_type);

        // Generamos Grafica
        var chart = new Highcharts.Chart( options );

        // @todo Agregar Variables para el Id, Nombre y Año de la Formula
        // Agregamos Data
        var formula_data = data[1];
        $.each(formula_data, function (key, val) {
            $.fn.populateData(chart, val.formula_id,  val.formula_name, 2017);
        });

    });
};

$.fn.populateCategories = function(frequency) {
    var categories_period = [];
    switch (frequency) {
        case 'Monthly':
            categories_period = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
            break;
        case 'Bimonthly':
            categories_period = ['Ene - Feb', 'Mar - Abr', 'May - Jun', 'Jul - Ago', 'Sep - Oct', 'Nov - Dic'];
            break;
        case 'Quarterly':
            categories_period = ['Primer Trimestre', 'Segundo Trimestre', 'Tercer Trimestre', 'Cuarto Trimeste'];
            break;
        case 'Fourmonth':
            categories_period = ['Ene - Abr', 'May - Ago', 'Sep - Dic'];
            break;
        case 'Semester':
            categories_period = ['Primer Semestre', 'Segundo Semestre'];
            break;
        case 'Yearly':
            categories_period = [2017];
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

$.fn.populateData = function(chart, formula_id, formula_name, year) {
    var my_data = [];
    $.getJSON(HOME + "/panel/ajax/datos", {
        formula_id: formula_id
    }, function (formula_values) {
        // console.log(formula_values);
        $.each(formula_values, function ( key, item ) {
            //console.log(key + " : " + item);
            my_data.push(item);
        });
        chart.addSeries({
            name: formula_name + " - " + year,
            data: my_data
        });
    });
};




// Ajax Controller
/*
 <?php

 namespace G\Panel;

 use \BaseController;
 use Doctrine\Common\Collections\Expr\Value;
 use \Input;

 class AjaxController extends BaseController
 {
 public function getIndicator()
 {
 // $management_id = Input::get('management_id');
 $kpi_id = Input::get('kpi_id');
 //$indicatorz = Indicator::where('management', '=', $management_id)->get();

 // $kpi = Indicator::whereId($kpi_id)->get();
 // $kpi = Indicator::find($kpi_id);
 // $formulas = Formula::whereKpiId($kpi_id)->get()->to_array();
 $kpi_info = IndicatorVwGraphInfo::whereKpiId($kpi_id)->get();

 $kpi_info_data = [];
 foreach ($kpi_info as $data) {
 $kpi_info_data['name'] = $data->Indicador;
 $kpi_info_data['slug'] = $data->Slug;
 $kpi_info_data['frequency'] = $data->Frequency;
 $kpi_info_data['graph'] = $data->Graph;
 }

 $formulas = Formula::whereKpiId($kpi_id)->get();

 $formulas_data = [];
 foreach ($formulas as $key => $formula) {
 $formulas_data[$key]['formula_id'] = $formula->id;
 $formulas_data[$key]['formula_name'] = $formula->name;
 }

 return json_encode(array($kpi_info_data, $formulas_data));
 }

 public function getDatos()
 {
 $id = Input::get('formula_id');
 // $values = Values::whereFormulaId($id)->whereShow(1)->get();

 $values = FormulaVwValues::where('formula_id', '=', $id)
 // ->orderBy('formula_id', 'DESC')
 // ->orderBy('period', 'DESC')
 // ->orderBy('year', 'DESC')
 ->get();

 $value_data = array();
 for ($i = 1; $i <= 12; $i++) {
 $value_data[$i] = 0;
 }

 foreach ($values as $value) {
 $value_data[$value->period] = $value->value;
 }

 return json_encode($value_data);
 }

 public function getAreas()
 {
 $management_id = Input::get('management_id');

 $areas = Area::whereManagement_id($management_id)
 ->select('id as value', 'name as text')
 ->get()->toArray();
 // array_unshift($areas, ['value' => '', 'text' => '-- Seleccione --']);
 return json_encode($areas);
 }

 public function getVariables()
 {
 $formula_id = Input::get('formula_id');

 $formula = Formula::find($formula_id)->to_array();
 // $vars = $formula->variables();
 // $data = [$formula, $vars];

 return json_encode($formula);
 }

 public function getFormulas()
 {
 $kpi_id = Input::get('kpi_id');

 $formulas = FormulaVwValues::whereKpiId($kpi_id)->get();

 return json_encode($formulas);
 }

 public function getIndicatorInfo()
 {
 $kpi_id = Input::get('kpi_id');
 $kpi = Indicator::find($kpi_id);

 return json_encode($kpi);
 }
 }

 */



