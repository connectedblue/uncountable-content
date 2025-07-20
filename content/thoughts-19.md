---
id: 19
title: Hacking the humax
date: "2012-12-29T16:24:18"
slug: hacking-the-humax
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
  - name: First Blog
    slug: first-blog
    id: 18
---

<p>I&#8217;ve had free satellite TV for sometime now, mainly because my village didn&#8217;t pick up a Freeview signal for ages, but also because the <a href="http://www.humaxdigital.co.uk/global/products/product_stb_satellite_foxsat-hdr.asp">rather excellent Humax Foxsat</a> can be made to do things that other PVR owners can only dream about.</p>
<p>There&#8217;s a <a href="http://www.avforums.com/forums/freesat/1661195-media-file-server-bundle-foxsat-hdr-release-4-0-part-3-a.html">very simple to install firmware upgrade</a> that makes the foxsat behave as a media server.  This means that your television recordings are exposed as uPNP streams over your home network, meaning you can watch them in other rooms in the house, on a PC, ipad, or jailbroken apple TV.</p>
<p>Here&#8217;s my setup:</p>
<ul>
<li><span style="line-height:14px;">Humax and main telly in the conservatory connected to a powerline ethernet adaptor.  </span></li>
<li>Main broadband router upstairs connected to another powerline ethernet adaptor on one of the LAN ports.</li>
<li>Apple TV in the front room wirelessly connected to the broadband router and jailbroken.  Once jailbroken, the apple TV can run <a href="http://wiki.xbmc.org/index.php?title=How-to:Install_XBMC_on_Apple_TV_2">XBMC</a> which amongst other things will act as a uPNP client.  This allows the recording library on the humax to be browsed and watched in the living room, without affecting someone watching in the conservatory</li>
<li>Apple iPad running the  <a href="https://itunes.apple.com/gb/app/aceplayer-powerful-media-player/id463242636?mt=8">Ace Player</a> app which can connect to the humax library wirelessly from anyway in the house.  Also has a download option so I can save TV programmes on the ipad for rail commutes.</li>
<li>Boxee running on the mac to do the same on the laptop.</li>
<li>An Iomega NAS drive connected to the router which programmes can be copied onto when space is running low on the humax,  This also exposes itself as uPNP streams so can be browsed by the apple TV and ipad in exactly the same way.</li>
</ul>
<p>The humax can apparently run up to seven simultaneous uPNP feeds without breaking into a sweat &#8211; this could be great resource in a household where many children want to watch something different at the same time.</p>
<p>Someday I&#8217;ll look into hacking the Raspberry Pi to have a uPNP client so it can be velcroed onto the back of the telly in the spare room.</p>
