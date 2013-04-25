var _securityjs = {
    /**
     * Por default el scope es toda la página
     * @type String
     * @field
     * @name SecurityJS#scope
     */
    scope : "",
    /**
     * La lista de permisos con los que se cuenta.
     * @type String[]
     * @field
     * @name SecurityJS#data
     */
    data : [],
    /**
     * Se encarga de manejar aquellos elementos que cuenten con el valor
     * `remove` en el atributo `data-require-fail`.Por default se elimina
     * el dom asociado al permiso.
     * @function
     *
     * @public
     * @name SecurityJS#remove
     * @config el {Dom} El dom asociado al tag procesado.
     * @config require {String[]} el valor definido en el atributo
     *          data-require del `el` procesado.
     */
    remove : function(options){
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
     * @config el {Dom} El dom asociado al tag procesado.
     * @config require {String[]} el valor definido en el atributo
     *          data-require del `el` procesado.
     */
    disable : function(options){
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
     * @config el {Dom} El dom asociado al tag procesado.
     * @config require {String[]} el valor definido en el atributo
     *          data-require del `el` procesado.
     */
    hide : function(options){
        $(options.el).attr('style','visibility:hidden');
    },
    /**
     * Se encarga de manejar aquellos elementos que cuenten con el valor
     * `error` en el atributo `data-require-fail`. Por default carga un
     * mensaje de error en el dom asociado al permiso.
     * @function
     *
     * @public
     * @name SecurityJS#error
     * @config el {Dom} El dom asociado al tag procesado.
     * @config require {String[]} el valor definido en el atributo
     *          data-require del `el` procesado.
     */
    error : function(options){
        $(options.el).html("Forbbiden!!");
    },
    /**
     * Este método se invoca una vez que el `el` fue procesado. Por default
     * Se eliminan los atributos `data-require` y `data-require-fail`.
     * @function
     *
     * @public
     * @name SecurityJS#afterProcess
     * @param el {Dom} El dom asociado al tag procesado.
     */
    afterProcess : function(el){
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
 * @param require {String[]} El array de permisos necesarios
 * @param data {String[]} El array de permisos obtenidos.
 * @return {Boolean} True si todos existen todos los permisos,
 *          en caso contrario retorna False.
 */
_securityjs.contains = function(require, data){
    for(var i=0; i<require.length; i++){
        var permiso = require[i].trim();
        var status = (data.indexOf(permiso) >= 0);
        if(!status){
            return false;
        }
    }
    return true;
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
_securityjs.initialize = function (){
    //se obtienen todos los permisos
    var thiz = this;
    //se obtienen todos los elementos que tienen el atributo require
    $(this.scope+' [data-require]').each(function(){
        // se obtienen los permisos definidos en atributo require del
        // componente de html.
        var toSplit = $(this).attr('data-require');
        //se obtiene el modo de procesar el tag
        var mode = $(this).attr('data-require-fail');
        //por default se toma remove
        if(typeof mode == "undefined"){
            mode="remove";
        }
        //se separa los elementos
        var require = toSplit.split(';');
        //se verifica si existen posee los permisos.
        if(!thiz.contains(require, thiz.data)){
            //se verifica si el modo esta soportado
            if(thiz[mode] instanceof Function){
                //se invoca al encargado de procesar el elemento
                thiz[mode]({
                    el :$(this),
                    require : require
                });
            }else{
                throw  'Value of data-require-fail `'+mode+'` is not valid';
            }
            //se invoca al handler si es que este existe
            if(thiz.handler instanceof Function){
                options.handler({
                    el :$(this),
                    require : require
                });
            }
        }
        thiz.afterProcess($(this))
    });
};

/**
 * Esta calse se utiliza para agrupar los metodos que se utilizan
 * para verificar los permisos de las vistas.
 *
 * @class
 * @name SecurityJS
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>

 * @config data {String[]} La lista de permisos con los que se cuenta.
 *
 * @config [scope] {String} El class o el id apartir del cual se van a
 *          procesar los datos. Por default el scope es todo el documento.
 *
 * @config [handler]{Function} Función que es invocada simpre que  el
 *          usuario no posea permisos.
 *
 * @config [remove]{Function} Se encarga de manejar aquellos elementos q
 *          ue cuenten con el valor`remove` en el atributo `data-require-fail`.
 *          Por default se elimina el dom asociado al permiso.
 *
 * @config [disable]{Function} Se encarga de manejar aquellos elementos
 *          que cuenten con el valor `disable` en el atributo
 *          `data-require-fail`.Por default añade el atributo disable al
 *          dom asociado al permiso.
 *
 * @config [hide]{Function}  Se encarga de manejar aquellos elementos que
 *          cuenten con el valor `hide` en el atributo `data-require-fail`.
 *          Por default añade el style `visibility:hidden` para ocultar el
 *          dom asociado al permiso.
 *
 * @config [error]{Function} Se encarga de manejar aquellos elementos que
 *          cuenten con el valor `error` en el atributo `data-require-fail`.
 *          Por default carga un mensaje de error en el dom asociado al permiso.
 *
 * @config [afterProcess]{Function} Este método se invoca una vez que el
 *         `el` fue procesado. Por default se eliminan los atributos
 *         `data-require` y `data-require-fail`.
 */
var SecurityJS = function (options) {
    if(!options){options={}}
    //se define la clase
    var clazz={};
    //se realiza un extend de json principal para y un merge entre
    //los atributos y metodos.
    $.extend(true,clazz,_securityjs, options);
    //se invoca al constructor de la clase
    clazz.initialize(options);
    //se retorna la definicion de la clase
    return clazz;
}
