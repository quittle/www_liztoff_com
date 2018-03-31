# Copyright (c) 2018 Dustin Toff

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
    commit = "0d3ee91c6dbb1d288202fb7a589c75a256a1e693",
    sha256 = "b6fbb0c35387422c4127a1acb508cb16ba747d95352fce644a276fcf7a4d3f6d",
)

load("@rules_web//:rules_web_repositories.bzl", "rules_web_repositories")
rules_web_repositories()

load("@bazel_toolbox//:bazel_toolbox_repositories.bzl", "bazel_toolbox_repositories")
bazel_toolbox_repositories()

load("@io_bazel_rules_sass//sass:sass.bzl", "sass_repositories")
sass_repositories()