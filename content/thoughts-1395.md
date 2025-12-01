---
id: 1395
title: "Re: Building on the idea of an IndieWeb zine"
date: "2024-08-22T06:00:00"
slug: re-building-on-the-idea-of-an-indieweb-zine
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
tag: []
---


<p>Following posts and discussions with others, Benjamin wrote up his thoughts on <a href="https://benjamin.parry.is/writing/2024/05/building-on-the-idea-of-an-indieweb-zine/">how an indieweb zine might be put together</a> in practice:</p>



<blockquote class="wp-block-quote is-style-plain is-layout-flow wp-block-quote-is-layout-flow is-style-plain--7">
<p>Publishing any physical media, regardless of quality, takes a lot of time and effort, particularly as the number of people involved increases. <strong>How might we make the process as simple and frictionless as possible for people contributing and curating?</strong></p>



<p>Part of the appeal and charm of physical zines and the IndieWeb at that they embody the DIY culture of self-expression without a strict set of rules or deadlines and a sense of ‘done’. <strong>How might we encourage people to participate around time-sensitive responsibilities and milestones?</strong></p>



<p>Print material is fixed (proportions, material) while the web is fluid. <strong>How might we create a seamless link between the dimensions and materials of these very different mediums?</strong></p>
</blockquote>



<p>There are a lot of excellent and creative proposals in his post which explore how individual authors can contribute by posting on their own website, but linking a coherent experience together using webrings and CSS print styles.</p>



<p>I&#8217;d like to suggest another piece of infrastructure that lends itself well to producing consistent curated content &#8211; the humble RSS feed.</p>



<p>RSS doesn&#8217;t have to be just a list of all content on the website (although that is how most people engage with it).  You can have an RSS feed with just one article in it.  Indeed, wordpress does this by default if you add <code>/feed</code> to any post URL.  But other blog tech could also do similar things.</p>



<p>This leads to two exciting possibilities for creating a curated zine.</p>



<p>First of all, a simple RSS aggregator can take all the individual post feeds and put them into a single zine sequence which anyone can subscribe to in their reader.  It takes no effort really to curate, the contents of the zine feed never changes for that edition and people can still subscribe to it in 5 years time and read that back copy.</p>



<p>But there&#8217;s also a way to use the post feed itself to create a consistent branded zine across all the different author websites.</p>



<p>The central editor designs an XSLT stylesheet template for the zine which is hosted on their website.  Each author then inserts an additional line into their zine post feed along the lines:</p>



<pre class="wp-block-code has-small-font-size" style="border-style:none;border-width:0px;border-radius:0px;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px"><code>&lt;?xml-stylesheet type="text/xsl" href="...." media="screen" ?&gt;</code></pre>



<p>pointing back to the central template.</p>



<p>What this means in practice is that the article at <code>/zine-post</code> is rendered however the author chooses in their website.  But the link <code>/zine-post/feed</code> will be rendered in the house style for the zine directly on the browser.</p>



<p>This central template could then include Benjamin&#8217;s idea of using a dedicated webring to point to the next article because all that is done in the styled header and footer above and below the RSS content for the post.</p>



<p>If everyone agreed to use semantic HTML like <code>&lt;article&gt;</code> etc, then you could also have a pretty good central CSS stylesheet that renders all zine posts consistently across different sites.</p>



<p>I find the whole area of XSLT styling fascinating.  It could be a good solution for creating curated expos in <a href="https://artocalypse.org/i/?rid=66c0e27be2034">the Artocalypse</a> (a site for artists which I run) so I will try knocking up some prototypes to see how this concept might work in practice.</p>
