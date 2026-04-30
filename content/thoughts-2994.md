---
id: 2994
title: A gem of a Gem
date: "2026-04-30T06:00:00"
slug: a-gem-of-a-gem
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


<p>I&#8217;ve been using Gemini Pro for almost a year now.  I pay google £14 a month and get a single seat on Business Workspace, 2Tb of storage and gemini pro.  Plus some other stuff probably that I don&#8217;t use.</p>



<p>So Gemini has become the default ai chat bot on both phone and desktop. I dread to think how many hours of conversations I&#8217;ve had. That&#8217;s probably a topic for another post. But, for now, I want to highlight a very useful Gem I created.</p>



<p>Gems are a way to have custom chat with knowledge preloaded about a particular topic.  The knowledge can be set as a combination of text instructions, uploaded files, imported code bases and notebookLM contents.</p>



<p>I have a rather complicated personal computing and cloud setup.  Well, lots of moving parts anyway.  There&#8217;s a 3 monitor ubuntu workstation with an nvidia card, an aging dell laptop running mint, a cloud VPS, siteground php hosting, cloudflare and a few other things.<br><br>Then there are backup strategies, a bare git repo holding dotprofile configs and a version controlled dev folder with a variety of projects and custom docker images for use in VSCode.</p>



<p>I tried to keep track of the setup in a google doc, but it was not really up to date, and actually little more than a load of cut/pasted commands with terse contextual notes.<br><br>So, I decided to import that doc into Gemini and had a very long conversation about every aspect of my setup and what my strategy was for each component.  I then got Gemini to generate a clean set of documentation into a folder called <code>infrastructure_docs</code> in my home directory.</p>



<p>So far, so normal.  But then I created a Gem by importing that folder and providing a description asking Gemini to act as my PC Cloud architect.  I then asked it to create documentation updates in the form of bash commands at the end of every chat session so I can keep the documentation up to date with what we just agreed.</p>



<p>This has really power boosted my whole setup. Before I would be reluctant to change anything in case a forgotten piece of config or hack rendered the whole stack unusable.<br><br>Now, I just spin up a conversation on my phone or desktop about what it is I want to do, and I&#8217;m guided through exactly the steps I need. So far, I&#8217;ve updated to the latest ubuntu, switched permanently to wayland, installed the latest nvidia drivers, shifted video workloads onto the GPU, migrated to pipewire audio, repaired a broken backup process and other minor things.</p>



<p>The best part is this whole config evolution is documented as I go.  The only manual thing I need to do is upload the latest documentation set into the gem after every session.</p>



<p>Very soon, I&#8217;m going to take the plunge and move to <code>26.04</code> ubuntu.  There are some very innovative features coming along soon in KDE plasma such as having virtual desktops on only two of the three monitors and the ability to save precise window placement between sessions.</p>



<p>If you also have complex configurations, it will be worth trying this approach, whether it&#8217;s a PC, home devices or mechanical.  Having an up to date knowledge coupled with an assistant who can always seem to recommend another troubleshooting step is an invaluable time saver.</p>



<p></p>
