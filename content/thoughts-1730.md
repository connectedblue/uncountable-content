---
id: 1730
title: More stripey
date: "2024-09-21T06:00:00"
slug: more-stripey
site: "https://thoughts.uncountable.uk"
wp_url: "https://thoughts.uncountable.uk"
root_slug: thoughts
site_name: My Thoughts
featured_media_url: null
featured_media_srcset: null
type: post
category:
  - name: Digital Life
    slug: digital-life
    id: 6
tag:
  - name: Blogging
    slug: blogging
    id: 14
---


<p>Sara took the code I made for <a href="https://thoughts.uncountable.uk/making-stripey-code/" data-type="post" data-id="1636">stripey code boxes</a> and <a href="https://sarajaksa.eu/2024/09/kako-primere-kode-narediti-bolj-berljive-z-css-jem/">added it to her site</a> with modifications.  In particular, she added a dark mode, so that the code renders in a dark shade of stripeyness.</p>



<p>I use a wordpress plugin for the dark mode switch on this blog, and it proved to be a bit unreliable.  What I really wanted was a generic code for the actual formatting, and then isolate the particular selectors for my set up when dark mode is enabled.</p>



<p>So, I decided to have binary custom properties <code>--is-light</code> and <code>--is-dark</code> that get set independently of the stripey code.  So now, the code becomes:</p>



<pre class="wp-block-code" style="border-radius:0px;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><code>/* make alternate lines stripey on code boxes */

pre:not(.no-stripey) {
   --_lh: 2em;
   --_l1-background: 
        var(--is-light,hsl(0, 0%, 14%)) 
        var(--is-dark, hsl(0, 0%, 14%));
   --_l2-background: 
        var(--is-light,hsl( 216 , 16% , 86% )) 
        var(--is-dark,hsl(0, 0%, 16%));
   --_l-color: 
        var(--is-light,#37505d)
        var(--is-dark, #f0f0f0);

   background: repeating-linear-gradient(180deg,              
       var(--_l1-background) 0 var(--_lh), 
       var(--_l2-background) 0 calc(2*var(--_lh)));
   line-height: var(--_lh);
   color: var(--_l-color);
}</code></pre>



<p>This code sets the <code>l1</code> and <code>l2</code> background and also the foreground colour depending on whether the flags <code>--is-light</code> or <code>--is-dark</code> are set.  </p>



<p>Note also I included a <code>.no-stripey</code> class.  Sara noticed that she has some posts where the <code>pre</code> tags are not code snippets.  I have a few of those too (for example on my <a href="https://thoughts.uncountable.uk/kastlebaj/" data-type="post" data-id="1346">Kastlebaj</a>).  So essentially, stripeyness is the default behaviour unless I throw a <code>no-stripey</code> class onto a place where I don&#8217;t want it.  </p>



<p>The light and dark custom properties are set up as follows:</p>



<pre class="wp-block-code" style="border-radius:0px;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><code>/* set light mode and dark mode flags */

:root {
   --is-light: initial;
   --is-dark:  ; /* the value is one space */
}

html.wp-dark-mode-active,
&#91;data-wp-dark-mode-active="true"] {
   --is-light:  ; /* the value is one space */
   --is-dark: initial;
}</code></pre>



<p>The thing that makes this work is that any custom property with value <code>initial</code> automatically picks up the default value when called with <code>var</code>.  So these default values are defined in the stripey code block.  But by setting the value to a single space, that is inserted instead of the default value (and hence does not appear in the code).</p>



<p>This has the advantage that these toggle properties can also be re-used in other areas of the CSS as well where different values are required for light and dark modes.</p>



<p>The selectors <code>html.wp-dark-mode-active</code> etc are just the relevant selectors for dark mode in my theme and plugins.  You&#8217;ll have to pick the ones relevant for your site to define the dark mode toggle. </p>



<p>This is a great example of how incremental improvements are made as bloggers share and spread ideas. The whole thing was <a href="https://splendide-mendax.com/posts/2024-09-07_translation_styles">sparked by Bee</a> who was trying to find the best way to format alternative translations of Latin poetry.</p>



<p>You never know quite where your next inspiration might come from on the independent web.</p>
