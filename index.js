$(document).ready(function() {
    $('#taxForm').submit(function(event) {
        event.preventDefault();
        calculateTax();
    });

    $('.error-icon').each(function() {
        $(this).parent().addClass('error-tooltip');
        $(this).parent().append('<span class="tooltiptext">This field is required<br><small>(only numbers are allowed)</small></span>');
    });
});

function calculateTax() {
    var income = parseFloat($('#income').val());
    var extraIncome = parseFloat($('#extraIncome').val());
    var deductions = parseFloat($('#deductions').val());
    var age = $('#age').val();

    var isValid = true;
    if (isNaN(income)) {
        $('#income-error').css('display', 'inline-block');
        isValid = false;
    } else {
        $('#income-error').css('display', 'inline-block');
    }
    if (isNaN(extraIncome)) {
        $('#extraIncome-error').css('display', 'inline-block');
        isValid = false;
    } else {
        $('#extraIncome-error').css('display', 'inline-block');
    }
    if (isNaN(deductions)) {
        $('#deductions-error').css('display', 'inline-block');
        isValid = false;
    } else {
        $('#deductions-error').css('display', 'inline-block');
    }
    if (age === '') {
        $('#age-error').css('display', 'inline-block');
        isValid = false;
    } else {
        $('#age-error').css('display', 'inline-block');
    }

    if (!isValid) {
        return;
    }


    var taxableIncome = income + extraIncome - deductions;
    var tax = 0;


    if (taxableIncome > 800000) {
        if (age === '<40') {
            tax = (taxableIncome - 800000) * 0.3;
        } else if (age === '≥40 &lt;60') {
            tax = (taxableIncome - 800000) * 0.4;
        } else if (age === '≥60') {
            tax = (taxableIncome - 800000) * 0.1;
        }
    }

    var taxAmount = tax.toFixed(2);
    $('#resultContent').html('<p>Tax Amount: ' + taxAmount +'<br><small>after tax deduction<small> </p>');
    $('#resultModal').modal('show');
}
