/**
 * Esta calse se utiliza para agrupar los metodos que se utilizan
 * para verificar los permisos de las vistas.
 *
 * @class
 * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
 */
var SecurityJS = function (options) {

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
    this.contains = function(require, permisos){
        for(var i=0; i<require.length; i++){
            var permiso = require[i].trim();
            var status = (permisos.indexOf(permiso) >= 0);
            if(!status){
                return false;
            }
        }
        return true;
    }

    /**
     * Este método se encarga de verificar los permisos del usuario y
     * eliminar los componentes html sobre los cuales los no posee permisos.
     *
     * @author <a href="mailto:mxbg.py@gmail.com">Maximiliano Báez</a>
     * @params options {Object}
     * @config permisos {String[]} La lista de permisos con los que se cuenta.
     * @config [mode]{String} Los modos en los que se puede procesar el
     *         dom asociado al permiso. Default 'remove'. <br/>
     * <ul>
     * <li>remove : Se elimina el dom asociado al permiso</li>
     * <li>disable : Para añadir el atributo disable al dom asociado al permiso</li>
     * <li>hide : Para ocultar el dom asociado al permiso</li>
     * <li>error : Se carga un mensaje de error en el dom asociado al permiso</li>
     * </ul>
     */
    this.initialize = function (options){
        var mode;
        if(!options || options && !options['mode']){
            mode = 'remove';
        }else {
            mode =  options.mode;
        }
        //se obtiene todos los permisos
        var permisos = options.permisos;
        var thiz = this;
        //se obtienen todos los elementos que tienen el atributo require
        $('[require]').each(function(){
            // se obtienen los permisos definidos en atributo require del
            // componente de html.
            var toSplit = $(this).attr('require');
            //se separa los elementos
            var require = toSplit.split(';');
            //se verifica si existen posee los permisos.
            if(!thiz.contains(require, permisos)){
                if(mode == 'remove'){
                    //se elimina el elemento si el usuario no posee los
                    //permisos necesarios para ver el componente.
                    $(this).remove();
                }else if(mode == 'disable'){
                    $(this).attr('disabled', true);
                }else if(mode == 'hide'){
                    $(this).attr('style','visibility:hidden');
                }else if(mode == 'error'){
                    $(this).html("No posee los permisos para realizar esta acción");
                }
            }
            // una vez procesado el elemento se elimina el tag para borrar
            // cualquier rastro.
            $(this).removeAttr('require');
        });
    };

    //se invoca al constructor
    this.initialize(options);
}
