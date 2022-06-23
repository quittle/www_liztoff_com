exports.IMAGE_REGEX = /i(mages)?\/.+\.(png|svg|jpg|jpeg|gif)$/i;
exports.FONT_REGEX = /f(onts)?\/.+\.(eot|ttf|woff|woff2|svg)$/i;
exports.SASS_REGEX = /\.s[ac]ss$/i;

exports.SMALL_ICONS = Object.freeze({
    android: false,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: false,
});
exports.LARGE_ICONS = Object.freeze(
    Object.fromEntries(Object.entries(exports.SMALL_ICONS).map(([key, value]) => [key, !value]))
);
