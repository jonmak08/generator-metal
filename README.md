# Metal.js Generator

[![Build Status](http://img.shields.io/travis/liferay/generator-metal/master.svg?style=flat)](https://travis-ci.org/liferay/generator-metal)
[![Dependency Status](http://img.shields.io/david/liferay/generator-metal.svg?style=flat)](https://david-dm.org/liferay/generator-metal)
[![NPM version](http://img.shields.io/npm/v/generator-metal.svg?style=flat)](http://npmjs.org/generator-metal)
[![NPM downloads](http://img.shields.io/npm/dm/generator-metal.svg?style=flat)](http://npmjs.org/generator-metal)

> A Yeoman Generator that scaffolds a [Metal.js](https://github.com/liferay/metal) component or project.

## Install

First, install [Yeoman](http://yeoman.io/) from [npm](https://www.npmjs.org/):

```sh
[sudo] npm install -g yo
```

Then, install this generator:

```sh
[sudo] npm install -g generator-metal
```

## Getting Started

There are two different generators available.

* The first one used to scaffold out new **individual components**:

    ```sh
yo metal
    ```

    ```
[?] How do you want to name this component?
    ```

    Which will generate the following file:

    ```
.
├── src/.jshintrc
├── src/MyComponent.js
├── src/MyComponent.soy
├── test/.jshintrc
└── test/MyComponent.js
    ```

* The second one is used to scaffold an **entire project**:

    ```sh
yo metal:repo
    ```

    ```
[?] How do you want to name this component?
[?] What's the GitHub repository name?
[?] What's the GitHub username?
[?] How would you describe this project?
    ```

    Which will generate the following project structure:

    ```
.
├── examples/index.html
├── src/.jshintrc
├── src/MyComponent.js
├── src/MyComponent.soy
├── test/.jshintrc
├── test/MyComponent.js
├── .editorconfig
├── .gitignore
├── bower.json
├── package.json
├── gulpfile.js
├── karma.conf.js
└── README.md
    ```

    After that, it will run `bower install` & `npm install` to fetch all dependencies. Then, it will run `gulp build` which generates a `build` folder for you.

> _**Note**: files will be generated in the current directory, so be sure to change to a new directory before running those commands if you don't want to overwrite existing files._

## Development

Install [Gulp](http://gulpjs.com/):

```sh
[sudo] npm install -g gulp
```

Fetch local dependencies:

```sh
npm install
```

Watch ES6 compilation:

```sh
gulp
```

## History

For detailed changelog, see [Releases](https://github.com/liferay/generator-metal/releases).

## License

[BSD License](http://opensource.org/licenses/BSD-2-Clause) © Liferay, Inc.
