/*
	USERS: admin:admin & user:user
*/
INSERT INTO `users` (`id`,`username`,`password`,`role`, `active`,`date_created`) VALUES (1,'user','7f45708a7414602ef40066d5c3ba79b9e33e4a32','member',1,'2011-12-30 09:45:00');
INSERT INTO `users` (`id`,`username`,`password`,`role`, `active`,`date_created`) VALUES (3,'admin','471215cf806cc49b5e7da648341618360543410b','admin',1,'2011-12-30 09:45:00');


/*
	MEMBERS
*/
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (4,3,'cs','member',1,NULL,NULL,NULL,99,'2012-01-01 00:00:00',NULL,NULL,NULL,'John Doe','{"given-name": "John", "family-name": "Doe", "title": "CEO", "tel": "+45 14 15 16 17", "email": "john.doe@example.com"}',NULL);
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (5,3,'cs','member',1,NULL,NULL,NULL,90,'2012-01-01 00:00:00',NULL,NULL,NULL,'Joe Bloggs','{"given-name": "Joe", "family-name": "Bloggs", "title": "CIO", "tel": "+45 24 25 26 27", "email": "joe.bloggs@example.com"}',NULL);
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (6,3,'cs','member',1,NULL,NULL,NULL,80,'2012-01-01 00:00:00',NULL,NULL,NULL,'Jane Doe','{"given-name": "Jane", "family-name": "Doe", "title": "CFO", "tel": "+45 34 35 36 37", "email": "jane.doe@example.com"}',NULL);


/*
	FOLDERS
*/
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (9,3,'cs','folder',1,'facebook',NULL,NULL,0,'2012-01-01 00:00:00',NULL,NULL,NULL,'Facebook',NULL,NULL);
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (10,3,'cs','folder',1,'google',NULL,NULL,0,'2012-01-01 00:00:00',NULL,NULL,NULL,'Google',NULL,NULL);

/*
	FILES FOR DOCUMENTS
*/
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (11,3,'cs','file',1,'4f14bde640246',NULL,10,0,'2012-01-16 00:00:00',NULL,NULL,NULL,'Search Engine Optimization','{"filename":"search-engine-optimization.pdf", "filesize":4318447, "filetype":"application/pdf"}','');
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (12,3,'cs','file',1,'4f14bde640247',NULL,9,0,'2012-01-09 00:00:00',NULL,NULL,NULL,'Marketing on Facebook','{"filename":"marketing-on-facebook.pdf", "filesize":3604306, "filetype":"application/pdf"}',' ');
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (13,3,'cs','file',1,'4f14bde640248',NULL,9,0,'2012-01-08 00:00:00',NULL,NULL,NULL,'A Guide to Facebook Security','{"filename":"facebook-security.pdf", "filesize":1484544, "filetype":"application/pdf"}',' ');

/*
	EVENTS
*/
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (14,3,'cs','event',1,NULL,NULL,NULL,0,'2012-01-01 00:00:00',NULL,'2012-06-27 00:00:00','2012-06-29 00:00:00','Google I/O','{"all_day": true, "place": "Moscone Center West, San Francisco"}','Google I/O is an annual developer-focused conference held by Google in San Francisco, California. Google I/O features highly technical, in-depth sessions focused on building web, mobile, and enterprise applications with Google and open web technologies such as Android, Chrome, Chrome OS, Google APIs, Google Web Toolkit, App Engine, and more.<br><br>Google I/O was started in 2008. The "I" and "O" stand for "Innovation in the Open", and input/output. The format of the event is similar to that of the Google Developer Day.');
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (15,3,'cs','event',1,NULL,NULL,NULL,0,'2012-01-01 00:00:00',NULL,'2012-09-22 09:30:00','2012-09-22 16:30:00','Facebook f8','{"all_day": false, "place": "Design Center, Design Center, San Francisco"}','The Facebook f8 (pronounced "eff eight") conference is a yearly event held by Facebook and takes place in San Francisco, California.[1] Its mission is to bring together the developers and entrepreneurs who are building the social web. The conference starts with a keynote speech by Facebook founder Mark Zuckerberg followed by various breakout sessions concentrating on specific topics. It is known for being the place where Facebook introduces new features and announcements to the public for the first time. The name "f8" derives from the tradition at Facebook of having a big eight hour Hackathon just after the event.');

