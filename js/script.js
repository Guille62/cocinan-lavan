var state_menu=false; //variable para detectar menu abierto
var primera_carga_imagen=false; //detecta si ya se realizó la primera carga de imagen
var color_pick_status=true; //indica si está disponible el color picker 

/*CARGA DE LA IMAGEN*/
var combinaciones=[];
var colores=[];
var color1 = "";
var color2 = "";
var color3 = "";
var color4 = "";
var arregloColores = [];
function readURL(input) {
    combinaciones=[];
    colores=[];
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#fotoColorPick').attr('src', e.target.result);
            $('#fotoColorPick').attr('src', e.target.result);
            var img = new Image();
            img.src =  $('#fotoColorPick').attr("src");
            $(img).load(function(){
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var data = canvas.toDataURL("image/png");
                var vibrant = new Vibrant(img);
                var swatches = vibrant.swatches()
                for (var swatch in swatches){
                    if (swatches.hasOwnProperty(swatch) && swatches[swatch]){
                      colores.push(swatches[swatch].getHex());
                      combinaciones.push(swatches[swatch].rgb);
                    }
                    primerColor = nearestColor(colores[0], nearestColor.DEFAULT_COLORS);
                    /*
                    
                    */
                    ;                    
                }
                repintarPaleta(primerColor)
                //$(".cuadro-1").css("background-color",colores[0]);
                //$(".cuadro-2").css("background-color",colores[1]);
                //$(".cuadro-3").css("background-color",colores[2]);
                //$(".cuadro-4").css("background-color",colores[3]);
            });
        };
        reader.readAsDataURL(input.files[0]);
    }
}
/*CARGA DE LA IMAGEN*/


//funcion para cerrar menu si se preciona fuera del menu
$(".overlay").click(function() {

//esconde el menu si esta activo.
menu_footer();

});


$(document).ready(function(){
  //abre y esconde menu
  $(".header .menu").click(function(event) {
  menu_footer();
    /* Act on the event */
  });
  //detecta si esta abierto el menu si no lo cierra
  

  //boton del menu inferior, lleva hacia el home
  $(".volver-camara-btn").click(function(event) {
    /* Act on the event */

    goHome();
  });

  //abre la opcion de cargar foto de celular o camara
  $("#file-input,#file-input-2,#file-input-footer").change(function(){
    $(".btn-buscar").fadeIn();
    //cargar aqui la imagen obtenida de  la camara
    $(".contenedor-cuadro-principal").fadeIn(function(){
      $(this).css("opacity","1")
      primera_carga_imagen=true;
    });
  });

  //nos lleva a la seccion de paleta
  $(".btn-buscar").click(function(){
    gotoPaleta();
  });
  $(".paleta-colores-btn").click(function(event) {
    /* Act on the event */
    if( $(".contenedor-buscar").css("display")!="none" && $(".btn-buscar").css("display")!="none" ){
      gotoPaleta();
    }
  });
});
function menu_footer(){
    if(!state_menu){
      $(".menu-footer").css("bottom","0px");
      $(".overlay").addClass('overlay-on');
      $(".menu").addClass('girar-menu');
      state_menu=true;
    }else{
      $(".menu-footer").css("bottom","-370px");
      $(".overlay").removeClass('overlay-on');
      $(".menu").removeClass('girar-menu');
      state_menu=false;
    }
  }


//funcion retorna al home
function goHome(){
  $('.volver').css("opacity","0");
  color_pick_status=true;
  $(".botones-camaras").fadeIn();
  $("#background-site").css("opacity","0");
  $(".contenedor-paletas").fadeOut();
  $(".botones-camaras").fadeIn();
  $(".contenedor-cuadro-principal").removeClass("escala");
  $(".contenedor-resultados").fadeOut();
  $("body").css("background-image","url(img/trama.jpg)");
  if(primera_carga_imagen){
    $(".contenedor-buscar").fadeIn(function(){
        $(this).css("opacity","1");
    });
  }
}



