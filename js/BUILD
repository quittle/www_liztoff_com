# Copyright (c) 2018 Dustin Toff

load("@rules_web//js:js.bzl",
    "closure_compile",
)

closure_compile(
    name = "all_js",
    srcs = glob(["*.js"]),
    visibility = [ "//visibility:public" ],
)
