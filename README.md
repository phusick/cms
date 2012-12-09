# CMS
A Content Management System to publish articles and share documents and events' calendar among members.

The application consists of three parts:
## Web Site
Implemented as Zend Framework module following the MVC paradigm generating semantic markup including [microformats](http://microformats.org/). Other noticeable features include (implemented mostly via plugin architecture):

- Internationalization: multiple language versions of the user interface and content
- SEF URLs: _example.com/events/history_ or _example.com/docs/folder-name_
- gracefully degrading widgets with transition animations representing files and events

![Site: Events](https://raw.github.com/phusick/cms/master/public/site/content/site-events-en.png)

## Administration Console

The Source Code Path: [`/public/admin/src/app`](https://github.com/phusick/cms/tree/master/public/admin/src/app)

A single page JavaScript application written in [Dōjō Toolkit](http://dojotoolkit.org/) and [dgrid](http://dgrid.io) serving as a user interface to manipulate model data via RESTful API:

- Object-oriented JavaScript managed with [Asynchronous Module Definition API](http://requirejs.org/).
- Layout, user interface and forms written in Dijit taking full advantage of inheritance for data-binding, serialization and form validation.
- [Dojo Boilerplate](https://github.com/csnover/dojo-boilerplate) based - production code is optimized through Dojo Build System and [Google Closure Compiler](http://code.google.com/p/closure-compiler/).

![Administration Console: Documents](https://raw.github.com/phusick/cms/master/public/site/content/admin-docs-en.png)

## RESTful API

The Zend Framework module with plugins and model base classes transparetly handling JSON (de)serialization and converting REST API calls to CRUD operations through Access Control List supporting data sorting; e.g.: _GET http://example.com/rest/user/?sort=+role_ lists all users sorted ascending by their role.