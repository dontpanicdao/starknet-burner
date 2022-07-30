#!/usr/bin/env bash

set -e

version() {
    gally list -p $1 | jq -r '.[0].version'
}

echo '{"version": "'$(version api)'"}'
