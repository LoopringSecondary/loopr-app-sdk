import Contract from './Contract';
import {getRingHash, feeSelectionListToNumber} from '../../relay/rpc/ring';
import {addHexPrefix, toBig, toBuffer, toFixed, toHex, toNumber} from '../../common/formatter';
import {ecsign, hashPersonalMessage} from 'ethereumjs-util';

const erc20Abi = require('../../config/abis/erc20.json');
const wethAbi = require('../../config/abis/weth.json');
const airdropAbi = require('../../config/abis/airdrop.json');

const ERC20Token = new Contract(erc20Abi);
const WETH = new Contract(wethAbi);
const AirdropContract = new Contract(airdropAbi);

export default {
    ERC20Token,
    WETH,
    AirdropContract
};
