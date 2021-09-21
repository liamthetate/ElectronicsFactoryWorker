# ELECTRONICS FACTORY WORKER: SIMULATOR!

![title](src/images/efws.png)

The ultimate SIMULATOR experience! Work a real-time 12 hour shift, sleep and then do it all over again! Have an existential crisis! Live game: http://liamtate.co.uk/efws/

Inspired by the contrasting experiences, the fun of being locked in too many (videogame) dungeon's as a kid on one hand, and on the other, the mass exploitation & meaninglessness inherent to Capitalism. LOL!
<br/>
<br/>

# PRODUCT SHOT
![product](src/images/product-shot.png)
<br/>
<br/>

# UX

????????????????????????????????????????????????????

## User Stories


First Time Visitor Goals

>I want to quickly waste as much time as possible

>I want to navigate the site, effortlessly, to find content.

>I want to be assured that this is a trustworthy operation, I want access to others opinions/reviews and the social media feeds to see what others are saying.

<br/>

Returning Visitor Goals

>I've decided I want to support the podcast, so want that to be obvious how I do that.

>I want a quick way to get in contact with the hosts.

>I want to find social media links.

<br/>

Frequent User Goals

>I want to search different topics/episodes I might not have listened to.

>I want to stay up-to-date about the podcast, website etc.

<br/>
<br/>

????????????????????????????????????????????????????


## Design
<br/>

Colour Scheme

![reference] (src/images/reference.jpg)

* Heavily inspired by the above, the game uses a restricted colour palette to give the game some element of (oppressive?) uniformity.
<br/>

Typography
* The default pixel text in KaboomJS works just fine but for the website I wanted legibility. The main font is 'Changa' with Sans Serif as the fallback.
<br/>

Wireframes
* Desktop - [title](src/images/wf1.png), [in-game](src/images/wf2.png), [in-game](src/images/wf3.png), [in-game](src/images/wf4.png), [in-game](src/images/wf5.png), [in-game](src/images/wf6.png), [in-game](src/images/wf7.png), [in-game](src/images/wf8.png), [in-game](src/images/wf9.png) 
<br/>
<br/>

# LIBRARIES, FRAMEWORKS & PROGRAMS USED

1. Bootstrap 4.5:
    * Bootstrap was used throughout for layout, buttons etc.
    
2. Google Fonts:
    * Google fonts was used for 'Changa'.
    
3. Font Awesome:
    * Font Awesome was for the top icon and the social media link.
    
4. Visual Studio Code
    * VSC was used for all code creation and pushing to GitHub.
    
5. GitHub:
    * GitHub was used to store the projects code after being pushed from Gitpod.
    
6. Photoshop:
    * Photoshop was used to edit exisitng assets and create new ones.
    
7. Balsamiq:
    * Balsamiq was used to create the wireframes during the design process.

8. KaboomJS:
    * The javascript library KaboomJS was essential for all the game code.
    
