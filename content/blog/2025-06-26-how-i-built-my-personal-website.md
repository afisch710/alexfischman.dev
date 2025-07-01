---
title: "How I Built alexfischman.dev"
date: "2025-07-01T20:00:00Z"
description: "A technical breakdown of my portfolio site intertwined with lessons I've learned along the way"
draft: false
---

## Why? My Goals And Philosophy

If I'm going to talk the talk, I better walk the walk.

I built **alexfischman.dev** not only to highlight my technical passions and history, but to equally showcase my software engineering acumen/prowess and how I prioritize building secure, stable, simple software. The proof is in the pudding (aka the [repo](https://github.com/afisch710/alexfischman.dev)).

This site was thoughtfully and intentionally crafted to be fast, cheap, scalable, reliable and maintainable. Layer that with a delightful UX and you can check off a majority of the "good software checklist".

The goal of this post is to shed some light on how I navigated the lifecycle of this site, from ideation to production.

## Deciding Your Tech Stack

The upfront investment of carefully planning out your tech stack is always worth it. Shortcuts or blissful ignorance at this stage will almost certainly lead to pain, which can surface through your wallet, your sanity, or your success. Now there is an argument that stack sacrifices can and maybe should be made at the start when time is your most valuable resource in a market share race, but I don't anticipate this website becoming the next Unicorn in Silicon Valley so I am not taking that route.

To reiterate my requirements for this website:
- Fast
- Cheap
- Scalable
- Reliable
- Maintainable

Fast, cheap and scalable may have been an oxymoron in days past, but a lot of smart people have spent a lot of time delivering solutions that marry these together in the form of the cloud. I openly admit that **AWS** is the most developer friendly (in my opinion) and it is my platform of choice when investing in new projects/ventures.

Delving into the AWS world's vast catalog of services and my own past experience, my go to choice for a fast, cheap and scalalbe web experience is to statically host a site in **S3** and leverage **Cloudfront** as a CDN. This can totally eliminate the need for cloud compute while providing low latent access to your content worldwide.

Reliability and maintainability typically are a balance between adopting mature frameworks/technologies and then developing atop them with a proper technical design. My go-to's here are **Next.js (React.js) and TypeScript**. It's a widely supported stack that I am very familiar with.

Let's dive deeper.

### Frontend Stack

I find **Next.js** and the Pages router to be a great balance of developer experience and good perf. It's a relatively simple way to map a file system to routes. Next.js's SSG (static site generation) is an excellent choice for generating page HTML at build time and aligns easily with the static hosting in S3. The build-generated HTML can simply be uploaded to and then served out of the bucket with relatively small configuration and no server need.

As you may know, Next.js is a **React** framework. The React library provides an excellent abstraction for view-centric development and is a well established and supported at this point.

Truth be told, this was my first time using **TypeScript** extensively in a large project. My rationale for doing so was primarily to enable a type-safe and modern codebase, and secondarily to start growing these muscles and broaden my experience. I was pleasantly surprised with the language and it has a bright future ahead of it as a new native compiler (Go-based) is in active development and will offer 10x compilation times.

I historically have been a fan of Google's **Material Design** language and appreciate it's sleek and modern look and feel. That led me to leveraging **Material-UI v6**, the open-source React implementation of Material Design. I have past experience with this and will continue to advocate it is a good choice to build a consistent and pleasant Web UX in a simple manner.

I bundle in the Emotion library and Framer Motion library for some added animations throughout the UX.

### Blog Stack

When it comes to my blog, I initially was a little unsure of what route to go. Yes I am a developer, but I don't have much interest in the overhead of building new React components for every blog post. I hope to establish a somewhat regular posting cadence and would prefer a lighterweight way to write a blog post and publish it.

I equally didn't have a lot of interest in building out my own micro-service supported backend to host and serve content. It would have been a reinvention of many wheels and my time could be better spent elsewhere.

I did look at out of box solutions such as Netlify which would enable content storage in Github wrapped in some nice UX for management. Through prototyping though I discovered it felt a bit clunky and also a bit unnecessary for me. For a multi-authored blog full of non-developer writers, it is a good solution. But as the sole author of this and as a developer, it's a lot of overhead.

I found myself in search of a lightweight, git-managed, developer-friendly solution that doesn't fully exist in the wild so I decided to have a little fun and craft my own.

**Markdown** continuously popped into my head as a flexible and well established means for writing styled software documentation. Through some searching, I discovered the **Gray Matter** and **React Markdown** libraries which offer markdown parsing and markdown rendering in React-based applications. Running with this, I designed and implemented a blog content pipeline which supports authoring blog posts in markdown files (with styling, etc.), processing them at build time into JSON data containing the original markdown, and then grabbing the markdown out of the JSON and rendering it within a React wrapper.

Bingo, a stylable, repository stored, low overhead means for authoring blog posts and publishing them through a simple site deployment. And a good testament to not shy away from lightweight custom solutions if you have custom requirements.

### Package Management

Sometimes it can feel like there are more **software package managers** in the world there are people. I've never actually counted them both up and compared, but I assume it's coin flip for which is the winner.

I'm using `yarn` as my package manager because it’s reliable and fast and it works. Also I chose it because I chose it and I hope you can live with that. Jokes aside, package management is a crucial piece of software solutions and it enables leveraging many open-source libraries that can save you so much time. Get familiar with a manager and learn to use it rather than re-invent the wheel whenever you need to roll.

### Dynamic, But Static, URL-Friendly Content?

Let’s clear up a common misconception: static sites can still have dynamic content and dynamic URLs. This is a friend, not a foe. And it’s actually quite powerful.

Even though my site uses static generation (SSG), that doesn’t mean all the content is fixed at build time. Nor does it mean I need a separate file for every blog post. Enter: the slug.

“Slug” has two meanings here:
1. A **URL-friendly string** which provides great SEO web addresses. Look at the URL of this blog post. That hyphenated thing at the end, that's a slug.
2. In frameworks like **Next.js**, a `[slug].tsx` file represents a **dynamic route template**. It's like a reusable component that generates a unique page for each slug. If you're a developer, think of `[slug]` like a class, and each post is an instance—dynamically rendered, but still statically generated at build time.

This setup gives me the best of both worlds. Clean, scalable URLs and fast, cacheable, serverless performance.

### AWS

Someone talking about the AI boom may forget to mention Amazon (sorry that was mean), but when it comes to this tech stack I promise I didn't forget Amazon and AWS. If you've gotten this far, welcome to the cloud.

I've touched on it a bit already, but I've intentionally designed out and avoided any complex backend for this website. There truly isn't a need and I try to default to the KISS principle as often as possible. KISS being keep it simple, stupid. If you haven't heard of that, it's a design principle coined by the US Navy in the 1960s and is nowly widely/wisely adopted in tech. There's no need to overcomplicate something that's not complicated.

#### S3 + Cloudfront
So when it comes to this website's backend, it's rather simple. The build-generated HTML is stored in an S3 bucket that's configured for website hosting. In front of that, there's a Cloudfront distribution which acts as my global CDN (content delivery network) to cache and deliver content quickly.

A quick tangent - if you're not totally familiar with what the cloud actually is, you can think of it as a bunch of computers in a warehouse somewhere that your devices connect to over the internet and talk to. Amazon, Microsoft, Oracle, Google and others all have built these large warehouses (data centers) and companies rent the computers (servers) located there to run their programs on the internet. This website is actually hosted from Northern Virginia in Amazon's `us-east-1` region. Imagine if you lived in Australia and you wanted to look at this website on your phone. You'd enter the URL in your phone's browser, and then your phone would have to send a signal around the world to Virginia asking for this blog post. Then the computer in the Virginia data center would grab this blog post and send it all the way back around the world to Australia. The speed of light is fast, but doing something like this can legitimately introduce a delay that users notice and would perceive as slow / as a bad website. Now imagine you refresh the page from Australia, and again you have to travel around the world and back to get the same blog post you just asked for 5 seconds ago. That's a waste, right?

This is exactly what a CDN is for and why I'm using one. It's a bunch of smaller computers that are scattered all over around the world and can save information temporarily for faster access. Maybe the first time you try to load this blog post from Australia, you have to wait for it to get retrieved from Virginia. But if you refresh the page, the little computer nearby you in Australia remembers you already retrieved this blog post, and instead of going all the way back to Virginia to re-retrieve it, you simply get it from the Australian computer.

Bottom line, it's important not to shy away from added complexity if there's a true reason for it, and in this case, a CDN is the perfect solution for building a fast website.

#### The alexfischman.dev URL

I'll spare the boring details but an honorable mention to **Route 53** and **ACM**. I leverage these Amazon AWS services for domain configuration and to manage the certs needed to access this website securely (HTTPS) at alexfischman.dev.

#### Infrastructure as Code (IaC)

Quick plug: IaC is extremely important for managing cloud resources. It ensures reproducibility as well as version controlled changes to critical infrastructure to support my site. I promise you, you don't want to be in the business of manually making infrastructure changes in the AWS Console (or equivalent cloud hosting UX). You will forget a step at some point and risk down time.

I manage everything related to this site with **AWS CloudFormation**. You define what resources you need along with their configurations in YAML templates, and then deploy those templates to create/modify/delete the cloud resources. So in my case, everything related to S3, Cloudfront, DNS records/zones, and Certs is all defined in YAML for easy modification or re-deployment (as needed).

## The Development Process

Congratulations, you made it out of the tech stack doldrums and onto what this looks like in practice. What is my process for writing this code? How do I ensure a change doesn't break the website? What does it actually look like to update the live content on the website?

### Discipline, Discipline, Discipline

It's so much easier to reach your destination when you love the journey. Sure it's cliche but it's absolutely true in terms of your software development journey. Take the time to define your processes. Reflect on what tedious tasks you may have in those processes and then invest in automating them. Apply discipline to your project, and then apply discipline to applying discpline to all your projects. There may be pain at first but soon you'll reach that runner's high and truly be off to the races and towards your finish line.

Yes, I really tried hard to pull your attention back in because I truly believe this is so important, and that you absorb what this discipline actually looks like in software development. Here we go.

### Where Does The Code Live?

If you have a technical background you're well aware of Git and GitHub (plenty of resources online if not). I also heavily plug into GitHub's DevOps functionality including Repos, Issues, Actions, Secrets, Branch Policy, etc. You'll get a clearer picture of this as you read on.

### Developer Workflow

This can be thought of as a developer's routine. What are the things they always do every time they go to write some new code? A good workflow can make a developer's life so much easier and reduce the time it takes to make a high quality product.

In my case, I follow this exact process every time I write code for this website:
1. Scope the work - understand what specific change you'd like to make and do not let it get too big, that becomes tough to manage
2. Create a GitHub Issue - title and describe the change you just planned to make and create a specific issue to track the work
3. Checkout a git topic branch per issue - checkout a topic branch to make the changes described in the issue, I follow the branch naming pattern `issue/<issue_number>`
4. Code - implement the change, ideally with testing included
5. Create a PR - create a pull request targeting the development (main) branch which will merge your changes
6. PR status checks - more to come, but status checks (CI builds) are required to pass before a PR can merge
7. Merge PR - once the change is good and passing CI gates, merge the PR which will auto close the issue
8. Deploy - more to come, but a merging PR triggers deployment

I'd recommend developing familiarity with scripting. I personally have a few shell functions that automate branch creation, PR creation, etc. that I rely on for every change I make. A small thing that adds a big quality of life boost.

### GitHub Actions - CI/CD

Earlier I hammered home the need to use IaC, this goes hand in hand with that and is of equal or more importance.

A quick overview of **GitHub Actions** - these are automated workflows that you can configure (in YAML code) which are reponsible for building, testing, and deploying your code directly from GitHub. A very powerful suite of functionality.

GitHub automatically detects these workflows in the `.github/workflows` directory and actions are defined as YAML templates.

### Continuous Integration (CI)

CI pipelines are responsible for integrating your changes (that exist in a pull request) into the main development branch. They are an absolute must in order to have a stable and high quality codebase. A CI pipeline should build, validate, and test your changes and ensure that your change does not regress any existing code/functionality in the codebase.

My primary CI pipeline is [web-ci](https://github.com/afisch710/alexfischman.dev/blob/development/.github/workflows/web-ci.yml) and is responsible for validating any changes I make to this website. As mentioned, this is automatically triggered to run when I create a PR and my PR cannot merge until this passes. Assuming proper validation is defined in a CI, it can guarantee your codebase remains in a healthy state.

### Continuous Delivery (CD)

CD pipelines are responsible for automating the process to release/deploy code. This is another extremely important workflow as it guarantees replicable and stable deployment processes for updating your product.

For me, my CD pipeline is [web-cd](https://github.com/afisch710/alexfischman.dev/blob/development/.github/workflows/web-cd.yml). Once a PR merges, this is automatically triggered to deploy my change to become live on this website. This entails:
1. Building the application which generates all the static HTML we've previously discussed
2. Post build processing that organizes and cleans up the build output and getting into a state that's ready for deployment
3. Deploying the AWS Cloudformation stack to ensure all IaC changes for this website are immediately updated in AWS
4. Uploading the prepared build output (from step 2) to the S3 bucket which hosts this website statically
5. Invalidating the Cloudfront CDN to ensure no old files are leftover that would not reflect the new change

Additionally I have a couple CI/CD pipelines for the other IaC defined resources to ensure changes to them are protected and automated as well.

### The Result

What is the culmination of all the above? Shipping an update is as simple as creating an issue, writing the product code, and merging a PR. Within a few minutes it will then be live on this website and is as pain free as can be.

## Using AI Tools

If you are a developer, I hope you are utilizing every AI developer-assisting tool available to you. You will see a productivity boost on the order of multiple magnitudes. But do not fall for the trap. **Vibe coding** is always tempting, but in my opinion it's a dangerous trap that's too easy to fall into. Understanding your code and your product remains imperative. As is remaining in charge and responsible for your codebase.

Given that disclaimer, I have been and continue to be a strong strong advocate of tools like **Cursor** and **ChatGPT** for development. I was an early adopter of this technology and over the last 1-2+ years the progress being made that I witness firsthand daily is out of this world. I do enjoy testing the limits of artificial intelligence and how it can supplement my life, and particularly when it comes to software engineering it feels as if those limits are expanding as quickly as the universe is.

There are sizable portions of this codebase that I have co-developed with OpenAI's **o3-mini**, **o3**, and **o4-mini**, as well as Anthropic's **Claude Sonnet 4**. The ability to oversee their development of tedious or even complex coding tasks is a very high demand skill and I'm a firm believer that it will continue to be for the forseeable future. Now as I step off this small soap box, I'll reiterate that human ingenuity + creativity in combination with artificial intelligence and wrapping frameworks/tooling opens some incredible doors, particularly at this point in time. And I could talk about this for hours so please reach out if you share a similar vested interest or passion.

## That's A Wrap, Ship It

This is the first blog post I have ever written and it's been a great time. If you made it here, thank you for taking some time out of your day to learn about me and one of the things I've been working on. Software engineering has been a big part of my life and I'll continue to share some of my perspectives and experiences with it in the future. I also would love to branch this blog out into other areas I love, like the intersection of tech and business, my startup Smarter Weather, and any other rabbit holes I may find myself down.

I'd love to hear any feedback you may have, to answer any questions you have about this website, or to just have a fun conversation with you. Feel free to contact me at any of the social links below. And thanks for reading!