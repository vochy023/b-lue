// REVISION ------ 1.0
// SP: ----------- CRI-025171
// DATE: --------- 19-02-2018
// DESCRIPTION: -- funciones para los elementos: campo de texto, textarea y combo de seleccion
// AUTHOR: ------- jcastillov, aramirez (1.0)
// WORKTEAM: ----- Codebreakers-Anonymous (1.0)
// version 1.0

validateJQuery();

//input
$(".bel-input-disabled").prop('disabled', true);
$(".bel-input-non-editable").prop('disabled', true);

$(".bel-input").on('click', function() {
	if (!$(this).hasClass('bel-input-error')) {
		$(this).addClass('bel-input-edit');
	}
});

$('.bel-input').blur(function() {
	$(this).removeClass('bel-input-edit');
	$(this).addClass('bel-input-filled');
});

// select
function updateBelSelect(id, value, optionText, element) {
	document.getElementById(id + "Label").innerHTML = optionText;
	$("#" + id + "Label").addClass("bel-select-filled");
	$("#" + id + "List").removeClass("bel-display-list");
	$("#" + id + "Label").removeClass('bel-select-open-icon');
	$("#" + id + "Label").addClass('bel-select-close-icon');
	var allOptions = $("#" + id + "List").children('li');
	allOptions.removeClass('selected');
	$(element).addClass('selected');
	$('#'+id+' option:selected').removeAttr("selected");
	$('#'+id+' option[value="'+value+'"]').attr('selected', 'selected');
	$("#" + id).trigger("change");
}


function displayBelOption(idList, idLabel) {
	if ($('#' + idLabel).hasClass('bel-select-open-icon')) {
		$("#" + idLabel).removeClass('bel-select-open-icon');
		$("#" + idLabel).addClass('bel-select-close-icon');
		$("#" + idList).removeClass("bel-display-list");
	} else {
		scrollToGroup("#" + idLabel);
		var allOptions = $(".bel-option-list");
		allOptions.removeClass('bel-display-list');
		var allSelectLabels = $(".bel-select");
		allSelectLabels.removeClass('bel-select-open-icon');
		allSelectLabels.addClass('bel-select-close-icon');
		if (!$('#' + idLabel).hasClass('bel-select-disabled')) {
			var allOptions = $("#mySelect").children('li');
			allOptions.removeClass('selected');
			$('#' + idList).toggleClass('bel-display-list');
			$("#" + idLabel).addClass('bel-select-open-icon');
		}
	}
}

function displayDownloadOption(idList, idLabel) {
	if (document.getElementById("downloadOptions").style.display == "block" ) {
		$("#" + idList).removeClass("bel-display-list");
		$("#" + idList).removeClass("bel-download-options");
		$("#" + idLabel).removeClass("bel-download-open");
		document.getElementById("downloadOptions").style.display = "none";
		document.getElementById(idList).style.display = "none";
	} else {
		scrollToElement('#' + idLabel);
		var allOptions = $(".bel-option-list");
		allOptions.removeClass('bel-display-list');
		var allSelectLabels = $(".bel-select");
		document.getElementById("downloadOptions").style.display = "block";
		document.getElementById(idList).style.display = "block";
		if (!$('#' + idLabel).hasClass('bel-select-disabled')) {
			var allOptions = $("#mySelect").children('li');
			allOptions.removeClass('selected');
			$('#' + idList).toggleClass('bel-display-list');
			$('#' + idList).toggleClass('bel-download-options');
			$("#" + idLabel).toggleClass("bel-download-open");
		}
	}
	$(document).click(function(event) { 
	    if(event.target.parentElement !== $("#" + idList)[0].parentElement) {
	        if($('#'+idList).is(":visible")) {
	        	$("#" + idList).removeClass("bel-display-list");
				$("#" + idList).removeClass("bel-download-options");
				$("#" + idLabel).removeClass("bel-download-open");
				document.getElementById("downloadOptions").style.display = "none";
				document.getElementById(idList).style.display = "none";
	        }
	    }
	}); 
}

function scrollToElement(elementID){
	$('html').animate({
	    scrollTop: $(elementID).offset().top
	  }, 1000);
}

