import BN = require('bn.js');
import eddsa = require('lib/sign/eddsa');
import wallet = require('lib/wallet/WalletUtils');

import {grpcUtil} from '../grpc/grpcUtil';
import {Account, DepositInfo, OrderInfo, RawTx} from '../model/types';

export class SignUtil {

    private exchangeId: number;
    private accountId: number;

    public static toBitsBN(value: BN, length: number) {
        const res = new Array(length);
        for (let i = 0; i < length; i++) {
            res[i] = value.testn(i) ? 1 : 0;
        }
        return res;
    }

    public static toBitsNumber(value: number, length: number) {
        return SignUtil.toBitsBN(new BN(value), length);
    }

    public static toBitsString(value: string, length: number) {
        return SignUtil.toBitsBN(new BN(value, 10), length);
    }

    public flattenList = (l: any[]) => {
        return [].concat.apply([], l);
    };

    public async deposit(tx: RawTx) {
        let metaMaskAccount = wallet.fromMetaMask();
        metaMaskAccount.sendTransaction(tx);
        grpcUtil
    }

    public signOrder(order: OrderInfo) {
        const message = this.flattenList([
            SignUtil.toBitsNumber(this.exchangeId, 32),
            SignUtil.toBitsNumber(order.orderID, 20),
            SignUtil.toBitsNumber(order.accountID, 20),
            SignUtil.toBitsString(order.dualAuthPublicKeyX, 254),
            SignUtil.toBitsString(order.dualAuthPublicKeyY, 254),
            SignUtil.toBitsNumber(order.tokenIdS, 8),
            SignUtil.toBitsNumber(order.tokenIdB, 8),
            SignUtil.toBitsBN(order.amountS, 96),
            SignUtil.toBitsBN(order.amountB, 96),
            SignUtil.toBitsNumber(order.allOrNone ? 1 : 0, 1),
            SignUtil.toBitsNumber(order.validSince, 32),
            SignUtil.toBitsNumber(order.validUntil, 32),
            SignUtil.toBitsNumber(order.maxFeeBips, 7)
        ]);

        const accountID = order.accountID;
        if (accountID !== undefined) {
            // const account = this.accounts[this.exchangeId][accountID];
        }

        // const account = this.accounts[this.exchangeId][order.accountID];
        // const sig = eddsa.sign(account.secretKey, message);
        // console.log(sig);

        // order.hash = sig.hash;
        // order.signature = {
        //     Rx: sig.R[0].toString(),
        //     Ry: sig.R[1].toString(),
        //     s: sig.S.toString()
        // };
        // console.log(order.signature);

        // const msg = this.toBits(123456, 24);
        // console.log("msg: " + msg);
        // const hash = pedersenHash.hash(msg);
        // console.log("hash: " + hash);

        // const secretKey = "1604229682838453979160098578537594917065636593682766929050397603475111863262";
        // const pubKey = eddsa.prv2pub(prvKey);
        /*const signature = eddsa.sign(secretKey, msg);
        console.log("msg length: ", msg.length);
        console.log("msg: ", msg.toString());
        console.log("Signature: ");
        console.log(signature);*/
    }

}

export const signUtil: SignUtil = new SignUtil();
