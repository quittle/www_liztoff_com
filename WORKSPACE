# Copyright (c) 2018 Dustin Toff
# Licensed under Apache License v2.0

workspace(name = "www_dustindoloff_com")

git_repository(
    name = "bazel_repository_toolbox",
    remote = "https://github.com/quittle/bazel_repository_toolbox.git",
    commit = "8f9a64e3782908571053daad5fb9053b022d040f",
)

load("@bazel_repository_toolbox//:github_repository.bzl", "github_repository")

github_repository(
    name = "rules_web",
    user = "quittle",
    project = "rules_web",
    commit = "a9832ebe706c478a217dac8160160adde5902be2",
    sha256 = "ea1dd568567e2ca090667b28e33a75b5edc7ad2051e35755a696f0a1a59dd903",
)

load("@rules_web//:rules_web_repositories.bzl", "rules_web_repositories")
rules_web_repositories()

load("@bazel_toolbox//:bazel_toolbox_repositories.bzl", "bazel_toolbox_repositories")
bazel_toolbox_repositories()

load("@io_bazel_rules_sass//sass:sass.bzl", "sass_repositories")
sass_repositories()