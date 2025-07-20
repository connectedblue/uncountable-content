---
id: 1156
title: Experimenting with RSS
date: "2024-08-12T06:00:00"
slug: experimenting-with-rss
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
  - name: RSS
    slug: rss
    id: 9
---


<p>I&#8217;m rethinking the purpose and nature of my main website and RSS feed.  It requires a different approach to posting, and also some custom code to facilitate the experience I want.</p>



<p>There&#8217;s still a way to go, and these notes are the outcomes so far.</p>



<h3 class="wp-block-heading">Objective</h3>



<p>I want to move away from the idea that a blog equals a website, and the standard notion that the latest post written is the one shown at the top.</p>



<p>I just don&#8217;t think it&#8217;s of much value to a reader or RSS subscriber to see whatever random ideas pop into my head on any given day. Plus I might write 4 posts on a day, and then nothing for a few days.</p>



<p>The combination of random topics showing up at random times seems to be a very low quality reward in exchange for the (very much appreciated) act of seeking out my site.</p>



<p>I also want to treat RSS subscribers as the primary audience and deliver an experience that doesn&#8217;t instantly make them reach for the unsubscribe button.  </p>



<p>It&#8217;s one of the highest privileges you can earn online for someone to add your feed to their reader.  I don&#8217;t want to abuse that.</p>



<h3 class="wp-block-heading">Reader experience</h3>



<p>My aim is to deliver the following structure to RSS subscribers and main page visitors:</p>



<ul class="wp-block-list">
<li>One post every day published at 6am.  Optionally, a second post at 6pm on some days.</li>



<li>Sometimes a group of posts on consecutive days follow a common theme.</li>



<li>Daily posts aren&#8217;t necessarily new content.  I may choose to put a previously written post in the main feed sometimes.</li>
</ul>



<p>For RSS subscriber, there is an additional structure:</p>



<ul class="wp-block-list">
<li>A short section at the bottom of every post with some custom, time relevant information (such as what&#8217;s coming up soon on the blog).  And also some links to other blogs I&#8217;ve enjoyed recently.  I also want to include some links to <a href="https://thoughts.uncountable.uk/thoughts-on/reply-posts/">reply posts</a> I&#8217;ve made recently.</li>



<li>Some RSS only posts that appear in the 6pm slot.  Exclusive content for RSS subscribers.  This will never appear in the main navigations, although the post will exist as a web page that can be directly linked to from the RSS feed.</li>



<li>Essentially, the RSS feed is like a daily newsletter with one or two articles and some news snippets.</li>
</ul>



<p>I will still be publishing other articles at different times that will appear in different sections of the website.  For example, this post, when it was first published, appeared in the <a href="https://thoughts.uncountable.uk/thoughts-on/digital-life/">Digital Life</a> section at 10pm one night.  Website visitors would be able to view it if they happened to navigate there.</p>



<p>However, I may choose in the future to publish this article in the main feed.  So, if you happen to be reading this in RSS, then that&#8217;s exactly what&#8217;s happened.  I would have changed the published date from long ago to one a few days ago.</p>



<h3 class="wp-block-heading">Early Experience </h3>



<p>Moving to this threw up some issues to resolve in the early days:</p>



<ul class="wp-block-list">
<li>When switching previously published posts to the future, any internal links I&#8217;ve made to that post from elsewhere in the site <a href="https://thoughts.uncountable.uk/disabling-internal-links/" data-type="post" data-id="994">need to be disabled</a>.</li>



<li>The RSS post footer initially included a couple of links to recent reply posts I&#8217;d made.  I did this by just querying the RSS feed for the relevant section to get the latest two links.  However, the astute among you will spot the obvious infinite loop in including an item in the RSS body which requires querying an RSS feed which requires the same item in the footer.<br><br>I did not spot this, and woke up to find the website unavailable one morning.  There is a workaround for this, but I&#8217;ve not yet been brave enough to implement it at time of writing.</li>



<li>Sometimes wordpress scheduling failed.  If the 6am slot is missed, it doesn&#8217;t get republished later in the day.  I will need to investigate whether there is a more reliable way to do this.</li>



<li>I use a plugin called Timed Content which allows certain paragraphs in the RSS footer to appear only at certain times (used for scheduling &#8220;coming soon&#8221; content).  But it sometimes doesn&#8217;t compile properly early in the day, probably due to some caching issues.</li>
</ul>



<p>In general though, I prefer this way of working on my website.  I can still publish articles whenever I wish, and I just spend a bit more time planning the future schedule.  </p>



<p>This gives me an opportunity though to present content in new ways.  For example, I had a <a href="https://thoughts.uncountable.uk/july-2024-principles-of-investing-week/" data-type="post" data-id="965">principles of investing week</a> where I pulled together some posts which linked together some core ideas I have on that topic.</p>



<p></p>
