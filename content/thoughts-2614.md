---
id: 2614
title: No more naked code
date: "2025-07-24T06:00:00"
slug: no-more-naked-code
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


<p>I have a <code>dev/</code> directory where I store the git repos for my code projects, and a pretty common pattern is to change to a directory and type <code>code .</code> to bring up the development environment.</p>



<p>A lot of these are in remote containers, which I&#8217;ve been using for quite a while to develop in.  However a good number of smaller, or ad-hoc projects just run directly on my host linux.</p>



<p>However, now that AI is a permanent fixture of coding tasks, I don&#8217;t really want it to be running loose all over my PC or laptop.  Although I authorise all the terminal commands, it&#8217;s really only a matter of time before an untimely <code>rm -rf</code> is executed in the wrong place.</p>



<p>So I&#8217;ve made a change to the core VS Code settings that disables Copilot when it&#8217;s launched on my PC, and only enables it when it&#8217;s attached to a running container.  </p>



<p>So now my <code>dev/</code> directory has been re-purposed a git repository for controlling project environments.  I&#8217;ve got a collection of dockerfiles, devcontainers and docker-compose that can create suitable container environments for each project.  All controlled with <code>make</code> so I can spin up a reliable VS Code environment with a short command &#8211; for example <code>make home</code> brings up the full environment for maintaining my root domain static site <a href="https://uncountable.uk/">uncountable.uk</a>.</p>



<p>So, hopefully this bit of extra discipline will protect my devices from both snooping and errant behaviour by the coding assistants.</p>
