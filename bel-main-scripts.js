// REVISION ------ 1.0
// SP: ----------- CRI-025171
// DATE: --------- 19-02-2018
// DESCRIPTION: -- funciones para los elementos: campo de texto, textarea y combo de seleccion
// AUTHOR: ------- jcastillov, aramirez (1.0)
// WORKTEAM: ----- Codebreakers-Anonymous (1.0)
// version 1.0

window.$BLUEJQuery = $.noConflict(true);
jQuery = $BLUEJQuery;
validateBLUEJQuery();

//input
$BLUEJQuery(".bel-input-disabled").prop('disabled', true);
$BLUEJQuery(".bel-input-non-editable").prop('disabled', true);

$BLUEJQuery(".bel-input").on('click', function() {
	if (!$BLUEJQuery(this).hasClass('bel-input-error')) {
		$BLUEJQuery(this).addClass('bel-input-edit');
	}
});

$BLUEJQuery('.bel-input').blur(function() {
	$BLUEJQuery(this).removeClass('bel-input-edit');
	$BLUEJQuery(this).addClass('bel-input-filled');
});

//Inicio de Focus en Input
$BLUEJQuery(document).on('focus', '.bel-input', function () {
	$BLUEJQuery(this).addClass("bel-input-default");
});

$BLUEJQuery(document).on('focus', '.bel-input-currency', function () {
	if($BLUEJQuery(this).parent().hasClass("bel-currency-content")) {
		$BLUEJQuery(this).removeClass("bel-input-default");
		$BLUEJQuery(this).parent().addClass("bel-input-line");
		
	}
});
	
$BLUEJQuery(document).on('focusout', '.bel-input-currency', function () {
	if($BLUEJQuery(this).parent().hasClass("bel-currency-content")) {
		$BLUEJQuery(this).parent().removeClass("bel-input-line");
	}
});
//Fin de Focus en Input

function displayDownloadOption(idList, idLabel) {
	if (document.getElementById("downloadOptions").style.display == "block" ) {
		$BLUEJQuery("#" + idList).removeClass("bel-download-options");
		$BLUEJQuery("#" + idLabel).removeClass("bel-download-open");
		document.getElementById("downloadOptions").style.display = "none";
		document.getElementById(idList).style.display = "none";
	} else {
		scrollToElement('#' + idLabel);
		document.getElementById("downloadOptions").style.display = "block";
		document.getElementById(idList).style.display = "block";
		if (!$BLUEJQuery('#' + idLabel).hasClass('bel-select-disabled')) {
			var allOptions = $BLUEJQuery("#mySelect").children('li');
			allOptions.removeClass('selected');
			$BLUEJQuery('#' + idList).toggleClass('bel-download-options');
			$BLUEJQuery("#" + idLabel).toggleClass("bel-download-open");
		}
	}
	$BLUEJQuery(document).click(function(event) {
	    if(event.target.parentElement !== $BLUEJQuery("#" + idList)[0].parentElement && $BLUEJQuery('#'+idList).is(":visible")) {
	        	$BLUEJQuery("#" + idList).removeClass("bel-download-options");
				$BLUEJQuery("#" + idLabel).removeClass("bel-download-open");
				document.getElementById("downloadOptions").style.display = "none";
				document.getElementById(idList).style.display = "none";
	    }
	});
}

function scrollToElement(elementID){
	$BLUEJQuery('html').animate({
	    scrollTop: $BLUEJQuery(elementID).offset().top
	  }, 1000);
}

function scrollToGroup(groupId){
	$BLUEJQuery('html, body').animate({
	    scrollTop: $BLUEJQuery(groupId).offset().top - 30
	  }, 1000);
}

//obtiene el valor seleccionado del select
function getSelectedOption(idList) {
	return $BLUEJQuery("#" + idList).find(".selected").val();
}

//textarea
$BLUEJQuery(".bel-textarea").on('click', function(){
	if(!$BLUEJQuery(this).hasClass('bel-textarea-error')){
		$BLUEJQuery(this).addClass('bel-textarea-edit');
	}
});

$BLUEJQuery('.bel-textarea').blur(function(){
	$BLUEJQuery(this).removeClass('bel-textarea-edit');
});

var tx = document.getElementsByTagName('textarea');
for (var i = 0; i < tx.length; i++) {
  tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;');
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput(){
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}

//funcion tab
//Caga los textos al hacer click en los tabs
$BLUEJQuery.fn.makeTabs = function(tabSelected){
	var tabContiner = this;
	this.attr('class', 'bel-tab');
	this.find( "ul" ).each(function () {
		$BLUEJQuery(this).attr('class', 'bel-tab-container');
	});
	this.find( "ul" ).find( "li" ).each(function () {
		var tab = $BLUEJQuery(this).find('a').attr( "href" );
		$BLUEJQuery(tab).attr('class', 'bel-tab-container__bel-tab-content');
		$BLUEJQuery(this).find('a').attr('class', 'bel-tab-container-element');
		$BLUEJQuery(this).click(function(){
			$BLUEJQuery(tabContiner).find( "div" ).each(function () {
				$BLUEJQuery(this).hide();
			});
			$BLUEJQuery(tabContiner).find( "ul" ).find( "li" ).each(function () {
				$BLUEJQuery(this).attr('class', 'bel-tab-container-link bel-tab-container-element__unselected');
			});
			$BLUEJQuery(this).attr('class', 'bel-tab-container-link bel-tab-container-element__selected');
			$BLUEJQuery(tab).show();
			$BLUEJQuery(tab).find( "div" ).each(function () {
				$BLUEJQuery(this).removeAttr('style');
			});

		});

		if("#"+tabSelected == tab){
			$BLUEJQuery(this).attr('class', 'bel-tab-container-link bel-tab-container-element__selected');
			$BLUEJQuery(this).click();
		}else{
			$BLUEJQuery(this).attr('class', 'bel-tab-container-link bel-tab-container-element__unselected');
		}

	});

};
//fin funcion tab


function validateBLUEJQuery() {
	// Valida si JQuery esta indefinido
	if (undefined == $BLUEJQuery || 'undefined' == typeof $BLUEJQuery) {
		// En caso de que JQuery se esta ejecutando en la variable gloabal
		// wIndow lo tome de ahi
		if (undefined != window.$j) {
			// Define $BLUEJQuery que se ejecuta en window.$BLUEJQueryj
			window.$BLUEJQuery = $.noConflict(true);
			window.JQuery = $.noConflict(true);
			// En caso de no tener JQuery cargado se encarga de cargar el
			// archivo de la vesion 1.7.2
		} else {
			// Se crea el tag script con el tipo y la ruta del archivo
			var jQueryFileScript = document.createElement('script');
			jQueryFileScript.type = 'text/javascript';
			jQueryFileScript.src = 'https://blue.baccredomatic.com/js/jquery-3.3.1.min.js';
			jQueryFileScript.async = 1;
			// Se agrega al body
			//Se agrega al body
			jQueryFileScript.onload = function() {
		        window.$BLUEJQuery = $.noConflict(true);
		        window.JQuery = $.noConflict(true);
		        validateBLUEJQuery();
		    };
		    document.getElementsByTagName("head")[0].appendChild(jQueryFileScript);
		}
	}
}


/**
 * Plugin creado para crear pasos de wizard generico

 * Descripcion de uso
 *
 * $BLUEJQuery('#contenedorEjemplo').createWizard(steps, mensajesdePasos, mensajeNumeros,
 * selectedStep);
 *
 * Los parametros son los pasos que se debe mostrar, con el texto y el numero
 * del paso por cada paso en un arreglo y el paso seleccionado.
 *
 * messagesStep = []; messagesStep.push(<fmt:message
 * key="common.label.wizard.step1" />); messagesStep.push(<fmt:message
 * key="common.label.wizard.step2" />); messagesStep.push(<fmt:message
 * key="common.label.wizard.step3" />);
 *
 * $BLUEJQuery('#contenedorEjemplo').belCreateWizardProcessStep(3, messagesStep,
 * messagesNumber, 1);
 */
// Carga JQuery en caso de que no se este cargando en la pagina
$BLUEJQuery.fn.belCreateWizardProcessStep = function(steps, messagesStep, selectedStep) {
	if (steps <= 5) {

		var processList = $BLUEJQuery('<ul class="wizard"></ul>');
		for (var i = 0; i < steps; i++) {
			var step = $BLUEJQuery('<li class="w-step w-step-inactive w-steps-'
					+ steps
					+ '"><label id="step'
					+ (i + 1)
					+ '" class="w-label w-label-inactive">'
					+ messagesStep[i] + '</label></li>');
			if ((i + 1) == selectedStep) {
				step = $BLUEJQuery('<li class="w-step w-step-active w-steps-'
						+ steps
						+ '"><label id="step'
						+ (i + 1)
						+ '" class="w-label w-label-active">'
						+ messagesStep[i] + '</label></li>');
			} else if ((i + 1) < selectedStep) {
				step = $BLUEJQuery('<li class="w-step w-step-completed w-steps-'
						+ steps
						+ '"><label id="step'
						+ (i + 1)
						+ '" class="w-label w-label-active">'
						+ messagesStep[i] + '</label></li>');
			}
			processList.append(step);
		}

		this.html(processList).css('display', 'flex');
		animationProgressBar(this, steps, selectedStep);

	}
	/*IMPORTANTE: El numero de pasos no debe estar por encima de la capacidad de Wizard*/
}

function animationProgressBar(elem, steps, selectedStep){
	if(selectedStep <= steps){
		$BLUEJQuery(elem).children('.wizard').children('.w-step').each(function(){
			if($BLUEJQuery(this).hasClass("w-step-active")){
				$BLUEJQuery(this).addClass("w-step-actual");
			}
			if($BLUEJQuery(this).children('.w-label').hasClass("w-label-active")){
				$BLUEJQuery(this).children('.w-label').addClass("w-label-actual");
			}
		});
	}
	/*IMPORTANTE: El numero de pasos no debe estar por encima de la capacidad de Wizard*/
}

/**
 *Codigo para la animacion de contandor.
 *
 **@param belDurationTime número en segundos de la duración del contador
 *
 */
function startAmimationTimer(belDurationTime){
	if ( $BLUEJQuery( "#belSeconds" ).length ) {
	setTimeout(belExecuteCircleTimer(belDurationTime), 1000);
	}
}


function belExecuteCircleTimer(belDurationTime) {
    var time = belDurationTime;
    var timer = $BLUEJQuery('#belSeconds')[0];
    timer.innerHTML = time;
    var seconds = Number(timer.innerHTML);
    var pixelInterval = 312;
    setTimeout(function() {
   // ejecutal el inicio del conteo
   // *****************************************
        }, belDurationTime);
      var belCircleInterval = setInterval(function() {
        seconds--;
        if (seconds >= 0) {
        	pixelInterval= pixelInterval + (120/time);
            timer.innerHTML = seconds;
            $BLUEJQuery('.bel-timer-cont__circle').css('stroke-dashoffset', pixelInterval);
        }else{
     // Finaliza el tiempo
     // ***************************
        	clearInterval(belCircleInterval);
        	$BLUEJQuery('.bel-timer-cont__circle').css('stroke-dashoffset', 434);
        }
    }, 1000);
}
// Fin funcion animacion contador



function closeModal(box, modal){
	$BLUEJQuery("#"+box).removeClass("bel-box-visible");
	$BLUEJQuery("#"+modal).removeClass("bel-modal-visible");
	$BLUEJQuery("#"+box).addClass("bel-box-hidden");
	$BLUEJQuery("#"+modal).addClass("bel-modal-hidden");
}

function openModal(box, modal){
	$BLUEJQuery("#"+box).removeClass("bel-box-hidden");
	$BLUEJQuery("#"+modal).removeClass("bel-modal-hidden");
	$BLUEJQuery("#"+box).addClass("bel-box-visible");
	$BLUEJQuery("#"+modal).addClass("bel-modal-visible");
}

//Funcion para esconder o mostrar el resultado de las busquedas
function belShowResultsContent(myInput, myContent) {
    var input, resultCont;
    input = document.getElementById(myInput);
    resultCont = document.getElementById(myContent);
    if(input.value==""){
    	resultCont.classList.add("bel-hide-element");
    }else{
    	resultCont.classList.remove("bel-hide-element");
    }
}


/**
 *Funcionalidad para el componente de Notificaciones-email
 *
 */
$BLUEJQuery.fn.delayKeyup = function(callback, ms){
	var timer = 0;
	$BLUEJQuery(this).keyup(function(){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	});
	return $BLUEJQuery(this);
};

 $BLUEJQuery('#belInputEmailId').delayKeyup(function(){
 	belValidateEmail('belInputEmailId', 'belInpEmailSpan');
 }, 500);


 var emailAddCount = 0;
 function belAddNewEmail(inputId, mainContId, spanId, maxEmails){
 	var belMoreEmailsContId = document.getElementById(mainContId);
 	var divs = belMoreEmailsContId.querySelectorAll('div');
 	var cantidad = divs.length;
 	var inputTextAux = $BLUEJQuery("#"+inputId).val();

 	if (maxEmails>cantidad && inputTextAux!="") {
 		if ($BLUEJQuery('#'+spanId).hasClass('bel-validation-icon-success-s')) {
 			$BLUEJQuery('#'+inputId).removeClass('bel-input-error');
 			var contAux = document.createElement("div");
 			contAux.className = "bel-space-top-xs";
 			contAux.id = "idToRemove"+emailAddCount;

 			var inputAux = document.createElement("input");
 			inputAux.className = "bel-input--icon bel-input--icon-m bel-input-default bel-input-non-editable";
 			inputAux.setAttribute('type','text');
 			inputAux.setAttribute('value', inputTextAux);
 			$BLUEJQuery("#"+inputId).val("");
 			belClearInputMain(spanId,inputId);

 			var spanAux = document.createElement("span");
 			spanAux.className = "bel-error-validation bel-error-validation-item";
 			spanAux.setAttribute('onclick','belDeleteEmailCont(this)');
 			spanAux.id = "idToRemove"+emailAddCount;

 			contAux.appendChild(inputAux);
 			contAux.appendChild(spanAux);
 			belMoreEmailsContId.appendChild(contAux);

			emailAddCount++;

 		}else{
 			$BLUEJQuery('#'+inputId).addClass('bel-input-error');
 			$BLUEJQuery('#'+spanId).addClass('el-typography-main bel-typography-label-error');
 			$BLUEJQuery('#'+spanId).removeClass('bel-hide-element');
 			$BLUEJQuery('#'+spanId).text("Por favor digite un correo válido");
 		}
 	}
 	if (cantidad==maxEmails && inputTextAux!="") {
 		$BLUEJQuery('#'+spanId).removeClass('bel-validation-icon bel-validation-icon-success-s bel-hide-element');
 		$BLUEJQuery('#'+inputId).addClass('bel-input-error');
 		$BLUEJQuery("#"+inputId).val("");
 		$BLUEJQuery('#'+spanId).addClass('el-typography-main bel-typography-label-error');
 		$BLUEJQuery('#'+spanId).text("No se pueden agregar más correos");
 	}
 }

 function belCheckExistEmails(inputId, spanId, mainContId){
 	var belMoreEmailsContId = document.getElementById(mainContId);
 	var divs = belMoreEmailsContId.querySelectorAll('div');
 	var cantidad = divs.length;
 	if (cantidad==0 && !$BLUEJQuery('#'+spanId).hasClass('bel-validation-icon-success-s')) {
 		$BLUEJQuery('#'+spanId).removeClass('bel-validation-icon bel-validation-icon-success-s bel-hide-element');
 		$BLUEJQuery('#'+inputId).addClass('bel-input-error');
 		$BLUEJQuery('#'+spanId).addClass('el-typography-main bel-typography-label-error');
 		$BLUEJQuery('#'+spanId).text("Campo requerido");
 	}
 }

 function belDeleteEmailCont(element){

	$BLUEJQuery(document.getElementById(element.id)).remove();
 	$BLUEJQuery( element ).parent(".bel-col-7").remove();
 	$BLUEJQuery( element ).parent(".bel-space-top-xs").remove();
 }

 function belValidateEmail(inputId, spanId) {
 	var email = $BLUEJQuery('#'+inputId).val();
 	if (email!="") {
 		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 		$BLUEJQuery("#"+spanId).removeClass('bel-hide-element');
 		$BLUEJQuery("#"+spanId).text('');
 		if (re.test(String(email).toLowerCase())) {
 			$BLUEJQuery("#"+spanId).removeClass('el-typography-main bel-typography-label-error');
 			$BLUEJQuery("#"+spanId).text('');
 			$BLUEJQuery("#"+inputId).removeClass('bel-input-error');
 			$BLUEJQuery("#"+spanId).addClass('bel-validation-icon bel-validation-icon-success-s');
 		}else{
 			$BLUEJQuery("#"+spanId).removeClass('bel-validation-icon bel-validation-icon-success-s');
 		}
 	}else{
 		$BLUEJQuery("#"+spanId).addClass('bel-hide-element');
 	}
 }

 function belClearInputMain(spanId, inputId){
 	$BLUEJQuery('#'+inputId).val('');
 	$BLUEJQuery("#"+spanId).removeClass();
 	$BLUEJQuery("#"+spanId).addClass('bel-hide-element');
 	$BLUEJQuery("#"+spanId).unbind( "click" );
 }

function toggleTable(tableId){
	$BLUEJQuery("#tBody"+tableId ).toggle(500);
	$BLUEJQuery("#thead"+tableId ).toggle(500);
	if ($BLUEJQuery("#caption"+tableId ).hasClass('bel-table-open-icon')) {
	$BLUEJQuery("#caption"+tableId ).removeClass('bel-table-open-icon');
	$BLUEJQuery("#caption"+tableId ).addClass('bel-table-close-icon');
	}else{
		$BLUEJQuery("#caption"+tableId ).addClass('bel-table-open-icon');
	$BLUEJQuery("#caption"+tableId ).removeClass('bel-table-close-icon');
	}
}

function toggleInfoBox(elementID, showDetailsLabel, hideDetailsLabel){
	$BLUEJQuery("#toggleInfo"+elementID).slideToggle(500);
	if ($BLUEJQuery("#toggleArrow"+elementID).hasClass('bel-icon-arrow-down-xxs')) {
		$BLUEJQuery("#toggleArrow"+elementID).removeClass('bel-icon-arrow-down-xxs');
		$BLUEJQuery("#toggleArrow"+elementID ).addClass('bel-icon-arrow-up-xxs');

		$BLUEJQuery("#toggleArrow"+elementID ).text(hideDetailsLabel);
	}else{
		$BLUEJQuery("#toggleArrow"+elementID).addClass('bel-icon-arrow-down-xxs');
		$BLUEJQuery("#toggleArrow"+elementID).removeClass('bel-icon-arrow-up-xxs');
		$BLUEJQuery("#toggleArrow"+elementID ).text(showDetailsLabel);
	}
}


/**
 *Funcionalidad para el componente input Mostrar - Ocultar
 *
 */
$BLUEJQuery.fn.blueInputPasswordType = function(inputId, inputSize, show, hide){
	 $BLUEJQuery('#'+inputId).removeClass();
	 $BLUEJQuery('#'+inputId).addClass("bel-input--icon bel-input--icon-"+inputSize.toLowerCase()+" bel-input-default");
	 $BLUEJQuery('#'+inputId).prop("type", "password");
	 $BLUEJQuery('#'+inputId).css("padding-right", "71px");
	 var selectDiv = $BLUEJQuery('<span onclick="validateShowElementLabel(\''+inputId+'\',this,\''+show+'\',\''+hide+'\' )" style="margin-left: -26px;color:#6D6E71; font-size: 14px; cursor:pointer;" class="bel-validation-icon bel-typography bel-typography-label">'+show+'</span>');
	 $BLUEJQuery('#'+inputId).after( selectDiv);
};


function validateShowElementLabel(inputId, spanObject, show, hide){
 if ($BLUEJQuery('#'+inputId).val()!="") {
	 if ( $BLUEJQuery('#'+inputId).is('input:text')) {
		 $BLUEJQuery('#'+inputId).removeAttr("type", "text");
		 $BLUEJQuery('#'+inputId).prop("type", "password");
		 $BLUEJQuery(spanObject).text(show);
	 }else{
		 $BLUEJQuery('#'+inputId).removeAttr("type", "password");
		 $BLUEJQuery('#'+inputId).prop("type", "text");
		 $BLUEJQuery('#'+inputId).prop("type", "text");
		 $BLUEJQuery(spanObject).text(hide);
	 }
 }
}

/**
	Funciona que recibe el idioma en que se encuentra la sucursal para cargar el date picker
*/
function loadDatePicker(idDatepicker ,languaje, offsetDatePicker){

	var langujesForDatePicker = {};
	langujesForDatePicker.es = {
		months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      	days: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
	};
	langujesForDatePicker.en = {
		months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December'],
    	days: ['Sunday', 'Monday', 'Tuesdar', 'Wednesday', 'Thrusday', 'Friday', 'Saturday']
	};

	if(typeof offsetDatePicker !== 'undefined'){
		langujesForDatePicker.es.offset = offsetDatePicker;
		langujesForDatePicker.en.offset = offsetDatePicker;
	}


	$BLUEJQuery('#' + idDatepicker).Zebra_DatePicker(
		langujesForDatePicker[languaje]
	);
}


var getBrowserInfo = function() {
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }

    return M.join(' ');
};