function scrollToGroup(groupId){
	$('html').animate({
	    scrollTop: $(groupId).offset().top - 30
	  }, 1000);
}

//obtiene el valor seleccionado del select
function getSelectedOption(idList) {
	return $("#" + idList).find(".selected").val();
}

//textarea
$(".bel-textarea").on('click', function(){
	if(!$(this).hasClass('bel-textarea-error')){
		$(this).addClass('bel-textarea-edit');
	}
});

$('.bel-textarea').blur(function(){
	$(this).removeClass('bel-textarea-edit');
});

var tx = document.getElementsByTagName('textarea');
for (var i = 0; i < tx.length; i++) {
  tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;');
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput(e) {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}

//funcion tab
//Caga los textos al hacer click en los tabs
$.fn.makeTabs = function(tabSelected){
	var tabContiner = this;
	this.attr('class', 'bel-tab');
	this.find( "div" ).each(function () {
		$(this).attr('class', 'bel-tab-container__bel-tab-content');
	});
	this.find( "ul" ).each(function () {
		$(this).attr('class', 'bel-tab-container');
	});
	this.find( "ul" ).find( "li" ).each(function () {
		var tab = $(this).find('a').attr( "href" );
		$(this).find('a').attr('class', 'bel-tab-container-element');
		$(this).click(function(){
			$(tabContiner).find( "div" ).each(function () {
				$(this).hide();
			});
			$(tabContiner).find( "ul" ).find( "li" ).each(function () {
				$(this).attr('class', 'bel-tab-container-link bel-tab-container-element__unselected');
			});
			$(this).attr('class', 'bel-tab-container-link bel-tab-container-element__selected');
			$(tab).show();
		});

		if("#"+tabSelected == tab){
			$(this).attr('class', 'bel-tab-container-link bel-tab-container-element__selected');
			$(this).click();
		}else{
			$(this).attr('class', 'bel-tab-container-link bel-tab-container-element__unselected');
		}

	});

};
//fin funcion tab


function validateJQuery() {
	// Valida si JQuery esta indefinido
	if (undefined == $ || 'undefined' == typeof $) {
		// En caso de que JQuery se esta ejecutando en la variable gloabal
		// wIndow lo tome de ahi
		if (undefined != window.$j) {
			// Define $ que se ejecuta en window.$j
			$ = window.$j;
			// En caso de no tener JQuery cargado se encarga de cargar el
			// archivo de la vesion 1.7.2
		} else {
			// Se crea el tag script con el tipo y la ruta del archivo
			var jQueryFileScript = document.createElement('script');
			jQueryFileScript.type = 'text/javascript';
			jQueryFileScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
			jQueryFileScript.async = 1;
			// Se agrega al body
			document.getElementsByTagName('body')[0]
					.appendChild(jQueryFileScript);
			// Metodo que se encarga de cargar el archivo
			jQueryFileScript.onload = jQueryFileScript.onreadystatechange = function(
					_, isAbort) {
				if (isAbort || !jQueryFileScript.readyState
						|| /loaded|complete/.test(jQueryFileScript.readyState)) {
					jQueryFileScript.onload = jQueryFileScript.onreadystatechange = null;
					jQueryFileScript = undefined;
					if (!isAbort) {
						if (callback)
							callback();
					}
				}
			};
		}
	}
}


/**
 * Plugin creado para crear pasos de wizard generico

 * Descripcion de uso
 *
 * $('#contenedorEjemplo').createWizard(steps, mensajesdePasos, mensajeNumeros,
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
 * $('#contenedorEjemplo').belCreateWizardProcessStep(3, messagesStep,
 * messagesNumber, 1);
 */
// Carga JQuery en caso de que no se este cargando en la pagina
$.fn.belCreateWizardProcessStep = function(steps, messagesStep, selectedStep) {
	if (steps <= 5) {

		var processList = $('<ul class="bel-wizard"></ul>');
		for (var i = 0; i < steps; i++) {
			var step = $('<li class="bel-wizard-li bel-wizard-step-inactive bel-wizard-steps-'
					+ steps
					+ '"><label id="step'
					+ (i + 1)
					+ '" class="bel-wizard-label bel-wizard-label-inactive">'
					+ messagesStep[i] + '</label></li>');
			if ((i + 1) == selectedStep) {
				step = $('<li class="bel-wizard-li bel-wizard-step-active bel-wizard-steps-'
						+ steps
						+ '"><label id="step'
						+ (i + 1)
						+ '" class="bel-wizard-label bel-wizard-label-active">'
						+ messagesStep[i] + '</label></li>');
			} else if ((i + 1) < selectedStep) {
				step = $('<li class="bel-wizard-li bel-wizard-step-completed bel-wizard-steps-'
						+ steps
						+ '"><label id="step'
						+ (i + 1)
						+ '" class="bel-wizard-label bel-wizard-label-active">'
						+ messagesStep[i] + '</label></li>');
			}
			processList.append(step);
		}
		;
		this.append(processList);
		animationProgressBar(steps, selectedStep);

	} else {
		alert("NÃºmero de pasos esta por encima de la capacidad de Wizard");
	}
}

function animationProgressBar(steps, selectedStep){

	if(selectedStep > steps){
			alert("El paso actÃºal elegido es mayor a la cantidad de pasos disponible");
	}else {
		var barEfect = document.getElementsByClassName("bel-wizard-step-active")[0];
		var lblEfect = document.getElementsByClassName("bel-wizard-label-active")[selectedStep-1];
		barEfect.className += " bel-wizard-step-actual";
		lblEfect.className += " bel-wizard-label-actual";
	}
}

/**
 *Codigo para la animacion de contandor.
 *
 **
 **
 **
 *
 */
function startAmimationTimer(){
	if ( $( "#belSeconds" ).length ) {

		// Funcion para animacion de Contando
		var belRemaingTimeForFinishUserSession = 10;
		var startLoadingTime = 1000;
		var belShowMessageTimeout = null;
		var belSetTimerForFinishTheSession = null;
		var belCircleInterval = null;

		belShowMessageTimeout = setTimeout(belShowMessageTimer, startLoadingTime);
	}



}

// Funcion que inicia el contador
function belShowMessageTimer() {
    $('.bel-timer-cont__circle').css('stroke-dashoffset', 300);
	    belExecuteCircleTimer();
	}
function belExecuteCircleTimer() {
    var time = belRemaingTimeForFinishUserSession;
    var timer = $('#belSeconds')[0];
    timer.innerHTML = time;
    var seconds = Number(timer.innerHTML);
    var i = 1;
    belSetTimerForFinishTheSession = setTimeout(function() {
   // ejecutal el inicio del conteo
   // *****************************************
        }, belRemaingTimeForFinishUserSession);
      belCircleInterval = setInterval(function() {
        seconds--;
        if (seconds >= 0) {
            timer.innerHTML = seconds;
            i++;
            $('.bel-timer-cont__circle').css('stroke-dashoffset',
                    300 + Math.floor((i * 40 / time) + (i * 100 / time)));
        }else{
     // Finaliza el tiempo
     // ***************************
        	clearInterval(belCircleInterval);
        }
    }, 1000);
}
// Fin funcion animacion contador



function closeModal(box, modal){
	$("#"+box).removeClass("bel-box-visible");
	$("#"+modal).removeClass("bel-modal-visible");
	$("#"+box).addClass("bel-box-hidden");
	$("#"+modal).addClass("bel-modal-hidden");
}

function openModal(box, modal){
	$("#"+box).removeClass("bel-box-hidden");
	$("#"+modal).removeClass("bel-modal-hidden");
	$("#"+box).addClass("bel-box-visible");
	$("#"+modal).addClass("bel-modal-visible");
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
 (function ($) {
 	$.fn.delayKeyup = function(callback, ms){
 		var timer = 0;
 		$(this).keyup(function(){
 			clearTimeout (timer);
 			timer = setTimeout(callback, ms);
 		});
 		return $(this);
 	};
 })(jQuery);

 $('#belInputEmailId').delayKeyup(function(){
 	belValidateEmail('belInputEmailId', 'belInpEmailSpan');
 }, 500);

 function belAddNewEmail(inputId, mainContId, spanId, maxEmails){
 	var belMoreEmailsContId = document.getElementById(mainContId);
 	var divs = belMoreEmailsContId.querySelectorAll('div');
 	var cantidad = divs.length;
 	var inputTextAux = $("#"+inputId).val();
 	if (maxEmails>cantidad && inputTextAux!="") {
 		if ($('#'+spanId).hasClass('bel-validation-icon-success-s')) {
 			$('#'+inputId).removeClass('bel-input-error');
 			var contAux = document.createElement("div");
 			contAux.className = "bel-space-top-xs";

 			var inputAux = document.createElement("input");
 			inputAux.className = "bel-input--icon bel-input--icon-m bel-input-default bel-input-non-editable";
 			inputAux.setAttribute('type','text');
 			inputAux.setAttribute('value', inputTextAux);
 			$("#"+inputId).val("");
 			belClearInputMain(spanId,inputId);

 			var spanAux = document.createElement("span");
 			spanAux.className = "bel-error-validation bel-error-validation-item";
 			spanAux.setAttribute('onclick','belDeleteEmailCont(this)');

 			contAux.appendChild(inputAux);
 			contAux.appendChild(spanAux);
 			belMoreEmailsContId.appendChild(contAux);
 		}else{
 			$('#'+inputId).addClass('bel-input-error');
 			$('#'+spanId).addClass('el-typography-main bel-typography-label-error');
 			$('#'+spanId).removeClass('bel-hide-element');
 			$('#'+spanId).text("Formato no vÃ¡lido");
 		}
 	}
 	if (cantidad==maxEmails && inputTextAux!="") {
 		$('#'+spanId).removeClass('bel-validation-icon bel-validation-icon-success-s bel-hide-element');
 		$('#'+inputId).addClass('bel-input-error');
 		$("#"+inputId).val("");
 		$('#'+spanId).addClass('el-typography-main bel-typography-label-error');
 		$('#'+spanId).text("No se pueden agregar mÃ¡s correos");
 	}
 }

 function belCheckExistEmails(inputId, spanId, mainContId){
 	var belMoreEmailsContId = document.getElementById(mainContId);
 	var divs = belMoreEmailsContId.querySelectorAll('div');
 	var cantidad = divs.length;
 	if (cantidad==0 && !$('#'+spanId).hasClass('bel-validation-icon-success-s')) {
 		$('#'+spanId).removeClass('bel-validation-icon bel-validation-icon-success-s bel-hide-element');
 		$('#'+inputId).addClass('bel-input-error');
 		$('#'+spanId).addClass('el-typography-main bel-typography-label-error');
 		$('#'+spanId).text("Campo requerido");
 	}
 }

 function belDeleteEmailCont(element){
 	$( element ).parent(".bel-col-7").remove();
 	$( element ).parent(".bel-space-top-xs").remove();
 }

 function belValidateEmail(inputId, spanId) {
 	var email = $('#'+inputId).val();
 	if (email!="") {
 		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 		$("#"+spanId).removeClass('bel-hide-element');
 		$("#"+spanId).text('');
 		if (re.test(String(email).toLowerCase())) {
 			$("#"+spanId).removeClass('el-typography-main bel-typography-label-error');
 			$("#"+spanId).text('');
 			$("#"+inputId).removeClass('bel-input-error');
 			$("#"+spanId).addClass('bel-validation-icon bel-validation-icon-success-s');
 		}else{
 			$("#"+spanId).removeClass('bel-validation-icon bel-validation-icon-success-s');
 		}
 	}else{
 		$("#"+spanId).addClass('bel-hide-element');
 	}
 }

 function belClearInputMain(spanId, inputId){
 	$('#'+inputId).val('');
 	$("#"+spanId).removeClass();
 	$("#"+spanId).addClass('bel-hide-element');
 	$("#"+spanId).unbind( "click" );
 }


$.fn.blueSelect = function(size){
	if(this.attr('id') == undefined){
		this.attr('id', this.attr('name'));
	}
	var elementId = this.attr('id');
	this.removeClass();
	this.removeAttr( 'style' );
	var hasCategory = false;


	var selectedLabel = null;

	var selectDiv = $("<div id='"+ elementId +"Div'></div>");

	var selectList = $('<ul id="'+elementId+'List" class="bel-option-list bel-option-list-'+size+'"></ul>')

	$(this).children( 'option' ).each(function () {
		if($(this).prop('disabled')){
			if($(this).attr('value') != '-1'){
				$(selectList).append($('<li class="bel-option-disabled">'+$(this).text()+'</li>'));
			}
		}else{
			$(selectList).append($('<li class="bel-option" onclick="updateBelSelect(\''+elementId+'\', \''+$(this).attr('value')+'\', this.innerHTML, this);">'+$(this).text()+'</li>'));
		}
		if($(this).prop('selected')){
			selectedLabel = $(this).text();
		}
	});
	this.find( 'optgroup' ).each(function () {
		hasCategory = true;
		$(selectList).append($('<li class="bel-option-disabled">'+$(this).attr("label")+'</li>'));

		$(this).find( 'option' ).each(function () {
			$(selectList).append($('<li class="bel-option" onclick="updateBelSelect(\''+elementId+'\', \''+$(this).attr('value')+'\', this.innerHTML, this);">'+$(this).text()+'</li>'));
			if($(this).prop('selected')){
				selectedLabel = $(this).text();
			}
		});

	});

	$(document).click(function(event) { 
	    if($(event.target.parentElement)[0].id !== selectDiv[0].id) {
	        if(selectList.is(":visible")) {
	        	displayBelOption(selectList[0].id, elementId+"Label");
	        }
	    }        
});

	$(selectDiv).append($('<label id="'+elementId+'Label" class="bel-select bel-select-'+size+' bel-select-default bel-select-close-icon"  onclick="displayBelOption(\''+elementId+'List\', \''+elementId+'Label\');">'+selectedLabel+'</label>'));
	$(selectDiv).append($(selectList));

	this.before( selectDiv);

	this.addClass('bel-box-hidden');
};

function toggleTable(tableId){
	$("#tBody"+tableId ).toggle(500);
	$("#thead"+tableId ).toggle(500);
	if ($("#caption"+tableId ).hasClass('bel-table-open-icon')) {
	$("#caption"+tableId ).removeClass('bel-table-open-icon');
	$("#caption"+tableId ).addClass('bel-table-close-icon');
	}else{
		$("#caption"+tableId ).addClass('bel-table-open-icon');
	$("#caption"+tableId ).removeClass('bel-table-close-icon');
	}
}


/**
 *Funcionalidad para el componente input Mostrar - Ocultar
 *
 */
$.fn.blueInputPasswordType = function(inputId, inputSize, show, hide){
	 $('#'+inputId).removeClass();
	 $('#'+inputId).addClass("bel-input--icon bel-input--icon-"+inputSize.toLowerCase()+" bel-input-default");
	 $('#'+inputId).prop("type", "password");
	 $('#'+inputId).css("padding-right", "71px");
	 var selectDiv = $('<span onclick="validateShowElementLabel(\''+inputId+'\',this,\''+show+'\',\''+hide+'\' )" style="margin-left: -26px;color:#6D6E71; font-size: 14px; cursor:pointer;" class="bel-validation-icon bel-typography bel-typography-label">Mostrar</span>');
	 $('#'+inputId).after( selectDiv);
};


function validateShowElementLabel(inputId, spanObject, show, hide){
 if ($('#'+inputId).val()!="") {
	 if ( $('#'+inputId).is('input:text')) {
		 $('#'+inputId).removeAttr("type", "text");
		 $('#'+inputId).prop("type", "password");
		 $(spanObject).text(show);
	 }else{
		 $('#'+inputId).removeAttr("type", "password");
		 $('#'+inputId).prop("type", "text");
		 $('#'+inputId).prop("type", "text");
		 $(spanObject).text(hide);
	 }
 }
}

/**
	Funciona que recibe el idioma en que se encuentra la sucursal para cargar el date picker
*/
function loadDatePicker(idDatepicker ,languaje){

	var langujesForDatePicker = {};
	langujesForDatePicker.es = {
		months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      	days: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
	};
	langujesForDatePicker.en = {
		months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December'],
    	days: ['Sunday', 'Monday', 'Tuesdar', 'Wednesday', 'Thrusday', 'Friday', 'Saturday']
	};


	$('#' + idDatepicker).Zebra_DatePicker({
   		months: langujesForDatePicker[languaje].months,
   		days: langujesForDatePicker[languaje].days,

   	});
}

/*
	Uso de parametros
	idContainer: id del div donde se inyecta el componente
	alertType: tipo de alerta (1:informativo, 2:correcto, 3:error, 4:alerta)
	iconClass: Clase del icono
	title: titulo del mensaje
	message: Texto del mensaje
	buttonText: texto del botÃ³n
	buttonUrl: Url del botÃ³n

	Nota: En caso de no necesitar botÃ³n o tÃ­tulo dejar el parametro en null.
*/

//Metodo que crea el contenedor de los mensajes con la informacion del mensaje
function createAlertMessage(idContainer, alertType, iconClass, title, message, buttonText, buttonUrl) {
	var mainContainer = document.getElementById(idContainer);
	var navInfo = getBrowserInfo();

	// Estilo del componente (tipo, color, icono)
	var row = $("<div/>").addClass("bel-grid-row");
	var column = $("<div/>").addClass("bel-col-12").appendTo(row);
	var alertMessage = $("<div/>").addClass("bel-alertMessage").appendTo(column);
	var alertClass = getAlertClassByType(alertType);
	//Valida si el navegador es IE
	if (navInfo.indexOf('IE') != -1) {alertClass+="-ie9";}
	var alertMessagetype = $("<div/>").addClass(alertClass).appendTo(alertMessage);
	var alertMessageIconContainer = $("<div/>").addClass("bel-alertMessage-icon-container").appendTo(alertMessagetype);
	var alertMessageIcon = $("<div/>").addClass(iconClass +" bel-alertMessage-icon").appendTo(alertMessageIconContainer);
	// Contenido del componente (tÃ­tulo, texto)

	if(buttonText != null && buttonText != "") {
		var alertMessageContent = $("<div/>").addClass("bel-display-inline bel-alertMessage_content").appendTo(alertMessage);
	}else{
		var alertMessageContent = $("<div/>").addClass("bel-display-inline bel-alertMessage_content-full").appendTo(alertMessage);
	}

	if(title != null && title != "") {
		var titleSpace = $("<div/>").addClass("bel-space-bottom-xs").appendTo(alertMessageContent);
		var titleClass = "bel-typography bel-typography-h3";
		//Valida si el navegador es IE
		if (navInfo.indexOf('IE') != -1) {titleClass+=" bel-alertMessage-margin-ie9";}
		var titleText = $("<h3/>").addClass(titleClass).append(title).appendTo(alertMessageContent);
	}else{
			if (navInfo.indexOf('IE') != -1){
				var titleSpace = $("<div/>").addClass("bel-space-bottom-xs").appendTo(alertMessageContent);
			}
	}

	if(message != null && message != "") {
		var messsageTextContainer = $("<div/>").appendTo(alertMessageContent);
		var messageClass = "bel-typography bel-typography-p";
		//Valida si el navegador es IE
		if (navInfo.indexOf('IE') != -1) {messageClass+=" bel-alertMessage-margin-ie9";}
		var messsageText = $("<p/>").addClass(messageClass).append(message).appendTo(messsageTextContainer);
	}
	// Contenido del componente (botÃ³n)
	if(buttonText != null && buttonText != ""){
		var alertMessageButton = $("<div/>").addClass("bel-alertMessage_button bel-display-inline").appendTo(alertMessage);
		var alertMessageButtonContainer = $("<div/>").addClass("bel-display-inline").appendTo(alertMessageButton);
		var button = $("<button/>").addClass("bel-btn bel-btn-secondary bel-btn-secondary-active").append(buttonText).appendTo(alertMessageButtonContainer);
		button.click(function(){window.location.href=buttonUrl;});
	}
	row.appendTo(mainContainer);
}

function getAlertClassByType(alertType){
	switch (alertType) {
		case 1: return "bel-alertMessage_grayIcon"; break;
		case 2: return "bel-alertMessage_greenIcon"; break;
		case 3: return "bel-alertMessage_redIcon"; break;
		case 4: return "bel-alertMessage_orangeIcon"; break;
		default: return "bel-alertMessage_grayIcon"; break;

	}
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