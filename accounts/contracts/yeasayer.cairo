%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.math import assert_nn
from starkware.starknet.common.syscalls import get_tx_info

from openzeppelin.account.library import Account, AccountCallArray

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
    
    # parse the plugin data
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

    return()
end
