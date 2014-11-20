var URLExtractor = {},
    marked = require('marked');

/**
 * @param {String} input
 * @param {URLExtractor.SOURCE_TYPE_MARKDOWN} sourceType
 */
URLExtractor.extract = function (input, sourceType) {
    var urls;

    if (!sourceType) {
        throw new Error('Must set source type.');
    } else if (sourceType == URLExtractor.SOURCE_TYPE_MARKDOWN) {
        urls = URLExtractor._fromMarkdown(input);
    } else {
        throw new Error('Unknown source type.');
    }

    return urls.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
};

/**
 * @param {String} input Markdown document.
 */
URLExtractor._fromMarkdown = function (input) {
    var renderer = new marked.Renderer(),
        urls = [];

    renderer.image = function (href) {
        urls.push(href);
    };

    renderer.link = function (href) {
        urls.push(href);
    };

    marked(input, {
        renderer: renderer
    })

    return urls;
};

URLExtractor.SOURCE_TYPE_MARKDOWN = 'markdown' + Math.random();

module.exports = URLExtractor;