---
id: 1313
title: Fine tuning post display in WordPress
date: "2024-08-15T06:00:00"
slug: fine-tuning-post-display-in-wordpress
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
  - name: RSS
    slug: rss
    id: 9
---


<p>There are some small tweaks to this blog&#8217;s navigation which give more flexibility on the type of posts I can make.</p>



<p>I created some special tags for posts when I want this fine tuned behaviour:</p>



<ul class="wp-block-list">
<li><code>Quick Thoughts</code> when I just want to say something short, a bit like a tweet.  This is random stuff at random times, so I don&#8217;t want it appearing on the home page or in the main RSS feed.  There&#8217;s a special archive template to show these on the <a href="https://thoughts.uncountable.uk/topic/quick-thoughts/">Quick Thoughts</a> page.</li>



<li><code>RSS only</code> for posts that only RSS subscribers can read.  So these need to show up in the feeds but not the website.  </li>



<li><code>Not in main feed</code> is for any post that I want to publish  but I don&#8217;t want it to appear on the home page or the main RSS page.  Usually because I have a specific schedule and theme around the main posts, and this just doesn&#8217;t fit it.  A good example are posts for <a href="https://thoughts.uncountable.uk/thoughts-on/princeton-companion-to-mathematics/">my maths reading project</a> which no-one is interested in except me!  </li>
</ul>



<p>I use WordPress, and although there may well be some plug-ins to do this, it&#8217;s just as quick to write a bit of custom code and get exactly the behaviour I want.</p>



<p>I&#8217;ve included the code below. If anyone wants to use it, it should be self explanatory how to customise it &#8211; all you do is change the tag IDs to ones relevant for your system.</p>



<p>If you&#8217;ve never used custom code on wordpress before, I recommend installing the <a href="https://wordpress.org/plugins/code-snippets/">Code Snippets plug-in</a> which allows you to have as many custom code pieces as you want.</p>



<p>Finally, as an additional source of amusement for myself, this is what an <a href="https://thoughts.uncountable.uk/re-my-favourite-feeds/">rss only post looks like</a> if you try to view it on the web.  It really is <a href="https://thoughts.uncountable.uk/topic/rss-only/">a secret</a> between me and your RSS reader. </p>



<pre class="wp-block-code has-small-font-size" style="border-width:1px;border-radius:0px"><code>function include_exclude_from_feeds($query) {
	$not_in_tags = array();
	// Don't show certain tags on the home page or RSS feed
    if (is_home() 
        || ( is_feed() 
             &amp;&amp; !is_tag()  
             &amp;&amp; !is_category() ) ) {
    
       // 10 is Quick Thoughts, 62 is Not in main feed
        array_push($not_in_tags, 10, 62);  
        
    }
	// Don't show certain tags on the home page or archives
	if ( (is_home() || is_archive()) 
             &amp;&amp; !is_feed() 
             &amp;&amp; !is_admin())  {
          // 60 is RSS only
          array_push($not_in_tags, 60); 
    }
    $query-&gt;set('tag__not_in',$not_in_tags);
    return $query;
}

add_filter('pre_get_posts','include_exclude_from_feeds');</code></pre>
