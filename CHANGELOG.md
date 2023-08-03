# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/compare/v1.1.0...v1.2.0) (2023-08-03)


### Features

* added coverage report ([b4bb12f](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/b4bb12f6c27891ca0928bc7a051f2f2c292b431c))
* added HttpStatus object to standarize HTTP status codes ([718cf29](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/718cf29fa76a74a5d028486a7ffe2f99f2611302))
* added HttpStatuses constants to controller ([9218716](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/921871615e969d1f2f0329f97e7b53872e0b5488))
* added test in build process ([e704291](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/e704291f11537ea198808ae83c0254d030f54057))
* added testing to good project coverage ([450b86d](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/450b86d359dbf2fc929f527a26b20e91658e0c0f))
* added testing to good project coverage ([ef17efa](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/ef17efa2a55503347c736426ef25d68c6316a70f))
* modified server build to be more friendly with async startups ([ff84684](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/ff84684e1d20bde699897acc1ee05804dc5078e3))


### Bug Fixes

* added base controller to ensure returned domain objects dont expose sensible datas ([72cf140](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/72cf1404355977dfbe57694ba529837d1c494392))
* added toJSON method to entities to control properties visibility on serilization ([8a1e1dd](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/8a1e1dd96fad8eb20bd2f5749d16c91d59e6eac6))
* modified code to ensure single responsability principle ([4b25d6f](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/4b25d6fe3f3a0ab4eaa2ac36a0275198d827eb05))
* modified feeds controller and server builder to more testable app ([90cbb87](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/90cbb87af0e6fc1573320c884f06e7f7da1c33fe))

## 1.1.0 (2023-08-02)


### Features

* added base repository ([8c5b572](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/8c5b572c57174075265c09fda5a38bce41b94f1f))
* added bbdd datasource ([f4b8bf6](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/f4b8bf6dd3cf4a16623a8b871480fbed3e00b58a))
* added config and log services and interfaces ([ae10e0a](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/ae10e0ac0d7a2d1faf0a11d679bf4ac3348aa14c))
* added container builder for abstraction of container build ([d8c6896](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/d8c689649bf220f4f4e68d931bf6f75a1a317ace))
* added controller action to get news by feed ([f926938](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/f92693807cf48ed5fcec97af5e3fadb275593850))
* added feed abstration. Added dtos to perform validations of post and update actions ([141142b](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/141142b57639aa144a2bf9ee32f8ea33cdaba83e))
* added feed mapper, domain port, mongo repo and schemas and modified module to load related services ([82b6574](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/82b657442d63464d97c6e3d2a879e49fa550a979))
* added feed module and controller ([ed8ee26](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/ed8ee26fad9a7d1d6bbe3f37916dd3d115256a19))
* added feed read command ([2c54230](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/2c542306c302fdd0b2a462997ed8a4cb714b79c0))
* added feed reader and integrated with feeds domain model ([4232dd7](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/4232dd78d36a8a2c6b7f1a3e3354d1c524c71359))
* added generic mapper interface ([186effe](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/186effe50fe67e83d33613b206e688eef3de9917))
* added migrations service to manage migrations with mongodb-migrations ([fd07578](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/fd075784f5b66596474fb10f21b492966a3019da))
* added module loader and interface to perform load of modules of project ([d69ab80](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/d69ab80d52c184802b4275c8fac2d8d290f913b6))
* added news module ([f3ca1d3](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/f3ca1d3fbbab92847dea0e525a3d3ff6d72ed09b))
* added server builder for abstration of server construction ([db86fb7](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/db86fb70ccfe22ed42816fa89b1fee2a0048f2b4))
* added use case interface to cqrs actions ([bcc58b0](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/bcc58b0f6e19d4087b1fc2e2f0e4004e0ab411a6))
* fixed news and feds modules to integrate correctly with puppeter and domain entities ([d05c396](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/d05c3960896314eebaafa29a290121941c3ec7e1))
* Modified BaseRepository and mapper interface to use Entity, DomainModel and Schema ([1b69cf7](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/1b69cf735e81ec6e642b296a2e092f0cd10a65db))
* modified bootstrap code. Added abstraction to commands ([f744890](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/f7448900a97ad23fdfd3f3fc628fe216ea697488))
* Modified bootstrap to use logger service ([5a1e811](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/5a1e811c2588a2342debcf40dd7159a20cbe981a))
* modified datasource and common module to autoconnect and handle async connection ([27c6692](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/27c6692878fbeb89a109a2c538a50e906ff050f5))


### Bug Fixes

* modified write commands and dto to use new property selectors ([5ac2b70](https://github.com/alberto-leon-crespo/dailytrends-frameworkless/commit/5ac2b708cd8c01bc1f18e9361f4de7f25e9b8238))
