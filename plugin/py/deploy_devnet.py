import argparse
import asyncio
from dotenv import load_dotenv
import os
import sys
sys.path.append("../argent-contracts-starknet/test")

from starkware.starknet.testing.starknet import Starknet
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
	elif os.getenv('SIGNER_PRIVATE_KEY'):
		args.private_key = int(os.environ['SIGNER_PRIVATE_KEY'], 16)
	else:
		raise Exception("private key missing")
	if args.guardian_key:
		args.guardian_key = int(args.guardian_key, 16)
	elif os.getenv('GUARDIAN_PRIVATE_KEY'):
		args.guardian_key = int(os.environ['GUARDIAN_PRIVATE_KEY'], 16)
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

async def account_factory(get_starknet: Starknet, private_key: int, guardian_key: int):
	cwd = os.getcwd()
	os.chdir("../argent-contracts-starknet")
	starknet = get_starknet
	account = await deploy(starknet, "contracts/ArgentAccount.cairo")
	signer = Signer(private_key)
	guardian = Signer(guardian_key)
	await account.initialize(signer.public_key, guardian.public_key).invoke()
	return account

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
	starknet = asyncio.run(Starknet.empty())
	account = asyncio.run(account_factory(starknet, args.private_key, args.guardian_key))
	print("account key:  ", end = '')
	print_hex(account.contract_address)
