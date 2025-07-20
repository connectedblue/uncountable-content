---
id: 2596
title: Content Consolidation
date: "2025-06-23T06:00:00"
slug: content-consolidation
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


<p>I use wordpress to both create and display content for <a href="https://diary.uncountable.uk/">my diary</a> and this blog.  They are hosted on two different subdomains: <code>diary.uncountable.uk</code> and <code>thoughts.uncountable.uk</code>.    </p>



<p>It can be a pain managing two blogs, but they both have a very different purpose, identity and content.  So I continue with both, as writing is more important, and time consuming than messing around with layouts.</p>



<p>Recently though, I&#8217;ve begun an experiment to bring together all my writing under the root domain.  There is now a consolidated replica available which resides at <a href="https://uncountable.uk/">https://uncountable.uk/</a>.</p>



<p>As of June 2025, this does not have the styling, navigation or general UI I would want, but it does demonstrate a few functional features that I find very beneficial:</p>



<ul class="wp-block-list">
<li>Static site that rebuilds 2,500+ pages three times a day from the original wordpress sources.  Build time is around one minute.</li>



<li>Infinite scroll of content, and pressing any item expands and displays it in-line rather than linking to another page.</li>



<li>Very fast to scroll and display any post.</li>



<li>URL structure mirrors wordpress, so for example <a href="https://thoughts.uncountable.uk/non-discretionary-lifestyle-fund-multiple/">https://thoughts.uncountable.uk/non-discretionary-lifestyle-fund-multiple</a> maps to <a href="https://uncountable.uk/thoughts/non-discretionary-lifestyle-fund-multiple/">https://uncountable.uk/thoughts/non-discretionary-lifestyle-fund-multiple</a>.  And <a href="https://diary.uncountable.uk/2025/06/2025-warden-conference/">https://diary.uncountable.uk/2025/06/2025-warden-conference</a> maps to <a href="https://uncountable.uk/diary/2025/06/2025-warden-conference/">https://uncountable.uk/diary/2025/06/2025-warden-conference</a>.  <br><br>This facilitates a potential decommission of the two wordpress front ends later, without breaking the many links I have shared in social media and other places (not to mention the cross linking between my own blog posts)</li>



<li>Images with captions are now <a href="https://uncountable.uk/diary/2025/06/2025-06-18-ox-eye-daisy/">posts in their own right</a>. This allows photo content to be displayed with much more flexibility, as the home page demonstrates &#8211; for any given day, you can see the diary entry, thoughts posts as well as individual images I&#8217;ve taken.</li>



<li>New repackaging of content in different ways &#8211; the <a href="https://uncountable.uk/weekly-archive/">weekly archive</a> consists of one post containing all my content from a single week, styled in a &#8220;newsletter&#8221; style format.</li>



<li>Categories and tag groupings preserved from wordpress, for example the <a href="https://uncountable.uk/diary/series/riverfly/">series on riverfly</a>, the <a href="https://uncountable.uk/diary/projects/stroud-valleys-project/">Stroud Valleys</a> project and the <a href="https://uncountable.uk/thoughts/topic/people-money/">People &amp; Money</a> interviews.</li>
</ul>



<p>There&#8217;s still lots of work to be done before I am even in a position to decommission the wordpress front end:</p>



<ul class="wp-block-list">
<li>How to reconcile the styling of the diary compared to this blog</li>



<li>RSS feeds</li>



<li>Guestbook</li>



<li>menu navigation that makes sense across both content types</li>



<li>search (something I don&#8217;t expose on either site today, but could. Seems like it will be quite difficult on a static site.</li>
</ul>



<p>I would still maintain wordpress for content management at the backend (so called headless configuration).  I don&#8217;t really see any benefit in migrating to new system, especially since content augmentation is such a large part of my content rendering (more on that in a future article).</p>



<p>It&#8217;s been an interesting project and also aligns with my broader goals to <a href="https://thoughts.uncountable.uk/reading-me-in-200-years/" data-type="post" data-id="612">be read in 200 years time</a>.  In order to achieve that, I need to decouple the content storage from the display technology, and doing this consolidation project goes a long towards organising everything in a better way.</p>
