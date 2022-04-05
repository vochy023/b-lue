var LoadingIconPath;
(function (LoadingIconPath) {
    // Estos valores DEFAULT corresponden al icono que es un celular
    LoadingIconPath["DEFAULT_INIT_ICON"] = "M193.894 68H173.105C171.219 67.9932 169.407 68.7255 168.073 70.0345C166.739 71.3434 165.993 73.1208 166 74.9719V116.028C165.993 117.879 166.739 119.657 168.073 120.966C169.407 122.274 171.219 123.007 173.105 123H193.894C195.781 123.007 197.592 122.274 198.926 120.966C200.26 119.657 201.007 117.879 201 116.028V75.2301C201.03 71.3249 197.873 68.1124 193.894 68ZM198.368 114.221V116.028C198.326 117.183 197.858 118.284 197.052 119.127C196.222 119.96 195.082 120.427 193.894 120.418H173.105C170.664 120.35 168.7 118.424 168.632 116.028V114.221H198.368ZM198.368 111.638H168.632V79.3616H198.368V111.638ZM198.368 75.2301V77.0376H168.632V75.2301C168.7 72.8343 170.664 70.908 173.105 70.8405H193.894C195.083 70.8335 196.225 71.2938 197.066 72.1185C197.906 72.9432 198.375 74.0638 198.368 75.2301Z";
    LoadingIconPath["DEFAULT_MAIN_ICON"] = "M170.946 93.8619L180.875 103.177L196.875 86.1772";
    LoadingIconPath["DEFAULT_SECONDARY_ICON"] = "M172.971 105.937L194.893 84.0001";
    LoadingIconPath["DEFAULT_SECONDARY_ICON_2"] = "M194.893 105.937L172.971 84.0001";
})(LoadingIconPath || (LoadingIconPath = {}));
var AnimationSVGOption;
(function (AnimationSVGOption) {
    AnimationSVGOption["LOADER_ANIMATION_SVG_WEB"] = "assets/images/components/loader/loadingcomponent.svg";
    AnimationSVGOption["LOADER_ANIMATION_SVG_APP"] = "libs/blue/v3/assets/images/components/loader/loadingcomponent.svg";
})(AnimationSVGOption || (AnimationSVGOption = {}));
var LoaderComponent = /** @class */ (function () {
    function LoaderComponent(options) {
        if (options.animationContainerID === null || options.animationContainerID === undefined) {
            throw new Error("El parametro animationContainerID es obligatorio, para crear el Loader necesita indicar cual ser\u00E1 el elemento contenedor}");
        }
        this.settings = Object.assign({}, {
            initFill: '--neutral-low',
            mainColor: '--positive-low',
            secondaryColor: '--critical-low',
            iconFill: '--white',
            fillTime: 2,
            waveCounter: 'infinite',
            waveTime: 3.5,
            iconInitPath: LoadingIconPath.DEFAULT_INIT_ICON,
            iconMainPath: LoadingIconPath.DEFAULT_MAIN_ICON,
            iconSecondaryPath: LoadingIconPath.DEFAULT_SECONDARY_ICON,
            iconSecondary2Path: LoadingIconPath.DEFAULT_SECONDARY_ICON_2,
            type: 1,
            height: '100px',
            width: '100%',
            position: '',
            zIndex: ''
        }, options);
        this.animation = { animationContainer: document.getElementById(options.animationContainerID) };
        this._build();
    }
    LoaderComponent.prototype._build = function () {
        var _a;
        var xmlhttp = new XMLHttpRequest();
        if (this._isMobile()) {
            xmlhttp.open("GET", AnimationSVGOption.LOADER_ANIMATION_SVG_APP, false);
        }
        else {
            xmlhttp.open("GET", AnimationSVGOption.LOADER_ANIMATION_SVG_WEB, false);
        }
        xmlhttp.send();
        var divTem = document.createElement('div');
        divTem.innerHTML = xmlhttp.responseText;
        if (!(divTem.firstElementChild instanceof SVGSVGElement)) {
            throw new Error("Expected e to be an SVGSVGElement, was ".concat((_a = this.settings.animationSVG.firstElementChild) === null || _a === void 0 ? void 0 : _a.className));
        }
        this.settings.animationSVG = divTem.firstElementChild;
        this._setPositionContainer();
        this._setElementColors();
        this._setElementAnimation();
        this._setSvgPathElements();
        this.animation.animationContainer.append(this.settings.animationSVG);
    };
    LoaderComponent.prototype._setPositionContainer = function () {
        this.animation.animationContainer.style.setProperty("height", this.settings.height);
        this.animation.animationContainer.style.setProperty("width", this.settings.width);
        this.animation.animationContainer.style.setProperty("position", this.settings.position);
        this.animation.animationContainer.style.setProperty("z-index", this.settings.zIndex);
    };
    /**
     * @name setElementAnimation
     * @description se encarga de setear los elementos relacionados al color
     */
    LoaderComponent.prototype._setElementColors = function () {
        this.settings.animationSVG.style.setProperty("--init-fill", "var(" + this.settings.initFill + ")");
        this.settings.animationSVG.style.setProperty("--main-color", "var(" + this.settings.mainColor + ")");
        this.settings.animationSVG.style.setProperty("--secondary-color", "var(" + this.settings.secondaryColor + ")");
        this.settings.animationSVG.style.setProperty("--icon-fill", "var(" + this.settings.iconFill + ")");
    };
    /**
     * @name setElementAnimation
     * @description se encarga de setear los elementos de la animación
     */
    LoaderComponent.prototype._setElementAnimation = function () {
        this.settings.animationSVG.style.setProperty("--fill-time", this.settings.fillTime + 's');
        this.settings.animationSVG.style.setProperty("--wave-time", this.settings.waveTime + 's');
        this.settings.animationSVG.style.setProperty("--wave-counter", this.settings.waveCounter);
        this.settings.animationSVG.style.setProperty("position", this.settings.position);
        this.settings.animationSVG.style.setProperty("z-index", this.settings.zIndex + '');
    };
    /**
     * @name _setPosition
     * @description se encarga de setear la posicion del contenedor principal
     */
    LoaderComponent.prototype._setPosition = function () {
        this.settings.animationSVG.style.setProperty("position", this.settings.position);
        this.settings.animationSVG.style.setProperty("z-index", this.settings.zIndex + '');
    };
    /**
     * @name setSvgPathElements
     * @description se encarga de setear los elementos del svg
     */
    LoaderComponent.prototype._setSvgPathElements = function () {
        this.settings.animationSVG.setAttribute('data-type', this.settings.type.toString());
        this.settings.animationSVG.getElementsByTagName("path")[0].setAttribute("d", this.settings.iconInitPath);
        this.settings.animationSVG.getElementsByTagName("path")[1].setAttribute("d", this.settings.iconMainPath);
        this.settings.animationSVG.getElementsByTagName("path")[2].setAttribute("d", this.settings.iconSecondaryPath);
        this.settings.animationSVG.getElementsByTagName("path")[3].setAttribute("d", this.settings.iconSecondary2Path);
    };
    /**
    * @name _isMobile
    * @description valida si es mobile donde se va utilizar la animacion
    */
    LoaderComponent.prototype._isMobile = function () {
        return ((navigator.userAgent.match(/Android/i)) ||
            (navigator.userAgent.match(/webOS/i)) ||
            (navigator.userAgent.match(/iPhone/i)) ||
            (navigator.userAgent.match(/iPad/i)));
    };
    LoaderComponent.prototype._getDataType = function () {
        if (Number(this.settings.animationSVG.getAttribute("data-type")) === 0) {
            this.settings.animationSVG.classList.add("loader__secondary");
        }
        else {
            this.settings.animationSVG.classList.add("loader__primary");
        }
    };
    LoaderComponent.prototype.startAnimation = function () {
        var plugin = this;
        if (!this.settings.animationSVG.classList.contains("animation")) {
            this.settings.animationSVG.classList.add("animation");
            setTimeout(function () {
                plugin._getDataType();
            }, this.settings.fillTime * 1000);
        }
    };
    LoaderComponent.prototype.changeLoaderStatus = function () {
        var mainColor = getComputedStyle(this.settings.animationSVG).getPropertyValue("--main-color");
        var secondaryColor = getComputedStyle(this.settings.animationSVG).getPropertyValue("--secondary-color");
        this.settings.animationSVG.style.setProperty("--secondary-color", mainColor);
        this.settings.animationSVG.style.setProperty("--main-color", secondaryColor);
        if (this.settings.type === 0) {
            this._changeLoaderType(1);
            this.settings.animationSVG.classList.remove("loader__secondary");
            this.settings.animationSVG.classList.add("loader__primary");
        }
        else {
            this._changeLoaderType(0);
            this.settings.animationSVG.classList.remove("loader__primary");
            this.settings.animationSVG.classList.add("loader__secondary");
        }
    };
    /**
     * @name changeLoaderType
     * @description se encargada cambiar el tipo de estado
     * @param {int} type nuevo valor del tipo de estado
     */
    LoaderComponent.prototype._changeLoaderType = function (type) {
        this.settings.animationSVG.setAttribute("data-type", type.toString());
        this.settings.type = type;
    };
    LoaderComponent.prototype.endAnimation = function () {
        if (Number(this.settings.animationSVG.getAttribute("data-type")) === 0) {
            this.settings.animationSVG.classList.remove("loader__secondary");
            this.settings.animationSVG.classList.remove("animation");
        }
        else {
            this.settings.animationSVG.classList.remove("loader__primary");
            this.settings.animationSVG.classList.remove("animation");
        }
    };
    LoaderComponent.prototype.clearStatus = function () {
        this.settings.animationSVG.classList.remove("loader__primary");
        this.settings.animationSVG.classList.remove("loader__secondary");
        this.settings.animationSVG.classList.remove("animation");
        this.settings.animationSVG.style.setProperty("--init-fill", "var(--neutral-low)");
    };
    return LoaderComponent;
}());
