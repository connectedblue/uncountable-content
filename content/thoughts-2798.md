---
id: 2798
title: Custom docker dev containers
date: "2025-12-27T06:00:00"
slug: custom-docker-dev-containers
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


<p>I usually have a number of different coding projects on the go, which use a variety of stacks like node, php, python, wordpress etc. Like most people in this situation, I use docker containers to manage all the different development environments.</p>



<p>Since the rise of AI agents, this is <a href="https://thoughts.uncountable.uk/no-more-naked-code/" data-type="post" data-id="2614">even more critical</a>. I&#8217;ve already had the wonderful experience of copilot deleting the entire git directory and everything else during an entirely innocuous documentation task. I definitely don&#8217;t want to run any AI agent on the host PC itself.</p>



<p>One issue with using the official images like <code>node</code>, <code>python</code> and so on is the underlying development tools are never installed.  I also don&#8217;t like the random user names assigned (some are even root), and I like all my code to be present in <code>/app</code>.</p>



<p>So I&#8217;ve taken some time to build a standard set of customisations of the official images.  This gives me a consistent look and feel within VS Code and still get access to the correct version of official tools.</p>



<h3 class="wp-block-heading">make and docker</h3>



<p>All the custom versions of official images are created with a single <code>Makefile</code> and <code>Dockerfile</code>. This allows me to issue a command like:</p>



<pre class="wp-block-code"><code>make python VERSION=3.14</code></pre>



<p>and I&#8217;ll get a new <code>-prod</code> and <code>-dev</code> version of the standard image in <a href="https://hub.docker.com/r/uncountableuk/python/tags">my public Dockerhub repo</a>.  </p>



<p>The prod version contains the standard user structure, always operating on <code>UID=1000</code> when I deploy the container.  I could also put some standard monitoring tools there in the future, or anything else that is common across all my production software.</p>



<p>The dev version extends prod and adds in a common suite of tools I need in every project.</p>



<p>Otherwise I keep the name and version number exactly the same as the official version so it&#8217;s easy to track and upgrade to new containers over time.</p>



<p>The nice thing is that if I update my preferred set of installed tools in the dockerfile, I just re-issue a <code>make python VERSION=3.14</code>,  the dockerhub will be updated and just a project pull gets the new tools.</p>



<p>This keeps things very simple &#8211; just one <code>Dockerfile</code> to maintain that applies to all official images.</p>



<h3 class="wp-block-heading">Extending the extension</h3>



<p>However, having the images in Dockerhub does make it very easy to then extend the standard images even further.</p>



<p>Take the example of wordpress <a href="https://hub.docker.com/u/uncountableuk">in my Dockerhub</a> &#8211; you can see that there is my standard custom version <code>wordpress:php8.2</code> prod and dev with the same tools and structure as all the others.  But I also need some additional development tools like php compose, testing tools and a database client for my wordpress projects.</p>



<p>So the make target for <code>wordpress</code> first of all builds and pushes the standard customisation.  Then, in another <code>Dockerfile</code> I pull the extended version and add in the wordpress specific toolset.</p>



<p>I give this new version my own name <code>uncountablewp</code> but keep the same tag structure.  So the image <code>uncountablewp:php8.2-dev</code> contains the official <code>:php8.2</code> plus my standard development tools plus my wordpress specific ones.</p>



<p>Creating another image for the next php version is as simple as issuing a <code>make wordpress VERSION=php8.3</code>.  </p>



<p>I can keep extending this further.  Although <code>uncountablewp</code> will be applicable for all my wordpress projects, there may be a specific one where I need additional project specific software installed.  If and when that arises, I can have a Dockerfile in that application source that extends <code>uncountablewp</code> further with the new stuff.</p>



<h3 class="wp-block-heading">The magic of Dockerhub</h3>



<p>I intend to make most of my projects open source.  I don&#8217;t really want lots of cut and pasted Dockerfiles to try and keep consistent across them all.  So pulling images from my own repo means that anyone else using that code has the same consistent base as me.</p>



<p>There are no limits on the number of public images you can create on dockerhub.  Nothing I am installing here is a secret, so there&#8217;s no downside in publishing the environments for everyone to access.</p>



<p>What I&#8217;m not doing (yet) is cross compiling architectures.  So all my repos are <code>linux/amd64</code>.  However, my production server is ARM so I will need to add that in when it comes to deployment so I can pull the images for live.</p>



<p>I&#8217;ve been battling with dockerfiles and make for years trying to standardise my environment, but I always seem to end up cut and pasting.  The breakthrough here was utilising dockerhub as the intermediate layer and store all the permutations of tags, production and dev.</p>
