---
id: 932
title: "Re: Directory Enquiries"
date: "2024-07-10T17:11:49"
slug: re-directory-enquiries
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


<p>Jeremy posed an excellent question about how to organise resources for front end developers his post <a href="https://adactio.com/journal/21278">Directory Enquiries</a>.</p>



<blockquote class="wp-block-quote is-style-plain is-layout-flow wp-block-quote-is-layout-flow is-style-plain--33">
<p>I actually think there are&nbsp;<a href="https://adactio.com/links/tags/frontend,development">plenty of good articles and resources on front-end development</a>&nbsp;being published. But they’re not being published in any one specific place. People are publishing them on their own websites.</p>



<p><a href="https://ishadeed.com/">Ahmed</a>,&nbsp;<a href="https://www.joshwcomeau.com/">Josh</a>,&nbsp;<a href="https://thinkdobecreate.com/">Stephanie</a>,&nbsp;<a href="https://piccalil.li/">Andy</a>,&nbsp;<a href="https://lea.verou.me/">Lea</a>,&nbsp;<a href="https://rachelandrew.co.uk/">Rachel</a>,&nbsp;<a href="https://robinrendle.com/the-cascade/">Robin</a>,&nbsp;<a href="https://css-irl.info/">Michelle</a>&nbsp;…I could go on, but you get the picture.</p>



<p>All this wonderful stuff is distributed across the web. If you have a well-stocked RSS reader, you’re all set. But if you’re new to front-end development, how do you know where to find this stuff?&nbsp;<a href="https://adactio.com/journal/21241">I don’t think you can rely on search</a>, unless you have a taste for&nbsp;<a href="https://simonwillison.net/2024/May/8/slop/">slop</a>.</p>
</blockquote>



<p>I think this is a great way to think about this problem. Rather than rely on central platforms to author critical content, which can disappear at any time, why not just curate the existing content from the acknowledged experts out there.</p>



<p>I have a suggestion for an approach.  I&#8217;m basing it on what we use for <a href="https://artocalypse.org/">the artocalypse</a>, which is essentially a curated RSS feed for IndieWeb artists.  The home page is a customised view of the FreshRSS platform.</p>



<p>Let&#8217;s suppose that the hub service is called Front End Directory.  The directory determines which authors are potential experts for different parts of the directory.  They also determine the taxonomy of the directory.  </p>



<p>The directory approaches each author and asks if they would like to contribute (either from back catalogue or new content) and asks them to licence permission to reproduce their feed (artocalypse asks for similar permission in its <a href="https://the.artocalypse.org/terms-of-membership/">terms of membership</a>).  </p>



<p>Authors then tag their articles to a particular RSS feed on their site according to the category then are writing for (e.g. <code>#fed-css</code> which is destined for the CSS category of the Front End directory). So only certain articles intended for the Front End Directory are included, not their whole website feed.</p>



<p>The Front End Directory team can then construct a giant OPML which contains all the individual author category RSS feeds.  Once the feeds are set up, there&#8217;s no more work to do centrally other than just monitor for quality and relevance.  Otherwise just sit back and let the authors do the content creation.</p>



<p>The Front End Directory can then create it&#8217;s own RSS feeds which aggregate all the categories.  It can also display a live feed on it&#8217;s homepage like the artocalypse does.  </p>



<p>Better still, allow anyone on the web to create a display hub based on the official OPML.  That distributes the load where users can browse the content in different settings.</p>



<p>Because it&#8217;s RSS, the links always go back to the original author so they are always credited with the work.</p>



<p>I&#8217;m happy to get together with a few people to develop these ideas further.  Decentralised aggregation and quality control are something that the IndieWeb can co-operate on well, and experiment with different solutions. </p>
