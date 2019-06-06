import Contract from './Contract';

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
