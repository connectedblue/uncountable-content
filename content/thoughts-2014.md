---
id: 2014
title: Configuring containers
date: "2025-01-11T06:00:00"
slug: configuring-containers
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


<p>One of the best things I do each week is run a code club at the library for the 8-11 year olds.  I&#8217;ve been doing it about two years and have developed it from basic coding tutorials to a place where you can explore digital creativity.</p>



<p>We got given some grant money for extra equipment, and eventually, after months of unfathomable process, the kit arrived at the library.  So I&#8217;ve been energised this week to configure it and prepare for the new term&#8217;s clubs which start next week.</p>



<p>We have chromebooks, raspberry pi&#8217;s and wacom tablets.  The library networked PCs  are restrictive in what can be installed and I frequently hit limits of what can be done in a browser.</p>



<p>I&#8217;ve been super impressed with the power of the chromebooks.  They are Lenovo models with 8GB of RAM and cost barely more than £200.  They support linux directly out the box, and just a few clicks enabled a terminal from which I could install VS code or anything else.</p>



<p>But there was more.  By enabling a flag in the experimental setting screen, I could create multiple linux containers.  So I created a second one to install the Unity hub which is a more complex environment.  And the apps are all available as icons in the main menu, firing up the correct container to run the software.</p>



<p>The google drive is mounted as an external drive automatically in the image, so I created symbolic links to the home directory where code will be stored for individual students.  So the power of local application environments connected to cloud storage for persistence.</p>



<p>I spent quite a while manually configuring applications and VS code extensions on the first chromebook &#8211; making notes as I went so I could reproduce the config on the other machines.</p>



<p>Then I saw the backup and restore function for containers.  A game changer.  Firstly, it means I can backup the image from the first chromebook and then copy it to the others, saving a heap of time.</p>



<p>But it will also be a quick way to keep build integrity once the children start using them.  I can now allow them to explore and install whatever applications they like and if it screws up, I just restore my master image.</p>



<p>Very happy with the choice of chromebooks to support the code club.  A combination of full developer capability, cloud storage and easy device management.</p>



<p>As a bonus, it&#8217;s also possible to install apps from the Play Store.  So after plugging in the wacom tablets and downloading the sketchbook application, there was full digital drawing capability.</p>



<p>Can&#8217;t wait to get this kit introduced into the clubs next week. </p>
