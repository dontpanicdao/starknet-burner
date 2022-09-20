
.EXPORT_ALL_VARIABLES:
CAIRO_PATH = ./cairo-contracts/src

.PHONY: compile
compile:
	starknet-compile --output=./starknet/account.json \
		--abi=./starknet/account_abi.json \
	  ./cairo-contracts/src/openzeppelin/account/presets/Account.cairo --account
