---
id: 2372
title: Taking back control
date: "2025-04-14T06:00:00"
slug: taking-back-control
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
  - name: artocalypse
    slug: artocalypse
    id: 58
  - name: RSS
    slug: rss
    id: 9
---


<p>In another part of this site I keep an online diary, and an important part of that is a simple, <a href="https://diary.uncountable.uk/snapshots/">captioned photo feed</a> of things I see that inspire me. </p>



<p>I implemented this originally using Google photos &#8211; I&#8217;d move a photo to a specific album, add a caption and the web page would be automatically updated.  A nice workflow that enabled me to accumulate 600+ images over two years.</p>



<p>All very nice, until it wasn&#8217;t.  Turns out that Google is an <a href="https://thoughts.uncountable.uk/unreliable-platforms/" data-type="post" data-id="2136">unreliable platform</a> to depend upon (who knew?).  They deprecated the API I was using and my photo feed went entirely offline on 1 April.</p>



<p>So, I did what I should have done all along &#8211; host the images on my own site.  This was easier said that done though &#8211; I had 600+ captions and dates as well as the images that needed preserving.</p>



<p>It turns out that Google&#8217;s &#8220;Takeout&#8221; function is designed to make it as difficult as possible to take something out.  They do provide the meta data for each image, but not in a format that makes it easy to link with the image.  If you have edited the photo, or it has a long name, the file name is truncated in a way that makes simple matching impossible.</p>



<p>Anyway, after a few wrestling sessions, and an awful lot of help from DeepSeek AI, I managed to get all the photos, dates and captions migrated into the wordpress media library.</p>



<h3 class="wp-block-heading">Enabling innovation</h3>



<p>I created a <a href="https://diary.uncountable.uk/snapshots/">basic display</a>, which mirrors the output I had before when I used the Phototonic plugin.  Unfortunately that plugin doesn&#8217;t dynamically pick up new tagged items in the media library, so I deleted it and wrote a custom php function instead.</p>



<p>It&#8217;s a little bit laggy during the infinite scroll, but usable for now. But now I&#8217;m excited to build new ways to display the images, now that the assets are completely within my control.</p>



<p>For example, the Photonic plugin didn&#8217;t pull in the date from google photos, only the caption.  But now I have access to the date, I am playing with an idea to display a nicely formatted date overlay on each picture.</p>



<p>This presented another problem &#8211; on google the date was accurate because it was the date the photo was taken.  However, I might not load up photos on the day they were taken, and wordpress does not allow dates of media to be edited.</p>



<p>So, I wrote another small php function which added an edit date box to the media library, so I can manually alter dates to reflect the day they were taken.</p>



<h3 class="wp-block-heading">New photo RSS feed</h3>



<p>I&#8217;m super excited about another new feature I added this morning &#8211; a captioned photo RSS feed for my site.  </p>



<p>This feed consists of the latest snapshot content, plus captioned photos inside my diary pages.  People can subscribe to this feed on the following address:</p>



<p><a href="https://diary.uncountable.uk/feed/photos">https://diary.uncountable.uk/feed/photos</a></p>



<p>This is something that was impossible before when they were hosted on Google.  It&#8217;s also not an out the box feature on WordPress, but with the help of AI again, I had the php code generated within minutes.</p>



<p>I have 1500+ photos in wordpress now, which added to at the rate of about 10 a week.  I feel there&#8217;s a lot more I can do with displaying these in interesting ways.</p>



<p>Just shows the power of taking back control.  Should have done it a long time ago.</p>
