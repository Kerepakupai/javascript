/**
 * Created by DGF on 17-10-2017.
 */
$( document ).ready(function () {

    $("#div-group-equation").hide();
    $("#div-group-items").hide();
    $("#calculate_type").change(function () {
        var calculate_type = $(this).val();
        if (calculate_type == 'formula') {
            $("#div-group-equation").show();
            $("#remove-formula").hide();
        } else {
            $("#div-group-equation").hide();
            $("#div-group-items").show();
        }
    });

    $.fn.populateSelect = function (values) {
        var options = '<option value="">' + "-- Seleccione --" + '</option>';
        $.each(values, function (key, row) {
            options += '<option value="' + row.value + '">' + row.text + '</option>';
        });
        $(this).html(options);
    }

    $("#management_id").change(function () {
        $('#area_id').empty().change();

        var management_id= $(this).val();
        if (area_id == "") {
            $('#area_id').empty().change();
        }

        $.getJSON(HOME + "/panel/ajax/areas", {
            management_id: management_id
        }, function(values) {
            $('#area_id').populateSelect(values);
        });
    });

    var counter = 2;
    $("#add-formula").click(function () {
        $("#remove-formula").show();
        if (counter > 10) {
            alert("Solo se permiten 10 Formulas");
            return false;
        }

        var newTextBoxDiv = $(document.createElement('div'))
            .attr("id", 'FormulaDiv' + counter)
            .addClass('form-group');

        newTextBoxDiv.after().html('<label class="col-sm-2 control-label">Formula #' + counter + ' : </label>' +
            '<div class="row"><div class="col-sm-4"><input class="form-control" placeholder="Ingrese Nombre" type="text" name="formula_name[]" id="formulaname' + counter + '" value="" ></div><div class="col-sm-5"><input class="form-control" placeholder="Ingrese Ecuación" type="text" name="formula_equation[]" id="formula' + counter + '" value="" ></div></div>');

        newTextBoxDiv.appendTo("#div-formula");
        counter++;

        if (counter == 2) {
            $("#remove-formula").hide();
        }
    });

    $("#remove-formula").click(function () {
        if (counter == 2) {
            alert("No puede eliminar la formula. Debe existir al menos una");
            $("#remove-formula").hide();
            return false;
        }
        counter--;
        $("#FormulaDiv" + counter).remove();
        if(counter == 2) {
            $("#remove-formula").hide();
        }
    });




});
