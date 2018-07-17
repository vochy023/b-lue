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

// select
function updateBelSelect(id, value, optionText, element) {
	document.getElementById(id + "Label").innerHTML = optionText;
	$BLUEJQuery("#" + id + "Label").addClass("bel-select-filled");
	$BLUEJQuery("#" + id + "List").removeClass("bel-display-list");
	$BLUEJQuery("#" + id + "Label").removeClass('bel-select-open-icon');
	$BLUEJQuery("#" + id + "Label").addClass('bel-select-close-icon');
	var allOptions = $BLUEJQuery("#" + id + "List").children('li');
	allOptions.removeClass('selected');
	$BLUEJQuery(element).addClass('selected');
	$BLUEJQuery('#'+id+' option:selected').removeAttr("selected");
	$BLUEJQuery('#'+id+' option[value="'+value+'"]').attr('selected', 'selected');
	$BLUEJQuery("#" + id).trigger("change");
}


function displayBelOption(idList, idLabel) {
	if ($BLUEJQuery('#' + idLabel).hasClass('bel-select-open-icon')) {
		$BLUEJQuery("#" + idLabel).removeClass('bel-select-open-icon');
		$BLUEJQuery("#" + idLabel).addClass('bel-select-close-icon');
		$BLUEJQuery("#" + idList).removeClass("bel-display-list");
	} else {
		scrollToGroup("#" + idLabel);
		var allOptions = $BLUEJQuery(".bel-option-list");
		allOptions.removeClass('bel-display-list');
		var allSelectLabels = $BLUEJQuery(".bel-select");
		allSelectLabels.removeClass('bel-select-open-icon');
		allSelectLabels.addClass('bel-select-close-icon');
		if (!$BLUEJQuery('#' + idLabel).hasClass('bel-select-disabled')) {
			var allOptions = $BLUEJQuery("#mySelect").children('li');
			allOptions.removeClass('selected');
			$BLUEJQuery('#' + idList).toggleClass('bel-display-list');
			$BLUEJQuery("#" + idLabel).addClass('bel-select-open-icon');
		}
	}
}

function displayDownloadOption(idList, idLabel) {
	if (document.getElementById("downloadOptions").style.display == "block" ) {
		$BLUEJQuery("#" + idList).removeClass("bel-download-options");
		$BLUEJQuery("#" + idLabel).removeClass("bel-download-open");
		document.getElementById("downloadOptions").style.display = "none";
		document.getElementById(idList).style.display = "none";
	} else {
		scrollToElement('#' + idLabel);
		var allOptions = $BLUEJQuery(".bel-option-list");
		var allSelectLabels = $BLUEJQuery(".bel-select");
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
	    if(event.target.parentElement !== $BLUEJQuery("#" + idList)[0].parentElement) {
	        if($BLUEJQuery('#'+idList).is(":visible")) {
	        	$BLUEJQuery("#" + idList).removeClass("bel-download-options");
				$BLUEJQuery("#" + idLabel).removeClass("bel-download-open");
				document.getElementById("downloadOptions").style.display = "none";
				document.getElementById(idList).style.display = "none";
	        }
	    }
	}); 
}

function scrollToElement(elementID){
	$BLUEJQuery('html').animate({
	    scrollTop: $BLUEJQuery(elementID).offset().top
	  }, 1000);
}

