---
id: 2467
title: Displaying static HTML randomly
date: "2025-05-19T06:00:00"
slug: displaying-static-html-randomly
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


<p>I&#8217;m hosting the <a href="https://thoughts.uncountable.uk/may-2025-indieweb-carnival-small-web-communities/" data-type="post" data-id="2360">May 2025 IndieWeb blog carnival</a>, and keeping track of submissions as they come in in a list.  I&#8217;ll also be doing a roundup post where I&#8217;ll summarise the submissions in another list.</p>



<p>These lists could get quite long,  so I&#8217;d quite like them to be displayed in a random order, so no single submission is &#8220;favoured&#8221;.  Page visitors might tend to only look at the first few items in a long list, so every submission gets an equal chance to be in the top 3.</p>



<p>This is something that you could achieve with server side code, but is quite overkill for such a small use case. So I thought instead about how to randomise static HTML on the front end.</p>



<p>I don&#8217;t think there&#8217;s a way currently to do this in pure CSS, but there&#8217;s a very neat solution with just a few lines of javascript thrown in:</p>



<pre class="wp-block-code has-medium-font-size" style="border-style:none;border-width:0px;border-radius:0px;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><code>&lt;script&gt;
  const list = document.querySelector('.randomize-order');
  const items = Array.from(list.children);
items.sort(() =&gt; Math.random() - 0.5);
  items.forEach(item =&gt; list.appendChild(item));
&lt;/script&gt;
&lt;ul class="randomize-order"&gt;
  &lt;li&gt;item one&lt;/li&gt;
  &lt;li&gt;item two&lt;/li&gt;
&lt;/ul&gt;</code></pre>



<p>Of course, you could turn this into a more general utility function, but for now, I only need it here, so a bit of inline scripting on the page means I&#8217;m not needlessly cluttering up the sitewide js files.</p>



<p>It might not be immediately obvious why this code works &#8211; the append command looks at first glance that it would just add the shuffled items onto the end of the static list.</p>



<p>However, the reason it gives the desired shuffling behaviour is due to how DOM nodes behave when they&#8217;re moved.</p>



<p>The key insight is that when you call <code>appendChild()</code> on a node that already exists in the DOM, it doesn&#8217;t create a copy &#8211; it moves the existing node to its new position. So:</p>



<ul class="wp-block-list">
<li>The first append moves that item to the end</li>



<li>The next append moves the next item to the end (after the previous one)</li>



<li>And so on&#8230;</li>
</ul>



<p>This behavior is specified in the DOM standard &#8211; if you try to append a node that&#8217;s already in the document, it will be moved rather than duplicated. This is why you end up with a shuffled list rather than duplicated items.</p>



<p>An alternative way to think about it: The <code>items</code> array contains references to the actual DOM nodes, not copies of them. When you manipulate these nodes through the DOM API, you&#8217;re moving the original elements.</p>



<p>If you wanted to create actual duplicates, you&#8217;d need to explicitly clone the nodes using <code>item.cloneNode(true)</code>.</p>
