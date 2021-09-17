# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][Keep a Changelog] and this project adheres to [Semantic Versioning][Semantic Versioning].

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
  - `indicatorContainerProps` (@Learus)
- Added `reverseEdgeAnimationDirection` prop. Normally, the Carousel reverses the animation direction when going from its last child to its first (right --> left). It also reverses the animation direction when going from its first child to its last (left --> right). This prop disables this functionality.  
Now every "next" button press will have a right directed animation and each "previous" button press will have a left directed animation. (@Learus)

## [2.2.7] - *July 5 2021*

### Fixed

- Fixed a bug where it was necessary to provide both `className` and `style` when styling buttons or indicators, when using typescript. (@Learus)

## [2.2.6] - *May 7 2021*

### Changed

- Updated `react-swipeable` package to `^6.1.0` from `^5.5.1`. (@Learus)

## [2.2.5] - *May 7 2021*

### Added

- Added `IndicatorIcon` prop explanation to Documentation. (@Learus)

## [2.2.4] - *Apr 22 2021*

### Changed

- Corrected typo: `textAligh` --> `textAlign` on README.md (@Learus)

## [2.2.3] - *Apr 9 2021*

### Changed

- Updated the library's `peerDependencies` to `react: ^17.0.1` and `@material-ui: ^4.11.3` (@Learus)

## [2.2.2] - *Mar 26 2021*

### Fixed

- Removed a wrongly placed brace in the class value of the navigation buttons, that caused them to not be hidden by default. (@8BitAron)

## [2.2.1] - *Feb 26, 2021*

### Added

1. Added `index.d.ts` explanation for `IndicatorIcon` prop. (@Learus)

### Fixed

1. Fixed `index.d.ts` 2.2.0 new props to be optional, from mandatory. (@Learus)

## [2.2.0] - *Feb 23, 2021*

### Added

1. Added `boolean` prop `cycleNavigation` that allows the developer to choose whether they want the carousel to cycle when it reaches the first or last slide. (@Learus)
2. Added customizability to button icons. Using the `NextIcon`, `PrevIcon`, and `IndicatorIcon` one can customize the icon part of the navigation buttons and indicators. Those props are of type `ReactNode`, meaning they can be whatever one wants them to be, without breaking important carousel functionality. (@Learus & @cansin)
3. Added even more customizability to buttons. Using the `NavButton` prop, you get full control of the navigation buttons. The prop should be a function that takes the specified parameters and returns a ReactNode. It's advised to return a `<Button/>` using the given `onClick` parameter for the next and prev functions to work properly. It works in tandem with all other customization options: `navButtonsProps`, `navButtonsWrapperProps`, `navButtonsAlwaysVisible`, `navButtonsAlwaysInvisible`, `fullHeightHover`, ...). (@Learus)
4. Added the Customizability section to the [README.md](README.md) (@Learus)
5. Added 3rd example regarding customizability in the demo (TODO) (@Learus)

### Changed (Breaking)

1. Changed indicator rendering implementation to support customization, and introduce consistency with next and prev buttons. Now, working with MUI `IconButton`. (@Learus)
2. Changed `indicatorProps` to `indicatorIconButtonProps` and `activeIndicatorProps` to `activeIndicatorIconButtonProps` (@Learus)
3. Changed `indicatorIconButtonProps` to style **all** indicators rather than only the **non-active** ones (@Learus)
4. Changed `buttonVisible` class' `opacity` to `1` from `0.6`.

### Fixed

1. Added `Button` import in the example code in [README.md](README.md) (@Learus)

## [2.1.2] - *Jan 11, 2021*

### Added

1. Added CHANGELOG.md (@Learus)
2. Added `boolean` prop `swipe` that implements ability to toggle swipe behaviour. Default: `true`. (@Learus)
3. Added `boolean` prop `stopAutoPlayOnHover` that implements ability to stop autoPlay (auto-scroll slides) when mousing over the carousel. Default: `true`. (@Learus)

### Changed

1. Pressing the Next Button while being on the last slide, triggers the "Back" animation when going cycling back to the first slide. Fixes bug #1. (@Learus)
2. Changed timeout explanation on README, to refer to Material UI Documentation. (@Learus)

### Deprecated

1. Removed `timer` prop from Demo code, since it was obsolete and not used. A relic of early development. (@Learus)

### Fixed

1. Fixed a bug, where pressing the first indicator, while being on the last slide (and backwards) would trigger the wrong/unexpected animation. Fixed by change #1. (@Learus)
2. Fixed a bug, where exit animation would not play if `timeout` prop was not a `number`. (@Learus)

<!-- Links -->
[Keep a Changelog]: https://keepachangelog.com/
[Semantic Versioning]: https://semver.org/

<!-- Versions -->
[0.0.2]: https://github.com/Author/Repository/compare/v0.0.1..v0.0.2
[0.0.1]: https://github.com/Author/Repository/releases/v0.0.1
