SecurityJS
==========
SecurityJS is a JavaScript library, that aims to simplify the management of permissions in HTML&JavaScript applications. Is based in the use of
[custom data attribute](http://www.w3.org/html/wg/drafts/html/master/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
`data-require` in HTML tags. 
##Usage
Below is quick example how to use SecurityJS:

* Download the latest library and include it in your html.

> ```html
<script src="js/securityjs.js"></script>
```

* Add the `data-require` attribute in your html tags :

> ```html
<input data-require ='edit' value="require.edit"/>
...
<button data-require ='edit;post' class="btn btn-primary">Post</button>
...
<div class='container' data-require='view-container'>
...
</div>
```

* This code makes disable all html tags, which require a permit that is not defined in the array `permisos`.

> ```js
///mode = [remove|disable|hide|>error]
var disableMode = 'disable';
//define your permissions
var permisos = ['permiso1', 'permiso2', 'permiso3',...];
var options = {
    permisos : permisos,
    mode : disableMode
};
//instance securityjs class
var sjs = new SecurityJS(options);
```

##Browser Support

SecurityJS has been tested in IE 8+, Firefox 4+, Safari 5+, Chromium 25+ and Opera 10+.

##Want to contribute?

If you've found a bug or have a great idea for new feature let me know by [adding your suggestion]
(http://github.com/mbaez/SecurityJS/issues/new) to [issues list](https://github.com/mbaez/SecurityJS/issues).
