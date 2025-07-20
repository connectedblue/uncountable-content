---
id: 994
title: Disabling internal links
date: "2024-08-10T06:00:00"
slug: disabling-internal-links
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


<p>I <a href="https://thoughts.uncountable.uk/do-one-thing-well/" data-type="post" data-id="207">deliberately use a lot</a> of internal links on my posts because there&#8217;s a lot of interconnected ideas and long running themes across my posts.</p>



<p>Occasionally you might want to take a previously published post offline for some reason.  Maybe you want to redraft it.  Or, as I do, schedule it again for a future date as a way of re-surfacing old content for current readers.</p>



<p>In this case, you don&#8217;t really want any internal links to that post to lead to a dead end, even temporarily.  It would be a real pain to go through all your posts, unlink the reference, and then set it back again when the post is live.</p>



<p>Fortunately there is a very nice CSS rule you can add to your site for the period a post called <code>my-post</code> is offline:</p>



<pre class="wp-block-code"><code>a&#91;href*='my-post']  {
      pointer-events: none;
      cursor: default;
      text-decoration: none;
 }</code></pre>



<p>Any post in your site that links to <code>my-post</code> will display the link as normal, non-clickable text.  It uses a pattern match so <code>my-post</code> doesn&#8217;t even have to be the full slug, just enough of it to uniquely identify the post that is offline.</p>



<p>You can also stack as many posts as you like in the selector, just separate each <code>a[href*='...']</code>with a comma.  </p>



<p>Of course, if someone has linked to your article from another website, this solution won&#8217;t solve that. That might need a temporary redirect or similar to give a meaningful message to those users.</p>



<p>But the small amount of code above will keep your own site consistent through this period of change in post status.</p>
