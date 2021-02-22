# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][Keep a Changelog] and this project adheres to [Semantic Versioning][Semantic Versioning].

## [2.1.2] - *Jan 11, 2021*

### Added

1. Added CHANGELOG.md (@learus)
2. Added `boolean` prop `swipe` prop that implements ability to toggle swipe behaviour. Default: `true`. (@learus)
3. Added `boolean` prop `stopAutoPlayOnHover` that implements ability to stop autoPlay (auto-scroll slides) when mousing over the carousel. Default: `true`. (@learus)

### Changed

1. Pressing the Next Button while being on the last slide, triggers the "Back" animation when going cycling back to the first slide. Fixes bug #1. (@learus)
2. Changed timeout explanation on README, to refer to Material UI Documentation. (@learus)

### Deprecated

1. Removed `timer` prop from Demo code, since it was obsolete and not used. A relic of early development. (@learus)

### Fixed

1. Fixed a bug, where pressing the first indicator, while being on the last slide (and backwards) would trigger the wrong/unexpected animation. Fixed by change #1. (@learus)
2. Fixed a bug, where exit animation would not play if `timeout` prop was not a `number`. (@learus)



<!-- Links -->
[Keep a Changelog]: https://keepachangelog.com/
[Semantic Versioning]: https://semver.org/

<!-- Versions -->
[0.0.2]: https://github.com/Author/Repository/compare/v0.0.1..v0.0.2
[0.0.1]: https://github.com/Author/Repository/releases/v0.0.1