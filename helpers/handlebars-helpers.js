const moment = require('moment');
const translit = require('cyrillic-to-translit-js');


module.exports = {
    select: function (selected, options) {

        return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$&selected="selected"');

    },

    generateDate: function (date, format) {

        moment.locale('uk');

        return moment(date).format(format);

    },

    titleTranslit: function (title) {

        return translit({ preset: "uk" }).transform(title, '-');

    }
};