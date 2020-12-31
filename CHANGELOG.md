# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.5.0](https://github.com/ali-master/persian-tools/compare/v1.4.2...v1.5.0) (2020-12-31)


### Features

* Upgraded rollup and packages version ([a5a4c9b](https://github.com/ali-master/persian-tools/commit/a5a4c9bf748fc29659837023100bdb5c266f3c52))
* **extractCardNumber:** added 3 more acceptable keywords in regex ([9e34d78](https://github.com/ali-master/persian-tools/commit/9e34d7831ec5b09717a1fdffe21a2d9e01d9d740))
* **Wallaby:** Added Wallaby and fixed tests errors ([cfe7d20](https://github.com/ali-master/persian-tools/commit/cfe7d20cbd8b79a641ff6f7b36e80ce4181b6193))
* **WordsToNumber:** Added fuzzy to fix wrong words ([13282a9](https://github.com/ali-master/persian-tools/commit/13282a90368d79527b89656bec16d68600d8e88c))
* added card-number extractor into text ([4f33602](https://github.com/ali-master/persian-tools/commit/4f33602bded4669b4b9f80aed2095a39fee36ea1))
* added github-pages and typedoc ([3d8af7e](https://github.com/ali-master/persian-tools/commit/3d8af7ec569d2c2e500b6bb56f94a91aa49d5b53))
* added humanizing words by fuzzy in words to number ([49d6491](https://github.com/ali-master/persian-tools/commit/49d649138cea8285adae12f1f44b5b257e7c14ee))
* added iranian banks card numbers regex ([e65be1e](https://github.com/ali-master/persian-tools/commit/e65be1ea7ff6030bda3464ea5ed318754131b62d))
* added iranian phone number validator and details ([224f8e8](https://github.com/ali-master/persian-tools/commit/224f8e8c1285a1f3f80c0468cfe426f8e8fc2be5))
* updated project folders structure ([cc4e6c1](https://github.com/ali-master/persian-tools/commit/cc4e6c1bea0176c4517ac6a5b6752169bcc923e4))


### Bug Fixes

* **extractCardNumber:** replaced acceptableKeywords with empty string ([23330a4](https://github.com/ali-master/persian-tools/commit/23330a45e019f32072ab5386aae3879ec2cc9d38))
* **Fuzzy:** Removed fuse.js and used fastest-levenshtein to find the closest word ([65f70df](https://github.com/ali-master/persian-tools/commit/65f70dfb9f5567e90ee75f30d50977730f4481e0))
* automatic update docs on github pages ([ebe2c79](https://github.com/ali-master/persian-tools/commit/ebe2c7995cc146dea867b72bc179209761f51ad7))
* automatic update docs on github pages ([2cbcfee](https://github.com/ali-master/persian-tools/commit/2cbcfee6be84cc2d29ab1601fa5d8335e73df7d1))
* updated typedoc mode value to file ([4161b89](https://github.com/ali-master/persian-tools/commit/4161b89268a99a89d1e3fd75ec40862e1c5dce64))

### [1.4.2](https://github.com/ali-master/persian-tools/compare/v1.4.1...v1.4.2) (2020-09-30)


### Bug Fixes

* eslint errors in shebaCodes file ([eee8662](https://github.com/ali-master/persian-tools/commit/eee866229373ed3fcce8fb8eceb207c3aa365b58))

## [1.4.1](https://github.com/ali-master/persian-tools/compare/v1.3.0...v1.4.1) (2020-09-30)


### Features

* added sheba ([027c89d](https://github.com/ali-master/persian-tools/commit/027c89df1b7e233801a02346e623bbe5b9327ff0))


### Bug Fixes

* github actions lint error ([8b53e56](https://github.com/ali-master/persian-tools/commit/8b53e56cab73fe922e5bcddc0364dfd3c070774d))
* github actions prettier error ([635939a](https://github.com/ali-master/persian-tools/commit/635939ab85d9b1facf791da5442cb5d00f52254b))

## [1.3.0](https://github.com/ali-master/persian-tools/compare/v1.2.4...v1.3.0) (2020-09-27)


### Features

* add getBarcode test case ([9a5a830](https://github.com/ali-master/persian-tools/commit/9a5a830e440199b6f6d26da011f126c35b6b6bfd))
* add isValidPayment test case ([709b83c](https://github.com/ali-master/persian-tools/commit/709b83ce10f5b6c8abc27adef25100a62acc92e7))
* add test case for bill amount and type ([5a0c29d](https://github.com/ali-master/persian-tools/commit/5a0c29dcd81d01cb66caa7319dfaaadef81c5d22))
* add test for uncovered lines ([70f0577](https://github.com/ali-master/persian-tools/commit/70f057758ad1ec6580e9086813a74df7412dc22f))
* add verificationBillId test case ([9ce0c16](https://github.com/ali-master/persian-tools/commit/9ce0c161e0e05a63ab277f8b958b14ecfe848bb7))
* added Bill calculator ([6c6b945](https://github.com/ali-master/persian-tools/commit/6c6b945991a39c59ffd279fc471160a334f69e2f))
* create doc for billInfo ([317b473](https://github.com/ali-master/persian-tools/commit/317b473b1d50c437113ce68a20a83f64b4d21e1d))
* write bill is valid test case ([379278c](https://github.com/ali-master/persian-tools/commit/379278c715fc4d1b533ca35204d0dfb36c4668f0))

### [1.2.4](https://github.com/ali-master/persian-tools/compare/v1.2.3...v1.2.4) (2020-09-27)

## [1.2.3](https://github.com/ali-master/persian-tools/compare/v1.2.2...v1.2.3) (2020-06-09)

### Features

-   exported national id interfaces ([2f40256](https://github.com/ali-master/persian-tools/commit/2f402569a495a3452639b2f40c07fbd6cee74a69))

### [1.2.2](https://github.com/ali-master/persian-tools/compare/v1.2.1...v1.2.2) (2020-05-30)

### Bug Fixes

-   falsy value in addCommas function ([b1cfd35](https://github.com/ali-master/persian-tools/commit/b1cfd35ffeea9795c54a39e58728401f5f756b7e))

## [1.2.0](https://github.com/ali-master/persian-tools/compare/v0.0.2...v1.2.0) (2020-02-08)

### Features

-   added browser supports ([9c0f0d3](https://github.com/ali-master/persian-tools/commit/9c0f0d3904641065fe25d79a1f75ffcd758b923d))
-   added typescript and upgraded packages ([e71ae27](https://github.com/ali-master/persian-tools/commit/e71ae27b1960528e25d9a9953672f13332d61a46))
-   extracted all test to singel files ([454805a](https://github.com/ali-master/persian-tools/commit/454805a9715c33e17bb2bac546375798fd2d335c))

### Bug Fixes

-   convert یکصد to number in WordsToNumber function ([3540b48](https://github.com/ali-master/persian-tools/commit/3540b4866e8832d6e009d3516a86e8e91aca25e6))
-   load functions in browser without tools (issue:[#2](https://github.com/ali-master/persian-tools/issues/2)) ([f91414b](https://github.com/ali-master/persian-tools/commit/f91414b1699713537d5a20a1f7cf25fac0afd4ba))

## [1.1.0](https://github.com/ali-master/persian-tools/compare/v0.0.2...v1.1.0) (2020-02-08)

### Features

-   added browser supports ([9c0f0d3](https://github.com/ali-master/persian-tools/commit/9c0f0d3904641065fe25d79a1f75ffcd758b923d))
-   added typescript and upgraded packages ([e71ae27](https://github.com/ali-master/persian-tools/commit/e71ae27b1960528e25d9a9953672f13332d61a46))
-   extracted all test to singel files ([454805a](https://github.com/ali-master/persian-tools/commit/454805a9715c33e17bb2bac546375798fd2d335c))

### Bug Fixes

-   convert یکصد to number in WordsToNumber function ([3540b48](https://github.com/ali-master/persian-tools/commit/3540b4866e8832d6e009d3516a86e8e91aca25e6))
-   load functions in browser without tools (issue:[#2](https://github.com/ali-master/persian-tools/issues/2)) ([f91414b](https://github.com/ali-master/persian-tools/commit/f91414b1699713537d5a20a1f7cf25fac0afd4ba))

<a name="0.0.5"></a>

## [0.0.5](https://github.com/ali-master/persian-tools/compare/v0.0.4...v0.0.5) (2018-09-04)

### Bug Fixes

-   load functions in browser without tools (issue:[#2](https://github.com/ali-master/persian-tools/issues/2)) ([f91414b](https://github.com/ali-master/persian-tools/commit/f91414b))

<a name="0.0.4"></a>

## [0.0.4](https://github.com/ali-master/persian-tools/compare/v0.0.3...v0.0.4) (2018-09-04)

<a name="0.0.3"></a>

## [0.0.3](https://github.com/ali-master/persian-tools/compare/v0.0.2...v0.0.3) (2018-06-22)

### Bug Fixes

-   convert یکصد to number in WordsToNumber function ([3540b48](https://github.com/ali-master/persian-tools/commit/3540b48))

<a name="0.0.2"></a>

## [0.0.2](https://github.com/ali-master/persian-tools/compare/v0.0.1...v0.0.2) (2018-06-19)

<a name="0.0.1"></a>

## 0.0.1 (2018-06-19)
