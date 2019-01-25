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
	document.getElementById(id + "Label").innerHTML = '<p class="bel-truncate-text bel-display-inline bel-space-reset" style="max-width: calc(100% - 25px)">' +optionText+'</p>';
	$BLUEJQuery("#" + id + "Label").addClass("bel-select-filled");
	$BLUEJQuery("#" + id + "List").removeClass("bel-display-list");
	$BLUEJQuery("#" + id + "Label").removeClass('bel-select-open-icon');
	$BLUEJQuery("#" + id + "Label").addClass('bel-select-close-icon');
	var allOptions = $BLUEJQuery("#" + id + "List").children('li');
	allOptions.removeClass('selected');
	$BLUEJQuery(element).addClass('selected');
	$BLUEJQuery('#'+id+' option').removeAttr("selected");
    $BLUEJQuery('#'+id+' option[value="'+value+'"]').attr('selected', true);
	$BLUEJQuery("#" + id).val(value);
	$BLUEJQuery("#" + id).trigger("change");
}


function displayBelOption(idList, idLabel) {
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
		    allOptions = $BLUEJQuery("#mySelect").children('li');
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

		this.append(processList);
		animationProgressBar(steps, selectedStep);

	}
	/*IMPORTANTE: El numero de pasos no debe estar por encima de la capacidad de Wizard*/
}

