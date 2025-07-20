---
id: 2451
title: A weekly section in my diary
date: "2025-05-12T06:00:00"
slug: a-weekly-section-in-my-diary
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


<p>I&#8217;ve been keeping an <a href="https://diary.uncountable.uk/">online diary</a> for over two years, which is a powered by wordpress with a simple one post per day format.  The built in tagging and category systems mean I can organise entries into specific collections, for example <a href="https://diary.uncountable.uk/series/riverfly/">this page</a> has all the days when I did riverfly monitoring.</p>



<p>I also have a <a href="https://diary.uncountable.uk/year-2025/">yearly page view</a>, which visually summarises the year and allows you to click through and browse entries by month and by topic.</p>



<p>But these views are all limited to seeing a single day on a single post.  What I really wanted was a single page that would show all the entries for a single week.</p>



<p>So with the help of AI, I built a custom template which serves a weekly view at URLs in the form <a href="https://diary.uncountable.uk/2025-week-19/">/2025-week-19</a> which takes all the content from that week and separates it with headings for each day.  The featured image at the top is a random choice from that week&#8217;s posts.</p>



<p>At the bottom of the page, I provide some simple next and previous links to allow navigation between weeks.</p>



<p>Once these pages were built,  it became a very simple matter to add some redirects for the URLs <a href="https://diary.uncountable.uk/this-week">/this-week</a> and <a href="https://diary.uncountable.uk/last-week">/last-week</a>.</p>



<p>I like to look back over my diary, so a weekly view is quite a comfortable format to browse.  I&#8217;m very happy with how these pages turned out, and I get them &#8220;for free&#8221; in future simply by carrying on making daily posts as I do today.</p>



<h3 class="wp-block-heading">RSS weekly feed</h3>



<p>Once I had this online view, I then wanted to go a step further and have a weekly feed that people could subscribe to over RSS.  So I created a custom feed that automatically publishes last week&#8217;s diary entries every Monday morning as a single feed item.</p>



<p>The RSS URL is:</p>


<div class="copy-url-list"><div class="copy-url-item"><button class="copy-btn" data-url="https://diary.uncountable.uk/weekly-feed">📋</button><span class="url-text">https://diary.uncountable.uk/weekly-feed</span></div></div>
    <script>
    document.addEventListener("DOMContentLoaded", function() {
        const copyButtons = document.querySelectorAll(".copy-btn");
        copyButtons.forEach(button => {
            button.addEventListener("click", function() {
                const url = this.getAttribute("data-url");
                navigator.clipboard.writeText(url).then(function() {
                    alert("Copied to clipboard: " + url);
                }, function(err) {
                    console.error("Could not copy text: ", err);
                });
            });
        });
    });
    </script>



<p>This felt quite liberating. Suddenly I&#8217;m using RSS in a &#8220;non-standard&#8221; way to aggregate content in a dedicated feed. Almost like a weekly newsletter.</p>



<h3 class="wp-block-heading">Making this more flexible</h3>



<p>The code to do this is not all that long &#8211; essentially a few php functions and a single php template in the theme folder.  It could be tidied up a bit more, for example the code to generate the RSS content and web page has duplications and inconsistencies.</p>



<p>However, what&#8217;s more appealing is the possibilty to create time based topic newsletters by adding in some tags to the underlying queries.</p>



<p>This would allow me to produce, for example,  a monthly riverfly newsletter by creating a new endpoint such as /2025-jan-riverfly.  And by subscribing to the RSS endpoint associated with that, I could display it on an entirely diffent website by using a newsreader plugin like Feedzy.</p>
