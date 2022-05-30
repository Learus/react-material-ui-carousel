# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][Keep a Changelog] and this project adheres to [Semantic Versioning][Semantic Versioning].

## [3.4.0 - 3.4.2] - *May 28 2022*

### Fixed

* Fixes [#issue 173](https://github.com/Learus/react-material-ui-carousel/issues/173). Problem was caused by framer-motion enter animation div having 0 `height`, and hence making the carousel have 0 `height`, when the animation took a long time to start, or the user was spamming the next button. Now, the library checks for 0 `height`, and retries to set `height` after a few ms until the div's `offsetHeight` isn't 0 anymore. ([@learus])

### Added

* The carousel now supports React 18 as well as React 17. ([@aveloso4], [@learus] )

## [3.3.0 - 3.3.3] - *Mar 25 2022*

### Changed

* The carousel now changes its height to be exactly the height of the current active child.

### Added

* Added the `height` prop, to specify an exact height for the carousel. If it is specified, the carousel's height will no longer be the active child's height.
* Added a section in the demo to demonstrate dynamic height functionality.

### Fixed

* :bug: Fixed the `index` bug, where the carousel wouldn't update when the `index` prop was changed.
* Removed unnecessary and forgotten console logs

## [3.2.0] - *Feb 10 2022*

### Added

* Added support for sx prop on Carousel container ([@matyas-igor])
* Now `autoPlay` is paused when carousel is focused using keyboard, hence making the library more accessible. [Issue.](https://github.com/Learus/react-material-ui-carousel/issues/137) ([@hajineats])
* Links to contributor profiles on CHANGELOG.md

### Changed

* Converted makeStyles into using styled helper ([@matyas-igor])
* Updated the file structure to be more readable ([@Learus])
* **(Breaking)** Added `@mui/system` as peer dependency.  
  * *Reason*: The newly added `sx` prop is of type `SxProps` imported from `@mui/system`.

### Removed

* Removed legacy @mui/styles (and thus jss dependency) ([@matyas-igor])

## [3.1.2] - *Jan 22 2021*

This version is unpublished. Its changes are moving to version 3.2.0 among others.

## [3.0.2] - *Oct 29 2021*

### Changed

* Changed `next`, `prev`, and `onChange` typings to reflect their arguments and return value.

## [3.0.0] - *Oct 28 2021*

:fireworks::fire: React Material Ui Carousel has been fully refactored to use more modern react techniques such as hooks, functional components and other cool stuff. :fire::fireworks:  
In general, its usage does not change.

### Changed

* The library is now written in Typescript, for easier development, debugging and smaller package sizing.
* **(Breaking)** Now supports MUI 5 **by default**. Version 3 will not work with MUI 4 as of now. ([@Learus])
  * Hence, minimum React version has been bumped to `^17.0.1`
* **(Breaking)** Now uses [`framer/motion`](https://github.com/framer/motion) to handle animations and gesture support. More animations will be added in the future. ([@Learus])
  * "Enter" and "Exit" animations are now simultaneous. No flash/gap of background between slide changes. Fixes issues [20](https://github.com/Learus/react-material-ui-carousel/issues/20), [61](https://github.com/Learus/react-material-ui-carousel/issues/61), [66](https://github.com/Learus/react-material-ui-carousel/issues/66).
  * The first carousel item now renders without an "initial" animation. Implements feature request [92](https://github.com/Learus/react-material-ui-carousel/issues/92).
  * **(Breaking)** The `timeout` prop is now `duration` and only supports a number that handles every aspect of the animation (enter, exit, e.t.c.)
* **(Breaking)** Now renders (preloads) all items initially **and does not rerender** them, unless there has been a state change. Implements feature request [88](https://github.com/Learus/react-material-ui-carousel/issues/88) ([@Learus])
* **(Breaking)** `CarouselStyleProps` &#8594; `CarouselNavProps` ([@Learus])
* Updated the [Demo page](https://learus.github.io/react-material-ui-carousel) look.

### Fixed

* `findDOMNode is deprecated in StrictMode.` warning has now been fixed. Material UI animations are no longer being used. [Issue.](https://github.com/Learus/react-material-ui-carousel/issues/32) ([@Learus])
* `Can't perform a React state update on an unmounted component.` warning has now been fixed. [Issue.](https://github.com/Learus/react-material-ui-carousel/issues/44) ([@Learus])

### Removed

* Removed any dependencies that were necessary for version 2. Only dependency now is `framer/motion`

## [2.3.5] - *Sep 22 2021*

### Fixed

- Added fullHeightHoverButton class to styles, to fix `property does not exist` error. [Issue.](https://github.com/Learus/react-material-ui-carousel/issues/110) ([@Learus])

### Changed

- Removed unnecessary ternary operators. [Issue.](https://github.com/Learus/react-material-ui-carousel/issues/111) ([@Learus])

## [2.3.1] - *August 15 2021*

### Fixed

- Fixed author link on README.md. It didn't work. (@hamidreza-nateghi)

## [2.3.0] - *August 15 2021*

### Added

- Added all `aria` props to:
  - `navButtonsWrapperProps`
  - `navButtonsProps`
  - `indicatorIconButtonProps`
  - `activeIndicatorIconButtonProps`
  - `indicatorContainerProps` ([@Learus])
- Added `reverseEdgeAnimationDirection` prop. Normally, the Carousel reverses the animation direction when going from its last child to its first (right --> left). It also reverses the animation direction when going from its first child to its last (left --> right). This prop disables this functionality.
  Now every "next" button press will have a right directed animation and each "previous" button press will have a left directed animation. ([@Learus])

## [2.2.7] - *July 5 2021*

### Fixed

- Fixed a bug where it was necessary to provide both `className` and `style` when styling buttons or indicators, when using typescript. ([@Learus])

## [2.2.6] - *May 7 2021*

### Changed

- Updated `react-swipeable` package to `^6.1.0` from `^5.5.1`. ([@Learus])

## [2.2.5] - *May 7 2021*

### Added

- Added `IndicatorIcon` prop explanation to Documentation. ([@Learus])

## [2.2.4] - *Apr 22 2021*

### Changed

- Corrected typo: `textAligh` --> `textAlign` on README.md ([@Learus])

## [2.2.3] - *Apr 9 2021*

### Changed

- Updated the library's `peerDependencies` to `react: ^17.0.1` and `@material-ui: ^4.11.3` ([@Learus])

## [2.2.2] - *Mar 26 2021*

### Fixed

- Removed a wrongly placed brace in the class value of the navigation buttons, that caused them to not be hidden by default. ([@8BitAron])

## [2.2.1] - *Feb 26, 2021*

### Added

1. Added `index.d.ts` explanation for `IndicatorIcon` prop. ([@Learus])

### Fixed

1. Fixed `index.d.ts` 2.2.0 new props to be optional, from mandatory. ([@Learus])

## [2.2.0] - *Feb 23, 2021*

### Added

1. Added `boolean` prop `cycleNavigation` that allows the developer to choose whether they want the carousel to cycle when it reaches the first or last slide. ([@Learus])
2. Added customizability to button icons. Using the `NextIcon`, `PrevIcon`, and `IndicatorIcon` one can customize the icon part of the navigation buttons and indicators. Those props are of type `ReactNode`, meaning they can be whatever one wants them to be, without breaking important carousel functionality. ([@Learus] & @cansin)
3. Added even more customizability to buttons. Using the `NavButton` prop, you get full control of the navigation buttons. The prop should be a function that takes the specified parameters and returns a ReactNode. It's advised to return a `<Button/>` using the given `onClick` parameter for the next and prev functions to work properly. It works in tandem with all other customization options: `navButtonsProps`, `navButtonsWrapperProps`, `navButtonsAlwaysVisible`, `navButtonsAlwaysInvisible`, `fullHeightHover`, ...). ([@Learus])
4. Added the Customizability section to the [README.md](README.md) ([@Learus])
5. Added 3rd example regarding customizability in the demo (TODO) ([@Learus])

### Changed (Breaking)

1. Changed indicator rendering implementation to support customization, and introduce consistency with next and prev buttons. Now, working with MUI `IconButton`. ([@Learus])
2. Changed `indicatorProps` to `indicatorIconButtonProps` and `activeIndicatorProps` to `activeIndicatorIconButtonProps` ([@Learus])
3. Changed `indicatorIconButtonProps` to style **all** indicators rather than only the **non-active** ones ([@Learus])
4. Changed `buttonVisible` class' `opacity` to `1` from `0.6`.

### Fixed

1. Added `Button` import in the example code in [README.md](README.md) ([@Learus])

## [2.1.2] - *Jan 11, 2021*

### Added

1. Added CHANGELOG.md ([@Learus])
2. Added `boolean` prop `swipe` that implements ability to toggle swipe behaviour. Default: `true`. ([@Learus])
3. Added `boolean` prop `stopAutoPlayOnHover` that implements ability to stop autoPlay (auto-scroll slides) when mousing over the carousel. Default: `true`. ([@Learus])

### Changed

1. Pressing the Next Button while being on the last slide, triggers the "Back" animation when going cycling back to the first slide. Fixes bug #1. ([@Learus])
2. Changed timeout explanation on README, to refer to Material UI Documentation. ([@Learus])

### Deprecated

1. Removed `timer` prop from Demo code, since it was obsolete and not used. A relic of early development. ([@Learus])

### Fixed

1. Fixed a bug, where pressing the first indicator, while being on the last slide (and backwards) would trigger the wrong/unexpected animation. Fixed by change #1. ([@Learus])
2. Fixed a bug, where exit animation would not play if `timeout` prop was not a `number`. ([@Learus])

<!-- Links -->

<!-- Versions -->

[Keep a Changelog]: https://keepachangelog.com/
[Semantic Versioning]: https://semver.org/
[@Learus]: https://github.com/Learus
[@matyas-igor]: https://github.com/matyas-igor
[@8BitAron]: https://github.com/8BitAron
[@hamidreza-nateghi]: https://github.com/hamidreza-nateghi
[@hajineats]: https://github.com/hajineats
[@aveloso4]: https://github.com/aveloso4