function scrollToGroup(groupId){
	$BLUEJQuery('html').animate({
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

function OnInput(e) {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}

//funcion tab
//Caga los textos al hacer click en los tabs
$BLUEJQuery.fn.makeTabs = function(tabSelected){
	var tabContiner = this;
	this.attr('class', 'bel-tab');
	this.find( "div" ).each(function () {
		$BLUEJQuery(this).attr('class', 'bel-tab-container__bel-tab-content');
	});
	this.find( "ul" ).each(function () {
		$BLUEJQuery(this).attr('class', 'bel-tab-container');
	});
	this.find( "ul" ).find( "li" ).each(function () {
		var tab = $BLUEJQuery(this).find('a').attr( "href" );
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

		var processList = $BLUEJQuery('<ul class="bel-wizard"></ul>');
		for (var i = 0; i < steps; i++) {
			var step = $BLUEJQuery('<li class="bel-wizard-li bel-wizard-step-inactive bel-wizard-steps-'
					+ steps
					+ '"><label id="step'
					+ (i + 1)
					+ '" class="bel-wizard-label bel-wizard-label-inactive">'
					+ messagesStep[i] + '</label></li>');
			if ((i + 1) == selectedStep) {
				step = $BLUEJQuery('<li class="bel-wizard-li bel-wizard-step-active bel-wizard-steps-'
						+ steps
						+ '"><label id="step'
						+ (i + 1)
						+ '" class="bel-wizard-label bel-wizard-label-active">'
						+ messagesStep[i] + '</label></li>');
			} else if ((i + 1) < selectedStep) {
				step = $BLUEJQuery('<li class="bel-wizard-li bel-wizard-step-completed bel-wizard-steps-'
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
		alert("NÃƒÂºmero de pasos esta por encima de la capacidad de Wizard");
	}
}

function animationProgressBar(steps, selectedStep){

	if(selectedStep > steps){
			alert("El paso actÃƒÂºal elegido es mayor a la cantidad de pasos disponible");
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
	if ( $BLUEJQuery( "#belSeconds" ).length ) {

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
    $BLUEJQuery('.bel-timer-cont__circle').css('stroke-dashoffset', 300);
	    belExecuteCircleTimer();
	}
function belExecuteCircleTimer() {
    var time = belRemaingTimeForFinishUserSession;
    var timer = $BLUEJQuery('#belSeconds')[0];
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
            $BLUEJQuery('.bel-timer-cont__circle').css('stroke-dashoffset',
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

 			var inputAux = document.createElement("input");
 			inputAux.className = "bel-input--icon bel-input--icon-m bel-input-default bel-input-non-editable";
 			inputAux.setAttribute('type','text');
 			inputAux.setAttribute('value', inputTextAux);
 			$BLUEJQuery("#"+inputId).val("");
 			belClearInputMain(spanId,inputId);

 			var spanAux = document.createElement("span");
 			spanAux.className = "bel-error-validation bel-error-validation-item";
 			spanAux.setAttribute('onclick','belDeleteEmailCont(this)');

 			contAux.appendChild(inputAux);
 			contAux.appendChild(spanAux);
 			belMoreEmailsContId.appendChild(contAux);
 		}else{
 			$BLUEJQuery('#'+inputId).addClass('bel-input-error');
 			$BLUEJQuery('#'+spanId).addClass('el-typography-main bel-typography-label-error');
 			$BLUEJQuery('#'+spanId).removeClass('bel-hide-element');
 			$BLUEJQuery('#'+spanId).text("Formato no vÃƒÂ¡lido");
 		}
 	}
 	if (cantidad==maxEmails && inputTextAux!="") {
 		$BLUEJQuery('#'+spanId).removeClass('bel-validation-icon bel-validation-icon-success-s bel-hide-element');
 		$BLUEJQuery('#'+inputId).addClass('bel-input-error');
 		$BLUEJQuery("#"+inputId).val("");
 		$BLUEJQuery('#'+spanId).addClass('el-typography-main bel-typography-label-error');
 		$BLUEJQuery('#'+spanId).text("No se pueden agregar mÃƒÂ¡s correos");
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
 	$BLUEJQuery( element ).parent(".bel-col-7").remove();
 	$BLUEJQuery( element ).parent(".bel-space-top-xs").remove();
 }

 function belValidateEmail(inputId, spanId) {
 	var email = $BLUEJQuery('#'+inputId).val();
 	if (email!="") {
 		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$BLUEJQuery/;
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


$BLUEJQuery.fn.blueSelect = function(size){
	if(this.attr('id') == undefined){
		this.attr('id', this.attr('name'));
	}
	var elementId = this.attr('id');
	this.removeClass();
	this.removeAttr( 'style' );
	var hasCategory = false;


	var selectedLabel = null;

	var selectDiv = $BLUEJQuery("<div id='"+ elementId +"Div'></div>");

	var selectList = $BLUEJQuery('<ul id="'+elementId+'List" class="bel-option-list bel-option-list-'+size+'"></ul>')

	$BLUEJQuery(this).children( 'option' ).each(function () {
		if($BLUEJQuery(this).prop('disabled')){
			if($BLUEJQuery(this).attr('value') != '-1'){
				$BLUEJQuery(selectList).append($BLUEJQuery('<li class="bel-option-disabled">'+$BLUEJQuery(this).text()+'</li>'));
			}
		}else{
			$BLUEJQuery(selectList).append($BLUEJQuery('<li class="bel-option" onclick="updateBelSelect(\''+elementId+'\', \''+$BLUEJQuery(this).attr('value')+'\', this.innerHTML, this);">'+$BLUEJQuery(this).text()+'</li>'));
		}
		if($BLUEJQuery(this).prop('selected')){
			selectedLabel = $BLUEJQuery(this).text();
		}
	});
	this.find( 'optgroup' ).each(function () {
		hasCategory = true;
		$BLUEJQuery(selectList).append($BLUEJQuery('<li class="bel-option-disabled">'+$BLUEJQuery(this).attr("label")+'</li>'));

		$BLUEJQuery(this).find( 'option' ).each(function () {
			$BLUEJQuery(selectList).append($BLUEJQuery('<li class="bel-option" onclick="updateBelSelect(\''+elementId+'\', \''+$BLUEJQuery(this).attr('value')+'\', this.innerHTML, this);">'+$BLUEJQuery(this).text()+'</li>'));
			if($BLUEJQuery(this).prop('selected')){
				selectedLabel = $BLUEJQuery(this).text();
			}
		});

	});

	$BLUEJQuery(document).click(function(event) { 
	    if($BLUEJQuery(event.target.parentElement)[0].id !== selectDiv[0].id) {
	        if(selectList.is(":visible")) {
	        	displayBelOption(selectList[0].id, elementId+"Label");
	        }
	    }        
});

	$BLUEJQuery(selectDiv).append($BLUEJQuery('<label id="'+elementId+'Label" class="bel-select bel-select-'+size+' bel-select-default bel-select-close-icon"  onclick="displayBelOption(\''+elementId+'List\', \''+elementId+'Label\');">'+selectedLabel+'</label>'));
	$BLUEJQuery(selectDiv).append($BLUEJQuery(selectList));

	this.before( selectDiv);

	this.addClass('bel-box-hidden');
};

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
function toggleInfoBox(elementID){	
	$BLUEJQuery("#toggleInfo"+elementID).slideToggle(500);
	if ($BLUEJQuery("#toggleArrow"+elementID).hasClass('bel-icon-arrow-down-xxs')) {
		$BLUEJQuery("#toggleArrow"+elementID).removeClass('bel-icon-arrow-down-xxs');
		$BLUEJQuery("#toggleArrow"+elementID ).addClass('bel-icon-arrow-up-xxs');
	}else{
		$BLUEJQuery("#toggleArrow"+elementID).addClass('bel-icon-arrow-down-xxs');
		$BLUEJQuery("#toggleArrow"+elementID).removeClass('bel-icon-arrow-up-xxs');
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
	 var selectDiv = $BLUEJQuery('<span onclick="validateShowElementLabel(\''+inputId+'\',this,\''+show+'\',\''+hide+'\' )" style="margin-left: -26px;color:#6D6E71; font-size: 14px; cursor:pointer;" class="bel-validation-icon bel-typography bel-typography-label">Mostrar</span>');
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
	var alertMessageIconContainer = $BLUEJQuery("<div/>").addClass("bel-alertMessage-icon-container").appendTo(alertMessagetype);
	var alertMessageIcon = $BLUEJQuery("<div/>").addClass(iconClass +" bel-alertMessage-icon").appendTo(alertMessageIconContainer);
	// Contenido del componente (tÃƒÂ­tulo, texto)

	if(buttonText != null && buttonText != "") {
		var alertMessageContent = $BLUEJQuery("<div/>").addClass("bel-display-inline bel-alertMessage_content").appendTo(alertMessage);
	}else{
		var alertMessageContent = $BLUEJQuery("<div/>").addClass("bel-display-inline bel-alertMessage_content-full").appendTo(alertMessage);
	}

	if(title != null && title != "") {
		var titleSpace = $BLUEJQuery("<div/>").addClass("bel-space-bottom-xs").appendTo(alertMessageContent);
		var titleClass = "bel-typography bel-typography-h3";
		//Valida si el navegador es IE
		if (navInfo.indexOf('IE') != -1) {titleClass+=" bel-alertMessage-margin-ie9";}
		var titleText = $BLUEJQuery("<h3/>").addClass(titleClass).append(title).appendTo(alertMessageContent);
	}else{
			if (navInfo.indexOf('IE') != -1){
				var titleSpace = $BLUEJQuery("<div/>").addClass("bel-space-bottom-xs").appendTo(alertMessageContent);
			}
	}

	if(message != null && message != "") {
		var messsageTextContainer = $BLUEJQuery("<div/>").appendTo(alertMessageContent);
		var messageClass = "bel-typography bel-typography-p";
		//Valida si el navegador es IE
		if (navInfo.indexOf('IE') != -1) {messageClass+=" bel-alertMessage-margin-ie9";}
		var messsageText = $BLUEJQuery("<p/>").addClass(messageClass).append(message).appendTo(messsageTextContainer);
	}
	// Contenido del componente (botÃƒÂ³n)
	if(buttonText != null && buttonText != ""){
		var alertMessageButton = $BLUEJQuery("<div/>").addClass("bel-alertMessage_button bel-display-inline").appendTo(alertMessage);
		var alertMessageButtonContainer = $BLUEJQuery("<div/>").addClass("bel-display-inline").appendTo(alertMessageButton);
		var button = $BLUEJQuery("<button/>").addClass("bel-btn bel-btn-secondary bel-btn-secondary-active").append(buttonText).appendTo(alertMessageButtonContainer);
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

$BLUEJQuery.fn.blueTable = function(properties){
	
	var elementId = $BLUEJQuery(this).attr('id');

	this.removeClass();
	$BLUEJQuery(this).addClass("bel-hide-element");
	
	 makeCaption(this, properties);
	
	 makeHeader(this, properties);
	 
	 makeBody(this, properties);
	 
	 makefooter(this, properties);
	 
	$BLUEJQuery(this).addClass("bel-table");
	$BLUEJQuery(this).removeClass("bel-hide-element");
	$BLUEJQuery(this).addClass("bel-display-block");
	
};
function makeBody(element, properties){
	var trCounter = 1;
	var thCounter = 0;
	var maxItemsCollapsed = 3;
	
	
	var extensibleLabel = 'Ver m&aacute;s'; 
	var collapseLabel = 'Ver menos';
	if(properties.extensible && properties.extensibleLabel != undefined){
		extensibleLabel = properties.extensibleLabel;
	}if(properties.extensible && properties.collapseLabel != undefined){
		collapseLabel = properties.collapseLabel;
	}
	
	if(properties.extensible && properties.maxItemsCollapsed != undefined){
		maxItemsCollapsed = properties.maxItemsCollapsed;
	}
	$BLUEJQuery(element).find( 'tbody' ).each(function () {
		$BLUEJQuery(this).attr("id", "tbody" + $BLUEJQuery(element).attr("id") );
		$BLUEJQuery(this).find( 'tr' ).each(function () {
			thCounter = 0;
			$BLUEJQuery(this).addClass("bel-table_row bel-table_border-column");
			if(properties.rowHover ){
				$BLUEJQuery(this).addClass("bel-generic-hover");
			}

			$BLUEJQuery(this).find( 'td' ).each(function () {
				if(properties.tdAlign != undefined && properties.tdAlign[thCounter] != undefined ){
					$BLUEJQuery(this).css("text-align", properties.tdAlign[thCounter]);
				}	
					
				 $BLUEJQuery(this).addClass("bel-table_column_default");
				thCounter++;
			});
			if(properties.extensible && trCounter > maxItemsCollapsed){
				$BLUEJQuery(this).addClass("bel-hide-element");
			}
			trCounter++;
		});
		if(properties.extensible && trCounter > maxItemsCollapsed){
			$BLUEJQuery(this).append( "<tr id='seTR"+$BLUEJQuery(element).attr("id")+"'><td colspan='"+thCounter+"' class='bel-extensive-menu_link'><a class='bel-typography bel-typography-link bel-icon-arrow-down-xxs' href='javascript:void(0)' onclick='showMoreItems(\""+$BLUEJQuery(element).attr("id")+"\", "+maxItemsCollapsed+")'>"+extensibleLabel+"</a></td></tr>");
			$BLUEJQuery(this).append( "<tr id='heTR"+$BLUEJQuery(element).attr("id")+"' class='bel-hide-element'><td colspan='"+thCounter+"' class='bel-extensive-menu_link'><a class='bel-typography bel-typography-link bel-icon-arrow-up-xxs' href='javascript:void(0)' onclick='hideItems(\""+$BLUEJQuery(element).attr("id")+"\", "+maxItemsCollapsed+")'>"+collapseLabel+"</a></td></tr>");
		}
	});

	if(properties.extensible && maxItemsCollapsed == (trCounter - 1)){
		$BLUEJQuery("#seTR"+$BLUEJQuery(element).attr("id")).remove();
		$BLUEJQuery("#heTR"+$BLUEJQuery(element).attr("id")).remove();
	}

}

function showMoreItems(tableId, maxItemsCollapsed){
	$BLUEJQuery('#' + tableId + ' .bel-table_row.bel-hide-element').show(800);
	$BLUEJQuery("#seTR"+tableId).hide();
	$BLUEJQuery("#heTR"+tableId).show();
}


function hideItems(tableId, maxItemsCollapsed){
	
	$BLUEJQuery('#' + tableId + ' .bel-table_row.bel-hide-element').hide(800);
	
	$BLUEJQuery("#heTR"+tableId).hide();
	$BLUEJQuery("#seTR"+tableId).show();
}
function makefooter(element, properties){
	
	$BLUEJQuery(element).find( 'tfoot' ).each(function () {
		this.id = "tfoot" + $BLUEJQuery(element).attr("id");
		 $BLUEJQuery(this).addClass("bel-table_tfoot");
		$BLUEJQuery(this).find( 'tr' ).each(function () {
			var thCounter = 0;
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
	
	$BLUEJQuery(element).find( 'thead' ).each(function () {
		$BLUEJQuery(this).attr("id", "thead" + $BLUEJQuery(element).attr('id'));
		$BLUEJQuery(this).addClass("bel-table_thead");
		$BLUEJQuery(this).find( 'tr' ).each(function () {
			var thCounter = 0;
			$BLUEJQuery(this).find( 'th' ).each(function () {
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

	$BLUEJQuery(element).find( 'caption' ).each(function () {
		headerLeftGrupDiv =  $BLUEJQuery("<div></div>").addClass("bel-table_caption-group");
		var caption = this;
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
				$BLUEJQuery(this).addClass("bel-btn bel-btn-secondary bel-btn-secondary-active");
				$BLUEJQuery(headerRigthtGrupDiv).append($BLUEJQuery(this));
			});
		$BLUEJQuery(this).children( 'select' ).each(function () {
				headerRigthtGrupDiv = $BLUEJQuery("<div></div>").addClass("bel-table_caption-group bel-table_caption-select bel-position-right");
				$BLUEJQuery(headerRigthtGrupDiv).append( $BLUEJQuery(this));
			});
			
			
		}
		
		if(null != headerRigthtGrupDiv){
			$BLUEJQuery(this).append( $BLUEJQuery(headerRigthtGrupDiv));
		}
	});
}

//Comparative Menu
function checkedComparativeMenu() {
	$BLUEJQuery(".bel-comparative-menu").each(isChecked)
}

function isChecked() {
  var checked = $BLUEJQuery(this).find(".bel-radio-button").is(":checked")
  $BLUEJQuery(this).toggleClass("bel-comparative-menu-active", checked)
  $BLUEJQuery(this).removeClass("bel-comparative-menu-default")
}
function permuteTextContend(elementId, permutableTextElement1, permutableTextElement2){
	if($('#'+elementId).text() == permutableTextElement1){
		$('#'+elementId).text(permutableTextElement2);
	}else{
		$('#'+elementId).text(permutableTextElement1);
	}
	
}


$BLUEJQuery.fn.comparativeMenu = function(){
	var itemsCount = 0;
	var comparativeMenuClass = "bel-comparative-menu";
	$BLUEJQuery(this).css("list-style-type", "none");
	$BLUEJQuery(this).find( 'li' ).each(function () {
		itemsCount++;
	});
	if(itemsCount < 3){
		comparativeMenuClass = "bel-comparative-menu_large";
	}
	itemsCount = 1;
	$BLUEJQuery(this).find( 'li' ).each(function () {
		if(itemsCount > 4){
			$BLUEJQuery(this).remove();
		}else{
			$BLUEJQuery(this).css("float", "left");
			var comparativeMenuItem = $BLUEJQuery('<div class="'+comparativeMenuClass+'"></div>');
			var inputRadio;
			var inputRadioLabel;
			$BLUEJQuery(this).children( 'input' ).each(function () {
				inputRadio = $BLUEJQuery(this);
			});
			$BLUEJQuery(this).children( 'label' ).each(function () {
				inputRadioLabel = $BLUEJQuery(this);
			});
			
			var sectionHeader = $BLUEJQuery('<div id="comparativeMenuHead" class="bel-comparative-menu-default bel-comparative-menu__head">' +
		            '<div class="bel-selection-input">' +
		            '<input class="bel-radio-button" type="radio" id="an-id'+itemsCount+'" name="'+$BLUEJQuery(inputRadio).attr('name')+'" value="'+$BLUEJQuery(inputRadio).attr('value')+'" onclick="checkedComparativeMenu()"> ' +
		            '<label class="bel-radio-button-icon" for="an-id'+itemsCount+'"></label> ' +
		            '<label class="bel-radio-button-text" for="an-id'+itemsCount+'">'+$BLUEJQuery(inputRadioLabel).text()+'</label>' +
	            '</div>' +
			'</div>');
			
			var sectionBody = $BLUEJQuery('<div id="comparativeMenuContent" class="bel-comparative-menu-default bel-comparative-menu__content"></div>');
			var sectionBodyImage;
			var bodyArticle = $BLUEJQuery('<div class="bel-comparative-menu__content__information  bel-border-top bel-padding-s"></div>');
			var bodyAside = $BLUEJQuery('<div class="bel-comparative-menu__content__information"></div>');
			var bodyAsideDetails = $BLUEJQuery('<div class="bel-comparative-menu__content__information"></div>');
			var bodyArticleTitle = $BLUEJQuery('<div class="bel-padding-s"></div>');
			var bodyArticleContend = $BLUEJQuery('<div class="bel-space-left-s bel-space-bottom-s"></div>');
			var bodyArticleTitleDetails = $BLUEJQuery('<div class="bel-padding-horizontal-s bel-space-top-s"></div>');
			var bodyArticleContendDetails = $BLUEJQuery('<div class="bel-padding-s"></div>');
			var copy = $BLUEJQuery('<div class="bel-padding-s"></div>');
			
			var bodyDetails = $BLUEJQuery('<div class="bel-comparative-menu__content__footer bel-border-top"></div>');
			
			$BLUEJQuery(this).children( 'section' ).each(function () {
				$BLUEJQuery(this).children( 'img' ).each(function () {
					sectionBodyImage = $BLUEJQuery('<div class="bel-comparative-menu__content__image  bel-border-bottom"> <img src="'+$BLUEJQuery(this).attr('src')+'" alt="'+$BLUEJQuery(this).attr('alt')+'" height="90" width="'+$BLUEJQuery(this).attr('width')+'"/> </div>');
					sectionBody.append(sectionBodyImage);
				});
				
				$BLUEJQuery(this).children( 'aside' ).each(function () {
					bodyAside.append($BLUEJQuery(this).html());
					$BLUEJQuery(sectionBody).append(bodyAside);
				});
				
				$BLUEJQuery(this).children( 'article' ).each(function () {
					
					
					$BLUEJQuery(this).children( 'h4' ).each(function () {
						$BLUEJQuery(this).addClass("bel-typography bel-typography-h4");
						$BLUEJQuery(bodyArticleTitle).append($BLUEJQuery(this));
						$BLUEJQuery(bodyArticle).append(bodyArticleTitle);
						
					});
					
					$BLUEJQuery(this).children( 'h5' ).each(function () {
						$BLUEJQuery(this).addClass("bel-typography bel-typography-h5");
					});
					$BLUEJQuery(sectionBody).append(bodyArticle);
					bodyArticle.append($BLUEJQuery(this).html());
				});
				
				
				
				
				$BLUEJQuery(this).children( 'details' ).each(function () {
					var detailsArticle = $BLUEJQuery('<div id="toggleInfo'+itemsCount+'" class="bel-space-top-s bel-display-none" ></div>');
					
					$BLUEJQuery(this).children( 'aside' ).each(function () {
						bodyAsideDetails.append($BLUEJQuery(this).html());
						$BLUEJQuery(detailsArticle).append(bodyAsideDetails);
					});
					
					$BLUEJQuery(this).children( 'article' ).each(function () {
						
						
						$BLUEJQuery(this).children( 'h4' ).each(function () {
							$BLUEJQuery(this).addClass("bel-typography bel-typography-h4");
							$BLUEJQuery(bodyArticleTitleDetails).append($BLUEJQuery(this));
							$BLUEJQuery(detailsArticle).append(bodyArticleTitleDetails);
							
						});
						
						$BLUEJQuery(this).children( 'h5' ).each(function () {
							$BLUEJQuery(this).addClass("bel-typography bel-typography-h5");
							$BLUEJQuery(bodyArticleContendDetails).append($BLUEJQuery(this));
							$BLUEJQuery(detailsArticle).append(bodyArticleContendDetails);
						});
						
						$BLUEJQuery(detailsArticle).append($BLUEJQuery(this).html());
	
					});
						
					

					$BLUEJQuery(bodyDetails).append(detailsArticle);
					
					var showDetailsLabel;
					var hideDetailsLabel;
					$BLUEJQuery(this).children( 'summary' ).each(function () {
						showDetailsLabel = $BLUEJQuery(this).text().substr(0,$BLUEJQuery(this).text().indexOf("|"));
						hideDetailsLabel = $BLUEJQuery(this).text().substr($BLUEJQuery(this).text().indexOf("|")+1,$BLUEJQuery(this).text().length);
					});
					
					
					
					var detailsOption = $BLUEJQuery('<div onclick="toggleInfoBox('+itemsCount+'); permuteTextContend(\'toggleArrow'+itemsCount+'\', \''+showDetailsLabel+'\', \''+hideDetailsLabel+'\');" class="bel-space-top-s bel-space-bottom-m bel-position-right">' + 
		                '<a id="toggleArrow'+itemsCount+'"  class="bel-typography-link bel-icon-arrow-down-xxs">'+showDetailsLabel+'</a>' + 
		            '</div>');
					
					$BLUEJQuery(bodyDetails).append($BLUEJQuery(detailsOption));
					$BLUEJQuery(sectionBody).append($BLUEJQuery(bodyDetails));
					
				});
			});
	        comparativeMenuItem.append(sectionHeader);
	        comparativeMenuItem.append(sectionBody);
			$BLUEJQuery(this).html(comparativeMenuItem);
	        itemsCount++;
		}
	});
};

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