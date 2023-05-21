// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract GasRefund {
    struct Refund {
        bytes32 txHash;
        uint256 gasFee;
        address refundAddress;
        bool refunded;
    }

    mapping (bytes32 => Refund) private refunds;
    bytes32[] private refundList;

    function registerForRefund(bytes32 txHash, uint256 gasFee, address refundAddress) public {
        require(!refunds[txHash].refunded, "Transaction already refunded");
        if(refunds[txHash].txHash == txHash) {
            // refund with given txHash already exists, update its details
            refunds[txHash].refundAddress = refundAddress;
            refunds[txHash].gasFee = gasFee;
        } else {
            // create a new refund with given details
            refunds[txHash] = Refund(txHash, gasFee, refundAddress, false);

        }
        refundList.push(txHash);
    }

    function performTransaction(address payable _to) public payable {
        _to.transfer(msg.value);
    }

    function refundGas(bytes32 txHash) public payable {
        Refund storage refund = refunds[txHash];
        require(!refund.refunded, "Transaction already refunded");
        refund.refunded = true;
        payable(refund.refundAddress).transfer(refund.gasFee);
    }

    function getRefunds() public view returns (Refund[] memory) {
        Refund[] memory result = new Refund[](refundList.length);
        for (uint i = 0; i < refundList.length; i++) {
            result[i] = refunds[refundList[i]];
        }
        return result;
    }
}
