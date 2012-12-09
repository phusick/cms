/**
 * This file is your application’s main JavaScript file. It is listed as a dependency in run.js and will
 * automatically load when run.js loads.
 *
 * Because this file has the special filename “main.js”, and because we’ve registered the “app” package in run.js,
 * whatever object this module returns can be loaded by other files simply by requiring “app” (instead of “app/main”).
 *
 * Our first dependency is to the “dojo/has” module, which allows us to conditionally execute code based on
 * configuration settings or environmental information. Unlike a normal conditional, these branches can be compiled
 * away by the build system; see “staticHasFeatures” in app.profile.js for more information.
 *
 * Our second dependency is to the special module “require”; this allows us to make additional require calls using
 * relative module IDs within the body of our define function.
 *
 * In all cases, whatever function is passed to define() is only invoked once, and the return value is cached.
 *
 * More information about everything described about the loader throughout this file can be found at
 * http://livedocs.dojotoolkit.org/loader/amd.
 */
define([ 'dojo/has', 'require', 'dojo/_base/sniff' ], function (has, require) {
    var app = {};

    if (has('host-browser') && isCompatible()) {
        /*
         * This require call’s first dependency, “./Dialog”, uses a relative module identifier; you should use this
         * type of notation for dependencies *within* a package in order to ensure the package is fully portable. It
         * works like a path, where “./” refers to the current directory and “../” refers to the parent directory. If
         * you are referring to a module in a *different* package, you should *not* use a relative module identifier.
         *
         * The second dependency is a plugin dependency; in this case, it is a dependency on the special functionality
         * of the “dojo/domReady” plugin, which waits until the DOM is ready before finishing loading.
         * The “!” after the module name indicates you want to use special plugin functionality; if you were to
         * require just “dojo/domReady”, it would load that module just like any other module, without any of the
         * special plugin functionality.
         */
        require([ './EntryPoint', 'dojo/domReady!' ], function (EntryPoint) {
            app.entryPoint = new EntryPoint().placeAt(document.body);

            // It is important to remember to always call startup on widgets after you have added them to the DOM.
            // It won’t hurt if you do it twice, but things will often not work right if you forget to do it.
            app.entryPoint.startup();
        });
    }
    else {
        window.location = "/admin/browser/";
    }
    
    function isCompatible() {
        if(has("ff") >= 3) return true;
        if(has("ie") >= 9) return true;
        if(has("opera") >= 10) return true;
        if(has("opera") >= 10) return true;
        if(has("webkit") >= 531) return true;
        return false;
    }
});