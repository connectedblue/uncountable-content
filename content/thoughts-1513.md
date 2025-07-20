---
id: 1513
title: "Creating a series navigation on WordPress: Part 1"
date: "2024-08-25T15:38:51"
slug: creating-a-series-navigation-on-wordpress-part-1
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
  - name: Not in main feed
    slug: not-in-main-feed
    id: 62
---


<p>I have a hand-coded feature on this blog which allows a <a href="https://thoughts.uncountable.uk/curating-a-series-of-articles/" data-type="post" data-id="1424">series of articles to be curated</a>, and presenting a navigation to readers which allow them to navigate to the next after finishing one.</p>



<p>This is a series of posts which shows you step by step how to create a similar feature for your WordPress site.  You can scroll to the bottom of this post to see the feature in action!</p>



<p>The tutorial is split into four parts, but you&#8217;ll be able to get it working on your site after reading this post and the next one:</p>



<ul class="wp-block-list">
<li><a href="https://thoughts.uncountable.uk/creating-a-series-navigation-on-wordpress-part-1/" data-type="post" data-id="1513">Introduction and pre-requisites</a> (this post)</li>



<li><a href="https://thoughts.uncountable.uk/creating-a-series-navigation-on-wordpress-part-2/" data-type="post" data-id="1517">Getting started</a></li>



<li><a href="https://thoughts.uncountable.uk/creating-a-series-navigation-on-wordpress-part-3/" data-type="post" data-id="1524">Styling the navigation box</a></li>



<li><a href="https://thoughts.uncountable.uk/creating-a-series-navigation-on-wordpress-part-4/" data-type="post" data-id="1529">Customising individual series</a></li>
</ul>



<h3 class="wp-block-heading">Pre-requisites</h3>



<p>You&#8217;ll need a WordPress site that you can load php code into. If you know how to do this already, you can <a href="https://thoughts.uncountable.uk/creating-a-series-navigation-on-wordpress-part-2/" data-type="post" data-id="1517">skip to the next section</a> and grab the code, otherwise read on!</p>



<p>You&#8217;ll need to install a plug-in that allows you to manage a library of snippets.  This is useful in general, since you can use it not only for this code, but any other php snippets you come across on the web.</p>



<p>There are a few available, but the one I use is <a href="https://codesnippets.pro/">Code Snippets</a>.  The free version allows you to have as many snippets as you like in your library (there are paid options with AI available, but I haven&#8217;t explored those).</p>



<p>Install and activate the plugin.  There&#8217;s a new dashboard menu item called &#8220;Snippets&#8221; and you select &#8220;Add New&#8221; to get a blank page where you can add a title to help you find this code later.  I call mine &#8220;Series navigation&#8221;</p>



<p>You should see a blank screen with a greyed out <code>&lt;?php</code> at the top. If you can&#8217;t see that, try clicking on the Functions tab.</p>



<p>You&#8217;re now all set to add in the code!</p>

			<br/><br/>
			<div class="series-nav-area">
			   
				<nav class="series-nav">
				<p> Get started &#8230;</p>
				<ul> 
				   <li>
		    Next up: <a href="/creating-a-series-navigation-on-wordpress-part-2">Creating a series navigation on WordPress: Part 2</a>
		</li>
				   <li></li>
				</ul>
				</nav>
				<br/>
				
			</div>
		