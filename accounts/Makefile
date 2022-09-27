
.EXPORT_ALL_VARIABLES:
CAIRO_PATH = ./cairo-contracts/src

.PHONY: build
build: artifacts openzeppelin-v0
	mkdir -p artifacts
	starknet-compile ./contracts/account.cairo \
		--output artifacts/account.json \
		--abi artifacts/account_abi.json --account_contract
	starknet-compile ./contracts/counter.cairo \
		--output artifacts/counter.json \
		--abi artifacts/counter_abi.json
	starknet-compile ./contracts/yeasayer.cairo \
		--output artifacts/yeasayer.json \
		--abi artifacts/yeasayer_abi.json

.PHONY: openzeppelin-v0
openzeppelin-v0: artifacts
	cd cairo-contracts && git pull && \
		git reset --hard 789ea11085a178960ce62a774157b6a4f0b85d7f

.PHONY: openzeppelin-v1
openzeppelin-v1: artifacts
	cd cairo-contracts && git pull && \
		git reset --hard f22441bd816633d028f515839b8d66c785a941d8

.PHONY: contracts-v0
contracts-v0: artifacts openzeppelin-v0
	cd cairo-contracts/src && \
		starknet-compile ./openzeppelin/token/erc20/presets/ERC20.cairo \
			--output ../../artifacts/erc20.json \
			--abi ../../artifacts/erc20_abi.json && \
		starknet-compile ./openzeppelin/account/presets/Account.cairo \
			--output ../../artifacts/account_v0.3.2.json \
			--abi ../../artifacts/account_v0.3.2_abi.json --account_contract

.PHONY: contracts-v1
contracts-v1: artifacts openzeppelin-v1
	cd cairo-contracts/src && \
		starknet-compile ./openzeppelin/account/presets/Account.cairo \
			--output ../../artifacts/account_v0.4.0b.json \
			--abi ../../artifacts/account_v0.4.0b_abi.json --account_contract

.PHONY: argent
argent: artifacts clean
	cd ../.. && git clone git@github.com:argentlabs/argent-contracts-starknet.git 3fc70024 && \
		cd 3fc70024 && git reset --hard a98731015b0f5be7071084da0459f95e0ef2ef43
	cd ../../3fc70024 && starknet-compile ./contracts/plugins/SessionKey.cairo \
		--output ../starknet-burner/accounts/artifacts/sessionkey_3fc70024.json \
		--abi ../starknet-burner/accounts/artifacts/sessionkey_3fc70024_abi.json

artifacts:
	mkdir -p artifacts

.PHONY: clean
clean:
	rm -rf ../../3fc70024
