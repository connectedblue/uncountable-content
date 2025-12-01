---
id: 1296
title: "Re: RSS Feed Best Practises"
date: "2024-08-14T06:00:00"
slug: re-rss-feed-best-practises
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
  - name: Reply Posts
    slug: reply-posts
    id: 61
tag:
  - name: RSS
    slug: rss
    id: 9
---


<p>Kevin has put together an <a href="https://kevincox.ca/2022/05/06/rss-feed-best-practices/">excellent practical reference</a> on the best practice for your RSS feeds:</p>



<blockquote class="wp-block-quote is-style-plain is-layout-flow wp-block-quote-is-layout-flow is-style-plain--13">
<p>People generally call feeds “RSS Feeds” but usually they aren’t specifically talking about RSS. RSS isn’t the only, or even the best format. Using a standardized format is critical to your feed being understood by the widest variety of readers and search engines.</p>



<p>You should use&nbsp;<a href="https://validator.w3.org/feed/docs/rss2.html">RSS 2</a>&nbsp;or&nbsp;<a href="https://datatracker.ietf.org/doc/html/rfc4287">Atom</a>. These formats are very widely supported. Other common formats are earlier RSS standards and&nbsp;<a href="https://www.jsonfeed.org/">JSON Feed</a>&nbsp;or&nbsp;<a href="https://microformats.org/wiki/h-feed">Microformats h-feed</a>. I would avoid using these—or even less common formats—as they are less widely supported.</p>
</blockquote>



<p>It&#8217;s a super comprehensive guide.  I don&#8217;t have a lot of control on the feed production since wordpress does most of the heavy lifting, but there&#8217;s still a number of things I will think about.</p>



<p>I have recently been <a href="https://thoughts.uncountable.uk/elevate-your-websites-rss-feed/" data-type="post" data-id="1061">elevating the RSS experience</a> for people who subscribe to my blog, so being aware of the nuances of the format and how various clients implement the content is of interest to me.</p>



<p>The things I will think about more deeply are:</p>



<ul class="wp-block-list">
<li>Dates</li>



<li>Discovery</li>



<li>Styling</li>



<li>Self links</li>
</ul>



<p>I add a footer in the RSS feed for my daily post and I&#8217;ve found by trial and error how content appears in various readers.  I use inline styles mostly for padding &#8211; so if it works, great and if it doesn&#8217;t, then no harm done.  But Kevin points out some styling issues to avoid because they could inadvertently make your content unreadable if they are only partially stripped by the clients.</p>



<p>For me, RSS is a key community engagement tool.  I don&#8217;t want an email list,  so if someone wants to read my blog on a regular basis, I want to provide the best RSS experience I can in return.</p>



<p>  </p>
