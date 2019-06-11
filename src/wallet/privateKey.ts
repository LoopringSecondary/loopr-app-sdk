import Web3 from 'web3';
import wallet = require('lib/wallet/WalletUtils');
import {KeyAccount, MetaMaskAccount} from '../../lib/wallet/ethereum/walletAccount';

export class PrivateKey {

    public account: KeyAccount;
    public address: string;


    /**
     * Convert eth -> weth
     * @param amount number amount to deposit e.g. 1.234
     * @param gasPrice number amount to deposit
     */
    public async deposit(amount: number, gasPrice: number) {
        this.account.sendTransaction()
    }

    /**
     * Convert weth -> eth
     * @param amount string amount to withdraw
     */
    public async withdraw(amount: number) {

    }

    /**
     * Deposit to Dex
     * @param mnemonic string
     * @param password string
     * @param dpath string
     */
    public async depositTo(amount: number) {
    }

    public async withdrawFrom(amount: number) {
    }
}

export const privateKey: PrivateKey = new PrivateKey();

