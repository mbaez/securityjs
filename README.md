SecurityJS
==========
SecurityJS is a JavaScript library, that aims to simplify the management of permissions in HTML&JavaScript applications. It's based on the use of
[custom data attribute](http://www.w3.org/html/wg/drafts/html/master/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
 in HTML tags.
##How it works?
SecurityJS uses [JQuery](http://jquery.com/) to process each html tag  pre configured,
this is possible  ​​using custom data attributes in html tags.

###Supported attributes
* **data-require** : contains the required permissions for this tag. If the item does not have the permission,  triggers the event 'require-fail'.
* **data-not-require** : it's negation of the attribute 'data-require'. If the item has the permission, triggers the event 'require-fail'.
* **data-require-fail** : defines the state and how to process the tag.

`data-require-fail` **states supported by default** :
* **remove** : removes the html tag associated.
* **disable** : makes it disable the html tag associated.
* **hide** : makes it hide the html tag associated.
* **error** : adds the message `Forbbiden!!`.

##Usage
Below is quick example how to use SecurityJS:

*Download the latest version library and include it in your html.*

```html
<script src="js/jquery.js"></script>
<script src="js/securityjs.js"></script>
```

*Add the `data-require` attribute in your html tags :*

```html
<input data-require ='read;edit' data-require-fail='disable' value="require.edit"/>
...
<button data-require ='edit;post' data-require-fail='remove' class="btn btn-primary">Post</button>
...
<button data-not-require ='login' data-require-fail='remove' class="btn btn-primary">Login</button>
...
<div class='container' data-require='view-container' data-require-fail='hide'>
...
</div>
```
*This code makes disable the `input`, because the permission `read` is not defined in the array `data`.*

```javascript
//define your permissions
var data = ['copy', 'post', 'edit', 'view-container'];
var options = {
    data : data
};
//instance securityjs class
var sjs = new SecurityJS(options);
```

###Custom States
To create custom states, simply define the state name and add the handler for it. The state name and the handler must be the same.

*Define the state name :*
```html
<input data-require ='read;edit' data-require-fail='newState' value="require.edit"/>
```
*Add the handler :*

```javascript
var sjs = new SecurityJS({
    data : [..],
    newState : function(options){//new state handler
      //do something
    }
});

```

*In the same way, the handlers of the default states can be overwritten.*

```javascript
var sjs = new SecurityJS({
    data : [..],
    disable : function(options){
      //do something
    },
    error :  function(options){
       //do something
    },
    hide : function(options){
       //do something
    }
});

```

##Browser Support

SecurityJS has been tested in IE 8+, Firefox 4+, Safari 5+, Chromium 25+ and Opera 10+.

##Want to contribute?

If you've found a bug or have a great idea for new feature let me know by [adding your suggestion]
(http://github.com/mbaez/securityjs/issues/new) to [issues list](https://github.com/mbaez/securityjs/issues).