function animationProgressBar(steps, selectedStep){

	if(selectedStep <= steps){
		var barEfect = document.getElementsByClassName("bel-wizard-step-active")[0];
		var lblEfect = document.getElementsByClassName("bel-wizard-label-active")[selectedStep-1];
		barEfect.className += " bel-wizard-step-actual";
		lblEfect.className += " bel-wizard-label-actual";
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

/*
* Funcion que activa o desactiva el desplazamiento automatico de los combos de seleccionada
* comboId: es el identificador del combo de seleccionada
* comboState: es el estado del combo de seleccion, se puede usar "true" o "false"
*/
function setComboScrollable(comboId, comboState){
	$BLUEJQuery(comboId+"Div").prop("scrollable", comboState);
}

$BLUEJQuery.fn.blueSelect = function(size){
	if(this.attr('id') == undefined){
		this.attr('id', this.attr('name'));
	}
	var elementId = this.attr('id');
	this.removeClass();
	this.removeAttr( 'style' );

	$BLUEJQuery( "#"+elementId+"Div").remove();
	var selectDiv;
	var selectedLabel = null;

	if(this.prop('disabled')){
	    selectDiv = $BLUEJQuery("<div id='"+ elementId +"Div' class='bel-click-disable'></div>");
	}else{
		selectDiv = $BLUEJQuery("<div id='"+ elementId +"Div'></div>");
	}

	var selectList = $BLUEJQuery('<ul id="'+elementId+'List" class="bel-option-list bel-option-list-'+size+'"></ul>')

	$BLUEJQuery(this).children( 'option' ).each(function () {
		if($BLUEJQuery(this).prop('disabled')){
			if($BLUEJQuery(this).attr('value') != '-1'){
				$BLUEJQuery(selectList).append($BLUEJQuery('<li class="bel-option-disabled">'+$BLUEJQuery(this).text()+'</li>'));
			}
		}else{
			if ($BLUEJQuery(this).prop('selected')){
				$BLUEJQuery(selectList).append($BLUEJQuery('<li class="bel-option selected" onclick="updateBelSelect(\''+elementId+'\', \''+$BLUEJQuery(this).attr('value')+'\', this.innerHTML, this);">'+$BLUEJQuery(this).text()+'</li>'));
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

	$BLUEJQuery(document).click(function(event) {
	    if($BLUEJQuery(event.target.parentElement)[0].id !== selectDiv[0].id && selectList.is(":visible")) {
	        	displayBelOption(selectList[0].id, elementId+"Label");
	    }
});
	if(this.prop('disabled')){
		$BLUEJQuery(selectDiv).append($BLUEJQuery('<label id="'+elementId+'Label" class="bel-select bel-select-'+size+' bel-select-default bel-select-close-icon bel-select-close-icon-disabled" style=" background: #f1f1f2;"  onclick="displayBelOption(\''+elementId+'List\', \''+elementId+'Label\');">'+selectedLabel+'</label>'));
	}else{
		$BLUEJQuery(selectDiv).append($BLUEJQuery('<label id="'+elementId+'Label" class="bel-select bel-select-'+size+' bel-select-default bel-select-close-icon" onclick="displayBelOption(\''+elementId+'List\', \''+elementId+'Label\');">'+selectedLabel+'</label>'));
		}


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
		case 1: return "bel-alertMessage_grayIcon";
				break;
		case 2: return "bel-alertMessage_greenIcon";
				break;
		case 3: return "bel-alertMessage_redIcon";
				break;
		case 4: return "bel-alertMessage_orangeIcon";
				break;
		default: return "bel-alertMessage_grayIcon";
				 break;

	}
}



$BLUEJQuery.fn.blueTable = function(properties){

	this.removeClass();

	 makeCaption(this, properties);

	 makeHeader(this, properties);

	 makeBody(this, properties);

	 makefooter(this, properties);

	$BLUEJQuery(this).addClass("bel-table");

};
function makeBody(element, properties){
	var trCounter = 1;
	var thCounter = 0;
	var maxItemsCollapsed = 3;
	var thFlag = false;

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
	if($BLUEJQuery(element).has( "thead" ).length===0){
		thFlag=true;
	}
	$BLUEJQuery(element).find( 'tbody' ).each(function () {
		$BLUEJQuery(this).attr("id", "tbody" + $BLUEJQuery(element).attr("id") );
		
		var arbolActual = {"tieneRamas":false, "cantidadDeRamas":0,"subRowClassName":"","cantidadDeRamasPintadas":0};
		
		var treeConsecutiveId = 0;
		var nivelActual = 0;
		
		$BLUEJQuery(this).find( 'tr' ).each(function () {
			var dataLevel = $BLUEJQuery(this).attr('data-subrow-level');
				var subrowFlag = false;
			//1. Si es un arbol diferente
			if((arbolActual.cantidadDeRamas - arbolActual.cantidadDeRamasPintadas ) == 0){
				
				//1.2. Le actualizo los datos según la info del TR
				if($BLUEJQuery(this).attr( "data-subrowcount" ) != undefined){
					
					//1.1 Se inicializa el arbol nuevamente
					arbolActual = {
						"idDeArbol": $BLUEJQuery(this).attr( "id" ),
						"tieneRamas":true, 
						"cantidadDeRamas": $BLUEJQuery(this).attr( "data-subrowcount" ),
						"subRowClassName": "subRowClass" +$BLUEJQuery(this).attr( "id" ),
						"setToggleIcon":true,
						"cantidadDeRamasPintadas":0, 
						"ramas":[]
					}
					
				}
				
			}else{
				//2. es una rama del mismo arbol
				$BLUEJQuery(this).addClass(arbolActual.subRowClassName);
				arbolActual.cantidadDeRamasPintadas++;
			}
			
			thCounter = 0;
			$BLUEJQuery(this).addClass("bel-table_row bel-table_border-column");
			if(properties.rowHover ){
				$BLUEJQuery(this).addClass("bel-generic-hover");
			}
			$BLUEJQuery(this).find( 'td' ).each(function () {

				if (dataLevel!= undefined){
						 subrowFlag = true;
				    if (dataLevel==='1' ){
				    	 $BLUEJQuery(this).prepend( "<span class='bel-icon-subcategory-before-m bel-position-subrow-icon_level-1 color-icon-table bel-position-subrow-icon'/>");
			    	 	 $BLUEJQuery(this).addClass("bel-table-subrow bel-table-subrow_level-1");
			    	 	dataLevel= undefined;
				    }else{if(dataLevel==='2' ){
				    	 $BLUEJQuery(this).prepend( "<span class='bel-icon-subcategory-before-m bel-position-subrow-icon_level-2 color-icon-table bel-position-subrow-icon'/>");
			   	    	  $BLUEJQuery(this).addClass("bel-table-subrow bel-table-subrow_level-2");	
			   	    	   dataLevel= undefined;
				    	   }else{
				    		   $BLUEJQuery(this).prepend( "<span class='bel-icon-subcategory-before-m bel-position-subrow-icon_level-3 color-icon-table bel-position-subrow-icon'/>");
			   	    		   $BLUEJQuery(this).addClass("bel-table-subrow bel-table-subrow_level-3");	
			   	    		    dataLevel= undefined;
				    		   }
				    }
			   }else{if (subrowFlag){
				   $BLUEJQuery(this).addClass("bel-table-subrow");
			   		}
			   }
				//si es el primer td del tr padre entonces pongo el icono de toggle
				if(arbolActual.setToggleIcon){
					$BLUEJQuery(this).addClass("bel-icon-subaccount-open");
					$BLUEJQuery(this).addClass("bel-cursor-pointer");
					$BLUEJQuery(this).click(function() {
						toggleSubRows($BLUEJQuery(this).parent().attr( "id" ));
						openOrCloseArrow($BLUEJQuery(this));
					});
					arbolActual.setToggleIcon = false;
				}
				
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
			
			if(properties.extensible && trCounter > maxItemsCollapsed){
				$BLUEJQuery(this).addClass("bel-hide-element");

			}
			trCounter++;
		});
		if(properties.extensible && trCounter > maxItemsCollapsed){
			$BLUEJQuery(this).append( "<tr id='seTR"+$BLUEJQuery(element).attr("id")+"'><td colspan='"+thCounter+"' class='bel-extensive-menu_link'><a class='bel-typography bel-typography-link bel-icon-arrow-down-xxs' href='javascript:void(0)' onclick='showMoreItems(\""+$BLUEJQuery(element).attr("id")+"\")'>"+extensibleLabel+"</a></td></tr>");
			$BLUEJQuery(this).append( "<tr id='heTR"+$BLUEJQuery(element).attr("id")+"' class='bel-hide-element'><td colspan='"+thCounter+"' class='bel-extensive-menu_link'><a class='bel-typography bel-typography-link bel-icon-arrow-up-xxs' href='javascript:void(0)' onclick='hideItems(\""+$BLUEJQuery(element).attr("id")+"\")'>"+collapseLabel+"</a></td></tr>");
		}
	});

	if(properties.extensible && maxItemsCollapsed == (trCounter - 1)){
		$BLUEJQuery("#seTR"+$BLUEJQuery(element).attr("id")).remove();
		$BLUEJQuery("#heTR"+$BLUEJQuery(element).attr("id")).remove();
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
	$BLUEJQuery('#' + tableId + ' .bel-table_row.bel-hide-element').show(800);
	$BLUEJQuery("#seTR"+tableId).hide();
	$BLUEJQuery("#heTR"+tableId).show();
	

	$BLUEJQuery('#' + tableId).find('.bel-icon-subaccount-close').addClass("bel-icon-subaccount-open").removeClass( "bel-icon-subaccount-close" );
	
}


function hideItems(tableId){
	$BLUEJQuery('#' + tableId + ' .bel-table_row.bel-hide-element').hide(800);
    $BLUEJQuery("#heTR"+tableId).hide();
	$BLUEJQuery("#seTR"+tableId).show();
	
	$BLUEJQuery('#' + tableId).find('.bel-icon-subaccount-open').addClass("bel-icon-subaccount-close").removeClass( "bel-icon-subaccount-open" );
	

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
                }
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


/* Funciones para la barra de progreso ------------------------------- Inicio */

// the semi-colon before function invocation is a safety net against concatenated scripts and/or other plugins which may not be closed properly.

;(function() {

  "use strict";

  // undefined is used here as the undefined global variable in ECMAScript 3 is mutable (ie. it can be changed by someone else). undefined isn't really being
  // passed in so we can ensure the value of it is truly undefined. In ES5, undefined can no longer be modified.

  // window and document are passed through as local variables rather than global
  // as this (slightly) quickens the resolution process and can be more efficiently
  // minified (especially when both are regularly referenced in your plugin).

  // Create the defaults
  var pluginName = "blueLoadingBar",
    loadingClass = 'bel-loading',
    loadingPercentClass = 'bel-loading__percent bel-option-horizontal bel-space-left-xs bel-position-center',
    loadingTxtClass = 'bel-loading__status bel-option-horizontal bel-space-left-s',
    defaults = {
      color: 'e',
      percent: true,
      loadingText: true,
      txt: '',
      value: 0,
      min: 0,
      max: 100,
      minBarWidthPercent: 100,
      animation: true,
      animationTime: 100,
      intervalRunning: false,
      step: 1,
      _interval: undefined,
      _actualInterval: 0,
      _nextInterval: 0
    };

  // The actual plugin constructor
  function LoadingBar(element, options) {
    this.element = element;
    this.$element = $BLUEJQuery(element);

    // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.settings = $BLUEJQuery.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $BLUEJQuery.extend(LoadingBar.prototype, {
    init: function() {

      // You already have access to the DOM element and the options via the instance, e.g. this.element and this.settings
      this.$element = $BLUEJQuery(this.element).addClass(this._name);
      // listen for destroyed, call teardown
      this.$element.bind("destroyed", $BLUEJQuery.proxy(this.teardown, this));
      // call bind to attach events
      this.bind();
      this._makeLoadingMarkup();
      this._setInitialValues();
      this._setMarkupWidths();
    },
    bind: function() {
    	// This is intentional
    },
    unbind: function() {
    	// This is intentional
    },
    destroy: function() {
      // Remove elements, unregister listerners, etc
      this.$element.unbind("destroyed", this.teardown);
      this._teardown();
    },
    _teardown: function() {
      this.$element.removeData();
      $BLUEJQuery.removeData(this.$element[0], this._name);
      this.$element.removeClass(this._name);
      this.$element.removeClass(loadingClass);
      this.$element.html('');
      this.unbind();
      this.$element = null;
    },

		/**
		 * Funcion que valida el valor minimo de la barra de progreso
		 */
    _validateLoadingBarMinValue: function(min) {
			if (this.settings.min && this.settings.min >= 0) {
				min = this._setLoadingBarMinValue(min);
			}
			return min;
		},

		/**
		 * Funcion que establece el valor minimo de la barra de progreso
		 */
    _setLoadingBarMinValue: function(min) {
		if (this.settings.max && this.settings.max <= 100 && this.settings.min <= this.settings.max) {
			min = settings.min;
		}
		return min;
	},

		/**
		 * Funcion que valida el valor maximo de la barra de progreso
		 */
    _validateLoadingBarMaxValue: function(max) {
			if (this.settings.max && this.settings.max <= 100) {
				max = this._setLoadingBarMaxValue(max);
			}
			return max;
		},

		/**
		 * Funcion que establece el valor maximo de la barra de progreso
		 */
    _setLoadingBarMaxValue: function(max) {
			if (this.settings.min && this.settings.min >= 0 && this.settings.max >= this.settings.min) {
				max = this.settings.max;
			}
			return max;
		},

		/**
		 * Funcion que se encarga de editar la informacion de animacion de la barra de progreso
		 */
    _setLoadingAnimation: function(variable) {
      if (this.settings.animation) {
				var curr = this.settings.value;
        this.settings._actualInterval = variable;
				this.settings.value = variable;
				this.settings.intervalRunning = true;
        this.settings._interval = setInterval($BLUEJQuery.proxy(function() {
					curr = this._startAnimation(curr);
          if (curr == 'break') {
            this.clearLoadingInterval();
            if (this.settings._nextInterval != 0) {
              var nextInterval = this.settings._nextInterval;
              this.settings._nextInterval = 0;
              this.value(nextInterval);
						}
          }
        }, this), this.settings.animationTime);
			} else {
				this.settings.value = variable;
				this.$element.children('.bel-loading__bar').children('progress').val(this.settings.value);
				if (this.settings.percent) {
					this.$element.children('.bel-loading__percent').children('p').text(this.settings.value + '%');
				}
			}
		},
    clearLoadingInterval: function(variable) {
      var actualValue = this.settings._actualInterval;
      clearInterval(this.settings._interval);
      this.settings.value = actualValue;
      this.settings._interval = undefined;
      this.settings.intervalRunning = false;
      if (this.settings.animation) {
        this.settings.animation = !this.settings.animation;
        this.value(actualValue);
        this.settings.animation = !this.settings.animation;
      } else {
        this.value(actualValue);
      }
    },
		/**
		 * Funcion que se encarga de editar la informacion de texto y porcentaje de la barra de progreso
		 */
    _setLoadingTextAndPorcent: function() {
      if (this.settings.loadingText) {
        if (this.settings.percent) {
          $BLUEJQuery('<div class="' + loadingTxtClass + '"><p class="bel-typography bel-typography-p">' + this.settings.txt + '</p></div>').insertAfter(this.$element.children('.bel-loading__percent'));
        } else {
          $BLUEJQuery('<div class="' + loadingTxtClass + '"><p class="bel-typography bel-typography-p">' + this.settings.txt + '</p></div>').insertAfter(this.$element.children('.bel-loading__bar'));
				}
			} else {
				this.$element.children('.bel-loading__status').remove();
			}
		},

    _makeLoadingMarkup: function() {

      var loadingBarClass = 'bel-loading__bar bel-loading__bar--' + this.settings.color + ' bel-option-horizontal';
      var min = 0;
      var max = 100;

			min = this._validateLoadingBarMinValue(min);
			max = this._validateLoadingBarMaxValue(max);

      if (this.settings.value) {
        if (this.settings.value < min) {
          this.settings.value = min;
        } else if (this.settings.value > max) {
          this.settings.value = max;
        }
      }
      var loadingBarContainer = $BLUEJQuery('<div class="' + loadingBarClass + '"><progress min="' + min + '" max="' + max + '" value="0"></progress></div>');
      var loadingPercentContainer = $BLUEJQuery('<div class="' + loadingPercentClass + '"><p class="bel-typography bel-typography-p"></p></div>');
      var loadingTxtContainer = $BLUEJQuery('<div class="' + loadingTxtClass + '"><h4 class="bel-typography bel-typography-h4"></h4></div>');

      this.$element.append(loadingBarContainer);
      if (this.settings.percent) {
        this.$element.append(loadingPercentContainer);
      }
      if (this.settings.loadingText) {
        this.$element.append(loadingTxtContainer);
      }

      this.$element.addClass(loadingClass);
    },

    _setMarkupWidths: function(){
    		var loadingWidth = this.$element.outerWidth(true);
        var percentWidth = 0;
        var txtWidth = 0;
        if(this.settings.percent){
          percentWidth = this.$element.children('.bel-loading__percent').outerWidth(true)+5;
        }

        if(this.settings.loadingText){
          txtWidth = this.$element.children('.bel-loading__status').outerWidth(true) + 10;
        }
        var loadingWidthPercent = parseInt((loadingWidth /100) * this.settings.minBarWidthPercent);
        if(loadingWidthPercent > (loadingWidth - percentWidth - txtWidth) ){
          loadingWidthPercent = (loadingWidth - percentWidth - txtWidth);
        }

        if(loadingWidthPercent < 100){
          loadingWidthPercent = 100;
        }

        this.$element.children('.bel-loading__bar').children('progress').css('width', loadingWidthPercent + 'px')
    },

    _setInitialValues: function() {
      if (this.settings.value) {
        this.$element.children('.bel-loading__bar').children('progress').val(this.settings.value);
      }

      if (this.settings.percent) {
        if (this.settings.value) {
          this.$element.children('.bel-loading__percent').children('p').text(this.settings.value + '%');
        } else {
          this.$element.children('.bel-loading__percent').children('p').text(0 + '%');
        }
      }
      if (this.settings.loadingText) {
        this.$element.children('.bel-loading__status').children('h4').text(this.settings.txt);
      }
    },

    _startAnimation: function(variable) {
      if (variable == this.settings.value) {
        variable = 'break';
      } else {
        if (variable > this.settings.value) {
          variable -= this.settings.step;
          if (variable < this.settings.value) {
						variable = this.settings.value;
					}
          this.$element.children('.bel-loading__bar').children('progress').val(variable);
          if (this.settings.percent) {
            this.$element.children('.bel-loading__percent').children('p').text(variable + '%');
          }
        } else {
          variable += this.settings.step;
          if (variable > this.settings.value) {
						variable = this.settings.value;
					}
          this.$element.children('.bel-loading__bar').children('progress').val(variable);
          if (this.settings.percent) {
            this.$element.children('.bel-loading__percent').children('p').text(variable + '%');
          }
        }
      }
      return variable;
    },

    step: function(variable) {
			if (variable != undefined && !isNaN(parseInt(variable))) {
        if (variable > 0) {
					this.settings.step = variable;
				}
			} else {
				return this.settings.step;
			}
		},

    value: function(variable) {
      if (!this.settings.intervalRunning) {
        if (variable != undefined && !isNaN(parseInt(variable))) {
          if (this.settings.min <= variable && this.settings.max >= variable) {
						this._setLoadingAnimation(variable);
          }
        } else {
          return this.settings.value;
        }
      } else {
        if (this.settings._nextInterval != 0) {
          this.clearLoadingInterval();
          var nextInterval = this.settings._nextInterval;
          this.settings._nextInterval = variable;
          this.value(nextInterval);
        } else {
          this.settings._nextInterval = variable;
        }
      }
    },

    color: function(variable) {
      if (variable !== undefined) {
        this.$element.children('.bel-loading__bar').removeClass('bel-loading__bar--' + this.settings.color);
        this.settings.color = variable;
        this.$element.children('.bel-loading__bar').addClass('bel-loading__bar--' + this.settings.color);
      } else {
        return this.settings.color;
      }
    },

    percent: function(variable) {
      if(typeof(variable) === "boolean"){
        if(this.settings.percent !== variable){
          this.settings.percent = variable
          if(this.settings.percent){
            $BLUEJQuery('<div class="' + loadingPercentClass + '"><p class="bel-typography bel-typography-p">'+this.settings.value + '%</p></div>').insertAfter(this.$element.children('.bel-loading__bar'));
          } else {
            this.$element.children('.bel-loading__percent').remove();
          }
          this._setMarkupWidths();
        }
      } else {
        return this.settings.percent;
      }
    },

    loadingText: function(variable) {
      if(typeof(variable) === "boolean"){
        if(this.settings.loadingText !== variable){
          this.settings.loadingText = variable
					this._setLoadingTextAndPorcent();
          this._setMarkupWidths();
        }
      } else {
        return this.settings.loadingText;
      }
    },

    txt: function(variable) {
      if(!this.settings.intervalRunning){
        if(typeof(variable) === "string"){
          if(this.settings.loadingText){
            this.settings.txt = variable;
            this.$element.children('.bel-loading__status').children('h4').text(this.settings.txt);
          }
        } else {
          return this.settings.txt;
        }
      } else {
        setTimeout($BLUEJQuery.proxy(function() {
          this.txt(variable)
        }, this), this.settings.animationTime);
      }
    },

    animation: function (variable) {
      if(!this.settings.intervalRunning){
        if(typeof(variable) === "boolean"){
          this.settings.animation = variable;
        } else {
          return this.settings.animation;
        }
      } else {
        setTimeout($BLUEJQuery.proxy(function() {
          this.animation(variable)
        }, this), this.settings.animationTime);
      }
    },

    animationTime: function (variable) {
      if(!this.settings.intervalRunning){
          if (variable != undefined && !isNaN(parseInt(variable))) {
          this.settings.animationTime = variable;
        } else {
          return this.settings.animationTime;
        }
      } else {
        setTimeout($BLUEJQuery.proxy(function() {
          this.animationTime(variable);
        }, this), this.settings.animationTime);
      }
    }
  });


  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $BLUEJQuery.fn[pluginName] = function(options) {
    var args = arguments;

    if (options === undefined || typeof options === 'object') {
      // Creates a new plugin instance, for each selected element, and
      // stores a reference withint the element's data
      return this.each(function() {
        if (!$BLUEJQuery.data(this, 'plugin_' + pluginName)) {
          $BLUEJQuery.data(this, 'plugin_' + pluginName, new LoadingBar(this, options));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      // Cache the method call
      // to make it possible
      // to return a value
      var returns;
      this.each(function() {
        var instance = $BLUEJQuery.data(this, 'plugin_' + pluginName);
        if (instance instanceof LoadingBar && typeof instance[options] === 'function') {
          // Call the method of our plugin instance,
          // and pass it the supplied arguments.
          returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }

        // Allow instances to be destroyed via the 'destroy' method
        if (options === 'destroy') {
          $BLUEJQuery.data(this, 'plugin_' + pluginName, null);
        }
      });
      // If the earlier cached method
      // gives a value back return the value,
      // otherwise return this to preserve chainability.
      return returns !== undefined ? returns : this
    }
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
    dragdropClass = 'bel-drag_drop',
    dragdropContainerClass = 'bel-drag_drop__dropcontainer',
    dragdropLabelClass = 'bel-drag_drop__label',
    dragdropTableClass = 'bel-drag_drop__table',
    navInfo = getBrowserInfo(),
    defaults = {
      fileAccept: ".txt|.doc|image.*",
      language: "es",
      inputText1: "Para seleccionar los archivos a subir haga clic dentro del área punteada o  ",
  	  inputText2: "haga clic aquí",
      multiple: true,
      maxSize: '2.5',
      dashColor: 'default',
      inputName: 'fileInput1',
      tableId: 'dropTable1',
      tableProperties: {
    	  toggleable: false,
    	  extensible: true,
    	  rowHover: true,
    	  bigIcon: true,
    	  maxItemsCollapsed: 5,
    	  extensibleLabel: "Ver m&aacute;s",
    	  collapseLabel: "Ver menos",
    	  tdWidth: [35, 20, 40, 5],
    	  thAlign: ["left", "left", "left", "right"],
    	  tdAlign: ["left", "left", "left"]
      },
      loadingBar: {
    	  color: 'b',
    	  percent: true,
    	  loadingText: true,
    	  txt: 'Cargando...',
    	  value: 0,
    	  min: 0,
    	  max: 100,
    	  minBarWidthPercent: 100,
    	  animation: true,
    	  animationTime: 100
      },
      _tableInitialization: false,
      _fileList: [],
      _fileId: 0,
      
    };
  // The actual plugin constructor
  function DragDrop(element, options) {
    this.element = element;
    this.$element = $BLUEJQuery(element);

    /* jQuery has an extend method which merges the contents of two or
     * more objects, storing the result in the first object. The first object
     * is generally empty as we don't want to alter the default options for
     * future instances of the plugin
     */
    
    this.settings = $BLUEJQuery.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $BLUEJQuery.extend(DragDrop.prototype, {
    init: function() {

      // You already have access to the DOM element and the options via the instance, e.g. this.element and this.settings
      this.$element = $BLUEJQuery(this.element).addClass(this._name);
      this._makeDragDropMarkup();

      // listen for destroyed, call teardown
      this.$element.bind("destroyed", $BLUEJQuery.proxy(this.teardown, this));

      this.$element.children('.' + dragdropContainerClass).find('#' + this.settings.inputName).bind("dragenter mouseenter", $BLUEJQuery.proxy(this._dragenter, this));
      this.$element.children('.' + dragdropContainerClass).find('#' + this.settings.inputName).bind("dragleave dragend mouseleave drop", $BLUEJQuery.proxy(this._dragleave, this));
      this.$element.children('.' + dragdropContainerClass).find('#' + this.settings.inputName).bind("change", $BLUEJQuery.proxy(this._drop, this));
    
      // call bind to attach events
      this.bind();

    },
    bind: function() {
		// This is intentional
	},
    unbind: function() {
		// This is intentional
	},
    destroy: function() {
      // Remove elements, unregister listerners, etc
      this.$element.unbind("destroyed", this.teardown);
      this._teardown();
    },
    _teardown: function() {
      this.$element.removeData();
      $BLUEJQuery.removeData(this.$element[0], this._name);
      this.$element.removeClass(this._name);
      this.$element.removeClass(dragdropClass);
      this.$element.html('');
      this.unbind();
      this.$element = null;
    },
    _hover: function() {
		// This is intentional
	},
    _dragenter: function() {
      var $belDastContainer = this.$element.children('.bel-drag_drop__dropcontainer').children('.bel-dash-container');
	 var $belIconUpload = this.$element.children('.bel-drag_drop__dropcontainer').children('.bel-dash-container').children('.bel-space-top-m').children('.bel-icon-upload-xl');
	 $belDastContainer.addClass('bel-drag_drop--hover');
      $belDastContainer.removeClass('bel-dash--border-' + this.settings.dashColor);
	 $belIconUpload.addClass('bel-dragdrop-icon--hover');
    },
    _dragleave: function() {
      var $belDastContainer = this.$element.children('.bel-drag_drop__dropcontainer').children('.bel-dash-container');
	 var $belIconUpload = this.$element.children('.bel-drag_drop__dropcontainer').children('.bel-dash-container').children('.bel-space-top-m').children('.bel-icon-upload-xl');
	 $belDastContainer.removeClass('bel-drag_drop--hover');
      $belDastContainer.addClass('bel-dash--border-' + this.settings.dashColor);
	 $belIconUpload.removeClass('bel-dragdrop-icon--hover');
    },
    _drop: function(evt) {
      if (!this.settings._tableInitialization) {
    	  this._setTable();
      }
      this._handleFiles(evt);
    },
    _makeDragDropMarkup: function() {
    	var inputText =""; 
    	var dragDropTable = $BLUEJQuery('<div class="' + dragdropTableClass + ' bel-space-top-l"></div>');
    	if (navInfo.indexOf('IE') == 0 || isSafari() == true){
    		inputText =  '<p class="bel-typography bel-typography-p"> '+  this.settings.inputText1  + ' <span class="bel-typography bel-typography-link bel-typography_size-m">'+  this.settings.inputText2  + '</span></p>';
    		dragDropTable = $BLUEJQuery('<div class="' + dragdropTableClass + ' "></div>');
    	}else{
    		inputText = '<p class="bel-typography bel-typography-p">Arraste el documento en este espacio o <span class="bel-typography bel-typography-link bel-typography_size-m">seleccione</span> un archivo</p>';
    	}
      var dashedClass = 'bel-dash-container bel-drag_drop--default bel-dash--border-' + this.settings.dashColor + ' bel-position-center';
      var dashedContainer = $BLUEJQuery('<div class="' + dashedClass + '"></div>');
      var dashContent = $BLUEJQuery('<div class="bel-space-top-m bel-space-bottom-m">' +
    		  '<div class="bel-icon-upload-xl bel-dragdrop-icon--default"></div>' +
    		  inputText + '</div>');

      var dashAccept = "";
	  
	  var fileAcceptsPrint=this.settings.fileAccept;
      var fileAccepts= fileAcceptsPrint.replace(/\|/g , ' | ');
     
      if (this.settings.dashColor == "error") {
        dashAccept = $BLUEJQuery('<h5 class="bel-typography bel-typography-label-error bel-space-xs bel-dragdrop-typography--error">Archivo no compatible, debe ser formato: ' + this.settings.fileAccept + ' y no debe superar los: ' + this.settings.maxSize + ' Mb.</h5>');
      } else {
        dashAccept = $BLUEJQuery('<h5 class="bel-typography bel-typography-h5 bel-space-xs">Formato de archivo: ' + fileAccepts + ' y no debe superar los: ' + this.settings.maxSize + ' Mb.</h5>');
      }
      var dashInput = $BLUEJQuery('<input class="bel-drag_drop_input" id="' + this.settings.inputName + '"name="' + this.settings.inputName + '[]" type="file" multiple="' + this.settings.multiple + '" />');

      var dragDropContainer = $BLUEJQuery('<div class="' + dragdropContainerClass + '"></div>');;
      var dragDropLabel = $BLUEJQuery('<div class="' + dragdropLabelClass + ' bel-space-top-xs"></div>');
      

      dashedContainer.append(dashContent);
      dashedContainer.append(dashInput);
      dragDropContainer.append(dashedContainer);
      dragDropLabel.append(dashAccept);

      this.$element.append(dragDropContainer);
      this.$element.append(dragDropLabel);
      this.$element.append(dragDropTable);


      this.$element.addClass(dragdropClass);
    },
    _setMarkupWidths: function() {
      var loadingWidth = this.$element.outerWidth(true);
      var percentWidth = 0;
      var txtWidth = 0;
      if (this.settings.percent) {
    	  percentWidth = this.$element.children('.bel-loading__percent').outerWidth(true);
      }
      if (this.settings.loadingText) {
    	  txtWidth = this.$element.children('.bel-loading__status').outerWidth(true);
      }
      var loadingWidthPercent = parseInt((loadingWidth / 100) * this.settings.minBarWidthPercent);
      if (loadingWidthPercent > (loadingWidth - percentWidth - txtWidth)) {
    	  loadingWidthPercent = (loadingWidth - percentWidth - txtWidth);
      }
      if (loadingWidthPercent < 100) {
    	  loadingWidthPercent = 100;
      }
      this.$element.children('.bel-loading__bar').children('progress').css('width', loadingWidthPercent + 'px')
    },
    _setTable: function() {
    	
    	var inputRemoveAll = '<div class="deleteAllFiles bel-cursor-pointer bel-float-right bel-auxiliary-component-container"><button class="bel-icon-deleted-before-s bel-display-inline bel-auxiliary-component">Remover todos</button><div>';
    	var ieSelectionTxt = '</table>'; 
    	if (navInfo.indexOf('IE') == 0 || isSafari() == true){
    		this.$element.children('.' + dragdropTableClass).append(inputRemoveAll);
    		this.$element.children('.' + dragdropTableClass).children('.deleteAllFiles').bind("click", $BLUEJQuery.proxy(this._deleteAllFiles, this));
    		ieSelectionTxt= '</table><div class=" bel-space-top-xs"><h5 class="bel-typography bel-typography-h5">Para eliminar un archivo o agregar otros se debe volver a seleccionar todos los archivos a cargar.</h5></div>';	
    	}
      var tableHTML = '<table class="bel-space-top-l" id="' + this.settings.tableId + '">' +
      '<thead class=""><tr><th class="">Nombre del archivo</th><th class="">Tama&ntilde;o del archivo</th><th class="">Estado</th><th class=""></tr></th></thead>' +
      '<tbody></tbody>' +
      '<tfoot></tfoot>' +
        ieSelectionTxt;
      
      this.$element.children('.' + dragdropTableClass).append(tableHTML);
      this.$element.children('.' + dragdropTableClass).find('#' + this.settings.tableId).blueTable(this.settings.tableProperties);
      this.settings._tableInitialization = true;
    },
	_handleFiles: function(evt) {
	  this.$element.children('.' + dragdropTableClass).removeClass('bel-hide-element');
      var files = evt.target.files; // FileList object
      var ext = new Array('Bytes', 'KB', 'MB', 'GB');
      if (navInfo.indexOf('IE') == 0 || isSafari()){
    	  $BLUEJQuery('#tbody'+this.settings.tableId).html('');
    	  this.settings._fileList.length = 0; 
      }
      for (var i = 0, f; f = files[i]; i++) {
    	  	var bytesMaxSize = this.settings.maxSize * 1024 * 1024;
	        // Only process accept files and only process with max size files.
    	  	if (!f.type.match(this.settings.fileAccept) || bytesMaxSize < f.size) {
    		  this.settings.dashColor = 'error';
	    	  this.$element.children('.'+ dragdropLabelClass).children('h5').addClass("bel-dragdrop-typography--error");
	        }else{
	          this.settings.dashColor = 'default';
	          this.$element.children('.'+ dragdropContainerClass).children('.bel-dash-container').removeClass("bel-dash--border-error");
	      	  this.$element.children('.'+ dragdropLabelClass).children('h5').removeClass("bel-dragdrop-typography--error");        	
			  var reader = new FileReader();
			  var fz = 0;
			  var fileSize = f.size;
			  var fileMb = ((f.size / 1024) / 1024) * .5;
			  while (fileSize > 900) {
			    fileSize /= 1024;
			    fz++;
			  }
			  var timeAnimation = fileMb;
			  var fileSizeTxt = (Math.round(fileSize * 100) / 100) + ' ' + ext[fz];
			  var extension = getFilePathExtension(f.name);
			  var name = f.name.replace(extension, '').substring(0, 25);		
			  var tabletr = $BLUEJQuery(
				          '<tr class="bel-table_row bel-generic-hover bel-main-background" id="' + this.settings.tableId + '_file' + this.settings._fileId + '">' +
			      '<td class="bel-table_column_default">' +
				          '<div class="bel-icon-receipt-s bel-display-inline bel-space-right-s"></div>' +
				          '<p class="bel-display-inline bel-typography bel-typography-p">' + name + '___.' + extension + '</p>' +
			      '</td>' +
				          '<td class="bel-table_column_default bel-position-center">' +
				          '<p class="bel-typography bel-typography-p">' + fileSizeTxt + '</p>' +
			      '</td>' +
			      '<td class="bel-table_column_default">' +
				          '<div class="bel-loading" id="loading' + this.settings._fileId + '"></div>' +
			      '</td>' +
			      '<td class="bel-table_column_default">' +
				          '<div class="bel-loading__action bel-position-right bel-cursor-pointer" data-fileid="' + this.settings._fileId + '">' +
			          '<div class="bel-icon-error-xs"></div>' +
			        '</div>' +
			      '</td>' +
			    '</tr>');

		        this.$element.children('.' + dragdropTableClass).find('#' + this.settings.tableId).children('tbody').append(tabletr);
		        if (navInfo.indexOf('IE') == 0 || isSafari()){
		        	tabletr.find('.bel-loading__action').bind("click", $BLUEJQuery.proxy(this._openInputFile, this));
		        	
		        }else{
		        	tabletr.find('.bel-loading__action').bind("click", $BLUEJQuery.proxy(this._deleteFile, this));
		        }
		        this.bind();
				this.settings._fileList.push(
					{
						'id': this.settings._fileId,
						'file': f,
						'tr': tabletr
					}
				);
		        var loadingBar = tabletr.find('#loading' + this.settings._fileId)
		        loadingBar.blueLoadingBar(this.settings.loadingBar);
		        loadingBar.blueLoadingBar('animationTime', timeAnimation);	
		        reader.onprogress = function(myloadingBar) {
		          return function(evt) {
		            if (evt.lengthComputable) {
		              var progress = parseInt(((evt.loaded / evt.total) * 100), 10);
		              if (progress < 100) {
		                myloadingBar.blueLoadingBar('value', progress);
		              }
		            }
		          };
		        }(loadingBar); 
				 reader.onloadend = function (myloadingBar, myTr) {
					 return function() {
						 myloadingBar.blueLoadingBar('value', 100).blueLoadingBar('txt', 'Completo');
						 myTr.removeClass('bel-main-background');
					 };
		         }(loadingBar, tabletr);

		        reader.onerror = function(event) {
		          console.error("File could not be read! Code " + event.target.error.code);
		        };
		        reader.readAsText(f);
		        this.settings._fileId++;
	        }
      }
      if(this.settings._fileList.length == 0){
          this.$element.children('.' + dragdropTableClass).addClass('bel-hide-element');
		  }
      if ((isSafari() == false) && navInfo.indexOf('IE') != 0){
	    	  var fs = this.settings._fileList.map(function(a) {return a.file;});
	    	  var dT =  new DataTransfer();
	    	  for (var cont = 0, fileCont; fileCont = fs[cont]; cont++) {
	    		  dT.items.add(fileCont);
	    	  }
				
	    	  $BLUEJQuery('#'+this.settings.inputName).off('change');
	    	  $BLUEJQuery('#'+this.settings.inputName).prop('files', dT.files);
	    	  this.$element.children('.' + dragdropContainerClass).find('#' + this.settings.inputName).bind("change", $BLUEJQuery.proxy(this._drop, this));
	      }	      
    },
    
    _deleteFile: function(evt) {
      var id = $BLUEJQuery(evt.currentTarget).data('fileid');
      var file = $BLUEJQuery.grep(this.settings._fileList, function(f) {
        return f.id == id;
      });
    	
      file[0].tr.remove();
			this.settings._fileList.splice($BLUEJQuery.inArray(file[0], this.settings._fileList),1);
			var files = this.settings._fileList.map(function(a) {return a.file;});
			var dT = new DataTransfer();
			for (var i = 0, f; f = files[i]; i++) {
				dT.items.add(f);
			}
			$BLUEJQuery('#'+this.settings.inputName).off('change');
			$BLUEJQuery('#'+this.settings.inputName).prop('files', dT.files);
			this.$element.children('.' + dragdropContainerClass).find('#' + this.settings.inputName).bind("change", $BLUEJQuery.proxy(this._drop, this));
			if(this.settings._fileList.length == 0){
				this.$element.children('.' + dragdropTableClass).addClass('bel-hide-element');
			}
  },
  
  _openInputFile: function(){
	  this.$element.children('.' + dragdropContainerClass).find('#' + this.settings.inputName).click(); 
  },
  
  _deleteAllFiles: function(){
	  this.$element.children('.' + dragdropTableClass).addClass('bel-hide-element');
	  this.$element.children('.' + dragdropContainerClass).find('#' + this.settings.inputName).val("");
  }});
  

  function getFilePathExtension(path) {
	var filename = path.split('\\').pop().split('/').pop();
	var lastIndex = filename.lastIndexOf(".");
	if (lastIndex < 1) return "";
	return filename.substr(lastIndex + 1);
  }
  
  /* A really lightweight plugin wrapper around the constructor,
   * preventing against multiple instantiations
  */ 
  $BLUEJQuery.fn[pluginName] = function(options) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      // Creates a new plugin instance, for each selected element, and stores a reference withint the element's data
      return this.each(function() {
	  if (!$BLUEJQuery.data(this, 'plugin_' + pluginName)) {
	    $BLUEJQuery.data(this, 'plugin_' + pluginName, new DragDrop(this, options));
	  }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      // Cache the method call  to make it possible to return a value
      var returns;
      this.each(function() {
  var instance = $BLUEJQuery.data(this, 'plugin_' + pluginName);
  if (instance instanceof DragDrop && typeof instance[options] === 'function') {
          // Call the method of our plugin instance, and pass it the supplied arguments.
    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
  }

  // Allow instances to be destroyed via the 'destroy' method
  if (options === 'destroy') {
    $BLUEJQuery.data(this, 'plugin_' + pluginName, null);
  }
      });
      // If the earlier cached method gives a value back return the value, otherwise return this to preserve chainability.
      return returns !== undefined ? returns : this
    }
  };

})();

/* Funciones para  el drag and drop ---------------------------------- FIN */


/* Funciones para el Paginador -------------------------------- Inicio */
;(function() {
  "use strict";
  var pluginName = "bluePagination",
    paginationClass = 'bel-pagination',
    paginationListClass = 'bel-pagination-list',
    paginationItemClass = 'bel-pagination-item',
    defaults = {
      totalItems: 0,
      pageSize: 20,
      actualPage: 1,
	_totalPages: undefined,
      _beforePageClass: '',
      _afterPageClass: '',
			_beforePage:0,
			_afterPage: 0,
			_items: [],
			callback: undefined,
			_listElement: $BLUEJQuery('<ul class="' + paginationListClass + '"></ul>'),
			_itemElement: $BLUEJQuery('<li class="' + paginationItemClass + '"></li>'),
			_dotItem: '<div class="bel-pagination-dots"><span></span><span></span><span></span></div>'
	
    };

  function Pagination(element, options) {
    this.element = element;
    this.$element = $BLUEJQuery(element);
    this.settings = $BLUEJQuery.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  $BLUEJQuery.extend(Pagination.prototype, {
    init: function() {
     
      this.$element = $BLUEJQuery(this.element).addClass(this._name);
      this._makePaginationMarkup();
      this.$element.bind("destroyed", $BLUEJQuery.proxy(this._teardown, this));
			this.$element.children('.' + paginationListClass).children('.' + paginationItemClass).find('a').bind("click", $BLUEJQuery.proxy(this.goToPage, this));
      this.bind();
      this.callback();
    },
    bind: function() {
    	// This is intentional
    },
    unbind: function() {
    	// This is intentional
    },
    destroy: function() {
      this.$element.unbind("destroyed", this._teardown);
      this._teardown();
    },
    _teardown: function() {
      this.$element.removeData();
      $BLUEJQuery.removeData(this.$element[0], this._name);
      this.$element.removeClass(this._name);
      this.$element.removeClass(paginationClass);
      this.$element.html('');
      this.unbind();
      this.$element = null;
    },
    _hover: function() {
    	// This is intentional
    },
    _makePaginationMarkup: function() {
      this.$element.addClass(paginationClass);
			this.settings._totalPages = parseInt(Math.ceil(this.settings.totalItems / this.settings.pageSize));
			if (this.settings._totalPages == 1){
				this.settings._items[0] = {page:1, item: this.settings._itemElement.clone().addClass('active').append($BLUEJQuery("<a data-page='1' href='javascript:void(0)'>1</a>"))};
				this.settings._listElement.append(this.settings._items.map(function(a) { return a.item; }));
				this.$element.html(this.settings._listElement);
			} else if(this.settings._totalPages > 1){
				if(this.settings.actualPage == 1){
					this.settings._beforePageClass = 'disabled';
				} else if(this.settings.actualPage == this.settings._totalPages){
					this.settings._afterPageClass = 'disabled';
				}
				this.settings._beforePage = ((this.settings.actualPage == 1) ? 1 : (this.settings.actualPage-1));
				this.settings._afterPage = ((this.settings.actualPage == this.settings._totalPages) ? this.settings._totalPages : (this.settings.actualPage+1));

				this.settings._items[0] = {page: this.settings._beforePage, item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='"+this.settings._beforePage+"' class='bel-pagination-before "+this.settings._beforePageClass+"' href='javascript:void(0)'><span class='bel-icon bel-icon-back-xxs'></span></a>"))};
				this.settings._items[1] = {page: 1, item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='1' class='bel-pagination-first' href='javascript:void(0)'>1</a>"))};
				this.settings._items[7] = {page: this.settings._totalPages, item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='"+this.settings._totalPages+"' class='bel-pagination-last' href='javascript:void(0)'>"+this.settings._totalPages+"</a>"))};
				this.settings._items[8] = {page: this.settings._afterPage, item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='"+this.settings._afterPage+"' class='bel-pagination-after "+this.settings._afterPageClass+"' href='javascript:void(0)'><span class='bel-icon bel-icon-arrow-right-xxs'></span></a>"))};
				this._configureNavigation();
				
			}
    },
		_configureNavigation: function() {
		  if (this.settings._totalPages <= 7) {
		    for (var i = 2; i < this.settings._totalPages; i++) {
		      this.settings._items[i] = {
		        page: i,
		        item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='" + i + "' href='javascript:void(0)'>" + i + "</a>"))
		      };
		    }
		  } else {
		    if (this.settings.actualPage < 4) {
		      this.settings._items[2] = {
		        page: 2,
		        item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='2' href='javascript:void(0)'>2</a>"))
		      };
		      this.settings._items[3] = {
		        page: 3,
		        item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='3' href='javascript:void(0)'>3</a>"))
		      };
		      this.settings._items[4] = {
		        page: 4,
		        item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='4' href='javascript:void(0)'>4</a>"))
		      };
		      this.settings._items[5] = {
		        page: 5,
		        item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='5' href='javascript:void(0)'>5</a>"))
		      };
		      this.settings._items[6] = {
		        page: -1,
		        item: this.settings._itemElement.clone().append(this.settings._dotItem)
		      };
		    } else if (this.settings.actualPage >= 4 && this.settings.actualPage <= (this.settings._totalPages - 3)) {
		      this.settings._items[2] = {
		        page: -1,
		        item: this.settings._itemElement.clone().append(this.settings._dotItem)
		      };
		      this.settings._items[3] = {
		        page: (this.settings.actualPage - 1),
		        item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='" + (this.settings.actualPage - 1) + "' href='javascript:void(0)'>" + (this.settings.actualPage - 1) + "</a>"))
		      };
		      this.settings._items[4] = {
		        page: (this.settings.actualPage),
		        item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='" + (this.settings.actualPage) + "' href='javascript:void(0)'>" + (this.settings.actualPage) + "</a>"))
		      };
		      this.settings._items[5] = {
		        page: (this.settings.actualPage + 1),
		        item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='" + (this.settings.actualPage + 1) + "' href='javascript:void(0)'>" + (this.settings.actualPage + 1) + "</a>"))
		      };
		      this.settings._items[6] = {
		        page: -1,
		        item: this.settings._itemElement.clone().append(this.settings._dotItem)
		      };
		    } else {
		      this.settings._items[2] = {
		        page: -1,
		        item: this.settings._itemElement.clone().append(this.settings._dotItem)
		      };
		      this.settings._items[3] = {
		        page: (this.settings._totalPages - 4),
		        item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='" + (this.settings._totalPages - 4) + "' href='javascript:void(0)'>" + (this.settings._totalPages - 4) + "</a>"))
		      };
		      this.settings._items[4] = {
		        page: (this.settings._totalPages - 3),
		        item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='" + (this.settings._totalPages - 3) + "' href='javascript:void(0)'>" + (this.settings._totalPages - 3) + "</a>"))
		      };
		      this.settings._items[5] = {
		        page: (this.settings._totalPages - 2),
		        item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='" + (this.settings._totalPages - 2) + "' href='javascript:void(0)'>" + (this.settings._totalPages - 2) + "</a>"))
		      };
		      this.settings._items[6] = {
		        page: (this.settings._totalPages - 1),
		        item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='" + (this.settings._totalPages - 1) + "' href='javascript:void(0)'>" + (this.settings._totalPages - 1) + "</a>"))
		      };
		    }
		  }
		  this._setActivePage();
		  this.settings._listElement.html(this.settings._items.map(function(a) { return a.item; }));
		  this.$element.html(this.settings._listElement);
		},
		_refreshPagination: function(){
			if (this.settings._totalPages == 1){
				this.settings._items.lenght = 0;
				this.settings._items[0].item = this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='1' class='bel-pagination-first' href='javascript:void(0)'>1</a>"));
			} else if(this.settings._totalPages > 1){
				this.settings._items.lenght = 0;
				this._refreshNavigation();
				if(this.settings._totalPages <= 7){
					for(var i = 2; i < this.settings._totalPages; i++){
						this.settings._items[i] = {page:i, item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='"+i+"' href='javascript:void(0)'>"+i+"</a>"))};
					}
				} else {
					if(this.settings.actualPage < 4){
						this.settings._items[2] = {page:2, item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='2' href='javascript:void(0)'>2</a>"))};
						this.settings._items[3] = {page:3, item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='3' href='javascript:void(0)'>3</a>"))};
						this.settings._items[4] = {page:4, item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='4' href='javascript:void(0)'>4</a>"))};
						this.settings._items[5] = {page:5, item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='5' href='javascript:void(0)'>5</a>"))};
						this.settings._items[6] = {page:-1, item: this.settings._itemElement.clone().append(this.settings._dotItem)};
					}else if(this.settings.actualPage >= 4 && this.settings.actualPage <= (this.settings._totalPages-3)){
						this.settings._items[2] = {page:-1, item: this.settings._itemElement.clone().append(this.settings._dotItem)};
						this.settings._items[3] = {page:(this.settings.actualPage-1), item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='"+(this.settings.actualPage-1)+"' href='javascript:void(0)'>"+(this.settings.actualPage-1)+"</a>"))};
						this.settings._items[4] = {page:(this.settings.actualPage), item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='"+(this.settings.actualPage)+"' href='javascript:void(0)'>"+(this.settings.actualPage)+"</a>"))};
						this.settings._items[5] = {page:(this.settings.actualPage+1), item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='"+(this.settings.actualPage+1)+"' href='javascript:void(0)'>"+(this.settings.actualPage+1)+"</a>"))};
						this.settings._items[6] = {page:-1, item: this.settings._itemElement.clone().append(this.settings._dotItem)};
					}else {
						this.settings._items[2] = {page:-1, item: this.settings._itemElement.clone().append(this.settings._dotItem)};
						this.settings._items[3] = {page:(this.settings._totalPages-4), item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='"+(this.settings._totalPages-4)+"' href='javascript:void(0)'>"+(this.settings._totalPages-4)+"</a>"))};
						this.settings._items[4] = {page:(this.settings._totalPages-3), item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='"+(this.settings._totalPages-3)+"' href='javascript:void(0)'>"+(this.settings._totalPages-3)+"</a>"))};
						this.settings._items[5] = {page:(this.settings._totalPages-2), item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='"+(this.settings._totalPages-2)+"' href='javascript:void(0)'>"+(this.settings._totalPages-2)+"</a>"))};
						this.settings._items[6] = {page:(this.settings._totalPages-1), item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='"+(this.settings._totalPages-1)+"' href='javascript:void(0)'>"+(this.settings._totalPages-1)+"</a>"))};
					}
				}
				this._setActivePage();
				this.$element.children('.' + paginationListClass).html(this.settings._items.map(function(a) { return a.item; }));
				this.$element.children('.' + paginationListClass).children('.' + paginationItemClass).find('a').bind("click", $BLUEJQuery.proxy(this.goToPage, this));
			}
		},
		_refreshNavigation: function(){
			if(this.settings.actualPage == 1){
				this.settings._beforePageClass = 'disabled';
				this.settings._afterPageClass = '';
			} else if(this.settings.actualPage == this.settings._totalPages){
				this.settings._beforePageClass = '';
				this.settings._afterPageClass = 'disabled';
			} else  {
				this.settings._beforePageClass = '';
				this.settings._afterPageClass = '';
			}
			this.settings._beforePage = ((this.settings.actualPage == 1) ? 1 : (this.settings.actualPage-1));
			this.settings._afterPage = ((this.settings.actualPage == this.settings._totalPages) ? this.settings._totalPages : (this.settings.actualPage+1));
			this.settings._items[0] = {page: this.settings._beforePage, item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='"+this.settings._beforePage+"' class='bel-pagination-before "+this.settings._beforePageClass+"' href='javascript:void(0)'><span class='bel-icon bel-icon-back-xxs'></span></a>"))};
			this.settings._items[1] = {page: 1, item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='1' class='bel-pagination-first' href='javascript:void(0)'>1</a>"))};
			this.settings._items[7] = {page: this.settings._totalPages, item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='"+this.settings._totalPages+"' class='bel-pagination-last' href='javascript:void(0)'>"+this.settings._totalPages+"</a>"))};
			this.settings._items[8] = {page: this.settings._afterPage, item: this.settings._itemElement.clone().append($BLUEJQuery("<a data-page='"+this.settings._afterPage+"' class='bel-pagination-after "+this.settings._afterPageClass+"' href='javascript:void(0)'><span class='bel-icon bel-icon-arrow-right-xxs'></span></a>"))};
		},
		_setActivePage: function (){
			if(this.settings.actualPage < 1){
				this.settings.actualPage = 1;
			}else if(this.settings.actualPage > this.settings._totalPages){
				this.settings.actualPage = this.settings._totalPages;
			}
			var activePage = this.settings.actualPage;
			var item = $BLUEJQuery.grep(this.settings._items, function(f, i) {
				if(f!=undefined){
					return (f.page == activePage && i > 0);
				}
			});
			item[0].item.addClass('active');
		},
		goToPage: function(evt) {
			var page = $BLUEJQuery(evt.currentTarget).data('page');
			if(!$BLUEJQuery(evt.currentTarget).hasClass('disabled') && page != this.settings.actualPage){
				this.actualPage(page);
				if(typeof this.settings.callback == 'function'){
				    this.settings.callback.call(evt, {totalItems: this.settings.totalItems, pageSize: this.settings.pageSize, goToPage: page});
				}
			}
		},
		totalItems: function(variable) {
      if (variable != undefined && !isNaN(parseInt(variable))) {
        if (variable > 0) {
          this.settings.totalItems = variable;
					this.settings._totalPages = parseInt(Math.ceil(this.settings.totalItems / this.settings.pageSize));
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
			if ((this.settings.actualPage-1) <= 1) {
          this.settings.actualPage = 1;
					this._refreshPagination();
      } else {
				this.settings.actualPage = this.settings.actualPage-1;
				this._refreshPagination();
      }
    },
		afterPage: function() {
      if ((this.settings.actualPage+1) >= this.settings._totalPages) {
          this.settings.actualPage = this.settings._totalPages;
					this._refreshPagination();
      } else {
				this.settings.actualPage = this.settings.actualPage+1;
				this._refreshPagination();
      }
    },
		callback: function() {
			if(typeof this.settings.callback == 'function'){
		    this.settings.callback.call(this, {totalItems: this.settings.totalItems, pageSize: this.settings.pageSize, goToPage: this.settings.actualPage});
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


/* Funciones para el Paginador -------------------------------- Fin */