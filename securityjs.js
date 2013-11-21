'use strict';
/**
 * Este namespace se utiliza para agrupar los metodos que se utilizan
 * para verificar los permisos de las vistas.
 *
 * @namespace
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 */
var _securityjs = {
    /**
     * Por default el scope es toda la página
     * @type String
     * @field
     * @name SecurityJS#scope
     */
    scope: "",
    /**
     * La lista de permisos con los que se cuenta.
     * @type String[]
     * @field
     * @name SecurityJS#data
     */
    data: [],
    /**
     * Se encarga de manejar aquellos elementos que cuenten con el valor
     * `remove` en el atributo `data-require-fail`.Por default se elimina
     * el dom asociado al permiso.
     * @function
     *
     * @public
     * @name SecurityJS#remove
     * @param options
     * @config {Dom}el  El dom asociado al tag procesado.
     * @config {String[]}require el valor definido en el atributo
     *          data-require del `el` procesado.
     */
    remove: function (options) {
        //se elimina el elemento si el usuario no posee los
        //permisos necesarios para ver el componente.
        $(options.el).remove();
    },
    /**
     * Se encarga de manejar aquellos elementos que cuenten con el valor
     * `disable` en el atributo `data-require-fail`.Por default añade
     * el atributo disable al dom asociado al permiso.
     * @function

     * @public
     * @name SecurityJS#disable
     * @param options
     * @config {Dom}el El dom asociado al tag procesado.
     * @config {String[]}require el valor definido en el atributo
     *          data-require del `el` procesado.
     */
    disable: function (options) {
        $(options.el).attr('disabled', true);
    },
    /**
     * Se encarga de manejar aquellos elementos que cuenten con el valor
     * `hide` en el atributo `data-require-fail`. Por default añade el
     * style `visibility:hidden` para ocultar el dom asociado al permiso.
     * @function
     *
     * @public
     * @name SecurityJS#hide
     * @param options
     * @config {Dom}el El dom asociado al tag procesado.
     * @config {String[]}require El valor definido en el atributo
     *          data-require del `el` procesado.
     */
    hide: function (options) {
        $(options.el).attr('style', 'visibility:hidden');
    },
    /**
     * Se encarga de manejar aquellos elementos que cuenten con el valor
     * `error` en el atributo `data-require-fail`. Por default carga un
     * mensaje de error en el dom asociado al permiso.
     * @function
     *
     * @public
     * @name SecurityJS#error
     * @param options
     * @config {Dom}el  El dom asociado al tag procesado.
     * @config {String[]}require  el valor definido en el atributo
     *          data-require del `el` procesado.
     */
    error: function (options) {
        $(options.el).html("Forbbiden!!");
    },
    /**
     * Este método se invoca una vez que el `el` fue procesado. Por default
     * Se eliminan los atributos `data-require` y `data-require-fail`.
     * @function
     *
     * @public
     * @name SecurityJS#afterProcess
     * @param {Dom}el  El dom asociado al tag procesado.
     */
    afterProcess: function (el) {
        $(el).removeAttr('data-require');
        $(el).removeAttr('data-require-fail');
    }
};

/**
 * Este método se encarga de verificar que todos los permisos definidos
 * en `require` se encuentren en `permisos`.
 * @function
 *
 * @public
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 * @name SecurityJS#contains
 * @param {String[]}require  El array de permisos necesarios
 * @param {String[]}data  El array de permisos obtenidos.
 * @return {Boolean} True si todos existen todos los permisos,
 *          en caso contrario retorna False.
 */
_securityjs.contains = function (require, data) {
    var array = data;
    if (typeof data === "function") {
        array = data();
    }

    for (var i = 0; i < require.length; i++) {
        var permiso = require[i].trim();
        var status = (array.indexOf(permiso) >= 0);
        if (!status) {
            return false;
        }
    }
    return true;
}

/**
 * Este método se encarga de verificar que todos los permisos definidos
 * en `not- require` no se encuentren en `permisos`.
 * @function
 *
 * @public
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 * @name SecurityJS#notContains
 * @param {String[]}require  El array de permisos necesarios
 * @param {String[]}data  El array de permisos obtenidos.
 * @return {Boolean} True si no existen todos los permisos,
 *          en caso contrario retorna False.
 */
_securityjs.notContains = function (require, data) {
    var array = data;
    if (typeof data == "function") {
        array = data();
    }

    for (var i = 0; i < require.length; i++) {
        var permiso = require[i].trim();
        var status = (array.indexOf(permiso) >= 0);
        if (status) {
            return false;
        }
    }
    return true;
}

