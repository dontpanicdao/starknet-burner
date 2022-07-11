import argparse
import asyncio
from dotenv import load_dotenv
import os
import sys
# from pprint import pprint

from starkware.starknet.testing.starknet import Starknet
from starkware.starknet.services.api.gateway.gateway_client import GatewayClient
from services.external_api.client import RetryConfig
from starkware.starknet.services.api.gateway.transaction import (Deploy)
from starkware.starknet.definitions import constants
from starkware.starknet.services.api.contract_class import ContractClass

# We need that function to generate the public key of the account
sys.path.append("../argent-contracts-starknet/test")
from utils.Signer import Signer

parser = argparse.ArgumentParser(description='Details of the account deployment')
parser.add_argument('-priv', dest='private_key', type=str, help='Add the account private key')

"""
	parses the arguments and checks from the environment variables
	if they are not provided as arguments.
"""
def parse() -> dict:
	load_dotenv()
	args = parser.parse_args()
	if args.private_key:
		args.private_key = int(args.private_key, 16)
	elif os.getenv('SIGNER_PRIVATE_KEY'):
		args.private_key = int(os.environ['SIGNER_PRIVATE_KEY'], 16)
	else:
		raise Exception("private key missing")
	return args

"""
	prints an int as a hex string
"""
def print_hex(i: int):
	print("0x%x" % i)

def event_loop():
	return asyncio.new_event_loop()

"""
	gets a client for the goerli network
"""
def get_gateway_client() -> GatewayClient:
    gateway_url = "https://alpha4.starknet.io"
    retry_config = RetryConfig(n_retries=1)
    return GatewayClient(url=gateway_url, retry_config=retry_config)

async def deploy_account(salt: int) -> int:
	client = get_gateway_client()
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

if __name__ == '__main__':
	try:
		args = parse()
	except:
		parser.print_usage()
		exit(1)
	print("signer private key:   ", end = '')
	print_hex(args.private_key)
	account = asyncio.run(deploy_account(44))
	print("account key:  ", end = '')
	print_hex(account)
