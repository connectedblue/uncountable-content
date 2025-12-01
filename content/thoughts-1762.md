---
id: 1762
title: First archive step
date: "2024-09-24T06:00:00"
slug: first-archive-step
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
  - name: Future Archive
    slug: future-archive
    id: 19
---


<p>I&#8217;ve made the first significant move in my ongoing project to have my <a href="https://thoughts.uncountable.uk/reading-me-in-200-years/" data-type="post" data-id="612">writing capable of being read in 200 years</a>.  I made a public git repository which will act as the canonical archive from which all other archive copies will be produced.</p>



<p>You can view the archive here:</p>



<p><a href="https://github.com/connectedblue/writing-archive">https://github.com/connectedblue/writing-archive</a></p>



<p>By doing this, I not only start the process of reaching the goal, but I have also formulated a methodology to continuously archive as more writing is created. No doubt the process will evolve over the next three or four decades that I might be around for to continue the project.</p>



<p>So I&#8217;ll describe my initial approach here, and of course, as I refine it in the future, I&#8217;ll do update posts.  Project progress <a href="/topic/future-archive/">will be viewable here</a> while I&#8217;m alive.</p>



<h3 class="wp-block-heading">Content Structure</h3>



<p>Core writing is stored as markdown files, with one blog post per file.  There are two blog sources currently &#8211; <a href="/#">thoughts</a> and <a href="https://diary.uncountable.uk/">diary</a>.  The intent is to store writing as simply as possible, which is text only.  However there are some simple html marks included where, for example, figures and captions are referenced.</p>



<p>As an example, here&#8217;s the <a href="https://raw.githubusercontent.com/connectedblue/writing-archive/refs/heads/main/writing/thoughts/reading-me-in-200-years.md">archive copy of the first post</a> about this project.  Simple as can be.</p>



<p>And here&#8217;s a slightly more &#8220;marked up&#8221; example of <a href="https://raw.githubusercontent.com/connectedblue/writing-archive/refs/heads/main/writing/diary/all-calm-in-calmsden.md">a diary entry that contains embedded images</a>.  In my diary, every entry has a cover image, and most have one or two captioned additional pictures within the text.</p>



<p>All blog posts are stored as a flat structure under the broad filing of thoughts or diary.  There&#8217;s no need for maintaining a more complex taxonomy &#8211; every post contains relevant category and tag information in the front matter at the top.  And this git repo is not designed for a reader to browse casually (although you could if you wished).</p>



<p>But this leads into the first major decision point about the design of the archive &#8230; what to do with images</p>



<h3 class="wp-block-heading">Image archive</h3>



<p>Some of my writing have photographs that I have taken (I don&#8217;t use image material from any other creator).  These capture visual enhancements (and captions) to the writing so I feel they add value to the collection.</p>



<p>However, they are large files relative to the text.  I compress them to 200kb, but they add up &#8211; 715 files totalling 170Mb on the first commit which will only grow.  This may place an untolerable burden on future (as yet unborn) maintainers who will have to pay for storage resources.  </p>



<p>But I also have another source of images in <a href="https://diary.uncountable.uk/snapshots/">my photo feed</a>.  This contains another 500 captioned photos, and is not yet in the archive.  So image handling needs a separate strategy.</p>



<h3 class="wp-block-heading">Building archives from the archive</h3>



<p>The considerations around image storage have informed the design and purpose of this first github archive. This will be the &#8220;root archive&#8221; which means it contains all the material I wish to put in while I&#8217;m alive. I will then use this to create several &#8220;actual archives&#8221; for storing in different locations around the internet.</p>



<p>So, it may be that this github repo survives in tact for the next two centuries.  That will be the ideal scenario, because in addition to it being the canonical reference source, it will also contain a github history of how I maintain it over the years.  That could be of interest to future archivists who might stumble upon this project.</p>



<p>In addition to the top level directory called <code>writing</code> which has the content, there is also a <code>tools</code> directory.  I will create my own command line tools to archive content and produce archive packages.  I&#8217;m not going to rely on large software packages which could go away at any time.  It&#8217;s all about hand crafted tools in bash, python or other language scripts.</p>



<p>Note that the word archive does not imply a git repo, or any other technology type.  It just means a &#8220;single package of content&#8221;.  It could be a git repo, a zip file, a pdf, an ebook, a large text file and more.  </p>



<p>In fact, the success of this project over the long term will depend on how many different packages I can create and how many free locations I can store them in before I die.  I am unashamedly freeloading future resources, and therefore at the ultimate mercy of those resource owners.</p>



<p>To survive, I will have to replicate as widely as possible.</p>



<p>Writing is the priority for me, so I will create text only archive packages that will be a lot smaller. </p>



<p>Every new archive package that is created will be documented in the root archive, and I&#8217;ll have a script tool to keep everything in sync as new content is created.  So while that will always remain my canonical archive, hopefully the other mirrors will reflect exactly the same content.</p>



<h3 class="wp-block-heading">Licensing</h3>



<p>In order to provide the least possible legal friction for storing my work, everything in the archive is placed under a c<a href="https://raw.githubusercontent.com/connectedblue/writing-archive/refs/heads/main/LICENSE">reative commons zero licence</a>.</p>



<p>The essentially boils down to:</p>



<blockquote class="wp-block-quote is-style-plain is-layout-flow wp-block-quote-is-layout-flow is-style-plain--1">
<p>The person who associated a work with this deed has <strong>dedicated</strong> the work to the public domain by waiving all of his or her rights to the work worldwide under copyright law, including all related and neighboring rights, to the extent allowed by law. You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission. In no way are the patent or trademark rights of any person affected by CC0, nor are the rights that other persons may have in the work or in how the work is used, such as <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en#ref-publicity-rights">publicity or privacy</a> rights.</p>



<p>Unless expressly stated otherwise, the person who associated a work with this deed makes no warranties about the work, and disclaims liability for all uses of the work, to the fullest extent permitted by applicable law.</p>



<p>When using or citing the work, you should not imply <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en#ref-endorsement">endorsement</a> by the author or the affirmer.</p>
</blockquote>



<p>So there you go &#8230; if you&#8217;re daft enough to want to use my work for anything, you can.  But I take no responsibility for any consequence that may arise.</p>
