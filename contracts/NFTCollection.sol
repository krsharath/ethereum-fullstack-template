//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

//contract NFTCollection is ERC721URIStorage, Ownable {
//    uint256 public counter = 0;
//
//    struct Nft {
//        string tokenURI;
//        uint256 price;
//    }
//
//    mapping(uint256 => Nft) public allNfts;
//
//    constructor() public ERC721("NFTCollection", "NFT") {}
//
//    function mintNft(string memory tokenURI, uint256 price) public onlyOwner {
//        counter++;
//
//        _mint(msg.sender, counter);
//        _setTokenURI(counter, tokenURI);
//
//        address payable addr = payable(msg.sender);
//
//        Nft memory newNft = Nft(tokenURI, price);
//        allNfts[counter] = newNft;
//   }
//
//    function buyNft(uint256 _tokenId) public payable {
//       require(_exists(_tokenId), "Token does not exist");
//
//        address tokenOwner = ownerOf(_tokenId);
//        require(tokenOwner != msg.sender, "You already own this token");
//
//        Nft memory nft = allNfts[_tokenId];
//
//        require(msg.value >= nft.price, "Not enough ETH sent; check price!");
//
//        address payable tokenOwnerAddr = payable(tokenOwner);
//        tokenOwnerAddr.transfer(msg.value);
//
//        _transfer(tokenOwner, msg.sender, _tokenId);
//    }
//}


contract NFTCollection is ERC721URIStorage, Ownable {
    address _owner;
    struct Nft {
        string tokenURI;
        string datahashstr;
    }
    mapping(uint256 => Nft) public allNfts;
    constructor() public ERC721("NFTCollection", "NFT") {
        _owner = msg.sender;
    }
    function mintNft(string memory tokenURI, uint256 medid, string memory datahash) public  {
        console.log("Mint NFT Owner %s Sender %s", _owner, msg.sender);
        _mint(msg.sender, medid);
        _setTokenURI(medid, tokenURI);
        Nft memory newNft = Nft(tokenURI, datahash);
        allNfts[medid] = newNft;
    }
    function getURI(uint256 medid) public view returns (string memory, string memory) {
        require(_exists(medid), "Token does not exist");
        Nft memory mednft = allNfts[medid];
        return (mednft.tokenURI, mednft.datahashstr);
    }
}