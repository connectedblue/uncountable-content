---
id: 1524
title: "Creating a series navigation on WordPress: Part 3"
date: "2024-08-25T16:55:37"
slug: creating-a-series-navigation-on-wordpress-part-3
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


<p>This is a part 3 of a series to show you how to create a series navigation menu for your WordPress. Check out <a href="https://thoughts.uncountable.uk/creating-a-series-navigation-on-wordpress-part-1/">part 1</a> for more information.</p>



<h3 class="wp-block-heading">Styling the navigation box</h3>



<p>Hopefully at this stage you have a working set of navigation links, albeit a bit plain.  You now need to add some CSS code to your site to style up the box a bit.</p>



<p>How you do this very much depends on your theme, so you might want to google &#8220;how to add custom CSS to XXX theme on wordpress&#8221; to find out how you do this on your them.  Sometimes it&#8217;s <code>Appearance->Customise->Additional CSS</code> on the dashboard, but your mileage will vary.  If you use the 2024 theme like I do, it&#8217;s buried away in the most un-intuitive place possible.</p>



<p>Once you have located where your CSS goes, paste in the following code which will give you a basic box</p>



<pre class="wp-block-code has-small-font-size" style="border-radius:0px;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px"><code>.series-nav-area {
   background-color: silver;
   padding: 10px 15px;
   width: fit-content;
   margin:auto;

   p {
     font-style: italic;
     margin: 0px;
   }
   ul {
     padding-left:0;
     margin: 0px;
   }
   li {
     list-style-type: none;
   }
   .red {
     background-color:red;
   }
}
</code></pre>



<p>When you press save and refresh your series page, you should see a silver box with the next and previous links centred under the article.</p>



<p>This isn&#8217;t a tutorial on CSS &#8211; there are many resources on the web dedicated to styling using CSS.  You can make your series navigation box look however your choose with your CSS skills.</p>



<p>This pretty much gives you a functional navigation menu that you can customise and tinker to your heart&#8217;s content.</p>



<p>You can add as many series as you wish by simply creating and registering new series functions as outlined <a href="https://thoughts.uncountable.uk/creating-a-series-navigation-on-wordpress-part-2/" data-type="post" data-id="1517">in part two</a>.  If an individual article appears in more than one navigation, they will stack underneath each other so the reader can still navigate the series they are currently on.</p>



<p>But, you can also customise much, much more.  You can make different layouts, different styles for different navs and even have rings instead of linear series where there is no beginning or end.</p>



<p>That is the subject of the final part of this tutorial, which goes into more advanced configuration.</p>

			<br/><br/>
			<div class="series-nav-area">
			   
				<nav class="series-nav">
				<p> This is part of a tutorial on <a href="/creating-a-series-navigation-on-wordpress-part-1">creating a series navigation</a>.</p>
				<ul> 
				   <li>
		    Next up: <a href="/creating-a-series-navigation-on-wordpress-part-4">Creating a series navigation on WordPress: Part 4</a>
		</li>
				   <li>
		    Previous: <a href="/creating-a-series-navigation-on-wordpress-part-2">Creating a series navigation on WordPress: Part 2</a>
		</li>
				</ul>
				</nav>
				<br/>
				
			</div>
		