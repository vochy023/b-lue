// REVISION ------ 1.0
// SP: ----------- CRI-025171
// DATE: --------- 19-02-2018
// DESCRIPTION: -- funciones para los elementos: campo de texto, textarea y combo de seleccion
// AUTHOR: ------- jcastillov (1.0)
// WORKTEAM: ----- Codebreakers-Anonymous (1.0)
// version 1.0


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
});

// select
function updateBelSelect(idList, idLabel, optionText, element) {
	document.getElementById(idLabel).innerHTML = optionText;
	$("#" + idLabel).addClass("bel-select-filled");
	$("#" + idList).removeClass("bel-display-list");
	$("#" + idLabel).removeClass('bel-select-open-icon');
	$("#" + idLabel).addClass('bel-select-close-icon');
	var allOptions = $("#" + idList).children('li');
	allOptions.removeClass('selected');
	$(element).addClass('selected');
}

function displayBelOption(idList, idLabel) {
	if ($('#' + idLabel).hasClass('bel-select-open-icon')) {
		$("#" + idLabel).removeClass('bel-select-open-icon');
		$("#" + idLabel).addClass('bel-select-close-icon');
		$("#" + idList).removeClass("bel-display-list");
	} else {
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
			jQueryFileScript.src = '/jquery-1.7.2.js';
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
validateJQuery();
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
	} else {
		alert("Número de pasos esta por encima de la capacidad de Wizard");
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

// Funcion para animacion de Contando
var belRemaingTimeForFinishUserSession = 10;
var startLoadingTime = 1000;
var belShowMessageTimeout = null;
var belSetTimerForFinishTheSession = null;
var belCircleInterval = null;

//belShowMessageTimeout = setTimeout(belShowMessageTimer, startLoadingTime);

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
        	alert("se acabo el tiempo");
        	clearInterval(belCircleInterval);
        }
    }, 1000);
}

// Fin funcion animacion contador