//lleva hacia seccion de paleta
function gotoPaleta(){

  color_pick_status=false;
  $(".botones-camaras").slideUp('slow');
  $(".contenedor-paletas").fadeIn('slow');
  $('#punteroColor').css('display', 'none');
  $(".contenedor-cuadro-principal").fadeIn('slow');
  //$(".botones-camaras").animate({ height: 0, opacity: 0 }, 'slow');
  $(".contenedor-buscar").fadeOut('slow',function(){
    $(this).css("display","none");
    $(".contenedor-resultados").fadeIn(function(){
      $(".contenedor-resultados").css("opacity","1");
    });
  });
  //achicamos imagen principal con sus colores
  $(".contenedor-cuadro-principal").addClass("escala");
    gradiente(rgb2hex($(".cuadro-1").css("background-color")),rgb2hex($(".cuadro-4").css("background-color")),"background-site");
    obtenerColores(arregloColores);

    $('.volver').css("opacity","1");
    $('.volver').click(function(event) {
      /* Act on the event */

         $('.volver').css("opacity","0");
  color_pick_status=true;
  $(".botones-camaras").fadeIn();
  $("#background-site").css("opacity","0");
  $(".contenedor-paletas").fadeOut();
  $(".botones-camaras").fadeIn();
  $(".contenedor-cuadro-principal").removeClass("escala");
  $(".contenedor-resultados").fadeOut();
  $("body").css("background-image","url(img/trama.jpg)");
  if(primera_carga_imagen){
    $(".contenedor-buscar").fadeIn(function(){
        $(this).css("opacity","1");
    });
  }


    });
}

//genera gradiente, recibe ambos colores exadecimales y el id del div.  
function gradiente(color1,color2,id){
  var background = document.getElementById(id);
  background.style.backgroundImage = "-webkit-linear-gradient("+ color1 +" , "+ color2 +")";
  background.style.opacity=1;
}

