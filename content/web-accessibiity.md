---
title: 'Web Accessibility'
date: '2021-07-07'
description: 'Creating digital platfor for all users. While developing a digital platform, we forget our users with various kind of disablity. And only look at the aesthetics given by the visual designer team. It is equally important to increase our reach to all.'
tags: ['html', 'Web accessibility']
---

## What do we mean by making the web for all?

While building the software, we forget people with a variety of disabilities like :

- For everyone including developers who like the keyboard more than the mouse
- With disability: Motor disability, etc
- Vision Impairment: Color, Visual
- Deaf/hearing impairment: Rely on captions.
- Cognitive disability: Learning disability, grasping/focussing on a lot of information, distractibility,
- People using assistive technology: Screen readers
- Changing ability: Ageing

The web is changing and so are the rules. There are various standards for accessibility like A, AA and AAA. Accessibility (a11y) has become a default for making a website. Companies are sued for not complying with the rules.

So the question is what we need to do?

## What do I do for making my website accessible?

Accessibility is based on 4 major categories or guiding principles. These are:

- **Perceivable:** Available to the senses (vision and hearing primarily) through the browser or through assistive technologies (e.g. screen readers, screen enlargers, etc.)

- **Operable:** Users can interact with all controls and interactive elements using the mouse, keyboard, or any other assistive device.

- **Understandable:** Content is clear and limits confusion and ambiguity.

- **Robust:** A wide range of technologies (including old and new user agents and assistive technologies) can access the content.

## Designs

Accessibility starts with the design system. May it be creating a ramp for people on a wheelchair near a staircase, or an extended rod to hold while walking for age-ing people or people who need support while walking. The same goes for the websites as well. We have to make our website accessible to all kind of age-group, people who uses a variety of assistive technology, etc. and that starts with designing.

## Layout

Below are a few guidelines which we could follow while laying out our web pages.

- More contrast to background and foreground colours.
- Give more contrast between colours used side-by-side.
- Avoid a busy layout of the webpage. Make a simple layout and give more spacing to logically segregate areas.
- Make sure your layout is colour blind accessible.
  - Red / Green Deficiency
  - Blue / Yellow Deficiency
- Responsive Design is a must for all the designs so that the user is able to access your webpage on all the devices.
- Use semantic markup. If CSS is removed, the layout should give a logical flow of data. This would help screen readers and bots to read the page.
- Typography
  - Proper scaling of fonts
  - Body text should be readable
  - Avoid "justify text-align" for alignment. This becomes very difficult to read with a variety of spacing between the text.
  - Use rems appropriately.

## Forms

Forms are an important part to collect data from your users. This has to be more accessible and seamless while we present. Below are the few pointers that could be used followed while implementing.

- Labels should be clear
- Help text should be upfront so that the user should not guess the field validation.
- The placeholder should not disappear if no label present.
- Make sure the user is able to submit the form and recover from errors.

## Touch targets

The major interaction of any user journey is through clicks/touch targets. So if the touch targets are not very effective, the user might not want to continue with the page. Let us see what we can do to make it a better user experience.

- Touch targets should be bigger enough
- Enough space between the touch targets so that the user finds it easy to click the desired one.
- Give visual indication and differentiation for various states

## Focus, hover and active states

Majorly we disable all the states for better UX. This hampers the accessibility of the webpage. Let us see some best practices from the industry.

- Give proper CSS class and styles
- Do not remove focus and active styles. It gives a visual mark where the user is currently present.
- Give proper contrast in style wrt the background
- Allow disable animation
- Make sense of the animation wrt the context.

## Design for crisis

Sometimes things do not go as per plan and there are errors on the page. We should be able to revive from it. Design for error scenarios as well.

- Give info to the user on what happened if possible.
- Give options for the users to revive from the crisis like go home, go back the form, etc.

## Assets

We have various visual representations on the page. We also need to make it accessible by the following.

- Images
  - Give alt text
  - Use JPEGs over PNG. The compression quality for jpg is good.
  - Use image optimisation tools
  - Try using SVGs.
  - For long description, use longdes="longtext.txt"
- Audio / Video
  - Use captions and transcripts for people/bots who find it difficult to get the video/audio
  - Have controls to video/audio

## Resources

https://webaim.org/

https://www.a11yproject.com/
