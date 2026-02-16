---
id: 2927
title: A workflow for wordpress
date: "2026-02-16T06:00:00"
slug: a-workflow-for-wordpress
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


<p>One area that seems somewhat under reported in the AI world is the enormous ease and benefit it has brought to developing websites with wordpress.</p>



<p>Most people (including myself) have a love-hate relationship with WordPress for lots of valid reasons &#8211; slow performance, conflicting plugins, same-y design.  However, when coupled with AI, it&#8217;s possible to build fast, stable and bespoke sites with super powerful content management underneath.</p>



<p>I have five WP sites and over the last couple of years I&#8217;ve been using the following workflow:</p>



<ul class="wp-block-list">
<li>install plugins which only do &#8220;big things&#8221; &#8211; SEO, events, contact forms etc.  </li>



<li>Use <a href="https://wordpress.org/plugins/insert-headers-and-footers/">WPCode plugin</a> for php, CSS and JS snippets for small functions and bespoke components.</li>



<li>Export the latest WPCode json and use as context to Gemini Pro 3 when developing new features.</li>



<li>Use shortcodes to drop custom functions into pages and posts.</li>
</ul>



<p>One example where this is extensively used is <a href="https://discoverdursley.org.uk/">Discover Dursley</a>, a site I developed for our local town.  There are numerous places where AI generated custom code has produced efficient and performant features:</p>



<ul class="wp-block-list">
<li>the light/dark switcher</li>



<li>custom event lists for <a href="https://discoverdursley.org.uk/establishments/chantry-centre/">venues like the Chantry Centre</a>.</li>



<li>Bespoke layout for <a href="https://discoverdursley.org.uk/establishments/the-traditional-bakery/">establishments like shops</a>.</li>



<li>Grid navigation for <a href="https://discoverdursley.org.uk/directory/">tag directories</a>.</li>



<li>efficient bundling of CSS into versioned cache files</li>



<li>ensure images are no more than 200Kb when uploaded by numerous content editors</li>
</ul>



<h3 class="wp-block-heading">Version control</h3>



<p>It&#8217;s very useful to upload all your current snippets as a json file every time you make a request for a new feature. This allows the AI to make sure it&#8217;s not going to interact with another feature badly, and you can also re-use functionality from other snippets.</p>



<p>One downside though is version control. All code is stored in the database, so tools like git are a non-starter. If you just cut/paste code from AI and it doesn&#8217;t work first time, there&#8217;s no easy way to revert back.</p>



<p>So initially I employed a variety of manual workarounds: commenting out the old function, duplicating the snippet module and deactivating the old version, saving the old code in google keep etc.</p>



<p>This became more difficult to track as the number of snippets grew to 50 (snippets range in size from a couple of lines to 500+).  So I developed a very lightweight solution which has been a game changer for productivity.</p>



<p>I have released <a href="https://github.com/connectedblue/wpcode-version-control">WPCode Version Control</a> onto Github if you want to check it out.  The README is self explanatory, but essentially it&#8217;s a plugin to WPCode that allows snapshot versions of the entire snippet library to be taken, and individual snippets to be restored from previous snapshots.</p>



<h3 class="wp-block-heading">Why even use WPCode?</h3>



<p>I&#8217;m experimenting and toying with removing WPCode completely and just having one giant plugin for all the bespoke site features.  This would allow proper git version control as well as sharing between my sites.</p>



<p>However WPCode does provide important wrapping guards to disable rogue code &#8211; something that happens surprisingly regularly with edge cases emerging in production.  </p>



<p>It is also easier to hand over to others in the future if all the bespoke code is accessible from the wordpress dashboard.  Even if future maintainers have no coding knowledge, they can at least cut and paste the code into AI to troubleshoot.</p>



<p>So, for now, I&#8217;m happy to utilise the very capable and well supported WPCode, and focus all my time into developing features that improve the site.</p>