function isSafari() {
    var ua = window.navigator.userAgent;
    var iOS = !!ua.match(/iP(ad|od|hone)/i);
    var hasSafariInUa = !!ua.match(/Safari/i);
    var noOtherBrowsersInUa = !ua.match(/Chrome|CriOS|OPiOS|mercury|FxiOS|Firefox/i)
    var result = false;
    if(iOS) { //detecting Safari in IOS mobile browsers
        var webkit = !!ua.match(/WebKit/i);
        result = webkit && hasSafariInUa && noOtherBrowsersInUa
    } else if(window.safari !== undefined){ //detecting Safari in Desktop Browsers
        result = true;
    } else { // detecting Safari in other platforms
        result = hasSafariInUa && noOtherBrowsersInUa
    }
    return result;
}

/*
Uso de parametros
idContainer: id del div donde se inyecta el componente
alertType: tipo de alerta (1:informativo, 2:correcto, 3:error, 4:alerta)
iconClass: Clase del icono
title: titulo del mensaje
message: Texto del mensaje
buttonText: texto del botÃƒÂ³n
buttonUrl: Url del botÃƒÂ³n


Nota: En caso de no necesitar botÃƒÂ³n o tÃƒÂ­tulo dejar el parametro en null.
*/
//Metodo que crea el contenedor de los mensajes con la informacion del mensaje
function createAlertMessage(idContainer, alertType, iconClass, title, message, buttonText, buttonUrl) {
	var mainContainer = document.getElementById(idContainer);
	var navInfo = getBrowserInfo();

	// Estilo del componente (tipo, color, icono)
	var row = $BLUEJQuery("<div/>").addClass("bel-grid-row");
	var column = $BLUEJQuery("<div/>").addClass("bel-col-12").appendTo(row);
	var alertMessage = $BLUEJQuery("<div/>").addClass("bel-alertMessage").appendTo(column);
	var alertClass = getAlertClassByType(alertType);
	//Valida si el navegador es IE
	if (navInfo.indexOf('IE') != -1) {alertClass+="-ie9";}
	var alertMessagetype = $BLUEJQuery("<div/>").addClass(alertClass).appendTo(alertMessage);

	$BLUEJQuery("<div/>").addClass(iconClass +" bel-alertMessage-icon").appendTo($BLUEJQuery("<div/>").addClass("bel-alertMessage-icon-container").appendTo(alertMessagetype));
	// Contenido del componente (tÃƒÂ­tulo, texto)
	var alertMessageContent;
	if(isNotNullOrEmpty(buttonText)) {
		 alertMessageContent = $BLUEJQuery("<div/>").addClass("bel-display-inline bel-alertMessage_content").appendTo(alertMessage);
	}else{
		alertMessageContent = $BLUEJQuery("<div/>").addClass("bel-display-inline bel-alertMessage_content-full").appendTo(alertMessage);
	}

	if(isNotNullOrEmpty(title)) {
		var titleClass = "bel-typography bel-typography-h3";
		//Valida si el navegador es IE
		if (navInfo.indexOf('IE') != -1) {titleClass+=" bel-alertMessage-margin-ie9";}
		var alertTitleContent = $BLUEJQuery("<div/>").addClass("messageTitleDisplay").appendTo(alertMessageContent);
		$BLUEJQuery("<h3/>").addClass(titleClass).append(title).appendTo(alertTitleContent);
	}

	if(isNotNullOrEmpty(message)) {
		var messsageTextContainer = $BLUEJQuery("<div/>").addClass('bel-alertMessage-textCnt').appendTo(alertMessageContent);
		var messageClass = "bel-typography bel-typography-p";
		//Valida si el navegador es IE
		if (navInfo.indexOf('IE') != -1) {messageClass+=" bel-alertMessage-margin-ie9";}
		$BLUEJQuery("<p/>").addClass(messageClass).append(message).appendTo(messsageTextContainer);
	}
	// Contenido del componente (botÃƒÂ³n)
	if(isNotNullOrEmpty(buttonText)){
		var alertMessageButton = $BLUEJQuery("<div/>").addClass("bel-alertMessage_button bel-display-inline").appendTo(alertMessage);
		var alertMessageButtonContainer = $BLUEJQuery("<div/>").addClass("bel-display-inline").appendTo(alertMessageButton);
		var button = $BLUEJQuery("<button/>").addClass("bel-btn bel-btn-secondary bel-btn-secondary-active").append(buttonText).appendTo(alertMessageButtonContainer);
		button.click(function(){window.location.href=buttonUrl;});
	}
	row.appendTo(mainContainer);
}

/*
* Comprueba que el dato no este vacio ni sea nulo
*/
function isNotNullOrEmpty(data){
	if(data != null && data != ""){
		return true;
	}
	return false;
}

/*
* Obtiene la clase correspondientes segun el tipo de alerta
*/
function getAlertClassByType(alertType){
	switch (alertType) {
		case 1: return "bel-alertMessage_info-color";
				break;
		case 2: return "bel-alertMessage_success-color";
				break;
		case 3: return "bel-alertMessage_error-color";
				break;
		case 4: return "bel-alertMessage_warning-color";
				break;
		default: return "bel-alertMessage_info-color";
				 break;

	}
}

//Comparative Menu
function checkedComparativeMenu() {
  $BLUEJQuery(".bel-comparative-menu").each(isChecked);
}

function normalizeHeightComparativeMenu(id) {
	setTimeout(function() {
        setComparativeItemsHeight($BLUEJQuery(id));
    }, 10);
}

function isChecked() {
  var checked = $BLUEJQuery(this).find(".bel-radio-button").is(":checked");
  $BLUEJQuery(this).toggleClass("bel-comparative-menu-active", checked);
  $BLUEJQuery(this).removeClass("bel-comparative-menu-default");
}

function permuteTextContend(elementId, permutableTextElement1, permutableTextElement2){
	if($('#'+elementId).text() == permutableTextElement1){
		$('#'+elementId).text(permutableTextElement2);
	}else{
		$('#'+elementId).text(permutableTextElement1);
	}
}

/**
 * Funcion que se encarga de agregarle los estilos BLUE al menu comparativo
 * @param selectedRadio Variable con el radio buttom seleccionado al cargar los estilos
 */
$BLUEJQuery.fn.comparativeMenu = function(selectedRadio){
	var itemsCount = 0;
	var comparativeMenuClass = "bel-comparative-menu";
	$BLUEJQuery(this).css("list-style-type", "none");
	$BLUEJQuery(this).find( 'li' ).each(function () {
		itemsCount++;
	});

  var itemsIdCount = 1;
	$BLUEJQuery(this).find( 'li' ).each(function () {
		if(itemsCount > 4){
			$BLUEJQuery(this).remove();
		}else{
			$BLUEJQuery(this).css("float", "left");
			var comparativeMenuItem = $BLUEJQuery('<div class="'+comparativeMenuClass+'"></div>');
			var inputRadio;
			var inputRadioLabel;
			var checked;
			$BLUEJQuery(this).children( 'input' ).each(function () {
				inputRadio = $BLUEJQuery(this);
			});
			$BLUEJQuery(this).children( 'label' ).each(function () {
				inputRadioLabel = $BLUEJQuery(this);
			});

			var sectionHeader = $BLUEJQuery('<div id="comparativeMenuHead" class="bel-comparative-menu-default bel-comparative-menu__head">' +
			'<div class="bel-selection-input">' +
			'<input class="bel-radio-button" type="radio" id="an-id' + itemsIdCount + '" name="' + $BLUEJQuery(inputRadio).attr('name') + '" value="' + $BLUEJQuery(inputRadio).attr('value') + '" onclick="checkedComparativeMenu()"> ' +
			'<label class="bel-radio-button-icon" for="an-id' + itemsIdCount + '"></label> ' +
			'<label class="bel-radio-button-text" for="an-id' + itemsIdCount + '">' + $BLUEJQuery(inputRadioLabel).text() + '</label>' +
			'</div>' +
			'</div>');

			var sectionBody = $BLUEJQuery('<div id="comparativeMenuContent" class="bel-comparative-menu-default bel-comparative-menu__content"></div>');
			var sectionBodyImage;
			var img;
			var bodySection = $BLUEJQuery('<div class="bel-comparative-menu__content__information"></div>');
			var bodyDetails = $BLUEJQuery('<div class="bel-comparative-menu__content__footer bel-border-top"></div>');
			var sectionBodyContent = $BLUEJQuery('<div class="bel-comparative-menu__content__info"></div>');

			$BLUEJQuery(sectionBody).append(sectionBodyContent);
			$BLUEJQuery(this).children( 'section' ).each(function () {
			bodySection.append($BLUEJQuery(this));

				$BLUEJQuery(this).children( 'img' ).each(function () {
					img = $BLUEJQuery(this).detach();
					sectionBodyImage = $BLUEJQuery('<div class="bel-comparative-menu__content__image bel-border-bottom"></div>');
					sectionBodyImage.append(img);
					sectionBodyContent.append(sectionBodyImage);
				});
			$BLUEJQuery(sectionBodyContent).append(bodySection);

			$BLUEJQuery(this).children( 'details' ).each(function () {
				var detailsArticle = $BLUEJQuery('<div id="toggleInfo' + itemsIdCount + '" class="bel-space-top-s bel-display-none" ></div>');
				$BLUEJQuery(detailsArticle).append($BLUEJQuery(this).html());
				$BLUEJQuery(bodyDetails).append(detailsArticle);
				var showDetailsLabel;
				var hideDetailsLabel;

				$BLUEJQuery(this).children( 'summary' ).each(function () {
					showDetailsLabel = $BLUEJQuery(this).text().substr(0,$BLUEJQuery(this).text().indexOf("|"));
					hideDetailsLabel = $BLUEJQuery(this).text().substr($BLUEJQuery(this).text().indexOf("|") + 1, $BLUEJQuery(this).text().length);
				});


				var detailsOption = $BLUEJQuery('<div onclick="toggleInfoBox(' + itemsIdCount + ',\'' + showDetailsLabel + '\',\'' + hideDetailsLabel + '\'); " class="bel-space-top-s bel-space-bottom-m bel-position-right">' +
						'<a id="toggleArrow' + itemsIdCount + '"  class="bel-typography-link bel-icon-arrow-down-xxs">' + showDetailsLabel + '</a>' +
		            	'</div>');

					$BLUEJQuery(bodyDetails).append($BLUEJQuery(detailsOption));
					$BLUEJQuery(sectionBody).append($BLUEJQuery(bodyDetails));
					$BLUEJQuery(this).remove();
				});
			});
	        comparativeMenuItem.append(sectionHeader);
	        comparativeMenuItem.append(sectionBody);
			$BLUEJQuery(this).html(comparativeMenuItem);
      itemsIdCount++;
		}
	});
	$BLUEJQuery('#an-id'+selectedRadio).click();
    $BLUEJQuery(this).addClass( "bel-menu");
    normalizeHeightComparativeMenu(this);
    $BLUEJQuery("#belComparativeMenuID").removeClass( "bel-display-none");

};

/**
 * Funcion que se encarga de calcular el alto minimo para los items del menu comparativo
 * @param item
 */
function setComparativeItemsHeight(menu) {
    var $menu = menu;
    var $item = menu.children('li').children(".bel-comparative-menu");
    var update = setInterval($BLUEJQuery.proxy(function () {
        if($menu.hasClass("bel-menu")){
            clearInterval(update);
            var $infoHeight = 0;
              $item.each(function() {
                var $thisHeight = $BLUEJQuery(this).children('.bel-comparative-menu__content').children('.bel-comparative-menu__content__info').outerHeight(true);
                if ($thisHeight > $infoHeight) {
                  $infoHeight = $thisHeight;
                }
              });
              $item.children('.bel-comparative-menu__content').children('.bel-comparative-menu__content__info').css('min-height', parseFloat($infoHeight) + 'px');
        }
    }, $item, $menu), 50);
}


/**
 * Funcion que se encarga de realizar la animacion para cambiar si la flecha muestra informacion o se encuentra escondida
 * @param blueElement
 */
function openOrCloseArrow(blueElement){
	var arrowElement = $BLUEJQuery(blueElement);

	if (arrowElement.hasClass('bel-icon-subaccount-open')) {
		arrowElement.removeClass('bel-icon-subaccount-open');
		arrowElement.addClass('bel-icon-subaccount-close');
	} else {
		arrowElement.removeClass('bel-icon-subaccount-close');
		arrowElement.addClass('bel-icon-subaccount-open');
	}
}

/**
 * Función que se encarga de enviar a la función de "ver más" o "ver menos" dependiendo del estado actual del menú
 * @param idMenu : id del ul del menú
 * @param idSeemoreLink : id del link de ver más propio del menú
 * @param maxItemsToShow : máximo de items a mostrar en el menu cuando está contraido
 */
function seeMoreOrLessMenuItems(idMenu, idSeemoreLink, maxItemsToShow){
    if($BLUEJQuery("#" + idSeemoreLink).hasClass("bel-seemore-link-flag")){
        seeMoreMenuItems(idMenu, idSeemoreLink);
    }else{
        seeLessItems(idMenu, idSeemoreLink, maxItemsToShow);
    }
}


/**
 * Función que se encarga de ocultar los items del menú según el máximo a contrar establecido
 * @param idMenu : id del ul del menú
 * @param idSeemoreLink : id del link de ver más propio del menú
 * @param maxItemsToShow : máximo de items a mostrar en el menu cuando está contraido
 * @param hideSpeedCustom : velocidad del efecto al ocultar los items
 */
