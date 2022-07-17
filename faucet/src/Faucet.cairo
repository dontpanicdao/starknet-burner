%lang starknet

from starkware.starknet.common.syscalls import (get_caller_address)
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math_cmp import is_nn
from starkware.cairo.common.uint256 import (Uint256, uint256_lt)
from openzeppelin.token.erc20.interfaces.IERC20 import IERC20

# STRK Contract Address and Account Class
const STRK_CONTRACT_ADDRESS=0x7a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb
const ACCOUNT_CLASS_HASH=0x443e7c09ffda6b7cf5fe88fb18eb0a78d285db8ef8277c3918326d476c73efa

@contract_interface
namespace IUpgradableContract:
    func get_implementation() -> (implementation: felt):
    end
end

@external
func withdraw{
    syscall_ptr : felt*,
    pedersen_ptr : HashBuiltin*,
    range_check_ptr,
}():
    alloc_locals
    let (caller) = get_caller_address()

    # check the implementation matches the class with plugins
    let (_, matches) = implementation(caller)
    with_attr error_message("account should support plugins"):
        assert matches = 1
    end
    # check the caller account is almost empty
    let (balance) = balanceOf(caller)
    let (limit_reached) = uint256_lt(balance, Uint256(low=2, high=0))
    with_attr error_message("account should be empty"):
        assert limit_reached = 1
    end

    # transfer the funds to the caller account
    IERC20.transfer(
        contract_address=STRK_CONTRACT_ADDRESS,
        recipient=caller,
        amount=Uint256(low=5, high=0))
    return()
end

@view
func implementation{
    syscall_ptr : felt*,
    pedersen_ptr : HashBuiltin*,
    range_check_ptr,
}(account: felt) -> (implementation: felt, matches: felt):
    let (implementation) = IUpgradableContract.get_implementation(contract_address=account)
    if implementation == ACCOUNT_CLASS_HASH:
        return (implementation, 1)
    end
    return (implementation, 0)
end

@view
func balanceOf{
    syscall_ptr : felt*,
    pedersen_ptr : HashBuiltin*,
    range_check_ptr,
}(account: felt) -> (balance : Uint256):
    let (balance) = IERC20.balanceOf(
        contract_address=STRK_CONTRACT_ADDRESS,
        account=account)
    return (balance)
end
