
function getPermisos(){
    //~ var permisos = ['login', 'read', 'buy', 'edit'];
    var permisos = ['login', 'read'];
    return permisos;
}

function apply(){
    var permisos = getPermisos();
    var sjs = new SecurityJS({
        data : permisos,
    });
}
