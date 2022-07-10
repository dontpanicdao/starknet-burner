import argparse
import os
from dotenv import load_dotenv

parser = argparse.ArgumentParser(description='Details of the account deployment')
parser.add_argument('-priv', dest='private_key', type=str, help='Add the account private key')

def parse() -> dict:
	load_dotenv()
	args = parser.parse_args()
	if args.private_key:
		args.private_key = int(args.private_key, 16)
		return args
	if os.environ['PRIVATE_KEY']:
		args.private_key = int(os.environ['PRIVATE_KEY'], 16)
	return args

def print_hex(i: int):
	print("0x%x" % i)

if __name__ == '__main__':
	args = parse()
	try:
		print(args.private_key)
	except:
		parser.print_usage()
		exit(1)

