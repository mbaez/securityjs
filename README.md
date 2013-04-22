SecurityJS
==========
SecurityJS is a JavaScript library, that aims to simplify the management of permissions on HTML&JavaScript applications.

##How it works?
```html
<div data-require='permiso1;permiso2'>
...

</div>
```

```js
///mode = [remove|disable|hide|>error]
var disableMode = 'disable';
var permisos = ['permiso1', 'permiso2', 'permiso3',...];
var sjs = new SecurityJS({
    permisos : permisos,
    mode : disableMode
});
```
##Browser Support
SecurityJS has been tested in IE 8+, Firefox 4+, Safari 5+, Chromium 25+ and Opera 10+.
