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
		scrollToElement('#' + idLabel);
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
}

function scrollToElement(elementID){
	$('html').animate({
	    scrollTop: $(elementID).offset().top
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
	this.attr('class', 'bel-tab-container');
	this.find( "div" ).each(function () {
		$(this).attr('class', 'bel-tab-container__bel-tab-content');
	});
	this.find( "ul" ).each(function () {
		$(this).attr('class', 'bel-tab-container__bel-tab-ul');
	});
	this.find( "ul" ).find( "li" ).each(function () {
		var tab = $(this).find('a').attr( "href" );
		$(this).find('a').attr('class', 'bel-tab-container__bel-tab-a');
		$(this).click(function(){
			$(tabContiner).find( "div" ).each(function () {
				$(this).hide();
			});
			$(tabContiner).find( "ul" ).find( "li" ).each(function () {
				$(this).attr('class', 'bel-tab-container__bel-tab tab-unselected');
			});
			$(this).attr('class', 'bel-tab-container__bel-tab tab-selected');
			$(tab).show();
		});

		if("#"+tabSelected == tab){
			$(this).attr('class', 'bel-tab-container__bel-tab tab-selected');
			$(this).click();
		}else{
			$(this).attr('class', 'bel-tab-container__bel-tab tab-unselected');
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
		alert("Número de pasos esta por encima de la capacidad de Wizard");
	}
}

function animationProgressBar(steps, selectedStep){

	if(selectedStep > steps){
			alert("El paso actúal elegido es mayor a la cantidad de pasos disponible");
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
	}
}
// Fin funcion animacion contador


function closeModal(box, modal){
	document.getElementById(box).classList.remove('bel-box-visible');
	document.getElementById(modal).classList.remove('bel-modal-visible');
	document.getElementById(box).classList.add('bel-box-hidden');
	document.getElementById(modal).classList.add('bel-modal-hidden');
}

function openModal(box, modal){
	document.getElementById(box).classList.remove('bel-box-hidden');
	document.getElementById(modal).classList.remove('bel-modal-hidden');
	document.getElementById(box).classList.add('bel-box-visible');
	document.getElementById(modal).classList.add('bel-modal-visible');
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
 			$('#'+spanId).text("Formato no válido");
 		}
 	}
 	if (cantidad==maxEmails && inputTextAux!="") {
 		$('#'+spanId).removeClass('bel-validation-icon bel-validation-icon-success-s bel-hide-element');
 		$('#'+inputId).addClass('bel-input-error');
 		$("#"+inputId).val("");
 		$('#'+spanId).addClass('el-typography-main bel-typography-label-error');
 		$('#'+spanId).text("No se pueden agregar más correos");
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


$.fn.blueSelect = function(size, label){
	if(this.attr('id') == undefined){
		this.attr('id', this.attr('name'));
	}
	var elementId = this.attr('id');
	this.removeClass();
	this.removeAttr( 'style' );
	var hasCategory = false;
	
	
	var selectedLabel = null;
	
	var selectDiv = $("<div></div>")
	
	var selectList = $('<ul id="'+elementId+'List" class="bel-option-list bel-option-list-'+size+'"></ul>')
	
	$(this).children( 'option' ).each(function () {
		if($(this).prop('disabled')){
			$(selectList).append($('<li class="bel-option-disabled">'+$(this).text()+'</li>')); 
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
	
		
	$(selectDiv).append($('<label id="'+elementId+'Label" class="bel-select bel-select-'+size+' bel-select-default bel-select-close-icon"  onclick="displayBelOption(\''+elementId+'List\', \''+elementId+'Label\');">'+selectedLabel+'</label>'));
	$(selectDiv).append($(selectList));
	
	this.before( selectDiv);
	
	this.addClass('bel-box-hidden');
};
