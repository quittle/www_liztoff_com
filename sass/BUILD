# Copyright (c) 2018 Dustin Toff

load("@io_bazel_rules_sass//sass:sass.bzl",
    "sass_binary",
    "sass_library",
)

sass_library(
    name = "all_scss_files",
    srcs = glob([
        "*.scss",
    ]),
)

sass_binary(
    name = "all_css",
    src = "all.scss",
    deps = [
        ":all_scss_files",
    ],
    visibility = [ "//visibility:public" ],
)