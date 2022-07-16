%lang starknet

from starkware.starknet.common.syscalls import (get_block_timestamp, get_contract_address, get_caller_address)
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math_cmp import is_nn
from starkware.cairo.common.uint256 import (Uint256, uint256_lt, uint256_sub, uint256_add)
from openzeppelin.token.erc20.interfaces.IERC20 import IERC20

@storage_var
func _pending_time() -> (first_time: felt):
end

@storage_var
func _pending_supply() -> (low: felt):
end

# STRK Contract Address and Account Class
const STRK_CONTRACT_ADDRESS=0x7a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb
const ACCOUNT_CLASS_HASH=0x443e7c09ffda6b7cf5fe88fb18eb0a78d285db8ef8277c3918326d476c73efa

# STRK to distribute per call
const STRK_TOKEN_TO_DISTRIBUTE=10
const MAX_STRK_TOKEN_OVER_PERIOD=100
const MAX_STRK_TOKEN_IN_CONTRACT=2
const ONE_HOUR=3600

@contract_interface
namespace IUpgradableContract:
    func get_implementation() -> (implementation: felt):
    end
end

@external
func starkpiller{
    syscall_ptr : felt*,
    pedersen_ptr : HashBuiltin*,
    range_check_ptr,
}():

    alloc_locals
    tempvar pedersen_ptr = pedersen_ptr
    let (block_timestamp) = get_block_timestamp()
    let (first_time) = _pending_time.read()
    let (total) = _pending_supply.read()

    let (limit_not_reached) = uint256_lt(Uint256(low=total, high=0), Uint256(low=MAX_STRK_TOKEN_OVER_PERIOD, high=0))
    let (new_total, carry) = uint256_add(Uint256(low=total, high=0), Uint256(low=STRK_TOKEN_TO_DISTRIBUTE, high=0))
    let (remaining_time) = is_nn(first_time + 3600 - block_timestamp)
    tempvar pedersen_ptr = pedersen_ptr
    let write_token = STRK_TOKEN_TO_DISTRIBUTE
    let write_time = first_time
    if remaining_time == 1:
        with_attr error_message("faucet reach limit"):
            assert limit_not_reached = 1
        end
        with_attr error_message("carry should be 0"):
            assert carry = 0
        end
        write_token = new_total.low
        tempvar syscall_ptr = syscall_ptr
        tempvar range_check_ptr = range_check_ptr
    else:
        write_time = block_timestamp
        tempvar syscall_ptr = syscall_ptr
        tempvar range_check_ptr = range_check_ptr
    end
    _pending_time.write(write_time)
    _pending_supply.write(write_token)

    # Check the account supports plugins
    let (caller) = get_caller_address()
    let (implementation) = IUpgradableContract.get_implementation(contract_address=caller)
    with_attr error_message("account should support plugins"):
        assert implementation = ACCOUNT_CLASS_HASH
    end

    # Check the account does not already have STRK tokens
    let (remaining) = IERC20.balanceOf(
        contract_address=STRK_CONTRACT_ADDRESS,
        account=caller)
    let (limit_not_reached) = uint256_lt(remaining, Uint256(low=MAX_STRK_TOKEN_IN_CONTRACT, high=0))
    with_attr error_message("account limit reached"):
        assert limit_not_reached = 1
    end

    # Send tokens to the account
    IERC20.transfer(
        contract_address=STRK_CONTRACT_ADDRESS,
        recipient=caller,
        amount=Uint256(low=STRK_TOKEN_TO_DISTRIBUTE, high=0))
    return()
end

@view
func totalSupply{
    syscall_ptr : felt*,
    pedersen_ptr : HashBuiltin*,
    range_check_ptr,
}() -> (balance : Uint256):
    let (self) = get_contract_address()
    let (balance) = IERC20.balanceOf(
        contract_address=STRK_CONTRACT_ADDRESS,
        account=self)
    return (balance)
end

@view
func unlockedSupply{
    syscall_ptr : felt*,
    pedersen_ptr : HashBuiltin*,
    range_check_ptr,
}() -> (balance : Uint256):
    alloc_locals
    let (first_time) = _pending_time.read()
    let (total) = _pending_supply.read()
    let (block_timestamp) = get_block_timestamp()
    let (remaining_time) = is_nn(first_time + 3600 - block_timestamp)
    if remaining_time == 1:
        let (balance) = uint256_sub(Uint256(low=STRK_TOKEN_TO_DISTRIBUTE, high=0), Uint256(low=total, high=0))
        return (balance)
    end
    return (Uint256(low=STRK_TOKEN_TO_DISTRIBUTE, high=0))
end

@view
func timeToUnlock{
    syscall_ptr : felt*,
    pedersen_ptr : HashBuiltin*,
    range_check_ptr,
}() -> (time : felt):
    alloc_locals
    let (first_time) = _pending_time.read()
    let (block_timestamp) = get_block_timestamp()
    let (remaining_time) = is_nn(first_time + 3600 - block_timestamp)
    if remaining_time == 1:
        return (first_time + 3600 - block_timestamp)
    end
    return (0)
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
