---
id: 2949
title: Two things I did not know
date: "2026-03-18T18:00:00"
slug: two-things-i-did-not-know
site: "https://thoughts.uncountable.uk"
wp_url: "https://thoughts.uncountable.uk"
root_slug: thoughts
site_name: My Thoughts
featured_media_url: null
featured_media_srcset: null
type: post
category:
  - name: Various Things
    slug: various-things
    id: 1
tag: []
---


<p>I have a wordpress website and develop bespoke functionality for it on my local PC before uploading the final code as a plugin zip to production.</p>



<p>I use VScode remote containers and mount the plugin folder on a standard wordpress container to get &#8220;hot load&#8221; visibility.  So far, so simple.  Changes made to the php code can be seen straight away in the localhost browser.</p>



<p>I also want to version control the <code>wp-config.php</code> because there are some special configurations to make it run properly on localhost. So I added a single file mount of that file into the wordpress container in the docker compose file.</p>



<p>That&#8217;s when unexpected behaviour occured.</p>



<p> When I made a change to the <code>wp-config</code> in VScode, it would not appear in the wordpress container.  Instead, it would revert back to the default <code>wp-config</code> inside the container.  </p>



<p>Very odd indeed.</p>



<p>After a bit of trouble shooting with Gemini, I learned two things that I didn&#8217;t know.</p>



<p>First, when a single file is mounted in docker compose, it&#8217;s not tracked by filename behind the scenes.  It&#8217;s tracked by inode value.  The same is true of directories as well.</p>



<p>Second, whenever VScode saves a file, it doesn&#8217;t modify the file in place on disk.  It creates a brand new file with the same name and deletes the old one.  This is called &#8220;atomic save&#8221;.  Normally the user wouldn&#8217;t notice anything because the filesystem view has not changed.  However, the old inode is destroyed and a new one created.</p>



<p>So, that&#8217;s how the weird behaviour with <code>wp-config</code> came about.  When I saved an edit into the file, docker lost track of the mount because the inode got destroyed.  And it doesn&#8217;t &#8220;refresh&#8221; the mount again for that file.  </p>



<p>The simplest solution is to restart or rebuild the container.</p>



<p>This kinda feels like a bug to me.  It renders single file mounts pretty limited except for files that don&#8217;t change very often (which admittedly is the case for <code>wp-config</code>).</p>



<p>But at least I learned two more things today.</p>
