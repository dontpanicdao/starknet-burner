%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.signature import verify_ecdsa_signature
from starkware.cairo.common.hash_state import (
    HashState, hash_finalize, hash_init, hash_update, hash_update_single)
from starkware.cairo.common.registers import get_fp_and_pc
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import assert_not_zero, assert_nn
from starkware.starknet.common.syscalls import (
    call_contract, get_tx_info, get_contract_address, get_caller_address, get_block_timestamp
)

# 'StarkNet Message'
const STARKNET_MESSAGE_SHORT = 0x537461726b4e6574204d657373616765

# H('StarkNetDomain(name:felt,version:felt,chainId:felt)')
const STARKNET_DOMAIN_TYPE_HASH = 0x1bfc207425a47a5dfa1a50a4f5241203f50624ca5fdf5e18755765416b8e288
# 'burner.starknet'
const STARKNET_DOMAIN_NAME = 0x6275726e65722e737461726b6e6574
# '0.4'
const STARKNET_DOMAIN_VERSION = 0x302e34
# 'SN_GOERLI'
const STARKNET_DOMAIN_CHAIN_ID = 0x534e5f474f45524c49

# H('Session(session_key:felt,expires:felt)')
const SESSION_TYPE_HASH = 0xd29dfb257cbbbe90eb690ba4078aba271358aa4d83c3570d084e0aa04c4338

# takes StarkNetDomain and returns its struct_hash
func hashDomain{hash_ptr : HashBuiltin*}() -> (hash : felt):
    let (hash_state : HashState*) = hash_init()
    let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=STARKNET_DOMAIN_TYPE_HASH)
    let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=STARKNET_DOMAIN_NAME)
    let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=STARKNET_DOMAIN_VERSION)
    let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=STARKNET_DOMAIN_CHAIN_ID)
    let (hash : felt) = hash_finalize(hash_state_ptr=hash_state)
    return (hash=hash)
end

# takes SessionKey and returns its struct_hash
func hashSessionKey{hash_ptr : HashBuiltin*}(session_key: felt, expires: felt) -> (hash : felt):
    let (hash_state : HashState*) = hash_init()
    let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=SESSION_TYPE_HASH)
    let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=session_key)
    let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=expires)
    let (hash : felt) = hash_finalize(hash_state_ptr=hash_state)
    return (hash=hash)
end

@contract_interface
namespace IAccount:
    func is_valid_signature(hash: felt, sig_len: felt, sig: felt*):
    end
end

struct CallArray:
    member to: felt
    member selector: felt
    member data_offset: felt
    member data_len: felt
end

@external
func validate{
        syscall_ptr: felt*,
        pedersen_ptr: HashBuiltin*,
        ecdsa_ptr: SignatureBuiltin*,
        range_check_ptr
    } (
        plugin_data_len: felt,
        plugin_data: felt*,
        call_array_len: felt,
        call_array: CallArray*,
        calldata_len: felt,
        calldata: felt*
    ):
    alloc_locals
    
    # get the tx info
    let (tx_info) = get_tx_info()

    # check is the session has expired
    let session_expires = [plugin_data + 1]
    with_attr error_message("session expired"):
        let (now) = get_block_timestamp()
        assert_nn(session_expires - now)
    end
    # check if the session is approved
    let session_key = [plugin_data]
    let (hash) = compute_hash(tx_info.account_contract_address, session_key, session_expires)
    with_attr error_message("unauthorised session"):
        IAccount.is_valid_signature(
            contract_address=tx_info.account_contract_address,
            hash=hash,
            sig_len=plugin_data_len - 2,
            sig=plugin_data + 2
        )
    end
    # check if the tx is signed by the session key
    with_attr error_message("session key signature invalid"):
        verify_ecdsa_signature(
            message=tx_info.transaction_hash,
            public_key=session_key,
            signature_r=tx_info.signature[0],
            signature_s=tx_info.signature[1]
        )
    end
    return()
end

@view
func compute_hash{pedersen_ptr: HashBuiltin*}(account: felt, session_key: felt, expires: felt) -> (hash : felt):
    let hash_ptr = pedersen_ptr
    with hash_ptr:
        let (hash_state_ptr) = hash_init()
        let (hash_state_ptr) = hash_update_single(hash_state_ptr=hash_state_ptr, item=STARKNET_MESSAGE_SHORT)
        let (hashDomainHash: felt) = hashDomain()
        let (hash_state_ptr) = hash_update_single(hash_state_ptr=hash_state_ptr, item=hashDomainHash)
        let (hash_state_ptr) = hash_update_single(hash_state_ptr=hash_state_ptr, item=account)
        let (hashSessionHash: felt) = hashSessionKey(session_key=session_key, expires=expires)
        let (hash_state_ptr) = hash_update_single(hash_state_ptr=hash_state_ptr, item=hashSessionHash)
        let (res) = hash_finalize(hash_state_ptr)
        let pedersen_ptr = hash_ptr
    end
    return (hash=res)
end
