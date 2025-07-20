---
id: 1529
title: "Creating a series navigation on WordPress: Part 4"
date: "2024-08-25T17:39:03"
slug: creating-a-series-navigation-on-wordpress-part-4
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
  - name: Various Things
    slug: various-things
    id: 1
tag:
  - name: Blogging
    slug: blogging
    id: 14
  - name: Not in main feed
    slug: not-in-main-feed
    id: 62
---


<p>This is a part 3 of a series to show you how to create a series navigation menu for your WordPress. Check out&nbsp;<a href="https://thoughts.uncountable.uk/creating-a-series-navigation-on-wordpress-part-1/">part 1</a>&nbsp;for more information.</p>



<h3 class="wp-block-heading">Customising individual series</h3>



<p>This post is for more advanced users of the series navigation tool, and assumes you are comfortable editing the PHP code, as well as knowing how to create HTML snippets.</p>



<p>The first function to explore is <code>series_navigation_defaults()</code>.  This contains a number of configuration items that will apply to every single series navigation, unless over-ridden in an individual series function.</p>



<p>Try changing one of these values &#8211; for example <code>next_pre_link_text</code>.  This will change the text that is displayed before the next article link by default.  For example, if you change the value to <code>'>>'</code>, then two chevrons will be displayed instead of the text  <code>'Next up: '</code>.</p>



<p>However, suppose you only wish to change that text for one of your series, not all of them.  Then all you do is copy that line and paste it into the appropriate series function before the final <code>]);</code>.  Then that text will only be changed on that series and not the others.</p>



<p>You can do similar for any other item in that function.  A description of what all the different options do is below:</p>



<ul class="wp-block-list">
<li><code>nav_box_layout</code> this is the HTML template used to generate the navigation box for a particular series.  This can be anything you wish.  Note that there are some special variables in between <code>{{..}}</code> which are placeholder for where the intro text and previous/next links go inside the HTML.</li>



<li><code>series_link_layout</code> this is the HTML template for an individual series link item.  Again, it has special variables for placeholders for the slug, title and text.</li>



<li><code>nav_area_layout</code> the final HTML template which wraps all the nav boxes (there could be more than one per post).  This item can only be modified inside the <code>series_navigation_defaults()</code> function &#8211; it can&#8217;t be applied to an individual series function.</li>



<li><code>next_pre_link_text</code> the text that goes before the &#8220;next&#8221; link in the nav box.</li>



<li><code>prev_pre_link_text</code> the text that goes before the &#8220;previous&#8221; link in the nav box.</li>



<li><code>nav_box_class</code> can specific one or more classes that apply to a nav box.  This allows a different CSS styling to apply to the same template but for a different series.</li>



<li><code>nav_area_class</code> this is the class which applies to the whole navigation area. It can&#8217;t be applied to a series function.</li>



<li><code>series_ring</code> if this is set to <code>true</code>, then the series next and previous functions just go round in a circle.  They don&#8217;t start and stop at the beginning and end article like they do in a linear series.</li>
</ul>



<p>This should allow for lots of flexibility to create multiple different series navigations on your site, each styled to your choosing with CSS.</p>



<p></p>

			<br/><br/>
			<div class="series-nav-area">
			   
				<nav class="series-nav">
				<p> This concludes the tutorial on <a href="/creating-a-series-navigation-on-wordpress-part-1">creating a series navigation</a>. <p>I hope you found it valuable and enjoy curating article series on your blog.</p></p>
				<ul> 
				   <li></li>
				   <li>
		    Previous: <a href="/creating-a-series-navigation-on-wordpress-part-3">Creating a series navigation on WordPress: Part 3</a>
		</li>
				</ul>
				</nav>
				<br/>
				
			</div>
		