//asigna colores a la paleta de combinaciones inicial
function repintarPaleta(primerColor){
  arregloColores = [];
  var coloresPaletaMostrador;
  switch (primerColor){
    case '#640001': //rojo
    case '#C90C0C': 
    case '#75242D':
        $(".cuadro-1").css("background-color",'#C90C0C');
        color1 = "ROJO";
        $(".cuadro-2").css("background-color",'#EF87B5');
        color2 = "ROSADO";
        $(".cuadro-3").css("background-color",'#f0f');
        color3 = "FUCSIA";
        $(".cuadro-4").css("background-color",'#F7E645');
        color4 = "AMARILLO";
      break;
    case '#986216': //cafe
    case '#623a21':
    case '#492b0f':
        $(".cuadro-1").css("background-color",'#986216');
        color1 = "CAFE";
        $(".cuadro-2").css("background-color",'#018EAA');
        color2 = "TURQUESA";
        $(".cuadro-3").css("background-color",'#fff');
        color3 = "BLANCO";
        $(".cuadro-4").css("background-color",'#808080');
        color4 = "GRIS";
      break;
    case '#DC7A13': //naranja
        $(".cuadro-1").css("background-color",'#DC7A13');
        color1 = "NARANJA";
        $(".cuadro-2").css("background-color",'#79D7EC');
        color2 = "CELESTE";
        $(".cuadro-3").css("background-color",'#002AAA');
        color3 = "AZUL";
        $(".cuadro-4").css("background-color",'#986216');
        color4 = "CAFE";
      break;
    case '#EF87B5': //rosa
        $(".cuadro-1").css("background-color",'#EF87B5');
        color1 = "ROSADO";
        $(".cuadro-2").css("background-color",'#018EAA');
        color2 = "TURQUESA";
        $(".cuadro-3").css("background-color",'#002AAA');
        color3 = "AZUL";
        $(".cuadro-4").css("background-color",'#fff');
        color4 = "BLANCO";
      break;
    case '#CE1F73': //fucsia
        $(".cuadro-1").css("background-color",'#f0f');
        color1 = "FUCSIA";
        $(".cuadro-2").css("background-color",'#F7E645');
        color2 = "AMARILLO";
        $(".cuadro-3").css("background-color",'#68228D');
        color3 = "MORADO";
        $(".cuadro-4").css("background-color",'#00B824');
        color4 = "VERDE";
      break;
    case '#3c063d': //morado
    case '#623077': 
        $(".cuadro-1").css("background-color",'#68228D');
        color1 = "MORADO";
        $(".cuadro-2").css("background-color",'#EF87B5');
        color2 = "ROSADO";
        $(".cuadro-3").css("background-color",'#000');
        color3 = "NEGRO";
        $(".cuadro-4").css("background-color",'#fff');
        color4 = "BLANCO";
      break;
    case '#192C7C': //azul
    case '#101442':
        $(".cuadro-1").css("background-color",'#002AAA');
        color1 = "AZUL";
        $(".cuadro-2").css("background-color",'#F7E645');
        color2 = "AMARILLO";
        $(".cuadro-3").css("background-color",'#f0f');
        color3 = "FUCSIA";
        $(".cuadro-4").css("background-color",'#EF87B5');
        color4 = "ROSADO";
      break;
    case '#79D7EC': //celeste
        $(".cuadro-1").css("background-color",'#79D7EC');
        color1 = "CELESTE";
        $(".cuadro-2").css("background-color",'#DC7A13');
        color2 = "NARANJA";
        $(".cuadro-3").css("background-color",'#C90C0C');
        color3 = "ROJO";
        $(".cuadro-4").css("background-color",'#986216');
        color4 = "CAFE";
      break;
    case '#018EAA': //turquesa
        $(".cuadro-1").css("background-color",'#018EAA');
        color1 = "TURQUESA";
        $(".cuadro-2").css("background-color",'#79D7EC');
        color2 = "CELESTE";
        $(".cuadro-3").css("background-color",'#F7E645');
        color3 = "AMARILLO";
        $(".cuadro-4").css("background-color",'#808080');
        color4 = "GRIS";
      break;
    case '#5E791D': //verde
    case '#9ad059':
        $(".cuadro-1").css("background-color",'#00B824');
        color1 = "VERDE";
        $(".cuadro-2").css("background-color",'#986216');
        color2 = "CAFE";
        $(".cuadro-3").css("background-color",'#EF87B5');
        color3 = "ROSADO";
        $(".cuadro-4").css("background-color",'#018EAA');
        color4 = "TURQUESA";
      break;
    case '#F7E645': //amarillo
        $(".cuadro-1").css("background-color",'#F7E645');
        color1 = "AMARILLO";
        $(".cuadro-2").css("background-color",'#002AAA');
        color2 = "AZUL";
        $(".cuadro-3").css("background-color",'#68228D');
        color3 = "MORADO";
        $(".cuadro-4").css("background-color",'#808080');
        color4 = "GRIS";
      break;
    case '#fff':    //blanco
        $(".cuadro-1").css("background-color",'#fff');
        color1 = "BLANCO";
        $(".cuadro-2").css("background-color",'#808080');
        color2 = "GRIS";
        $(".cuadro-3").css("background-color",'#986216');
        color3 = "CAFE";
        $(".cuadro-4").css("background-color",'#DC7A13');
        color4 = "NARANJA";
      break;
    case '#363B3E': //gris
    case '#808080': 
        $(".cuadro-1").css("background-color",'#808080');
        color1 = "GRIS";
        $(".cuadro-2").css("background-color",'#018EAA');
        color2 = "TURQUESA";
        $(".cuadro-3").css("background-color",'#f0f');
        color3 = "FUCSIA";
        $(".cuadro-4").css("background-color",'#68228D');
        color4 = "MORADO";
      break;
    case '#000':    //negro
        $(".cuadro-1").css("background-color",'#000');
        color1 = "NEGRO";
        $(".cuadro-2").css("background-color",'#002AAA');
        color2 = "AZUL";
        $(".cuadro-3").css("background-color",'#F7E645');
        color3 = "AMARILLO";
        $(".cuadro-4").css("background-color",'#fff');
        color4 = "BLANCO";
      break;
  }
  $('.colorPrimero').css('background-color', $(".cuadro-1").css("background-color"));
  asignarColoresResultados(rgb2hex($(".cuadro-1").css("background-color")),rgb2hex( $(".cuadro-2").css("background-color")),rgb2hex($(".cuadro-3").css("background-color")),rgb2hex($(".cuadro-4").css("background-color")));
  arregloColores.push(color1,color2,color3,color4);
  if(rgb2hex($(".cuadro-1").css("background-color")) == "#ffffff" || rgb2hex($(".cuadro-1").css("background-color")) == '#f7e645'){
      $(".colorPrimero").css('color', '#000');
  }else{
      $(".colorPrimero").css('color', '#fff');
  }

}

function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

