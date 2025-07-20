---
id: 1970
title: Probably the best PS1 in the world
date: "2024-12-23T06:00:00"
slug: probably-the-best-ps1-in-the-world
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


<p>If you use the shell a lot, you probably have a prompt that contains a host name and current working directory.  Both are essential for navigation, especially if you work on multiple servers.</p>



<p>But these can get quite long, so the <code>$</code> is half way along the screen before you even start typing. So even with a moderate command, you often wrap onto the second line which makes syntax harder to judge and check.</p>



<p>I changed my <code>PS1</code> in the <code>.bash_aliases</code> file so that it prints the host name and working directory, but then does a new line before the <code>$</code>.  So I have an entire terminal width to type every command.</p>



<p>Here&#8217;s the code:</p>



<pre class="wp-block-code" style="border-style:none;border-width:0px;border-radius:0px;padding-top:0;padding-bottom:0"><code>PS1='${debian_chroot:+($debian_chroot)}\&#91;\033&#91;01;32m\]\u@\h\&#91;\033&#91;00m\]:\&#91;\033&#91;01;34m\]\w\n\&#91;\033&#91;01;32m\]\$ \&#91;\033&#91;00m\]'</code></pre>



<p> The important part is the <code>\n</code> before the <code>\$</code>.  All the other stuff is to do with colouring, making the host name and prompt green and the working directory blue. I haven&#8217;t the faintest idea what those codes are though, I just copied them from the ubuntu default (probably something to do with the VT100, knowing unix)</p>



<p>I make this change on all new machines I work on for any period of time.  It&#8217;s probably the best PS1 prompt in the world.</p>



<p>But <a href="https://thoughts.uncountable.uk/contact-me/" data-type="post" data-id="218">let me know</a> if you have a better one.</p>
