import Web3 from 'web3';

import {MetaMaskAccount} from 'lib/wallet/ethereum/walletAccount';
import Transaction from 'lib/wallet/ethereum/transaction';
import walletUtil = require('lib/wallet/WalletUtils');
import {Exchange} from "../sign/exchange";

export class MetaMask {

    public web3: Web3;
    public address: string;
    public account: MetaMaskAccount;
    public exchange: Exchange;

    public constructor() {
        this.web3 = new Web3(Web3.givenProvider || 'http://localhost:8545'); // TODO: replace for ruby
        this.account = walletUtil.fromMetaMask(this.web3);
        this.address = this.account.getAddress();
        this.exchange = new Exchange();
    }

    public async createOrUpdateAccount(publicX: string, publicY: string, gasPrice: number) {
        this.exchange.createOrUpdateAccount(publicX, publicY, gasPrice).then((tx: Transaction) => {
            return this.account.sendTransaction(tx)
        })
    }

    public async depositTo(to: string, symbol: string, amount: number, gasPrice: number) {
        this.exchange.deposit(symbol, amount, gasPrice).then((tx: Transaction) => {
            return this.account.sendTransaction(tx);
        })
    }

    public async withdrawFrom(symbol: string, amount: number, gasPrice: number) {
        this.exchange.withdraw(symbol, amount, gasPrice).then((tx: Transaction) => {
            return this.account.sendTransaction(tx);
        })
    }
}

export const metaMask: MetaMask = new MetaMask();
