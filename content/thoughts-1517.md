---
id: 1517
title: "Creating a series navigation on WordPress: Part 2"
date: "2024-08-25T16:31:43"
slug: creating-a-series-navigation-on-wordpress-part-2
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


<p>This is a part 2 of a series to show you how to create a series navigation menu for your WordPress. Check out <a href="https://thoughts.uncountable.uk/creating-a-series-navigation-on-wordpress-part-1/" data-type="post" data-id="1513">part 1</a> for more information.</p>



<h3 class="wp-block-heading">Getting started</h3>



<p>Hopefully you have a blank screen in front of you, ready to paste in some code.</p>



<p>I&#8217;ve included the code you need at the bottom of this post.  Cut and paste it into the blank code snippet screen on your dashboard, press save and activate.   Then come back here to continue.</p>



<p>Nothing should have changed on your website yet, and hopefully it still works!  If you ever notice an error on your site while going through this tutorial, first thing is to Deactivate the snippet which will remove it from the site and hopefully restore it to working order.</p>



<p>Although the code is a bit squashed up in this post, it should be a bit more readable once you have pasted it into your site.</p>



<h3 class="wp-block-heading">Create your first series</h3>



<p>To test it out, find three posts on your site that you want to make into a series.  You can add as many more as you like later, but three will allow you to test your first code properly.</p>



<p>You&#8217;ll be creating a PHP function for each series that you have on your site.  That might sound a bit scary, but all you&#8217;re doing is modifying the template I have given below.  I&#8217;ve used wildflower series as an example.</p>



<p>Find the function <code>wildflower_series()</code>.  A function is some code in between two outer curly brackets <code>{ . . . }</code>.  The name of the function is the word between <code>function</code> and <code>()</code>.  </p>



<p>Choose your own name for the series to one you will recognise later.  You can&#8217;t have spaces in the name, but you can have <code>_</code> characters.</p>



<p>Now find the bit of code underneath beginning <code>slugs</code>.  This is where you will enter the individual slug of each article in your series, in order you want them to appear.  The slug is essentially the final part of the post URL after the last <code>/</code>.  </p>



<p>Replace <code>wildflower-article-1</code> with your first slug and repeat for the next two.  Later on, you can add more to this series by just cut and pasting new lines, each with the slug.  You can change the order, insert new ones and the navigation will re-generate correctly each time.</p>



<p>Just remember to include the single <code>'</code> around the slugs and the comma <code>,</code> at the end.</p>



<h3 class="wp-block-heading">Customising navigation text</h3>



<p>Once you have entered the slugs for your series, you now have the option to specify some text above the &#8220;Next&#8221; and &#8220;Previous&#8221; links.  You can have different text on the first article, middle articles and the last article (or you can make them the same if you prefer).</p>



<p>Look for the various <code>_article_intro</code> codes and you can see the text on the right hand side of the <code>=&gt;</code> .  Change the text in between the <code>'</code> to whatever you like.  Note that you can include HTML tags in this if you wish &#8211; I use this to always have a link to the home article in the series.  But you don&#8217;t have to &#8211; you can just have plain text.  Or you can have it empty by specifying <code>''</code>.</p>



<h3 class="wp-block-heading">Activating your series navigation</h3>



<p>You&#8217;re nearly there!</p>



<p>The last step in creating a new series is to add your function to the list of other series functions on your site.</p>



<p>Find the <code>get_all_series_on_site()</code> function below the series function you just created.  Now you have to put whatever you called you function into that function.  Just replace <code>wildflower_series()</code> with your function name, including the <code>(),</code>afterwards (no space).</p>



<p>Press save and activate and you should be able to see a new navigation box below each of your series articles.  They are not styled yet (we&#8217;ll do that in the next section).  But the links should work and you can go back and forth between the correct articles.</p>



<pre class="wp-block-code has-small-font-size" style="border-style:none;border-width:0px;border-radius:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px"><code>// create a new function like this for every new series you want to create.
function wildflower_series(){
	return new series_navigation(&#91;
		// Put the list of series slugs in order, one per line with a comma at the end
		'slugs' =&gt; &#91;
				'wildflower-article-1',
				'wildflower-article-2',
				'wildflower-article-3',
		],
		// Text above the navigation links on the first article in the series
		'first_article_intro' =&gt; 'My wildflower series',
		// Text above the navigation links on the middle articles in the series
		'mid_article_intro' =&gt; 'This article is part of a &lt;a href="/wildflower-article-1"&gt;series on wild flowers&lt;/a&gt;.',
		// Text above the navigation links on the last article in the series
		'last_article_intro' =&gt; 'This is the last article in a &lt;a href="/a-reading-list-for-investing"&gt;series on wild flowers&lt;/a&gt;. I hope you found it valuable and enjoyed reading',
        ]);
}

function get_all_series_on_site() {
	return &#91;
		// include the function names for each series definition, one per line separated by a comma
		wildflower_series(),
	];
}

