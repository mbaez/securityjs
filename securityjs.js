/**
 * Este namespace se utiliza para agrupar los metodos que se utilizan
 * para verificar los permisos de las vistas.
 *
 * @namespace
 * @author <a href="mailto:mbaez@konecta.com.py">Maximiliano Báez</a>
 */
var _securityjs = {};


/**
 * Este método se encarga de verificar que todos los permisos definidos
 * en `require` se encuentren en `permisos`.
 *
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 * @param require
 * @param permisos
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
 *
 *<br/>
 * Los modos que se pueden procesar son :<br/>
 * <ul>
 * <li>remove : Se elimina el dom asociado al permiso</li>
 * <li>disable : Para añadir el atributo disable al dom asociado al permiso</li>
 * <li>hide : Para ocultar el dom asociado al permiso</li>
 * <li>error : Se carga un mensaje de error en el dom asociado al permiso</li>
 * </ul>
 *
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 * @params options {Object}
 * @config data {String[]} La lista de permisos con los que se cuenta.
 * @config [handler]{Function} Función que se invoca cuando el usuario no
 *          posee permisos.
 */
_securityjs.initialize = function (options){
    //se obtienen todos los permisos
    var data = options.data;
    var thiz = this;
    //se obtienen todos los elementos que tienen el atributo require
    $('[data-require]').each(function(){
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
        if(!thiz.contains(require, data)){
            if(mode == 'remove'){
                //se elimina el elemento si el usuario no posee los
                //permisos necesarios para ver el componente.
                $(this).remove();
            }else if(mode == 'disable'){
                $(this).attr('disabled', true);
            }else if(mode == 'hide'){
                $(this).attr('style','visibility:hidden');
            }else if(mode == 'error'){
                $(this).html("Forbbiden!!");
            }else{
                throw  'Value of require-fail `'+mode+'` is not valid';
            }
            //se invoca al hanler
            if(options && options.handler instanceof Function){
                options.handler({
                    el :$(this),
                    require : require
                });
            }
        }
        // una vez procesado el elemento se elimina el tag para borrar
        // cualquier rastro.
        $(this).removeAttr('data-require');
        $(this).removeAttr('data-require-fail');
    });
};


/**
 * Esta calse se utiliza para agrupar los metodos que se utilizan
 * para verificar los permisos de las vistas.
 *
 * @class
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 */
var SecurityJS = function (options) {
    if(!options){options={}}
    //se invoca al constructor de la clase
    _securityjs.initialize(options);
    return _securityjs;
}
