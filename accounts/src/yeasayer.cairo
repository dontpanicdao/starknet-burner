%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.math import assert_nn
from starkware.cairo.common.hash_state import (
    HashState,
    hash_finalize,
    hash_init,
    hash_update,
    hash_update_single,
)
from starkware.starknet.common.syscalls import get_tx_info, get_block_timestamp

from openzeppelin.account.library import Account, AccountCallArray

# H('StarkNetDomain(chainId:felt)')
const STARKNET_DOMAIN_TYPE_HASH = 0x13cda234a04d66db62c06b8e3ad5f91bd0c67286c2c7519a826cf49da6ba478
# H('Session(key:felt,expires:felt,root:merkletree)')
const SESSION_TYPE_HASH = 0x1aa0e1c56b45cf06a54534fa1707c54e520b842feb21d03b7deddb6f1e340c
# H(Policy(contractAddress:felt,selector:selector))
const POLICY_TYPE_HASH = 0x2f0026e78543f036f33e26a8f5891b88c58dc1e20cbbfaf0bb53274da6fa568

@contract_interface
namespace IAccount:
    func isValidSignature(hash: felt, sig_len: felt, sig: felt*):
    end
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
        call_array: AccountCallArray*,
        calldata_len: felt,
        calldata: felt*
    ):
    alloc_locals

    let (tx_info) = get_tx_info()

    with_attr error_message("invalid plugin data"):
        assert_nn(plugin_data_len - 4)
        let session_key = [plugin_data]
        let session_expires = [plugin_data + 1]
        let root = [plugin_data + 2]
        let proof_len = [plugin_data + 3]
        let proofs_len = proof_len * call_array_len
        let proofs = plugin_data + 4
        let session_token_len = plugin_data_len - 4 - proofs_len
        assert_nn(session_token_len)
        let session_token = plugin_data + 4 + proofs_len
    end

    # check if the session has expired
    with_attr error_message("session expired"):
        let (now) = get_block_timestamp()
        assert_nn(session_expires - now)
    end

   # check if the session is approved
   with_attr error_message("unauthorised session"):
       let (session_hash) = compute_session_hash(
           session_key, session_expires, root, tx_info.chain_id, tx_info.account_contract_address
       )
       IAccount.isValidSignature(
           contract_address=tx_info.account_contract_address,
           hash=session_hash,
           sig_len=session_token_len,
           sig=session_token,
       )
   end

#    // check if the session key is revoked
#    with_attr error_message("session key revoked") {
#        let (is_revoked) = SessionKey_revoked_keys.read(session_key);
#        assert is_revoked = 0;
#    }
#
#    // check if the tx is signed by the session key
#    with_attr error_message("session key signature invalid") {
#        verify_ecdsa_signature(
#            message=tx_info.transaction_hash,
#            public_key=session_key,
#            signature_r=tx_info.signature[0],
#            signature_s=tx_info.signature[1],
#        );
#    }
#
#    // check if the calls satisy the policies
#    with_attr error_message("not allowed by policy") {
#        check_policy(call_array_len, call_array, root, proof_len, proofs);
#    }

    return()
end

## tools

func compute_session_hash{pedersen_ptr: HashBuiltin*}(
    session_key: felt, session_expires: felt, root: felt, chain_id: felt, account: felt
) -> (hash: felt):
    alloc_locals
    let hash_ptr = pedersen_ptr
    with hash_ptr:
        let (hash_state) = hash_init()
        let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item='StarkNet Message')
        let (domain_hash) = hash_domain(chain_id)
        let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=domain_hash)
        let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=account)
        let (message_hash) = hash_message(session_key, session_expires, root)
        let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=message_hash)
        let (hash) = hash_finalize(hash_state_ptr=hash_state)
        let pedersen_ptr = hash_ptr
    end
    return (hash=hash)
end

func hash_domain{hash_ptr: HashBuiltin*}(chain_id: felt) -> (hash: felt):
    let (hash_state) = hash_init()
    let (hash_state) = hash_update_single(
        hash_state_ptr=hash_state, item=STARKNET_DOMAIN_TYPE_HASH
    )
    let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=chain_id)
    let (hash) = hash_finalize(hash_state_ptr=hash_state)
    return (hash=hash)
end

func hash_message{hash_ptr: HashBuiltin*}(session_key: felt, session_expires: felt, root: felt) -> (
    hash: felt
):
    let (hash_state) = hash_init()
    let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=SESSION_TYPE_HASH)
    let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=session_key)
    let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=session_expires)
    let (hash_state) = hash_update_single(hash_state_ptr=hash_state, item=root)
    let (hash) = hash_finalize(hash_state_ptr=hash_state)
    return (hash=hash)
end
