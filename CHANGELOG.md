# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.5.2](https://github.com/persian-tools/persian-tools/compare/v3.5.1...v3.5.2) (2024-01-09)

### [3.5.1](https://github.com/persian-tools/persian-tools/compare/v3.5.0...v3.5.1) (2023-12-29)


### Bug Fixes

* **toPersianChars:** wrong result in converting ی | reported by [#344](https://github.com/persian-tools/persian-tools/issues/344) ([4e2c6c8](https://github.com/persian-tools/persian-tools/commit/4e2c6c8392b77016eb4d89aaf5b82d456fd99a34))

## [3.5.0](https://github.com/persian-tools/persian-tools/compare/v3.4.1...v3.5.0) (2023-08-05)


### Features

* implement find capital by state name module ([#223](https://github.com/persian-tools/persian-tools/issues/223)) ([742add5](https://github.com/persian-tools/persian-tools/commit/742add5d5fce8219850b9da3df0ccc1bdfcfb39a))


### Bug Fixes

* **#308:** update test verifyIranianNationalId.spec.ts ([a4a3936](https://github.com/persian-tools/persian-tools/commit/a4a3936a3ca60b5e3d9adad7f290daed70a7b709)), closes [#308](https://github.com/persian-tools/persian-tools/issues/308)
* incorrect typings for phoneNumberDetail ([#323](https://github.com/persian-tools/persian-tools/issues/323)) ([ba66500](https://github.com/persian-tools/persian-tools/commit/ba6650061aee85ac44cdb0f6c9db9b86fd5e8f99))

### [3.4.1](https://github.com/persian-tools/persian-tools/compare/v3.4.0...v3.4.1) (2022-09-19)


### Bug Fixes

* **#280:** can't accept phone number starts with 0900 ([#283](https://github.com/persian-tools/persian-tools/issues/283)) ([4a8b7d7](https://github.com/persian-tools/persian-tools/commit/4a8b7d7dcd7eae0528a06a75f8453f39293e5098)), closes [#280](https://github.com/persian-tools/persian-tools/issues/280)
* **getBankNameFromCardNumber:** allow detecting by at least 6 nums ([#269](https://github.com/persian-tools/persian-tools/issues/269)) ([33c883e](https://github.com/persian-tools/persian-tools/commit/33c883e265f283882995da44f17286bc971ba1ff)), closes [#257](https://github.com/persian-tools/persian-tools/issues/257)

## [3.4.0](https://github.com/persian-tools/persian-tools/compare/v3.3.0...v3.4.0) (2022-07-07)


### Features

* install & config the vite and remove jest ([e8c14a8](https://github.com/persian-tools/persian-tools/commit/e8c14a83f26735b5cf7f6d827539a0180cf418b0))


### Bug Fixes

* [#208](https://github.com/persian-tools/persian-tools/issues/208) isPersian replacing ه wit arabic ه ([#225](https://github.com/persian-tools/persian-tools/issues/225)) ([15bd04e](https://github.com/persian-tools/persian-tools/commit/15bd04ef483ce24f9017f2ecf86db86d566d3839))
* **#226:** webpack failed to parse source map ([13590c2](https://github.com/persian-tools/persian-tools/commit/13590c2fb1c940542b6a599aa5dd48fb61b1c564)), closes [#226](https://github.com/persian-tools/persian-tools/issues/226)

## [3.3.0](https://github.com/persian-tools/persian-tools/compare/v3.2.0...v3.3.0) (2022-05-06)


### Features

* add phone number normalizer ([#184](https://github.com/persian-tools/persian-tools/issues/184)) ([aa84fe3](https://github.com/persian-tools/persian-tools/commit/aa84fe36553c66877bec9539a396988255619a00))

## [3.2.0](https://github.com/persian-tools/persian-tools/compare/v3.1.1...v3.2.0) (2022-01-03)


### Features

* :sparkles: add remainingTime function ([#116](https://github.com/persian-tools/persian-tools/issues/116)) ([9989cd5](https://github.com/persian-tools/persian-tools/commit/9989cd514f86a2c24e0bd4abffa4fb735c860ce8))


### Bug Fixes

* **nationalId:** add check mono ids ([#123](https://github.com/persian-tools/persian-tools/issues/123)) ([#127](https://github.com/persian-tools/persian-tools/issues/127)) ([a303b89](https://github.com/persian-tools/persian-tools/commit/a303b89dca28f436149f17c55b85283fafc56328))

### [3.1.1](https://github.com/persian-tools/persian-tools/compare/v3.1.0...v3.1.1) (2021-12-28)

## [3.1.0](https://github.com/persian-tools/persian-tools/compare/v3.0.1...v3.1.0) (2021-12-28)


### Features

* add legal id validation module and test ([7083b30](https://github.com/persian-tools/persian-tools/commit/7083b302d2bb60cd024ef7fcdf185a4a6d692976))


### Bug Fixes

* **#122:** node 17 supports ([2ed8bd6](https://github.com/persian-tools/persian-tools/commit/2ed8bd63a734305255ecaa4ee21e5753bf2a0d65)), closes [#122](https://github.com/persian-tools/persian-tools/issues/122)
* wordsToNumber return 0 for MAGNITUDE constants ([61e63be](https://github.com/persian-tools/persian-tools/commit/61e63bed620d0299249b4eb659405d5e6803d3db))

### [3.0.1](https://github.com/persian-tools/persian-tools/compare/v3.0.0...v3.0.1) (2021-09-05)

## [3.0.0](https://github.com/persian-tools/persian-tools/compare/v1.7.0-beta.1...v3.0.0) (2021-09-05)


### ⚠ BREAKING CHANGES

* **README:** update the Sheba section which is now written in functional

### Features

* **Sheba:** make it functional to be more tree-shakeable ([daa4eda](https://github.com/persian-tools/persian-tools/commit/daa4edad53b56b82c19ec362190910bf6a384fa6))


### Bug Fixes

* bundle size and remove all source map files ([90c3328](https://github.com/persian-tools/persian-tools/commit/90c3328441c5a9a1de3ffbb13f5fd8c9a15de5be))
* change micro:build object name to PersianTools ([9dd8c58](https://github.com/persian-tools/persian-tools/commit/9dd8c5810e47b85427866a14cac59fc21c7c3279))
* **#99:** node and npm versions error while installing ([935cf9b](https://github.com/persian-tools/persian-tools/commit/935cf9b992aa145748c6c197354e9cb1be7925f9)), closes [#99](https://github.com/persian-tools/persian-tools/issues/99)


* **README:** update the Sheba section which is now written in functional ([cadbbd0](https://github.com/persian-tools/persian-tools/commit/cadbbd06e0e41a5d3b4702889dc2a3d632ed95f9))

## [2.0.0](https://github.com/persian-tools/persian-tools/compare/v1.8.0-beta.0...v2.0.0) (2021-08-28)


### ⚠ BREAKING CHANGES

* **README:** update the Sheba section which is now written in functional

* **README:** update the Sheba section which is now written in functional ([4451df1](https://github.com/persian-tools/persian-tools/commit/4451df156868be457ca456da5af6448b7e8ee1ef))

## [1.8.0-beta.0](https://github.com/persian-tools/persian-tools/compare/v1.7.1...v1.8.0-beta.0) (2021-08-19)


### Features

* **Sheba:** make it functional to be more tree-shakeable ([9f9c0e5](https://github.com/persian-tools/persian-tools/commit/9f9c0e5d49d9395ca8108da072d63ddb9163fb41))

### [1.7.1](https://github.com/persian-tools/persian-tools/compare/v1.7.0...v1.7.1) (2021-08-10)


### Bug Fixes

* bundle size and remove all source map files ([89577ad](https://github.com/persian-tools/persian-tools/commit/89577adcbcc4bf0c7439c2aa8c94436df7a6dd43))

## [1.7.0](https://github.com/persian-tools/persian-tools/compare/v1.6.3...v1.7.0) (2021-08-05)


### Bug Fixes

* change micro:build object name to PersianTools ([f4cc48d](https://github.com/persian-tools/persian-tools/commit/f4cc48de704427aa468730fa097f41649f5d29f9))
* **#103:** digitsArToFa and digitsArToEn encoding issue ([4cd080b](https://github.com/persian-tools/persian-tools/commit/4cd080ba9b4063974d15d9c8287ffe3df36ec073)), closes [#103](https://github.com/persian-tools/persian-tools/issues/103)

### [1.6.3](https://github.com/persian-tools/persian-tools/compare/v1.6.2...v1.6.3) (2021-07-25)


### Bug Fixes

* **#99:** node and npm versions error while installing ([08db1d0](https://github.com/persian-tools/persian-tools/commit/08db1d0cfd1073fe9778e140b8fdd03e4e33ffa0)), closes [#99](https://github.com/persian-tools/persian-tools/issues/99)

### [1.6.2](https://github.com/persian-tools/persian-tools/compare/v1.6.2-beta.5...v1.6.2) (2021-07-19)

## [2.0.0](https://github.com/persian-tools/persian-tools/compare/v1.8.0-beta.0...v2.0.0) (2021-08-28)


### ⚠ BREAKING CHANGES

* **README:** update the Sheba section which is now written in functional

* **README:** update the Sheba section which is now written in functional ([4451df1](https://github.com/persian-tools/persian-tools/commit/4451df156868be457ca456da5af6448b7e8ee1ef))

## [1.8.0-beta.0](https://github.com/persian-tools/persian-tools/compare/v1.7.1...v1.8.0-beta.0) (2021-08-19)


### Features

* **Sheba:** make it functional to be more tree-shakeable ([9f9c0e5](https://github.com/persian-tools/persian-tools/commit/9f9c0e5d49d9395ca8108da072d63ddb9163fb41))

### [1.7.1](https://github.com/persian-tools/persian-tools/compare/v1.7.0...v1.7.1) (2021-08-10)


### Bug Fixes

* bundle size and remove all source map files ([89577ad](https://github.com/persian-tools/persian-tools/commit/89577adcbcc4bf0c7439c2aa8c94436df7a6dd43))

## [1.7.0](https://github.com/persian-tools/persian-tools/compare/v1.6.3...v1.7.0) (2021-08-05)


### Bug Fixes

* change micro:build object name to PersianTools ([f4cc48d](https://github.com/persian-tools/persian-tools/commit/f4cc48de704427aa468730fa097f41649f5d29f9))
* **#103:** digitsArToFa and digitsArToEn encoding issue ([4cd080b](https://github.com/persian-tools/persian-tools/commit/4cd080ba9b4063974d15d9c8287ffe3df36ec073)), closes [#103](https://github.com/persian-tools/persian-tools/issues/103)

### [1.6.2-beta.5](https://github.com/persian-tools/persian-tools/compare/v1.6.2-beta.4...v1.6.2-beta.5) (2021-07-11)

### [1.6.2-beta.4](https://github.com/persian-tools/persian-tools/compare/v1.6.2-beta.3...v1.6.2-beta.4) (2021-07-11)

### [1.6.2-beta.3](https://github.com/persian-tools/persian-tools/compare/v1.6.2-beta.2...v1.6.2-beta.3) (2021-07-11)

### [1.6.2-beta.2](https://github.com/persian-tools/persian-tools/compare/v1.6.2-beta.1...v1.6.2-beta.2) (2021-07-11)

### [1.6.2-beta.1](https://github.com/persian-tools/persian-tools/compare/v1.6.2-beta.0...v1.6.2-beta.1) (2021-07-11)

### [1.6.2-beta.0](https://github.com/persian-tools/persian-tools/compare/v1.6.1...v1.6.2-beta.0) (2021-07-11)


### Features

* **numberToWords:** make it functional ([0eba53b](https://github.com/persian-tools/persian-tools/commit/0eba53b1097161db8168924d03f977c07e4bd70b))
* **Plate:** add details to Plate result ([#77](https://github.com/persian-tools/persian-tools/issues/77)) ([2ded9b3](https://github.com/persian-tools/persian-tools/commit/2ded9b32c2cee972593283d947effc1a855c8d63))
* **wordsToNumber:** make it functional ([6538d88](https://github.com/persian-tools/persian-tools/commit/6538d889868abe979d3f1aea9a136cff1d24efa1))


### Bug Fixes

* **phoneNumber:** getPhonePrefix utility not returning the correct value ([#93](https://github.com/persian-tools/persian-tools/issues/93)) ([2686b39](https://github.com/persian-tools/persian-tools/commit/2686b399e60621165fc5b07c72b744327611c204))

### 1.6.2-beta.5 (2021-07-11)

### 1.6.2-beta.4 (2021-07-11)

### 1.6.2-beta.3 (2021-07-11)

### 1.6.2-beta.2 (2021-07-11)

### 1.6.2-beta.1 (2021-07-11)

### 1.6.2-beta.0 (2021-07-11)

### [1.6.1](https://github.com/persian-tools/persian-tools/compare/v1.6.0-beta.7...v1.6.1) (2021-04-23)


### Bug Fixes

* husky issues ([8bcaebe](https://github.com/persian-tools/persian-tools/commit/8bcaebee66b8390cfb05bc7e946adcbacfe7015c))
* **#75:** package json cjs bundle file type ([3104abb](https://github.com/persian-tools/persian-tools/commit/3104abbb9426c0cef1ef6e954b106a209d25af7a)), closes [#75](https://github.com/persian-tools/persian-tools/issues/75)
* **numberToWords:** make it functional ([ce59bf4](https://github.com/persian-tools/persian-tools/commit/ce59bf4001411425a6b6f402ccefd4447995b75f))
* **wordsToNumber:** make it functional ([82b1b03](https://github.com/persian-tools/persian-tools/commit/82b1b03dec10dd96bd925f08cd8d306ac1014f4d))
* :bug: Correct Typo in pre-commit file ([2275d00](https://github.com/persian-tools/persian-tools/commit/2275d008416a76439f454eb390cf1cd28070250c))

## [1.6.0](https://github.com/persian-tools/persian-tools/compare/v1.6.0-beta.7...v1.6.0) (2021-04-22)

## [1.6.0-beta.7](https://github.com/persian-tools/persian-tools/compare/v1.6.0-beta.6...v1.6.0-beta.7) (2021-04-18)


### Features

* **digits:** add digitsEnToAr to convert English digits to Arabic ([ad95755](https://github.com/persian-tools/persian-tools/commit/ad9575552922fbce7aa518b720ce3aa93c2a990e))
* **wordsToNumber:** supports Arabic digits converter in result ([69b1cae](https://github.com/persian-tools/persian-tools/commit/69b1caea3c4e829ed7add13272315f09f3032b08))

## [1.6.0-beta.6](https://github.com/persian-tools/persian-tools/compare/v1.6.0-beta.4...v1.6.0-beta.6) (2021-04-18)


### Features

* **digitsEnToFa:** add error handling and clean up ([8a23631](https://github.com/persian-tools/persian-tools/commit/8a236317a2f45c7a393171d623f923ed4c0a4399))
* **digitsFaToEn:** add error handling ([ad2ebbf](https://github.com/persian-tools/persian-tools/commit/ad2ebbf23a92089b388df240d73b9c15ef1d3725))
* **halfSpace:** clean up and add error handling ([d305b96](https://github.com/persian-tools/persian-tools/commit/d305b96319a1ea3e5310cb385e1dfff74de92c2f))
* add Code of Conduct doc ([8c57c26](https://github.com/persian-tools/persian-tools/commit/8c57c26afc964f595f205cc746ad834e1deba1c4))
* Add numberplate module ([db1207e](https://github.com/persian-tools/persian-tools/commit/db1207e7f5abf5e19de85b2f24f79983bbdb7d38))
* add types for numberplate module ([9e73e7b](https://github.com/persian-tools/persian-tools/commit/9e73e7b5c9de6b40c75a475f4a4ab3ab703cd353))


### Bug Fixes

* **#70:** converting 0 to Persian digit returns undefined ([a21c69e](https://github.com/persian-tools/persian-tools/commit/a21c69eb6c1daca5ef840a9642149e8b9d5f3f84)), closes [#70](https://github.com/persian-tools/persian-tools/issues/70)
* **addCommas:** remove commas from decimal places ([9c360c3](https://github.com/persian-tools/persian-tools/commit/9c360c3cf4f2ac1b756ab1bbf17d4b4bb34a90e1))
* **addOrdinalSuffix:** add test ([e8f3b4e](https://github.com/persian-tools/persian-tools/commit/e8f3b4ebe9781eb08577bd137adbaf75aea3a112))
* **bundle:** modules exports for using in vite ([ec4e1d9](https://github.com/persian-tools/persian-tools/commit/ec4e1d91fa15063e157f009450ade73051347ec2))
* fix typescript issue and make more in  readable phoneNumber utils ([5fcde62](https://github.com/persian-tools/persian-tools/commit/5fcde624a2f49ed4d472a900771ed8982426b506))
* isPersian ([8341017](https://github.com/persian-tools/persian-tools/commit/83410178e5d9d245ebbb77d483727147a0df9f22))
* remove unnecessary import in phoneNumber details ([f34655b](https://github.com/persian-tools/persian-tools/commit/f34655bd8c3b5de87d2efaf043edaac04d86a6d8))
* update isPersian and hasPersian info in readme.md ([c4ee0a9](https://github.com/persian-tools/persian-tools/commit/c4ee0a93764e55a69176bc07ed9a2bd1ba0a5bf6))

## [1.6.0-beta.5](https://github.com/persian-tools/persian-tools/compare/v1.6.0-beta.4...v1.6.0-beta.5) (2021-03-28)


### Features

* **digitsEnToFa:** add error handling and clean up ([8a23631](https://github.com/persian-tools/persian-tools/commit/8a236317a2f45c7a393171d623f923ed4c0a4399))
* **digitsFaToEn:** add error handling ([ad2ebbf](https://github.com/persian-tools/persian-tools/commit/ad2ebbf23a92089b388df240d73b9c15ef1d3725))
* **halfSpace:** clean up and add error handling ([d305b96](https://github.com/persian-tools/persian-tools/commit/d305b96319a1ea3e5310cb385e1dfff74de92c2f))
* add Code of Conduct doc ([8c57c26](https://github.com/persian-tools/persian-tools/commit/8c57c26afc964f595f205cc746ad834e1deba1c4))
* Add numberplate module ([db1207e](https://github.com/persian-tools/persian-tools/commit/db1207e7f5abf5e19de85b2f24f79983bbdb7d38))
* add types for numberplate module ([9e73e7b](https://github.com/persian-tools/persian-tools/commit/9e73e7b5c9de6b40c75a475f4a4ab3ab703cd353))


### Bug Fixes

* **addCommas:** remove commas from decimal places ([9c360c3](https://github.com/persian-tools/persian-tools/commit/9c360c3cf4f2ac1b756ab1bbf17d4b4bb34a90e1))
* **addOrdinalSuffix:** add test ([e8f3b4e](https://github.com/persian-tools/persian-tools/commit/e8f3b4ebe9781eb08577bd137adbaf75aea3a112))
* **bundle:** modules exports for using in vite ([ec4e1d9](https://github.com/persian-tools/persian-tools/commit/ec4e1d91fa15063e157f009450ade73051347ec2))
* fix typescript issue and make more in  readable phoneNumber utils ([5fcde62](https://github.com/persian-tools/persian-tools/commit/5fcde624a2f49ed4d472a900771ed8982426b506))
* isPersian ([8341017](https://github.com/persian-tools/persian-tools/commit/83410178e5d9d245ebbb77d483727147a0df9f22))
* remove unnecessary import in phoneNumber details ([f34655b](https://github.com/persian-tools/persian-tools/commit/f34655bd8c3b5de87d2efaf043edaac04d86a6d8))
* update isPersian and hasPersian info in readme.md ([c4ee0a9](https://github.com/persian-tools/persian-tools/commit/c4ee0a93764e55a69176bc07ed9a2bd1ba0a5bf6))

## [1.6.0-beta.4](https://github.com/persian-tools/persian-tools/compare/v1.6.0-beta.3...v1.6.0-beta.4) (2021-02-27)


### Bug Fixes

* **CI:** Continuous Integration build command ([03aaf6f](https://github.com/persian-tools/persian-tools/commit/03aaf6f57cff985583374e2183874443c17b0895))

## [1.6.0-beta.3](https://github.com/persian-tools/persian-tools/compare/v1.6.0-beta.2...v1.6.0-beta.3) (2021-02-27)


### Bug Fixes

* **CI:** npm ignore build folder files ([c3992aa](https://github.com/persian-tools/persian-tools/commit/c3992aa97ca4288a873f115d013b12abb766dc4f))

## [1.6.0-beta.2](https://github.com/persian-tools/persian-tools/compare/v1.6.0-beta.1...v1.6.0-beta.2) (2021-02-27)


### Bug Fixes

* **CI:** npm ignore file ([c73163f](https://github.com/persian-tools/persian-tools/commit/c73163fd1c238965535544e79c7347db486a98c0))

## [1.6.0-beta.1](https://github.com/persian-tools/persian-tools/compare/v1.6.0-beta.0...v1.6.0-beta.1) (2021-02-27)


### Bug Fixes

* typedoc build ([bbc558f](https://github.com/persian-tools/persian-tools/commit/bbc558f3b4da07444ce05820a87e150483e08ca8))

## [1.6.0-beta.0](https://github.com/persian-tools/persian-tools/compare/v1.5.0...v1.6.0-beta.0) (2021-02-27)


### Features

* **CI:** add prerelease command ([1270719](https://github.com/persian-tools/persian-tools/commit/127071960d57192b2692ca92053519be4596d324))
* add isArabic module ([eb0e7e9](https://github.com/persian-tools/persian-tools/commit/eb0e7e9c414726280d1ddee873fd35e0bd973050))
* add microbundle for managing the build process ([bb38caf](https://github.com/persian-tools/persian-tools/commit/bb38caf91612f2aad68eec5d19707a4c92a62d39))


### Bug Fixes

* **CI:** npm install issue ([414c348](https://github.com/persian-tools/persian-tools/commit/414c34851c864ba003597a9ff673e5bda8d05b9c))
* **CI:** npm install issue ([2e531a3](https://github.com/persian-tools/persian-tools/commit/2e531a3aab6c1c5faf00505a100fb75e8ed32698))
* **CI:** remove size-limit hook after micro:build command ([e9ffc7c](https://github.com/persian-tools/persian-tools/commit/e9ffc7caec86f479d7af4e00e8e6c947ae94083b))
* **CI:** typescript version issue ([d4249e9](https://github.com/persian-tools/persian-tools/commit/d4249e9cc71e38144e93140ba54a7d437a3fb284))
* extractCardNumber issues ([a004717](https://github.com/persian-tools/persian-tools/commit/a004717b5f3da3b15012190c1a35b57db02830c7))
* extractCardNumber issues ([0ed553e](https://github.com/persian-tools/persian-tools/commit/0ed553eac77401f4e360c732eb94d59de75813db))
* isPersian (only Persian chars) ([0679af1](https://github.com/persian-tools/persian-tools/commit/0679af1857e6e60d430f8783a329e0c351ccef9e))
* isPersian module issues ([5ce89dd](https://github.com/persian-tools/persian-tools/commit/5ce89ddb60d9102f686b82d9f374c82f0dc2f413))
* jsdoc for isPersian ([2832574](https://github.com/persian-tools/persian-tools/commit/28325748aa27acd934012c1d5364e85f08b7a75e))

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
