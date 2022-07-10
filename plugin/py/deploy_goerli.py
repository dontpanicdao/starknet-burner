import argparse
import asyncio
from dotenv import load_dotenv
import os
import sys
from pprint import pprint
sys.path.append("../argent-contracts-starknet/test")

from starkware.starknet.testing.starknet import Starknet
from starkware.starknet.services.api.gateway.gateway_client import GatewayClient
from services.external_api.client import RetryConfig
from starkware.starknet.services.api.gateway.transaction import (Deploy)
from starkware.starknet.definitions import constants
from starkware.starknet.services.api.contract_class import ContractClass

from utils.Signer import Signer
from utils.utilities import deploy

parser = argparse.ArgumentParser(description='Details of the account deployment')
parser.add_argument('-priv', dest='private_key', type=str, help='Add the account private key')
parser.add_argument('-guard', dest='guardian_key', type=str, help='Add the account guardian key')

"""
	parses the arguments and checks from the environment variables
	if they are not provided as arguments.
"""
def parse() -> dict:
	load_dotenv()
	args = parser.parse_args()
	if args.private_key:
		args.private_key = int(args.private_key, 16)
	elif os.getenv('PRIVATE_KEY'):
		args.private_key = int(os.environ['PRIVATE_KEY'], 16)
	else:
		raise Exception("private key missing")
	if args.guardian_key:
		args.guardian_key = int(args.guardian_key, 16)
	elif os.getenv('GUARDIAN_KEY'):
		args.guardian_key = int(os.environ['GUARDIAN_KEY'], 16)
	else:
		raise Exception("guardian key missing")
	return args

"""
	prints an int as a hex string
"""
def print_hex(i: int):
	print("0x%x" % i)

def event_loop():
	return asyncio.new_event_loop()

def get_gateway_client() -> GatewayClient:
    gateway_url = "https://alpha4.starknet.io"
    retry_config = RetryConfig(n_retries=1)
    return GatewayClient(url=gateway_url, retry_config=retry_config)

async def account_factory(private_key: int, guardian_key: int) -> int:
	client = get_gateway_client()
	salt = 1
	contract_class = ContractClass.loads(data=open("../contracts/argentaccount.json", "r").read())
	tx = Deploy(
		contract_address_salt=salt,
		contract_definition=contract_class,
		constructor_calldata=[],
		version=constants.TRANSACTION_VERSION,
		)
	contract = await client.add_transaction(tx=tx)
	contract_address = int(contract["address"], 16)
	return contract_address

# 	client
# 	starknet = get_starknet
# 	account = await deploy(starknet, "contracts/ArgentAccount.cairo")
# 	signer = Signer(private_key)
# 	guardian = Signer(guardian_key)
# 	await account.initialize(signer.public_key, guardian.public_key).invoke()
# 	return account

if __name__ == '__main__':
	try:
		args = parse()
	except:
		parser.print_usage()
		exit(1)
	print("private key:  ", end = '')
	print_hex(args.private_key)
	print("guardian key: ", end = '')
	print_hex(args.guardian_key)
	account = asyncio.run(account_factory(args.private_key, args.guardian_key))
	print("account key:  ", end = '')
	print_hex(account)
