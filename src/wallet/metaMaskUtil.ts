import Web3 from 'web3';
import wallet = require('lib/wallet/WalletUtils');

import {RawTx} from '../model/types';
import {MetaMaskAccount} from '../../lib/wallet/ethereum/account';

export class MetaMaskUtil {

    public web3: Web3;
    public account: MetaMaskAccount;

    constructor() {
        this.web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        this.account = wallet.fromMetaMask(this.web3);
    }

    public getAddress(): string {
        return this.account.getAddress();
    }

    public async deposit(tx: RawTx) {
        this.account.sendTransaction(tx)
    }

    public async withdraw(tx: RawTx) {
        this.account.sendTransaction(tx)
    }

}

export const metaMaskUtil: MetaMaskUtil = new MetaMaskUtil();