8. [Web Formater](https://webformatter.com/):
    * To format my html, css code and Javascript.
<br/>
<br/>

# FEATURES

## Navigation

The site is a single page design with an external link opening in a seperate window/tab.

??????????????????????????????????????????????????????????

Desktop:
![nav]()
The desktop navigation bar sticks to the top of the page throughout the users experience, this is particularly important as at any point they can push the call-to-action button, Support Us.

Mobile:
![nav]()
I didn't want the navigation to be hidden inside a 'burger' menu so choose to lose the 'title' and 'support us' button (and opt for a top banner instead) leaving space for the navigation names to be displayed.
<br/>
<br/>

## Landing page

![landing page]()
Quite quickly you get a summary of what the podcast is about, a testimonial, a way to listen/subscribe and the option to support the podcast.

- Listen & Subscribe:
![landing page]()
The button opens a Modal with podcast platform options, this keeps the main landing page clean and minimal. 
<br/>
<br/>


## Episodes

![landing page]()
There are a few design decision going on here, so i'll go through them one by one:
<br/>
<br/>

- **Patreon**
![locked]()
- The black box at the top is my attempt to recreate what one sees when browsing any given Patreon page, [locked content!]()

- I've used a red small badge, using the Patreon brand colour, and listed various perks as a preview for what a user might read on the Patreon page. 

- Given that there are already quite a few instances of the support button on the page, I decided not to put one below the bullet points and saved it to act as a book-end to the episode section. 
<br/>
<br/>

- **Free episode**
![free ep]()
- This follows the same design format but whilst the locked content has a small red badge, this has a monochromatic badge informing the user that it's free. Hyperlinks have been differentiated from the main text with a black colour.
<br/>
<br/>

- **Free playlist**
![playlist]()
- Placing the support button alongside the full list of free episodes is an attempt at reciprocity: 'here, have all this free content, it would be great if you could give something back in return' etc.
- For continuity I would liked to have made the playlists border edges curved, whilst easy to do in Chrome Dev Tools, this required some Javascript code that was beyond my understanding (at this point in time).
<br/>
<br/>

## About
![playlist]()
I've used the same heading font for their names to tie it to the podcasts title branding. I'd like to add more details to this in time but for now this is all the hosts supplied.
<br/>
<br/>

## Contact
![playlist]()
Fairly standard contact form lol. I didn't use the label tag but instead opted for placeholder text to do the job of communicating what each field was for.
<br/>
<br/>

## Footer
![playlist]()
The footer is sticky and displays throughout, the social media presence of the podcast is important for generating new listners and potential supporters, hence it is in a prominent place.
<br/>
<br/>
<br/>


# Testing User Stories from User Experience (UX) Section

## First Time Visitor Goals:

>I want to quickly understand the sites purpose and to listen/subscribe.

The header/hero sums up the site with easy access to listen. 

<br/>

>I want to navigate the site, effortlessly, to find content.

The single page design allows quick/intuitive use of the site.

<br/>

>I want to be assured that this is a trustworthy operation, I want access to others opinions/reviews and the social media feeds to see what others are saying.

The five star review (and the Apple podcast site which includes many reviews) and the social media links are all one tap/click away.

<br/>

## Returning Visitor Goals:

>I've decided I want to support the podcast, so want that to be obvious how I do that.

The Patreon links are... everywhere!

<br/>

>I want a quick way to get in contact with the hosts.

The social media and the link to the contact form are displayed at all times.

<br/>

>I want to find social media links.

You're in luck! They never go away!

<br/>

## Frequent User Goals:

>I want to search different topics/episodes I might not have listened to.

Currently the user can scroll the embedded playlist but there is room for major improvement here.

<br/>

>I want to stay up-to-date about the podcast, website etc.

The social media links will do this but a newsletter might serve the user better.

<br/>
<br/>

??????????????????????????????????????????????????????????

# FUTURE EXPANSION

There are numerous ways to improve this experience, from small to large.

SMALL: 

* A Hour/Minutes/Seconds countdown for the shift timer.

* Full touch-device compatibility

* 'Controls?' button is a expand/contract toggle!

* Animations!

* Less music? The game takes a while to load due to the quantity of tracks.

LARGE:

* Extra levels
<br/>
<br/>



# TESTING

## Devices & Browsers

The site was tested on the following devices:

Device | OS | Browser
-------|----|---------
iPhone 8 | iOS 14 | Safari, Ghostery, Firefox 
Macbook Pro | Big Sur | Safari, Firefox, Chrome, Brave

<br/>

## Validator testing

HTML: No errors were returned in my code passing through the W3C validator, however [it did not like the official Spotify iframe embeds]() but there isn't much I can do about that! 

CSS: No errors were found when passing through the Jigsaw W3C validator.
<br/>
<br/>

## Lighthouse results

Desktop [View]()
<br/>
<br/>

## Known bugs

1. Safari is a big one. Because of the AudioContent API, no sound will play at all! Chrome won't play the title music for the same reason but does work after that.

2. The game doesn't center very well on mobile, but given that this is a Desktop-only experience thats not a surprise! 
<br/>
<br/>


??????????????????????????????????????????????????????????????????????????????

# DEPLOYMENT

The site was deployed to GitHub pages by doing the following:

* GitHub repository > 'Settings' tab > 'Pages' menu
* Source drop-down menu > Select Master Branch > Click Save
* The live link can be found [here](https://liamthetate.github.io/itsnotjustinyourhead/) 

<br/>

I also deployed the website to my own ftp/website [here](http://liamtate.co.uk/injiyh/index.html), by cloning: 

* GitHub Repository > dropdown menu 'Code' 
* 'Download ZIP' > open zip > Filezilla to transfer files

<br/>

To clone a repository via HTTPS you could just read [this handy guide](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository), or following along below:

* Dropdown menu 'Code' > Choose either HTTPS, SSH or CLI
* Click clipboard icon
* Open Terminal > Type: 

        $ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY

* Press Enter:

        $ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
        > Cloning into `Spoon-Knife`...
        > remote: Counting objects: 10, done.
        > remote: Compressing objects: 100% (8/8), done.
        > remove: Total 10 (delta 1), reused 10 (delta 1)
        > Unpacking objects: 100% (10/10), done.

<br/>

To clone a repository to GitHub Desktop:

* Dropdown menu 'Code' > Open with GitHub Desktop
* Follow the prompts!
<br/>
<br/>


??????????????????????????????????????????????????????????????????????????????????????



# CREDITS

## Content: 

The game owes an obvious debt to Zelda but more importantly [Ania Kubów/FreeCodeCamp](https://www.youtube.com/watch?v=4OaHB0JbJDI&t=187s). Following her tutorials was essential to understanding KaboomJS, as such some of her code was repurposed and is detailed below. 

I also took some code from the tutorials on the KaboomJS [website](https://kaboomjs.com/).

* Code:

    - Character interacts with an object that triggers events and updates stats. The ('names') are my own but esstially this is her code:

		collides('spray', 'widget', (k,w) => {
            destroy(w)
            destroy(k)
		
            scoreLabel.value++
            scoreLabel.text = scoreLabel.value

            const obj = add([sprite('cleaned'), pos(240,384), 'cleaned'])
            const overlay = add([sprite('spray'), pos(240,384), 'spray'])

            wait(0.3, () => {
                destroy(overlay)
            })

    - The code to have an object appear outside the character I repurposed for a permenant UI effect:

        player.action(() => {
		    scoreLabel.pos = player.pos.add(player.dir.scale(-48)) //tracks/sticks to player
	    })

    - The countdown clock was lifted from her Space Invaders tutorial:

        actualTime.action(() => { /* action is called every frame */
            actualTime.time -= dt() /* delta time since last frame */
            const totalSeconds = actualTime.time
            actualTime.text = totalSeconds.toFixed(0)

    - Strobing colour on 'press start' text: [Source](https://kaboomjs.com/demo#button)

        pressSpace.action(()=> {
            const t = time() * 100;
            pressSpace.color = rgb(
                wave(10, 255, t),
                wave(0, 255, t + 2),
                wave(0, 255, t + 4),
	    )})
    
<br />

    
## Media: 
* The music featured in the game is my own.


