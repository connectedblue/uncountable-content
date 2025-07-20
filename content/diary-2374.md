---
id: 2374
title: Getting the festival live
date: "2023-08-27T18:31:27"
slug: getting-the-festival-live
site: "https://diary.uncountable.uk"
wp_url: "https://diary.uncountable.uk"
root_slug: diary
site_name: My Diary
featured_media_url: "https://media.uncountable.uk/diary/2023/08/28183341/fesival-website.webp"
featured_media_srcset: "https://media.uncountable.uk/diary/2023/08/28183341/fesival-website-300x125.webp 300w, https://media.uncountable.uk/diary/2023/08/28183341/fesival-website-1024x428.webp 1024w, https://media.uncountable.uk/diary/2023/08/28183341/fesival-website-150x150.webp 150w, https://media.uncountable.uk/diary/2023/08/28183341/fesival-website-640x267.webp 640w, https://media.uncountable.uk/diary/2023/08/28183341/fesival-website.webp 2000w"
type: post
category:
  - name: Dursley Welcomes Walkers
    slug: dursley-welcomes-walkers
    id: 8
tag: []
---


<p>It&#8217;s August bank holiday weekend again, which means time to get the programme published for the annual <a href="https://festival.dursleywelcomeswalkers.org.uk/">Dursley Walking Festival</a>.  This gives people a whole month to book their walks before the festival starts in October.</p>



<p>This is the third year I&#8217;ve built the festival website, using WordPress and WooCommerce.  Most of the logic and functionality is built which means only changing some templates and loading the details of the new walks each year.</p>



<p>However, this year I wanted to focus on performance.  Last year the site was functional but very slow, and I could see from the stats that half the visitors clicked away after less than 10 seconds.</p>



<p>So I created a super fast cache which essentially served the raw HTML to visitors rather than the wordpress stack.  This is OK, except that the number of places remaining on each walk needs to update in real time.  The cached pages were not being updated automatically after each booking.</p>



<p>I managed to get a workable solution by &#8220;priming the cache&#8221; every three minutes by re-fetching new pages for each walk.  So there&#8217;s a delay of at most 15 minutes between a walk being booked and the correct remaining places being shown.</p>



<p>I sent out an email to our list of 845 subscribers and in the first 24 hours received 156 bookings.  So I&#8217;m happy enough that people are finding the site easy and fast to use.</p>
