
.EXPORT_ALL_VARIABLES:
CAIRO_PATH = ./cairo-contracts/src:./src

.PHONY: build
build: syncopenzeppelinv0 artifacts/account.json artifacts/counter.json artifacts/yeasayer.json artifacts/proxy.json

artifacts/account.json: src/account.cairo artifacts
	starknet-compile src/account.cairo \
		--output artifacts/account.json \
		--abi artifacts/account_abi.json --account_contract || \
		rm -f artifacts/account.json

artifacts/counter.json: src/counter.cairo artifacts
	starknet-compile src/counter.cairo \
		--output artifacts/counter.json \
		--abi artifacts/counter_abi.json || \
		rm -f artifacts/counter.json

artifacts/yeasayer.json: src/yeasayer.cairo artifacts
	starknet-compile src/yeasayer.cairo \
		--output artifacts/yeasayer.json \
		--abi artifacts/yeasayer_abi.json || \
		rm -f artifacts/yeasayer.json

artifacts/proxy.json: artifacts
		starknet-compile src/proxy.cairo \
			--output artifacts/proxy.json \
			--abi artifacts/proxy_abi.json || \
			rm -f artifacts/proxy.json

.PHONY: openzeppelinv0
openzeppelinv0: artifacts/account_v0.3.2.json artifacts/erc20.json

artifacts/account_v0.3.2.json: artifacts syncopenzeppelinv0
	cd cairo-contracts/src && \
		starknet-compile ./openzeppelin/account/presets/Account.cairo \
			--output ../../artifacts/account_v0.3.2.json \
			--abi ../../artifacts/account_v0.3.2_abi.json --account_contract || \
			rm -f ../../artifactsaccount_v0.3.2.json

artifacts/erc20.json: artifacts syncopenzeppelinv0
	cd cairo-contracts/src && \
		starknet-compile ./openzeppelin/token/erc20/presets/ERC20.cairo \
			--output ../../artifacts/erc20.json \
			--abi ../../artifacts/erc20_abi.json || \
			rm -f ../../artifacts/erc20.json

.PHONY: openzeppelinv1
openzeppelinv1: artifacts/account_v0.4.0b.json

artifacts/account_v0.4.0b.json: artifacts syncopenzeppelinv1
	cd cairo-contracts/src && \
		starknet-compile ./openzeppelin/account/presets/Account.cairo \
			--output ../../artifacts/account_v0.4.0b.json \
			--abi ../../artifacts/account_v0.4.0b_abi.json --account_contract || \
			rm -f ../../artifacts/account_v0.4.0b.json

.PHONY: syncopenzeppelinv0
syncopenzeppelinv0:
	cd cairo-contracts && git pull && \
		git reset --hard 789ea11085a178960ce62a774157b6a4f0b85d7f

.PHONY: syncopenzeppelinv1
syncopenzeppelinv1: 
	cd cairo-contracts && git pull && \
		git reset --hard f22441bd816633d028f515839b8d66c785a941d8

.PHONY: argent
argent: artifacts/sessionkey_3fc70024.json

artifacts/sessionkey_3fc70024.json: syncargent artifacts
	cd ../../3fc70024 && starknet-compile ./contracts/plugins/SessionKey.cairo \
		--output ../starknet-burner/accounts/artifacts/sessionkey_3fc70024.json \
		--abi ../starknet-burner/accounts/artifacts/sessionkey_3fc70024_abi.json

.PHONY: syncargent
syncargent: cleanargent
	cd ../.. && git clone git@github.com:argentlabs/argent-contracts-starknet.git 3fc70024 && \
		cd 3fc70024 && git reset --hard a98731015b0f5be7071084da0459f95e0ef2ef43

artifacts:
	mkdir -p artifacts

.PHONY: cleanargent
cleanargent:
	rm -rf ../../3fc70024