//asinga colores al acordion de resultados
function asignarColoresResultados(col1,col2,col3,col4){

  $(".color-resultado-1").css("background-color",col1);
  $(".color-resultado-2").css("background-color",col2);
  $(".color-resultado-3").css("background-color",col3);
  $(".color-resultado-4").css("background-color",col4);

}
//asigna los textos al acordion de resultados
function asignarTextosDeColores(colores){
  var i = 0;
  for(;colores[i];){
    if(colores[i] == "#ffffff" || colores[i] == '#f7e645'){
      $(".color-resultado-" + (i+1) + " .bajada span").css('color', '#000');
      $(".color-resultado-" + (i+1) + " .titulo-resultado-" + (i+1)).css('color', '#000');
      $(".color-resultado-" + (i+1) + " .control-der").css('background-color', colores[i]).css("opacity",".8");
      $(".color-resultado-" + (i+1) + " .control-izq").css('background-color', colores[i]).css("opacity",".8");



    }else{
      $(".color-resultado-" + (i+1) + " .bajada span").css('color', '#fff');
      $(".color-resultado-" + (i+1) + " .titulo-resultado-" + (i+1)).css('color', '#fff');
      $(".color-resultado-" + (i+1) + " .control-der").css('background-color', colores[i]).css("opacity",".8");
      $(".color-resultado-" + (i+1) + " .control-izq").css('background-color', colores[i]).css("opacity",".8");
    }

    i++;
  }
}

/*SCROLL COLOR*/
//Variables
var img = _('.imagen-principal img'),
    canvas = _('#cs'),
    result = _('.result'),
    preview = _('.preview'),x = '',y = '';
// Vista Previa al mover el mouse
img.addEventListener('mousemove', function(e){
  // chrome
  if(e.offsetX) {
    x = e.offsetX;
    y = e.offsetY; 
  }
  // firefox
  else if(e.layerX) {
    x = e.layerX;
    y = e.layerY;
  }  
  useCanvas(canvas,img,function(){    
    if( $('.contenedor-cuadro-principal').css('display') != "none"){
      var p = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
      preview.style.background = rgbToHex(p[0],p[1],p[2]);
    }
      else{
      }    
  });
},false);

// canvas function
function useCanvas(el,image,callback){
  el.width = image.width; // img width
  el.height = image.height; // img height
  // draw image in canvas tag
  el.getContext('2d')
  .drawImage(image, 0, 0, image.width, image.height);
  return callback();
}
// short querySelector
function _(el){
  return document.querySelector(el);
};

// convert rgba to hex 
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}
/**/

$(document).ready(function(){
  
    function prepareSection(label, colors) {
        var palette = document.getElementById(label + '-palette'),
            sample = document.getElementById(label + '-sample'),
            actual = sample.querySelector('.actual'),
            nearest = sample.querySelector('.nearest'),
            getColor = nearestColor.from(colors);

        $('#fotoColorPick').click(function(e) {  

        if(color_pick_status)      {
          input = rgb2hex($('.preview').css("background-color"));
            actual.style.backgroundColor = input;
            nearest.style.backgroundColor = getColor(input);
            var x = e.pageX;
            var y = e.pageY;
            var el = $("#punteroColor");
            var col = $("#path1");
            el.css('display', 'block');
            el.css('position', 'absolute');
            el.css("left", x);
            el.css("top", y);
            col.css("fill", input);
            repintarPaleta(getColor(input));
        }  
            
        });

        colors.forEach(function(color) {
            var span = document.createElement('SPAN');
            span.style.backgroundColor = color.source || color;
            palette.appendChild(span);
        });
    }
    prepareSection('default', nearestColor.DEFAULT_COLORS);

});

/****/
var colores_store=[{}];
var bajada1,bajada2,bajada3,bajada4;
var titulo1,titulo2,titulo3,titulo4;