function seeLessItems(idMenu, idSeemoreLink, maxItemsToShow, hideSpeedCustom) {
    var liCounter = 0;
    var hideSpeed = 300;

    if (hideSpeedCustom!=null) {
    hideSpeed=hideSpeedCustom;
    }

    //muestra los destacados siempre que no sobrepase el limite: maxItemsToShow
    $BLUEJQuery("#" + idMenu).find('li').each(function () {
	    var found = $BLUEJQuery(this).find(".isHighlightedFlag");
	    //si hay coincidencias
	    if (found.length > 0 && liCounter < maxItemsToShow && !$BLUEJQuery(this).hasClass("bel-menu-hide-item")) {
	    	$BLUEJQuery(this).show(300);
	    	liCounter++;
	    }
    });

    //muestra los no destacados siempre que no sobrepase el limite: maxItemsToShow
   $BLUEJQuery("#" + idMenu).find('li').each(function () {
    	var found = $BLUEJQuery(this).find(".isHighlightedFlag");
    	//no hay coincidencias
		if (found.length <= 0) {
    if(liCounter >= maxItemsToShow){
       $BLUEJQuery(this).hide(hideSpeed);
     }
     if(!$BLUEJQuery(this).hasClass("bel-menu-hide-item")){
       liCounter++;
     }
		}
  });

   if(liCounter <= (maxItemsToShow)){
     $BLUEJQuery("#" + idSeemoreLink).hide(0);
   }else{
            $BLUEJQuery("#" + idSeemoreLink).removeClass("bel-icon-arrow-up-xxs");
            $BLUEJQuery("#" + idSeemoreLink).addClass("bel-icon-arrow-down-xxs");
            $BLUEJQuery("#" + idSeemoreLink).show(0);
   }
        $BLUEJQuery("#" + idSeemoreLink).addClass("bel-seemore-link-flag");
        $BLUEJQuery("#" + idSeemoreLink).text("  "+seeMoreLinkLabel);
}

/**
 * Función que se encarga de mostrar todos items del menú
 * @param idMenu : id del ul del menú
 * @param idSeemoreLink : id del link de ver más propio del menú
 */
 function seeMoreMenuItems(idMenu, idSeemoreLink){
   $BLUEJQuery("#" + idMenu).find('li').each(function () {
     if(!$BLUEJQuery(this).hasClass("bel-menu-hide-item")){
       $BLUEJQuery(this).show(300);
     }
   });

        $BLUEJQuery("#" + idSeemoreLink).removeClass("bel-seemore-link-flag");
        $BLUEJQuery("#" + idSeemoreLink).removeClass("bel-icon-arrow-down-xxs");
        $BLUEJQuery("#" + idSeemoreLink).addClass("bel-icon-arrow-up-xxs");
        $BLUEJQuery("#" + idSeemoreLink).text("  "+seeLessLinkLabel);
}

 /**
  * Función que se encarga de crear el encabezado del menú según los parametros enviados
  * @param idMenu : id del ul del menú
  * @param iconClass : clase del icono que se quiere mostrar (se puede mantener en blanco si no se requiere icono)
  * @param line : clase de la línea divisoria (se puede mantener en blanco si no se requiere la línea)
  * @param auxContent : contenido auxiliar en formato html que se requiera en el encabezado
  */
function createMenuHead(menuId, iconClass, menuTitle, subtitle, line, auxContent){
	var menuHeader = '';
	menuHeader += '<div class="bel-menu_head '+line+'">';
		menuHeader += '<div class="bel-menu__head-title">';
			menuHeader += '<div class="bel-table-icon '+iconClass+'"><h2 class="bel-typography bel-typography-h2 bel-display-inline">'+' '+menuTitle+'</h2></div>';
			menuHeader += '<div><h5 class="bel-typography bel-typography-h5">'+' '+subtitle+'</h5></div>';
		menuHeader += '</div>';
		menuHeader += '<div class="bel-menu__head-aux">'+auxContent+'</div>';
	menuHeader += '</div>';
	$BLUEJQuery("#" + menuId).html(menuHeader);
}

/**
 * Función que se encarga de ocultar o mostrar el menú
 * @param idMenu : id del ul del menú
 * @param divId : id del contenedor que se quiere ocultar o mostrar
 */
function toggleMenu(menuId, divId){

	if ($BLUEJQuery("#"  + menuId).hasClass('bel-table-open-icon')) {
        $BLUEJQuery("#"  + menuId).removeClass('bel-table-open-icon');
        $BLUEJQuery("#"  + menuId).addClass('bel-table-close-icon');
        $BLUEJQuery("#"  + divId).toggle(500);
    }else{
        $BLUEJQuery("#"  + menuId).addClass('bel-table-open-icon');
        $BLUEJQuery("#"  + menuId).removeClass('bel-table-close-icon');
        $BLUEJQuery("#"  + divId).toggle(500);
    }
}


/**
 * Función que se encarga de ocultar o mostrar el contenido del cintillo
 * @param directMessageId : id del cintillo
 * @param idMenu : id del contenido que se oculta/muestra
  * @param arrowIconId : id del icono de flecha
 */
function toggleDirectMessage(directMessageId, menuId, arrowIconId){

	if ($BLUEJQuery("#"  + directMessageId).hasClass('directMessage-expanded')) {
		$BLUEJQuery("#"  + directMessageId).removeClass('directMessage-expanded');
		$BLUEJQuery("#"  + menuId).slideUp(300);
	}else{
		$BLUEJQuery("#"  + directMessageId).addClass('directMessage-expanded');
		$BLUEJQuery("#"  + menuId).slideDown(300);
	}

	if ($BLUEJQuery("#"  + arrowIconId).hasClass('bel-directMessage-arrowIcon-rotate')) {
		$BLUEJQuery("#"  + arrowIconId).removeClass('bel-directMessage-arrowIcon-rotate');
	}else{
		$BLUEJQuery("#"  + arrowIconId).addClass('bel-directMessage-arrowIcon-rotate');
	}

}

/**
 * Función que se encarga de mostrar la información del componente destacado por medio de un onclick
 * @param dotCntId : id del elemento
 * @param duration : tiempo que se mantiene visible la información del destacado
 * @param waitTime : tiempo de espera antes de hacer visible la información del destacado
 */
function showFeactureDotOnClick(dotCntId, duration, waitTime){
	/* Muestra y oculta la información del destacado */
	setTimeout(function(){$BLUEJQuery("#" + dotCntId).addClass('dot_sonar__auto')}, waitTime);
	setTimeout(function(){$BLUEJQuery("#" + dotCntId).removeClass('dot_sonar__auto')}, duration+waitTime);
}

/**
 * Función que se encarga de mostrar la información del componente de manera automatica
 * Función que se encarga de establecer la animación de ciclos en el componente destacado
 * @param dotCntId : id del elemento
 * @param duration : tiempo que se mantiene visible la información del destacado
 * @param waitTime : tiempo de espera antes de hacer visible la información del destacado
 * @param intervalTime : tiempo de espera antes de reiniciar la animación de ciclos
 * @param animationClass : clase que establece la cantidad de ciclos del componente
 */
function showFeactureDot(dotCntId, duration, waitTime, intervalTime, animationClass) {
	/* Muestra y oculta la información del destacado */
	setTimeout(function(){$BLUEJQuery("#" + dotCntId).addClass('dot_sonar__auto')}, waitTime);
	setTimeout(function(){$BLUEJQuery("#" + dotCntId).removeClass('dot_sonar__auto')}, duration+waitTime);

	$BLUEJQuery("#" + dotCntId).addClass(animationClass);

	var ciclesCount = 0;
	switch (animationClass) {
		case 'dot_animation__s':  ciclesCount = 4000;
			break;
		case 'dot_animation__m':  ciclesCount = 6000;
			break;
		case 'dot_animation__l':  ciclesCount = 10000;
			break;
		default:
			break;
	}

	var clear = false;
  var update = setInterval(function () {
		if(ciclesCount > 0){
			$BLUEJQuery("#" + dotCntId).removeClass(animationClass);
			setTimeout(function(){$BLUEJQuery("#" + dotCntId).addClass(animationClass)}, 500);
		}

		if(clear){clearInterval(update);}
	}, ciclesCount+intervalTime);
}

$BLUEJQuery.fn.createTextContiner = function (maxHeight) {
	$BLUEJQuery(this).find('*').attr('style', 'display:block');
	var elementId = this.attr('id');
	$BLUEJQuery( '#positionDiV' + elementId).remove();

	$BLUEJQuery(this).find('*').removeAttr('style');

	var data= this.html();
    var elementHeight=this.height();



	$BLUEJQuery(this).find('*').attr('style', 'display:none');
	 $BLUEJQuery("#"+elementId).append($BLUEJQuery('<div id="positionDiV'+elementId+'"class="bel-position-relative"> </div>'));
	    if(elementHeight> maxHeight && maxHeight > 200){
	    	$BLUEJQuery("#positionDiV"+elementId).append($BLUEJQuery('<div id="positionShadow'+elementId+'" class="bel-scroll-shadow-after "> </div>'));
	    	$BLUEJQuery("#positionShadow"+elementId).append($BLUEJQuery('<div id="scrollDiv'+elementId+'" class="bel-scroll-continer bel-scroll-auto bel-cursor_ns-esize">'+ data+'</div>').scroll(function() {
	    		if($BLUEJQuery(this).scrollTop()>5){
	    			$BLUEJQuery('#scrollDiv'+elementId).addClass('bel-scroll-shadow-before');
				}else{
					$BLUEJQuery('#scrollDiv'+elementId).removeClass('bel-scroll-shadow-before');
				}
	    		if($BLUEJQuery(this).scrollTop()+$BLUEJQuery(this).height() > $BLUEJQuery(this).prop('scrollHeight')-5){
    				$BLUEJQuery('#positionShadow'+elementId).removeClass('bel-scroll-shadow-after');
				}else{
					$BLUEJQuery('#positionShadow'+elementId).addClass('bel-scroll-shadow-after');
				}
	    	}));
    	    $BLUEJQuery("#"+elementId).find( '#scrollDiv'+elementId).attr('style', 'max-height: '+ maxHeight+'px');

    	      }
         else{
        	 $BLUEJQuery("#positionDiV"+elementId).append($BLUEJQuery('<div id="positionShadow'+elementId+'" class="bel-scroll-shadow-after"> </div>'));
        	 $BLUEJQuery("#positionShadow"+elementId).append($BLUEJQuery('<div id="scrollDiv'+elementId+'" class="bel-scroll-continer">'+ data+'</div>'));
         }
}


/* Funciones para el Paginador -------------------------------- Inicio */
;

