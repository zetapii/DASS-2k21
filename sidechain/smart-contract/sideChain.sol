// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Sidechain {
    mapping(address => uint256) public to_pay;

    function lock_account(address account, uint256 amount) public {
        require(amount > 0, "Amount must be greater than zero");
        to_pay[account] += amount;
    }

    function unlock_account(address account, uint256 amount) public {
        require(amount > 0, "Amount must be greater than zero");
        require(to_pay[account] >= amount, "Insufficient funds");
        to_pay[account] -= amount;
    }

    function get_balance(address user) public view returns (uint256) {
        return to_pay[user];
    }
}