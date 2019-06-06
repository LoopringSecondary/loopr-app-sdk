import Web3 from 'web3';
import wallet = require('lib/wallet/WalletUtils');

import {MetaMaskAccount} from 'lib/wallet/ethereum/account';
import Transaction from 'lib/wallet/ethereum/transaction';
import config from 'lib/wallet/config';
import * as fm from 'lib/wallet/common/formatter';
import {generateAbiData} from 'lib/wallet/ethereum/abi';

export class MetaMask {

    public web3: Web3;
    public account: MetaMaskAccount;

    constructor() {
        this.web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        this.account = wallet.fromMetaMask(this.web3);
    }

    public getAddress(): string {
        return this.account.getAddress();
    }

    public async transfer(toAddr: string, symbol: string, amount: number, gasPrice: number) {
        let to, value, data: string;
        let token = config.getTokenBySymbol(symbol);
        let digits = "1e" + token.digits;
        let hex = fm.toHex(fm.toBig(amount).times(digits));
        if (symbol === 'ETH') {
            to = toAddr;
            value = hex;
            data = '0x0';
        } else {
            to = token.address;
            value = '0x0';
            data = generateAbiData({method: "transfer", address: toAddr, hex});
        }
        let rawTx = new Transaction({
            to: to,
            value: value,
            data: data,
            nonce: await
            gasPrice: fm.toHex(fm.toBig(gasPrice).times(1e9)),
            gasLimit: fm.toHex(config.getGasLimitByType('eth_transfer').gasLimit)
        });
        this.account.sendTransaction(rawTx)
    }

    public async withdraw(tx: RawTx) {
        this.account.sendTransaction(tx)
    }
}

export const metaMaskUtil: MetaMask = new MetaMask();

module.exports = MetaMask;
