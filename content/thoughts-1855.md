---
id: 1855
title: Editing CSS live
date: "2024-10-17T06:00:00"
slug: editing-css-live
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


<p>I was browsing Mike Aparicio&#8217;s thoughts on <a href="https://www.mikeaparicio.com/posts/2024-04-03-theming-design-systems/">design system themes</a> and stumbled into a fun way to hand control of your CSS to users using only HTML &#8211; no javascript involved.</p>



<p>Here&#8217;s an example you can try for this web page.  Here are some custom properties used in my website.  Go ahead, double click/tap in the code box and change some values &#8230;</p>



<pre>
<style style="display: block" contenteditable>:root {
  --wp--preset--color--base: #EBEBEF;
  --wp--preset--color--contrast: #1C2930;
  --wp--preset--font-size--medium: 1.2rem;
}</style></pre>



<p>Pretty neat, huh?</p>



<p>You can change the background colour, text colour and the font size used in this page.  It&#8217;s not a permanent change &#8211; refreshing the page will reset the values back.</p>



<p>This wizardry is achieved by adding <code>style</code>  and <code>contenteditable</code> attributes to the <code>&lt;style></code> tag.  So the code above is simply:</p>



<pre class="wp-block-code" style="border-style:none;border-width:0px;border-radius:0px;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><code>&lt;style style="display: block" contenteditable>
  :root {
   --wp--preset--color--base: #EBEBEF;
   --wp--preset--color--contrast: #1C2930;
   --wp--preset--font-size--medium: 1.2rem;
  }
&lt;/style></code></pre>



<p>This definitely falls firmly into the category of &#8220;things I didn&#8217;t know and can&#8217;t think of a use for&#8221;.   But I&#8217;ll file it away at the back of my mind with thousands of other arcane snippets and maybe one day the perfect opportunity will present itself.</p>
