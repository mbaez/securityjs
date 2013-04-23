SecurityJS
==========
SecurityJS is a JavaScript library, that aims to simplify the management of permissions in HTML&JavaScript applications. It's based on the use of
[custom data attribute](http://www.w3.org/html/wg/drafts/html/master/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
 in HTML tags.
##How it works?
SecurityJS uses [JQuery](http://jquery.com/) to process each html tag  pre configured,
this is possible  ​​using custom data attributes in html tags.

###Supported attributes
* **data-require** : contains the required permissions for this tag
* **data-require-mode** : defines the how to process the tag.

###Supported modes
* **remove** : removes the html tag associated.
* **disable** : makes it disable the html tag associated.
* **hide** : makes it hide the html tag associated.

##Usage
Below is quick example how to use SecurityJS:

* Download the latest version library and include it in your html.

> ```html
<script src="js/jquery.js"></script>
<script src="js/securityjs.js"></script>
```

* Add the `data-require` attribute in your html tags :

> ```html
<input data-require ='read;edit' data-require-mode='disable' value="require.edit"/>
...
<button data-require ='edit;post' data-require-mode='remove' class="btn btn-primary">Post</button>
...
<div class='container' data-require='view-container' data-require-mode='hide'>
...
</div>
```

* This code makes disable all html tags, which require a permit that is not defined in the array `permisos`.

> ```js
//define your permissions
var permisos = ['read', 'post', 'edit', 'view-container'];
var options = {
    data : permisos
};
//instance securityjs class
var sjs = new SecurityJS(options);
```

##Browser Support

SecurityJS has been tested in IE 8+, Firefox 4+, Safari 5+, Chromium 25+ and Opera 10+.

##Want to contribute?

If you've found a bug or have a great idea for new feature let me know by [adding your suggestion]
(http://github.com/mbaez/SecurityJS/issues/new) to [issues list](https://github.com/mbaez/SecurityJS/issues).
