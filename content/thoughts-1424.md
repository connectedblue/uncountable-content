---
id: 1424
title: Curating a series of articles
date: "2024-08-24T06:00:00"
slug: curating-a-series-of-articles
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


<p>Blogs will typically organise groups of content using categories or tags.  They are useful to present related content to readers.  For example, I use them to group all <a href="https://thoughts.uncountable.uk/thoughts-on/reply-posts/">my reply posts</a>.</p>



<p>However, they don&#8217;t really help the reader to navigate an ordered series of articles.  Category archives are displayed usually in date order, which may not be the best order to read them in.  Moreover, if you click through to one, you then need to press the back button to find the next to read.</p>



<p>I recently created <a href="https://thoughts.uncountable.uk/a-reading-list-for-investing/" data-type="post" data-id="769">a reading list for investing</a> which is a collection of blog posts that make sense to read in sequence, like a book.  This acts like a table of contents, but the reader would still have to return to it and find the next one to read.</p>



<p>So I came up with the idea of a series navigation.  At the end of each article in the series, there is a link to the next and previous articles.  There is also a bit of text above it which differs depending on whether it&#8217;s the first, last or middle article in the series.  </p>



<p>For example, the article <a href="https://thoughts.uncountable.uk/what-is-risk/" data-type="post" data-id="663">on risk</a> has links at the bottom, so the reader can &#8220;turn the page&#8221; to the next one.  And the last one in the series <a href="https://thoughts.uncountable.uk/choosing-an-investment-platform/" data-type="post" data-id="760">on investment platforms</a> contains a &#8220;thanks for reading the series&#8221; message.</p>



<p>You could achieve this by manually adding navigation links to each article in the series, but that becomes a pain to maintain, if for example, I wanted to add another article in the middle, or wanted to change the layout of the nav box itself.</p>



<p>An automated solution is better, which adds the correct links to the end of each post in the series.  I didn&#8217;t bother to see if a wordpress plugin would do this &#8211; it&#8217;s a small amount of PHP code which I made generic enough to have different series in future.   If an article happens to be part of two series, both navigation boxes would be presented at the end so the reader knows which to select next.</p>



<p>The RSS reader experience is also <a href="https://thoughts.uncountable.uk/experimenting-with-rss/" data-type="post" data-id="1156">important to me</a>, so by writing the code myself, I can ensure that the next and previous links are presented correctly at the bottom of each article in the feed also.</p>



<p>If anyone would like to see wordpress code to do this, I have written <a href="https://thoughts.uncountable.uk/creating-a-series-navigation-on-wordpress-part-1/" data-type="post" data-id="1513">a tutorial</a> on how you can add it to your site.</p>



<p></p>