/*
	FILES FOR EVENTS
*/
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (17,3,'cs','file',1,'4f14bde640245',NULL,14,0,'2012-01-09 00:00:00',NULL,NULL,NULL,'Google+ Your Business','{"filename":"google-plus-your-business.pdf", "filesize":2136038, "filetype":"application/pdf"}',NULL);

/*
	ANNOUNCEMENTS
*/
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (22,3,'cs','announcement',1,NULL,NULL,NULL,0,'2012-01-17 14:52:40',NULL,'2012-01-25 00:00:00',NULL,NULL,NULL,'Vydána verze 0.99.');
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (23,3,'en','announcement',1,NULL,NULL,NULL,0,'2012-01-07 14:52:41',NULL,'2012-01-25 00:00:00',NULL,NULL,NULL,'Version 0.99 released.');


/*
	PAGES
*/
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (24,3,'cs','page',1,'o-nas',NULL,NULL,0,'2012-01-09 00:00:00',NULL,'2012-01-09 00:00:00',NULL,'O nás','','<br><p>Systém pro správu obsahu (CMS z anglického content management system) je software zajišťující správu dokumentů, nejčastěji webového obsahu. Mezi základní funkce CMS (obvykle se člení na administrátorské a uživatelské) patří:</p><p><ul><li>řízení přístupu k dokumentům</li><li>správa uživatelů a přístupových práv</li><li>správa souborů</li><li>správa obrázků či galerií</li><li>kalendářní funkce</li><li>statistika přístupů</li></ul></p>');
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (25,3,'en','page',1,'about-us',NULL,NULL,0,'2012-01-09 00:00:00',NULL,'2012-01-09 00:00:00',NULL,'About us',NULL,'<br><p>A content management system (CMS) is a system providing a collection of procedures used to manage work flow in a collaborative environment. These procedures can be manual or computer-based. The procedures are designed to do the following:</p><ul><li>Allow for a large number of people to contribute to and share stored data</li><li>Control access to data, based on user roles</li><li>Aid in easy storage and retrieval of data</li><li>Control of data validity and compliance</li><li>Reduce repetitive duplicate input</li><li>Improve the ease of report writing</li><li>Improve communication between users</li></ul>');


/*
	POSTS
*/
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (26,3,'cs','post',1,'administracni-rozhrani',NULL,NULL,0,'2012-01-09 00:00:00',NULL,'2012-01-25 00:00:00',NULL,'Administrační rozhraní',NULL,'<img src="/site/content/admin-pane-cz.png" style="width:555px;"><br style="margin-bottom: 8px;"><img src="/site/content/admin-dialog-cz.png" style="width:555px;">');
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (27,3,'en','post',1,'admin-area',NULL,NULL,0,'2012-01-09 00:00:00',NULL,'2012-01-09 00:00:00',NULL,'Admin Area',NULL,'<img src="/site/content/admin-pane-en.png" style="width:555px;"><br style="margin-bottom: 8px;"><img src="/site/content/admin-dialog-en.png" style="width:555px;">');
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (28,3,'cs','post',1,'hello-world',NULL,NULL,0,'2012-01-09 00:00:00',NULL,'2011-12-31 00:00:00',NULL,'Hello, World!',NULL,'<p>„Hello, World!“ je malý počítačový program, který vypíše na výstupní zařízení (nejčastěji obrazovku) text „Hello, world!“. Používá se jako ukázka při výuce programování v určitém programovacím jazyce a mnoho studentů jej píše jako svůj první malý program.</p>');
INSERT INTO `items` (`id`,`user_id`,`language`,`type`,`publish`,`uri`,`translation_id`,`parent_id`,`order`,`date_created`,`date_updated`,`date_start`,`date_end`,`title`,`data`,`content`) VALUES (29,3,'en','post',1,'hello-world',NULL,NULL,0,'2012-01-09 00:00:00',NULL,'2011-12-31 00:00:00',NULL,'Hello, World!',NULL,'<p>A "Hello world" program is a computer program that outputs "Hello, world" on a display device. Because it is typically one of the simplest programs possible in most programming languages, it is by tradition often used to illustrate to beginners the most basic syntax of a programming language, or to verify that a language or system is operating correctly.</p>');