(function() {
  "use strict";
  var pluginName = "bluePagination",
    paginationClass = 'bel-pagination',
    paginationListClass = 'bel-pagination-list',
    paginationItemClass = 'bel-pagination-item';

  function Pagination(element, options) {
    this.element = element;
    this.$element = $BLUEJQuery(element);
    this._defaults = {
      totalItems: 0,
      pageSize: 20,
      actualPage: 1,
      _totalPages: undefined,
      _beforePageClass: '',
      _afterPageClass: '',
      _beforePage: 0,
      _afterPage: 0,
      _items: [],
      callback: undefined,
      callbackThis: undefined,
      _listElement: '',
      _itemElement: '<li class="' + paginationItemClass + '"></li>',
      _dotItem: '<div class="bel-pagination-dots"><span></span><span></span><span></span></div>'
    };
    this.settings = $BLUEJQuery.extend({}, this._defaults, options);
    this._name = pluginName;
    this.init();
  }

  $BLUEJQuery.extend(Pagination.prototype, {
    init: function() {

      this.$element = $BLUEJQuery(this.element).addClass(this._name);
      this._makePaginationMarkup();
      this.$element.bind("destroyed", $BLUEJQuery.proxy(this.teardown, this));
      this.$element.children('.' + paginationListClass).children('.' + paginationItemClass).find('a').bind("click", $BLUEJQuery.proxy(this.goToPage, this));
      this.callback();

			this.$element.children().find('a').addClass('bel-pagination-item_not-active');
			this.$element.children().find('.active').children('a').removeClass('bel-pagination-item_not-active');
			this.$element.children().find('li').find('.bel-pagination-before').removeClass('bel-pagination-item_not-active');
			this.$element.children().find('li').find('.bel-pagination-after').removeClass('bel-pagination-item_not-active');

    },
    
    destroy: function() {
      this.$element.unbind("destroyed", this.teardown);
      clearPagination(this, paginationClass);
    },    
    _makePaginationMarkup: function() {
        this.$element.addClass(paginationClass);
        this.settings._listElement = $BLUEJQuery('<ul class="' + paginationListClass + '"></ul>');
        this.settings._totalPages = parseInt(Math.ceil(this.settings.totalItems / this.settings.pageSize));
        if (this.settings._totalPages == 1) {
          this.settings._items[0] = {
            page: 1,
            item: $BLUEJQuery(this.settings._itemElement).addClass('active').append($BLUEJQuery("<a data-page='1' href='javascript:void(0)'>1</a>"))
          };
          this.settings._listElement.append(this.settings._items.map(function(a) {
            return a.item;
          }));
          this.$element.html(this.settings._listElement);
        } else if (this.settings._totalPages > 1) {
          if (this.settings.actualPage == 1) {
            this.settings._beforePageClass = 'disabled';
          } else if (this.settings.actualPage == this.settings._totalPages) {
            this.settings._afterPageClass = 'disabled';
          }
  		makeLimitsLinksPagination(this.settings);
  	
          this._configureNavigation();

        }
      },
   _configureNavigation: function() {
    	makeLinksPagination(this.settings, false);
      this._setActivePage();
      this.settings._listElement.html(this.settings._items.map(function(a) {
        return a.item;
      }));
      this.$element.html(this.settings._listElement);
    },
  
    _refreshPagination: function() {
      if (this.settings._totalPages == 1) {
        this.settings._items = [];
        this.settings._items[0] = {
          page: 1,
          item: $BLUEJQuery(this.settings._itemElement).append($BLUEJQuery("<a data-page='1' class='bel-pagination-first' href='javascript:void(0)'>1</a>"))
        };
      } else if (this.settings._totalPages > 1) {
        
    	  makeLinksPagination(this.settings, true);
        
        this._refreshNavigation();
      }
      this._setActivePage();
      var items = this.settings._items.map(function(a) {
        return a.item;
      });
      this.$element.children('.' + paginationListClass).html(items);
      this.$element.children('.' + paginationListClass).children('.' + paginationItemClass).find('a').bind("click", $BLUEJQuery.proxy(this.goToPage, this));
			this.$element.children().find('a').addClass('bel-pagination-item_not-active');
      this.$element.children().find('.active').children('a').removeClass('bel-pagination-item_not-active');
      this.$element.children().find('li').find('.bel-pagination-before').removeClass('bel-pagination-item_not-active');
      this.$element.children().find('li').find('.bel-pagination-after').removeClass('bel-pagination-item_not-active');
},	
_refreshNavigation: function() {
    if (this.settings.actualPage == 1) {
      this.settings._beforePageClass = 'disabled';
      this.settings._afterPageClass = '';
    } else if (this.settings.actualPage == this.settings._totalPages) {
      this.settings._beforePageClass = '';
      this.settings._afterPageClass = 'disabled';
    } else {
      this.settings._beforePageClass = '';
      this.settings._afterPageClass = '';
    }
    makeLimitsLinksPagination(this.settings);
	 
  },
    _setActivePage: function() {
      if (this.settings.actualPage < 1) {
        this.settings.actualPage = 1;
      } else if (this.settings.actualPage > this.settings._totalPages) {
        this.settings.actualPage = this.settings._totalPages;
      }
      if (this.settings.actualPage == 1 && this.settings._totalPages == 1) {
        this.settings._items[0].item.addClass('active');
      } else {
        var activePage = this.settings.actualPage;
        var item = $BLUEJQuery.grep(this.settings._items, function(f, i) {
          if (f != undefined) {
            return (f.page == activePage && i > 0);
          }
        });
        item[0].item.addClass('active');
      }
    },
    goToPage: function(evt) {
      var page = $BLUEJQuery(evt.currentTarget).data('page');
      if (!$BLUEJQuery(evt.currentTarget).hasClass('disabled') && page != this.settings.actualPage) {
        this.actualPage(page);
        if (typeof this.settings.callback == 'function') {
					var initItem = (this.settings.pageSize * this.settings.actualPage)-this.settings.pageSize;
					var finishItem = initItem + this.settings.pageSize;
          this.settings.callback.call(this.settings.callbackThis, {
						initItem: initItem, finishItem: finishItem
          });
        }
      }
    },
    totalItems: function(variable) {
      if (variable != undefined && !isNaN(parseInt(variable))) {
        if (variable > 0) {
          this.settings.totalItems = variable;
          this.settings._totalPages = parseInt(Math.ceil(this.settings.totalItems / this.settings.pageSize));
          if (this.settings._totalPages < this.settings.actualPage) {
            this.settings.actualPage = this.settings._totalPages;
          }
          this._refreshPagination();
        }
      } else {
        return this.settings.totalItems;
      }
    },
    pageSize: function(variable) {
      if (variable != undefined && !isNaN(parseInt(variable))) {
        if (variable > 0) {
          this.settings.pageSize = variable;
          this.settings._totalPages = parseInt(Math.ceil(this.settings.totalItems / this.settings.pageSize));
          this._refreshPagination();
        }
      } else {
        return this.settings.pageSize;
      }
    },
    actualPage: function(variable) {
      if (variable != undefined && !isNaN(parseInt(variable))) {
        if (variable > 0) {
          this.settings.actualPage = variable;
          this._refreshPagination();
        }
      } else {
        return this.settings.actualPage;
      }
    },
    beforePage: function() {
      if ((this.settings.actualPage - 1) <= 1) {
        this.settings.actualPage = 1;
        this._refreshPagination();
      } else {
        this.settings.actualPage = this.settings.actualPage - 1;
        this._refreshPagination();
      }
    },
    afterPage: function() {
      if ((this.settings.actualPage + 1) >= this.settings._totalPages) {
        this.settings.actualPage = this.settings._totalPages;
        this._refreshPagination();
      } else {
        this.settings.actualPage = this.settings.actualPage + 1;
        this._refreshPagination();
      }
    },
    callback: function() {
      if (typeof this.settings.callback == 'function') {
				var initItem = (this.settings.pageSize * this.settings.actualPage)-this.settings.pageSize;
				var finishItem = initItem + this.settings.pageSize;
        this.settings.callback.call(this.settings.callbackThis, {
					initItem: initItem, finishItem: finishItem
        });
      }
    }
  });

  $BLUEJQuery.fn[pluginName] = function(options) {
    var args = arguments;

    if (options === undefined || typeof options === 'object') {
      return this.each(function() {
        if (!$BLUEJQuery.data(this, 'plugin_' + pluginName)) {
          $BLUEJQuery.data(this, 'plugin_' + pluginName, new Pagination(this, options));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      var returns;
      this.each(function() {
        var instance = $BLUEJQuery.data(this, 'plugin_' + pluginName);
        if (instance instanceof Pagination && typeof instance[options] === 'function') {
          returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }

        if (options === 'destroy') {
          $BLUEJQuery.data(this, 'plugin_' + pluginName, null);
        }
      });
      return returns !== undefined ? returns : this
    }
  };

})();

function makeLinksPagination(linkSettings, refresh){
	  if (linkSettings._totalPages <= 7) {
		  if (refresh){
			linkSettings._items = [];
		  }
	          for (var i = 2; i < (linkSettings._totalPages); i++) {
	            linkSettings._items[i] = {
	              page: i,
	              item: $BLUEJQuery(linkSettings._itemElement).append($BLUEJQuery("<a data-page='" + i + "' href='javascript:void(0)'>" + i + "</a>"))
	            };
	          }
	        } else {
	          if (linkSettings.actualPage < 4) {
	            linkSettings._items[2] = {
	              page: 2,
	              item: $BLUEJQuery(linkSettings._itemElement).append($BLUEJQuery("<a data-page='2' href='javascript:void(0)'>2</a>"))
	            };
	            linkSettings._items[3] = {
	              page: 3,
	              item: $BLUEJQuery(linkSettings._itemElement).append($BLUEJQuery("<a data-page='3' href='javascript:void(0)'>3</a>"))
	            };
	            linkSettings._items[4] = {
	              page: 4,
	              item: $BLUEJQuery(linkSettings._itemElement).append($BLUEJQuery("<a data-page='4' href='javascript:void(0)'>4</a>"))
	            };
	            linkSettings._items[5] = {
	              page: 5,
	              item: $BLUEJQuery(linkSettings._itemElement).append($BLUEJQuery("<a data-page='5' href='javascript:void(0)'>5</a>"))
	            };
	            linkSettings._items[6] = {
	              page: -1,
	              item: $BLUEJQuery(linkSettings._itemElement).append(linkSettings._dotItem)
	            };
	          } else if (linkSettings.actualPage >= 4 && linkSettings.actualPage <= (linkSettings._totalPages - 3)) {
	            linkSettings._items[2] = {
	              page: -1,
	              item: $BLUEJQuery(linkSettings._itemElement).append(linkSettings._dotItem)
	            };
	            linkSettings._items[3] = {
	              page: (linkSettings.actualPage - 1),
	              item: $BLUEJQuery(linkSettings._itemElement).append($BLUEJQuery("<a data-page='" + (linkSettings.actualPage - 1) + "' href='javascript:void(0)'>" + (linkSettings.actualPage - 1) + "</a>"))
	            };
	            linkSettings._items[4] = {
	              page: (linkSettings.actualPage),
	              item: $BLUEJQuery(linkSettings._itemElement).append($BLUEJQuery("<a data-page='" + (linkSettings.actualPage) + "' href='javascript:void(0)'>" + (linkSettings.actualPage) + "</a>"))
	            };
	            linkSettings._items[5] = {
	            page: (linkSettings.actualPage + 1),
	            item: $BLUEJQuery(linkSettings._itemElement).append($BLUEJQuery("<a data-page='" + (linkSettings.actualPage + 1) + "' href='javascript:void(0)'>" + (linkSettings.actualPage + 1) + "</a>"))
	            };
	            linkSettings._items[6] = {
	              page: -1,
	              item: $BLUEJQuery(linkSettings._itemElement).append(linkSettings._dotItem)
	            };
	          } else {     	  
	            linkSettings._items[2] = {
	              page: -1,
	              item: $BLUEJQuery(linkSettings._itemElement).append(linkSettings._dotItem)
	            };
	            linkSettings._items[3] = {
	              page: (linkSettings._totalPages - 4),
	              item: paginationNumberLink(linkSettings._itemElement, linkSettings._totalPages, 4)
	           };
	            linkSettings._items[4] = {
	              page: (linkSettings._totalPages - 3),
	              item: paginationNumberLink(linkSettings._itemElement, linkSettings._totalPages, 3)
	            };
	            linkSettings._items[5] = {
	              page: (linkSettings._totalPages - 2),
	              item: paginationNumberLink(linkSettings._itemElement,linkSettings._totalPages, 2)
	            };
	            linkSettings._items[6] = {
	              page: (linkSettings._totalPages - 1),
	              item: paginationNumberLink(linkSettings._itemElement, linkSettings._totalPages, 1)             
	            };      
	          }
	          }
    }
function makeLimitsLinksPagination(linkSettings){
	 
    linkSettings._beforePage = ((linkSettings.actualPage == 1) ? 1 : (linkSettings.actualPage - 1));
    linkSettings._afterPage = ((linkSettings.actualPage == linkSettings._totalPages) ? linkSettings._totalPages : (linkSettings.actualPage + 1));
    linkSettings._items[0] = {
      page: linkSettings._beforePage,
      item: $BLUEJQuery(linkSettings._itemElement).append($BLUEJQuery("<a data-page='" + linkSettings._beforePage + "' class='bel-pagination-before " + linkSettings._beforePageClass + "' href='javascript:void(0)'><span class='bel-icon bel-icon-back-xxs'></span></a>"))
    };
    linkSettings._items[1] = {
      page: 1,
      item: $BLUEJQuery(linkSettings._itemElement).append($BLUEJQuery("<a data-page='1' class='bel-pagination-first' href='javascript:void(0)'>1</a>"))
    };
    linkSettings._items[7] = {
      page: linkSettings._totalPages,
      item: $BLUEJQuery(linkSettings._itemElement).append($BLUEJQuery("<a data-page='" + linkSettings._totalPages + "' class='bel-pagination-last' href='javascript:void(0)'>" + linkSettings._totalPages + "</a>"))
    };
    linkSettings._items[8] = {
      page: linkSettings._afterPage,
      item: $BLUEJQuery(linkSettings._itemElement).append($BLUEJQuery("<a data-page='" + linkSettings._afterPage + "' class='bel-pagination-after " + linkSettings._afterPageClass + "' href='javascript:void(0)'><span class='bel-icon bel-icon-arrow-right-xxs'></span></a>"))
    };
	  
}

function paginationNumberLink(elemt ,pages, number){
	return	 $BLUEJQuery(elemt).append($BLUEJQuery("<a data-page='" + (pages - number) + "' href='javascript:void(0)'>" + (pages - number) + "</a>"));
}

/* Funciones para el Paginador -------------------------------- Fin */

function columsAline(thFlag,dataElement,aline,thCounter){
	if (thFlag && dataElement.tdWidth != undefined && dataElement.tdWidth[thCounter] != undefined) {
        $BLUEJQuery(this).css("width", dataElement.tdWidth[thCounter] + "%");
      }
      if (dataElement.tdAlign != undefined && dataElement.tdAlign[thCounter] != undefined) {
        $BLUEJQuery(this).css("text-align",aline);
      }
}

function bigIconTable(actualScope){
	var result;
	if (actualScope.settingsTable.bigIcon) {
		result = $BLUEJQuery("<div></div>").addClass("bel-table-icon__line-height-m");
	  } else {
		  result = $BLUEJQuery("<div></div>").addClass("bel-table-icon");
	  }
	return result;
}

function clearPagination(paginator, classToRemoves){
	paginator.$element.removeData();
      $BLUEJQuery.removeData(paginator.$element[0], paginator._name);
      paginator.$element.removeClass(paginator._name);
      paginator.$element.removeClass(classToRemoves);
      paginator.$element.html('');
      paginator.unbind();
      paginator.$element = null;
	
	}
function genericPlugin(pluginName,options,args,GenericFunction,elemt){
    
	 if (options === undefined || typeof options === 'object') {
	      // Creates a new plugin instance, for each selected element, and
	      // stores a reference withint the element's data
	      return elemt.each(function() {
	        if (!$BLUEJQuery.data(this, 'plugin_' + pluginName)) {
	          $BLUEJQuery.data(this, 'plugin_' + pluginName, new GenericFunction(this, options));
	        }
	      });
	    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
	      // Cache the method call
	      // to make it possible
	      // to return a startValue
	      var returns;
	      elemt.each(function() {	    	  
	        var instance = $BLUEJQuery.data(this, 'plugin_' + pluginName);
	        if (instance instanceof GenericFunction && typeof instance[options] === 'function') {
	          // Call the method of our plugin instance,
	          // and pass it the supplied arguments.
	          returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
	        }
	      });
	      return returns !== undefined ? returns : elemt
	    }
	  };

/**
* Funcion que pasa de estados a los botones, para permitir el uso de 
* loading, recibiendo el id del botton y el estado en el que debería estar.
*/

function loadingButton(buttonId, state){
 var button= $BLUEJQuery("#"+buttonId);
 
		if(undefined!=button){
		switch (state) {
		case "loading":
			button.addClass("btn-pressed");
			button.removeClass("btn-pressed__check");
			if(button.hasClass("bel-btn-primary")){
				button.addClass("loading-icon-active");
				button.removeClass("bel-btn-primary-active bel-btn__animation-text");
			}else{
				button.addClass("loading-icon-neutral");
				button.removeClass("bel-btn-default-active bel-btn-secondary-active bel-btn__animation-text");
			}
		break;
		case "checked":
			button.addClass("btn-pressed btn-pressed__check");
			button.removeClass("bel-btn-primary-active bel-btn-default-active " +
					"bel-btn-secondary-active loading-icon-active loading-icon-neutral bel-btn__animation-text");
		break;
		case "initial":
			
			if(button.hasClass("bel-btn-primary")){
				button.addClass("bel-btn-primary-active bel-btn__animation-text");
			}else if(button.hasClass("bel-btn-secondary")){
				button.addClass("bel-btn-secondary-active bel-btn__animation-text");
			}
			else{
				button.addClass("bel-btn-default-active bel-btn__animation-text");
			}
			button.removeClass("btn-pressed btn-pressed__check loading-icon-active loading-icon-neutral")
		break;
	 }
	}	
 
}

/*
* Funcion que reemplaza de una hilera que recibe por parametro los caracteres especiales
* por sus equivalentes sin tildes ni acentos, pasa todo a minusculas y quita espacios
* al inicio y final de la cadena.
*/

function normalizeText (str) {
	str = str.trim().toLowerCase();
	str = str.replace(/à|á|â|ã|å|ă|ä|ǎ/g, 'a');
	str = str.replace(/è|é|ê|ë|ē|ĕ|ė|ě/g, 'e');
	str = str.replace(/ì|í|î|ï|ĩ|ī|ĭ/g, 'i');
	str = str.replace(/ò|ó|ô|õ|ö|ǒ|ő/g, 'o');
	str = str.replace(/ù|ú|û|ũ|ū|ŭ|ů|ű|ü/g, 'u');
	str = str.replace(/ñ|ń|ņ|ň|ŉ/g, 'n');
	str = str.replace(/ç/g, 'c');	 
	return str; 
}


$BLUEJQuery.fn.blueTable =function (properties){

	this.removeClass();

	makeCaption(this, properties);

	makeHeader(this, properties);

	makeBody(this, properties);

	makefooter(this, properties);

	$BLUEJQuery(this).addClass("bel-table");
	
	makeScrollTable(this,properties);
	
	makeFixedColumns(this, properties);
	
	observerChangeTable(this);
		
};

function makeBody(element, properties){
	var trCounter = 0;
	var thCounter = 0;
	var maxItemsCollapsed;
	var thFlag = false;
	var extensibleLabel = 'Ver m&aacute;s';
	var collapseLabel = 'Ver menos';
	var actualRow;
	
	if(properties.extensible && properties.extensibleLabel != undefined){
		extensibleLabel = properties.extensibleLabel;
	}
	if(properties.extensible && properties.collapseLabel != undefined){
		collapseLabel = properties.collapseLabel;
	}
	if(properties.extensible && properties.maxItemsCollapsed != undefined){
		maxItemsCollapsed = properties.maxItemsCollapsed;
	}
	if($BLUEJQuery(element).has( "thead" ).length===0){
		thFlag=true;
	}
	$BLUEJQuery(element).find( 'tbody' ).each(function () {
		$BLUEJQuery(this).attr("id", "tbody" + $BLUEJQuery(element).attr("id") );
		actualRow = {"hasBranch":false, "subRowQuantity":0,"subRowClassName":"","subRowQuantityShown":0};
		
 		$BLUEJQuery(this).find( 'tr' ).each(function () {
			var dataLevel = $BLUEJQuery(this).attr('data-subrow-level');			
				var subrowFlag = false;
			//1. Si es un arbol diferente
			if((actualRow.subRowQuantity - actualRow.subRowQuantityShown) == 0){

				//1.2. Le actualizo los datos según la info del TR
				if($BLUEJQuery(this).attr( "data-subrowcount" ) != undefined){

					//1.1 Se inicializa el arbol nuevamente
					actualRow = {
						"hasBranch":true,
						"subRowQuantity": $BLUEJQuery(this).attr( "data-subrowcount" ),
						"subRowClassName": "subRowClass" +$BLUEJQuery(this).attr( "id" ),
						"setToggleIcon":true,
						"subRowQuantityShown":0
					}

				}

			}else{
				//2. es una rama del mismo arbol
				$BLUEJQuery(this).addClass(actualRow.subRowClassName);
				actualRow.subRowQuantityShown++;
			}

			thCounter = 0;
			$BLUEJQuery(this).addClass("bel-table_row bel-table_border-column");
			if(properties.rowHover ){
				$BLUEJQuery(this).addClass("bel-generic-hover");
			}
			$BLUEJQuery(this).find( 'td' ).each(function () {
                 if (dataLevel !=undefined){
                	 subrowFlag=true;
                 }
				tableSubRows(this, actualRow, subrowFlag, dataLevel);
				dataLevel= undefined;  
				if(thFlag && properties.tdWidth != undefined && properties.tdWidth[thCounter] != undefined ){
						$BLUEJQuery(this).css("width", properties.tdWidth[thCounter]+"%");	
				}
				if(properties.tdAlign != undefined && properties.tdAlign[thCounter] != undefined ){
					$BLUEJQuery(this).css("text-align", properties.tdAlign[thCounter]);
				}
				 $BLUEJQuery(this).addClass("bel-table_column_default");
				thCounter++;
			});
				if(subrowFlag){
				$BLUEJQuery(this).removeClass('bel-table_border-column');
			}

			if(subrowFlag==false){
				trCounter++;
			}
			if(properties.extensible && trCounter > maxItemsCollapsed){
				$BLUEJQuery(this).hide();

			}
			
			$BLUEJQuery(this).attr('statusDisplayRow', 'true');
		});
		if(properties.extensible && trCounter > maxItemsCollapsed && properties.itemPerPage==undefined ){
			$BLUEJQuery(this).append( "<tr maxItemsCollapsed='"+maxItemsCollapsed+"' statusDisplayRow='neutral' id='seTR"+$BLUEJQuery(element).attr("id")+"'><td colspan='"+thCounter+"' class='bel-extensive-menu_link'><a class='bel-typography bel-typography-link bel-icon-arrow-down-xxs' href='javascript:void(0)' onclick='showMoreItems(\""+$BLUEJQuery(element).attr("id")+"\")'>"+extensibleLabel+"</a></td></tr>");
			$BLUEJQuery(this).append( "<tr statusDisplayRow='neutral' id='heTR"+$BLUEJQuery(element).attr("id")+"' class='bel-hide-element'><td colspan='"+thCounter+"' class='bel-extensive-menu_link'><a class='bel-typography bel-typography-link bel-icon-arrow-up-xxs' href='javascript:void(0)' onkeypress='hideItems(\""+$BLUEJQuery(element).attr("id")+"\"\,"+ maxItemsCollapsed+"\,0)'; onclick='hideItems(\""+$BLUEJQuery(element).attr("id")+"\"\,"+ maxItemsCollapsed+"\,300)'>"+collapseLabel+"</a></td></tr>");
		}
		
		if (properties.itemPerPage != undefined){
			$BLUEJQuery(this).append( "<tr statusDisplayRow='neutral' id='paginationTR"+$BLUEJQuery(element).attr("id")+"'><td colspan='"+thCounter+"'><div class='bel-position-center bel-space-top-m'><nav id='pagination"+ $BLUEJQuery(element).attr("id")+ "'></nav></div></td></tr>");
			$BLUEJQuery("#pagination"+$BLUEJQuery(element).attr("id")).bluePagination({
	         totalItems: $BLUEJQuery("#"+$BLUEJQuery(element).attr("id")+" >tbody >tr[statusDisplayRow!='neutral']:not([data-subrow-level])").length,
	         pageSize: properties.itemPerPage,
	         actualPage: 1,
	         callback: makePagination
	       });
		}
	});

	if(properties.extensible && maxItemsCollapsed == trCounter ){
		$BLUEJQuery("#seTR"+$BLUEJQuery(element).attr("id")).remove();
		$BLUEJQuery("#heTR"+$BLUEJQuery(element).attr("id")).remove();
	}
//funcion privada para paginar la tabla.
	function makePagination(obj){	
		var countTr=0;
		$BLUEJQuery("#"+$BLUEJQuery(element).attr("id")+" >tbody>tr[statusDisplayRow='true']").each(function (i) {
			if($BLUEJQuery(this).attr('data-subrow-level')==undefined && i!=0){
				countTr++;
			}
			if(countTr>=obj.initItem && countTr<obj.finishItem){
				$BLUEJQuery(this).show(0);			
			 }else {
				$BLUEJQuery(this).hide(0);
			 } 
		 });
		//En caso de que tenga scroll remueve clases y mueve el scroll a la izquierda
		removeFixedColumns($BLUEJQuery(element).attr("id"));
		$BLUEJQuery("#divScroll"+$BLUEJQuery(element).attr("id")).animate({scrollLeft: 0}, 300);
	}
}


function tableSubRows(elemt, actualRow, subrowFlag, dataLevel){	
	if (dataLevel!= undefined){
		if (dataLevel==='1' ){
			 $BLUEJQuery(elemt).prepend( "<span class='bel-icon-subcategory-before-m bel-position-subrow-icon_level-1 color-icon-table bel-position-subrow-icon'/>");
			 $BLUEJQuery(elemt).addClass("bel-table-subrow bel-table-subrow_level-1");	
		}else{
			if(dataLevel==='2' ){
				$BLUEJQuery(elemt).prepend( "<span class='bel-icon-subcategory-before-m bel-position-subrow-icon_level-2 color-icon-table bel-position-subrow-icon'/>");
				$BLUEJQuery(elemt).addClass("bel-table-subrow bel-table-subrow_level-2");		  	 
			   }else{
				   $BLUEJQuery(elemt).prepend( "<span class='bel-icon-subcategory-before-m bel-position-subrow-icon_level-3 color-icon-table bel-position-subrow-icon'/>");
		  		   $BLUEJQuery(elemt).addClass("bel-table-subrow bel-table-subrow_level-3");		  		   
			   }
		}
	}else{
		if(subrowFlag){
			$BLUEJQuery(elemt).addClass("bel-table-subrow");
		}
	}
	//si es el primer td del tr padre entonces pongo el icono de toggle
	if(actualRow.setToggleIcon){
	$BLUEJQuery(elemt).attr("style", "padding-left: 38px;")
	$BLUEJQuery(elemt).addClass("bel-icon-subaccount-open");
	$BLUEJQuery(elemt).addClass("bel-cursor-pointer");
	$BLUEJQuery(elemt).click(function() {
		toggleSubRows($BLUEJQuery(elemt).parent().attr( "id" ));
		openOrCloseArrow($BLUEJQuery(elemt));
	});
	actualRow.setToggleIcon = false;
	}
}

function toggleSubRows(elementId){
	var elements = $BLUEJQuery('.subRowClass'+elementId);
	if(elements.is(":visible")){
		elements.attr("style", "display : none !important;");
	}else{
		elements.toggle();
	}
}

function showMoreItems(tableId){
var indexRowParent=-1;
$BLUEJQuery("#"+tableId+" >tbody>tr[statusDisplayRow='true']").each(function (i) {
		if($BLUEJQuery(this).attr('data-subrowcount')!=undefined){
			indexRowParent=i;
			  $BLUEJQuery("#"+tableId+" >tbody>tr[statusDisplayRow='true']:eq('"+indexRowParent+"') td:eq(0).bel-icon-subaccount-open").removeClass('bel-icon-subaccount-open').addClass('bel-icon-subaccount-close');
		}
		if($BLUEJQuery(this).attr('data-subrow-level')!=undefined && indexRowParent>-1){
			  $BLUEJQuery("#"+tableId+" >tbody>tr[statusDisplayRow='true']:eq('"+indexRowParent+"') td:eq(0).bel-icon-subaccount-close").removeClass('bel-icon-subaccount-close').addClass('bel-icon-subaccount-open');
			indexRowParent=-1 
		}
		$BLUEJQuery(this).show(300);
	 });		    
	 $BLUEJQuery("#seTR"+tableId).hide();
	 $BLUEJQuery("#heTR"+tableId).show();
}


function hideItems(tableId,itemsToShow,time){
	var countRow=0;
	var notSubRow;
   $BLUEJQuery("#"+tableId+" >tbody >tr[statusDisplayRow='true']").each(function (i) {
	  notSubRow = false;
		if($BLUEJQuery(this).attr('data-subrow-level')==undefined && i!=0){
			notSubRow=true;
			countRow++;
		}
		if(itemsToShow>countRow){
			if($BLUEJQuery(this).css('display')!='none' && notSubRow!=false){
			 $BLUEJQuery(this).show(300);
			}
		}else {
			if($BLUEJQuery(this).attr('data-subrowcount')!=undefined){
				$BLUEJQuery(this).find('.bel-icon-subaccount-open').addClass("bel-icon-subaccount-close").removeClass( "bel-icon-subaccount-open" );
			}
			 $BLUEJQuery(this).hide(time);		 
		}
	});
	 $BLUEJQuery("#"+tableId+" >tbody >tr[statusDisplayRow='false']").each(function (i) {
		 $BLUEJQuery(this).hide(time);
	 });
    $BLUEJQuery("#heTR"+tableId).hide();
	$BLUEJQuery("#seTR"+tableId).show();
	$BLUEJQuery("#seTR"+tableId).find('.bel-icon-subaccount-open').addClass("bel-icon-subaccount-close").removeClass( "bel-icon-subaccount-open" );
}

function makefooter(element, properties){
	var thCounter;
	$BLUEJQuery(element).find( 'tfoot' ).each(function () {
		this.id = "tfoot" + $BLUEJQuery(element).attr("id");
		$BLUEJQuery(this).addClass("bel-table_tfoot");
		$BLUEJQuery(this).find('tr').each(function () {
			thCounter = 0;
			$BLUEJQuery(this).find( 'td' ).each(function () {
				if(properties.tdFooterWidth != undefined && properties.tdFooterWidth[thCounter] != undefined ){
					$BLUEJQuery(this).css("width", properties.tdFooterWidth[thCounter]+"%");
				}
				if(properties.tfAlign != undefined && properties.tfAlign[thCounter] != undefined ){
					$BLUEJQuery(this).css("text-align", properties.tfAlign[thCounter]);
				}
				thCounter++;
			});
		});
	});
}

function makeHeader(element, properties){
	var thCounter; 
	$BLUEJQuery(element).find( 'thead' ).each(function () {
		$BLUEJQuery(this).attr("id", "thead" + $BLUEJQuery(element).attr('id'));
		$BLUEJQuery(this).addClass("bel-table_thead");
		$BLUEJQuery(this).find('tr').each(function () {
			thCounter = 0;
			$BLUEJQuery(this).find( 'th' ).each(function () {
				$BLUEJQuery(this).addClass("bel-typography-h4");
				if(properties.tdWidth != undefined && properties.tdWidth[thCounter] != undefined ){				
						$BLUEJQuery(this).css("width", properties.tdWidth[thCounter]+"%");					
				}
				if(properties.tdAlign != undefined && properties.tdAlign[thCounter] != undefined ){
					$BLUEJQuery(this).css("text-align", properties.thAlign[thCounter]);
				}
				thCounter++;
			});
		});
	});
}

function makeCaption(element, properties){
    var iconDiv = null;
    var headerLeftGrupDiv = null;
    var headerRigthtGrupDiv = null;
    var headerRigthtBtnCont = null;
    var idTable= element.attr('id');
    var caption; 
    $BLUEJQuery(element).find( 'caption' ).each(function () {
    	headerLeftGrupDiv =  $BLUEJQuery("<div></div>").addClass("bel-table_caption-group");
        this.id = "caption" + $BLUEJQuery(element).attr("id");
        caption = this;
        //revisa si tiene iconos para crear
        $BLUEJQuery(this).children( 'i' ).each(function () {
            if(properties.bigIcon){
                iconDiv = $BLUEJQuery("<div></div>").addClass("bel-table-icon__line-height-m");
            }else{
                iconDiv = $BLUEJQuery("<div></div>").addClass("bel-table-icon");
            }
            $BLUEJQuery(iconDiv).addClass($BLUEJQuery(this).attr('class'));
            $BLUEJQuery(this).remove();
            $BLUEJQuery(headerLeftGrupDiv).append( $BLUEJQuery(iconDiv));
        });
        $BLUEJQuery(this).children( 'h2' ).each(function () {
            $BLUEJQuery(this).addClass("bel-typography bel-typography-h2");
            $BLUEJQuery(headerLeftGrupDiv).append( $BLUEJQuery(this));

            $BLUEJQuery(this).children( 'span' ).each(function () {
                $BLUEJQuery(this).addClass("bel-space-top-xs bel-typography bel-typography-h5");
                $BLUEJQuery(headerLeftGrupDiv).append( $BLUEJQuery(this));
            });
        });

        $BLUEJQuery(this).addClass("bel-table_caption");

        //agrega el grupo de elementos al encabezado
        $BLUEJQuery(this).append( $BLUEJQuery(headerLeftGrupDiv));
		var inputSearchElement=$BLUEJQuery(this).find("input[data-items-type-label]");
		if(inputSearchElement.length){
			headerLeftGrupDiv.addClass('bel-padding-top-s bel-vertical-align-top');
            headerRigthtGrupDiv = makeSearch(inputSearchElement, idTable);
            inputSearchElement.remove();
			properties.toggleable=false;
		}
        if(properties.toggleable){
            $BLUEJQuery(this).addClass("bel-table-open-icon");
            $BLUEJQuery(this).children( 'button' ).each(function () {
                $BLUEJQuery(this).remove();
            });
            $BLUEJQuery(caption).on('click', function(){
                $BLUEJQuery.each($BLUEJQuery(element).children().toArray(), function(i, child){
                    if(child != caption){
                        $BLUEJQuery(child).toggle(500);
                    }
                })
                if ($BLUEJQuery(caption).hasClass('bel-table-open-icon')) {
                    $BLUEJQuery(caption).removeClass('bel-table-open-icon');
                    $BLUEJQuery(caption).addClass('bel-table-close-icon');
                }else{
                    $BLUEJQuery(caption).addClass('bel-table-open-icon');
                    $BLUEJQuery(caption).removeClass('bel-table-close-icon');
                }
            });
        }else{
            $BLUEJQuery(this).children( 'button' ).each(function () {
                headerRigthtGrupDiv = $BLUEJQuery("<div></div>").addClass("bel-table_caption-group bel-table_caption-button");
                headerRigthtBtnCont = $BLUEJQuery("<div></div>").addClass("bel-width-reset bel-float-right");
                $BLUEJQuery(this).addClass("bel-btn bel-btn-secondary bel-btn-secondary-active bel-nowrap");

                //si tiene un tootip
                if($BLUEJQuery(this).attr("title") != undefined && $BLUEJQuery(this).attr("title") != null && $BLUEJQuery(this).attr("title") != ''){
                    $BLUEJQuery(this).addClass("bel-tooltip-generic");
                }

                $BLUEJQuery(headerRigthtGrupDiv).append(headerRigthtBtnCont);
                $BLUEJQuery(headerRigthtBtnCont).append($BLUEJQuery(this));

                //si tiene un tootip
                if($BLUEJQuery(this).attr("title") != undefined && $BLUEJQuery(this).attr("title") != null && $BLUEJQuery(this).attr("title") != ''){
                    $BLUEJQuery(headerRigthtBtnCont).append('<span class="bel-tooltip-generic-text bel-tooltip-generic-text__down bel-tooltip-generic-text__m">'+$BLUEJQuery(this).attr("title")+'</span>');
                    $BLUEJQuery(this).removeAttr("title");
                 // Se reemplaza la clase para quitar el posicionamiento
                    if($BLUEJQuery(this).parent().hasClass("bel-table_caption")){
                    	$BLUEJQuery(this).parent().removeClass("bel-table_caption");
                        $BLUEJQuery(this).parent().addClass("bel-table_caption-btn");
                    }                  
                }
            });
            $BLUEJQuery(this).children( 'select').each(function () {
            	headerRigthtGrupDiv = $BLUEJQuery("<div></div>").addClass("bel-table_caption-group bel-table_caption-select bel-position-right");
                $BLUEJQuery(headerRigthtGrupDiv).append( $BLUEJQuery(this));
            });
             
        }  
         if(null != headerRigthtGrupDiv){
             $BLUEJQuery(this).append( $BLUEJQuery(headerRigthtGrupDiv));
         }       
    });
}

function makeSearch(element,idTable) {	
	var container= $BLUEJQuery("<div class='bel-table_caption-group bel-position-right'></div>")
	var dataSearchContainer = $BLUEJQuery('<div class="bel-col-offset-4 bel-col-8 bel-position-relative" style="padding:0;">' +
			'<span class="bel-icon-search-xs bel-search-icon-position"></span>' + '</div>');
	var dataSearchInput = $BLUEJQuery('<input id="search_' + idTable + '" class="bel-input-search bel-search__input" type="text" name="" value="" placeholder= "'+ $BLUEJQuery(element).attr('placeholder') +'" onkeyup = "filterTableSearch(this, \''+idTable+'\');">');    
			dataSearchContainer.append(dataSearchInput);
	var  dataSearchResults = $BLUEJQuery('<div class="bel-col-offset-4 bel-col-8" style="padding:0;">' +
		   '<p id="searchResults' + idTable + '" data-items-type-label="'+ $BLUEJQuery(element).attr('data-items-type-label') + '" class="bel-padding-top-xs bel-typography bel-typography-h5"> ' + $BLUEJQuery("#"+idTable+" >tbody >tr").length+ ' ' + $BLUEJQuery(element).attr('data-items-type-label') + '</p></div>');  
	container.append(dataSearchContainer);
    container.append(dataSearchResults);
  return container;
}

function filterSubRowSearch(idTable,indexRowParent, indexLastChild, lastLevelChild){	
		$BLUEJQuery("#"+idTable+" tr[statusDisplayRow!='neutral']").each(function (i) {
			 if(i>=indexRowParent && i<indexLastChild && $BLUEJQuery(this).attr('data-subrow-level')!=lastLevelChild){
				 $BLUEJQuery(this).attr('statusDisplayRow', 'true');
				 $BLUEJQuery(this).show(0);		
			 }	
		 });
	}

function manageTableResult(idTable,searchValue){
	var quantityFind, quantityToShow;
	var idTableName=idTable+" >tbody";    
	var searchTextLabel;
	var quantityFindRows;	 
	
	displayMoreSubRows(idTable);
	quantityFind = $BLUEJQuery("#"+idTable+" >tbody >tr[statusDisplayRow!='neutral']:visible ").length;		
	quantityFindRows=$BLUEJQuery("#"+idTable+" >tbody >tr[statusDisplayRow='true']:not([data-subrow-level])").length;
	
	if($BLUEJQuery("#footerFixed"+idTable+" >tr[id='heTR"+idTable+"']").length>0){
		idTableName="footerFixed"+idTable;
	}
	$BLUEJQuery("#"+idTableName+" >tr[id='heTR"+idTable+"'] >td >a").keypress();		             
	quantityToShow= $BLUEJQuery("#"+idTableName+" >tr[id=seTR"+idTable+"]").attr('maxItemsCollapsed');
	
	if(quantityToShow>=quantityFindRows){	            	 
		$BLUEJQuery("#"+idTableName+" >tr[id=seTR"+idTable+"]").hide();
		$BLUEJQuery("#"+idTableName+" >tr[id=heTR"+idTable+"]").hide();
	}else{
	  	$BLUEJQuery("#"+idTableName+" >tr[id=seTR"+idTable+"]").show();		           
	}
	
	searchTextLabel = $BLUEJQuery("#"+idTable+" >tbody >tr[statusDisplayRow!='neutral']").length+" "+$BLUEJQuery("#searchResults"+idTable).attr('data-items-type-label');
	if (searchValue===""){
	    $BLUEJQuery("#"+idTableName+">tr[id=seTR"+idTable+"]").show();
	    $BLUEJQuery("#searchResults"+idTable).text(searchTextLabel);
			
	}else{
		$BLUEJQuery("#searchResults"+idTable).text(quantityFind+" / "+searchTextLabel);		
	}
	$BLUEJQuery("#pagination"+idTable).bluePagination('totalItems', quantityFindRows).bluePagination('actualPage', 1).bluePagination('callback');
	if(quantityFind==0){
		$BLUEJQuery("#pagination"+idTable).hide();
	}else{
		$BLUEJQuery("#pagination"+idTable).show();
	}
}

/**
 * Función que se encarga del ver más y ver menos en las tablas con subrows y 
 * llama a la función filterSubRowSearch que muestra las filas correspondientes
 * @param idTable : Id de la tabla 
 */	
function displayMoreSubRows(idTable){
	var indexRowParent = -1;
	if ($BLUEJQuery("#"+idTable+" >tbody >tr[data-subrowcount]").length){
		$BLUEJQuery("#"+idTable+" tr[statusDisplayRow!='neutral']").each(function (i) {
			if(undefined!= $BLUEJQuery(this).attr('data-subrowcount')){
			indexRowParent=i;
				if($BLUEJQuery(this).is(":visible")){
				$BLUEJQuery("#"+idTable+" tr[statusDisplayRow!='neutral']:eq('"+indexRowParent+"') td:eq(0).bel-icon-subaccount-open").removeClass('bel-icon-subaccount-open').addClass('bel-icon-subaccount-close');
				}
			}
			else if($BLUEJQuery(this).is(":visible") && $BLUEJQuery(this).attr('data-subrow-level')!=undefined && indexRowParent>-1){
				filterSubRowSearch(idTable,indexRowParent,i,$BLUEJQuery(this).attr('data-subrow-level'));
				$BLUEJQuery("#"+idTable+" tr[statusDisplayRow!='neutral']:eq('"+indexRowParent+"') td:eq(0).bel-icon-subaccount-close").removeClass('bel-icon-subaccount-close').addClass('bel-icon-subaccount-open');
				indexRowParent=-1;
			}
		 });
	}
}

function filterTableSearch(element, idTable){
	  var searchValue = normalizeText($BLUEJQuery(element).val());
	  $BLUEJQuery("#"+idTable+" >tbody>tr[statusDisplayRow!='neutral']").filter(function() {
		  if ((normalizeText($BLUEJQuery(this).text()).indexOf(searchValue))>-1){
			  $BLUEJQuery(this).attr('statusDisplayRow', 'true');
			  $BLUEJQuery(this).toggle(true);
		  }else{
			  $BLUEJQuery(this).attr('statusDisplayRow','false');
			  $BLUEJQuery(this).toggle(false);
		  }	             	  	
	   }); 
	  manageTableResult(idTable,searchValue);
	//En caso de que tenga scroll remueve clases y mueve el scroll a la izquierda
	  removeFixedColumns(idTable);
	  $BLUEJQuery("#divScroll"+idTable).animate({scrollLeft: 0}, 300);
}


function hasNotSubrows(element){
if ($BLUEJQuery("#"+element+" >tbody >tr[data-subrowcount]").length>0){
	return false;
	}
   return true;
}

/**
 * Función que evalua si es navegador es Internet Explorer para llamar a la  función
 * que se encarga de hacer las celdas de la columnas fixed
 * @param element : Tabla a insertar las clases a las columnas
 * @param properties : Propiedades de la tabla
 */
 
function makeFixedColumns(element, properties) {
	if(properties.tableScrollWidth && properties.tableScrollWidth != undefined){
		var navInfo = getBrowserInfo();
		if (navInfo.indexOf('IE') == 0){
			if(element.children("thead").children("tr").children("th").length!=undefined){
				makeCellColumFixedIE(element, properties, 'thead', 'th');
			}

			makeCellColumFixedIE(element, properties, 'tbody', 'td'); 
			validateScrollTableIE($BLUEJQuery(element).attr("id"), properties.numberFixedColumns);
		}else{
		 //Función para otros navegadores diferente a IE
	      makeCellColumFixed($BLUEJQuery(element).attr("id"), properties);
	      validateScrollTable($BLUEJQuery(element).attr("id"), properties);     
		}
		if(navInfo.indexOf('Chrome') != 0){
		element.css({'border-collapse': 'separate', 'border-spacing': 0});	  
		}
		element.css({'min-width': (properties.tableScrollWidth), 'table-layout': 'fixed'});	
	}
}


/**
 * Función que se encarga de insertar las clases para que las columnas sean fixed
 * @param idTable : Id de la tabla a insertar las clases a las columnas
 * @param properties : Propiedades de la tabla
 */
function makeCellColumFixed(idTable, properties) {
	if(properties.numberFixedColumns && properties.numberFixedColumns!= undefined){
	var cellWidth = 0;
	$BLUEJQuery("#" +idTable+ " tr").each(function(item) {
	        var beforeWidth = 0;
	        $BLUEJQuery(this).children('th').each(function(item) {
	        	cellWidth = (properties.tdWidth[item] * properties.tableScrollWidth)/100;
	          if (item < properties.numberFixedColumns) {
	            if (item > 0) {
	              $BLUEJQuery(this).css('left', beforeWidth);
	              beforeWidth += $BLUEJQuery(this).outerWidth();
	            } else {
	             beforeWidth = $BLUEJQuery(this).outerWidth();
	            }
	            $BLUEJQuery(this).addClass('bel-table_column__sticky');
	          }
	          if($BLUEJQuery(this).attr( "statusDisplayRow" )!='neutral'){
        		  $BLUEJQuery(this).css({'width': cellWidth,'max-width': cellWidth});
			}
	        });
	        $BLUEJQuery(this).children('td').each(function(item) {
	        	cellWidth = (properties.tdWidth[item] * properties.tableScrollWidth)/100;
	          if (item < properties.numberFixedColumns) {
	            if (item > 0) {
	              $BLUEJQuery(this).css('left', beforeWidth);
	              beforeWidth += $BLUEJQuery(this).outerWidth();
	            } else {
	              beforeWidth = $BLUEJQuery(this).outerWidth();
	            }
	            $BLUEJQuery(this).addClass('bel-table_column__sticky');
	          }
	          if($BLUEJQuery(this).attr( "statusDisplayRow" )!='neutral'){
        		  $BLUEJQuery(this).css({'width': cellWidth,'max-width':cellWidth});
        		  $BLUEJQuery(this).addClass('bel-table-td__fixed');
			}
	        });
	      });
	 }
}

/**
 * Función que se encarga de insertar la tabla dentro de un div para que esta sea scrollable y
 * de mover el caption, footer, ver más  y paginador para que solo los datos sean scrollables. 
 * @param element : Tabla a insertar las columnas fixed
 * @param properties: Propiedades de la tabla 
 */
 function makeScrollTable(element, properties) {
	if(properties.tableScrollWidth && properties.tableScrollWidth != undefined){
		var widthParent =  $BLUEJQuery(element).parent().width();

		  var idTable=$BLUEJQuery(element).attr("id");	
		  var scrollDivContainer = $BLUEJQuery('<div class="bel-position-relative"></div>');
		   
	      var scrollDiv = $BLUEJQuery('<div class="bel-padding-bottom-s" id="divScroll' + idTable +'" style="max-width: ' + widthParent + 'px; overflow-x: scroll; display: block;"></div>');
	      scrollDivContainer.append(scrollDiv);
	      $BLUEJQuery("#" + idTable).before(scrollDivContainer);
	      
	      scrollDiv.append($BLUEJQuery("#"+idTable));
	      
	            		
	      var caption = $BLUEJQuery("#caption"+idTable);
	      var captionFixed = $BLUEJQuery('<table class="bel-table" id="captionFixed'+ idTable+'"></table>');
	      scrollDiv.before(captionFixed);
	      captionFixed.append(caption);
	      
	      var tfootFixed = $BLUEJQuery('<table class="bel-table" id="footerFixed'+ idTable+'"></table>');
	      
	      var tfoot = $BLUEJQuery("#tfoot"+idTable);
	      var pagination = $BLUEJQuery("#paginationTR" + idTable);
	      var extensiveTR = $BLUEJQuery("#seTR"+idTable);
	      var extensiveHE = $BLUEJQuery("#heTR"+idTable);

	      scrollDiv.after(tfootFixed);
	      
	      tfootFixed.append(pagination);
	      tfootFixed.append(tfoot);	
	      tfootFixed.append(extensiveTR);
	      tfootFixed.append(extensiveHE);
    }
 } 


 /**
 * Función que se encarga de validar si el scroll se ha movido para saber si debe
 * agregar las clases fixed o por el contrario debe de quitarlas.
 * @param idTable : Id de la tabla a insertar las columnas fixed
 * @param numberFixedColumns : Intervalos de las columnas que serán fixed
 */	 
function validateScrollTable(idTable, properties){
	if(properties.numberFixedColumns && properties.numberFixedColumns != undefined){
	 	$BLUEJQuery("#divScroll"+idTable).scroll(function() {
	 		if (0 < $BLUEJQuery("#divScroll"+idTable).scrollLeft()) {
	 			if(!$BLUEJQuery("#"+idTable+" tbody tr td:nth-child("+properties.numberFixedColumns+")").hasClass('bel-column__last-fixed')){
	 				$BLUEJQuery("#"+idTable+" tbody tr td:nth-child("+properties.numberFixedColumns+")").addClass('bel-column__last-fixed');
					$BLUEJQuery("#"+idTable+" thead tr th:nth-child("+properties.numberFixedColumns+")").addClass('bel-column__last-fixed');
	 				makeCellColumFixed(idTable, properties);
	 			}
	 		}else{
	 	  		removeFixedColumns(idTable); 
	 		}
	 	});
	}
 }

  /**
  * Función que elimina la clase que le da el sombreado a la última columna fixed  
  * @param idTable : Id de la tabla a eliminar las clase  
  */
function removeFixedColumns(idTable) {
	  if($BLUEJQuery("#divScroll"+idTable).length){
	  	$BLUEJQuery("#" +idTable+ " tr").each(function(item) {
	  		$BLUEJQuery(this).children('tbody td').each(function(item) {
	  			if($BLUEJQuery(this).hasClass('bel-column__last-fixed')){
	  				$BLUEJQuery(this).removeClass('bel-column__last-fixed');
	  			}
	  		});
	  		
	  		$BLUEJQuery(this).children('th').each(function(item) {
	  			if($BLUEJQuery(this).hasClass('bel-column__last-fixed')){
	  				$BLUEJQuery(this).removeClass('bel-column__last-fixed');
	  			}
	  		});
	  	});
	  }
}


/* Inicio ----------- Funciones para el soporte de columnas fixed en Internet Explorer ----------- Inicio */

/**
 * Función soportada en Internet Explorer que se encarga de hacer las celdas fixed.
 * @param element : Tabla a insertar las clases a las columnas
 * @param properties : Propiedades de la tabla
 * @param elementChildren Hijo de la tabla -  thead o tbody
 * @param typeCell tipo de celda - th o td
 */

function makeCellColumFixedIE(element, properties, elementChildren, typeCell){
	if(properties.numberFixedColumns && properties.numberFixedColumns!= undefined){
	element.children(elementChildren).children("tr").each(function(itemp) {	
		var leftPosition = 0
		var cellWidth = 0;
		var cellPadding = 0;
		$BLUEJQuery(this).find(typeCell).each(function(item) {	
			if(item > 0){
				leftPosition+=((properties.tdWidth[item-1]* properties.tableScrollWidth)/100);
			}          
			if (item < properties.numberFixedColumns) {	
				cellPadding = $BLUEJQuery(this).innerWidth() - $BLUEJQuery(this).width();
				cellWidth = ((properties.tdWidth[item] * properties.tableScrollWidth)/100)-cellPadding;
				if($BLUEJQuery(this).attr( "statusDisplayRow" )!='neutral'){
					$BLUEJQuery(this).addClass('bel-table_column__fixed-ie');
					if(typeCell=='th'){
						$BLUEJQuery(this).css({'width': cellWidth,'max-width': cellWidth,'left': leftPosition, 'display': 'list-item'}); 
					}else{
						$BLUEJQuery(this).css({'width': cellWidth,'max-width': cellWidth,'left': leftPosition});
						$BLUEJQuery(this).addClass('bel-table-td__fixed');
					}
				}			
			}else{
				$BLUEJQuery(this).css({'overflow':'hidden', 'left': leftPosition});
				if(typeCell=='td'){
					$BLUEJQuery(this).addClass('bel-table-td__fixed');
				}
			}
		});

	});
  }
}

/**
* Función soportada por Internet Explorer que se encarga de validar si el scroll
*  se ha movido para saber si debe agregar las clases fixed o por el contrario debe de quitarlas.
* @param idTable : Id de la tabla a insertar las columnas fixed
* @param numberFixedColumns : Intervalos de las columnas que serán fixed
*/	 
 function validateScrollTableIE(idTable, numberFixedColumns){
	if(numberFixedColumns){
		$BLUEJQuery("#divScroll"+idTable).scroll(function() {
			if (0 < $BLUEJQuery("#divScroll"+idTable).scrollLeft()) {
				if(!$BLUEJQuery("#"+idTable+" tbody tr td:nth-child("+numberFixedColumns+")").hasClass('bel-column__last-fixed')){
					$BLUEJQuery("#"+idTable+" tbody tr td:nth-child("+numberFixedColumns+")").addClass('bel-column__last-fixed');
					$BLUEJQuery("#"+idTable+" thead tr th:nth-child("+numberFixedColumns+")").addClass('bel-column__last-fixed');
				}
			}else{
		  		removeFixedColumns(idTable); 
			}		
		});
	} 
	}
 
 /* Fin ----------- Funciones para el soporte de columnas fixed en Internet Explorer ----------- Fin */
 
 
 /**
 * Función que se encarga de observar si se agregaron o eliminaron de la tabla filas y caso
 * de que sea verdadero, actualiza el contador de filas en el buscador 
 * @param element : Tabla que tendrá el observer
 */	 
 function observerChangeTable(element){
	if($BLUEJQuery("#searchResults" + $BLUEJQuery(element).attr("id")).length > 0){
		var targetNode =  $BLUEJQuery("#tbody" + $BLUEJQuery(element).attr("id"))[0];
		// Opciones para el observador (cuales mutaciones observar)
		var config = { attributes: false, childList: true, subtree: true };
		// Callback  de la funcion para ejecutarse cuando las mutaciones son observadas
		var callback = function(mutationsList, observer) {
			$BLUEJQuery.each(mutationsList, function(mutation) {
				if (isAddRow(mutationsList[mutation])|| isDeleteRow(mutationsList[mutation])) {
					filterTableSearch($BLUEJQuery("#search_" + $BLUEJQuery(element).attr("id")), $BLUEJQuery(element).attr("id"));			
				}
			});
		};
		// Crea una instancia del observador con un callback
		var observer = new MutationObserver(callback);

		// Inicia la observacion del target node para las mutaciones configuradas 
		observer.observe(targetNode, config);
	}
}


/**
 * Función que se encarga de validar si se ha agregado un nuevo row a la tabla 
 * @param mutation : Objeto que contiene un cambio en especifico observado
 */	 
function isAddRow(mutation){
	if (mutation.type == 'childList' && undefined!=mutation.addedNodes[0] && mutation.addedNodes[0].localName=='tr')
		return true;
	return false;
	}

/**
 * Función que se encarga de validar si se ha eliminado un  row a la tabla 
 * @param mutation : Objeto que contiene un cambio en especifico observado
 */	 
function isDeleteRow(mutation){
	if (mutation.type == 'childList' && undefined!=mutation.removedNodes[0] && mutation.removedNodes[0].localName=='tr')
		return true;
	return false;
	}
/* Funciones para la barra de progreso ------------------------------- Inicio */

// the semi-colon before function invocation is a safety net against concatenated scripts and/or other plugins which may not be closed properly.

;(function() {
  "use strict";
  // Crea un arreglo con datos por defecto 
  var loadingClass = 'bel-loading',
    loadingPercentClass = 'bel-loading__percent bel-option-horizontal bel-space-left-xs bel-position-center',
    loadingTxtClass = 'bel-loading__status bel-option-horizontal bel-space-left-s',
    min = 0,
    max = 100,
    defaults = {
      color: 'color-e',
      percentIndicator: true,
      statusText: '',
      timeTotalProgress:100,
      startValue: 0,
      stopStatus:false
    };
  // constructor
  function LoadingBar(element, options) {
    this.element = element;
    this.$element = $BLUEJQuery(element);

    // Carga las configuraciones e inicia el plugin
    this.loadingBarSettings = $BLUEJQuery.extend({}, defaults, options);
    this.name = "blueLoadingBar";
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  //pone a extender la funcion loadingBar del prototipo creado para ella.
  $BLUEJQuery.extend(LoadingBar.prototype, {
    init: function() {
      // You already have access to the DOM element and the options via the instance, e.g. this.element and this.loadingBarSettings
      this.$element = $BLUEJQuery(this.element).addClass(this.name);
      //funciones para crear la barra de brogreso 
       this.makeLoadingBar();
       this.setInitialValues();
       this.setBarWidths();
    }, 	
	    makeLoadingBar: function() {
		      var loadingBarClass = 'bel-loading__bar bel-loading-bar__' + this.loadingBarSettings.color + ' bel-option-horizontal';		
		      if (this.loadingBarSettings.startValue) {
		        if (this.loadingBarSettings.startValue < min) {
		          this.loadingBarSettings.startValue = min;
		        } else if (this.loadingBarSettings.startValue > max) {
		          this.loadingBarSettings.startValue = max;
		        }
		      }
		      var loadingBarContainer = $BLUEJQuery('<div class="' + loadingBarClass + '"><progress min="' + min + '" max="' + max + '" value="0"></progress></div>');
		      var loadingPercentContainer = $BLUEJQuery('<div class="' + loadingPercentClass + '"><p class="bel-typography bel-typography-p"></p></div>');
		      var loadingTxtContainer = $BLUEJQuery('<div class="' + loadingTxtClass + '"><h4 class="bel-typography bel-typography-h4"></h4></div>');
		
		      this.$element.append(loadingBarContainer);
		      if (this.loadingBarSettings.percentIndicator) {
		        this.$element.append(loadingPercentContainer);
		      }
		      if (this.loadingBarSettings.statusText !='') {
		        this.$element.append(loadingTxtContainer);
		      }
		
		      this.$element.addClass(loadingClass);
		      
		      this.loadingBarSettings.timeTotalProgress/=100;
	    },
	    setInitialValues: function() {
		      if (this.loadingBarSettings.startValue) {
		        this.$element.children('.bel-loading__bar').children('progress').val(this.loadingBarSettings.startValue);
		      }
		      if (this.loadingBarSettings.percentIndicator) {
		        if (this.loadingBarSettings.startValue) {
		          this.$element.children('.bel-loading__percent').children('p').text(this.loadingBarSettings.startValue + '%');
		        } else {
		          this.$element.children('.bel-loading__percent').children('p').text(0 + '%');
		        }
		      }
		      if (this.loadingBarSettings.statusText !='') {
		        this.$element.children('.bel-loading__status').children('h4').text(this.loadingBarSettings.statusText);
		      }
	    },   
	    setBarWidths: function(){
			var loadingWidth = this.$element.outerWidth(true);
		    var percentWidth = 0;
		    var txtWidth = 0;
		    if(this.loadingBarSettings.percentIndicator){
		      percentWidth = this.$element.children('.bel-loading__percent').outerWidth(true)+5;
		    }
		
		    if(this.loadingBarSettings.statusText !=''){
		      txtWidth = this.$element.children('.bel-loading__status').outerWidth(true) + 10;
		    }
		    var loadingWidthPercent = parseInt((loadingWidth /100) * 100);
		    if(loadingWidthPercent > (loadingWidth - percentWidth - txtWidth) ){
		      loadingWidthPercent = (loadingWidth - percentWidth - txtWidth);
		    }
		
		    if(loadingWidthPercent < 100){
		      loadingWidthPercent = 100;
		    }
		
		    this.$element.children('.bel-loading__bar').children('progress').css('width', loadingWidthPercent + 'px')
	    }, 	        
        updateBar: function(newValue,newStatusText) {
			var lastValue = this.loadingBarSettings.startValue;
			this.loadingBarSettings.startValue = newValue;
	        this.loadingBarSettings._interval = setInterval($BLUEJQuery.proxy(function() {
	        	lastValue = this.validateUpdateBar(lastValue);
	  	        	if(lastValue == newValue || this.loadingBarSettings.stopStatus){
	  	        		this.loadingBarSettings.startValue = lastValue;
	  	        		if(newStatusText!=""){
	  	        		 this.changeText(newStatusText);
	  	        		 }
	        		clearInterval(this.loadingBarSettings._interval);
	        		
	        	}
	        }, this), this.loadingBarSettings.timeTotalProgress);
		  },
		 validateUpdateBar: function(lastValue) {
			var newValue = this.loadingBarSettings.startValue;
		      if (lastValue == newValue) {
		    	  return newValue;
		      } else {
		        if (lastValue > newValue) {
		        	lastValue -= 1;
		        }else{ if (lastValue < newValue) {
		        	lastValue += 1;
							}
		        } this.$element.children('.bel-loading__bar').children('progress').val(lastValue);
		          if (this.loadingBarSettings.percentIndicator) {
		        	  this.$element.children('.bel-loading__percent').children('p').text(lastValue + '%');
		          }
		          return lastValue;
		      }
	      },
	      
	    //funciones que evalua si el dato a actualizar está dentro el min y max
	      validateMinAndMax: function(valueForUpdate){
	    	  if (min <= valueForUpdate && max >= valueForUpdate) {
	    		  return true;
	    	  }
	    	  return false; 
	      },
		    
	   //funciones que se llama desde el html para manejar la barra.
	    changeValue: function(valueForUpdate) {
	    	this.loadingBarSettings.stopStatus = false;
	    	valueForUpdate = Math.round(valueForUpdate);
	            if (valueForUpdate != undefined && !isNaN(parseInt(valueForUpdate)) && this.validateMinAndMax(valueForUpdate)) {
	            	this.updateBar(valueForUpdate);
	              }
	        },
	    changeColor: function(variable) {
	      if (variable !== undefined) {
	        this.$element.children('.bel-loading__bar').removeClass('bel-loading-bar__' + this.loadingBarSettings.color);
	        this.loadingBarSettings.color = variable;
	        this.$element.children('.bel-loading__bar').addClass('bel-loading-bar__' + this.loadingBarSettings.color);
	      } else {
	        return this.loadingBarSettings.color;
	      }
	    },
	    changeText: function(variable) {
	      if(!this.loadingBarSettings.intervalRunning){
	        if(typeof(variable) === "string"){
	        	 this.loadingBarSettings.statusText = variable;
	          if(this.$element.children().hasClass('bel-loading__status')){
	            this.$element.children('.bel-loading__status').children('h4').text(this.loadingBarSettings.statusText);
	          }else{
	        	  var loadingTxtContainer = $BLUEJQuery('<div class="' + loadingTxtClass + '"><h4 class="bel-typography bel-typography-h4"></h4></div>');
	        	  this.$element.append(loadingTxtContainer);
	        	  this.$element.children('.bel-loading__status').children('h4').text(this.loadingBarSettings.statusText);
	        	  this.setBarWidths();
	          }
	        } else {
	          return this.loadingBarSettings.statusText;
	        }
	      } else {
	        setTimeout($BLUEJQuery.proxy(function() {
	          this.statusText(variable)
	        }, this), this.loadingBarSettings.timeTotalProgress);
	      }
	    },
	    
	    start: function(newStatusText){
	    	this.loadingBarSettings.stopStatus = false;
	    	this.updateBar(100,newStatusText); 
	    },
	    
	    stop: function(){
	    	this.loadingBarSettings.stopStatus = true; 
	    }
  });  
  $BLUEJQuery.fn.blueLoadingBar = function(options) {
	 genericPlugin('blueLoadingBar',options,arguments,LoadingBar,this)
  };
})();

/* Funciones para la barra de progreso ---------------------------------- FIN */



/* Funciones para el drag and drop -------------------------------- Inicio */
//the semi-colon before function invocation is a safety net against concatenated
//scripts and/or other plugins which may not be closed properly.
;
(function() {

"use strict";

// Create the defaults once
var pluginName = "blueDragDrop",

  dragdropContainerClass = 'bel-drag_drop__dropcontainer',
  dragdropLabelClass = 'bel-drag_drop__label',
  inputId='',
  inputText = {
  	inputText1: "Para seleccionar los archivos a subir, haga clic dentro del &aacute;rea punteada o haga<span class='bel-typography bel-typography-link bel-typography_size-m'> clic aqu&iacute; </span>. ",
  	inputTextDrag1: "Arrastre el documento en este espacio o <span class='bel-typography bel-typography-link bel-typography_size-m'> seleccione </span> un archivo",
  	inputFormat: "Formato del archivo: ",
  	inputFormatExt: " y no debe superar los ",
  	inputFormatSize: " Mb.",
  	inputFileDelete: "Para eliminar un archivo o agregar otros, se deben volver a seleccionar todos los archivos a cargar.",
  	inputTextRemoveAll: "Remover todos",
  	inputComplete: "Completo",
  	statusTextLoadingBar: "Cargando...",
  	inputNameFile: "Nombre del archivo",
	inputSizeFile: "Tama&ntilde;o del archivo",
	inputStatus: "Estado"
  },

  navInfo = getBrowserInfo(),
  defaults = {
    fileAccept: "",
    language: "es",
    maxSizeFileMB: '2.5',
    fileList: [],
  };
// The actual plugin constructor
function DragDrop(element, options) {
  this.element = element;
  this.$element = $BLUEJQuery(element);
  this.settingsDragAndDrop = $BLUEJQuery.extend({}, defaults, options);
  this._defaults = defaults;
  this.settingsDragAndDrop.inputId = element.id; 
  this._name = pluginName;
  this.init();
  
}

// Avoid Plugin.prototype conflicts
$BLUEJQuery.extend(DragDrop.prototype, {

  init: function() {
  	if (this.settingsDragAndDrop.language=="en"){
  		inputText.inputText1= "To select the files you wish to upload, click inside the dotted line or <span class='bel-typography bel-typography-link bel-typography_size-m'>click here</span>.";
  		inputText.inputTextDrag1= "Drag the file into this space or  <span class='bel-typography bel-typography-link bel-typography_size-m'> select </span>  a file.";
  		inputText.inputFormat="File format: ";
  		inputText.inputFormatExt=" and must not exceed ";
  		inputText.inputFormatSize=" Mb.";
  		inputText.inputFileDelete="To delete a file or add other files, you must select all the files you wish to upload once more.";
  		inputText.inputTextRemoveAll="Remove all";
  		inputText.inputComplete="Complete";
  		inputText.statusTextLoadingBar= "Loading...";
		inputText.inputNameFile="File name";
		inputText.inputSizeFile="File size";
		inputText.inputStatus="Status";
  	}
     this._makeDragDropMarkup();

    // Elimina los eventos 
    $BLUEJQuery('#' + this.settingsDragAndDrop.inputId).bind("destroyed", $BLUEJQuery.proxy(this.teardown, this));
    //Agrega los eventos a el input
     $BLUEJQuery('#' + this.settingsDragAndDrop.inputId).bind("dragenter mouseenter", $BLUEJQuery.proxy(this._dragenter, this));
     $BLUEJQuery('#' + this.settingsDragAndDrop.inputId).bind("dragleave dragend mouseleave drop", $BLUEJQuery.proxy(this._dragleave, this));
     $BLUEJQuery('#' + this.settingsDragAndDrop.inputId).bind("change", $BLUEJQuery.proxy(this.handleFiles, this));
  },
  destroy: function() {
    // Remove elements, unregister listerners, etc
    this.$element.unbind("destroyed", this.teardown);
    },
    
    _dragenter: function() {
    	$BLUEJQuery('.'+ dragdropContainerClass).children('.bel-dash-container').addClass("bel-drag_drop__default-hover");
    	$BLUEJQuery('.'+ dragdropContainerClass).children('.bel-dash-container').removeClass("bel-drag_drop__border-color-default");
    	$BLUEJQuery('.bel-icon-upload-xl').removeClass("bel-dragdrop-icon__default");
    	$BLUEJQuery('.bel-icon-upload-xl').addClass("bel-dragdrop-icon__hover");
 	
    },    
    _dragleave: function() {
    	  $BLUEJQuery('.'+ dragdropContainerClass).children('.bel-dash-container').addClass("bel-drag_drop__border-color-default");	   		 
          $BLUEJQuery('.'+ dragdropContainerClass).children('.bel-dash-container').removeClass("bel-drag_drop__default-hover");
          $BLUEJQuery('.bel-icon-upload-xl').addClass("bel-dragdrop-icon__default");
          $BLUEJQuery('.bel-icon-upload-xl').removeClass("bel-dragdrop-icon__hover");

    },
	_makeDragDropMarkup: function() {
		  var inputTextData ="";
		  var dashContent;
		  var fileAcceptsPrint=this.settingsDragAndDrop.fileAccept;
		  var fileAccepts= fileAcceptsPrint.replace(/\|/g , ' , ');		
		  var dashAccept=$BLUEJQuery('<h5 class="bel-typography bel-typography-h5 bel-space-xs">'+inputText.inputFormat + fileAccepts + inputText.inputFormatExt + this.settingsDragAndDrop.maxSizeFileMB + inputText.inputFormatSize+'</h5>');	     
	      var dragDropTableResult = $BLUEJQuery('<div id="resultContent'+this.settingsDragAndDrop.inputId+'" class=" bel-space-top-l"></div>');
	      var dragDropContainer = $BLUEJQuery('<div class="' + dragdropContainerClass + '"></div>');
		  var dashedContainer = $BLUEJQuery('<div class="' + 'bel-dash-container bel-drag_drop__default bel-drag_drop__border-color-default bel-position-center' + '"></div>');
	      var dashInput = this.$element.clone();      
	      var dragDropLabel = $BLUEJQuery('<div class="' + dragdropLabelClass + ' bel-space-top-xs"></div>');
	      var frame = $BLUEJQuery('<div class="bel-grid-row  bel-space-bottom-l"> <div class="bel-space-bottom-m"></div></div>');
	
	      // valida el navedador para determinar la instruccion a el usurio 
			if (navInfo.indexOf('IE') == 0 || isSafari() == true){
		  		inputTextData =  '<p class="bel-typography bel-typography-p"> '+ inputText.inputText1 +'</p>';
		  		dragDropTableResult = $BLUEJQuery('<div id="resultContent'+this.settingsDragAndDrop.inputId+'"></div>');
		  	}else{
		  		inputTextData = '<p class="bel-typography bel-typography-p"> '+ inputText.inputTextDrag1 +'</p>';
		  	}
	  		dashContent = $BLUEJQuery('<div class="bel-space-top-m bel-space-bottom-m">' +'<div class="bel-icon-upload-xl bel-dragdrop-icon__default"></div>' +inputTextData + '</div>');	  	  
	  		
	  	    //Proporciona las clases a el input file
	        $BLUEJQuery(dashInput).addClass("bel-drag-drop_input");
	        $BLUEJQuery(dashInput).attr('accept',fileAccepts);
	    //inicia el de manera visual el contenido creado
	    dashedContainer.append(dashContent);
	    dashedContainer.append(dashInput);
	    dragDropContainer.append(dashedContainer);
	    dragDropLabel.append(dashAccept);
	    frame.append(dragDropContainer);
	    frame.append(dragDropLabel);
	    frame.append(dragDropTableResult);
	    
	    //inicializa la estructura ya armada, elimina el input original del HTML  
	    this.$element.after(frame);
	    this.$element.remove();
	  },
  handleFiles: function(evt) {
		  // si es explorer o safari limpia la tabla de resultado para cargarla nuevamente
		  
		 if (navInfo.indexOf('IE') == 0 || isSafari() == true){
			$BLUEJQuery('#resultContent'+this.settingsDragAndDrop.inputId).children().remove();
			  
		 }
	     var files = evt.target.files; // FileList object 
	     var ext = new Array('Bytes', 'KB', 'MB', 'GB');
	     for (var i = 0, file; file = files[i]; i++) {
	  	  	var bytesMaxSize = this.settingsDragAndDrop.maxSizeFileMB * 1024 * 1024;
	  	  	var fileName=file.name;
	  	    var fileSize = file.size;
	  	    var fileId= fileName+fileSize;	  	  
	  	        fileId= fileId.replace(/[. )(&$]/g,'');
	  	    var extencionFileToLoad=fileName.split('.');
    	    var extencionToValidate=this.settingsDragAndDrop.fileAccept.split('|');
	  	  if (!($BLUEJQuery.inArray("."+extencionFileToLoad[extencionFileToLoad.length-1], extencionToValidate )>=0) || bytesMaxSize < fileSize) {
	  			    $BLUEJQuery("."+dragdropLabelClass).children('h5').addClass("bel-dragdrop_typography__error");
		  		    $BLUEJQuery('.'+ dragdropContainerClass).children('.bel-dash-container').addClass("bel-drag_drop__border-color-error");
		  		    $BLUEJQuery('.'+ dragdropContainerClass).children('.bel-dash-container').removeClass("bel-drag_drop__border-color-default");
		  		  if (navInfo.indexOf('IE') == 0 || isSafari() == true){
		  	 		this.deleteAllFiles();
		  	 		break;
		  	 	}
		       }else{
		    	  this.makeTableResult();
		          $BLUEJQuery('.'+ dragdropContainerClass).children('.bel-dash-container').addClass("bel-drag_drop__border-color-default");	   		 
		          $BLUEJQuery('.'+ dragdropContainerClass).children('.bel-dash-container').removeClass("bel-drag_drop__border-color-error");
		          $BLUEJQuery("."+dragdropLabelClass).children('h5').removeClass("bel-dragdrop_typography__error");
				  var reader = new FileReader();
							  
				  var timeAnimation = ((file.size / 1024) / 1024) * 50;
				  
				 reader.readAsText(file);	
				  
				  var OptionDeleteIcon=manageOptionDelete(fileId);
				  //carga el file list con los datos de el input
				  this.settingsDragAndDrop.fileList= addFile(this.settingsDragAndDrop.fileList, fileId, file);
				  	
                    var fileSizeTxt= calcFileSize(fileSize, ext);					
					this.addTableTr(fileName,fileId,fileSizeTxt,OptionDeleteIcon);
					startDragAndDropTableResult(this.settingsDragAndDrop.inputId);
					makeLoadingBarDragAndDrop(fileId,timeAnimation,inputText.statusTextLoadingBar);
					 //agrega el evento borrar a el icono
					$BLUEJQuery('div[delete-fileId = "'+ fileId+'"]').bind("click", $BLUEJQuery.proxy(this.deleteFile, this,fileId));			

			        $BLUEJQuery('#progressBar'+fileId).blueLoadingBar('start',inputText.inputComplete);
					reader.onerror = function(fileId){
						return function() {
						    $BLUEJQuery('#progressBar'+fileId).blueLoadingBar('stop');
							$BLUEJQuery('#progressBar'+fileId).blueLoadingBar('changeColor','color-c');
							$BLUEJQuery('#progressBar'+fileId).blueLoadingBar('changeText','Error');
					 };
					
					}(fileId);
			    }
	       }
		 
		 		this.fileUpdate();
		 	     
	  },
	makeTableResult: function() {
		 if ($BLUEJQuery('#tableResult'+this.settingsDragAndDrop.inputId).length==0){
				var resultContiner = $BLUEJQuery('#resultContent'+this.settingsDragAndDrop.inputId); 
				// si es explorer es necesario agregar un boton de eliminar todos
				if (navInfo.indexOf('IE') == 0 || isSafari() == true){
				resultContiner.append('<div class="deleteAllFiles bel-float-right bel-cursor-pointer bel-space-top-s">'
	    				+'<button class="bel-icon-deleted-before-s bel-display-inline bel-auxiliary-component bel-cursor-pointer">'+inputText.inputTextRemoveAll+'</button><div>');
				$BLUEJQuery('#resultContent'+this.settingsDragAndDrop.inputId).children('.deleteAllFiles').bind("click", $BLUEJQuery.proxy(this.deleteAllFiles, this));	
				}
			 	  
			    resultContiner.append('<table id =tableResult'+this.settingsDragAndDrop.inputId+'></table>');
			    resultContiner=$BLUEJQuery('#resultContent'+this.settingsDragAndDrop.inputId+'>table');
			    if (navInfo.indexOf('IE') == 0 || isSafari() == true){
			    	resultContiner.append('<thead><th>'+inputText.inputNameFile+'</th><th>'+inputText.inputSizeFile+'</th><th>'+inputText.inputStatus+'</th></thead>');	
			    }else{
			    	resultContiner.append('<thead><th>'+inputText.inputNameFile+'</th><th>'+inputText.inputSizeFile+'</th><th>'+inputText.inputStatus+'</th><th></th></thead>');	
			    }
			    resultContiner.append('<tbody></tbody>');	
			    if (navInfo.indexOf('IE') == 0 || isSafari() == true){
			    	$BLUEJQuery('#resultContent'+this.settingsDragAndDrop.inputId).append('<div class=" bel-space-top-xs"><h5 class="bel-typography bel-typography-h5">'+inputText.inputFileDelete+'</h5></div>');
			    }
    	  }
	},
	addTableTr: function(fileName,fileId,fileSizeTxt,OptionDeleteIcon){
		  if ($BLUEJQuery('#tableResult'+this.settingsDragAndDrop.inputId+' >tbody>tr[id="'+fileId+'"]').length>0){ 
			  $BLUEJQuery('#'+fileId).remove();
		  }
		  $BLUEJQuery('#tableResult'+this.settingsDragAndDrop.inputId+' >tbody').append(
				  '<tr class="bel-generic-hover" id="' + fileId + '">' +
			      '<td class="">' +
				          '<div class="bel-icon-receipt-s bel-display-inline bel-space-right-s"></div>' +
				          '<p class="bel-display-inline bel-typography bel-typography-p bel-drag-drop_nowrap bel-vertical-align-meddle">' + fileName +'</p>' +
			      '</td>' +
				          '<td class="bel-position-center">' +
				          '<p class="bel-typography bel-typography-p">' + fileSizeTxt + '</p>' +
			      '</td>' +
			      '<td >' +
				          '<div class="bel-loading" id="progressBar'+fileId+'"></div>' +
			      '</td>' +OptionDeleteIcon+
			    '</tr>'
	      );
	  },
	   deleteFile: function(fileId) {
	       //compara con la lista de archivos guardada el que se debe eliminar 	
		  var filesListToDelete = $BLUEJQuery.grep(this.settingsDragAndDrop.fileList, function(f) {
		        return f.id == fileId;
		      });
		  //actualiza el arreglo de archivos excluyendo el archivo que se va a eliminar 
		  this.settingsDragAndDrop.fileList.splice($BLUEJQuery.inArray(filesListToDelete[0], this.settingsDragAndDrop.fileList),1);
			//se saca de la lista de archivos el arreglo que se va a inicializar en el input
		  var files = this.settingsDragAndDrop.fileList.map(function(a) {return a.file;});
		  // se crea el arreglo de transferecia de tipo DataTransfer y se inicaliza
		  var filesToUpdate = new DataTransfer();
				for (var i = 0, f; f = files[i]; i++) {
					filesToUpdate.items.add(f);
				}
	      //Se carga el input con el nuevo arreglo
				$BLUEJQuery('#'+this.settingsDragAndDrop.inputId).off('change');
				$BLUEJQuery('#'+this.settingsDragAndDrop.inputId).prop('files', filesToUpdate.files);
				$BLUEJQuery('#' + this.settingsDragAndDrop.inputId).bind("change", $BLUEJQuery.proxy(this.handleFiles, this));
		  // se borra de la tabla el campo correspondiente 
				$BLUEJQuery('#'+fileId).remove();
				if ($BLUEJQuery('#tableResult'+this.settingsDragAndDrop.inputId+'>tbody>tr').length==0){
					$BLUEJQuery('#tableResult'+this.settingsDragAndDrop.inputId).remove();
				}
	  	},
	 deleteAllFiles: function(){
		  $BLUEJQuery("#"+this.settingsDragAndDrop.inputId).val("");
		  $BLUEJQuery('#resultContent'+this.settingsDragAndDrop.inputId).children().remove();
	  },
	  fileUpdate : function (){
		  
		  if (navInfo.indexOf('IE') != 0 && isSafari() != true){
		  //actualiza los datos en el input.
		      var files = this.settingsDragAndDrop.fileList.map(function(a) {return a.file;});
			  // se crea el arreglo de transferecia de tipo DataTransfer y se inicaliza
			  var filesToUpdate = new DataTransfer();
					for (var i = 0, f; f = files[i]; i++) {
						filesToUpdate.items.add(f);
					}
		      //Se carga el input con el nuevo arreglo
					$BLUEJQuery('#'+this.settingsDragAndDrop.inputId).off('change');
					$BLUEJQuery('#'+this.settingsDragAndDrop.inputId).prop('files', filesToUpdate.files);
					$BLUEJQuery('#' + this.settingsDragAndDrop.inputId).bind("change", $BLUEJQuery.proxy(this.handleFiles, this));	
		  }					
		}
});
    
function manageOptionDelete(fileId){	
    var OptionDeleteIcon='';
		if ((isSafari() == false) && navInfo.indexOf('IE') != 0){
				OptionDeleteIcon='<td class="bel-table_column_default">' +
		          '<div class="bel-loading__action bel-position-right bel-cursor-pointer" delete-fileId="' + fileId + '">' +
		          '<div class="bel-icon-error-xs"></div>' +
		        '</div>' +
		      '</td>';
		}
		return OptionDeleteIcon;
	}
function getFilePathExtension(path) {
	var filename = path.split('\\').pop().split('/').pop();
	var lastIndex = filename.lastIndexOf(".");
	if (lastIndex < 1) return "";
	return filename.substr(lastIndex + 1);
}
$BLUEJQuery.fn.blueDragDrop = function(options) {
	 genericPlugin('blueDragDrop',options,arguments,DragDrop,this)
	};
})();

function makeLoadingBarDragAndDrop(loadingBarId,timeAnimation,statusText){
	 $BLUEJQuery("#progressBar"+loadingBarId).blueLoadingBar({
		color: 'color-b',
		percentIdicator: true,
		statusText: statusText,
		timeTotalProgress:timeAnimation		
	});	
}
function startDragAndDropTableResult(idTableResult){
	 $BLUEJQuery("#tableResult"+idTableResult).blueTable({
		   toggleable: false,
		   extensible: false,
		   rowHover: true,
		   tdWidth: [30, 26,39, 5],
		   thAlign: ["left", "center", "left", "center"],
		   tdAlign: ["left", "center", "left", "center"]	
		});	
}

function addFile(fileList, fileId, file){
	var insertar=true;
	for (var iterator=0, fileSave; fileSave = fileList[iterator]; iterator++){
		if(fileSave.id==fileId){
		 insertar=false;
		}
	}
	if(insertar==true){
		fileList.push(
			{ 'id': fileId,
			  'file': file
			}
		);
   }
   return fileList;
}
function calcFileSize(fileSize, ext){
	var fz=0;
	while (fileSize > 900) {
		fileSize /= 1024;
		fz++;
	}
	return ((Math.round(fileSize * 100) / 100) + ' ' + ext[fz]);
	
}







/*
* Funcion que activa o desactiva el desplazamiento automatico de los combos de seleccionada
* comboId: es el identificador del combo de seleccionada
* comboState: es el estado del combo de seleccion, se puede usar "true" o "false"
*/

$BLUEJQuery.fn.blueSelect = function(size, language, optionsCount){
 if(this.attr('id') == undefined){
	 this.attr('id', this.attr('name'));
 }


 var noResultsText = 'No se han encontrado resultados';
 var placeholdertext = 'Buscar'
 var searcherConditionCount = 6;
 var elementId = this.attr('id');
 this.removeClass();
 this.removeAttr( 'style' );

 if(language != undefined && language == 'en'){
	 noResultsText = 'No results found';
	 placeholdertext = 'Search'
 }

 if(optionsCount != undefined){
	 searcherConditionCount = optionsCount;
 }

 $BLUEJQuery( "#"+elementId+"Div").remove();
 var selectDiv;
 var selectedLabel = null;

 if(this.prop('disabled')){
		 selectDiv = $BLUEJQuery("<div id='"+ elementId +"Div' class='bel-click-disable'></div>");
 }else{
	 selectDiv = $BLUEJQuery("<div id='"+ elementId +"Div'></div>");
	 if($BLUEJQuery(this).attr('scrollable') != undefined){
		 selectDiv.prop('scrollable', true);
	 }
 }

 var selectList = $BLUEJQuery('<ul id="'+elementId+'List" class="bel-option-list bel-option-list-'+size+'"></ul>');

 if($BLUEJQuery(this).find('option').length > searcherConditionCount){
	 var selectSearcher = '';
	 selectSearcher += '<div><input id="'+elementId+'Searcher" type="text"  onkeyup="selectSearcherFilter(\''+elementId+'List\',\''+elementId+'Searcher\',\''+elementId+'NoResults\',\''+elementId+'CleanBtn\')" class="bel-input--icon bel-input--icon-'+size+' bel-input-default bel-input-searcher" placeholder="'+placeholdertext+'">';
	 selectSearcher += '<span class="bel-icon-search-s bel-input-searcher-left-icon"></span>';
	 selectSearcher += '<span id="'+elementId+'CleanBtn" class="bel-icon-error-xxs bel-input-searcher-right-icon" style="display:none;" onclick="cleanSearcherInput(\''+elementId+'Searcher\',\''+elementId+'NoResults\'); showAllSelectOptions(\''+elementId+'List\',\''+elementId+'CleanBtn\')"></span>';
	 selectSearcher += '<h5 id="'+elementId+'NoResults" class="bel-typography bel-typography-h5 bel-position-center bel-option-no-results" style="display:none">'+noResultsText+'</h5>';
	 $BLUEJQuery(selectList).append($BLUEJQuery(selectSearcher));
 }

 $BLUEJQuery(this).children( 'option' ).each(function () {
	 if($BLUEJQuery(this).prop('disabled')){
		 if($BLUEJQuery(this).attr('value') != '-1'){
			 $BLUEJQuery(selectList).append($BLUEJQuery('<li class="bel-option-disabled">'+$BLUEJQuery(this).text()+'</li>'));
		 }
	 }else{
		 if ($BLUEJQuery(this).prop('selected')){
			 $BLUEJQuery(selectList).append($BLUEJQuery('<li class="bel-option bel-selected-option" onclick="updateBelSelect(\''+elementId+'\', \''+$BLUEJQuery(this).attr('value')+'\', this.innerHTML, this);">'+$BLUEJQuery(this).text()+'</li>'));
		 }
		 else{
			 $BLUEJQuery(selectList).append($BLUEJQuery('<li class="bel-option" onclick="updateBelSelect(\''+elementId+'\', \''+$BLUEJQuery(this).attr('value')+'\', this.innerHTML, this);">'+$BLUEJQuery(this).text()+'</li>'));
		 }
	 }
	 if($BLUEJQuery(this).prop('selected')){
		 selectedLabel= '<p class="bel-truncate-text bel-display-inline bel-space-reset" style="max-width: calc(100% - 25px);">' +$BLUEJQuery(this).text()+'</p>';
	 }
 });


 this.find( 'optgroup' ).each(function () {
	 $BLUEJQuery(selectList).append($BLUEJQuery('<li class="bel-option-disabled">'+$BLUEJQuery(this).attr("label")+'</li>'));
	 $BLUEJQuery(this).find( 'option' ).each(function () {
		 $BLUEJQuery(selectList).append($BLUEJQuery('<li class="bel-option" onclick="updateBelSelect(\''+elementId+'\', \''+$BLUEJQuery(this).attr('value')+'\', this.innerHTML, this);">'+$BLUEJQuery(this).text()+'</li>'));
		 if($BLUEJQuery(this).prop('selected')){
			 selectedLabel = '<p class="bel-truncate-text bel-display-inline bel-space-reset" style="max-width: calc(100% - 25px);">' +$BLUEJQuery(this).text()+'</p>';
		 }
	 });
 });
 if(this.prop('disabled')){
	 $BLUEJQuery(selectDiv).append($BLUEJQuery('<label id="'+elementId+'Label" class="bel-select bel-select-'+size+' bel-select-default bel-select-close-icon bel-select-close-icon-disabled" style=" background: #ededed;"  onclick="displayBelOption(\''+elementId+'List\', \''+elementId+'Label\',\''+elementId+'Searcher\',\''+elementId+'CleanBtn\');">'+selectedLabel+'</label>'));
 }else{
	 $BLUEJQuery(selectDiv).append($BLUEJQuery('<label id="'+elementId+'Label" class="bel-select bel-select-'+size+' bel-select-default bel-select-close-icon bel-cursor-pointer" onclick="displayBelOption(\''+elementId+'List\', \''+elementId+'Label\',\''+elementId+'Searcher\',\''+elementId+'CleanBtn\');">'+selectedLabel+'</label>'));
	 }

 $BLUEJQuery(selectDiv).append($BLUEJQuery(selectList));
 this.before( selectDiv);
 this.addClass('bel-box-hidden');
};

function onBlurSelect(idList, idLabel, inputSearcherId, cleanBtnId){
	if ($BLUEJQuery('#' + idLabel).hasClass('bel-select-open-icon')) {
		displayBelOption(idList, idLabel, inputSearcherId, cleanBtnId);
	}
}

// select
function updateBelSelect(id, value, optionText, element) {
  optionText = optionText.replace('<b>','').replace('</b>','');
  $BLUEJQuery("#"+id+"Label").html('<p class="bel-truncate-text bel-display-inline bel-space-reset" style="max-width: calc(100% - 25px)">' +optionText+'</p>');
	$BLUEJQuery("#" + id + "Label").addClass("bel-select-filled");
	$BLUEJQuery("#" + id + "List").removeClass("bel-display-list");
	$BLUEJQuery("#" + id + "Label").removeClass('bel-select-open-icon');
	$BLUEJQuery("#" + id + "Label").addClass('bel-select-close-icon');
	var allOptions = $BLUEJQuery("#" + id + "List").children('li');
	allOptions.removeClass('bel-selected-option');
	$BLUEJQuery(element).addClass('bel-selected-option');
	$BLUEJQuery('#'+id+' option').removeAttr("selected");
  $BLUEJQuery('#'+id+' option[value="'+value+'"]').attr('selected', true);
	$BLUEJQuery("#" + id).val(value);
	$BLUEJQuery("#" + id).trigger("change");
}

function displayBelOption(idList, idLabel, inputSearcherId, cleanBtnId) {
  event.stopPropagation();
	if ($BLUEJQuery('#' + idLabel).hasClass('bel-select-open-icon')) {
		$BLUEJQuery("#" + idLabel).removeClass('bel-select-open-icon');
		$BLUEJQuery("#" + idLabel).addClass('bel-select-close-icon');
		$BLUEJQuery("#" + idList).removeClass("bel-display-list");
	} else {
		if($BLUEJQuery("#" + idList).parent().prop('scrollable') == true){
			scrollToGroup("#" + idLabel);
		}
		var allOptions = $BLUEJQuery(".bel-option-list");
		allOptions.removeClass('bel-display-list');
		var allSelectLabels = $BLUEJQuery(".bel-select");
		allSelectLabels.removeClass('bel-select-open-icon');
		allSelectLabels.addClass('bel-select-close-icon');
		if (!$BLUEJQuery('#' + idLabel).hasClass('bel-select-disabled')) {
			$BLUEJQuery('#' + idList).toggleClass('bel-display-list');
			$BLUEJQuery("#" + idLabel).addClass('bel-select-open-icon');
		}
		inputSearcherFocus(inputSearcherId);
		$BLUEJQuery(document).click(function(event){
			if($BLUEJQuery(event.target)[0].id != idList &&
				 $BLUEJQuery(event.target)[0].id != idLabel &&
				 $BLUEJQuery(event.target)[0].id != cleanBtnId &&
				 $BLUEJQuery(event.target)[0].id != inputSearcherId){
				onBlurSelect(idList, idLabel, inputSearcherId, cleanBtnId);
			}
	  });
	}
}

var inputSearcherFocus = function getFocus(inputSearcherId) {
	if(document.getElementById(inputSearcherId) != null){
  	document.getElementById(inputSearcherId).focus();
	}
}

function cleanSearcherInput(inputSearcherId, noResultsLabel) {
	$BLUEJQuery('#'+inputSearcherId).val('');
	$BLUEJQuery('#'+noResultsLabel).css('display','none');
}

function selectSearcherFilter(selectId, inputSearcherId, noResultsLabel, cleanBtnId) {
	var searchText = $BLUEJQuery('#'+inputSearcherId).val().toLowerCase();
	var compareWith = '';
	var resultCount = 0;
	var parentId = null;
	var boldText;
	var i;

	if(searchText != ''){
		$BLUEJQuery('#'+cleanBtnId).css('display','block');
		$BLUEJQuery('#'+selectId+' li').each(
			function(){
				compareWith = $BLUEJQuery(this).text().toLowerCase();

				if($BLUEJQuery(this).hasClass('bel-option-disabled')){
					$BLUEJQuery(this).css('display','none');
					parentId = this;
				}else{
						if (normalizeText(compareWith).search(normalizeText(searchText)) == -1) {
								$BLUEJQuery(this).css('display','none');
						}else{
								boldText = searchText.bold();
								boldText = compareWith.replace(searchText, boldText);
								if(boldText.charAt(0) != '<'){
									compareWith = boldText.charAt(0).toUpperCase() + boldText.substr(1).toLowerCase();
								}else{
									compareWith = boldText.substr(0,3) + boldText.substr(3,1).toUpperCase() + boldText.substr(4).toLowerCase();
								}
								$BLUEJQuery(this).html(compareWith);
								$BLUEJQuery(this).css('display','block');
								if(parentId != null){
									$BLUEJQuery(parentId).css('display','block');
									parentId = null;
								}
								resultCount += 1
						}
				}
		});
	}else{
		showAllSelectOptions(selectId, cleanBtnId);
		resultCount = 1;
	}

	if(resultCount < 1){
		$BLUEJQuery('#'+noResultsLabel).css('display','block');
	}else{
		$BLUEJQuery('#'+noResultsLabel).css('display','none');
	}
}

function showAllSelectOptions(selectId, cleanBtnId){
	$BLUEJQuery('#'+selectId+' li').each(
		function(){
			$BLUEJQuery('#'+cleanBtnId).css('display','none');
			$BLUEJQuery(this).css('display','block');
			$BLUEJQuery(this).html($BLUEJQuery(this).text());
		});
}

