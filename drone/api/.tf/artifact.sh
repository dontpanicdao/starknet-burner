#!/usr/bin/env bash

set -e

version() {
    git log -1 --pretty=%h ..
}

echo '{"version": "'$(version)'"}'
