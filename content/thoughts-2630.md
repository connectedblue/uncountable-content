---
id: 2630
title: External link cards
date: "2025-08-31T06:00:00"
slug: external-link-cards
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
tag: []
---


<p>Almost every modern website uses cards to display what content they have on other pages &#8211; usually an image, title and sometimes a short snippet.</p>



<p>They are an excellent way to show readers what you have available, and I suppose also act as a tool to keep people within the boundary of your site.</p>



<p>In contrast, external links are almost always shown as a text hyperlink.  It&#8217;s great to link to sites, but the visual formatting is nowhere near as appealing as for the internal links.</p>



<p>But what if you want to make your external links first class citizens on your site?  How would you go about it?</p>



<p>Before I dive into how I solved this problem, take a look at external link cards in action on the <a href="https://discoverdursley.org.uk/2025-dursley-walking-festival/">walking festival page</a> that I did for our town website.  This page shows all the walks in the festival, but the booking links are on eventbrite.</p>



<p>(yes, I know it&#8217;s somewhat ironic that I include a text link, but my design rules for this blog are quite clear:  no images!)</p>



<h3 class="wp-block-heading">Basic mechanism</h3>



<p>You know when you post a link into social media, it get&#8217;s rendered as a nice little card with image, title and maybe a content preview?  That&#8217;s possible because all the information needed to make a card is exposed as Open Graph data meta tags <code>og:</code> in the head of the web page.  </p>



<p>So, if you want to make your own cards for an external link, all you need to do is query the link, extract the <code>og:</code> parameters and display them in your template.</p>



<p>Of course, it goes without saying that you need to be able to trust the site you link to.  You&#8217;re not in control of what goes into those <code>og:</code> tags and external sites can change them if they choose for any reason, and without precautions, they would be displayed automatically on your site.</p>



<h3 class="wp-block-heading">Design considerations</h3>



<p>But there are a couple of other considerations you should make in order to be a good citizen of the web, and to prevent your site being blacklisted.</p>



<p>When you make a query to the third party site, you are using their resources to retrieve a full page, but only display part of it.  If you queried their site every time someone queried your site, you are adding unnecessary load to their site.</p>



<p>So the first thing you need is a local cache of the retrieved content, so after the initial query, you can serve the card data to your users without disturbing the other site.  Depending on your needs, you could periodically refresh the cache either manually or automatically.</p>



<p>Related to this, but a bit more subtle, is image data.  If you just cache the value of <code>og:image</code>, that will be a URL to the third party site.  So your users browser will pull the actual image from the third party site, effectively using them as a CDN, and burdening their resources again.</p>



<p>I solved this by downloading the image also during the cache stage.  I save the link image with a hashed filename in a separate folder on the website, away from my own images.  I then rewrite the cached image url to be the one that&#8217;s served from my server.</p>



<h3 class="wp-block-heading">Legal considerations</h3>



<p>I suspect there could be all kinds of legal hazard in displaying link cards if someone really wanted to come after you.  So definitely only use them if you are comfortable that the site you are linking to isn&#8217;t motivated to pursue you through the courts.</p>



<p>I take the view, that the only reason a site would even expose <code>og:</code> data is because they want you to display it on your site or application (these fields have zero impact or difference on the browsing experience otherwise).  </p>



<p>And of course, if a site owner contacts you and asks you to remove the preview card, you should do that.</p>



<h3 class="wp-block-heading">Eat your own dog food</h3>



<p>Once you have an external link card component built for your website, why not use it on yourself?</p>



<p>Look again at the link cards on the <a href="https://discoverdursley.org.uk/2025-dursley-walking-festival/">walking festival page</a>.  Most of the cards link off to eventbrite for booking.  But the very last card, the tea &amp; cakes, links off to another page on the same site.</p>



<p>Usually when you make cards for your own site, it&#8217;s wrapped up in a database query to display a number of cards at once.  So it&#8217;s quite a pfaff to make them.</p>



<p>But if you just want an adhoc link off to another page on your site in a pretty box rather than boring text link, you have a ready made solution.</p>



<p>I think these are a much more engaging way to bring together third party content and allow your users to choose what they browse in a more natural way.</p>



<p>Much better than a bullet list of text links anyway.</p>
