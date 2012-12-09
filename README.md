# CMS
A Content Management System to publish articles and share documents and events' calendar among members.

The application consists of three parts:
## Web Site
Implemented as Zend Framework module following the MVC paradigm generating semantic markup including [microformats](http://microformats.org/). Other noticeable features include (implemented mostly via plugin architecture):

- Internationalization: multiple language versions of the user interface and content
- SEF URLs: _example.com**/events/history**_ or _example.com**/docs/folder-name**_
- gracefully degrading widgets with transition animations representing files and events

![Site: Events](http://cms.local/site/content/site-events-en.png)