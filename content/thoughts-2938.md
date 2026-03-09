---
id: 2938
title: One big plugin
date: "2026-03-09T06:00:00"
slug: one-big-plugin
site: "https://thoughts.uncountable.uk"
wp_url: "https://thoughts.uncountable.uk"
root_slug: thoughts
site_name: My Thoughts
featured_media_url: null
featured_media_srcset: null
type: post
category:
  - name: Various Things
    slug: various-things
    id: 1
tag: []
---


<p>Oh &#8230; that aged well.</p>



<p>My <a href="https://thoughts.uncountable.uk/a-workflow-for-wordpress/" data-type="post" data-id="2927">last post</a> talked about the workflow I used with WPcode to create a lot of bespoke functionality for the <a href="https://discoverdursley.org.uk/">Discover Dursley</a> website.  A lot has changed in three weeks and I&#8217;ve now pivoted again &#8211; this time to a more sustainable long term solution.</p>



<p>Ironically, it was the success of the version control plugin in that post which brought forward the change.  Having the ability to roll back easily meant I could develop ever more complex features.  Soon I had 61 modules in WPCode,  with some being 400+ lines.</p>



<p>This was way too fragile.  Although I could knock features out in a couple of hours, there was no unit testing, build process, documentation or file level version control.  Furthermore, the cross dependencies between functions in different modules added a lot of brittle code and work arounds.  On top of all that, I was doing all this on the live site (it&#8217;s being actively edited all the time which makes developing on a stage site almost impossible).  </p>



<p>It was clear I had to bite the bullet and set up a proper local development environment.</p>



<p>Step one was to create a <code>docker-compose</code> running a local copy of the site.  Due to all the media, the site backup is 350+MB which is far too unwieldy.  So instead I just downloaded the database, zipped up key directories in <code>wp-content</code> and added a rule in <code>.htaccess</code> to pick up media from live rather than local.</p>



<p>Step two was a straightforward lift and shift of functionality from WPcode into one monolithic plugin.  The only thing that had to change was the CSS packaging system.  Previously I was bundling modules from WPCode and injecting into <code>&lt;head&gt;</code>,  so that had to change to a native bundler.</p>



<p>At the same time I could introduce some basic unit tests and documentation which made me feel better. Amazingly, and pleasingly, it worked first time &#8211; just de-activated WPCode, upload and activate the v0.1.0 zip plugin and hey presto &#8230; the site looked exactly the same!</p>



<p>Step three is coming up.  There&#8217;s an awful lot of hard coded post id&#8217;s etc in the code base.  When I was doing it all in the live, it sort of seemed OK because the code was in the same dashboard as the posts.  But it&#8217;s obviously not a very good idea!  But now this separation exists, I should be able to make some dashboard screens where those values can be captured and managed as configuration rather than code.</p>



<p>As always, lots to learn and evolve.  Nothing ever stands still.</p>