/**
 * Este método se encarga de procesar los nodos anotados con require.
 * @function
 *
 * @public
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 * @name SecurityJS#processDom
 * @param {Document} el  El nodo a procesar.
 * @param {String} dataAttr  el nombre del data-attribute a porocesar.
 * @param {Function} comparator  Funcion que se encarga de comparar los
 *      los elementos.
 */
_securityjs.processDom = function (el, dataAttr, comparator) {
    // se obtienen los permisos definidos en atributo require del
    // componente de html.
    var toSplit = $(el).attr(dataAttr);
    //se obtiene el modo de procesar el tag
    var mode = $(el).attr('data-require-fail');
    //por default se toma remove
    if (typeof mode == "undefined") {
        mode = "remove";
    }
    //se separa los elementos
    var require = toSplit.split(';');
    //se verifica si existen todos los permisos.
    if (!comparator(require, this.data)) {
        //se verifica si el modo esta soportado
        if (this[mode] instanceof Function) {
            //se invoca al encargado de procesar el elemento
            this[mode]({
                el: $(el),
                require: require
            });
        } else {
            throw 'Value of data-require-fail `' + mode + '` is not valid';
        }
        //se invoca al handler si es que este existe
        if (this.handler instanceof Function) {
            options.handler({
                el: $(el),
                require: require
            });
        }
    }
    this.afterProcess($(el));
}
/**
 * Este método se encarga de verificar los permisos del usuario y
 * realizar una opreacion dependiendo del modo asociado al tag HTML.
 * @function
 *
 * @public
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 * @name SecurityJS#initialize
 */
_securityjs.initialize = function () {
    //se obtienen todos los permisos
    var thiz = this;
    //se obtienen todos los elementos que tienen el atributo not require
    $(this.scope + ' [data-not-require]').each(function () {
        thiz.processDom(this, 'data-not-require', thiz.notContains);
    });
    //se obtienen todos los elementos que tienen el atributo require
    $(this.scope + ' [data-require]').each(function () {
        thiz.processDom(this, 'data-require', thiz.contains);
    });
};

/**
 * Esta calse se utiliza para agrupar los metodos que se utilizan
 * para verificar los permisos de las vistas.
 *
 * @class
 * @name SecurityJS
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 * @param options
 * @config {String[]}data  La lista de permisos con los que se cuenta.
 *
 * @config {String}[scope] El class o el id apartir del cual se van a
 *          procesar los datos. Por default el scope es todo el documento.
 *
 * @config {Function}[handler] Función que es invocada simpre que  el
 *          usuario no posea permisos.
 *
 * @config {Function}[remove] Se encarga de manejar aquellos elementos q
 *          ue cuenten con el valor`remove` en el atributo `data-require-fail`.
 *          Por default se elimina el dom asociado al permiso.
 *
 * @config {Function}[disable] Se encarga de manejar aquellos elementos
 *          que cuenten con el valor `disable` en el atributo
 *          `data-require-fail`.Por default añade el atributo disable al
 *          dom asociado al permiso.
 *
 * @config {Function}[hide]  Se encarga de manejar aquellos elementos que
 *          cuenten con el valor `hide` en el atributo `data-require-fail`.
 *          Por default añade el style `visibility:hidden` para ocultar el
 *          dom asociado al permiso.
 *
 * @config {Function}[error] Se encarga de manejar aquellos elementos que
 *          cuenten con el valor `error` en el atributo `data-require-fail`.
 *          Por default carga un mensaje de error en el dom asociado al permiso.
 *
 * @config {Function}[afterProcess] Este método se invoca una vez que el
 *         `el` fue procesado. Por default se eliminan los atributos
 *         `data-require` y `data-require-fail`.
 */
var SecurityJS = function (options) {
    if (!options) {
        options = {}
    }
    //se define la clase
    var clazz = {};
    /*
     * Se realiza un extend de json principal para y un merge entre los
     * atributos y metodos.
     */
    //Se hace merge con los atributos añadidos via prototype y el options
    $.extend(true, clazz, this, options);
    //se hace un merge con los atributos base los obtenidos del merge anterior
    clazz = $.extend(true, {}, _securityjs, clazz);
    //se invoca al constructor de la clase
    clazz.initialize(options);
    //se retorna la definicion de la clase
    return clazz;
}
