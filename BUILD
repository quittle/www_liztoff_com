# Copyright (c) 2018 Dustin Toff

load("@rules_web//html:html.bzl",
    "html_page",
    "minify_html",
    "validate_html",
)

load("@rules_web//images:images.bzl",
    "favicon_image_generator",
    # "minify_png",
)

load("@rules_web//site_zip:site_zip.bzl",
    "generate_zip_server_python_file",
    "rename_zip_paths",
    "zip_server",
    "zip_site",
)

load("@rules_web//deploy:deploy.bzl",
    "deploy_site_zip_s3_script",
)

# favicon_sizes = depset([
#     # Powers of 2
#     16, 32, 64, 128, 256,
#     # Old iOS home screen
#     57,
#     # IE 11 tile
#     70, 15, 310,
#     # iPad home screen
#     76,
#     # Google TV
#     96,
#     # iOS retina touch
#     120,
#     # Chrome Web Store
#     128,
#     # IE 10 Metro tile
#     144,
#     # Apple touch
#     152,
#     # iPhone 6 Plus
#     180,
#     # Chrome for Android
#     196,
#     # Opera Coast
#     228,
#     # Medium Windows 8 Start Screen
#     270,
#     # Because it's the largest size I have
#     310,
# ])
# favicon_images = [ "favicon/{size}.png".format(size = size) for size in favicon_sizes ]

html_page(
    name = "index",
    config = "//:index.json",
    body = "//:index_body.html",
    css_files = [
        "//sass:all_css",
    ],
    # favicon_images = favicon_images,
    # favicon_sizes = favicon_sizes,
)

minify_html(
    name = "index_min",
    src = ":index",
)
validate_html(
    name = "validate_html",
    src = ":index",
)

# minify_png(
#     name = "min_favicon",
#     png = ":favicon.png",
# )

# favicon_image_generator(
#     name = "favicon",
#     output_files = favicon_images,
#     output_sizes = favicon_sizes,
#     image = ":min_favicon",
# )

zip_site(
    name = "www_liztoff_com",
    root_files = [
        # ":min_favicon",
        ":index_min",
    ],
    out_zip = "www_liztoff_com.zip",
)

rename_zip_paths(
    name = "rename_index_www_liztoff_com_zip",
    source_zip = ":www_liztoff_com",
    path_map = {
        # ":min_favicon": "favicon.png",
        ":index_min": "index.html",
    },
)

alias(
    name = "final_www_liztoff_com_zip",
    actual = ":rename_index_www_liztoff_com_zip",
)

zip_server(
    name = "zip_server",
    zip = ":final_www_liztoff_com_zip",
    port = 8080,
)

[
    deploy_site_zip_s3_script(
        name = "deploy_{site}".format(site=bucket),
        bucket = bucket,
        zip_file = ":final_www_liztoff_com_zip",
    )

    for bucket in [ "www.liztoff.com" ]
]