function obtenerColores(colores){


                $("#productos-1").html("").removeClass().addClass('owl-carousel');
                $("#productos-2").html("").removeClass().addClass('owl-carousel');
                $("#productos-3").html("").removeClass().addClass('owl-carousel');
                $("#productos-4").html("").removeClass().addClass('owl-carousel');
                $('.titulo-resultado-1').html("");
                $('.titulo-resultado-2').html("");
                $('.titulo-resultado-3').html("");
                $('.titulo-resultado-4').html("");

                $(".owl-carousel").owlCarousel('destroy');

     


    /*LOADER*/
      $('.loader').css('display','block');
    /**/

    var jsonString = JSON.stringify(colores);
    $.ajax({

            type: "POST",

            url: "php/getColores.php",

            dataType: 'json',

            data:  {data : jsonString},

            success: function(data) {
                    //console.log(value.nombre);
                $('.loader').css('display','none');
                $.each(data, function(index, value) {


                    if(value.nombre_color){

                        //console.log("Color:"+value.nombre_color + "Codigo:"+value.id_color);
                        colores_store.push({"nombre":value.nombre_color,"codigo":value.id_color,"historia": value.historia_color});

                    }

                    var html="";

                    if(value.ID_PRODUCTO){
                        if(value.nombre_color==colores[0]){
                                 let obj = colores_store.find(o => o.nombre === value.CODIGO_COLOR);
                                 //console.log(value.CODIGO_COLOR);
                                 //console.log(obj);
                                 bajada1="<span>" + obj.historia + "</span>";
                                 titulo1 = obj.nombre;
                                 if(obj){
                                html = "<div class='item  producto-container'><a href='"+value.URL_PRODUCTO+"'><img src='img/productos/"+obj.nombre.toLowerCase()+"/" +value.CODIGO_PRODUCTO.replace(/\s/g, '')+ ".jpeg' class='img-fluid' alt=''></a></div>";
                                 $("#productos-1").append(html);

                                 }
                                

                        }else 
                        if(value.nombre_color==colores[1]){
                                 let obj = colores_store.find(o => o.nombre === value.CODIGO_COLOR);
                                 //console.log(value.CODIGO_COLOR)
                                 if(obj){
                                    bajada2="<span>" + obj.historia + "</span>";
                                    titulo2 = obj.nombre;
                                    html = "<div class='item  producto-container'><a href='"+value.URL_PRODUCTO+"'><img src='img/productos/"+obj.nombre.toLowerCase()+"/" +value.CODIGO_PRODUCTO.replace(/\s/g, '')+ ".jpeg' class='img-fluid' alt=''></a></div>";
                                 $("#productos-2").append(html);

                                 }
                        }
                        else 
                        if(value.nombre_color==colores[2]){
                                 let obj = colores_store.find(o => o.nombre === value.CODIGO_COLOR);
                                 //console.log(value.CODIGO_COLOR)
                                 if(obj){
                                    bajada3="<span>" + obj.historia + "</span>";
                                    titulo3 = obj.nombre;
                                html = "<div class='item  producto-container'><a href='"+value.URL_PRODUCTO+"'><img src='img/productos/"+obj.nombre.toLowerCase()+"/" +value.CODIGO_PRODUCTO.replace(/\s/g, '')+ ".jpeg' class='img-fluid' alt=''></a></div>";
                                 $("#productos-3").append(html);

                                 }
                            
                        }
                        else 
                        if(value.nombre_color==colores[3]){
                            let obj = colores_store.find(o => o.nombre === value.CODIGO_COLOR);
                            //console.log(value.CODIGO_COLOR)
                            if(obj){
                              bajada4="<span>" + obj.historia + "</span>";
                              titulo4 = obj.nombre;
                              html = "<div class='item  producto-container'><a href='"+value.URL_PRODUCTO+"'><img src='img/productos/"+obj.nombre.toLowerCase()+"/" +value.CODIGO_PRODUCTO.replace(/\s/g, '')+ ".jpeg' class='img-fluid' alt=''></a></div>";
                              $("#productos-4").append(html);
                            }
                        }
                    }
                });

                $('#bajada-1').html(bajada1);
                $('.titulo-resultado-1').html(titulo1);
                $('#bajada-2').html(bajada2);
                $('.titulo-resultado-2').html(titulo2);
                $('#bajada-3').html(bajada3);
                $('.titulo-resultado-3').html(titulo3);
                $('#bajada-4').html(bajada4);
                $('.titulo-resultado-4').html(titulo4);

                $(".owl-carousel").owlCarousel({
                   loop:true,
                   margin:2,
                   items:2,
                   navElement:'owl-nav'
                });
                $('.control-der').click(function() {
                    $(".owl-carousel").trigger('next.owl.carousel');
                })
                $('.control-izq').click(function() {
                    $(".owl-carousel").trigger('prev.owl.carousel');
                })
                var coloresFondos = [rgb2hex($(".cuadro-1").css("background-color")),rgb2hex( $(".cuadro-2").css("background-color")),rgb2hex($(".cuadro-3").css("background-color")),rgb2hex($(".cuadro-4").css("background-color"))];
                asignarTextosDeColores(coloresFondos);
                //console.log(h1,h2,h3,h4);
            },
            error:function(data){
                $('.loader').css('display','none');
                console.log(data);
            }
        });  



}