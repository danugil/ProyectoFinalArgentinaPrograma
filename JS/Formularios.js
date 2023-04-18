document.addEventListener('DOMContentLoaded', function() {

    $('#Inputs-contacto').validate({
        rules: {
            nombre: 'required',
            email: {
                required: true,
                email: true
            },
            mensaje: 'required'
        },
        messages: {
            nombre: 'Por favor, ingrese su nombre.',
            email: {
                required: 'Por favor, ingrese su dirección de correo electrónico.',
                email: 'Por favor, ingrese una dirección de correo electrónico válida.'
            },
            mensaje: 'Por favor, ingrese una consulta.'
        },
        submitHandler: function(form) {
            var nombre = $('#nombre').val();
            var email = $('#email').val();
            var mensaje = $('#mensaje').val();

            $.ajax({
                url: 'https://reqres.in/api/users?page=2', 
                method: 'POST',
                data: {
                    nombre: nombre,
                    email: email,
                    mensaje: mensaje
                },
                success: function(response) {
                    console.log('Exito:', response);
                    alert('Tu consulta fue enviada correctamente, en breve nos pondremos en contacto contigo.');
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    alert('Ups algo salió mal. Por favor, inténtelo nuevamente más tarde.');
                }
            });
        }
    });

    $('#Inputs-proceso').validate({
        rules: {
            nombreProceso: 'required',
            cantidad: 'required',
            cantidadPax: 'required'
        },
        messages: {
            nombreProceso: 'Por favor, ingrese su nombre.',
            cantidad: 'Por favor, ingrese la cantidad de noches.',
            cantidadPax: 'Por favor, ingrese la cantidad de pasajeros.'
        },
        submitHandler: function(form) {
            var nombre = document.getElementById('nombreProceso').value;
            var cantidad = document.getElementById('cantidad').value;
            var cantidadPax = document.getElementById('cantidadPax').value;

            var precio = 7500
            var nochesPax = precio * cantidad;
            var nochesTotal = nochesPax * cantidadPax;
            var total = nochesTotal;

            var cotizacion = 'Presupuesto:\n\n' +
                'Nombre: ' + nombre + '\n' +
                'Precio: $' + 7500 + '\n' +
                'Cantidad de Noches: ' + cantidad + '\n' +
                'Cantidad de Huéspedes:' + cantidadPax+ '\n' +
                'Total por Huéped: $' + nochesPax + '\n' +
                'Total por Grupo: $' + total;

        
            alert(cotizacion);

            var pdf = new jsPDF();

            pdf.text(cotizacion, 10, 10);

            var pdfBlob = pdf.output('blob');

            var downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = 'resumen_proceso.pdf';
            downloadLink.click();

            URL.revokeObjectURL(pdfBlob);
        
        }
    });
    
});
