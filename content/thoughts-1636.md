---
id: 1636
title: Making stripey code
date: "2024-09-11T06:00:00"
slug: making-stripey-code
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


<p>I was checking out a post from Bee this morning on new ways to <a href="https://splendide-mendax.com/posts/2024-09-07_translation_styles">format different translations of Latin poetry</a> when my eye was drawn to her code box at the bottom.  Every other line was shaded which made it much easier to distinguish the lines.</p>



<p>I don&#8217;t think I&#8217;ve ever seen that before, and wanted it on my site as well.  If you are of a certain age, it also has a whiff of the old giant computer printer paper that used to have alternate green backgrounds for the lines.</p>



<p> It turns out to be a very simple piece of CSS:</p>



<pre class="wp-block-code has-small-font-size" style="border-radius:0px;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><code>/* make alternate lines on code blocks stripey */
code {
     --_lh: 2em;
     background: repeating-linear-gradient(180deg, 
                 hsl( 216 , 16% , 88% ) 0 var(--_lh), 
                 hsl( 216 , 16% , 86% ) 0 calc(2*var(--_lh)));
    line-height: var(--_lh);
    padding-left:  5px;
    padding-right: 5px;
}</code></pre>



<p>Creating a private custom property <code>--_lh</code> for the code line height keeps things easier to maintain.  Once you set the line height, the linear gradient function just specifies the colours to put on the first and second stripes.</p>



<p>The <code>hsl</code> colour function is also useful here.  I only wanted a very slight darkening of the usual colour for my code blocks and tweaking the third parameter by a couple of % was sufficient for a subtle look.</p>



<p>Overall, I think it makes blocks of code more approachable and comfortable to study. </p>



<p></p>
