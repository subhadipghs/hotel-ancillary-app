#!/bin/bash

set -e

# generate the private key
openssl genrsa -out ../certs/private.pem 3072

# generate the public key from the private key
openssl rsa -in ../certs/private.pem -pubout -out ../certs/public.pem