function series_navigation_defaults() {
	// these values apply to all series, unless over-ridden in a definition function above
	// for a particular series.
	return &#91;
		'nav_box_layout' =&gt; ' 
				&lt;nav class="{{nav_box_class}}"&gt;
				&lt;p&gt; {{intro_text}}&lt;/p&gt;
				&lt;ul&gt; 
				   &lt;li&gt;{{next_link}}&lt;/li&gt;
				   &lt;li&gt;{{prev_link}}&lt;/li&gt;
				&lt;/ul&gt;
				&lt;/nav&gt;
				&lt;br/&gt;
				',
		'series_link_layout' =&gt; '
		    {{pre_link_text}}&lt;a href="/{{link_slug}}"&gt;{{link_title}}&lt;/a&gt;
		',
		// NB: nav_area_layout applies to all nav boxes and can't be over-ridden by a definition function
		'nav_area_layout' =&gt; '
			&lt;br/&gt;&lt;br/&gt;
			&lt;div class="{{nav_area_class}}"&gt;
			  {{nav_boxes}}
			&lt;/div&gt;
		',
		'next_pre_link_text' =&gt; 'Next up: ',
		'prev_pre_link_text' =&gt; 'Previous: ',
		'nav_box_class' =&gt; 'series-nav',
		'nav_area_class' =&gt; 'series-nav-area',
		// if set to true, the next navigation for the last article loops back to the first and vice-versa
		'series_ring' =&gt; false,
		'first_article_intro' =&gt; '', 
		'mid_article_intro' =&gt; '', 
		'last_article_intro' =&gt; '',
		'slugs' =&gt; &#91;],
	];
}

// Only change code below this line if you know what you are doing!!

function add_series_navigation( $content) {
	$series_navigation_defaults = series_navigation_defaults();
	$slug = get_post_field( 'post_name', get_post() );
	$all_series = get_all_series_on_site();
	$nav_boxes = '';
	foreach ($all_series as $s) {
		$nav_boxes = $nav_boxes . $s-&gt;get_navigation_box($slug, $content);
	}
	// Add the nav boxes into the template and append to content
	if ($nav_boxes !='' ) {
		$layout = str_replace('{{nav_boxes}}', $nav_boxes, $series_navigation_defaults&#91;'nav_area_layout']);
		$layout = str_replace('{{nav_area_class}}', $series_navigation_defaults&#91;'nav_area_class'], $layout);

		$content = $content . $layout;
	}
	return $content;
}
// This filter runs early
add_filter('the_content', 'add_series_navigation', 3);

class series_navigation {
	function __construct($args) {
		$args = array_merge(series_navigation_defaults(), $args);
		
    	$this-&gt;slugs = $args&#91;'slugs'];
		$this-&gt;first_article_intro = $args&#91;'first_article_intro'];
		$this-&gt;mid_article_intro = $args&#91;'mid_article_intro'];
		$this-&gt;last_article_intro = $args&#91;'last_article_intro'];
		$this-&gt;next_pre_link_text = $args&#91;'next_pre_link_text'];
		$this-&gt;prev_pre_link_text = $args&#91;'prev_pre_link_text'];
		$this-&gt;nav_box_class = $args&#91;'nav_box_class']; 
		$this-&gt;nav_box_layout = $args&#91;'nav_box_layout'];
		$this-&gt;series_link_layout = $args&#91;'series_link_layout'];
		$this-&gt;series_ring = $args&#91;'series_ring'];
		
		$this-&gt;series_length = count($this-&gt;slugs) - 1;
    }
	
	function get_navigation_box($slug) {
		// Check if there's a navigation box for this post
		$idx = array_search($slug, $this-&gt;slugs);
		$nav_box='';
		if ($idx !== false ) {
			if ($idx &lt; $this-&gt;series_length ) {
				$next_link=$this-&gt;link_to_series_post($this-&gt;slugs&#91;$idx + 1], $this-&gt;next_pre_link_text);
			} else if($this-&gt;series_ring){
					$next_link=$this-&gt;link_to_series_post($this-&gt;slugs&#91;0], $this-&gt;next_pre_link_text);
			} else {
					$next_link='';
			}

			if ($idx &gt; 0 ) {
				$prev_link=$this-&gt;link_to_series_post($this-&gt;slugs&#91;$idx - 1], $this-&gt;prev_pre_link_text);
			} else if($this-&gt;series_ring){
					$prev_link=$this-&gt;link_to_series_post($this-&gt;slugs&#91;$this-&gt;series_length], $this-&gt;prev_pre_link_text);
			} else {
					$prev_link='';
			}

			if ($idx == 0) {
				$intro_text = $this-&gt;first_article_intro;
			} else if ($idx == $this-&gt;series_length) {
				$intro_text = $this-&gt;last_article_intro;
			} else  {
				$intro_text = $this-&gt;mid_article_intro;
			}
	
			$layout = str_replace('{{nav_box_class}}', $this-&gt;nav_box_class, $this-&gt;nav_box_layout);
			$layout = str_replace('{{intro_text}}', $intro_text, $layout);
			$layout = str_replace('{{next_link}}', $next_link, $layout);
			$layout = str_replace('{{prev_link}}', $prev_link, $layout);

			$nav_box = $nav_box . $layout;	
		}
		return $nav_box;	
	}

	function link_to_series_post($slug, $pre_link_text) {
		$layout='';
		if ($slug != '') {
			$layout = str_replace('{{pre_link_text}}', $pre_link_text, $this-&gt;series_link_layout);
			$layout = str_replace('{{link_slug}}', $slug, $layout);
			$layout = str_replace('{{link_title}}', get_the_title( url_to_postid( site_url($slug) )), $layout);
			}
		return $layout;
		}
}</code></pre>

			<br/><br/>
			<div class="series-nav-area">
			   
				<nav class="series-nav">
				<p> This is part of a tutorial on <a href="/creating-a-series-navigation-on-wordpress-part-1">creating a series navigation</a>.</p>
				<ul> 
				   <li>
		    Next up: <a href="/creating-a-series-navigation-on-wordpress-part-3">Creating a series navigation on WordPress: Part 3</a>
		</li>
				   <li>
		    Previous: <a href="/creating-a-series-navigation-on-wordpress-part-1">Creating a series navigation on WordPress: Part 1</a>
		</li>
				</ul>
				</nav>
				<br/>
				
			</div>
		