$(document).ready(function(){
	var preguntaActual = 0;
	var correoValido;
	inicializarFullPage();

	$('.nav-link').on('click', function() {
		$('.active-link').removeClass('active-link');
		$(this).addClass('active-link');
	});

	$('.respuestas').click(function (){
		if(preguntaActual == $(this).attr('pregunta')){
			console.log('misma pregunta: ' + preguntaActual);
			preguntaActual = $(this).attr('pregunta');	    
	    	anterior.removeClass('respActiva');
		    $(this).addClass('respActiva');
		    anterior = $(this);
		}else{
			preguntaActual = $(this).attr('pregunta');
			console.log('nueva pregunta: ' + preguntaActual);
			$(this).addClass('respActiva');
	    	anterior = $(this);
		}
		$('#btnTest' + $(this).attr('pregunta')).prop('disabled', false);
	});

	$('#btnComenzarTest').click(function(){
		$('.introEncuesta').toggle();
		$('.preguntasTest').toggle();
	});

	$('.btnTest').click(function() {
		
		var preguntaActual = 0;
		preguntaActual =  parseInt($(this).attr('pregunta'));
		if(preguntaActual < 4){
			$('#pregunta' + preguntaActual).toggle();
			$('#pregunta' + (preguntaActual +1)).toggle();
		}else{
			$('#pregunta' + preguntaActual).toggle();
			$('#pregunta' + (preguntaActual +1)).toggle();
			cocina = 0;
			lava=0;
			$(".respuestas.respActiva").each(function(){
			    console.log( $(this).attr("pregunta")+" - "+$(this).attr("respuesta"));
			    if($(this).attr("respuesta") == 'COCINA'){
			        cocina++;
			    }else{
			        lava++;
			    }
			});
		}
	});

	$('#btnTest5').click(function(){
		preguntaActual =  parseInt($(this).attr('pregunta'));
		var a = document.forms["Form"]["nombreParticipante"].value;
	    var b = document.forms["Form"]["direccionParticipante"].value;
	    var c = document.forms["Form"]["telefonoParticipante"].value;
	    var d = document.forms["Form"]["emailParticipante"].value;
	    if (a == null || a == "", b == null || b == "", c == null || c == "", d == null || d == "" ) {

		}else{
			datos = {'nombre':a,	'codigo':b,	'telefono':c,	'email':d};
			if(ValidarEmail(d)){
			jQuery.ajax({
  			method: "POST",
  			url: "php/consumo.php",
  			data: datos,
  			dataType: "JSON"
			})
			  .done(function( msg ) {
			    if(msg.status){
			    	console.log('Mensaje = ' + msg);
			    }else{
			    	if(msg.msg == "0")
			    		alert("Ups, algo pasó, por favor intentalo mas tarde.");
			    }
			});
				if(cocina > lava){
					$('#pregunta' + preguntaActual).toggle();
				    $('.s2').css('background', 'url("img/cocineroBG.jpg"');
				    $('.s2').css('background-size', 'cover');
				    $('.s2').css('background-position', 'center');
				    $('.resultadoCocinero').toggle();
				    $('meta[property="og\\:image"]').attr("content", 'http://web.bbdodigital.cl/clientes/superpollo/cocinanvslavan/img/Imagen-compartir-Test-SP.jpg');
				}else{
					$('#pregunta' + preguntaActual).toggle();
				    $('.s2').css('background', 'url("img/lavadorBG.jpg"');
				    $('.s2').css('background-size', 'cover');
				    $('.s2').css('background-position', 'center');
				    $('.resultadoLavador').toggle();
				    $('meta[property="og\\:image"]').attr("content", 'http://web.bbdodigital.cl/clientes/superpollo/cocinanvslavan/img/MANO%20DER.png');
				}
			}else{

			}
		}
	});
    
    $('#linkComercial').click(function(){
    	document.getElementById('placeholderComercial').click();
    });


    $('#placeholderComercial').click(function(){
    	$('.divComercial').html('<video id="comercialFinal" autoplay loop>'+
									'<source src="SuperPolloComercial.mp4" type="video/mp4">'+
								'</video>');
    });
});

function ValidarEmail(inputText){
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(inputText.match(mailformat))
	{
		correoValido = true;
		return true;
	}else
	{
		alert("Email Incorrecto!");
		correoValido = false;
		return false;
	}
}

function destroyFullPage(){
	setTimeout(function(){
		fullpage_api.destroy('all');
		inicializarFullPage();
	},1000);
}

function inicializarFullPage(){		
	var auxiliar = false;
	var myFullpage = new fullpage('#fullPage', {
		autoScrolling: true, // AUTO SCROLL
		navigation: true, //NAVEGADORES LATERALES,
		//normalScrollElements: '#pregunta5',
		responsiveHeight: 480,
		navigationPosition: 'left',
		anchors: ['section1', 'section2', 'section3', 'section4', 'section5', 'section6'], // Nombres default secciones
		//navigationTooltips: ['Portada', 'Test', 'Comercial', 'Galería', 'Ventajas', 'Cambiarse'], // NOMBRES PARA LOS NAVEGADORES LATERALES
		showActiveTooltip: false,  // MUESTRA LA SECCIÓN ACTIVA EN EL NAV. LATERAL
		scrollingSpeed:2000, // VELOCIDAD CON QUE CAMBIA SECCIÓN
		controlArrows: false, // FLECHAS SE SOBREPONEN CON LOS LATERALES
		slidesNavigation: true, //NAVEGADOR PARTE LATERAL INFERIOR,
        scrollingSpeed: 800, //VELOCIDAD DE SCROLL
        afterLoad: function(origin, destination, direction){
			if(destination.index == 5){
				$("#fp-nav.fp-left ul span").addClass("puntosAzules");
			}else if(origin.index == 5 && direction == 'up'){
				$("#fp-nav.fp-left ul span").removeClass("puntosAzules");
			}else if(destination.index == 0){
				$('#comercialFondo').trigger('play');
			}else if(destination.index == 2){
				$('#comercialFinal').trigger('play');
			}
		}/*,
		onLeave: function(origin, destination, direction){
			if(origin.index == 1 && direction == 'up'){
				console.log('auxiliar es = ' + auxiliar);
				if(auxiliar == true){
					auxiliar = false;
					destroyFullPage();
				}
			}else if(origin.index == 1 && direction == 'down'){
				console.log('auxiliar es = ' + auxiliar);
				if(auxiliar == true){
					auxiliar = false;
					destroyFullPage();
				}
			}
		}*/
	});
}