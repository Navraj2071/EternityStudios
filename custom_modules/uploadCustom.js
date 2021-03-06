import React from "react";
import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import BASE_URL from "../apiConfig";

import Web3 from "web3";
import { useRouter } from "next/router";

const nft_contract = {
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "tokenName",
          type: "string",
        },
        {
          internalType: "string",
          name: "tokenSymbol",
          type: "string",
        },
        {
          internalType: "string",
          name: "tokenURI",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  allSourcePaths: {
    0: "C:/Users/Navraj/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.4.1/contracts/token/ERC721/ERC721.sol",
    1: "C:/Users/Navraj/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.4.1/contracts/token/ERC721/IERC721.sol",
    10: "contracts/SingleNFT.sol",
    3: "C:/Users/Navraj/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.4.1/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
    4: "C:/Users/Navraj/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.4.1/contracts/token/ERC721/extensions/IERC721Metadata.sol",
    6: "C:/Users/Navraj/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.4.1/contracts/utils/Context.sol",
    8: "C:/Users/Navraj/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.4.1/contracts/utils/introspection/ERC165.sol",
    9: "C:/Users/Navraj/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.4.1/contracts/utils/introspection/IERC165.sol",
  },
  ast: {
    absolutePath: "contracts/SingleNFT.sol",
    exportedSymbols: {
      Address: [1447],
      Context: [1469],
      ERC165: [1696],
      ERC721: [989],
      ERC721URIStorage: [158],
      IERC165: [1708],
      IERC721: [1105],
      IERC721Metadata: [1150],
      IERC721Receiver: [1123],
      SingleNFT: [30],
      Strings: [1672],
    },
    id: 31,
    license: "MIT",
    nodeType: "SourceUnit",
    nodes: [
      {
        id: 1,
        literals: ["solidity", "^", "0.8", ".0"],
        nodeType: "PragmaDirective",
        src: "32:23:10",
      },
      {
        absolutePath:
          "C:/Users/Navraj/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.4.1/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
        file: "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
        id: 2,
        nameLocation: "-1:-1:-1",
        nodeType: "ImportDirective",
        scope: 31,
        sourceUnit: 159,
        src: "57:78:10",
        symbolAliases: [],
        unitAlias: "",
      },
      {
        abstract: false,
        baseContracts: [
          {
            baseName: {
              id: 3,
              name: "ERC721URIStorage",
              nodeType: "IdentifierPath",
              referencedDeclaration: 158,
              src: "159:16:10",
            },
            id: 4,
            nodeType: "InheritanceSpecifier",
            src: "159:16:10",
          },
        ],
        canonicalName: "SingleNFT",
        contractDependencies: [],
        contractKind: "contract",
        fullyImplemented: true,
        id: 30,
        linearizedBaseContracts: [30, 158, 989, 1150, 1105, 1696, 1708, 1469],
        name: "SingleNFT",
        nameLocation: "146:9:10",
        nodeType: "ContractDefinition",
        nodes: [
          {
            body: {
              id: 28,
              nodeType: "Block",
              src: "319:93:10",
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        expression: {
                          id: 18,
                          name: "msg",
                          nodeType: "Identifier",
                          overloadedDeclarations: [],
                          referencedDeclaration: -15,
                          src: "356:3:10",
                          typeDescriptions: {
                            typeIdentifier: "t_magic_message",
                            typeString: "msg",
                          },
                        },
                        id: 19,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        memberName: "sender",
                        nodeType: "MemberAccess",
                        src: "356:10:10",
                        typeDescriptions: {
                          typeIdentifier: "t_address",
                          typeString: "address",
                        },
                      },
                      {
                        hexValue: "31",
                        id: 20,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: "number",
                        lValueRequested: false,
                        nodeType: "Literal",
                        src: "368:1:10",
                        typeDescriptions: {
                          typeIdentifier: "t_rational_1_by_1",
                          typeString: "int_const 1",
                        },
                        value: "1",
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: "t_address",
                          typeString: "address",
                        },
                        {
                          typeIdentifier: "t_rational_1_by_1",
                          typeString: "int_const 1",
                        },
                      ],
                      id: 17,
                      name: "_safeMint",
                      nodeType: "Identifier",
                      overloadedDeclarations: [653, 682],
                      referencedDeclaration: 653,
                      src: "346:9:10",
                      typeDescriptions: {
                        typeIdentifier:
                          "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        typeString: "function (address,uint256)",
                      },
                    },
                    id: 21,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: "functionCall",
                    lValueRequested: false,
                    names: [],
                    nodeType: "FunctionCall",
                    src: "346:24:10",
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: "t_tuple$__$",
                      typeString: "tuple()",
                    },
                  },
                  id: 22,
                  nodeType: "ExpressionStatement",
                  src: "346:24:10",
                },
                {
                  expression: {
                    arguments: [
                      {
                        hexValue: "31",
                        id: 24,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: "number",
                        lValueRequested: false,
                        nodeType: "Literal",
                        src: "393:1:10",
                        typeDescriptions: {
                          typeIdentifier: "t_rational_1_by_1",
                          typeString: "int_const 1",
                        },
                        value: "1",
                      },
                      {
                        id: 25,
                        name: "tokenURI",
                        nodeType: "Identifier",
                        overloadedDeclarations: [],
                        referencedDeclaration: 10,
                        src: "396:8:10",
                        typeDescriptions: {
                          typeIdentifier: "t_string_memory_ptr",
                          typeString: "string memory",
                        },
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: "t_rational_1_by_1",
                          typeString: "int_const 1",
                        },
                        {
                          typeIdentifier: "t_string_memory_ptr",
                          typeString: "string memory",
                        },
                      ],
                      id: 23,
                      name: "_setTokenURI",
                      nodeType: "Identifier",
                      overloadedDeclarations: [],
                      referencedDeclaration: 127,
                      src: "380:12:10",
                      typeDescriptions: {
                        typeIdentifier:
                          "t_function_internal_nonpayable$_t_uint256_$_t_string_memory_ptr_$returns$__$",
                        typeString: "function (uint256,string memory)",
                      },
                    },
                    id: 26,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: "functionCall",
                    lValueRequested: false,
                    names: [],
                    nodeType: "FunctionCall",
                    src: "380:25:10",
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: "t_tuple$__$",
                      typeString: "tuple()",
                    },
                  },
                  id: 27,
                  nodeType: "ExpressionStatement",
                  src: "380:25:10",
                },
              ],
            },
            id: 29,
            implemented: true,
            kind: "constructor",
            modifiers: [
              {
                arguments: [
                  {
                    id: 13,
                    name: "tokenName",
                    nodeType: "Identifier",
                    overloadedDeclarations: [],
                    referencedDeclaration: 6,
                    src: "295:9:10",
                    typeDescriptions: {
                      typeIdentifier: "t_string_memory_ptr",
                      typeString: "string memory",
                    },
                  },
                  {
                    id: 14,
                    name: "tokenSymbol",
                    nodeType: "Identifier",
                    overloadedDeclarations: [],
                    referencedDeclaration: 8,
                    src: "306:11:10",
                    typeDescriptions: {
                      typeIdentifier: "t_string_memory_ptr",
                      typeString: "string memory",
                    },
                  },
                ],
                id: 15,
                kind: "baseConstructorSpecifier",
                modifierName: {
                  id: 12,
                  name: "ERC721",
                  nodeType: "IdentifierPath",
                  referencedDeclaration: 989,
                  src: "287:6:10",
                },
                nodeType: "ModifierInvocation",
                src: "287:31:10",
              },
            ],
            name: "",
            nameLocation: "-1:-1:-1",
            nodeType: "FunctionDefinition",
            parameters: {
              id: 11,
              nodeType: "ParameterList",
              parameters: [
                {
                  constant: false,
                  id: 6,
                  mutability: "mutable",
                  name: "tokenName",
                  nameLocation: "218:9:10",
                  nodeType: "VariableDeclaration",
                  scope: 29,
                  src: "204:23:10",
                  stateVariable: false,
                  storageLocation: "memory",
                  typeDescriptions: {
                    typeIdentifier: "t_string_memory_ptr",
                    typeString: "string",
                  },
                  typeName: {
                    id: 5,
                    name: "string",
                    nodeType: "ElementaryTypeName",
                    src: "204:6:10",
                    typeDescriptions: {
                      typeIdentifier: "t_string_storage_ptr",
                      typeString: "string",
                    },
                  },
                  visibility: "internal",
                },
                {
                  constant: false,
                  id: 8,
                  mutability: "mutable",
                  name: "tokenSymbol",
                  nameLocation: "243:11:10",
                  nodeType: "VariableDeclaration",
                  scope: 29,
                  src: "229:25:10",
                  stateVariable: false,
                  storageLocation: "memory",
                  typeDescriptions: {
                    typeIdentifier: "t_string_memory_ptr",
                    typeString: "string",
                  },
                  typeName: {
                    id: 7,
                    name: "string",
                    nodeType: "ElementaryTypeName",
                    src: "229:6:10",
                    typeDescriptions: {
                      typeIdentifier: "t_string_storage_ptr",
                      typeString: "string",
                    },
                  },
                  visibility: "internal",
                },
                {
                  constant: false,
                  id: 10,
                  mutability: "mutable",
                  name: "tokenURI",
                  nameLocation: "270:8:10",
                  nodeType: "VariableDeclaration",
                  scope: 29,
                  src: "256:22:10",
                  stateVariable: false,
                  storageLocation: "memory",
                  typeDescriptions: {
                    typeIdentifier: "t_string_memory_ptr",
                    typeString: "string",
                  },
                  typeName: {
                    id: 9,
                    name: "string",
                    nodeType: "ElementaryTypeName",
                    src: "256:6:10",
                    typeDescriptions: {
                      typeIdentifier: "t_string_storage_ptr",
                      typeString: "string",
                    },
                  },
                  visibility: "internal",
                },
              ],
              src: "203:76:10",
            },
            returnParameters: {
              id: 16,
              nodeType: "ParameterList",
              parameters: [],
              src: "319:0:10",
            },
            scope: 30,
            src: "192:220:10",
            stateMutability: "nonpayable",
            virtual: false,
            visibility: "public",
          },
        ],
        scope: 31,
        src: "137:278:10",
        usedErrors: [],
      },
    ],
    src: "32:385:10",
  },
  bytecode:
    "60806040523480156200001157600080fd5b5060405162001b7d38038062001b7d8339810160408190526200003491620005f6565b8251839083906200004d90600090602085019062000476565b5080516200006390600190602084019062000476565b505050620000793360016200008f60201b60201c565b62000086600182620000b5565b50505062000774565b620000b18282604051806020016040528060008152506200015c60201b60201c565b5050565b6000828152600260205260409020546001600160a01b0316620001365760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b60648201526084015b60405180910390fd5b60008281526006602090815260409091208251620001579284019062000476565b505050565b620001688383620001cf565b62000177600084848462000317565b620001575760405162461bcd60e51b8152602060048201526032602482015260008051602062001b5d83398151915260448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60648201526084016200012d565b6001600160a01b038216620002275760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016200012d565b6000818152600260205260409020546001600160a01b0316156200028e5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016200012d565b6001600160a01b0382166000908152600360205260408120805460019290620002b990849062000687565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600062000338846001600160a01b03166200047060201b620007e31760201c565b156200046457604051630a85bd0160e11b81526001600160a01b0385169063150b7a029062000372903390899088908890600401620006ae565b6020604051808303816000875af1925050508015620003b0575060408051601f3d908101601f19168201909252620003ad9181019062000704565b60015b62000449573d808015620003e1576040519150601f19603f3d011682016040523d82523d6000602084013e620003e6565b606091505b508051620004415760405162461bcd60e51b8152602060048201526032602482015260008051602062001b5d83398151915260448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60648201526084016200012d565b805181602001fd5b6001600160e01b031916630a85bd0160e11b14905062000468565b5060015b949350505050565b3b151590565b828054620004849062000737565b90600052602060002090601f016020900481019282620004a85760008555620004f3565b82601f10620004c357805160ff1916838001178555620004f3565b82800160010185558215620004f3579182015b82811115620004f3578251825591602001919060010190620004d6565b506200050192915062000505565b5090565b5b8082111562000501576000815560010162000506565b634e487b7160e01b600052604160045260246000fd5b60005b838110156200054f57818101518382015260200162000535565b838111156200055f576000848401525b50505050565b600082601f8301126200057757600080fd5b81516001600160401b03808211156200059457620005946200051c565b604051601f8301601f19908116603f01168101908282118183101715620005bf57620005bf6200051c565b81604052838152866020858801011115620005d957600080fd5b620005ec84602083016020890162000532565b9695505050505050565b6000806000606084860312156200060c57600080fd5b83516001600160401b03808211156200062457600080fd5b620006328783880162000565565b945060208601519150808211156200064957600080fd5b620006578783880162000565565b935060408601519150808211156200066e57600080fd5b506200067d8682870162000565565b9150509250925092565b60008219821115620006a957634e487b7160e01b600052601160045260246000fd5b500190565b600060018060a01b038087168352808616602084015250836040830152608060608301528251806080840152620006ed8160a085016020870162000532565b601f01601f19169190910160a00195945050505050565b6000602082840312156200071757600080fd5b81516001600160e01b0319811681146200073057600080fd5b9392505050565b600181811c908216806200074c57607f821691505b602082108114156200076e57634e487b7160e01b600052602260045260246000fd5b50919050565b6113d980620007846000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101b3578063b88d4fde146101c6578063c87b56dd146101d9578063e985e9c5146101ec57600080fd5b80636352211e1461017757806370a082311461018a57806395d89b41146101ab57600080fd5b806301ffc9a7146100d457806306fdde03146100fc578063081812fc14610111578063095ea7b31461013c57806323b872dd1461015157806342842e0e14610164575b600080fd5b6100e76100e2366004610ee9565b610228565b60405190151581526020015b60405180910390f35b61010461027a565b6040516100f39190610f5e565b61012461011f366004610f71565b61030c565b6040516001600160a01b0390911681526020016100f3565b61014f61014a366004610fa6565b6103a6565b005b61014f61015f366004610fd0565b6104bc565b61014f610172366004610fd0565b6104ed565b610124610185366004610f71565b610508565b61019d61019836600461100c565b61057f565b6040519081526020016100f3565b610104610606565b61014f6101c1366004611027565b610615565b61014f6101d4366004611079565b610624565b6101046101e7366004610f71565b61065c565b6100e76101fa366004611155565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061025957506001600160e01b03198216635b5e139f60e01b145b8061027457506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461028990611188565b80601f01602080910402602001604051908101604052809291908181526020018280546102b590611188565b80156103025780601f106102d757610100808354040283529160200191610302565b820191906000526020600020905b8154815290600101906020018083116102e557829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b031661038a5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006103b182610508565b9050806001600160a01b0316836001600160a01b0316141561041f5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610381565b336001600160a01b038216148061043b575061043b81336101fa565b6104ad5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610381565b6104b783836107e9565b505050565b6104c63382610857565b6104e25760405162461bcd60e51b8152600401610381906111c3565b6104b783838361094a565b6104b783838360405180602001604052806000815250610624565b6000818152600260205260408120546001600160a01b0316806102745760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610381565b60006001600160a01b0382166105ea5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610381565b506001600160a01b031660009081526003602052604090205490565b60606001805461028990611188565b610620338383610aea565b5050565b61062e3383610857565b61064a5760405162461bcd60e51b8152600401610381906111c3565b61065684848484610bb9565b50505050565b6000818152600260205260409020546060906001600160a01b03166106dd5760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f72206044820152703737b732bc34b9ba32b73a103a37b5b2b760791b6064820152608401610381565b600082815260066020526040812080546106f690611188565b80601f016020809104026020016040519081016040528092919081815260200182805461072290611188565b801561076f5780601f106107445761010080835404028352916020019161076f565b820191906000526020600020905b81548152906001019060200180831161075257829003601f168201915b50505050509050600061078d60408051602081019091526000815290565b90508051600014156107a0575092915050565b8151156107d25780826040516020016107ba929190611214565b60405160208183030381529060405292505050919050565b6107db84610bec565b949350505050565b3b151590565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061081e82610508565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166108d05760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610381565b60006108db83610508565b9050806001600160a01b0316846001600160a01b031614806109165750836001600160a01b031661090b8461030c565b6001600160a01b0316145b806107db57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff166107db565b826001600160a01b031661095d82610508565b6001600160a01b0316146109c55760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b6064820152608401610381565b6001600160a01b038216610a275760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610381565b610a326000826107e9565b6001600160a01b0383166000908152600360205260408120805460019290610a5b908490611259565b90915550506001600160a01b0382166000908152600360205260408120805460019290610a89908490611270565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b03161415610b4c5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610381565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610bc484848461094a565b610bd084848484610cd4565b6106565760405162461bcd60e51b815260040161038190611288565b6000818152600260205260409020546060906001600160a01b0316610c6b5760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610381565b6000610c8260408051602081019091526000815290565b90506000815111610ca25760405180602001604052806000815250610ccd565b80610cac84610dd2565b604051602001610cbd929190611214565b6040516020818303038152906040525b9392505050565b60006001600160a01b0384163b15610dc757604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610d189033908990889088906004016112da565b6020604051808303816000875af1925050508015610d53575060408051601f3d908101601f19168201909252610d5091810190611317565b60015b610dad573d808015610d81576040519150601f19603f3d011682016040523d82523d6000602084013e610d86565b606091505b508051610da55760405162461bcd60e51b815260040161038190611288565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506107db565b506001949350505050565b606081610df65750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610e205780610e0a81611334565b9150610e199050600a83611365565b9150610dfa565b60008167ffffffffffffffff811115610e3b57610e3b611063565b6040519080825280601f01601f191660200182016040528015610e65576020820181803683370190505b5090505b84156107db57610e7a600183611259565b9150610e87600a86611379565b610e92906030611270565b60f81b818381518110610ea757610ea761138d565b60200101906001600160f81b031916908160001a905350610ec9600a86611365565b9450610e69565b6001600160e01b031981168114610ee657600080fd5b50565b600060208284031215610efb57600080fd5b8135610ccd81610ed0565b60005b83811015610f21578181015183820152602001610f09565b838111156106565750506000910152565b60008151808452610f4a816020860160208601610f06565b601f01601f19169290920160200192915050565b602081526000610ccd6020830184610f32565b600060208284031215610f8357600080fd5b5035919050565b80356001600160a01b0381168114610fa157600080fd5b919050565b60008060408385031215610fb957600080fd5b610fc283610f8a565b946020939093013593505050565b600080600060608486031215610fe557600080fd5b610fee84610f8a565b9250610ffc60208501610f8a565b9150604084013590509250925092565b60006020828403121561101e57600080fd5b610ccd82610f8a565b6000806040838503121561103a57600080fd5b61104383610f8a565b91506020830135801515811461105857600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561108f57600080fd5b61109885610f8a565b93506110a660208601610f8a565b925060408501359150606085013567ffffffffffffffff808211156110ca57600080fd5b818701915087601f8301126110de57600080fd5b8135818111156110f0576110f0611063565b604051601f8201601f19908116603f0116810190838211818310171561111857611118611063565b816040528281528a602084870101111561113157600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561116857600080fd5b61117183610f8a565b915061117f60208401610f8a565b90509250929050565b600181811c9082168061119c57607f821691505b602082108114156111bd57634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b60008351611226818460208801610f06565b83519083019061123a818360208801610f06565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561126b5761126b611243565b500390565b6000821982111561128357611283611243565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061130d90830184610f32565b9695505050505050565b60006020828403121561132957600080fd5b8151610ccd81610ed0565b600060001982141561134857611348611243565b5060010190565b634e487b7160e01b600052601260045260246000fd5b6000826113745761137461134f565b500490565b6000826113885761138861134f565b500690565b634e487b7160e01b600052603260045260246000fdfea2646970667358221220368b42746a663373b46aa0d5c809d99ddbd6b54cfc9e85d7ecffce4f6053b2d964736f6c634300080a00334552433732313a207472616e7366657220746f206e6f6e204552433732315265",
  bytecodeSha1: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
  compiler: {
    evm_version: "istanbul",
    optimizer: {
      enabled: true,
      runs: 200,
    },
    version: "0.8.10+commit.fc410830",
  },
  contractName: "SingleNFT",
  coverageMap: {
    branches: {
      0: {
        "ERC721._safeTransfer": {
          57: [6731, 6779, true],
        },
        "ERC721._setApprovalForAll": {
          56: [11442, 11459, true],
        },
        "ERC721._transfer": {
          54: [10451, 10482, true],
          55: [10546, 10562, true],
        },
        "ERC721.approve": {
          47: [3659, 3670, true],
          48: [3740, 3761, true],
          49: [3765, 3802, true],
        },
        "ERC721.balanceOf": {
          52: [2013, 2032, true],
        },
        "ERC721.ownerOf": {
          51: [2317, 2336, true],
        },
        "ERC721.safeTransferFrom": {
          53: [5521, 5562, true],
        },
        "ERC721.tokenURI": {
          58: [3039, 3064, true],
        },
        "ERC721.transferFrom": {
          50: [4900, 4941, true],
        },
      },
      1: {},
      10: {},
      3: {
        "ERC721URIStorage.tokenURI": {
          59: [813, 836, false],
          60: [981, 1008, false],
        },
      },
      4: {},
      6: {},
      8: {},
      9: {},
    },
    statements: {
      0: {
        "ERC721._approve": {
          26: [11069, 11098],
          27: [11108, 11159],
        },
        "ERC721._baseURI": {
          22: [3449, 3458],
        },
        "ERC721._checkOnERC721Received": {
          44: [12647, 12707],
          45: [12481, 12539],
          46: [12911, 12922],
        },
        "ERC721._exists": {
          4: [7225, 7262],
        },
        "ERC721._isApprovedOrOwner": {
          28: [7536, 7609],
          29: [7668, 7764],
        },
        "ERC721._safeTransfer": {
          40: [6685, 6713],
          41: [6723, 6834],
        },
        "ERC721._setApprovalForAll": {
          37: [11434, 11489],
          38: [11499, 11545],
          39: [11555, 11601],
        },
        "ERC721._transfer": {
          30: [10443, 10528],
          31: [10538, 10603],
          32: [10715, 10744],
          33: [10755, 10775],
          34: [10785, 10803],
          35: [10813, 10834],
          36: [10845, 10877],
        },
        "ERC721.approve": {
          7: [3651, 3708],
          9: [3719, 3884],
          10: [3895, 3916],
        },
        "ERC721.balanceOf": {
          15: [2005, 2079],
          16: [2089, 2112],
        },
        "ERC721.getApproved": {
          5: [4079, 4152],
          6: [4163, 4194],
        },
        "ERC721.isApprovedForAll": {
          0: [4600, 4642],
        },
        "ERC721.name": {
          3: [2552, 2564],
        },
        "ERC721.ownerOf": {
          14: [2309, 2382],
        },
        "ERC721.safeTransferFrom": {
          13: [5240, 5279],
          19: [5513, 5616],
          20: [5626, 5665],
        },
        "ERC721.setApprovalForAll": {
          18: [4362, 4414],
        },
        "ERC721.supportsInterface": {
          1: [1673, 1848],
        },
        "ERC721.symbol": {
          17: [2716, 2730],
        },
        "ERC721.tokenURI": {
          42: [2901, 2977],
          43: [3032, 3125],
        },
        "ERC721.transferFrom": {
          11: [4892, 4995],
          12: [5006, 5034],
        },
      },
      1: {},
      10: {},
      3: {
        "ERC721URIStorage.tokenURI": {
          21: [565, 643],
          23: [852, 868],
          24: [1024, 1072],
          25: [1093, 1123],
        },
      },
      4: {},
      6: {
        "Context._msgSender": {
          8: [712, 729],
        },
      },
      8: {
        "ERC165.supportsInterface": {
          2: [930, 977],
        },
      },
      9: {},
    },
  },
  dependencies: [
    "OpenZeppelin/openzeppelin-contracts@4.4.1/Context",
    "OpenZeppelin/openzeppelin-contracts@4.4.1/ERC165",
    "OpenZeppelin/openzeppelin-contracts@4.4.1/ERC721",
    "OpenZeppelin/openzeppelin-contracts@4.4.1/ERC721URIStorage",
    "OpenZeppelin/openzeppelin-contracts@4.4.1/IERC165",
    "OpenZeppelin/openzeppelin-contracts@4.4.1/IERC721",
    "OpenZeppelin/openzeppelin-contracts@4.4.1/IERC721Metadata",
  ],
  deployedBytecode:
    "608060405234801561001057600080fd5b50600436106100cf5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101b3578063b88d4fde146101c6578063c87b56dd146101d9578063e985e9c5146101ec57600080fd5b80636352211e1461017757806370a082311461018a57806395d89b41146101ab57600080fd5b806301ffc9a7146100d457806306fdde03146100fc578063081812fc14610111578063095ea7b31461013c57806323b872dd1461015157806342842e0e14610164575b600080fd5b6100e76100e2366004610ee9565b610228565b60405190151581526020015b60405180910390f35b61010461027a565b6040516100f39190610f5e565b61012461011f366004610f71565b61030c565b6040516001600160a01b0390911681526020016100f3565b61014f61014a366004610fa6565b6103a6565b005b61014f61015f366004610fd0565b6104bc565b61014f610172366004610fd0565b6104ed565b610124610185366004610f71565b610508565b61019d61019836600461100c565b61057f565b6040519081526020016100f3565b610104610606565b61014f6101c1366004611027565b610615565b61014f6101d4366004611079565b610624565b6101046101e7366004610f71565b61065c565b6100e76101fa366004611155565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061025957506001600160e01b03198216635b5e139f60e01b145b8061027457506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461028990611188565b80601f01602080910402602001604051908101604052809291908181526020018280546102b590611188565b80156103025780601f106102d757610100808354040283529160200191610302565b820191906000526020600020905b8154815290600101906020018083116102e557829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b031661038a5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006103b182610508565b9050806001600160a01b0316836001600160a01b0316141561041f5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610381565b336001600160a01b038216148061043b575061043b81336101fa565b6104ad5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610381565b6104b783836107e9565b505050565b6104c63382610857565b6104e25760405162461bcd60e51b8152600401610381906111c3565b6104b783838361094a565b6104b783838360405180602001604052806000815250610624565b6000818152600260205260408120546001600160a01b0316806102745760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610381565b60006001600160a01b0382166105ea5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610381565b506001600160a01b031660009081526003602052604090205490565b60606001805461028990611188565b610620338383610aea565b5050565b61062e3383610857565b61064a5760405162461bcd60e51b8152600401610381906111c3565b61065684848484610bb9565b50505050565b6000818152600260205260409020546060906001600160a01b03166106dd5760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f72206044820152703737b732bc34b9ba32b73a103a37b5b2b760791b6064820152608401610381565b600082815260066020526040812080546106f690611188565b80601f016020809104026020016040519081016040528092919081815260200182805461072290611188565b801561076f5780601f106107445761010080835404028352916020019161076f565b820191906000526020600020905b81548152906001019060200180831161075257829003601f168201915b50505050509050600061078d60408051602081019091526000815290565b90508051600014156107a0575092915050565b8151156107d25780826040516020016107ba929190611214565b60405160208183030381529060405292505050919050565b6107db84610bec565b949350505050565b3b151590565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061081e82610508565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166108d05760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610381565b60006108db83610508565b9050806001600160a01b0316846001600160a01b031614806109165750836001600160a01b031661090b8461030c565b6001600160a01b0316145b806107db57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff166107db565b826001600160a01b031661095d82610508565b6001600160a01b0316146109c55760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b6064820152608401610381565b6001600160a01b038216610a275760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610381565b610a326000826107e9565b6001600160a01b0383166000908152600360205260408120805460019290610a5b908490611259565b90915550506001600160a01b0382166000908152600360205260408120805460019290610a89908490611270565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b03161415610b4c5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610381565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610bc484848461094a565b610bd084848484610cd4565b6106565760405162461bcd60e51b815260040161038190611288565b6000818152600260205260409020546060906001600160a01b0316610c6b5760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610381565b6000610c8260408051602081019091526000815290565b90506000815111610ca25760405180602001604052806000815250610ccd565b80610cac84610dd2565b604051602001610cbd929190611214565b6040516020818303038152906040525b9392505050565b60006001600160a01b0384163b15610dc757604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610d189033908990889088906004016112da565b6020604051808303816000875af1925050508015610d53575060408051601f3d908101601f19168201909252610d5091810190611317565b60015b610dad573d808015610d81576040519150601f19603f3d011682016040523d82523d6000602084013e610d86565b606091505b508051610da55760405162461bcd60e51b815260040161038190611288565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506107db565b506001949350505050565b606081610df65750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610e205780610e0a81611334565b9150610e199050600a83611365565b9150610dfa565b60008167ffffffffffffffff811115610e3b57610e3b611063565b6040519080825280601f01601f191660200182016040528015610e65576020820181803683370190505b5090505b84156107db57610e7a600183611259565b9150610e87600a86611379565b610e92906030611270565b60f81b818381518110610ea757610ea761138d565b60200101906001600160f81b031916908160001a905350610ec9600a86611365565b9450610e69565b6001600160e01b031981168114610ee657600080fd5b50565b600060208284031215610efb57600080fd5b8135610ccd81610ed0565b60005b83811015610f21578181015183820152602001610f09565b838111156106565750506000910152565b60008151808452610f4a816020860160208601610f06565b601f01601f19169290920160200192915050565b602081526000610ccd6020830184610f32565b600060208284031215610f8357600080fd5b5035919050565b80356001600160a01b0381168114610fa157600080fd5b919050565b60008060408385031215610fb957600080fd5b610fc283610f8a565b946020939093013593505050565b600080600060608486031215610fe557600080fd5b610fee84610f8a565b9250610ffc60208501610f8a565b9150604084013590509250925092565b60006020828403121561101e57600080fd5b610ccd82610f8a565b6000806040838503121561103a57600080fd5b61104383610f8a565b91506020830135801515811461105857600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561108f57600080fd5b61109885610f8a565b93506110a660208601610f8a565b925060408501359150606085013567ffffffffffffffff808211156110ca57600080fd5b818701915087601f8301126110de57600080fd5b8135818111156110f0576110f0611063565b604051601f8201601f19908116603f0116810190838211818310171561111857611118611063565b816040528281528a602084870101111561113157600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561116857600080fd5b61117183610f8a565b915061117f60208401610f8a565b90509250929050565b600181811c9082168061119c57607f821691505b602082108114156111bd57634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b60008351611226818460208801610f06565b83519083019061123a818360208801610f06565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561126b5761126b611243565b500390565b6000821982111561128357611283611243565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061130d90830184610f32565b9695505050505050565b60006020828403121561132957600080fd5b8151610ccd81610ed0565b600060001982141561134857611348611243565b5060010190565b634e487b7160e01b600052601260045260246000fd5b6000826113745761137461134f565b500490565b6000826113885761138861134f565b500690565b634e487b7160e01b600052603260045260246000fdfea2646970667358221220368b42746a663373b46aa0d5c809d99ddbd6b54cfc9e85d7ecffce4f6053b2d964736f6c634300080a0033",
  deployedSourceMap:
    "137:278:10:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1555:300:0;;;;;;:::i;:::-;;:::i;:::-;;;565:14:11;;558:22;540:41;;528:2;513:18;1555:300:0;;;;;;;;2473:98;;;:::i;:::-;;;;;;;:::i;3984:217::-;;;;;;:::i;:::-;;:::i;:::-;;;-1:-1:-1;;;;;1692:32:11;;;1674:51;;1662:2;1647:18;3984:217:0;1528:203:11;3522:401:0;;;;;;:::i;:::-;;:::i;:::-;;4711:330;;;;;;:::i;:::-;;:::i;5107:179::-;;;;;;:::i;:::-;;:::i;2176:235::-;;;;;;:::i;:::-;;:::i;1914:205::-;;;;;;:::i;:::-;;:::i;:::-;;;2843:25:11;;;2831:2;2816:18;1914:205:0;2697:177:11;2635:102:0;;;:::i;4268:153::-;;;;;;:::i;:::-;;:::i;5352:320::-;;;;;;:::i;:::-;;:::i;467:663:3:-;;;;;;:::i;:::-;;:::i;4487:162:0:-;;;;;;:::i;:::-;-1:-1:-1;;;;;4607:25:0;;;4584:4;4607:25;;;:18;:25;;;;;;;;:35;;;;;;;;;;;;;;;4487:162;1555:300;1657:4;-1:-1:-1;;;;;;1692:40:0;;-1:-1:-1;;;1692:40:0;;:104;;-1:-1:-1;;;;;;;1748:48:0;;-1:-1:-1;;;1748:48:0;1692:104;:156;;;-1:-1:-1;;;;;;;;;;937:40:8;;;1812:36:0;1673:175;1555:300;-1:-1:-1;;1555:300:0:o;2473:98::-;2527:13;2559:5;2552:12;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2473:98;:::o;3984:217::-;4060:7;7232:16;;;:7;:16;;;;;;-1:-1:-1;;;;;7232:16:0;4079:73;;;;-1:-1:-1;;;4079:73:0;;5358:2:11;4079:73:0;;;5340:21:11;5397:2;5377:18;;;5370:30;5436:34;5416:18;;;5409:62;-1:-1:-1;;;5487:18:11;;;5480:42;5539:19;;4079:73:0;;;;;;;;;-1:-1:-1;4170:24:0;;;;:15;:24;;;;;;-1:-1:-1;;;;;4170:24:0;;3984:217::o;3522:401::-;3602:13;3618:23;3633:7;3618:14;:23::i;:::-;3602:39;;3665:5;-1:-1:-1;;;;;3659:11:0;:2;-1:-1:-1;;;;;3659:11:0;;;3651:57;;;;-1:-1:-1;;;3651:57:0;;5771:2:11;3651:57:0;;;5753:21:11;5810:2;5790:18;;;5783:30;5849:34;5829:18;;;5822:62;-1:-1:-1;;;5900:18:11;;;5893:31;5941:19;;3651:57:0;5569:397:11;3651:57:0;719:10:6;-1:-1:-1;;;;;3740:21:0;;;;:62;;-1:-1:-1;3765:37:0;3782:5;719:10:6;4487:162:0;:::i;3765:37::-;3719:165;;;;-1:-1:-1;;;3719:165:0;;6173:2:11;3719:165:0;;;6155:21:11;6212:2;6192:18;;;6185:30;6251:34;6231:18;;;6224:62;6322:26;6302:18;;;6295:54;6366:19;;3719:165:0;5971:420:11;3719:165:0;3895:21;3904:2;3908:7;3895:8;:21::i;:::-;3592:331;3522:401;;:::o;4711:330::-;4900:41;719:10:6;4933:7:0;4900:18;:41::i;:::-;4892:103;;;;-1:-1:-1;;;4892:103:0;;;;;;;:::i;:::-;5006:28;5016:4;5022:2;5026:7;5006:9;:28::i;5107:179::-;5240:39;5257:4;5263:2;5267:7;5240:39;;;;;;;;;;;;:16;:39::i;2176:235::-;2248:7;2283:16;;;:7;:16;;;;;;-1:-1:-1;;;;;2283:16:0;2317:19;2309:73;;;;-1:-1:-1;;;2309:73:0;;7016:2:11;2309:73:0;;;6998:21:11;7055:2;7035:18;;;7028:30;7094:34;7074:18;;;7067:62;-1:-1:-1;;;7145:18:11;;;7138:39;7194:19;;2309:73:0;6814:405:11;1914:205:0;1986:7;-1:-1:-1;;;;;2013:19:0;;2005:74;;;;-1:-1:-1;;;2005:74:0;;7426:2:11;2005:74:0;;;7408:21:11;7465:2;7445:18;;;7438:30;7504:34;7484:18;;;7477:62;-1:-1:-1;;;7555:18:11;;;7548:40;7605:19;;2005:74:0;7224:406:11;2005:74:0;-1:-1:-1;;;;;;2096:16:0;;;;;:9;:16;;;;;;;1914:205::o;2635:102::-;2691:13;2723:7;2716:14;;;;;:::i;4268:153::-;4362:52;719:10:6;4395:8:0;4405;4362:18;:52::i;:::-;4268:153;;:::o;5352:320::-;5521:41;719:10:6;5554:7:0;5521:18;:41::i;:::-;5513:103;;;;-1:-1:-1;;;5513:103:0;;;;;;;:::i;:::-;5626:39;5640:4;5646:2;5650:7;5659:5;5626:13;:39::i;:::-;5352:320;;;;:::o;467:663:3:-;7209:4:0;7232:16;;;:7;:16;;;;;;540:13:3;;-1:-1:-1;;;;;7232:16:0;565:78:3;;;;-1:-1:-1;;;565:78:3;;7837:2:11;565:78:3;;;7819:21:11;7876:2;7856:18;;;7849:30;7915:34;7895:18;;;7888:62;-1:-1:-1;;;7966:18:11;;;7959:47;8023:19;;565:78:3;7635:413:11;565:78:3;654:23;680:19;;;:10;:19;;;;;654:45;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;709:18;730:10;3449:9:0;;;;;;;;;-1:-1:-1;3449:9:0;;;3373:92;730:10:3;709:31;;819:4;813:18;835:1;813:23;809:70;;;-1:-1:-1;859:9:3;467:663;-1:-1:-1;;467:663:3:o;809:70::-;981:23;;:27;977:106;;1055:4;1061:9;1038:33;;;;;;;;;:::i;:::-;;;;;;;;;;;;;1024:48;;;;467:663;;;:::o;977:106::-;1100:23;1115:7;1100:14;:23::i;:::-;1093:30;467:663;-1:-1:-1;;;;467:663:3:o;771:377:5:-;1087:20;1133:8;;;771:377::o;10995:171:0:-;11069:24;;;;:15;:24;;;;;:29;;-1:-1:-1;;;;;;11069:29:0;-1:-1:-1;;;;;11069:29:0;;;;;;;;:24;;11122:23;11069:24;11122:14;:23::i;:::-;-1:-1:-1;;;;;11113:46:0;;;;;;;;;;;10995:171;;:::o;7427:344::-;7520:4;7232:16;;;:7;:16;;;;;;-1:-1:-1;;;;;7232:16:0;7536:73;;;;-1:-1:-1;;;7536:73:0;;8730:2:11;7536:73:0;;;8712:21:11;8769:2;8749:18;;;8742:30;8808:34;8788:18;;;8781:62;-1:-1:-1;;;8859:18:11;;;8852:42;8911:19;;7536:73:0;8528:408:11;7536:73:0;7619:13;7635:23;7650:7;7635:14;:23::i;:::-;7619:39;;7687:5;-1:-1:-1;;;;;7676:16:0;:7;-1:-1:-1;;;;;7676:16:0;;:51;;;;7720:7;-1:-1:-1;;;;;7696:31:0;:20;7708:7;7696:11;:20::i;:::-;-1:-1:-1;;;;;7696:31:0;;7676:51;:87;;;-1:-1:-1;;;;;;4607:25:0;;;4584:4;4607:25;;;:18;:25;;;;;;;;:35;;;;;;;;;;;;7731:32;4487:162;10324:560;10478:4;-1:-1:-1;;;;;10451:31:0;:23;10466:7;10451:14;:23::i;:::-;-1:-1:-1;;;;;10451:31:0;;10443:85;;;;-1:-1:-1;;;10443:85:0;;9143:2:11;10443:85:0;;;9125:21:11;9182:2;9162:18;;;9155:30;9221:34;9201:18;;;9194:62;-1:-1:-1;;;9272:18:11;;;9265:39;9321:19;;10443:85:0;8941:405:11;10443:85:0;-1:-1:-1;;;;;10546:16:0;;10538:65;;;;-1:-1:-1;;;10538:65:0;;9553:2:11;10538:65:0;;;9535:21:11;9592:2;9572:18;;;9565:30;9631:34;9611:18;;;9604:62;-1:-1:-1;;;9682:18:11;;;9675:34;9726:19;;10538:65:0;9351:400:11;10538:65:0;10715:29;10732:1;10736:7;10715:8;:29::i;:::-;-1:-1:-1;;;;;10755:15:0;;;;;;:9;:15;;;;;:20;;10774:1;;10755:15;:20;;10774:1;;10755:20;:::i;:::-;;;;-1:-1:-1;;;;;;;10785:13:0;;;;;;:9;:13;;;;;:18;;10802:1;;10785:13;:18;;10802:1;;10785:18;:::i;:::-;;;;-1:-1:-1;;10813:16:0;;;;:7;:16;;;;;;:21;;-1:-1:-1;;;;;;10813:21:0;-1:-1:-1;;;;;10813:21:0;;;;;;;;;10850:27;;10813:16;;10850:27;;;;;;;10324:560;;;:::o;11301:307::-;11451:8;-1:-1:-1;;;;;11442:17:0;:5;-1:-1:-1;;;;;11442:17:0;;;11434:55;;;;-1:-1:-1;;;11434:55:0;;10353:2:11;11434:55:0;;;10335:21:11;10392:2;10372:18;;;10365:30;10431:27;10411:18;;;10404:55;10476:18;;11434:55:0;10151:349:11;11434:55:0;-1:-1:-1;;;;;11499:25:0;;;;;;;:18;:25;;;;;;;;:35;;;;;;;;;;;;;:46;;-1:-1:-1;;11499:46:0;;;;;;;;;;11560:41;;540::11;;;11560::0;;513:18:11;11560:41:0;;;;;;;11301:307;;;:::o;6534:::-;6685:28;6695:4;6701:2;6705:7;6685:9;:28::i;:::-;6731:48;6754:4;6760:2;6764:7;6773:5;6731:22;:48::i;:::-;6723:111;;;;-1:-1:-1;;;6723:111:0;;;;;;;:::i;2803:329::-;7209:4;7232:16;;;:7;:16;;;;;;2876:13;;-1:-1:-1;;;;;7232:16:0;2901:76;;;;-1:-1:-1;;;2901:76:0;;11126:2:11;2901:76:0;;;11108:21:11;11165:2;11145:18;;;11138:30;11204:34;11184:18;;;11177:62;-1:-1:-1;;;11255:18:11;;;11248:45;11310:19;;2901:76:0;10924:411:11;2901:76:0;2988:21;3012:10;3449:9;;;;;;;;;-1:-1:-1;3449:9:0;;;3373:92;3012:10;2988:34;;3063:1;3045:7;3039:21;:25;:86;;;;;;;;;;;;;;;;;3091:7;3100:18;:7;:16;:18::i;:::-;3074:45;;;;;;;;;:::i;:::-;;;;;;;;;;;;;3039:86;3032:93;2803:329;-1:-1:-1;;;2803:329:0:o;12161:778::-;12311:4;-1:-1:-1;;;;;12331:13:0;;1087:20:5;1133:8;12327:606:0;;12366:72;;-1:-1:-1;;;12366:72:0;;-1:-1:-1;;;;;12366:36:0;;;;;:72;;719:10:6;;12417:4:0;;12423:7;;12432:5;;12366:72;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;-1:-1:-1;12366:72:0;;;;;;;;-1:-1:-1;;12366:72:0;;;;;;;;;;;;:::i;:::-;;;12362:519;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;12605:13:0;;12601:266;;12647:60;;-1:-1:-1;;;12647:60:0;;;;;;;:::i;12601:266::-;12819:6;12813:13;12804:6;12800:2;12796:15;12789:38;12362:519;-1:-1:-1;;;;;;12488:51:0;-1:-1:-1;;;12488:51:0;;-1:-1:-1;12481:58:0;;12327:606;-1:-1:-1;12918:4:0;12161:778;;;;;;:::o;328:703:7:-;384:13;601:10;597:51;;-1:-1:-1;;627:10:7;;;;;;;;;;;;-1:-1:-1;;;627:10:7;;;;;328:703::o;597:51::-;672:5;657:12;711:75;718:9;;711:75;;743:8;;;;:::i;:::-;;-1:-1:-1;765:10:7;;-1:-1:-1;773:2:7;765:10;;:::i;:::-;;;711:75;;;795:19;827:6;817:17;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;817:17:7;;795:39;;844:150;851:10;;844:150;;877:11;887:1;877:11;;:::i;:::-;;-1:-1:-1;945:10:7;953:2;945:5;:10;:::i;:::-;932:24;;:2;:24;:::i;:::-;919:39;;902:6;909;902:14;;;;;;;;:::i;:::-;;;;:56;-1:-1:-1;;;;;902:56:7;;;;;;;;-1:-1:-1;972:11:7;981:2;972:11;;:::i;:::-;;;844:150;;14:131:11;-1:-1:-1;;;;;;88:32:11;;78:43;;68:71;;135:1;132;125:12;68:71;14:131;:::o;150:245::-;208:6;261:2;249:9;240:7;236:23;232:32;229:52;;;277:1;274;267:12;229:52;316:9;303:23;335:30;359:5;335:30;:::i;592:258::-;664:1;674:113;688:6;685:1;682:13;674:113;;;764:11;;;758:18;745:11;;;738:39;710:2;703:10;674:113;;;805:6;802:1;799:13;796:48;;;-1:-1:-1;;840:1:11;822:16;;815:27;592:258::o;855:::-;897:3;935:5;929:12;962:6;957:3;950:19;978:63;1034:6;1027:4;1022:3;1018:14;1011:4;1004:5;1000:16;978:63;:::i;:::-;1095:2;1074:15;-1:-1:-1;;1070:29:11;1061:39;;;;1102:4;1057:50;;855:258;-1:-1:-1;;855:258:11:o;1118:220::-;1267:2;1256:9;1249:21;1230:4;1287:45;1328:2;1317:9;1313:18;1305:6;1287:45;:::i;1343:180::-;1402:6;1455:2;1443:9;1434:7;1430:23;1426:32;1423:52;;;1471:1;1468;1461:12;1423:52;-1:-1:-1;1494:23:11;;1343:180;-1:-1:-1;1343:180:11:o;1736:173::-;1804:20;;-1:-1:-1;;;;;1853:31:11;;1843:42;;1833:70;;1899:1;1896;1889:12;1833:70;1736:173;;;:::o;1914:254::-;1982:6;1990;2043:2;2031:9;2022:7;2018:23;2014:32;2011:52;;;2059:1;2056;2049:12;2011:52;2082:29;2101:9;2082:29;:::i;:::-;2072:39;2158:2;2143:18;;;;2130:32;;-1:-1:-1;;;1914:254:11:o;2173:328::-;2250:6;2258;2266;2319:2;2307:9;2298:7;2294:23;2290:32;2287:52;;;2335:1;2332;2325:12;2287:52;2358:29;2377:9;2358:29;:::i;:::-;2348:39;;2406:38;2440:2;2429:9;2425:18;2406:38;:::i;:::-;2396:48;;2491:2;2480:9;2476:18;2463:32;2453:42;;2173:328;;;;;:::o;2506:186::-;2565:6;2618:2;2606:9;2597:7;2593:23;2589:32;2586:52;;;2634:1;2631;2624:12;2586:52;2657:29;2676:9;2657:29;:::i;2879:347::-;2944:6;2952;3005:2;2993:9;2984:7;2980:23;2976:32;2973:52;;;3021:1;3018;3011:12;2973:52;3044:29;3063:9;3044:29;:::i;:::-;3034:39;;3123:2;3112:9;3108:18;3095:32;3170:5;3163:13;3156:21;3149:5;3146:32;3136:60;;3192:1;3189;3182:12;3136:60;3215:5;3205:15;;;2879:347;;;;;:::o;3231:127::-;3292:10;3287:3;3283:20;3280:1;3273:31;3323:4;3320:1;3313:15;3347:4;3344:1;3337:15;3363:1138;3458:6;3466;3474;3482;3535:3;3523:9;3514:7;3510:23;3506:33;3503:53;;;3552:1;3549;3542:12;3503:53;3575:29;3594:9;3575:29;:::i;:::-;3565:39;;3623:38;3657:2;3646:9;3642:18;3623:38;:::i;:::-;3613:48;;3708:2;3697:9;3693:18;3680:32;3670:42;;3763:2;3752:9;3748:18;3735:32;3786:18;3827:2;3819:6;3816:14;3813:34;;;3843:1;3840;3833:12;3813:34;3881:6;3870:9;3866:22;3856:32;;3926:7;3919:4;3915:2;3911:13;3907:27;3897:55;;3948:1;3945;3938:12;3897:55;3984:2;3971:16;4006:2;4002;3999:10;3996:36;;;4012:18;;:::i;:::-;4087:2;4081:9;4055:2;4141:13;;-1:-1:-1;;4137:22:11;;;4161:2;4133:31;4129:40;4117:53;;;4185:18;;;4205:22;;;4182:46;4179:72;;;4231:18;;:::i;:::-;4271:10;4267:2;4260:22;4306:2;4298:6;4291:18;4346:7;4341:2;4336;4332;4328:11;4324:20;4321:33;4318:53;;;4367:1;4364;4357:12;4318:53;4423:2;4418;4414;4410:11;4405:2;4397:6;4393:15;4380:46;4468:1;4463:2;4458;4450:6;4446:15;4442:24;4435:35;4489:6;4479:16;;;;;;;3363:1138;;;;;;;:::o;4506:260::-;4574:6;4582;4635:2;4623:9;4614:7;4610:23;4606:32;4603:52;;;4651:1;4648;4641:12;4603:52;4674:29;4693:9;4674:29;:::i;:::-;4664:39;;4722:38;4756:2;4745:9;4741:18;4722:38;:::i;:::-;4712:48;;4506:260;;;;;:::o;4771:380::-;4850:1;4846:12;;;;4893;;;4914:61;;4968:4;4960:6;4956:17;4946:27;;4914:61;5021:2;5013:6;5010:14;4990:18;4987:38;4984:161;;;5067:10;5062:3;5058:20;5055:1;5048:31;5102:4;5099:1;5092:15;5130:4;5127:1;5120:15;4984:161;;4771:380;;;:::o;6396:413::-;6598:2;6580:21;;;6637:2;6617:18;;;6610:30;6676:34;6671:2;6656:18;;6649:62;-1:-1:-1;;;6742:2:11;6727:18;;6720:47;6799:3;6784:19;;6396:413::o;8053:470::-;8232:3;8270:6;8264:13;8286:53;8332:6;8327:3;8320:4;8312:6;8308:17;8286:53;:::i;:::-;8402:13;;8361:16;;;;8424:57;8402:13;8361:16;8458:4;8446:17;;8424:57;:::i;:::-;8497:20;;8053:470;-1:-1:-1;;;;8053:470:11:o;9756:127::-;9817:10;9812:3;9808:20;9805:1;9798:31;9848:4;9845:1;9838:15;9872:4;9869:1;9862:15;9888:125;9928:4;9956:1;9953;9950:8;9947:34;;;9961:18;;:::i;:::-;-1:-1:-1;9998:9:11;;9888:125::o;10018:128::-;10058:3;10089:1;10085:6;10082:1;10079:13;10076:39;;;10095:18;;:::i;:::-;-1:-1:-1;10131:9:11;;10018:128::o;10505:414::-;10707:2;10689:21;;;10746:2;10726:18;;;10719:30;10785:34;10780:2;10765:18;;10758:62;-1:-1:-1;;;10851:2:11;10836:18;;10829:48;10909:3;10894:19;;10505:414::o;11340:489::-;-1:-1:-1;;;;;11609:15:11;;;11591:34;;11661:15;;11656:2;11641:18;;11634:43;11708:2;11693:18;;11686:34;;;11756:3;11751:2;11736:18;;11729:31;;;11534:4;;11777:46;;11803:19;;11795:6;11777:46;:::i;:::-;11769:54;11340:489;-1:-1:-1;;;;;;11340:489:11:o;11834:249::-;11903:6;11956:2;11944:9;11935:7;11931:23;11927:32;11924:52;;;11972:1;11969;11962:12;11924:52;12004:9;11998:16;12023:30;12047:5;12023:30;:::i;12088:135::-;12127:3;-1:-1:-1;;12148:17:11;;12145:43;;;12168:18;;:::i;:::-;-1:-1:-1;12215:1:11;12204:13;;12088:135::o;12228:127::-;12289:10;12284:3;12280:20;12277:1;12270:31;12320:4;12317:1;12310:15;12344:4;12341:1;12334:15;12360:120;12400:1;12426;12416:35;;12431:18;;:::i;:::-;-1:-1:-1;12465:9:11;;12360:120::o;12485:112::-;12517:1;12543;12533:35;;12548:18;;:::i;:::-;-1:-1:-1;12582:9:11;;12485:112::o;12602:127::-;12663:10;12658:3;12654:20;12651:1;12644:31;12694:4;12691:1;12684:15;12718:4;12715:1;12708:15",
  language: "Solidity",
  natspec: {
    kind: "dev",
    methods: {
      "approve(address,uint256)": {
        details: "See {IERC721-approve}.",
      },
      "balanceOf(address)": {
        details: "See {IERC721-balanceOf}.",
      },
      "getApproved(uint256)": {
        details: "See {IERC721-getApproved}.",
      },
      "isApprovedForAll(address,address)": {
        details: "See {IERC721-isApprovedForAll}.",
      },
      "name()": {
        details: "See {IERC721Metadata-name}.",
      },
      "ownerOf(uint256)": {
        details: "See {IERC721-ownerOf}.",
      },
      "safeTransferFrom(address,address,uint256)": {
        details: "See {IERC721-safeTransferFrom}.",
      },
      "safeTransferFrom(address,address,uint256,bytes)": {
        details: "See {IERC721-safeTransferFrom}.",
      },
      "setApprovalForAll(address,bool)": {
        details: "See {IERC721-setApprovalForAll}.",
      },
      "supportsInterface(bytes4)": {
        details: "See {IERC165-supportsInterface}.",
      },
      "symbol()": {
        details: "See {IERC721Metadata-symbol}.",
      },
      "tokenURI(uint256)": {
        details: "See {IERC721Metadata-tokenURI}.",
      },
      "transferFrom(address,address,uint256)": {
        details: "See {IERC721-transferFrom}.",
      },
    },
    version: 1,
  },
  offset: [137, 415],
  opcodes:
    "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0xCF JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x6352211E GT PUSH2 0x8C JUMPI DUP1 PUSH4 0xA22CB465 GT PUSH2 0x66 JUMPI DUP1 PUSH4 0xA22CB465 EQ PUSH2 0x1B3 JUMPI DUP1 PUSH4 0xB88D4FDE EQ PUSH2 0x1C6 JUMPI DUP1 PUSH4 0xC87B56DD EQ PUSH2 0x1D9 JUMPI DUP1 PUSH4 0xE985E9C5 EQ PUSH2 0x1EC JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x6352211E EQ PUSH2 0x177 JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0x18A JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x1AB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x1FFC9A7 EQ PUSH2 0xD4 JUMPI DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0xFC JUMPI DUP1 PUSH4 0x81812FC EQ PUSH2 0x111 JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0x13C JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0x151 JUMPI DUP1 PUSH4 0x42842E0E EQ PUSH2 0x164 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xE7 PUSH2 0xE2 CALLDATASIZE PUSH1 0x4 PUSH2 0xEE9 JUMP JUMPDEST PUSH2 0x228 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x104 PUSH2 0x27A JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0xF3 SWAP2 SWAP1 PUSH2 0xF5E JUMP JUMPDEST PUSH2 0x124 PUSH2 0x11F CALLDATASIZE PUSH1 0x4 PUSH2 0xF71 JUMP JUMPDEST PUSH2 0x30C JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0xF3 JUMP JUMPDEST PUSH2 0x14F PUSH2 0x14A CALLDATASIZE PUSH1 0x4 PUSH2 0xFA6 JUMP JUMPDEST PUSH2 0x3A6 JUMP JUMPDEST STOP JUMPDEST PUSH2 0x14F PUSH2 0x15F CALLDATASIZE PUSH1 0x4 PUSH2 0xFD0 JUMP JUMPDEST PUSH2 0x4BC JUMP JUMPDEST PUSH2 0x14F PUSH2 0x172 CALLDATASIZE PUSH1 0x4 PUSH2 0xFD0 JUMP JUMPDEST PUSH2 0x4ED JUMP JUMPDEST PUSH2 0x124 PUSH2 0x185 CALLDATASIZE PUSH1 0x4 PUSH2 0xF71 JUMP JUMPDEST PUSH2 0x508 JUMP JUMPDEST PUSH2 0x19D PUSH2 0x198 CALLDATASIZE PUSH1 0x4 PUSH2 0x100C JUMP JUMPDEST PUSH2 0x57F JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0xF3 JUMP JUMPDEST PUSH2 0x104 PUSH2 0x606 JUMP JUMPDEST PUSH2 0x14F PUSH2 0x1C1 CALLDATASIZE PUSH1 0x4 PUSH2 0x1027 JUMP JUMPDEST PUSH2 0x615 JUMP JUMPDEST PUSH2 0x14F PUSH2 0x1D4 CALLDATASIZE PUSH1 0x4 PUSH2 0x1079 JUMP JUMPDEST PUSH2 0x624 JUMP JUMPDEST PUSH2 0x104 PUSH2 0x1E7 CALLDATASIZE PUSH1 0x4 PUSH2 0xF71 JUMP JUMPDEST PUSH2 0x65C JUMP JUMPDEST PUSH2 0xE7 PUSH2 0x1FA CALLDATASIZE PUSH1 0x4 PUSH2 0x1155 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP2 DUP3 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP4 SWAP1 SWAP5 AND DUP3 MSTORE SWAP2 SWAP1 SWAP2 MSTORE KECCAK256 SLOAD PUSH1 0xFF AND SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x1 PUSH1 0xE0 SHL SUB NOT DUP3 AND PUSH4 0x80AC58CD PUSH1 0xE0 SHL EQ DUP1 PUSH2 0x259 JUMPI POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xE0 SHL SUB NOT DUP3 AND PUSH4 0x5B5E139F PUSH1 0xE0 SHL EQ JUMPDEST DUP1 PUSH2 0x274 JUMPI POP PUSH4 0x1FFC9A7 PUSH1 0xE0 SHL PUSH1 0x1 PUSH1 0x1 PUSH1 0xE0 SHL SUB NOT DUP4 AND EQ JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x60 PUSH1 0x0 DUP1 SLOAD PUSH2 0x289 SWAP1 PUSH2 0x1188 JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x2B5 SWAP1 PUSH2 0x1188 JUMP JUMPDEST DUP1 ISZERO PUSH2 0x302 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x2D7 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x302 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x2E5 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH2 0x38A JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x2C PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A20617070726F76656420717565727920666F72206E6F6E6578 PUSH1 0x44 DUP3 ADD MSTORE PUSH12 0x34B9BA32B73A103A37B5B2B7 PUSH1 0xA1 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST POP PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x4 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x3B1 DUP3 PUSH2 0x508 JUMP JUMPDEST SWAP1 POP DUP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP4 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND EQ ISZERO PUSH2 0x41F JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x21 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A20617070726F76616C20746F2063757272656E74206F776E65 PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x39 PUSH1 0xF9 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x381 JUMP JUMPDEST CALLER PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND EQ DUP1 PUSH2 0x43B JUMPI POP PUSH2 0x43B DUP2 CALLER PUSH2 0x1FA JUMP JUMPDEST PUSH2 0x4AD JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x38 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A20617070726F76652063616C6C6572206973206E6F74206F77 PUSH1 0x44 DUP3 ADD MSTORE PUSH32 0x6E6572206E6F7220617070726F76656420666F7220616C6C0000000000000000 PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x381 JUMP JUMPDEST PUSH2 0x4B7 DUP4 DUP4 PUSH2 0x7E9 JUMP JUMPDEST POP POP POP JUMP JUMPDEST PUSH2 0x4C6 CALLER DUP3 PUSH2 0x857 JUMP JUMPDEST PUSH2 0x4E2 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x381 SWAP1 PUSH2 0x11C3 JUMP JUMPDEST PUSH2 0x4B7 DUP4 DUP4 DUP4 PUSH2 0x94A JUMP JUMPDEST PUSH2 0x4B7 DUP4 DUP4 DUP4 PUSH1 0x40 MLOAD DUP1 PUSH1 0x20 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x0 DUP2 MSTORE POP PUSH2 0x624 JUMP JUMPDEST PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP1 PUSH2 0x274 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x29 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A206F776E657220717565727920666F72206E6F6E6578697374 PUSH1 0x44 DUP3 ADD MSTORE PUSH9 0x32B73A103A37B5B2B7 PUSH1 0xB9 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x381 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH2 0x5EA JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x2A PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A2062616C616E636520717565727920666F7220746865207A65 PUSH1 0x44 DUP3 ADD MSTORE PUSH10 0x726F2061646472657373 PUSH1 0xB0 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x381 JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x3 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD SWAP1 JUMP JUMPDEST PUSH1 0x60 PUSH1 0x1 DUP1 SLOAD PUSH2 0x289 SWAP1 PUSH2 0x1188 JUMP JUMPDEST PUSH2 0x620 CALLER DUP4 DUP4 PUSH2 0xAEA JUMP JUMPDEST POP POP JUMP JUMPDEST PUSH2 0x62E CALLER DUP4 PUSH2 0x857 JUMP JUMPDEST PUSH2 0x64A JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x381 SWAP1 PUSH2 0x11C3 JUMP JUMPDEST PUSH2 0x656 DUP5 DUP5 DUP5 DUP5 PUSH2 0xBB9 JUMP JUMPDEST POP POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH1 0x60 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH2 0x6DD JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x31 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524337323155524953746F726167653A2055524920717565727920666F7220 PUSH1 0x44 DUP3 ADD MSTORE PUSH17 0x3737B732BC34B9BA32B73A103A37B5B2B7 PUSH1 0x79 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x381 JUMP JUMPDEST PUSH1 0x0 DUP3 DUP2 MSTORE PUSH1 0x6 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 DUP1 SLOAD PUSH2 0x6F6 SWAP1 PUSH2 0x1188 JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x722 SWAP1 PUSH2 0x1188 JUMP JUMPDEST DUP1 ISZERO PUSH2 0x76F JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x744 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x76F JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x752 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP PUSH1 0x0 PUSH2 0x78D PUSH1 0x40 DUP1 MLOAD PUSH1 0x20 DUP2 ADD SWAP1 SWAP2 MSTORE PUSH1 0x0 DUP2 MSTORE SWAP1 JUMP JUMPDEST SWAP1 POP DUP1 MLOAD PUSH1 0x0 EQ ISZERO PUSH2 0x7A0 JUMPI POP SWAP3 SWAP2 POP POP JUMP JUMPDEST DUP2 MLOAD ISZERO PUSH2 0x7D2 JUMPI DUP1 DUP3 PUSH1 0x40 MLOAD PUSH1 0x20 ADD PUSH2 0x7BA SWAP3 SWAP2 SWAP1 PUSH2 0x1214 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x20 DUP2 DUP4 SUB SUB DUP2 MSTORE SWAP1 PUSH1 0x40 MSTORE SWAP3 POP POP POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0x7DB DUP5 PUSH2 0xBEC JUMP JUMPDEST SWAP5 SWAP4 POP POP POP POP JUMP JUMPDEST EXTCODESIZE ISZERO ISZERO SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x4 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP5 AND SWAP1 DUP2 OR SWAP1 SWAP2 SSTORE DUP2 SWAP1 PUSH2 0x81E DUP3 PUSH2 0x508 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x40 MLOAD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG4 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH2 0x8D0 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x2C PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A206F70657261746F7220717565727920666F72206E6F6E6578 PUSH1 0x44 DUP3 ADD MSTORE PUSH12 0x34B9BA32B73A103A37B5B2B7 PUSH1 0xA1 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x381 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x8DB DUP4 PUSH2 0x508 JUMP JUMPDEST SWAP1 POP DUP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP5 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND EQ DUP1 PUSH2 0x916 JUMPI POP DUP4 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH2 0x90B DUP5 PUSH2 0x30C JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND EQ JUMPDEST DUP1 PUSH2 0x7DB JUMPI POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP1 DUP3 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP4 DUP9 AND DUP4 MSTORE SWAP3 SWAP1 MSTORE KECCAK256 SLOAD PUSH1 0xFF AND PUSH2 0x7DB JUMP JUMPDEST DUP3 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH2 0x95D DUP3 PUSH2 0x508 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND EQ PUSH2 0x9C5 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x29 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A207472616E73666572206F6620746F6B656E20746861742069 PUSH1 0x44 DUP3 ADD MSTORE PUSH9 0x39903737BA1037BBB7 PUSH1 0xB9 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x381 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH2 0xA27 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 DUP1 DUP3 ADD MSTORE PUSH32 0x4552433732313A207472616E7366657220746F20746865207A65726F20616464 PUSH1 0x44 DUP3 ADD MSTORE PUSH4 0x72657373 PUSH1 0xE0 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x381 JUMP JUMPDEST PUSH2 0xA32 PUSH1 0x0 DUP3 PUSH2 0x7E9 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x3 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 DUP1 SLOAD PUSH1 0x1 SWAP3 SWAP1 PUSH2 0xA5B SWAP1 DUP5 SWAP1 PUSH2 0x1259 JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x3 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 DUP1 SLOAD PUSH1 0x1 SWAP3 SWAP1 PUSH2 0xA89 SWAP1 DUP5 SWAP1 PUSH2 0x1270 JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 MSTORE PUSH1 0x40 DUP1 DUP3 KECCAK256 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP7 DUP2 AND SWAP2 DUP3 OR SWAP1 SWAP3 SSTORE SWAP2 MLOAD DUP5 SWAP4 SWAP2 DUP8 AND SWAP2 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP2 LOG4 POP POP POP JUMP JUMPDEST DUP2 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP4 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND EQ ISZERO PUSH2 0xB4C JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x19 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A20617070726F766520746F2063616C6C657200000000000000 PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x381 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 DUP2 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP5 DUP8 AND DUP1 DUP5 MSTORE SWAP5 DUP3 MSTORE SWAP2 DUP3 SWAP1 KECCAK256 DUP1 SLOAD PUSH1 0xFF NOT AND DUP7 ISZERO ISZERO SWAP1 DUP2 OR SWAP1 SWAP2 SSTORE SWAP2 MLOAD SWAP2 DUP3 MSTORE PUSH32 0x17307EAB39AB6107E8899845AD3D59BD9653F200F220920489CA2B5937696C31 SWAP2 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH2 0xBC4 DUP5 DUP5 DUP5 PUSH2 0x94A JUMP JUMPDEST PUSH2 0xBD0 DUP5 DUP5 DUP5 DUP5 PUSH2 0xCD4 JUMP JUMPDEST PUSH2 0x656 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x381 SWAP1 PUSH2 0x1288 JUMP JUMPDEST PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH1 0x60 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH2 0xC6B JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x2F PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732314D657461646174613A2055524920717565727920666F72206E6F PUSH1 0x44 DUP3 ADD MSTORE PUSH15 0x3732BC34B9BA32B73A103A37B5B2B7 PUSH1 0x89 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x381 JUMP JUMPDEST PUSH1 0x0 PUSH2 0xC82 PUSH1 0x40 DUP1 MLOAD PUSH1 0x20 DUP2 ADD SWAP1 SWAP2 MSTORE PUSH1 0x0 DUP2 MSTORE SWAP1 JUMP JUMPDEST SWAP1 POP PUSH1 0x0 DUP2 MLOAD GT PUSH2 0xCA2 JUMPI PUSH1 0x40 MLOAD DUP1 PUSH1 0x20 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x0 DUP2 MSTORE POP PUSH2 0xCCD JUMP JUMPDEST DUP1 PUSH2 0xCAC DUP5 PUSH2 0xDD2 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x20 ADD PUSH2 0xCBD SWAP3 SWAP2 SWAP1 PUSH2 0x1214 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x20 DUP2 DUP4 SUB SUB DUP2 MSTORE SWAP1 PUSH1 0x40 MSTORE JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP5 AND EXTCODESIZE ISZERO PUSH2 0xDC7 JUMPI PUSH1 0x40 MLOAD PUSH4 0xA85BD01 PUSH1 0xE1 SHL DUP2 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP6 AND SWAP1 PUSH4 0x150B7A02 SWAP1 PUSH2 0xD18 SWAP1 CALLER SWAP1 DUP10 SWAP1 DUP9 SWAP1 DUP9 SWAP1 PUSH1 0x4 ADD PUSH2 0x12DA JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 GAS CALL SWAP3 POP POP POP DUP1 ISZERO PUSH2 0xD53 JUMPI POP PUSH1 0x40 DUP1 MLOAD PUSH1 0x1F RETURNDATASIZE SWAP1 DUP2 ADD PUSH1 0x1F NOT AND DUP3 ADD SWAP1 SWAP3 MSTORE PUSH2 0xD50 SWAP2 DUP2 ADD SWAP1 PUSH2 0x1317 JUMP JUMPDEST PUSH1 0x1 JUMPDEST PUSH2 0xDAD JUMPI RETURNDATASIZE DUP1 DUP1 ISZERO PUSH2 0xD81 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0xD86 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP DUP1 MLOAD PUSH2 0xDA5 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x381 SWAP1 PUSH2 0x1288 JUMP JUMPDEST DUP1 MLOAD DUP2 PUSH1 0x20 ADD REVERT JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xE0 SHL SUB NOT AND PUSH4 0xA85BD01 PUSH1 0xE1 SHL EQ SWAP1 POP PUSH2 0x7DB JUMP JUMPDEST POP PUSH1 0x1 SWAP5 SWAP4 POP POP POP POP JUMP JUMPDEST PUSH1 0x60 DUP2 PUSH2 0xDF6 JUMPI POP POP PUSH1 0x40 DUP1 MLOAD DUP1 DUP3 ADD SWAP1 SWAP2 MSTORE PUSH1 0x1 DUP2 MSTORE PUSH1 0x3 PUSH1 0xFC SHL PUSH1 0x20 DUP3 ADD MSTORE SWAP1 JUMP JUMPDEST DUP2 PUSH1 0x0 JUMPDEST DUP2 ISZERO PUSH2 0xE20 JUMPI DUP1 PUSH2 0xE0A DUP2 PUSH2 0x1334 JUMP JUMPDEST SWAP2 POP PUSH2 0xE19 SWAP1 POP PUSH1 0xA DUP4 PUSH2 0x1365 JUMP JUMPDEST SWAP2 POP PUSH2 0xDFA JUMP JUMPDEST PUSH1 0x0 DUP2 PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0xE3B JUMPI PUSH2 0xE3B PUSH2 0x1063 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP1 DUP3 MSTORE DUP1 PUSH1 0x1F ADD PUSH1 0x1F NOT AND PUSH1 0x20 ADD DUP3 ADD PUSH1 0x40 MSTORE DUP1 ISZERO PUSH2 0xE65 JUMPI PUSH1 0x20 DUP3 ADD DUP2 DUP1 CALLDATASIZE DUP4 CALLDATACOPY ADD SWAP1 POP JUMPDEST POP SWAP1 POP JUMPDEST DUP5 ISZERO PUSH2 0x7DB JUMPI PUSH2 0xE7A PUSH1 0x1 DUP4 PUSH2 0x1259 JUMP JUMPDEST SWAP2 POP PUSH2 0xE87 PUSH1 0xA DUP7 PUSH2 0x1379 JUMP JUMPDEST PUSH2 0xE92 SWAP1 PUSH1 0x30 PUSH2 0x1270 JUMP JUMPDEST PUSH1 0xF8 SHL DUP2 DUP4 DUP2 MLOAD DUP2 LT PUSH2 0xEA7 JUMPI PUSH2 0xEA7 PUSH2 0x138D JUMP JUMPDEST PUSH1 0x20 ADD ADD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xF8 SHL SUB NOT AND SWAP1 DUP2 PUSH1 0x0 BYTE SWAP1 MSTORE8 POP PUSH2 0xEC9 PUSH1 0xA DUP7 PUSH2 0x1365 JUMP JUMPDEST SWAP5 POP PUSH2 0xE69 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xE0 SHL SUB NOT DUP2 AND DUP2 EQ PUSH2 0xEE6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xEFB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 CALLDATALOAD PUSH2 0xCCD DUP2 PUSH2 0xED0 JUMP JUMPDEST PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0xF21 JUMPI DUP2 DUP2 ADD MLOAD DUP4 DUP3 ADD MSTORE PUSH1 0x20 ADD PUSH2 0xF09 JUMP JUMPDEST DUP4 DUP2 GT ISZERO PUSH2 0x656 JUMPI POP POP PUSH1 0x0 SWAP2 ADD MSTORE JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD DUP1 DUP5 MSTORE PUSH2 0xF4A DUP2 PUSH1 0x20 DUP7 ADD PUSH1 0x20 DUP7 ADD PUSH2 0xF06 JUMP JUMPDEST PUSH1 0x1F ADD PUSH1 0x1F NOT AND SWAP3 SWAP1 SWAP3 ADD PUSH1 0x20 ADD SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x20 DUP2 MSTORE PUSH1 0x0 PUSH2 0xCCD PUSH1 0x20 DUP4 ADD DUP5 PUSH2 0xF32 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xF83 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD SWAP2 SWAP1 POP JUMP JUMPDEST DUP1 CALLDATALOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 EQ PUSH2 0xFA1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0xFB9 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xFC2 DUP4 PUSH2 0xF8A JUMP JUMPDEST SWAP5 PUSH1 0x20 SWAP4 SWAP1 SWAP4 ADD CALLDATALOAD SWAP4 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0x60 DUP5 DUP7 SUB SLT ISZERO PUSH2 0xFE5 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xFEE DUP5 PUSH2 0xF8A JUMP JUMPDEST SWAP3 POP PUSH2 0xFFC PUSH1 0x20 DUP6 ADD PUSH2 0xF8A JUMP JUMPDEST SWAP2 POP PUSH1 0x40 DUP5 ADD CALLDATALOAD SWAP1 POP SWAP3 POP SWAP3 POP SWAP3 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x101E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xCCD DUP3 PUSH2 0xF8A JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x103A JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x1043 DUP4 PUSH2 0xF8A JUMP JUMPDEST SWAP2 POP PUSH1 0x20 DUP4 ADD CALLDATALOAD DUP1 ISZERO ISZERO DUP2 EQ PUSH2 0x1058 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 SWAP2 POP POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP1 PUSH1 0x80 DUP6 DUP8 SUB SLT ISZERO PUSH2 0x108F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x1098 DUP6 PUSH2 0xF8A JUMP JUMPDEST SWAP4 POP PUSH2 0x10A6 PUSH1 0x20 DUP7 ADD PUSH2 0xF8A JUMP JUMPDEST SWAP3 POP PUSH1 0x40 DUP6 ADD CALLDATALOAD SWAP2 POP PUSH1 0x60 DUP6 ADD CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP1 DUP3 GT ISZERO PUSH2 0x10CA JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 DUP8 ADD SWAP2 POP DUP8 PUSH1 0x1F DUP4 ADD SLT PUSH2 0x10DE JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 CALLDATALOAD DUP2 DUP2 GT ISZERO PUSH2 0x10F0 JUMPI PUSH2 0x10F0 PUSH2 0x1063 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x1F DUP3 ADD PUSH1 0x1F NOT SWAP1 DUP2 AND PUSH1 0x3F ADD AND DUP2 ADD SWAP1 DUP4 DUP3 GT DUP2 DUP4 LT OR ISZERO PUSH2 0x1118 JUMPI PUSH2 0x1118 PUSH2 0x1063 JUMP JUMPDEST DUP2 PUSH1 0x40 MSTORE DUP3 DUP2 MSTORE DUP11 PUSH1 0x20 DUP5 DUP8 ADD ADD GT ISZERO PUSH2 0x1131 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP3 PUSH1 0x20 DUP7 ADD PUSH1 0x20 DUP4 ADD CALLDATACOPY PUSH1 0x0 PUSH1 0x20 DUP5 DUP4 ADD ADD MSTORE DUP1 SWAP6 POP POP POP POP POP POP SWAP3 SWAP6 SWAP2 SWAP5 POP SWAP3 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x1168 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x1171 DUP4 PUSH2 0xF8A JUMP JUMPDEST SWAP2 POP PUSH2 0x117F PUSH1 0x20 DUP5 ADD PUSH2 0xF8A JUMP JUMPDEST SWAP1 POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x1 DUP2 DUP2 SHR SWAP1 DUP3 AND DUP1 PUSH2 0x119C JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH2 0x11BD JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x20 DUP1 DUP3 MSTORE PUSH1 0x31 SWAP1 DUP3 ADD MSTORE PUSH32 0x4552433732313A207472616E736665722063616C6C6572206973206E6F74206F PUSH1 0x40 DUP3 ADD MSTORE PUSH17 0x1DDB995C881B9BDC88185C1C1C9BDD9959 PUSH1 0x7A SHL PUSH1 0x60 DUP3 ADD MSTORE PUSH1 0x80 ADD SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP4 MLOAD PUSH2 0x1226 DUP2 DUP5 PUSH1 0x20 DUP9 ADD PUSH2 0xF06 JUMP JUMPDEST DUP4 MLOAD SWAP1 DUP4 ADD SWAP1 PUSH2 0x123A DUP2 DUP4 PUSH1 0x20 DUP9 ADD PUSH2 0xF06 JUMP JUMPDEST ADD SWAP5 SWAP4 POP POP POP POP JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP3 DUP3 LT ISZERO PUSH2 0x126B JUMPI PUSH2 0x126B PUSH2 0x1243 JUMP JUMPDEST POP SUB SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP3 NOT DUP3 GT ISZERO PUSH2 0x1283 JUMPI PUSH2 0x1283 PUSH2 0x1243 JUMP JUMPDEST POP ADD SWAP1 JUMP JUMPDEST PUSH1 0x20 DUP1 DUP3 MSTORE PUSH1 0x32 SWAP1 DUP3 ADD MSTORE PUSH32 0x4552433732313A207472616E7366657220746F206E6F6E204552433732315265 PUSH1 0x40 DUP3 ADD MSTORE PUSH18 0x31B2B4BB32B91034B6B83632B6B2B73A32B9 PUSH1 0x71 SHL PUSH1 0x60 DUP3 ADD MSTORE PUSH1 0x80 ADD SWAP1 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP6 DUP2 AND DUP3 MSTORE DUP5 AND PUSH1 0x20 DUP3 ADD MSTORE PUSH1 0x40 DUP2 ADD DUP4 SWAP1 MSTORE PUSH1 0x80 PUSH1 0x60 DUP3 ADD DUP2 SWAP1 MSTORE PUSH1 0x0 SWAP1 PUSH2 0x130D SWAP1 DUP4 ADD DUP5 PUSH2 0xF32 JUMP JUMPDEST SWAP7 SWAP6 POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x1329 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 MLOAD PUSH2 0xCCD DUP2 PUSH2 0xED0 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x0 NOT DUP3 EQ ISZERO PUSH2 0x1348 JUMPI PUSH2 0x1348 PUSH2 0x1243 JUMP JUMPDEST POP PUSH1 0x1 ADD SWAP1 JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x12 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP3 PUSH2 0x1374 JUMPI PUSH2 0x1374 PUSH2 0x134F JUMP JUMPDEST POP DIV SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH2 0x1388 JUMPI PUSH2 0x1388 PUSH2 0x134F JUMP JUMPDEST POP MOD SWAP1 JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x32 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 CALLDATASIZE DUP12 TIMESTAMP PUSH21 0x6A663373B46AA0D5C809D99DDBD6B54CFC9E85D7EC SELFDESTRUCT 0xCE 0x4F PUSH1 0x53 0xB2 0xD9 PUSH5 0x736F6C6343 STOP ADDMOD EXP STOP CALLER ",
  pcMap: {
    0: {
      offset: [137, 415],
      op: "PUSH1",
      path: "10",
      value: "0x80",
    },
    2: {
      fn: null,
      offset: [137, 415],
      op: "PUSH1",
      path: "10",
      value: "0x40",
    },
    4: {
      fn: null,
      offset: [137, 415],
      op: "MSTORE",
      path: "10",
    },
    5: {
      fn: null,
      offset: [137, 415],
      op: "CALLVALUE",
      path: "10",
    },
    6: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    7: {
      fn: null,
      offset: [137, 415],
      op: "ISZERO",
      path: "10",
    },
    8: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0x10",
    },
    11: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    12: {
      fn: null,
      offset: [137, 415],
      op: "PUSH1",
      path: "10",
      value: "0x0",
    },
    14: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    15: {
      dev: "Cannot send ether to nonpayable function",
      fn: null,
      offset: [137, 415],
      op: "REVERT",
      path: "10",
    },
    16: {
      fn: null,
      offset: [137, 415],
      op: "JUMPDEST",
      path: "10",
    },
    17: {
      fn: null,
      offset: [137, 415],
      op: "POP",
      path: "10",
    },
    18: {
      fn: null,
      offset: [137, 415],
      op: "PUSH1",
      path: "10",
      value: "0x4",
    },
    20: {
      fn: null,
      offset: [137, 415],
      op: "CALLDATASIZE",
      path: "10",
    },
    21: {
      fn: null,
      offset: [137, 415],
      op: "LT",
      path: "10",
    },
    22: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0xCF",
    },
    25: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    26: {
      fn: null,
      offset: [137, 415],
      op: "PUSH1",
      path: "10",
      value: "0x0",
    },
    28: {
      fn: null,
      offset: [137, 415],
      op: "CALLDATALOAD",
      path: "10",
    },
    29: {
      fn: null,
      offset: [137, 415],
      op: "PUSH1",
      path: "10",
      value: "0xE0",
    },
    31: {
      fn: null,
      offset: [137, 415],
      op: "SHR",
      path: "10",
    },
    32: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    33: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0x6352211E",
    },
    38: {
      fn: null,
      offset: [137, 415],
      op: "GT",
      path: "10",
    },
    39: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0x8C",
    },
    42: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    43: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    44: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0xA22CB465",
    },
    49: {
      fn: null,
      offset: [137, 415],
      op: "GT",
      path: "10",
    },
    50: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0x66",
    },
    53: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    54: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    55: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0xA22CB465",
    },
    60: {
      fn: null,
      offset: [137, 415],
      op: "EQ",
      path: "10",
    },
    61: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0x1B3",
    },
    64: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    65: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    66: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0xB88D4FDE",
    },
    71: {
      fn: null,
      offset: [137, 415],
      op: "EQ",
      path: "10",
    },
    72: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0x1C6",
    },
    75: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    76: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    77: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0xC87B56DD",
    },
    82: {
      fn: null,
      offset: [137, 415],
      op: "EQ",
      path: "10",
    },
    83: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0x1D9",
    },
    86: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    87: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    88: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0xE985E9C5",
    },
    93: {
      fn: null,
      offset: [137, 415],
      op: "EQ",
      path: "10",
    },
    94: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0x1EC",
    },
    97: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    98: {
      fn: null,
      offset: [137, 415],
      op: "PUSH1",
      path: "10",
      value: "0x0",
    },
    100: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    101: {
      fn: null,
      offset: [137, 415],
      op: "REVERT",
      path: "10",
    },
    102: {
      fn: null,
      offset: [137, 415],
      op: "JUMPDEST",
      path: "10",
    },
    103: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    104: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0x6352211E",
    },
    109: {
      fn: null,
      offset: [137, 415],
      op: "EQ",
      path: "10",
    },
    110: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0x177",
    },
    113: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    114: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    115: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0x70A08231",
    },
    120: {
      fn: null,
      offset: [137, 415],
      op: "EQ",
      path: "10",
    },
    121: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0x18A",
    },
    124: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    125: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    126: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0x95D89B41",
    },
    131: {
      fn: null,
      offset: [137, 415],
      op: "EQ",
      path: "10",
    },
    132: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0x1AB",
    },
    135: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    136: {
      fn: null,
      offset: [137, 415],
      op: "PUSH1",
      path: "10",
      value: "0x0",
    },
    138: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    139: {
      fn: null,
      offset: [137, 415],
      op: "REVERT",
      path: "10",
    },
    140: {
      fn: null,
      offset: [137, 415],
      op: "JUMPDEST",
      path: "10",
    },
    141: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    142: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0x1FFC9A7",
    },
    147: {
      fn: null,
      offset: [137, 415],
      op: "EQ",
      path: "10",
    },
    148: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0xD4",
    },
    151: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    152: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    153: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0x6FDDE03",
    },
    158: {
      fn: null,
      offset: [137, 415],
      op: "EQ",
      path: "10",
    },
    159: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0xFC",
    },
    162: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    163: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    164: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0x81812FC",
    },
    169: {
      fn: null,
      offset: [137, 415],
      op: "EQ",
      path: "10",
    },
    170: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0x111",
    },
    173: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    174: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    175: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0x95EA7B3",
    },
    180: {
      fn: null,
      offset: [137, 415],
      op: "EQ",
      path: "10",
    },
    181: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0x13C",
    },
    184: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    185: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    186: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0x23B872DD",
    },
    191: {
      fn: null,
      offset: [137, 415],
      op: "EQ",
      path: "10",
    },
    192: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0x151",
    },
    195: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    196: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    197: {
      fn: null,
      offset: [137, 415],
      op: "PUSH4",
      path: "10",
      value: "0x42842E0E",
    },
    202: {
      fn: null,
      offset: [137, 415],
      op: "EQ",
      path: "10",
    },
    203: {
      fn: null,
      offset: [137, 415],
      op: "PUSH2",
      path: "10",
      value: "0x164",
    },
    206: {
      fn: null,
      offset: [137, 415],
      op: "JUMPI",
      path: "10",
    },
    207: {
      fn: null,
      offset: [137, 415],
      op: "JUMPDEST",
      path: "10",
    },
    208: {
      fn: null,
      offset: [137, 415],
      op: "PUSH1",
      path: "10",
      value: "0x0",
    },
    210: {
      fn: null,
      offset: [137, 415],
      op: "DUP1",
      path: "10",
    },
    211: {
      first_revert: true,
      fn: null,
      offset: [137, 415],
      op: "REVERT",
      path: "10",
    },
    212: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "JUMPDEST",
      path: "0",
    },
    213: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "PUSH2",
      path: "0",
      value: "0xE7",
    },
    216: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "PUSH2",
      path: "0",
      value: "0xE2",
    },
    219: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "CALLDATASIZE",
      path: "0",
    },
    220: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    222: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "PUSH2",
      path: "0",
      value: "0xEE9",
    },
    225: {
      fn: "ERC721.supportsInterface",
      jump: "i",
      offset: [1555, 1855],
      op: "JUMP",
      path: "0",
    },
    226: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "JUMPDEST",
      path: "0",
    },
    227: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "PUSH2",
      path: "0",
      value: "0x228",
    },
    230: {
      fn: "ERC721.supportsInterface",
      jump: "i",
      offset: [1555, 1855],
      op: "JUMP",
      path: "0",
    },
    231: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "JUMPDEST",
      path: "0",
    },
    232: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    234: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "MLOAD",
      path: "0",
    },
    235: {
      op: "SWAP1",
    },
    236: {
      op: "ISZERO",
    },
    237: {
      op: "ISZERO",
    },
    238: {
      op: "DUP2",
    },
    239: {
      op: "MSTORE",
    },
    240: {
      op: "PUSH1",
      value: "0x20",
    },
    242: {
      op: "ADD",
    },
    243: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "JUMPDEST",
      path: "0",
    },
    244: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    246: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "MLOAD",
      path: "0",
    },
    247: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "DUP1",
      path: "0",
    },
    248: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "SWAP2",
      path: "0",
    },
    249: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "SUB",
      path: "0",
    },
    250: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "SWAP1",
      path: "0",
    },
    251: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "RETURN",
      path: "0",
    },
    252: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "JUMPDEST",
      path: "0",
    },
    253: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "PUSH2",
      path: "0",
      value: "0x104",
    },
    256: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "PUSH2",
      path: "0",
      value: "0x27A",
    },
    259: {
      fn: "ERC721.name",
      jump: "i",
      offset: [2473, 2571],
      op: "JUMP",
      path: "0",
    },
    260: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "JUMPDEST",
      path: "0",
    },
    261: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    263: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "MLOAD",
      path: "0",
    },
    264: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "PUSH2",
      path: "0",
      value: "0xF3",
    },
    267: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "SWAP2",
      path: "0",
    },
    268: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "SWAP1",
      path: "0",
    },
    269: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "PUSH2",
      path: "0",
      value: "0xF5E",
    },
    272: {
      fn: "ERC721.name",
      jump: "i",
      offset: [2473, 2571],
      op: "JUMP",
      path: "0",
    },
    273: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "JUMPDEST",
      path: "0",
    },
    274: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "PUSH2",
      path: "0",
      value: "0x124",
    },
    277: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "PUSH2",
      path: "0",
      value: "0x11F",
    },
    280: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "CALLDATASIZE",
      path: "0",
    },
    281: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    283: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "PUSH2",
      path: "0",
      value: "0xF71",
    },
    286: {
      fn: "ERC721.getApproved",
      jump: "i",
      offset: [3984, 4201],
      op: "JUMP",
      path: "0",
    },
    287: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "JUMPDEST",
      path: "0",
    },
    288: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "PUSH2",
      path: "0",
      value: "0x30C",
    },
    291: {
      fn: "ERC721.getApproved",
      jump: "i",
      offset: [3984, 4201],
      op: "JUMP",
      path: "0",
    },
    292: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "JUMPDEST",
      path: "0",
    },
    293: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    295: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "MLOAD",
      path: "0",
    },
    296: {
      op: "PUSH1",
      value: "0x1",
    },
    298: {
      op: "PUSH1",
      value: "0x1",
    },
    300: {
      op: "PUSH1",
      value: "0xA0",
    },
    302: {
      op: "SHL",
    },
    303: {
      op: "SUB",
    },
    304: {
      op: "SWAP1",
    },
    305: {
      op: "SWAP2",
    },
    306: {
      op: "AND",
    },
    307: {
      op: "DUP2",
    },
    308: {
      op: "MSTORE",
    },
    309: {
      op: "PUSH1",
      value: "0x20",
    },
    311: {
      op: "ADD",
    },
    312: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "PUSH2",
      path: "0",
      value: "0xF3",
    },
    315: {
      op: "JUMP",
    },
    316: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "JUMPDEST",
      path: "0",
    },
    317: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "PUSH2",
      path: "0",
      value: "0x14F",
    },
    320: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "PUSH2",
      path: "0",
      value: "0x14A",
    },
    323: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "CALLDATASIZE",
      path: "0",
    },
    324: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    326: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "PUSH2",
      path: "0",
      value: "0xFA6",
    },
    329: {
      fn: "ERC721.approve",
      jump: "i",
      offset: [3522, 3923],
      op: "JUMP",
      path: "0",
    },
    330: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "JUMPDEST",
      path: "0",
    },
    331: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "PUSH2",
      path: "0",
      value: "0x3A6",
    },
    334: {
      fn: "ERC721.approve",
      jump: "i",
      offset: [3522, 3923],
      op: "JUMP",
      path: "0",
    },
    335: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "JUMPDEST",
      path: "0",
    },
    336: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "STOP",
      path: "0",
    },
    337: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "JUMPDEST",
      path: "0",
    },
    338: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "PUSH2",
      path: "0",
      value: "0x14F",
    },
    341: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "PUSH2",
      path: "0",
      value: "0x15F",
    },
    344: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "CALLDATASIZE",
      path: "0",
    },
    345: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    347: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "PUSH2",
      path: "0",
      value: "0xFD0",
    },
    350: {
      fn: "ERC721.transferFrom",
      jump: "i",
      offset: [4711, 5041],
      op: "JUMP",
      path: "0",
    },
    351: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "JUMPDEST",
      path: "0",
    },
    352: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "PUSH2",
      path: "0",
      value: "0x4BC",
    },
    355: {
      fn: "ERC721.transferFrom",
      jump: "i",
      offset: [4711, 5041],
      op: "JUMP",
      path: "0",
    },
    356: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "JUMPDEST",
      path: "0",
    },
    357: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "PUSH2",
      path: "0",
      value: "0x14F",
    },
    360: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "PUSH2",
      path: "0",
      value: "0x172",
    },
    363: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "CALLDATASIZE",
      path: "0",
    },
    364: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    366: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "PUSH2",
      path: "0",
      value: "0xFD0",
    },
    369: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5107, 5286],
      op: "JUMP",
      path: "0",
    },
    370: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "JUMPDEST",
      path: "0",
    },
    371: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "PUSH2",
      path: "0",
      value: "0x4ED",
    },
    374: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5107, 5286],
      op: "JUMP",
      path: "0",
    },
    375: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "JUMPDEST",
      path: "0",
    },
    376: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "PUSH2",
      path: "0",
      value: "0x124",
    },
    379: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "PUSH2",
      path: "0",
      value: "0x185",
    },
    382: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "CALLDATASIZE",
      path: "0",
    },
    383: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    385: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "PUSH2",
      path: "0",
      value: "0xF71",
    },
    388: {
      fn: "ERC721.ownerOf",
      jump: "i",
      offset: [2176, 2411],
      op: "JUMP",
      path: "0",
    },
    389: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "JUMPDEST",
      path: "0",
    },
    390: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "PUSH2",
      path: "0",
      value: "0x508",
    },
    393: {
      fn: "ERC721.ownerOf",
      jump: "i",
      offset: [2176, 2411],
      op: "JUMP",
      path: "0",
    },
    394: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "JUMPDEST",
      path: "0",
    },
    395: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "PUSH2",
      path: "0",
      value: "0x19D",
    },
    398: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "PUSH2",
      path: "0",
      value: "0x198",
    },
    401: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "CALLDATASIZE",
      path: "0",
    },
    402: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    404: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "PUSH2",
      path: "0",
      value: "0x100C",
    },
    407: {
      fn: "ERC721.balanceOf",
      jump: "i",
      offset: [1914, 2119],
      op: "JUMP",
      path: "0",
    },
    408: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "JUMPDEST",
      path: "0",
    },
    409: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "PUSH2",
      path: "0",
      value: "0x57F",
    },
    412: {
      fn: "ERC721.balanceOf",
      jump: "i",
      offset: [1914, 2119],
      op: "JUMP",
      path: "0",
    },
    413: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "JUMPDEST",
      path: "0",
    },
    414: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    416: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "MLOAD",
      path: "0",
    },
    417: {
      op: "SWAP1",
    },
    418: {
      op: "DUP2",
    },
    419: {
      op: "MSTORE",
    },
    420: {
      op: "PUSH1",
      value: "0x20",
    },
    422: {
      op: "ADD",
    },
    423: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "PUSH2",
      path: "0",
      value: "0xF3",
    },
    426: {
      op: "JUMP",
    },
    427: {
      fn: "ERC721.symbol",
      offset: [2635, 2737],
      op: "JUMPDEST",
      path: "0",
    },
    428: {
      fn: "ERC721.symbol",
      offset: [2635, 2737],
      op: "PUSH2",
      path: "0",
      value: "0x104",
    },
    431: {
      fn: "ERC721.symbol",
      offset: [2635, 2737],
      op: "PUSH2",
      path: "0",
      value: "0x606",
    },
    434: {
      fn: "ERC721.symbol",
      jump: "i",
      offset: [2635, 2737],
      op: "JUMP",
      path: "0",
    },
    435: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "JUMPDEST",
      path: "0",
    },
    436: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "PUSH2",
      path: "0",
      value: "0x14F",
    },
    439: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "PUSH2",
      path: "0",
      value: "0x1C1",
    },
    442: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "CALLDATASIZE",
      path: "0",
    },
    443: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    445: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "PUSH2",
      path: "0",
      value: "0x1027",
    },
    448: {
      fn: "ERC721.setApprovalForAll",
      jump: "i",
      offset: [4268, 4421],
      op: "JUMP",
      path: "0",
    },
    449: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "JUMPDEST",
      path: "0",
    },
    450: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "PUSH2",
      path: "0",
      value: "0x615",
    },
    453: {
      fn: "ERC721.setApprovalForAll",
      jump: "i",
      offset: [4268, 4421],
      op: "JUMP",
      path: "0",
    },
    454: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "JUMPDEST",
      path: "0",
    },
    455: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "PUSH2",
      path: "0",
      value: "0x14F",
    },
    458: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "PUSH2",
      path: "0",
      value: "0x1D4",
    },
    461: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "CALLDATASIZE",
      path: "0",
    },
    462: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    464: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "PUSH2",
      path: "0",
      value: "0x1079",
    },
    467: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5352, 5672],
      op: "JUMP",
      path: "0",
    },
    468: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "JUMPDEST",
      path: "0",
    },
    469: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "PUSH2",
      path: "0",
      value: "0x624",
    },
    472: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5352, 5672],
      op: "JUMP",
      path: "0",
    },
    473: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "JUMPDEST",
      path: "3",
    },
    474: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "PUSH2",
      path: "3",
      value: "0x104",
    },
    477: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "PUSH2",
      path: "3",
      value: "0x1E7",
    },
    480: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "CALLDATASIZE",
      path: "3",
    },
    481: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "PUSH1",
      path: "3",
      value: "0x4",
    },
    483: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "PUSH2",
      path: "3",
      value: "0xF71",
    },
    486: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "i",
      offset: [467, 1130],
      op: "JUMP",
      path: "3",
    },
    487: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "JUMPDEST",
      path: "3",
    },
    488: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "PUSH2",
      path: "3",
      value: "0x65C",
    },
    491: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "i",
      offset: [467, 1130],
      op: "JUMP",
      path: "3",
    },
    492: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "JUMPDEST",
      path: "0",
    },
    493: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "PUSH2",
      path: "0",
      value: "0xE7",
    },
    496: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "PUSH2",
      path: "0",
      value: "0x1FA",
    },
    499: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "CALLDATASIZE",
      path: "0",
    },
    500: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    502: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "PUSH2",
      path: "0",
      value: "0x1155",
    },
    505: {
      fn: "ERC721.isApprovedForAll",
      jump: "i",
      offset: [4487, 4649],
      op: "JUMP",
      path: "0",
    },
    506: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "JUMPDEST",
      path: "0",
    },
    507: {
      op: "PUSH1",
      value: "0x1",
    },
    509: {
      op: "PUSH1",
      value: "0x1",
    },
    511: {
      op: "PUSH1",
      value: "0xA0",
    },
    513: {
      op: "SHL",
    },
    514: {
      op: "SUB",
    },
    515: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "SWAP2",
      path: "0",
      statement: 0,
    },
    516: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP3",
      path: "0",
    },
    517: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "AND",
      path: "0",
    },
    518: {
      fn: "ERC721.isApprovedForAll",
      offset: [4584, 4588],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    520: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "SWAP1",
      path: "0",
    },
    521: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP2",
      path: "0",
    },
    522: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "MSTORE",
      path: "0",
    },
    523: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4625],
      op: "PUSH1",
      path: "0",
      value: "0x5",
    },
    525: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    527: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "SWAP1",
      path: "0",
    },
    528: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP2",
      path: "0",
    },
    529: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "MSTORE",
      path: "0",
    },
    530: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    532: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP1",
      path: "0",
    },
    533: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP4",
      path: "0",
    },
    534: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "KECCAK256",
      path: "0",
    },
    535: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP4",
      path: "0",
    },
    536: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP1",
      path: "0",
    },
    537: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP5",
      path: "0",
    },
    538: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "AND",
      path: "0",
    },
    539: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "DUP3",
      path: "0",
    },
    540: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "MSTORE",
      path: "0",
    },
    541: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP2",
      path: "0",
    },
    542: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP1",
      path: "0",
    },
    543: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP2",
      path: "0",
    },
    544: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "MSTORE",
      path: "0",
    },
    545: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "KECCAK256",
      path: "0",
    },
    546: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SLOAD",
      path: "0",
    },
    547: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "PUSH1",
      path: "0",
      value: "0xFF",
    },
    549: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "AND",
      path: "0",
    },
    550: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP1",
      path: "0",
    },
    551: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "JUMP",
      path: "0",
    },
    552: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "JUMPDEST",
      path: "0",
    },
    553: {
      fn: "ERC721.supportsInterface",
      offset: [1657, 1661],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    555: {
      op: "PUSH1",
      value: "0x1",
    },
    557: {
      op: "PUSH1",
      value: "0x1",
    },
    559: {
      op: "PUSH1",
      value: "0xE0",
    },
    561: {
      op: "SHL",
    },
    562: {
      op: "SUB",
    },
    563: {
      op: "NOT",
    },
    564: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1732],
      op: "DUP3",
      path: "0",
      statement: 1,
    },
    565: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1732],
      op: "AND",
      path: "0",
    },
    566: {
      op: "PUSH4",
      value: "0x80AC58CD",
    },
    571: {
      op: "PUSH1",
      value: "0xE0",
    },
    573: {
      op: "SHL",
    },
    574: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1732],
      op: "EQ",
      path: "0",
    },
    575: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1732],
      op: "DUP1",
      path: "0",
    },
    576: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1796],
      op: "PUSH2",
      path: "0",
      value: "0x259",
    },
    579: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1796],
      op: "JUMPI",
      path: "0",
    },
    580: {
      op: "POP",
    },
    581: {
      op: "PUSH1",
      value: "0x1",
    },
    583: {
      op: "PUSH1",
      value: "0x1",
    },
    585: {
      op: "PUSH1",
      value: "0xE0",
    },
    587: {
      op: "SHL",
    },
    588: {
      op: "SUB",
    },
    589: {
      op: "NOT",
    },
    590: {
      fn: "ERC721.supportsInterface",
      offset: [1748, 1796],
      op: "DUP3",
      path: "0",
    },
    591: {
      fn: "ERC721.supportsInterface",
      offset: [1748, 1796],
      op: "AND",
      path: "0",
    },
    592: {
      op: "PUSH4",
      value: "0x5B5E139F",
    },
    597: {
      op: "PUSH1",
      value: "0xE0",
    },
    599: {
      op: "SHL",
    },
    600: {
      fn: "ERC721.supportsInterface",
      offset: [1748, 1796],
      op: "EQ",
      path: "0",
    },
    601: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1796],
      op: "JUMPDEST",
      path: "0",
    },
    602: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1848],
      op: "DUP1",
      path: "0",
    },
    603: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1848],
      op: "PUSH2",
      path: "0",
      value: "0x274",
    },
    606: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1848],
      op: "JUMPI",
      path: "0",
    },
    607: {
      op: "POP",
    },
    608: {
      op: "PUSH4",
      value: "0x1FFC9A7",
    },
    613: {
      op: "PUSH1",
      value: "0xE0",
    },
    615: {
      op: "SHL",
    },
    616: {
      op: "PUSH1",
      value: "0x1",
    },
    618: {
      op: "PUSH1",
      value: "0x1",
    },
    620: {
      op: "PUSH1",
      value: "0xE0",
    },
    622: {
      op: "SHL",
    },
    623: {
      op: "SUB",
    },
    624: {
      op: "NOT",
    },
    625: {
      fn: "ERC165.supportsInterface",
      offset: [937, 977],
      op: "DUP4",
      path: "8",
      statement: 2,
    },
    626: {
      fn: "ERC165.supportsInterface",
      offset: [937, 977],
      op: "AND",
      path: "8",
    },
    627: {
      fn: "ERC165.supportsInterface",
      offset: [937, 977],
      op: "EQ",
      path: "8",
    },
    628: {
      fn: "ERC721.supportsInterface",
      offset: [1812, 1848],
      op: "JUMPDEST",
      path: "0",
    },
    629: {
      fn: "ERC721.supportsInterface",
      offset: [1673, 1848],
      op: "SWAP3",
      path: "0",
    },
    630: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "SWAP2",
      path: "0",
    },
    631: {
      op: "POP",
    },
    632: {
      op: "POP",
    },
    633: {
      fn: "ERC721.supportsInterface",
      jump: "o",
      offset: [1555, 1855],
      op: "JUMP",
      path: "0",
    },
    634: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "JUMPDEST",
      path: "0",
    },
    635: {
      fn: "ERC721.name",
      offset: [2527, 2540],
      op: "PUSH1",
      path: "0",
      value: "0x60",
    },
    637: {
      fn: "ERC721.name",
      offset: [2559, 2564],
      op: "PUSH1",
      path: "0",
      statement: 3,
      value: "0x0",
    },
    639: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    640: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SLOAD",
      path: "0",
    },
    641: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x289",
    },
    644: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    645: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x1188",
    },
    648: {
      fn: "ERC721.name",
      jump: "i",
      offset: [2552, 2564],
      op: "JUMP",
      path: "0",
    },
    649: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPDEST",
      path: "0",
    },
    650: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    651: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x1F",
    },
    653: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    654: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    656: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    657: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP2",
      path: "0",
    },
    658: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DIV",
      path: "0",
    },
    659: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MUL",
      path: "0",
    },
    660: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    662: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    663: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    665: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MLOAD",
      path: "0",
    },
    666: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    667: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP2",
      path: "0",
    },
    668: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    669: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    671: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MSTORE",
      path: "0",
    },
    672: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    673: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP3",
      path: "0",
    },
    674: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP2",
      path: "0",
    },
    675: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    676: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP2",
      path: "0",
    },
    677: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP2",
      path: "0",
    },
    678: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MSTORE",
      path: "0",
    },
    679: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    681: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    682: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP3",
      path: "0",
    },
    683: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    684: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SLOAD",
      path: "0",
    },
    685: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x2B5",
    },
    688: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    689: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x1188",
    },
    692: {
      fn: "ERC721.name",
      jump: "i",
      offset: [2552, 2564],
      op: "JUMP",
      path: "0",
    },
    693: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPDEST",
      path: "0",
    },
    694: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    695: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ISZERO",
      path: "0",
    },
    696: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x302",
    },
    699: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPI",
      path: "0",
    },
    700: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    701: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x1F",
    },
    703: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "LT",
      path: "0",
    },
    704: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x2D7",
    },
    707: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPI",
      path: "0",
    },
    708: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x100",
    },
    711: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    712: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP4",
      path: "0",
    },
    713: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SLOAD",
      path: "0",
    },
    714: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DIV",
      path: "0",
    },
    715: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MUL",
      path: "0",
    },
    716: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP4",
      path: "0",
    },
    717: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MSTORE",
      path: "0",
    },
    718: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP2",
      path: "0",
    },
    719: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    721: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    722: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP2",
      path: "0",
    },
    723: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x302",
    },
    726: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMP",
      path: "0",
    },
    727: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPDEST",
      path: "0",
    },
    728: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP3",
      path: "0",
    },
    729: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    730: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP2",
      path: "0",
    },
    731: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    732: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    734: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MSTORE",
      path: "0",
    },
    735: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    737: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    739: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "KECCAK256",
      path: "0",
    },
    740: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    741: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPDEST",
      path: "0",
    },
    742: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP2",
      path: "0",
    },
    743: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SLOAD",
      path: "0",
    },
    744: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP2",
      path: "0",
    },
    745: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MSTORE",
      path: "0",
    },
    746: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    747: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x1",
    },
    749: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    750: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    751: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    753: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    754: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    755: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP4",
      path: "0",
    },
    756: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "GT",
      path: "0",
    },
    757: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x2E5",
    },
    760: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPI",
      path: "0",
    },
    761: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP3",
      path: "0",
    },
    762: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    763: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SUB",
      path: "0",
    },
    764: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x1F",
    },
    766: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "AND",
      path: "0",
    },
    767: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP3",
      path: "0",
    },
    768: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    769: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP2",
      path: "0",
    },
    770: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPDEST",
      path: "0",
    },
    771: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "POP",
      path: "0",
    },
    772: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "POP",
      path: "0",
    },
    773: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "POP",
      path: "0",
    },
    774: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "POP",
      path: "0",
    },
    775: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "POP",
      path: "0",
    },
    776: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    777: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "POP",
      path: "0",
    },
    778: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "SWAP1",
      path: "0",
    },
    779: {
      fn: "ERC721.name",
      jump: "o",
      offset: [2473, 2571],
      op: "JUMP",
      path: "0",
    },
    780: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "JUMPDEST",
      path: "0",
    },
    781: {
      fn: "ERC721.getApproved",
      offset: [4060, 4067],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    783: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "DUP2",
      path: "0",
      statement: 4,
    },
    784: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "DUP2",
      path: "0",
    },
    785: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "MSTORE",
      path: "0",
    },
    786: {
      fn: "ERC721._exists",
      offset: [7232, 7239],
      op: "PUSH1",
      path: "0",
      value: "0x2",
    },
    788: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    790: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "MSTORE",
      path: "0",
    },
    791: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    793: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "DUP2",
      path: "0",
    },
    794: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "KECCAK256",
      path: "0",
    },
    795: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "SLOAD",
      path: "0",
    },
    796: {
      op: "PUSH1",
      value: "0x1",
    },
    798: {
      op: "PUSH1",
      value: "0x1",
    },
    800: {
      op: "PUSH1",
      value: "0xA0",
    },
    802: {
      op: "SHL",
    },
    803: {
      op: "SUB",
    },
    804: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "AND",
      path: "0",
    },
    805: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "PUSH2",
      path: "0",
      statement: 5,
      value: "0x38A",
    },
    808: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "JUMPI",
      path: "0",
    },
    809: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    811: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "MLOAD",
      path: "0",
    },
    812: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    816: {
      op: "PUSH1",
      value: "0xE5",
    },
    818: {
      op: "SHL",
    },
    819: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "DUP2",
      path: "0",
    },
    820: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "MSTORE",
      path: "0",
    },
    821: {
      op: "PUSH1",
      value: "0x20",
    },
    823: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    825: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "DUP3",
      path: "0",
    },
    826: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "ADD",
      path: "0",
    },
    827: {
      op: "MSTORE",
    },
    828: {
      op: "PUSH1",
      value: "0x2C",
    },
    830: {
      op: "PUSH1",
      value: "0x24",
    },
    832: {
      op: "DUP3",
    },
    833: {
      op: "ADD",
    },
    834: {
      op: "MSTORE",
    },
    835: {
      op: "PUSH32",
      value:
        "0x4552433732313A20617070726F76656420717565727920666F72206E6F6E6578",
    },
    868: {
      op: "PUSH1",
      value: "0x44",
    },
    870: {
      op: "DUP3",
    },
    871: {
      op: "ADD",
    },
    872: {
      op: "MSTORE",
    },
    873: {
      op: "PUSH12",
      value: "0x34B9BA32B73A103A37B5B2B7",
    },
    886: {
      op: "PUSH1",
      value: "0xA1",
    },
    888: {
      op: "SHL",
    },
    889: {
      op: "PUSH1",
      value: "0x64",
    },
    891: {
      op: "DUP3",
    },
    892: {
      op: "ADD",
    },
    893: {
      op: "MSTORE",
    },
    894: {
      op: "PUSH1",
      value: "0x84",
    },
    896: {
      op: "ADD",
    },
    897: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "JUMPDEST",
      path: "0",
    },
    898: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    900: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "MLOAD",
      path: "0",
    },
    901: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "DUP1",
      path: "0",
    },
    902: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "SWAP2",
      path: "0",
    },
    903: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "SUB",
      path: "0",
    },
    904: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "SWAP1",
      path: "0",
    },
    905: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "REVERT",
      optimizer_revert: true,
      path: "0",
    },
    906: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "JUMPDEST",
      path: "0",
    },
    907: {
      op: "POP",
    },
    908: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "PUSH1",
      path: "0",
      statement: 6,
      value: "0x0",
    },
    910: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "SWAP1",
      path: "0",
    },
    911: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "DUP2",
      path: "0",
    },
    912: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "MSTORE",
      path: "0",
    },
    913: {
      fn: "ERC721.getApproved",
      offset: [4170, 4185],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    915: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    917: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "MSTORE",
      path: "0",
    },
    918: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    920: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "SWAP1",
      path: "0",
    },
    921: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "KECCAK256",
      path: "0",
    },
    922: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "SLOAD",
      path: "0",
    },
    923: {
      op: "PUSH1",
      value: "0x1",
    },
    925: {
      op: "PUSH1",
      value: "0x1",
    },
    927: {
      op: "PUSH1",
      value: "0xA0",
    },
    929: {
      op: "SHL",
    },
    930: {
      op: "SUB",
    },
    931: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "AND",
      path: "0",
    },
    932: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "SWAP1",
      path: "0",
    },
    933: {
      fn: "ERC721.getApproved",
      jump: "o",
      offset: [3984, 4201],
      op: "JUMP",
      path: "0",
    },
    934: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "JUMPDEST",
      path: "0",
    },
    935: {
      fn: "ERC721.approve",
      offset: [3602, 3615],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    937: {
      fn: "ERC721.approve",
      offset: [3618, 3641],
      op: "PUSH2",
      path: "0",
      value: "0x3B1",
    },
    940: {
      fn: "ERC721.approve",
      offset: [3633, 3640],
      op: "DUP3",
      path: "0",
    },
    941: {
      fn: "ERC721.approve",
      offset: [3618, 3632],
      op: "PUSH2",
      path: "0",
      value: "0x508",
    },
    944: {
      fn: "ERC721.approve",
      jump: "i",
      offset: [3618, 3641],
      op: "JUMP",
      path: "0",
    },
    945: {
      fn: "ERC721.approve",
      offset: [3618, 3641],
      op: "JUMPDEST",
      path: "0",
    },
    946: {
      fn: "ERC721.approve",
      offset: [3602, 3641],
      op: "SWAP1",
      path: "0",
    },
    947: {
      fn: "ERC721.approve",
      offset: [3602, 3641],
      op: "POP",
      path: "0",
    },
    948: {
      fn: "ERC721.approve",
      offset: [3665, 3670],
      op: "DUP1",
      path: "0",
      statement: 7,
    },
    949: {
      op: "PUSH1",
      value: "0x1",
    },
    951: {
      op: "PUSH1",
      value: "0x1",
    },
    953: {
      op: "PUSH1",
      value: "0xA0",
    },
    955: {
      op: "SHL",
    },
    956: {
      op: "SUB",
    },
    957: {
      fn: "ERC721.approve",
      offset: [3659, 3670],
      op: "AND",
      path: "0",
    },
    958: {
      fn: "ERC721.approve",
      offset: [3659, 3661],
      op: "DUP4",
      path: "0",
    },
    959: {
      op: "PUSH1",
      value: "0x1",
    },
    961: {
      op: "PUSH1",
      value: "0x1",
    },
    963: {
      op: "PUSH1",
      value: "0xA0",
    },
    965: {
      op: "SHL",
    },
    966: {
      op: "SUB",
    },
    967: {
      fn: "ERC721.approve",
      offset: [3659, 3670],
      op: "AND",
      path: "0",
    },
    968: {
      fn: "ERC721.approve",
      offset: [3659, 3670],
      op: "EQ",
      path: "0",
    },
    969: {
      branch: 47,
      fn: "ERC721.approve",
      offset: [3659, 3670],
      op: "ISZERO",
      path: "0",
    },
    970: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "PUSH2",
      path: "0",
      value: "0x41F",
    },
    973: {
      branch: 47,
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "JUMPI",
      path: "0",
    },
    974: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    976: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "MLOAD",
      path: "0",
    },
    977: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    981: {
      op: "PUSH1",
      value: "0xE5",
    },
    983: {
      op: "SHL",
    },
    984: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "DUP2",
      path: "0",
    },
    985: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "MSTORE",
      path: "0",
    },
    986: {
      op: "PUSH1",
      value: "0x20",
    },
    988: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    990: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "DUP3",
      path: "0",
    },
    991: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "ADD",
      path: "0",
    },
    992: {
      op: "MSTORE",
    },
    993: {
      op: "PUSH1",
      value: "0x21",
    },
    995: {
      op: "PUSH1",
      value: "0x24",
    },
    997: {
      op: "DUP3",
    },
    998: {
      op: "ADD",
    },
    999: {
      op: "MSTORE",
    },
    1000: {
      op: "PUSH32",
      value:
        "0x4552433732313A20617070726F76616C20746F2063757272656E74206F776E65",
    },
    1033: {
      op: "PUSH1",
      value: "0x44",
    },
    1035: {
      op: "DUP3",
    },
    1036: {
      op: "ADD",
    },
    1037: {
      op: "MSTORE",
    },
    1038: {
      op: "PUSH1",
      value: "0x39",
    },
    1040: {
      op: "PUSH1",
      value: "0xF9",
    },
    1042: {
      op: "SHL",
    },
    1043: {
      op: "PUSH1",
      value: "0x64",
    },
    1045: {
      op: "DUP3",
    },
    1046: {
      op: "ADD",
    },
    1047: {
      op: "MSTORE",
    },
    1048: {
      op: "PUSH1",
      value: "0x84",
    },
    1050: {
      op: "ADD",
    },
    1051: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "PUSH2",
      path: "0",
      value: "0x381",
    },
    1054: {
      op: "JUMP",
    },
    1055: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "JUMPDEST",
      path: "0",
    },
    1056: {
      fn: "Context._msgSender",
      offset: [719, 729],
      op: "CALLER",
      path: "6",
      statement: 8,
    },
    1057: {
      op: "PUSH1",
      value: "0x1",
    },
    1059: {
      op: "PUSH1",
      value: "0x1",
    },
    1061: {
      op: "PUSH1",
      value: "0xA0",
    },
    1063: {
      op: "SHL",
    },
    1064: {
      op: "SUB",
    },
    1065: {
      fn: "ERC721.approve",
      offset: [3740, 3761],
      op: "DUP3",
      path: "0",
      statement: 9,
    },
    1066: {
      fn: "ERC721.approve",
      offset: [3740, 3761],
      op: "AND",
      path: "0",
    },
    1067: {
      fn: "ERC721.approve",
      offset: [3740, 3761],
      op: "EQ",
      path: "0",
    },
    1068: {
      branch: 48,
      fn: "ERC721.approve",
      offset: [3740, 3761],
      op: "DUP1",
      path: "0",
    },
    1069: {
      fn: "ERC721.approve",
      offset: [3740, 3802],
      op: "PUSH2",
      path: "0",
      value: "0x43B",
    },
    1072: {
      branch: 48,
      fn: "ERC721.approve",
      offset: [3740, 3802],
      op: "JUMPI",
      path: "0",
    },
    1073: {
      op: "POP",
    },
    1074: {
      fn: "ERC721.approve",
      offset: [3765, 3802],
      op: "PUSH2",
      path: "0",
      value: "0x43B",
    },
    1077: {
      fn: "ERC721.approve",
      offset: [3782, 3787],
      op: "DUP2",
      path: "0",
    },
    1078: {
      fn: "Context._msgSender",
      offset: [719, 729],
      op: "CALLER",
      path: "6",
    },
    1079: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "PUSH2",
      path: "0",
      value: "0x1FA",
    },
    1082: {
      fn: "ERC721.isApprovedForAll",
      jump: "i",
      offset: [4487, 4649],
      op: "JUMP",
      path: "0",
    },
    1083: {
      branch: 49,
      fn: "ERC721.approve",
      offset: [3765, 3802],
      op: "JUMPDEST",
      path: "0",
    },
    1084: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "PUSH2",
      path: "0",
      value: "0x4AD",
    },
    1087: {
      branch: 49,
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "JUMPI",
      path: "0",
    },
    1088: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1090: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "MLOAD",
      path: "0",
    },
    1091: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    1095: {
      op: "PUSH1",
      value: "0xE5",
    },
    1097: {
      op: "SHL",
    },
    1098: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "DUP2",
      path: "0",
    },
    1099: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "MSTORE",
      path: "0",
    },
    1100: {
      op: "PUSH1",
      value: "0x20",
    },
    1102: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    1104: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "DUP3",
      path: "0",
    },
    1105: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "ADD",
      path: "0",
    },
    1106: {
      op: "MSTORE",
    },
    1107: {
      op: "PUSH1",
      value: "0x38",
    },
    1109: {
      op: "PUSH1",
      value: "0x24",
    },
    1111: {
      op: "DUP3",
    },
    1112: {
      op: "ADD",
    },
    1113: {
      op: "MSTORE",
    },
    1114: {
      op: "PUSH32",
      value:
        "0x4552433732313A20617070726F76652063616C6C6572206973206E6F74206F77",
    },
    1147: {
      op: "PUSH1",
      value: "0x44",
    },
    1149: {
      op: "DUP3",
    },
    1150: {
      op: "ADD",
    },
    1151: {
      op: "MSTORE",
    },
    1152: {
      op: "PUSH32",
      value:
        "0x6E6572206E6F7220617070726F76656420666F7220616C6C0000000000000000",
    },
    1185: {
      op: "PUSH1",
      value: "0x64",
    },
    1187: {
      op: "DUP3",
    },
    1188: {
      op: "ADD",
    },
    1189: {
      op: "MSTORE",
    },
    1190: {
      op: "PUSH1",
      value: "0x84",
    },
    1192: {
      op: "ADD",
    },
    1193: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "PUSH2",
      path: "0",
      value: "0x381",
    },
    1196: {
      op: "JUMP",
    },
    1197: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "JUMPDEST",
      path: "0",
    },
    1198: {
      fn: "ERC721.approve",
      offset: [3895, 3916],
      op: "PUSH2",
      path: "0",
      statement: 10,
      value: "0x4B7",
    },
    1201: {
      fn: "ERC721.approve",
      offset: [3904, 3906],
      op: "DUP4",
      path: "0",
    },
    1202: {
      fn: "ERC721.approve",
      offset: [3908, 3915],
      op: "DUP4",
      path: "0",
    },
    1203: {
      fn: "ERC721.approve",
      offset: [3895, 3903],
      op: "PUSH2",
      path: "0",
      value: "0x7E9",
    },
    1206: {
      fn: "ERC721.approve",
      jump: "i",
      offset: [3895, 3916],
      op: "JUMP",
      path: "0",
    },
    1207: {
      fn: "ERC721.approve",
      offset: [3895, 3916],
      op: "JUMPDEST",
      path: "0",
    },
    1208: {
      fn: "ERC721.approve",
      offset: [3592, 3923],
      op: "POP",
      path: "0",
    },
    1209: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "POP",
      path: "0",
    },
    1210: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "POP",
      path: "0",
    },
    1211: {
      fn: "ERC721.approve",
      jump: "o",
      offset: [3522, 3923],
      op: "JUMP",
      path: "0",
    },
    1212: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "JUMPDEST",
      path: "0",
    },
    1213: {
      fn: "ERC721.transferFrom",
      offset: [4900, 4941],
      op: "PUSH2",
      path: "0",
      statement: 11,
      value: "0x4C6",
    },
    1216: {
      fn: "Context._msgSender",
      offset: [719, 729],
      op: "CALLER",
      path: "6",
    },
    1217: {
      fn: "ERC721.transferFrom",
      offset: [4933, 4940],
      op: "DUP3",
      path: "0",
    },
    1218: {
      fn: "ERC721.transferFrom",
      offset: [4900, 4918],
      op: "PUSH2",
      path: "0",
      value: "0x857",
    },
    1221: {
      fn: "ERC721.transferFrom",
      jump: "i",
      offset: [4900, 4941],
      op: "JUMP",
      path: "0",
    },
    1222: {
      branch: 50,
      fn: "ERC721.transferFrom",
      offset: [4900, 4941],
      op: "JUMPDEST",
      path: "0",
    },
    1223: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "PUSH2",
      path: "0",
      value: "0x4E2",
    },
    1226: {
      branch: 50,
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "JUMPI",
      path: "0",
    },
    1227: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1229: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "MLOAD",
      path: "0",
    },
    1230: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    1234: {
      op: "PUSH1",
      value: "0xE5",
    },
    1236: {
      op: "SHL",
    },
    1237: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "DUP2",
      path: "0",
    },
    1238: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "MSTORE",
      path: "0",
    },
    1239: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    1241: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "ADD",
      path: "0",
    },
    1242: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "PUSH2",
      path: "0",
      value: "0x381",
    },
    1245: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "SWAP1",
      path: "0",
    },
    1246: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "PUSH2",
      path: "0",
      value: "0x11C3",
    },
    1249: {
      fn: "ERC721.transferFrom",
      jump: "i",
      offset: [4892, 4995],
      op: "JUMP",
      path: "0",
    },
    1250: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "JUMPDEST",
      path: "0",
    },
    1251: {
      fn: "ERC721.transferFrom",
      offset: [5006, 5034],
      op: "PUSH2",
      path: "0",
      statement: 12,
      value: "0x4B7",
    },
    1254: {
      fn: "ERC721.transferFrom",
      offset: [5016, 5020],
      op: "DUP4",
      path: "0",
    },
    1255: {
      fn: "ERC721.transferFrom",
      offset: [5022, 5024],
      op: "DUP4",
      path: "0",
    },
    1256: {
      fn: "ERC721.transferFrom",
      offset: [5026, 5033],
      op: "DUP4",
      path: "0",
    },
    1257: {
      fn: "ERC721.transferFrom",
      offset: [5006, 5015],
      op: "PUSH2",
      path: "0",
      value: "0x94A",
    },
    1260: {
      fn: "ERC721.transferFrom",
      jump: "i",
      offset: [5006, 5034],
      op: "JUMP",
      path: "0",
    },
    1261: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "JUMPDEST",
      path: "0",
    },
    1262: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "PUSH2",
      path: "0",
      statement: 13,
      value: "0x4B7",
    },
    1265: {
      fn: "ERC721.safeTransferFrom",
      offset: [5257, 5261],
      op: "DUP4",
      path: "0",
    },
    1266: {
      fn: "ERC721.safeTransferFrom",
      offset: [5263, 5265],
      op: "DUP4",
      path: "0",
    },
    1267: {
      fn: "ERC721.safeTransferFrom",
      offset: [5267, 5274],
      op: "DUP4",
      path: "0",
    },
    1268: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1270: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "MLOAD",
      path: "0",
    },
    1271: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "DUP1",
      path: "0",
    },
    1272: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    1274: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "ADD",
      path: "0",
    },
    1275: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1277: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "MSTORE",
      path: "0",
    },
    1278: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "DUP1",
      path: "0",
    },
    1279: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    1281: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "DUP2",
      path: "0",
    },
    1282: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "MSTORE",
      path: "0",
    },
    1283: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "POP",
      path: "0",
    },
    1284: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5256],
      op: "PUSH2",
      path: "0",
      value: "0x624",
    },
    1287: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5240, 5279],
      op: "JUMP",
      path: "0",
    },
    1288: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "JUMPDEST",
      path: "0",
    },
    1289: {
      fn: "ERC721.ownerOf",
      offset: [2248, 2255],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    1291: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "DUP2",
      path: "0",
    },
    1292: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "DUP2",
      path: "0",
    },
    1293: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "MSTORE",
      path: "0",
    },
    1294: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2290],
      op: "PUSH1",
      path: "0",
      value: "0x2",
    },
    1296: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    1298: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "MSTORE",
      path: "0",
    },
    1299: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1301: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "DUP2",
      path: "0",
    },
    1302: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "KECCAK256",
      path: "0",
    },
    1303: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "SLOAD",
      path: "0",
    },
    1304: {
      op: "PUSH1",
      value: "0x1",
    },
    1306: {
      op: "PUSH1",
      value: "0x1",
    },
    1308: {
      op: "PUSH1",
      value: "0xA0",
    },
    1310: {
      op: "SHL",
    },
    1311: {
      op: "SUB",
    },
    1312: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "AND",
      path: "0",
    },
    1313: {
      branch: 51,
      fn: "ERC721.ownerOf",
      offset: [2317, 2336],
      op: "DUP1",
      path: "0",
      statement: 14,
    },
    1314: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "PUSH2",
      path: "0",
      value: "0x274",
    },
    1317: {
      branch: 51,
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "JUMPI",
      path: "0",
    },
    1318: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1320: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "MLOAD",
      path: "0",
    },
    1321: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    1325: {
      op: "PUSH1",
      value: "0xE5",
    },
    1327: {
      op: "SHL",
    },
    1328: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "DUP2",
      path: "0",
    },
    1329: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "MSTORE",
      path: "0",
    },
    1330: {
      op: "PUSH1",
      value: "0x20",
    },
    1332: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    1334: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "DUP3",
      path: "0",
    },
    1335: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "ADD",
      path: "0",
    },
    1336: {
      op: "MSTORE",
    },
    1337: {
      op: "PUSH1",
      value: "0x29",
    },
    1339: {
      op: "PUSH1",
      value: "0x24",
    },
    1341: {
      op: "DUP3",
    },
    1342: {
      op: "ADD",
    },
    1343: {
      op: "MSTORE",
    },
    1344: {
      op: "PUSH32",
      value:
        "0x4552433732313A206F776E657220717565727920666F72206E6F6E6578697374",
    },
    1377: {
      op: "PUSH1",
      value: "0x44",
    },
    1379: {
      op: "DUP3",
    },
    1380: {
      op: "ADD",
    },
    1381: {
      op: "MSTORE",
    },
    1382: {
      op: "PUSH9",
      value: "0x32B73A103A37B5B2B7",
    },
    1392: {
      op: "PUSH1",
      value: "0xB9",
    },
    1394: {
      op: "SHL",
    },
    1395: {
      op: "PUSH1",
      value: "0x64",
    },
    1397: {
      op: "DUP3",
    },
    1398: {
      op: "ADD",
    },
    1399: {
      op: "MSTORE",
    },
    1400: {
      op: "PUSH1",
      value: "0x84",
    },
    1402: {
      op: "ADD",
    },
    1403: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "PUSH2",
      path: "0",
      value: "0x381",
    },
    1406: {
      op: "JUMP",
    },
    1407: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "JUMPDEST",
      path: "0",
    },
    1408: {
      fn: "ERC721.balanceOf",
      offset: [1986, 1993],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    1410: {
      op: "PUSH1",
      value: "0x1",
    },
    1412: {
      op: "PUSH1",
      value: "0x1",
    },
    1414: {
      op: "PUSH1",
      value: "0xA0",
    },
    1416: {
      op: "SHL",
    },
    1417: {
      op: "SUB",
    },
    1418: {
      fn: "ERC721.balanceOf",
      offset: [2013, 2032],
      op: "DUP3",
      path: "0",
      statement: 15,
    },
    1419: {
      branch: 52,
      fn: "ERC721.balanceOf",
      offset: [2013, 2032],
      op: "AND",
      path: "0",
    },
    1420: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "PUSH2",
      path: "0",
      value: "0x5EA",
    },
    1423: {
      branch: 52,
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "JUMPI",
      path: "0",
    },
    1424: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1426: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "MLOAD",
      path: "0",
    },
    1427: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    1431: {
      op: "PUSH1",
      value: "0xE5",
    },
    1433: {
      op: "SHL",
    },
    1434: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "DUP2",
      path: "0",
    },
    1435: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "MSTORE",
      path: "0",
    },
    1436: {
      op: "PUSH1",
      value: "0x20",
    },
    1438: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    1440: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "DUP3",
      path: "0",
    },
    1441: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "ADD",
      path: "0",
    },
    1442: {
      op: "MSTORE",
    },
    1443: {
      op: "PUSH1",
      value: "0x2A",
    },
    1445: {
      op: "PUSH1",
      value: "0x24",
    },
    1447: {
      op: "DUP3",
    },
    1448: {
      op: "ADD",
    },
    1449: {
      op: "MSTORE",
    },
    1450: {
      op: "PUSH32",
      value:
        "0x4552433732313A2062616C616E636520717565727920666F7220746865207A65",
    },
    1483: {
      op: "PUSH1",
      value: "0x44",
    },
    1485: {
      op: "DUP3",
    },
    1486: {
      op: "ADD",
    },
    1487: {
      op: "MSTORE",
    },
    1488: {
      op: "PUSH10",
      value: "0x726F2061646472657373",
    },
    1499: {
      op: "PUSH1",
      value: "0xB0",
    },
    1501: {
      op: "SHL",
    },
    1502: {
      op: "PUSH1",
      value: "0x64",
    },
    1504: {
      op: "DUP3",
    },
    1505: {
      op: "ADD",
    },
    1506: {
      op: "MSTORE",
    },
    1507: {
      op: "PUSH1",
      value: "0x84",
    },
    1509: {
      op: "ADD",
    },
    1510: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "PUSH2",
      path: "0",
      value: "0x381",
    },
    1513: {
      op: "JUMP",
    },
    1514: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "JUMPDEST",
      path: "0",
    },
    1515: {
      op: "POP",
    },
    1516: {
      op: "PUSH1",
      value: "0x1",
    },
    1518: {
      op: "PUSH1",
      value: "0x1",
    },
    1520: {
      op: "PUSH1",
      value: "0xA0",
    },
    1522: {
      op: "SHL",
    },
    1523: {
      op: "SUB",
    },
    1524: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "AND",
      path: "0",
      statement: 16,
    },
    1525: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    1527: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "SWAP1",
      path: "0",
    },
    1528: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "DUP2",
      path: "0",
    },
    1529: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "MSTORE",
      path: "0",
    },
    1530: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2105],
      op: "PUSH1",
      path: "0",
      value: "0x3",
    },
    1532: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    1534: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "MSTORE",
      path: "0",
    },
    1535: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1537: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "SWAP1",
      path: "0",
    },
    1538: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "KECCAK256",
      path: "0",
    },
    1539: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "SLOAD",
      path: "0",
    },
    1540: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "SWAP1",
      path: "0",
    },
    1541: {
      fn: "ERC721.balanceOf",
      jump: "o",
      offset: [1914, 2119],
      op: "JUMP",
      path: "0",
    },
    1542: {
      fn: "ERC721.symbol",
      offset: [2635, 2737],
      op: "JUMPDEST",
      path: "0",
    },
    1543: {
      fn: "ERC721.symbol",
      offset: [2691, 2704],
      op: "PUSH1",
      path: "0",
      value: "0x60",
    },
    1545: {
      fn: "ERC721.symbol",
      offset: [2723, 2730],
      op: "PUSH1",
      path: "0",
      statement: 17,
      value: "0x1",
    },
    1547: {
      fn: "ERC721.symbol",
      offset: [2716, 2730],
      op: "DUP1",
      path: "0",
    },
    1548: {
      fn: "ERC721.symbol",
      offset: [2716, 2730],
      op: "SLOAD",
      path: "0",
    },
    1549: {
      fn: "ERC721.symbol",
      offset: [2716, 2730],
      op: "PUSH2",
      path: "0",
      value: "0x289",
    },
    1552: {
      fn: "ERC721.symbol",
      offset: [2716, 2730],
      op: "SWAP1",
      path: "0",
    },
    1553: {
      fn: "ERC721.symbol",
      offset: [2716, 2730],
      op: "PUSH2",
      path: "0",
      value: "0x1188",
    },
    1556: {
      fn: "ERC721.symbol",
      jump: "i",
      offset: [2716, 2730],
      op: "JUMP",
      path: "0",
    },
    1557: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "JUMPDEST",
      path: "0",
    },
    1558: {
      fn: "ERC721.setApprovalForAll",
      offset: [4362, 4414],
      op: "PUSH2",
      path: "0",
      statement: 18,
      value: "0x620",
    },
    1561: {
      fn: "Context._msgSender",
      offset: [719, 729],
      op: "CALLER",
      path: "6",
    },
    1562: {
      fn: "ERC721.setApprovalForAll",
      offset: [4395, 4403],
      op: "DUP4",
      path: "0",
    },
    1563: {
      fn: "ERC721.setApprovalForAll",
      offset: [4405, 4413],
      op: "DUP4",
      path: "0",
    },
    1564: {
      fn: "ERC721.setApprovalForAll",
      offset: [4362, 4380],
      op: "PUSH2",
      path: "0",
      value: "0xAEA",
    },
    1567: {
      fn: "ERC721.setApprovalForAll",
      jump: "i",
      offset: [4362, 4414],
      op: "JUMP",
      path: "0",
    },
    1568: {
      fn: "ERC721.setApprovalForAll",
      offset: [4362, 4414],
      op: "JUMPDEST",
      path: "0",
    },
    1569: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "POP",
      path: "0",
    },
    1570: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "POP",
      path: "0",
    },
    1571: {
      fn: "ERC721.setApprovalForAll",
      jump: "o",
      offset: [4268, 4421],
      op: "JUMP",
      path: "0",
    },
    1572: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "JUMPDEST",
      path: "0",
    },
    1573: {
      fn: "ERC721.safeTransferFrom",
      offset: [5521, 5562],
      op: "PUSH2",
      path: "0",
      statement: 19,
      value: "0x62E",
    },
    1576: {
      fn: "Context._msgSender",
      offset: [719, 729],
      op: "CALLER",
      path: "6",
    },
    1577: {
      fn: "ERC721.safeTransferFrom",
      offset: [5554, 5561],
      op: "DUP4",
      path: "0",
    },
    1578: {
      fn: "ERC721.safeTransferFrom",
      offset: [5521, 5539],
      op: "PUSH2",
      path: "0",
      value: "0x857",
    },
    1581: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5521, 5562],
      op: "JUMP",
      path: "0",
    },
    1582: {
      branch: 53,
      fn: "ERC721.safeTransferFrom",
      offset: [5521, 5562],
      op: "JUMPDEST",
      path: "0",
    },
    1583: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "PUSH2",
      path: "0",
      value: "0x64A",
    },
    1586: {
      branch: 53,
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "JUMPI",
      path: "0",
    },
    1587: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1589: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "MLOAD",
      path: "0",
    },
    1590: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    1594: {
      op: "PUSH1",
      value: "0xE5",
    },
    1596: {
      op: "SHL",
    },
    1597: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "DUP2",
      path: "0",
    },
    1598: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "MSTORE",
      path: "0",
    },
    1599: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    1601: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "ADD",
      path: "0",
    },
    1602: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "PUSH2",
      path: "0",
      value: "0x381",
    },
    1605: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "SWAP1",
      path: "0",
    },
    1606: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "PUSH2",
      path: "0",
      value: "0x11C3",
    },
    1609: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5513, 5616],
      op: "JUMP",
      path: "0",
    },
    1610: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "JUMPDEST",
      path: "0",
    },
    1611: {
      fn: "ERC721.safeTransferFrom",
      offset: [5626, 5665],
      op: "PUSH2",
      path: "0",
      statement: 20,
      value: "0x656",
    },
    1614: {
      fn: "ERC721.safeTransferFrom",
      offset: [5640, 5644],
      op: "DUP5",
      path: "0",
    },
    1615: {
      fn: "ERC721.safeTransferFrom",
      offset: [5646, 5648],
      op: "DUP5",
      path: "0",
    },
    1616: {
      fn: "ERC721.safeTransferFrom",
      offset: [5650, 5657],
      op: "DUP5",
      path: "0",
    },
    1617: {
      fn: "ERC721.safeTransferFrom",
      offset: [5659, 5664],
      op: "DUP5",
      path: "0",
    },
    1618: {
      fn: "ERC721.safeTransferFrom",
      offset: [5626, 5639],
      op: "PUSH2",
      path: "0",
      value: "0xBB9",
    },
    1621: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5626, 5665],
      op: "JUMP",
      path: "0",
    },
    1622: {
      fn: "ERC721.safeTransferFrom",
      offset: [5626, 5665],
      op: "JUMPDEST",
      path: "0",
    },
    1623: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "POP",
      path: "0",
    },
    1624: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "POP",
      path: "0",
    },
    1625: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "POP",
      path: "0",
    },
    1626: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "POP",
      path: "0",
    },
    1627: {
      fn: "ERC721.safeTransferFrom",
      jump: "o",
      offset: [5352, 5672],
      op: "JUMP",
      path: "0",
    },
    1628: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "JUMPDEST",
      path: "3",
    },
    1629: {
      fn: "ERC721._exists",
      offset: [7209, 7213],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    1631: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "DUP2",
      path: "0",
    },
    1632: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "DUP2",
      path: "0",
    },
    1633: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "MSTORE",
      path: "0",
    },
    1634: {
      fn: "ERC721._exists",
      offset: [7232, 7239],
      op: "PUSH1",
      path: "0",
      value: "0x2",
    },
    1636: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    1638: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "MSTORE",
      path: "0",
    },
    1639: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1641: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "SWAP1",
      path: "0",
    },
    1642: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "KECCAK256",
      path: "0",
    },
    1643: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "SLOAD",
      path: "0",
    },
    1644: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [540, 553],
      op: "PUSH1",
      path: "3",
      value: "0x60",
    },
    1646: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [540, 553],
      op: "SWAP1",
      path: "3",
    },
    1647: {
      op: "PUSH1",
      value: "0x1",
    },
    1649: {
      op: "PUSH1",
      value: "0x1",
    },
    1651: {
      op: "PUSH1",
      value: "0xA0",
    },
    1653: {
      op: "SHL",
    },
    1654: {
      op: "SUB",
    },
    1655: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "AND",
      path: "0",
    },
    1656: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "PUSH2",
      path: "3",
      statement: 21,
      value: "0x6DD",
    },
    1659: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "JUMPI",
      path: "3",
    },
    1660: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    1662: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "MLOAD",
      path: "3",
    },
    1663: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    1667: {
      op: "PUSH1",
      value: "0xE5",
    },
    1669: {
      op: "SHL",
    },
    1670: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "DUP2",
      path: "3",
    },
    1671: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "MSTORE",
      path: "3",
    },
    1672: {
      op: "PUSH1",
      value: "0x20",
    },
    1674: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "PUSH1",
      path: "3",
      value: "0x4",
    },
    1676: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "DUP3",
      path: "3",
    },
    1677: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "ADD",
      path: "3",
    },
    1678: {
      op: "MSTORE",
    },
    1679: {
      op: "PUSH1",
      value: "0x31",
    },
    1681: {
      op: "PUSH1",
      value: "0x24",
    },
    1683: {
      op: "DUP3",
    },
    1684: {
      op: "ADD",
    },
    1685: {
      op: "MSTORE",
    },
    1686: {
      op: "PUSH32",
      value:
        "0x45524337323155524953746F726167653A2055524920717565727920666F7220",
    },
    1719: {
      op: "PUSH1",
      value: "0x44",
    },
    1721: {
      op: "DUP3",
    },
    1722: {
      op: "ADD",
    },
    1723: {
      op: "MSTORE",
    },
    1724: {
      op: "PUSH17",
      value: "0x3737B732BC34B9BA32B73A103A37B5B2B7",
    },
    1742: {
      op: "PUSH1",
      value: "0x79",
    },
    1744: {
      op: "SHL",
    },
    1745: {
      op: "PUSH1",
      value: "0x64",
    },
    1747: {
      op: "DUP3",
    },
    1748: {
      op: "ADD",
    },
    1749: {
      op: "MSTORE",
    },
    1750: {
      op: "PUSH1",
      value: "0x84",
    },
    1752: {
      op: "ADD",
    },
    1753: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "PUSH2",
      path: "3",
      value: "0x381",
    },
    1756: {
      op: "JUMP",
    },
    1757: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "JUMPDEST",
      path: "3",
    },
    1758: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 677],
      op: "PUSH1",
      path: "3",
      value: "0x0",
    },
    1760: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "DUP3",
      path: "3",
    },
    1761: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "DUP2",
      path: "3",
    },
    1762: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "MSTORE",
      path: "3",
    },
    1763: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 690],
      op: "PUSH1",
      path: "3",
      value: "0x6",
    },
    1765: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1767: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "MSTORE",
      path: "3",
    },
    1768: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    1770: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "DUP2",
      path: "3",
    },
    1771: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "KECCAK256",
      path: "3",
    },
    1772: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1773: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SLOAD",
      path: "3",
    },
    1774: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x6F6",
    },
    1777: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1778: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x1188",
    },
    1781: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "i",
      offset: [654, 699],
      op: "JUMP",
      path: "3",
    },
    1782: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPDEST",
      path: "3",
    },
    1783: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1784: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x1F",
    },
    1786: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1787: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1789: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1790: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP2",
      path: "3",
    },
    1791: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DIV",
      path: "3",
    },
    1792: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MUL",
      path: "3",
    },
    1793: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1795: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1796: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    1798: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MLOAD",
      path: "3",
    },
    1799: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1800: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP2",
      path: "3",
    },
    1801: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1802: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    1804: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MSTORE",
      path: "3",
    },
    1805: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1806: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP3",
      path: "3",
    },
    1807: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP2",
      path: "3",
    },
    1808: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1809: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP2",
      path: "3",
    },
    1810: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP2",
      path: "3",
    },
    1811: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MSTORE",
      path: "3",
    },
    1812: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1814: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1815: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP3",
      path: "3",
    },
    1816: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1817: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SLOAD",
      path: "3",
    },
    1818: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x722",
    },
    1821: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1822: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x1188",
    },
    1825: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "i",
      offset: [654, 699],
      op: "JUMP",
      path: "3",
    },
    1826: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPDEST",
      path: "3",
    },
    1827: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1828: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ISZERO",
      path: "3",
    },
    1829: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x76F",
    },
    1832: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPI",
      path: "3",
    },
    1833: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1834: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x1F",
    },
    1836: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "LT",
      path: "3",
    },
    1837: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x744",
    },
    1840: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPI",
      path: "3",
    },
    1841: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x100",
    },
    1844: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1845: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP4",
      path: "3",
    },
    1846: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SLOAD",
      path: "3",
    },
    1847: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DIV",
      path: "3",
    },
    1848: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MUL",
      path: "3",
    },
    1849: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP4",
      path: "3",
    },
    1850: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MSTORE",
      path: "3",
    },
    1851: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP2",
      path: "3",
    },
    1852: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1854: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1855: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP2",
      path: "3",
    },
    1856: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x76F",
    },
    1859: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMP",
      path: "3",
    },
    1860: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPDEST",
      path: "3",
    },
    1861: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP3",
      path: "3",
    },
    1862: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1863: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP2",
      path: "3",
    },
    1864: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1865: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x0",
    },
    1867: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MSTORE",
      path: "3",
    },
    1868: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1870: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x0",
    },
    1872: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "KECCAK256",
      path: "3",
    },
    1873: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1874: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPDEST",
      path: "3",
    },
    1875: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP2",
      path: "3",
    },
    1876: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SLOAD",
      path: "3",
    },
    1877: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP2",
      path: "3",
    },
    1878: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MSTORE",
      path: "3",
    },
    1879: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1880: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x1",
    },
    1882: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1883: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1884: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1886: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1887: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1888: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP4",
      path: "3",
    },
    1889: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "GT",
      path: "3",
    },
    1890: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x752",
    },
    1893: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPI",
      path: "3",
    },
    1894: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP3",
      path: "3",
    },
    1895: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1896: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SUB",
      path: "3",
    },
    1897: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x1F",
    },
    1899: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "AND",
      path: "3",
    },
    1900: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP3",
      path: "3",
    },
    1901: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1902: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP2",
      path: "3",
    },
    1903: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPDEST",
      path: "3",
    },
    1904: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "POP",
      path: "3",
    },
    1905: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "POP",
      path: "3",
    },
    1906: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "POP",
      path: "3",
    },
    1907: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "POP",
      path: "3",
    },
    1908: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "POP",
      path: "3",
    },
    1909: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1910: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "POP",
      path: "3",
    },
    1911: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [709, 727],
      op: "PUSH1",
      path: "3",
      value: "0x0",
    },
    1913: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [730, 740],
      op: "PUSH2",
      path: "3",
      value: "0x78D",
    },
    1916: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "PUSH1",
      path: "0",
      statement: 22,
      value: "0x40",
    },
    1918: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "DUP1",
      path: "0",
    },
    1919: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "MLOAD",
      path: "0",
    },
    1920: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    1922: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "DUP2",
      path: "0",
    },
    1923: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "ADD",
      path: "0",
    },
    1924: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "SWAP1",
      path: "0",
    },
    1925: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "SWAP2",
      path: "0",
    },
    1926: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "MSTORE",
      path: "0",
    },
    1927: {
      op: "PUSH1",
      value: "0x0",
    },
    1929: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "DUP2",
      path: "0",
    },
    1930: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "MSTORE",
      path: "0",
    },
    1931: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "SWAP1",
      path: "0",
    },
    1932: {
      fn: "ERC721._baseURI",
      offset: [3373, 3465],
      op: "JUMP",
      path: "0",
    },
    1933: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [730, 740],
      op: "JUMPDEST",
      path: "3",
    },
    1934: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [709, 740],
      op: "SWAP1",
      path: "3",
    },
    1935: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [709, 740],
      op: "POP",
      path: "3",
    },
    1936: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [819, 823],
      op: "DUP1",
      path: "3",
    },
    1937: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [813, 831],
      op: "MLOAD",
      path: "3",
    },
    1938: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [835, 836],
      op: "PUSH1",
      path: "3",
      value: "0x0",
    },
    1940: {
      branch: 59,
      fn: "ERC721URIStorage.tokenURI",
      offset: [813, 836],
      op: "EQ",
      path: "3",
    },
    1941: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [809, 879],
      op: "ISZERO",
      path: "3",
    },
    1942: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [809, 879],
      op: "PUSH2",
      path: "3",
      value: "0x7A0",
    },
    1945: {
      branch: 59,
      fn: "ERC721URIStorage.tokenURI",
      offset: [809, 879],
      op: "JUMPI",
      path: "3",
    },
    1946: {
      op: "POP",
    },
    1947: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [859, 868],
      op: "SWAP3",
      path: "3",
      statement: 23,
    },
    1948: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "SWAP2",
      path: "3",
    },
    1949: {
      op: "POP",
    },
    1950: {
      op: "POP",
    },
    1951: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "o",
      offset: [467, 1130],
      op: "JUMP",
      path: "3",
    },
    1952: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [809, 879],
      op: "JUMPDEST",
      path: "3",
    },
    1953: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [981, 1004],
      op: "DUP2",
      path: "3",
    },
    1954: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [981, 1004],
      op: "MLOAD",
      path: "3",
    },
    1955: {
      branch: 60,
      fn: "ERC721URIStorage.tokenURI",
      offset: [981, 1008],
      op: "ISZERO",
      path: "3",
    },
    1956: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [977, 1083],
      op: "PUSH2",
      path: "3",
      value: "0x7D2",
    },
    1959: {
      branch: 60,
      fn: "ERC721URIStorage.tokenURI",
      offset: [977, 1083],
      op: "JUMPI",
      path: "3",
    },
    1960: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1055, 1059],
      op: "DUP1",
      path: "3",
      statement: 24,
    },
    1961: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1061, 1070],
      op: "DUP3",
      path: "3",
    },
    1962: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    1964: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "MLOAD",
      path: "3",
    },
    1965: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1967: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "ADD",
      path: "3",
    },
    1968: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "PUSH2",
      path: "3",
      value: "0x7BA",
    },
    1971: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "SWAP3",
      path: "3",
    },
    1972: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "SWAP2",
      path: "3",
    },
    1973: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "SWAP1",
      path: "3",
    },
    1974: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "PUSH2",
      path: "3",
      value: "0x1214",
    },
    1977: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "i",
      offset: [1038, 1071],
      op: "JUMP",
      path: "3",
    },
    1978: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "JUMPDEST",
      path: "3",
    },
    1979: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    1981: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "MLOAD",
      path: "3",
    },
    1982: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1984: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "DUP2",
      path: "3",
    },
    1985: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "DUP4",
      path: "3",
    },
    1986: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "SUB",
      path: "3",
    },
    1987: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "SUB",
      path: "3",
    },
    1988: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "DUP2",
      path: "3",
    },
    1989: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "MSTORE",
      path: "3",
    },
    1990: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "SWAP1",
      path: "3",
    },
    1991: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    1993: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "MSTORE",
      path: "3",
    },
    1994: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1024, 1072],
      op: "SWAP3",
      path: "3",
    },
    1995: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1024, 1072],
      op: "POP",
      path: "3",
    },
    1996: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1024, 1072],
      op: "POP",
      path: "3",
    },
    1997: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1024, 1072],
      op: "POP",
      path: "3",
    },
    1998: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "SWAP2",
      path: "3",
    },
    1999: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "SWAP1",
      path: "3",
    },
    2000: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "POP",
      path: "3",
    },
    2001: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "o",
      offset: [467, 1130],
      op: "JUMP",
      path: "3",
    },
    2002: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [977, 1083],
      op: "JUMPDEST",
      path: "3",
    },
    2003: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1100, 1123],
      op: "PUSH2",
      path: "3",
      statement: 25,
      value: "0x7DB",
    },
    2006: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1115, 1122],
      op: "DUP5",
      path: "3",
    },
    2007: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1100, 1114],
      op: "PUSH2",
      path: "3",
      value: "0xBEC",
    },
    2010: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "i",
      offset: [1100, 1123],
      op: "JUMP",
      path: "3",
    },
    2011: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1100, 1123],
      op: "JUMPDEST",
      path: "3",
    },
    2012: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1093, 1123],
      op: "SWAP5",
      path: "3",
    },
    2013: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "SWAP4",
      path: "3",
    },
    2014: {
      op: "POP",
    },
    2015: {
      op: "POP",
    },
    2016: {
      op: "POP",
    },
    2017: {
      op: "POP",
    },
    2018: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "o",
      offset: [467, 1130],
      op: "JUMP",
      path: "3",
    },
    2019: {
      op: "JUMPDEST",
    },
    2020: {
      op: "EXTCODESIZE",
    },
    2021: {
      op: "ISZERO",
    },
    2022: {
      op: "ISZERO",
    },
    2023: {
      op: "SWAP1",
    },
    2024: {
      jump: "o",
      op: "JUMP",
    },
    2025: {
      fn: "ERC721._approve",
      offset: [10995, 11166],
      op: "JUMPDEST",
      path: "0",
    },
    2026: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "PUSH1",
      path: "0",
      statement: 26,
      value: "0x0",
    },
    2028: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "DUP2",
      path: "0",
    },
    2029: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "DUP2",
      path: "0",
    },
    2030: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "MSTORE",
      path: "0",
    },
    2031: {
      fn: "ERC721._approve",
      offset: [11069, 11084],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    2033: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2035: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "MSTORE",
      path: "0",
    },
    2036: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2038: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "SWAP1",
      path: "0",
    },
    2039: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "KECCAK256",
      path: "0",
    },
    2040: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "DUP1",
      path: "0",
    },
    2041: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "SLOAD",
      path: "0",
    },
    2042: {
      op: "PUSH1",
      value: "0x1",
    },
    2044: {
      op: "PUSH1",
      value: "0x1",
    },
    2046: {
      op: "PUSH1",
      value: "0xA0",
    },
    2048: {
      op: "SHL",
    },
    2049: {
      op: "SUB",
    },
    2050: {
      op: "NOT",
    },
    2051: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "AND",
      path: "0",
    },
    2052: {
      op: "PUSH1",
      value: "0x1",
    },
    2054: {
      op: "PUSH1",
      value: "0x1",
    },
    2056: {
      op: "PUSH1",
      value: "0xA0",
    },
    2058: {
      op: "SHL",
    },
    2059: {
      op: "SUB",
    },
    2060: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "DUP5",
      path: "0",
    },
    2061: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "AND",
      path: "0",
    },
    2062: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "SWAP1",
      path: "0",
    },
    2063: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "DUP2",
      path: "0",
    },
    2064: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "OR",
      path: "0",
    },
    2065: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "SWAP1",
      path: "0",
    },
    2066: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "SWAP2",
      path: "0",
    },
    2067: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "SSTORE",
      path: "0",
    },
    2068: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "DUP2",
      path: "0",
    },
    2069: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "SWAP1",
      path: "0",
    },
    2070: {
      fn: "ERC721._approve",
      offset: [11122, 11145],
      op: "PUSH2",
      path: "0",
      statement: 27,
      value: "0x81E",
    },
    2073: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "DUP3",
      path: "0",
    },
    2074: {
      fn: "ERC721._approve",
      offset: [11122, 11136],
      op: "PUSH2",
      path: "0",
      value: "0x508",
    },
    2077: {
      fn: "ERC721._approve",
      jump: "i",
      offset: [11122, 11145],
      op: "JUMP",
      path: "0",
    },
    2078: {
      fn: "ERC721._approve",
      offset: [11122, 11145],
      op: "JUMPDEST",
      path: "0",
    },
    2079: {
      op: "PUSH1",
      value: "0x1",
    },
    2081: {
      op: "PUSH1",
      value: "0x1",
    },
    2083: {
      op: "PUSH1",
      value: "0xA0",
    },
    2085: {
      op: "SHL",
    },
    2086: {
      op: "SUB",
    },
    2087: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "AND",
      path: "0",
    },
    2088: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "PUSH32",
      path: "0",
      value:
        "0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925",
    },
    2121: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2123: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "MLOAD",
      path: "0",
    },
    2124: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2126: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "MLOAD",
      path: "0",
    },
    2127: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "DUP1",
      path: "0",
    },
    2128: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "SWAP2",
      path: "0",
    },
    2129: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "SUB",
      path: "0",
    },
    2130: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "SWAP1",
      path: "0",
    },
    2131: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "LOG4",
      path: "0",
    },
    2132: {
      fn: "ERC721._approve",
      offset: [10995, 11166],
      op: "POP",
      path: "0",
    },
    2133: {
      fn: "ERC721._approve",
      offset: [10995, 11166],
      op: "POP",
      path: "0",
    },
    2134: {
      fn: "ERC721._approve",
      jump: "o",
      offset: [10995, 11166],
      op: "JUMP",
      path: "0",
    },
    2135: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7427, 7771],
      op: "JUMPDEST",
      path: "0",
    },
    2136: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7520, 7524],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2138: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "DUP2",
      path: "0",
    },
    2139: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "DUP2",
      path: "0",
    },
    2140: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "MSTORE",
      path: "0",
    },
    2141: {
      fn: "ERC721._exists",
      offset: [7232, 7239],
      op: "PUSH1",
      path: "0",
      value: "0x2",
    },
    2143: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2145: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "MSTORE",
      path: "0",
    },
    2146: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2148: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "DUP2",
      path: "0",
    },
    2149: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "KECCAK256",
      path: "0",
    },
    2150: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "SLOAD",
      path: "0",
    },
    2151: {
      op: "PUSH1",
      value: "0x1",
    },
    2153: {
      op: "PUSH1",
      value: "0x1",
    },
    2155: {
      op: "PUSH1",
      value: "0xA0",
    },
    2157: {
      op: "SHL",
    },
    2158: {
      op: "SUB",
    },
    2159: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "AND",
      path: "0",
    },
    2160: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "PUSH2",
      path: "0",
      statement: 28,
      value: "0x8D0",
    },
    2163: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "JUMPI",
      path: "0",
    },
    2164: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2166: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "MLOAD",
      path: "0",
    },
    2167: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    2171: {
      op: "PUSH1",
      value: "0xE5",
    },
    2173: {
      op: "SHL",
    },
    2174: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "DUP2",
      path: "0",
    },
    2175: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "MSTORE",
      path: "0",
    },
    2176: {
      op: "PUSH1",
      value: "0x20",
    },
    2178: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    2180: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "DUP3",
      path: "0",
    },
    2181: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "ADD",
      path: "0",
    },
    2182: {
      op: "MSTORE",
    },
    2183: {
      op: "PUSH1",
      value: "0x2C",
    },
    2185: {
      op: "PUSH1",
      value: "0x24",
    },
    2187: {
      op: "DUP3",
    },
    2188: {
      op: "ADD",
    },
    2189: {
      op: "MSTORE",
    },
    2190: {
      op: "PUSH32",
      value:
        "0x4552433732313A206F70657261746F7220717565727920666F72206E6F6E6578",
    },
    2223: {
      op: "PUSH1",
      value: "0x44",
    },
    2225: {
      op: "DUP3",
    },
    2226: {
      op: "ADD",
    },
    2227: {
      op: "MSTORE",
    },
    2228: {
      op: "PUSH12",
      value: "0x34B9BA32B73A103A37B5B2B7",
    },
    2241: {
      op: "PUSH1",
      value: "0xA1",
    },
    2243: {
      op: "SHL",
    },
    2244: {
      op: "PUSH1",
      value: "0x64",
    },
    2246: {
      op: "DUP3",
    },
    2247: {
      op: "ADD",
    },
    2248: {
      op: "MSTORE",
    },
    2249: {
      op: "PUSH1",
      value: "0x84",
    },
    2251: {
      op: "ADD",
    },
    2252: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "PUSH2",
      path: "0",
      value: "0x381",
    },
    2255: {
      op: "JUMP",
    },
    2256: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "JUMPDEST",
      path: "0",
    },
    2257: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7619, 7632],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2259: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7635, 7658],
      op: "PUSH2",
      path: "0",
      value: "0x8DB",
    },
    2262: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7650, 7657],
      op: "DUP4",
      path: "0",
    },
    2263: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7635, 7649],
      op: "PUSH2",
      path: "0",
      value: "0x508",
    },
    2266: {
      fn: "ERC721._isApprovedOrOwner",
      jump: "i",
      offset: [7635, 7658],
      op: "JUMP",
      path: "0",
    },
    2267: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7635, 7658],
      op: "JUMPDEST",
      path: "0",
    },
    2268: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7619, 7658],
      op: "SWAP1",
      path: "0",
    },
    2269: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7619, 7658],
      op: "POP",
      path: "0",
    },
    2270: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7687, 7692],
      op: "DUP1",
      path: "0",
      statement: 29,
    },
    2271: {
      op: "PUSH1",
      value: "0x1",
    },
    2273: {
      op: "PUSH1",
      value: "0x1",
    },
    2275: {
      op: "PUSH1",
      value: "0xA0",
    },
    2277: {
      op: "SHL",
    },
    2278: {
      op: "SUB",
    },
    2279: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7692],
      op: "AND",
      path: "0",
    },
    2280: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7683],
      op: "DUP5",
      path: "0",
    },
    2281: {
      op: "PUSH1",
      value: "0x1",
    },
    2283: {
      op: "PUSH1",
      value: "0x1",
    },
    2285: {
      op: "PUSH1",
      value: "0xA0",
    },
    2287: {
      op: "SHL",
    },
    2288: {
      op: "SUB",
    },
    2289: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7692],
      op: "AND",
      path: "0",
    },
    2290: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7692],
      op: "EQ",
      path: "0",
    },
    2291: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7727],
      op: "DUP1",
      path: "0",
    },
    2292: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7727],
      op: "PUSH2",
      path: "0",
      value: "0x916",
    },
    2295: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7727],
      op: "JUMPI",
      path: "0",
    },
    2296: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7727],
      op: "POP",
      path: "0",
    },
    2297: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7720, 7727],
      op: "DUP4",
      path: "0",
    },
    2298: {
      op: "PUSH1",
      value: "0x1",
    },
    2300: {
      op: "PUSH1",
      value: "0x1",
    },
    2302: {
      op: "PUSH1",
      value: "0xA0",
    },
    2304: {
      op: "SHL",
    },
    2305: {
      op: "SUB",
    },
    2306: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7696, 7727],
      op: "AND",
      path: "0",
    },
    2307: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7696, 7716],
      op: "PUSH2",
      path: "0",
      value: "0x90B",
    },
    2310: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7708, 7715],
      op: "DUP5",
      path: "0",
    },
    2311: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7696, 7707],
      op: "PUSH2",
      path: "0",
      value: "0x30C",
    },
    2314: {
      fn: "ERC721._isApprovedOrOwner",
      jump: "i",
      offset: [7696, 7716],
      op: "JUMP",
      path: "0",
    },
    2315: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7696, 7716],
      op: "JUMPDEST",
      path: "0",
    },
    2316: {
      op: "PUSH1",
      value: "0x1",
    },
    2318: {
      op: "PUSH1",
      value: "0x1",
    },
    2320: {
      op: "PUSH1",
      value: "0xA0",
    },
    2322: {
      op: "SHL",
    },
    2323: {
      op: "SUB",
    },
    2324: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7696, 7727],
      op: "AND",
      path: "0",
    },
    2325: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7696, 7727],
      op: "EQ",
      path: "0",
    },
    2326: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7727],
      op: "JUMPDEST",
      path: "0",
    },
    2327: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7763],
      op: "DUP1",
      path: "0",
    },
    2328: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7763],
      op: "PUSH2",
      path: "0",
      value: "0x7DB",
    },
    2331: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7763],
      op: "JUMPI",
      path: "0",
    },
    2332: {
      op: "POP",
    },
    2333: {
      op: "PUSH1",
      value: "0x1",
    },
    2335: {
      op: "PUSH1",
      value: "0x1",
    },
    2337: {
      op: "PUSH1",
      value: "0xA0",
    },
    2339: {
      op: "SHL",
    },
    2340: {
      op: "SUB",
    },
    2341: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP1",
      path: "0",
    },
    2342: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP3",
      path: "0",
    },
    2343: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "AND",
      path: "0",
    },
    2344: {
      fn: "ERC721.isApprovedForAll",
      offset: [4584, 4588],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2346: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "SWAP1",
      path: "0",
    },
    2347: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP2",
      path: "0",
    },
    2348: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "MSTORE",
      path: "0",
    },
    2349: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4625],
      op: "PUSH1",
      path: "0",
      value: "0x5",
    },
    2351: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2353: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "SWAP1",
      path: "0",
    },
    2354: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP2",
      path: "0",
    },
    2355: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "MSTORE",
      path: "0",
    },
    2356: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2358: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP1",
      path: "0",
    },
    2359: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP4",
      path: "0",
    },
    2360: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "KECCAK256",
      path: "0",
    },
    2361: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP4",
      path: "0",
    },
    2362: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "DUP9",
      path: "0",
    },
    2363: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "AND",
      path: "0",
    },
    2364: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "DUP4",
      path: "0",
    },
    2365: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "MSTORE",
      path: "0",
    },
    2366: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP3",
      path: "0",
    },
    2367: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP1",
      path: "0",
    },
    2368: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "MSTORE",
      path: "0",
    },
    2369: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "KECCAK256",
      path: "0",
    },
    2370: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SLOAD",
      path: "0",
    },
    2371: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "PUSH1",
      path: "0",
      value: "0xFF",
    },
    2373: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "AND",
      path: "0",
    },
    2374: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7731, 7763],
      op: "PUSH2",
      path: "0",
      value: "0x7DB",
    },
    2377: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "JUMP",
      path: "0",
    },
    2378: {
      fn: "ERC721._transfer",
      offset: [10324, 10884],
      op: "JUMPDEST",
      path: "0",
    },
    2379: {
      fn: "ERC721._transfer",
      offset: [10478, 10482],
      op: "DUP3",
      path: "0",
      statement: 30,
    },
    2380: {
      op: "PUSH1",
      value: "0x1",
    },
    2382: {
      op: "PUSH1",
      value: "0x1",
    },
    2384: {
      op: "PUSH1",
      value: "0xA0",
    },
    2386: {
      op: "SHL",
    },
    2387: {
      op: "SUB",
    },
    2388: {
      fn: "ERC721._transfer",
      offset: [10451, 10482],
      op: "AND",
      path: "0",
    },
    2389: {
      fn: "ERC721._transfer",
      offset: [10451, 10474],
      op: "PUSH2",
      path: "0",
      value: "0x95D",
    },
    2392: {
      fn: "ERC721._transfer",
      offset: [10466, 10473],
      op: "DUP3",
      path: "0",
    },
    2393: {
      fn: "ERC721._transfer",
      offset: [10451, 10465],
      op: "PUSH2",
      path: "0",
      value: "0x508",
    },
    2396: {
      fn: "ERC721._transfer",
      jump: "i",
      offset: [10451, 10474],
      op: "JUMP",
      path: "0",
    },
    2397: {
      fn: "ERC721._transfer",
      offset: [10451, 10474],
      op: "JUMPDEST",
      path: "0",
    },
    2398: {
      op: "PUSH1",
      value: "0x1",
    },
    2400: {
      op: "PUSH1",
      value: "0x1",
    },
    2402: {
      op: "PUSH1",
      value: "0xA0",
    },
    2404: {
      op: "SHL",
    },
    2405: {
      op: "SUB",
    },
    2406: {
      fn: "ERC721._transfer",
      offset: [10451, 10482],
      op: "AND",
      path: "0",
    },
    2407: {
      branch: 54,
      fn: "ERC721._transfer",
      offset: [10451, 10482],
      op: "EQ",
      path: "0",
    },
    2408: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "PUSH2",
      path: "0",
      value: "0x9C5",
    },
    2411: {
      branch: 54,
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "JUMPI",
      path: "0",
    },
    2412: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2414: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "MLOAD",
      path: "0",
    },
    2415: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    2419: {
      op: "PUSH1",
      value: "0xE5",
    },
    2421: {
      op: "SHL",
    },
    2422: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "DUP2",
      path: "0",
    },
    2423: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "MSTORE",
      path: "0",
    },
    2424: {
      op: "PUSH1",
      value: "0x20",
    },
    2426: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    2428: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "DUP3",
      path: "0",
    },
    2429: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "ADD",
      path: "0",
    },
    2430: {
      op: "MSTORE",
    },
    2431: {
      op: "PUSH1",
      value: "0x29",
    },
    2433: {
      op: "PUSH1",
      value: "0x24",
    },
    2435: {
      op: "DUP3",
    },
    2436: {
      op: "ADD",
    },
    2437: {
      op: "MSTORE",
    },
    2438: {
      op: "PUSH32",
      value:
        "0x4552433732313A207472616E73666572206F6620746F6B656E20746861742069",
    },
    2471: {
      op: "PUSH1",
      value: "0x44",
    },
    2473: {
      op: "DUP3",
    },
    2474: {
      op: "ADD",
    },
    2475: {
      op: "MSTORE",
    },
    2476: {
      op: "PUSH9",
      value: "0x39903737BA1037BBB7",
    },
    2486: {
      op: "PUSH1",
      value: "0xB9",
    },
    2488: {
      op: "SHL",
    },
    2489: {
      op: "PUSH1",
      value: "0x64",
    },
    2491: {
      op: "DUP3",
    },
    2492: {
      op: "ADD",
    },
    2493: {
      op: "MSTORE",
    },
    2494: {
      op: "PUSH1",
      value: "0x84",
    },
    2496: {
      op: "ADD",
    },
    2497: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "PUSH2",
      path: "0",
      value: "0x381",
    },
    2500: {
      op: "JUMP",
    },
    2501: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "JUMPDEST",
      path: "0",
    },
    2502: {
      op: "PUSH1",
      value: "0x1",
    },
    2504: {
      op: "PUSH1",
      value: "0x1",
    },
    2506: {
      op: "PUSH1",
      value: "0xA0",
    },
    2508: {
      op: "SHL",
    },
    2509: {
      op: "SUB",
    },
    2510: {
      fn: "ERC721._transfer",
      offset: [10546, 10562],
      op: "DUP3",
      path: "0",
      statement: 31,
    },
    2511: {
      branch: 55,
      fn: "ERC721._transfer",
      offset: [10546, 10562],
      op: "AND",
      path: "0",
    },
    2512: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "PUSH2",
      path: "0",
      value: "0xA27",
    },
    2515: {
      branch: 55,
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "JUMPI",
      path: "0",
    },
    2516: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2518: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "MLOAD",
      path: "0",
    },
    2519: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    2523: {
      op: "PUSH1",
      value: "0xE5",
    },
    2525: {
      op: "SHL",
    },
    2526: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "DUP2",
      path: "0",
    },
    2527: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "MSTORE",
      path: "0",
    },
    2528: {
      op: "PUSH1",
      value: "0x20",
    },
    2530: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    2532: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "DUP3",
      path: "0",
    },
    2533: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "ADD",
      path: "0",
    },
    2534: {
      op: "MSTORE",
    },
    2535: {
      op: "PUSH1",
      value: "0x24",
    },
    2537: {
      op: "DUP1",
    },
    2538: {
      op: "DUP3",
    },
    2539: {
      op: "ADD",
    },
    2540: {
      op: "MSTORE",
    },
    2541: {
      op: "PUSH32",
      value:
        "0x4552433732313A207472616E7366657220746F20746865207A65726F20616464",
    },
    2574: {
      op: "PUSH1",
      value: "0x44",
    },
    2576: {
      op: "DUP3",
    },
    2577: {
      op: "ADD",
    },
    2578: {
      op: "MSTORE",
    },
    2579: {
      op: "PUSH4",
      value: "0x72657373",
    },
    2584: {
      op: "PUSH1",
      value: "0xE0",
    },
    2586: {
      op: "SHL",
    },
    2587: {
      op: "PUSH1",
      value: "0x64",
    },
    2589: {
      op: "DUP3",
    },
    2590: {
      op: "ADD",
    },
    2591: {
      op: "MSTORE",
    },
    2592: {
      op: "PUSH1",
      value: "0x84",
    },
    2594: {
      op: "ADD",
    },
    2595: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "PUSH2",
      path: "0",
      value: "0x381",
    },
    2598: {
      op: "JUMP",
    },
    2599: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "JUMPDEST",
      path: "0",
    },
    2600: {
      fn: "ERC721._transfer",
      offset: [10715, 10744],
      op: "PUSH2",
      path: "0",
      statement: 32,
      value: "0xA32",
    },
    2603: {
      fn: "ERC721._transfer",
      offset: [10732, 10733],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2605: {
      fn: "ERC721._transfer",
      offset: [10736, 10743],
      op: "DUP3",
      path: "0",
    },
    2606: {
      fn: "ERC721._transfer",
      offset: [10715, 10723],
      op: "PUSH2",
      path: "0",
      value: "0x7E9",
    },
    2609: {
      fn: "ERC721._transfer",
      jump: "i",
      offset: [10715, 10744],
      op: "JUMP",
      path: "0",
    },
    2610: {
      fn: "ERC721._transfer",
      offset: [10715, 10744],
      op: "JUMPDEST",
      path: "0",
    },
    2611: {
      op: "PUSH1",
      value: "0x1",
    },
    2613: {
      op: "PUSH1",
      value: "0x1",
    },
    2615: {
      op: "PUSH1",
      value: "0xA0",
    },
    2617: {
      op: "SHL",
    },
    2618: {
      op: "SUB",
    },
    2619: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "DUP4",
      path: "0",
      statement: 33,
    },
    2620: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "AND",
      path: "0",
    },
    2621: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2623: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "SWAP1",
      path: "0",
    },
    2624: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "DUP2",
      path: "0",
    },
    2625: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "MSTORE",
      path: "0",
    },
    2626: {
      fn: "ERC721._transfer",
      offset: [10755, 10764],
      op: "PUSH1",
      path: "0",
      value: "0x3",
    },
    2628: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2630: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "MSTORE",
      path: "0",
    },
    2631: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2633: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "DUP2",
      path: "0",
    },
    2634: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "KECCAK256",
      path: "0",
    },
    2635: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "DUP1",
      path: "0",
    },
    2636: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "SLOAD",
      path: "0",
    },
    2637: {
      fn: "ERC721._transfer",
      offset: [10774, 10775],
      op: "PUSH1",
      path: "0",
      value: "0x1",
    },
    2639: {
      fn: "ERC721._transfer",
      offset: [10774, 10775],
      op: "SWAP3",
      path: "0",
    },
    2640: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "SWAP1",
      path: "0",
    },
    2641: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "PUSH2",
      path: "0",
      value: "0xA5B",
    },
    2644: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "SWAP1",
      path: "0",
    },
    2645: {
      fn: "ERC721._transfer",
      offset: [10774, 10775],
      op: "DUP5",
      path: "0",
    },
    2646: {
      fn: "ERC721._transfer",
      offset: [10774, 10775],
      op: "SWAP1",
      path: "0",
    },
    2647: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "PUSH2",
      path: "0",
      value: "0x1259",
    },
    2650: {
      fn: "ERC721._transfer",
      jump: "i",
      offset: [10755, 10775],
      op: "JUMP",
      path: "0",
    },
    2651: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "JUMPDEST",
      path: "0",
    },
    2652: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "SWAP1",
      path: "0",
    },
    2653: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "SWAP2",
      path: "0",
    },
    2654: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "SSTORE",
      path: "0",
    },
    2655: {
      op: "POP",
    },
    2656: {
      op: "POP",
    },
    2657: {
      op: "PUSH1",
      value: "0x1",
    },
    2659: {
      op: "PUSH1",
      value: "0x1",
    },
    2661: {
      op: "PUSH1",
      value: "0xA0",
    },
    2663: {
      op: "SHL",
    },
    2664: {
      op: "SUB",
    },
    2665: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "DUP3",
      path: "0",
      statement: 34,
    },
    2666: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "AND",
      path: "0",
    },
    2667: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2669: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "SWAP1",
      path: "0",
    },
    2670: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "DUP2",
      path: "0",
    },
    2671: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "MSTORE",
      path: "0",
    },
    2672: {
      fn: "ERC721._transfer",
      offset: [10785, 10794],
      op: "PUSH1",
      path: "0",
      value: "0x3",
    },
    2674: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2676: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "MSTORE",
      path: "0",
    },
    2677: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2679: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "DUP2",
      path: "0",
    },
    2680: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "KECCAK256",
      path: "0",
    },
    2681: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "DUP1",
      path: "0",
    },
    2682: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "SLOAD",
      path: "0",
    },
    2683: {
      fn: "ERC721._transfer",
      offset: [10802, 10803],
      op: "PUSH1",
      path: "0",
      value: "0x1",
    },
    2685: {
      fn: "ERC721._transfer",
      offset: [10802, 10803],
      op: "SWAP3",
      path: "0",
    },
    2686: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "SWAP1",
      path: "0",
    },
    2687: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "PUSH2",
      path: "0",
      value: "0xA89",
    },
    2690: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "SWAP1",
      path: "0",
    },
    2691: {
      fn: "ERC721._transfer",
      offset: [10802, 10803],
      op: "DUP5",
      path: "0",
    },
    2692: {
      fn: "ERC721._transfer",
      offset: [10802, 10803],
      op: "SWAP1",
      path: "0",
    },
    2693: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "PUSH2",
      path: "0",
      value: "0x1270",
    },
    2696: {
      fn: "ERC721._transfer",
      jump: "i",
      offset: [10785, 10803],
      op: "JUMP",
      path: "0",
    },
    2697: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "JUMPDEST",
      path: "0",
    },
    2698: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "SWAP1",
      path: "0",
    },
    2699: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "SWAP2",
      path: "0",
    },
    2700: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "SSTORE",
      path: "0",
    },
    2701: {
      op: "POP",
    },
    2702: {
      op: "POP",
    },
    2703: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "PUSH1",
      path: "0",
      statement: 35,
      value: "0x0",
    },
    2705: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "DUP2",
      path: "0",
    },
    2706: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "DUP2",
      path: "0",
    },
    2707: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "MSTORE",
      path: "0",
    },
    2708: {
      fn: "ERC721._transfer",
      offset: [10813, 10820],
      op: "PUSH1",
      path: "0",
      value: "0x2",
    },
    2710: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2712: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "MSTORE",
      path: "0",
    },
    2713: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2715: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "DUP1",
      path: "0",
    },
    2716: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "DUP3",
      path: "0",
    },
    2717: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "KECCAK256",
      path: "0",
    },
    2718: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "DUP1",
      path: "0",
    },
    2719: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "SLOAD",
      path: "0",
    },
    2720: {
      op: "PUSH1",
      value: "0x1",
    },
    2722: {
      op: "PUSH1",
      value: "0x1",
    },
    2724: {
      op: "PUSH1",
      value: "0xA0",
    },
    2726: {
      op: "SHL",
    },
    2727: {
      op: "SUB",
    },
    2728: {
      op: "NOT",
    },
    2729: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "AND",
      path: "0",
    },
    2730: {
      op: "PUSH1",
      value: "0x1",
    },
    2732: {
      op: "PUSH1",
      value: "0x1",
    },
    2734: {
      op: "PUSH1",
      value: "0xA0",
    },
    2736: {
      op: "SHL",
    },
    2737: {
      op: "SUB",
    },
    2738: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "DUP7",
      path: "0",
    },
    2739: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "DUP2",
      path: "0",
    },
    2740: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "AND",
      path: "0",
    },
    2741: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "SWAP2",
      path: "0",
    },
    2742: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "DUP3",
      path: "0",
    },
    2743: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "OR",
      path: "0",
    },
    2744: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "SWAP1",
      path: "0",
    },
    2745: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "SWAP3",
      path: "0",
    },
    2746: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "SSTORE",
      path: "0",
    },
    2747: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "SWAP2",
      path: "0",
      statement: 36,
    },
    2748: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "MLOAD",
      path: "0",
    },
    2749: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "DUP5",
      path: "0",
    },
    2750: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "SWAP4",
      path: "0",
    },
    2751: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "SWAP2",
      path: "0",
    },
    2752: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "DUP8",
      path: "0",
    },
    2753: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "AND",
      path: "0",
    },
    2754: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "SWAP2",
      path: "0",
    },
    2755: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "PUSH32",
      path: "0",
      value:
        "0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF",
    },
    2788: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "SWAP2",
      path: "0",
    },
    2789: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "LOG4",
      path: "0",
    },
    2790: {
      fn: "ERC721._transfer",
      offset: [10324, 10884],
      op: "POP",
      path: "0",
    },
    2791: {
      fn: "ERC721._transfer",
      offset: [10324, 10884],
      op: "POP",
      path: "0",
    },
    2792: {
      fn: "ERC721._transfer",
      offset: [10324, 10884],
      op: "POP",
      path: "0",
    },
    2793: {
      fn: "ERC721._transfer",
      jump: "o",
      offset: [10324, 10884],
      op: "JUMP",
      path: "0",
    },
    2794: {
      fn: "ERC721._setApprovalForAll",
      offset: [11301, 11608],
      op: "JUMPDEST",
      path: "0",
    },
    2795: {
      fn: "ERC721._setApprovalForAll",
      offset: [11451, 11459],
      op: "DUP2",
      path: "0",
      statement: 37,
    },
    2796: {
      op: "PUSH1",
      value: "0x1",
    },
    2798: {
      op: "PUSH1",
      value: "0x1",
    },
    2800: {
      op: "PUSH1",
      value: "0xA0",
    },
    2802: {
      op: "SHL",
    },
    2803: {
      op: "SUB",
    },
    2804: {
      fn: "ERC721._setApprovalForAll",
      offset: [11442, 11459],
      op: "AND",
      path: "0",
    },
    2805: {
      fn: "ERC721._setApprovalForAll",
      offset: [11442, 11447],
      op: "DUP4",
      path: "0",
    },
    2806: {
      op: "PUSH1",
      value: "0x1",
    },
    2808: {
      op: "PUSH1",
      value: "0x1",
    },
    2810: {
      op: "PUSH1",
      value: "0xA0",
    },
    2812: {
      op: "SHL",
    },
    2813: {
      op: "SUB",
    },
    2814: {
      fn: "ERC721._setApprovalForAll",
      offset: [11442, 11459],
      op: "AND",
      path: "0",
    },
    2815: {
      fn: "ERC721._setApprovalForAll",
      offset: [11442, 11459],
      op: "EQ",
      path: "0",
    },
    2816: {
      branch: 56,
      fn: "ERC721._setApprovalForAll",
      offset: [11442, 11459],
      op: "ISZERO",
      path: "0",
    },
    2817: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "PUSH2",
      path: "0",
      value: "0xB4C",
    },
    2820: {
      branch: 56,
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "JUMPI",
      path: "0",
    },
    2821: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2823: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "MLOAD",
      path: "0",
    },
    2824: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    2828: {
      op: "PUSH1",
      value: "0xE5",
    },
    2830: {
      op: "SHL",
    },
    2831: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "DUP2",
      path: "0",
    },
    2832: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "MSTORE",
      path: "0",
    },
    2833: {
      op: "PUSH1",
      value: "0x20",
    },
    2835: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    2837: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "DUP3",
      path: "0",
    },
    2838: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "ADD",
      path: "0",
    },
    2839: {
      op: "MSTORE",
    },
    2840: {
      op: "PUSH1",
      value: "0x19",
    },
    2842: {
      op: "PUSH1",
      value: "0x24",
    },
    2844: {
      op: "DUP3",
    },
    2845: {
      op: "ADD",
    },
    2846: {
      op: "MSTORE",
    },
    2847: {
      op: "PUSH32",
      value:
        "0x4552433732313A20617070726F766520746F2063616C6C657200000000000000",
    },
    2880: {
      op: "PUSH1",
      value: "0x44",
    },
    2882: {
      op: "DUP3",
    },
    2883: {
      op: "ADD",
    },
    2884: {
      op: "MSTORE",
    },
    2885: {
      op: "PUSH1",
      value: "0x64",
    },
    2887: {
      op: "ADD",
    },
    2888: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "PUSH2",
      path: "0",
      value: "0x381",
    },
    2891: {
      op: "JUMP",
    },
    2892: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "JUMPDEST",
      path: "0",
    },
    2893: {
      op: "PUSH1",
      value: "0x1",
    },
    2895: {
      op: "PUSH1",
      value: "0x1",
    },
    2897: {
      op: "PUSH1",
      value: "0xA0",
    },
    2899: {
      op: "SHL",
    },
    2900: {
      op: "SUB",
    },
    2901: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "DUP4",
      path: "0",
      statement: 38,
    },
    2902: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "DUP2",
      path: "0",
    },
    2903: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "AND",
      path: "0",
    },
    2904: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2906: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "DUP2",
      path: "0",
    },
    2907: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "DUP2",
      path: "0",
    },
    2908: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "MSTORE",
      path: "0",
    },
    2909: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11517],
      op: "PUSH1",
      path: "0",
      value: "0x5",
    },
    2911: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2913: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "SWAP1",
      path: "0",
    },
    2914: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "DUP2",
      path: "0",
    },
    2915: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "MSTORE",
      path: "0",
    },
    2916: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2918: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "DUP1",
      path: "0",
    },
    2919: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "DUP4",
      path: "0",
    },
    2920: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "KECCAK256",
      path: "0",
    },
    2921: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "SWAP5",
      path: "0",
    },
    2922: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "DUP8",
      path: "0",
    },
    2923: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "AND",
      path: "0",
    },
    2924: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "DUP1",
      path: "0",
    },
    2925: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "DUP5",
      path: "0",
    },
    2926: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "MSTORE",
      path: "0",
    },
    2927: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "SWAP5",
      path: "0",
    },
    2928: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "DUP3",
      path: "0",
    },
    2929: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "MSTORE",
      path: "0",
    },
    2930: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "SWAP2",
      path: "0",
    },
    2931: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "DUP3",
      path: "0",
    },
    2932: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "SWAP1",
      path: "0",
    },
    2933: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "KECCAK256",
      path: "0",
    },
    2934: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "DUP1",
      path: "0",
    },
    2935: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "SLOAD",
      path: "0",
    },
    2936: {
      op: "PUSH1",
      value: "0xFF",
    },
    2938: {
      op: "NOT",
    },
    2939: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "AND",
      path: "0",
    },
    2940: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "DUP7",
      path: "0",
    },
    2941: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "ISZERO",
      path: "0",
    },
    2942: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "ISZERO",
      path: "0",
    },
    2943: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "SWAP1",
      path: "0",
    },
    2944: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "DUP2",
      path: "0",
    },
    2945: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "OR",
      path: "0",
    },
    2946: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "SWAP1",
      path: "0",
    },
    2947: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "SWAP2",
      path: "0",
    },
    2948: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "SSTORE",
      path: "0",
    },
    2949: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "SWAP2",
      path: "0",
      statement: 39,
    },
    2950: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "MLOAD",
      path: "0",
    },
    2951: {
      op: "SWAP2",
    },
    2952: {
      op: "DUP3",
    },
    2953: {
      op: "MSTORE",
    },
    2954: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "PUSH32",
      path: "0",
      value:
        "0x17307EAB39AB6107E8899845AD3D59BD9653F200F220920489CA2B5937696C31",
    },
    2987: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "SWAP2",
      path: "0",
    },
    2988: {
      op: "ADD",
    },
    2989: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2991: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "MLOAD",
      path: "0",
    },
    2992: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "DUP1",
      path: "0",
    },
    2993: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "SWAP2",
      path: "0",
    },
    2994: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "SUB",
      path: "0",
    },
    2995: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "SWAP1",
      path: "0",
    },
    2996: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "LOG3",
      path: "0",
    },
    2997: {
      fn: "ERC721._setApprovalForAll",
      offset: [11301, 11608],
      op: "POP",
      path: "0",
    },
    2998: {
      fn: "ERC721._setApprovalForAll",
      offset: [11301, 11608],
      op: "POP",
      path: "0",
    },
    2999: {
      fn: "ERC721._setApprovalForAll",
      offset: [11301, 11608],
      op: "POP",
      path: "0",
    },
    3000: {
      fn: "ERC721._setApprovalForAll",
      jump: "o",
      offset: [11301, 11608],
      op: "JUMP",
      path: "0",
    },
    3001: {
      fn: "ERC721._safeTransfer",
      offset: [6534, 6841],
      op: "JUMPDEST",
      path: "0",
    },
    3002: {
      fn: "ERC721._safeTransfer",
      offset: [6685, 6713],
      op: "PUSH2",
      path: "0",
      statement: 40,
      value: "0xBC4",
    },
    3005: {
      fn: "ERC721._safeTransfer",
      offset: [6695, 6699],
      op: "DUP5",
      path: "0",
    },
    3006: {
      fn: "ERC721._safeTransfer",
      offset: [6701, 6703],
      op: "DUP5",
      path: "0",
    },
    3007: {
      fn: "ERC721._safeTransfer",
      offset: [6705, 6712],
      op: "DUP5",
      path: "0",
    },
    3008: {
      fn: "ERC721._safeTransfer",
      offset: [6685, 6694],
      op: "PUSH2",
      path: "0",
      value: "0x94A",
    },
    3011: {
      fn: "ERC721._safeTransfer",
      jump: "i",
      offset: [6685, 6713],
      op: "JUMP",
      path: "0",
    },
    3012: {
      fn: "ERC721._safeTransfer",
      offset: [6685, 6713],
      op: "JUMPDEST",
      path: "0",
    },
    3013: {
      fn: "ERC721._safeTransfer",
      offset: [6731, 6779],
      op: "PUSH2",
      path: "0",
      statement: 41,
      value: "0xBD0",
    },
    3016: {
      fn: "ERC721._safeTransfer",
      offset: [6754, 6758],
      op: "DUP5",
      path: "0",
    },
    3017: {
      fn: "ERC721._safeTransfer",
      offset: [6760, 6762],
      op: "DUP5",
      path: "0",
    },
    3018: {
      fn: "ERC721._safeTransfer",
      offset: [6764, 6771],
      op: "DUP5",
      path: "0",
    },
    3019: {
      fn: "ERC721._safeTransfer",
      offset: [6773, 6778],
      op: "DUP5",
      path: "0",
    },
    3020: {
      fn: "ERC721._safeTransfer",
      offset: [6731, 6753],
      op: "PUSH2",
      path: "0",
      value: "0xCD4",
    },
    3023: {
      fn: "ERC721._safeTransfer",
      jump: "i",
      offset: [6731, 6779],
      op: "JUMP",
      path: "0",
    },
    3024: {
      branch: 57,
      fn: "ERC721._safeTransfer",
      offset: [6731, 6779],
      op: "JUMPDEST",
      path: "0",
    },
    3025: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "PUSH2",
      path: "0",
      value: "0x656",
    },
    3028: {
      branch: 57,
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "JUMPI",
      path: "0",
    },
    3029: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3031: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "MLOAD",
      path: "0",
    },
    3032: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    3036: {
      op: "PUSH1",
      value: "0xE5",
    },
    3038: {
      op: "SHL",
    },
    3039: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "DUP2",
      path: "0",
    },
    3040: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "MSTORE",
      path: "0",
    },
    3041: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    3043: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "ADD",
      path: "0",
    },
    3044: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "PUSH2",
      path: "0",
      value: "0x381",
    },
    3047: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "SWAP1",
      path: "0",
    },
    3048: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "PUSH2",
      path: "0",
      value: "0x1288",
    },
    3051: {
      fn: "ERC721._safeTransfer",
      jump: "i",
      offset: [6723, 6834],
      op: "JUMP",
      path: "0",
    },
    3052: {
      fn: "ERC721.tokenURI",
      offset: [2803, 3132],
      op: "JUMPDEST",
      path: "0",
    },
    3053: {
      fn: "ERC721._exists",
      offset: [7209, 7213],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    3055: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "DUP2",
      path: "0",
    },
    3056: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "DUP2",
      path: "0",
    },
    3057: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "MSTORE",
      path: "0",
    },
    3058: {
      fn: "ERC721._exists",
      offset: [7232, 7239],
      op: "PUSH1",
      path: "0",
      value: "0x2",
    },
    3060: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3062: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "MSTORE",
      path: "0",
    },
    3063: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3065: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "SWAP1",
      path: "0",
    },
    3066: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "KECCAK256",
      path: "0",
    },
    3067: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "SLOAD",
      path: "0",
    },
    3068: {
      fn: "ERC721.tokenURI",
      offset: [2876, 2889],
      op: "PUSH1",
      path: "0",
      value: "0x60",
    },
    3070: {
      fn: "ERC721.tokenURI",
      offset: [2876, 2889],
      op: "SWAP1",
      path: "0",
    },
    3071: {
      op: "PUSH1",
      value: "0x1",
    },
    3073: {
      op: "PUSH1",
      value: "0x1",
    },
    3075: {
      op: "PUSH1",
      value: "0xA0",
    },
    3077: {
      op: "SHL",
    },
    3078: {
      op: "SUB",
    },
    3079: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "AND",
      path: "0",
    },
    3080: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "PUSH2",
      path: "0",
      statement: 42,
      value: "0xC6B",
    },
    3083: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "JUMPI",
      path: "0",
    },
    3084: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3086: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "MLOAD",
      path: "0",
    },
    3087: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    3091: {
      op: "PUSH1",
      value: "0xE5",
    },
    3093: {
      op: "SHL",
    },
    3094: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "DUP2",
      path: "0",
    },
    3095: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "MSTORE",
      path: "0",
    },
    3096: {
      op: "PUSH1",
      value: "0x20",
    },
    3098: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    3100: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "DUP3",
      path: "0",
    },
    3101: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "ADD",
      path: "0",
    },
    3102: {
      op: "MSTORE",
    },
    3103: {
      op: "PUSH1",
      value: "0x2F",
    },
    3105: {
      op: "PUSH1",
      value: "0x24",
    },
    3107: {
      op: "DUP3",
    },
    3108: {
      op: "ADD",
    },
    3109: {
      op: "MSTORE",
    },
    3110: {
      op: "PUSH32",
      value:
        "0x4552433732314D657461646174613A2055524920717565727920666F72206E6F",
    },
    3143: {
      op: "PUSH1",
      value: "0x44",
    },
    3145: {
      op: "DUP3",
    },
    3146: {
      op: "ADD",
    },
    3147: {
      op: "MSTORE",
    },
    3148: {
      op: "PUSH15",
      value: "0x3732BC34B9BA32B73A103A37B5B2B7",
    },
    3164: {
      op: "PUSH1",
      value: "0x89",
    },
    3166: {
      op: "SHL",
    },
    3167: {
      op: "PUSH1",
      value: "0x64",
    },
    3169: {
      op: "DUP3",
    },
    3170: {
      op: "ADD",
    },
    3171: {
      op: "MSTORE",
    },
    3172: {
      op: "PUSH1",
      value: "0x84",
    },
    3174: {
      op: "ADD",
    },
    3175: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "PUSH2",
      path: "0",
      value: "0x381",
    },
    3178: {
      op: "JUMP",
    },
    3179: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "JUMPDEST",
      path: "0",
    },
    3180: {
      fn: "ERC721.tokenURI",
      offset: [2988, 3009],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    3182: {
      fn: "ERC721.tokenURI",
      offset: [3012, 3022],
      op: "PUSH2",
      path: "0",
      value: "0xC82",
    },
    3185: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3187: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "DUP1",
      path: "0",
    },
    3188: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "MLOAD",
      path: "0",
    },
    3189: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3191: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "DUP2",
      path: "0",
    },
    3192: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "ADD",
      path: "0",
    },
    3193: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "SWAP1",
      path: "0",
    },
    3194: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "SWAP2",
      path: "0",
    },
    3195: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "MSTORE",
      path: "0",
    },
    3196: {
      op: "PUSH1",
      value: "0x0",
    },
    3198: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "DUP2",
      path: "0",
    },
    3199: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "MSTORE",
      path: "0",
    },
    3200: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "SWAP1",
      path: "0",
    },
    3201: {
      fn: "ERC721._baseURI",
      offset: [3373, 3465],
      op: "JUMP",
      path: "0",
    },
    3202: {
      fn: "ERC721.tokenURI",
      offset: [3012, 3022],
      op: "JUMPDEST",
      path: "0",
    },
    3203: {
      fn: "ERC721.tokenURI",
      offset: [2988, 3022],
      op: "SWAP1",
      path: "0",
    },
    3204: {
      fn: "ERC721.tokenURI",
      offset: [2988, 3022],
      op: "POP",
      path: "0",
    },
    3205: {
      fn: "ERC721.tokenURI",
      offset: [3063, 3064],
      op: "PUSH1",
      path: "0",
      statement: 43,
      value: "0x0",
    },
    3207: {
      fn: "ERC721.tokenURI",
      offset: [3045, 3052],
      op: "DUP2",
      path: "0",
    },
    3208: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3060],
      op: "MLOAD",
      path: "0",
    },
    3209: {
      branch: 58,
      fn: "ERC721.tokenURI",
      offset: [3039, 3064],
      op: "GT",
      path: "0",
    },
    3210: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "PUSH2",
      path: "0",
      value: "0xCA2",
    },
    3213: {
      branch: 58,
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "JUMPI",
      path: "0",
    },
    3214: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3216: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "MLOAD",
      path: "0",
    },
    3217: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "DUP1",
      path: "0",
    },
    3218: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3220: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "ADD",
      path: "0",
    },
    3221: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3223: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "MSTORE",
      path: "0",
    },
    3224: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "DUP1",
      path: "0",
    },
    3225: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    3227: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "DUP2",
      path: "0",
    },
    3228: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "MSTORE",
      path: "0",
    },
    3229: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "POP",
      path: "0",
    },
    3230: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "PUSH2",
      path: "0",
      value: "0xCCD",
    },
    3233: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "JUMP",
      path: "0",
    },
    3234: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "JUMPDEST",
      path: "0",
    },
    3235: {
      fn: "ERC721.tokenURI",
      offset: [3091, 3098],
      op: "DUP1",
      path: "0",
    },
    3236: {
      fn: "ERC721.tokenURI",
      offset: [3100, 3118],
      op: "PUSH2",
      path: "0",
      value: "0xCAC",
    },
    3239: {
      fn: "ERC721.tokenURI",
      offset: [3100, 3107],
      op: "DUP5",
      path: "0",
    },
    3240: {
      fn: "ERC721.tokenURI",
      offset: [3100, 3116],
      op: "PUSH2",
      path: "0",
      value: "0xDD2",
    },
    3243: {
      fn: "ERC721.tokenURI",
      jump: "i",
      offset: [3100, 3118],
      op: "JUMP",
      path: "0",
    },
    3244: {
      fn: "ERC721.tokenURI",
      offset: [3100, 3118],
      op: "JUMPDEST",
      path: "0",
    },
    3245: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3247: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "MLOAD",
      path: "0",
    },
    3248: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3250: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "ADD",
      path: "0",
    },
    3251: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "PUSH2",
      path: "0",
      value: "0xCBD",
    },
    3254: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "SWAP3",
      path: "0",
    },
    3255: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "SWAP2",
      path: "0",
    },
    3256: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "SWAP1",
      path: "0",
    },
    3257: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "PUSH2",
      path: "0",
      value: "0x1214",
    },
    3260: {
      fn: "ERC721.tokenURI",
      jump: "i",
      offset: [3074, 3119],
      op: "JUMP",
      path: "0",
    },
    3261: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "JUMPDEST",
      path: "0",
    },
    3262: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3264: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "MLOAD",
      path: "0",
    },
    3265: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3267: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "DUP2",
      path: "0",
    },
    3268: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "DUP4",
      path: "0",
    },
    3269: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "SUB",
      path: "0",
    },
    3270: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "SUB",
      path: "0",
    },
    3271: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "DUP2",
      path: "0",
    },
    3272: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "MSTORE",
      path: "0",
    },
    3273: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "SWAP1",
      path: "0",
    },
    3274: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3276: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "MSTORE",
      path: "0",
    },
    3277: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "JUMPDEST",
      path: "0",
    },
    3278: {
      fn: "ERC721.tokenURI",
      offset: [3032, 3125],
      op: "SWAP4",
      path: "0",
    },
    3279: {
      fn: "ERC721.tokenURI",
      offset: [2803, 3132],
      op: "SWAP3",
      path: "0",
    },
    3280: {
      op: "POP",
    },
    3281: {
      op: "POP",
    },
    3282: {
      op: "POP",
    },
    3283: {
      fn: "ERC721.tokenURI",
      jump: "o",
      offset: [2803, 3132],
      op: "JUMP",
      path: "0",
    },
    3284: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12161, 12939],
      op: "JUMPDEST",
      path: "0",
    },
    3285: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12311, 12315],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    3287: {
      op: "PUSH1",
      value: "0x1",
    },
    3289: {
      op: "PUSH1",
      value: "0x1",
    },
    3291: {
      op: "PUSH1",
      value: "0xA0",
    },
    3293: {
      op: "SHL",
    },
    3294: {
      op: "SUB",
    },
    3295: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12331, 12344],
      op: "DUP5",
      path: "0",
    },
    3296: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12331, 12344],
      op: "AND",
      path: "0",
    },
    3297: {
      op: "EXTCODESIZE",
    },
    3298: {
      op: "ISZERO",
    },
    3299: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12327, 12933],
      op: "PUSH2",
      path: "0",
      value: "0xDC7",
    },
    3302: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12327, 12933],
      op: "JUMPI",
      path: "0",
    },
    3303: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3305: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "MLOAD",
      path: "0",
    },
    3306: {
      op: "PUSH4",
      value: "0xA85BD01",
    },
    3311: {
      op: "PUSH1",
      value: "0xE1",
    },
    3313: {
      op: "SHL",
    },
    3314: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP2",
      path: "0",
    },
    3315: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "MSTORE",
      path: "0",
    },
    3316: {
      op: "PUSH1",
      value: "0x1",
    },
    3318: {
      op: "PUSH1",
      value: "0x1",
    },
    3320: {
      op: "PUSH1",
      value: "0xA0",
    },
    3322: {
      op: "SHL",
    },
    3323: {
      op: "SUB",
    },
    3324: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12402],
      op: "DUP6",
      path: "0",
    },
    3325: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12402],
      op: "AND",
      path: "0",
    },
    3326: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12402],
      op: "SWAP1",
      path: "0",
    },
    3327: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12402],
      op: "PUSH4",
      path: "0",
      value: "0x150B7A02",
    },
    3332: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12402],
      op: "SWAP1",
      path: "0",
    },
    3333: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH2",
      path: "0",
      value: "0xD18",
    },
    3336: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SWAP1",
      path: "0",
    },
    3337: {
      fn: "Context._msgSender",
      offset: [719, 729],
      op: "CALLER",
      path: "6",
    },
    3338: {
      fn: "Context._msgSender",
      offset: [719, 729],
      op: "SWAP1",
      path: "6",
    },
    3339: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12417, 12421],
      op: "DUP10",
      path: "0",
    },
    3340: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12417, 12421],
      op: "SWAP1",
      path: "0",
    },
    3341: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12423, 12430],
      op: "DUP9",
      path: "0",
    },
    3342: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12423, 12430],
      op: "SWAP1",
      path: "0",
    },
    3343: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12432, 12437],
      op: "DUP9",
      path: "0",
    },
    3344: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12432, 12437],
      op: "SWAP1",
      path: "0",
    },
    3345: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    3347: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "ADD",
      path: "0",
    },
    3348: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH2",
      path: "0",
      value: "0x12DA",
    },
    3351: {
      fn: "ERC721._checkOnERC721Received",
      jump: "i",
      offset: [12366, 12438],
      op: "JUMP",
      path: "0",
    },
    3352: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "JUMPDEST",
      path: "0",
    },
    3353: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3355: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3357: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "MLOAD",
      path: "0",
    },
    3358: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP1",
      path: "0",
    },
    3359: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP4",
      path: "0",
    },
    3360: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SUB",
      path: "0",
    },
    3361: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP2",
      path: "0",
    },
    3362: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    3364: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP8",
      path: "0",
    },
    3365: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "GAS",
      path: "0",
    },
    3366: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "CALL",
      path: "0",
    },
    3367: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SWAP3",
      path: "0",
    },
    3368: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "POP",
      path: "0",
    },
    3369: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "POP",
      path: "0",
    },
    3370: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "POP",
      path: "0",
    },
    3371: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP1",
      path: "0",
    },
    3372: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "ISZERO",
      path: "0",
    },
    3373: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH2",
      path: "0",
      value: "0xD53",
    },
    3376: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "JUMPI",
      path: "0",
    },
    3377: {
      op: "POP",
    },
    3378: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3380: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP1",
      path: "0",
    },
    3381: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "MLOAD",
      path: "0",
    },
    3382: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x1F",
    },
    3384: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "RETURNDATASIZE",
      path: "0",
    },
    3385: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SWAP1",
      path: "0",
    },
    3386: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP2",
      path: "0",
    },
    3387: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "ADD",
      path: "0",
    },
    3388: {
      op: "PUSH1",
      value: "0x1F",
    },
    3390: {
      op: "NOT",
    },
    3391: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "AND",
      path: "0",
    },
    3392: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP3",
      path: "0",
    },
    3393: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "ADD",
      path: "0",
    },
    3394: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SWAP1",
      path: "0",
    },
    3395: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SWAP3",
      path: "0",
    },
    3396: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "MSTORE",
      path: "0",
    },
    3397: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH2",
      path: "0",
      value: "0xD50",
    },
    3400: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SWAP2",
      path: "0",
    },
    3401: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP2",
      path: "0",
    },
    3402: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "ADD",
      path: "0",
    },
    3403: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SWAP1",
      path: "0",
    },
    3404: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH2",
      path: "0",
      value: "0x1317",
    },
    3407: {
      fn: "ERC721._checkOnERC721Received",
      jump: "i",
      offset: [12366, 12438],
      op: "JUMP",
      path: "0",
    },
    3408: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "JUMPDEST",
      path: "0",
    },
    3409: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x1",
    },
    3411: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "JUMPDEST",
      path: "0",
    },
    3412: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH2",
      path: "0",
      value: "0xDAD",
    },
    3415: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "JUMPI",
      path: "0",
    },
    3416: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "RETURNDATASIZE",
      path: "0",
    },
    3417: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "DUP1",
      path: "0",
    },
    3418: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "DUP1",
      path: "0",
    },
    3419: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "ISZERO",
      path: "0",
    },
    3420: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH2",
      path: "0",
      value: "0xD81",
    },
    3423: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "JUMPI",
      path: "0",
    },
    3424: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3426: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "MLOAD",
      path: "0",
    },
    3427: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "SWAP2",
      path: "0",
    },
    3428: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "POP",
      path: "0",
    },
    3429: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH1",
      path: "0",
      value: "0x1F",
    },
    3431: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "NOT",
      path: "0",
    },
    3432: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH1",
      path: "0",
      value: "0x3F",
    },
    3434: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "RETURNDATASIZE",
      path: "0",
    },
    3435: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "ADD",
      path: "0",
    },
    3436: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "AND",
      path: "0",
    },
    3437: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "DUP3",
      path: "0",
    },
    3438: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "ADD",
      path: "0",
    },
    3439: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3441: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "MSTORE",
      path: "0",
    },
    3442: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "RETURNDATASIZE",
      path: "0",
    },
    3443: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "DUP3",
      path: "0",
    },
    3444: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "MSTORE",
      path: "0",
    },
    3445: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "RETURNDATASIZE",
      path: "0",
    },
    3446: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    3448: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3450: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "DUP5",
      path: "0",
    },
    3451: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "ADD",
      path: "0",
    },
    3452: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "RETURNDATACOPY",
      path: "0",
    },
    3453: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH2",
      path: "0",
      value: "0xD86",
    },
    3456: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "JUMP",
      path: "0",
    },
    3457: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "JUMPDEST",
      path: "0",
    },
    3458: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH1",
      path: "0",
      value: "0x60",
    },
    3460: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "SWAP2",
      path: "0",
    },
    3461: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "POP",
      path: "0",
    },
    3462: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "JUMPDEST",
      path: "0",
    },
    3463: {
      op: "POP",
    },
    3464: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12605, 12618],
      op: "DUP1",
      path: "0",
    },
    3465: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12605, 12618],
      op: "MLOAD",
      path: "0",
    },
    3466: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12601, 12867],
      op: "PUSH2",
      path: "0",
      value: "0xDA5",
    },
    3469: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12601, 12867],
      op: "JUMPI",
      path: "0",
    },
    3470: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "PUSH1",
      path: "0",
      statement: 44,
      value: "0x40",
    },
    3472: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "MLOAD",
      path: "0",
    },
    3473: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    3477: {
      op: "PUSH1",
      value: "0xE5",
    },
    3479: {
      op: "SHL",
    },
    3480: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "DUP2",
      path: "0",
    },
    3481: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "MSTORE",
      path: "0",
    },
    3482: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    3484: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "ADD",
      path: "0",
    },
    3485: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "PUSH2",
      path: "0",
      value: "0x381",
    },
    3488: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "SWAP1",
      path: "0",
    },
    3489: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "PUSH2",
      path: "0",
      value: "0x1288",
    },
    3492: {
      fn: "ERC721._checkOnERC721Received",
      jump: "i",
      offset: [12647, 12707],
      op: "JUMP",
      path: "0",
    },
    3493: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12601, 12867],
      op: "JUMPDEST",
      path: "0",
    },
    3494: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12819, 12825],
      op: "DUP1",
      path: "0",
    },
    3495: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12813, 12826],
      op: "MLOAD",
      path: "0",
    },
    3496: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12804, 12810],
      op: "DUP2",
      path: "0",
    },
    3497: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12800, 12802],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3499: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12796, 12811],
      op: "ADD",
      path: "0",
    },
    3500: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12789, 12827],
      op: "REVERT",
      path: "0",
    },
    3501: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "JUMPDEST",
      path: "0",
    },
    3502: {
      op: "PUSH1",
      value: "0x1",
    },
    3504: {
      op: "PUSH1",
      value: "0x1",
    },
    3506: {
      op: "PUSH1",
      value: "0xE0",
    },
    3508: {
      op: "SHL",
    },
    3509: {
      op: "SUB",
    },
    3510: {
      op: "NOT",
    },
    3511: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12488, 12539],
      op: "AND",
      path: "0",
      statement: 45,
    },
    3512: {
      op: "PUSH4",
      value: "0xA85BD01",
    },
    3517: {
      op: "PUSH1",
      value: "0xE1",
    },
    3519: {
      op: "SHL",
    },
    3520: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12488, 12539],
      op: "EQ",
      path: "0",
    },
    3521: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12488, 12539],
      op: "SWAP1",
      path: "0",
    },
    3522: {
      op: "POP",
    },
    3523: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12481, 12539],
      op: "PUSH2",
      path: "0",
      value: "0x7DB",
    },
    3526: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12481, 12539],
      op: "JUMP",
      path: "0",
    },
    3527: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12327, 12933],
      op: "JUMPDEST",
      path: "0",
    },
    3528: {
      op: "POP",
    },
    3529: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12918, 12922],
      op: "PUSH1",
      path: "0",
      statement: 46,
      value: "0x1",
    },
    3531: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12161, 12939],
      op: "SWAP5",
      path: "0",
    },
    3532: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12161, 12939],
      op: "SWAP4",
      path: "0",
    },
    3533: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12161, 12939],
      op: "POP",
      path: "0",
    },
    3534: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12161, 12939],
      op: "POP",
      path: "0",
    },
    3535: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12161, 12939],
      op: "POP",
      path: "0",
    },
    3536: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12161, 12939],
      op: "POP",
      path: "0",
    },
    3537: {
      fn: "ERC721._checkOnERC721Received",
      jump: "o",
      offset: [12161, 12939],
      op: "JUMP",
      path: "0",
    },
    3538: {
      op: "JUMPDEST",
    },
    3539: {
      op: "PUSH1",
      value: "0x60",
    },
    3541: {
      op: "DUP2",
    },
    3542: {
      op: "PUSH2",
      value: "0xDF6",
    },
    3545: {
      op: "JUMPI",
    },
    3546: {
      op: "POP",
    },
    3547: {
      op: "POP",
    },
    3548: {
      op: "PUSH1",
      value: "0x40",
    },
    3550: {
      op: "DUP1",
    },
    3551: {
      op: "MLOAD",
    },
    3552: {
      op: "DUP1",
    },
    3553: {
      op: "DUP3",
    },
    3554: {
      op: "ADD",
    },
    3555: {
      op: "SWAP1",
    },
    3556: {
      op: "SWAP2",
    },
    3557: {
      op: "MSTORE",
    },
    3558: {
      op: "PUSH1",
      value: "0x1",
    },
    3560: {
      op: "DUP2",
    },
    3561: {
      op: "MSTORE",
    },
    3562: {
      op: "PUSH1",
      value: "0x3",
    },
    3564: {
      op: "PUSH1",
      value: "0xFC",
    },
    3566: {
      op: "SHL",
    },
    3567: {
      op: "PUSH1",
      value: "0x20",
    },
    3569: {
      op: "DUP3",
    },
    3570: {
      op: "ADD",
    },
    3571: {
      op: "MSTORE",
    },
    3572: {
      op: "SWAP1",
    },
    3573: {
      jump: "o",
      op: "JUMP",
    },
    3574: {
      op: "JUMPDEST",
    },
    3575: {
      op: "DUP2",
    },
    3576: {
      op: "PUSH1",
      value: "0x0",
    },
    3578: {
      op: "JUMPDEST",
    },
    3579: {
      op: "DUP2",
    },
    3580: {
      op: "ISZERO",
    },
    3581: {
      op: "PUSH2",
      value: "0xE20",
    },
    3584: {
      op: "JUMPI",
    },
    3585: {
      op: "DUP1",
    },
    3586: {
      op: "PUSH2",
      value: "0xE0A",
    },
    3589: {
      op: "DUP2",
    },
    3590: {
      op: "PUSH2",
      value: "0x1334",
    },
    3593: {
      jump: "i",
      op: "JUMP",
    },
    3594: {
      op: "JUMPDEST",
    },
    3595: {
      op: "SWAP2",
    },
    3596: {
      op: "POP",
    },
    3597: {
      op: "PUSH2",
      value: "0xE19",
    },
    3600: {
      op: "SWAP1",
    },
    3601: {
      op: "POP",
    },
    3602: {
      op: "PUSH1",
      value: "0xA",
    },
    3604: {
      op: "DUP4",
    },
    3605: {
      op: "PUSH2",
      value: "0x1365",
    },
    3608: {
      jump: "i",
      op: "JUMP",
    },
    3609: {
      op: "JUMPDEST",
    },
    3610: {
      op: "SWAP2",
    },
    3611: {
      op: "POP",
    },
    3612: {
      op: "PUSH2",
      value: "0xDFA",
    },
    3615: {
      op: "JUMP",
    },
    3616: {
      op: "JUMPDEST",
    },
    3617: {
      op: "PUSH1",
      value: "0x0",
    },
    3619: {
      op: "DUP2",
    },
    3620: {
      op: "PUSH8",
      value: "0xFFFFFFFFFFFFFFFF",
    },
    3629: {
      op: "DUP2",
    },
    3630: {
      op: "GT",
    },
    3631: {
      op: "ISZERO",
    },
    3632: {
      op: "PUSH2",
      value: "0xE3B",
    },
    3635: {
      op: "JUMPI",
    },
    3636: {
      op: "PUSH2",
      value: "0xE3B",
    },
    3639: {
      op: "PUSH2",
      value: "0x1063",
    },
    3642: {
      jump: "i",
      op: "JUMP",
    },
    3643: {
      op: "JUMPDEST",
    },
    3644: {
      op: "PUSH1",
      value: "0x40",
    },
    3646: {
      op: "MLOAD",
    },
    3647: {
      op: "SWAP1",
    },
    3648: {
      op: "DUP1",
    },
    3649: {
      op: "DUP3",
    },
    3650: {
      op: "MSTORE",
    },
    3651: {
      op: "DUP1",
    },
    3652: {
      op: "PUSH1",
      value: "0x1F",
    },
    3654: {
      op: "ADD",
    },
    3655: {
      op: "PUSH1",
      value: "0x1F",
    },
    3657: {
      op: "NOT",
    },
    3658: {
      op: "AND",
    },
    3659: {
      op: "PUSH1",
      value: "0x20",
    },
    3661: {
      op: "ADD",
    },
    3662: {
      op: "DUP3",
    },
    3663: {
      op: "ADD",
    },
    3664: {
      op: "PUSH1",
      value: "0x40",
    },
    3666: {
      op: "MSTORE",
    },
    3667: {
      op: "DUP1",
    },
    3668: {
      op: "ISZERO",
    },
    3669: {
      op: "PUSH2",
      value: "0xE65",
    },
    3672: {
      op: "JUMPI",
    },
    3673: {
      op: "PUSH1",
      value: "0x20",
    },
    3675: {
      op: "DUP3",
    },
    3676: {
      op: "ADD",
    },
    3677: {
      op: "DUP2",
    },
    3678: {
      op: "DUP1",
    },
    3679: {
      op: "CALLDATASIZE",
    },
    3680: {
      op: "DUP4",
    },
    3681: {
      op: "CALLDATACOPY",
    },
    3682: {
      op: "ADD",
    },
    3683: {
      op: "SWAP1",
    },
    3684: {
      op: "POP",
    },
    3685: {
      op: "JUMPDEST",
    },
    3686: {
      op: "POP",
    },
    3687: {
      op: "SWAP1",
    },
    3688: {
      op: "POP",
    },
    3689: {
      op: "JUMPDEST",
    },
    3690: {
      op: "DUP5",
    },
    3691: {
      op: "ISZERO",
    },
    3692: {
      op: "PUSH2",
      value: "0x7DB",
    },
    3695: {
      op: "JUMPI",
    },
    3696: {
      op: "PUSH2",
      value: "0xE7A",
    },
    3699: {
      op: "PUSH1",
      value: "0x1",
    },
    3701: {
      op: "DUP4",
    },
    3702: {
      op: "PUSH2",
      value: "0x1259",
    },
    3705: {
      jump: "i",
      op: "JUMP",
    },
    3706: {
      op: "JUMPDEST",
    },
    3707: {
      op: "SWAP2",
    },
    3708: {
      op: "POP",
    },
    3709: {
      op: "PUSH2",
      value: "0xE87",
    },
    3712: {
      op: "PUSH1",
      value: "0xA",
    },
    3714: {
      op: "DUP7",
    },
    3715: {
      op: "PUSH2",
      value: "0x1379",
    },
    3718: {
      jump: "i",
      op: "JUMP",
    },
    3719: {
      op: "JUMPDEST",
    },
    3720: {
      op: "PUSH2",
      value: "0xE92",
    },
    3723: {
      op: "SWAP1",
    },
    3724: {
      op: "PUSH1",
      value: "0x30",
    },
    3726: {
      op: "PUSH2",
      value: "0x1270",
    },
    3729: {
      jump: "i",
      op: "JUMP",
    },
    3730: {
      op: "JUMPDEST",
    },
    3731: {
      op: "PUSH1",
      value: "0xF8",
    },
    3733: {
      op: "SHL",
    },
    3734: {
      op: "DUP2",
    },
    3735: {
      op: "DUP4",
    },
    3736: {
      op: "DUP2",
    },
    3737: {
      op: "MLOAD",
    },
    3738: {
      op: "DUP2",
    },
    3739: {
      op: "LT",
    },
    3740: {
      op: "PUSH2",
      value: "0xEA7",
    },
    3743: {
      op: "JUMPI",
    },
    3744: {
      op: "PUSH2",
      value: "0xEA7",
    },
    3747: {
      op: "PUSH2",
      value: "0x138D",
    },
    3750: {
      jump: "i",
      op: "JUMP",
    },
    3751: {
      op: "JUMPDEST",
    },
    3752: {
      op: "PUSH1",
      value: "0x20",
    },
    3754: {
      op: "ADD",
    },
    3755: {
      op: "ADD",
    },
    3756: {
      op: "SWAP1",
    },
    3757: {
      op: "PUSH1",
      value: "0x1",
    },
    3759: {
      op: "PUSH1",
      value: "0x1",
    },
    3761: {
      op: "PUSH1",
      value: "0xF8",
    },
    3763: {
      op: "SHL",
    },
    3764: {
      op: "SUB",
    },
    3765: {
      op: "NOT",
    },
    3766: {
      op: "AND",
    },
    3767: {
      op: "SWAP1",
    },
    3768: {
      op: "DUP2",
    },
    3769: {
      op: "PUSH1",
      value: "0x0",
    },
    3771: {
      op: "BYTE",
    },
    3772: {
      op: "SWAP1",
    },
    3773: {
      op: "MSTORE8",
    },
    3774: {
      op: "POP",
    },
    3775: {
      op: "PUSH2",
      value: "0xEC9",
    },
    3778: {
      op: "PUSH1",
      value: "0xA",
    },
    3780: {
      op: "DUP7",
    },
    3781: {
      op: "PUSH2",
      value: "0x1365",
    },
    3784: {
      jump: "i",
      op: "JUMP",
    },
    3785: {
      op: "JUMPDEST",
    },
    3786: {
      op: "SWAP5",
    },
    3787: {
      op: "POP",
    },
    3788: {
      op: "PUSH2",
      value: "0xE69",
    },
    3791: {
      op: "JUMP",
    },
    3792: {
      op: "JUMPDEST",
    },
    3793: {
      op: "PUSH1",
      value: "0x1",
    },
    3795: {
      op: "PUSH1",
      value: "0x1",
    },
    3797: {
      op: "PUSH1",
      value: "0xE0",
    },
    3799: {
      op: "SHL",
    },
    3800: {
      op: "SUB",
    },
    3801: {
      op: "NOT",
    },
    3802: {
      op: "DUP2",
    },
    3803: {
      op: "AND",
    },
    3804: {
      op: "DUP2",
    },
    3805: {
      op: "EQ",
    },
    3806: {
      op: "PUSH2",
      value: "0xEE6",
    },
    3809: {
      op: "JUMPI",
    },
    3810: {
      op: "PUSH1",
      value: "0x0",
    },
    3812: {
      op: "DUP1",
    },
    3813: {
      op: "REVERT",
    },
    3814: {
      op: "JUMPDEST",
    },
    3815: {
      op: "POP",
    },
    3816: {
      jump: "o",
      op: "JUMP",
    },
    3817: {
      op: "JUMPDEST",
    },
    3818: {
      op: "PUSH1",
      value: "0x0",
    },
    3820: {
      op: "PUSH1",
      value: "0x20",
    },
    3822: {
      op: "DUP3",
    },
    3823: {
      op: "DUP5",
    },
    3824: {
      op: "SUB",
    },
    3825: {
      op: "SLT",
    },
    3826: {
      op: "ISZERO",
    },
    3827: {
      op: "PUSH2",
      value: "0xEFB",
    },
    3830: {
      op: "JUMPI",
    },
    3831: {
      op: "PUSH1",
      value: "0x0",
    },
    3833: {
      op: "DUP1",
    },
    3834: {
      op: "REVERT",
    },
    3835: {
      op: "JUMPDEST",
    },
    3836: {
      op: "DUP2",
    },
    3837: {
      op: "CALLDATALOAD",
    },
    3838: {
      op: "PUSH2",
      value: "0xCCD",
    },
    3841: {
      op: "DUP2",
    },
    3842: {
      op: "PUSH2",
      value: "0xED0",
    },
    3845: {
      jump: "i",
      op: "JUMP",
    },
    3846: {
      op: "JUMPDEST",
    },
    3847: {
      op: "PUSH1",
      value: "0x0",
    },
    3849: {
      op: "JUMPDEST",
    },
    3850: {
      op: "DUP4",
    },
    3851: {
      op: "DUP2",
    },
    3852: {
      op: "LT",
    },
    3853: {
      op: "ISZERO",
    },
    3854: {
      op: "PUSH2",
      value: "0xF21",
    },
    3857: {
      op: "JUMPI",
    },
    3858: {
      op: "DUP2",
    },
    3859: {
      op: "DUP2",
    },
    3860: {
      op: "ADD",
    },
    3861: {
      op: "MLOAD",
    },
    3862: {
      op: "DUP4",
    },
    3863: {
      op: "DUP3",
    },
    3864: {
      op: "ADD",
    },
    3865: {
      op: "MSTORE",
    },
    3866: {
      op: "PUSH1",
      value: "0x20",
    },
    3868: {
      op: "ADD",
    },
    3869: {
      op: "PUSH2",
      value: "0xF09",
    },
    3872: {
      op: "JUMP",
    },
    3873: {
      op: "JUMPDEST",
    },
    3874: {
      op: "DUP4",
    },
    3875: {
      op: "DUP2",
    },
    3876: {
      op: "GT",
    },
    3877: {
      op: "ISZERO",
    },
    3878: {
      op: "PUSH2",
      value: "0x656",
    },
    3881: {
      op: "JUMPI",
    },
    3882: {
      op: "POP",
    },
    3883: {
      op: "POP",
    },
    3884: {
      op: "PUSH1",
      value: "0x0",
    },
    3886: {
      op: "SWAP2",
    },
    3887: {
      op: "ADD",
    },
    3888: {
      op: "MSTORE",
    },
    3889: {
      jump: "o",
      op: "JUMP",
    },
    3890: {
      op: "JUMPDEST",
    },
    3891: {
      op: "PUSH1",
      value: "0x0",
    },
    3893: {
      op: "DUP2",
    },
    3894: {
      op: "MLOAD",
    },
    3895: {
      op: "DUP1",
    },
    3896: {
      op: "DUP5",
    },
    3897: {
      op: "MSTORE",
    },
    3898: {
      op: "PUSH2",
      value: "0xF4A",
    },
    3901: {
      op: "DUP2",
    },
    3902: {
      op: "PUSH1",
      value: "0x20",
    },
    3904: {
      op: "DUP7",
    },
    3905: {
      op: "ADD",
    },
    3906: {
      op: "PUSH1",
      value: "0x20",
    },
    3908: {
      op: "DUP7",
    },
    3909: {
      op: "ADD",
    },
    3910: {
      op: "PUSH2",
      value: "0xF06",
    },
    3913: {
      jump: "i",
      op: "JUMP",
    },
    3914: {
      op: "JUMPDEST",
    },
    3915: {
      op: "PUSH1",
      value: "0x1F",
    },
    3917: {
      op: "ADD",
    },
    3918: {
      op: "PUSH1",
      value: "0x1F",
    },
    3920: {
      op: "NOT",
    },
    3921: {
      op: "AND",
    },
    3922: {
      op: "SWAP3",
    },
    3923: {
      op: "SWAP1",
    },
    3924: {
      op: "SWAP3",
    },
    3925: {
      op: "ADD",
    },
    3926: {
      op: "PUSH1",
      value: "0x20",
    },
    3928: {
      op: "ADD",
    },
    3929: {
      op: "SWAP3",
    },
    3930: {
      op: "SWAP2",
    },
    3931: {
      op: "POP",
    },
    3932: {
      op: "POP",
    },
    3933: {
      jump: "o",
      op: "JUMP",
    },
    3934: {
      op: "JUMPDEST",
    },
    3935: {
      op: "PUSH1",
      value: "0x20",
    },
    3937: {
      op: "DUP2",
    },
    3938: {
      op: "MSTORE",
    },
    3939: {
      op: "PUSH1",
      value: "0x0",
    },
    3941: {
      op: "PUSH2",
      value: "0xCCD",
    },
    3944: {
      op: "PUSH1",
      value: "0x20",
    },
    3946: {
      op: "DUP4",
    },
    3947: {
      op: "ADD",
    },
    3948: {
      op: "DUP5",
    },
    3949: {
      op: "PUSH2",
      value: "0xF32",
    },
    3952: {
      jump: "i",
      op: "JUMP",
    },
    3953: {
      op: "JUMPDEST",
    },
    3954: {
      op: "PUSH1",
      value: "0x0",
    },
    3956: {
      op: "PUSH1",
      value: "0x20",
    },
    3958: {
      op: "DUP3",
    },
    3959: {
      op: "DUP5",
    },
    3960: {
      op: "SUB",
    },
    3961: {
      op: "SLT",
    },
    3962: {
      op: "ISZERO",
    },
    3963: {
      op: "PUSH2",
      value: "0xF83",
    },
    3966: {
      op: "JUMPI",
    },
    3967: {
      op: "PUSH1",
      value: "0x0",
    },
    3969: {
      op: "DUP1",
    },
    3970: {
      op: "REVERT",
    },
    3971: {
      op: "JUMPDEST",
    },
    3972: {
      op: "POP",
    },
    3973: {
      op: "CALLDATALOAD",
    },
    3974: {
      op: "SWAP2",
    },
    3975: {
      op: "SWAP1",
    },
    3976: {
      op: "POP",
    },
    3977: {
      jump: "o",
      op: "JUMP",
    },
    3978: {
      op: "JUMPDEST",
    },
    3979: {
      op: "DUP1",
    },
    3980: {
      op: "CALLDATALOAD",
    },
    3981: {
      op: "PUSH1",
      value: "0x1",
    },
    3983: {
      op: "PUSH1",
      value: "0x1",
    },
    3985: {
      op: "PUSH1",
      value: "0xA0",
    },
    3987: {
      op: "SHL",
    },
    3988: {
      op: "SUB",
    },
    3989: {
      op: "DUP2",
    },
    3990: {
      op: "AND",
    },
    3991: {
      op: "DUP2",
    },
    3992: {
      op: "EQ",
    },
    3993: {
      op: "PUSH2",
      value: "0xFA1",
    },
    3996: {
      op: "JUMPI",
    },
    3997: {
      op: "PUSH1",
      value: "0x0",
    },
    3999: {
      op: "DUP1",
    },
    4000: {
      op: "REVERT",
    },
    4001: {
      op: "JUMPDEST",
    },
    4002: {
      op: "SWAP2",
    },
    4003: {
      op: "SWAP1",
    },
    4004: {
      op: "POP",
    },
    4005: {
      jump: "o",
      op: "JUMP",
    },
    4006: {
      op: "JUMPDEST",
    },
    4007: {
      op: "PUSH1",
      value: "0x0",
    },
    4009: {
      op: "DUP1",
    },
    4010: {
      op: "PUSH1",
      value: "0x40",
    },
    4012: {
      op: "DUP4",
    },
    4013: {
      op: "DUP6",
    },
    4014: {
      op: "SUB",
    },
    4015: {
      op: "SLT",
    },
    4016: {
      op: "ISZERO",
    },
    4017: {
      op: "PUSH2",
      value: "0xFB9",
    },
    4020: {
      op: "JUMPI",
    },
    4021: {
      op: "PUSH1",
      value: "0x0",
    },
    4023: {
      op: "DUP1",
    },
    4024: {
      op: "REVERT",
    },
    4025: {
      op: "JUMPDEST",
    },
    4026: {
      op: "PUSH2",
      value: "0xFC2",
    },
    4029: {
      op: "DUP4",
    },
    4030: {
      op: "PUSH2",
      value: "0xF8A",
    },
    4033: {
      jump: "i",
      op: "JUMP",
    },
    4034: {
      op: "JUMPDEST",
    },
    4035: {
      op: "SWAP5",
    },
    4036: {
      op: "PUSH1",
      value: "0x20",
    },
    4038: {
      op: "SWAP4",
    },
    4039: {
      op: "SWAP1",
    },
    4040: {
      op: "SWAP4",
    },
    4041: {
      op: "ADD",
    },
    4042: {
      op: "CALLDATALOAD",
    },
    4043: {
      op: "SWAP4",
    },
    4044: {
      op: "POP",
    },
    4045: {
      op: "POP",
    },
    4046: {
      op: "POP",
    },
    4047: {
      jump: "o",
      op: "JUMP",
    },
    4048: {
      op: "JUMPDEST",
    },
    4049: {
      op: "PUSH1",
      value: "0x0",
    },
    4051: {
      op: "DUP1",
    },
    4052: {
      op: "PUSH1",
      value: "0x0",
    },
    4054: {
      op: "PUSH1",
      value: "0x60",
    },
    4056: {
      op: "DUP5",
    },
    4057: {
      op: "DUP7",
    },
    4058: {
      op: "SUB",
    },
    4059: {
      op: "SLT",
    },
    4060: {
      op: "ISZERO",
    },
    4061: {
      op: "PUSH2",
      value: "0xFE5",
    },
    4064: {
      op: "JUMPI",
    },
    4065: {
      op: "PUSH1",
      value: "0x0",
    },
    4067: {
      op: "DUP1",
    },
    4068: {
      op: "REVERT",
    },
    4069: {
      op: "JUMPDEST",
    },
    4070: {
      op: "PUSH2",
      value: "0xFEE",
    },
    4073: {
      op: "DUP5",
    },
    4074: {
      op: "PUSH2",
      value: "0xF8A",
    },
    4077: {
      jump: "i",
      op: "JUMP",
    },
    4078: {
      op: "JUMPDEST",
    },
    4079: {
      op: "SWAP3",
    },
    4080: {
      op: "POP",
    },
    4081: {
      op: "PUSH2",
      value: "0xFFC",
    },
    4084: {
      op: "PUSH1",
      value: "0x20",
    },
    4086: {
      op: "DUP6",
    },
    4087: {
      op: "ADD",
    },
    4088: {
      op: "PUSH2",
      value: "0xF8A",
    },
    4091: {
      jump: "i",
      op: "JUMP",
    },
    4092: {
      op: "JUMPDEST",
    },
    4093: {
      op: "SWAP2",
    },
    4094: {
      op: "POP",
    },
    4095: {
      op: "PUSH1",
      value: "0x40",
    },
    4097: {
      op: "DUP5",
    },
    4098: {
      op: "ADD",
    },
    4099: {
      op: "CALLDATALOAD",
    },
    4100: {
      op: "SWAP1",
    },
    4101: {
      op: "POP",
    },
    4102: {
      op: "SWAP3",
    },
    4103: {
      op: "POP",
    },
    4104: {
      op: "SWAP3",
    },
    4105: {
      op: "POP",
    },
    4106: {
      op: "SWAP3",
    },
    4107: {
      jump: "o",
      op: "JUMP",
    },
    4108: {
      op: "JUMPDEST",
    },
    4109: {
      op: "PUSH1",
      value: "0x0",
    },
    4111: {
      op: "PUSH1",
      value: "0x20",
    },
    4113: {
      op: "DUP3",
    },
    4114: {
      op: "DUP5",
    },
    4115: {
      op: "SUB",
    },
    4116: {
      op: "SLT",
    },
    4117: {
      op: "ISZERO",
    },
    4118: {
      op: "PUSH2",
      value: "0x101E",
    },
    4121: {
      op: "JUMPI",
    },
    4122: {
      op: "PUSH1",
      value: "0x0",
    },
    4124: {
      op: "DUP1",
    },
    4125: {
      op: "REVERT",
    },
    4126: {
      op: "JUMPDEST",
    },
    4127: {
      op: "PUSH2",
      value: "0xCCD",
    },
    4130: {
      op: "DUP3",
    },
    4131: {
      op: "PUSH2",
      value: "0xF8A",
    },
    4134: {
      jump: "i",
      op: "JUMP",
    },
    4135: {
      op: "JUMPDEST",
    },
    4136: {
      op: "PUSH1",
      value: "0x0",
    },
    4138: {
      op: "DUP1",
    },
    4139: {
      op: "PUSH1",
      value: "0x40",
    },
    4141: {
      op: "DUP4",
    },
    4142: {
      op: "DUP6",
    },
    4143: {
      op: "SUB",
    },
    4144: {
      op: "SLT",
    },
    4145: {
      op: "ISZERO",
    },
    4146: {
      op: "PUSH2",
      value: "0x103A",
    },
    4149: {
      op: "JUMPI",
    },
    4150: {
      op: "PUSH1",
      value: "0x0",
    },
    4152: {
      op: "DUP1",
    },
    4153: {
      op: "REVERT",
    },
    4154: {
      op: "JUMPDEST",
    },
    4155: {
      op: "PUSH2",
      value: "0x1043",
    },
    4158: {
      op: "DUP4",
    },
    4159: {
      op: "PUSH2",
      value: "0xF8A",
    },
    4162: {
      jump: "i",
      op: "JUMP",
    },
    4163: {
      op: "JUMPDEST",
    },
    4164: {
      op: "SWAP2",
    },
    4165: {
      op: "POP",
    },
    4166: {
      op: "PUSH1",
      value: "0x20",
    },
    4168: {
      op: "DUP4",
    },
    4169: {
      op: "ADD",
    },
    4170: {
      op: "CALLDATALOAD",
    },
    4171: {
      op: "DUP1",
    },
    4172: {
      op: "ISZERO",
    },
    4173: {
      op: "ISZERO",
    },
    4174: {
      op: "DUP2",
    },
    4175: {
      op: "EQ",
    },
    4176: {
      op: "PUSH2",
      value: "0x1058",
    },
    4179: {
      op: "JUMPI",
    },
    4180: {
      op: "PUSH1",
      value: "0x0",
    },
    4182: {
      op: "DUP1",
    },
    4183: {
      op: "REVERT",
    },
    4184: {
      op: "JUMPDEST",
    },
    4185: {
      op: "DUP1",
    },
    4186: {
      op: "SWAP2",
    },
    4187: {
      op: "POP",
    },
    4188: {
      op: "POP",
    },
    4189: {
      op: "SWAP3",
    },
    4190: {
      op: "POP",
    },
    4191: {
      op: "SWAP3",
    },
    4192: {
      op: "SWAP1",
    },
    4193: {
      op: "POP",
    },
    4194: {
      jump: "o",
      op: "JUMP",
    },
    4195: {
      op: "JUMPDEST",
    },
    4196: {
      op: "PUSH4",
      value: "0x4E487B71",
    },
    4201: {
      op: "PUSH1",
      value: "0xE0",
    },
    4203: {
      op: "SHL",
    },
    4204: {
      op: "PUSH1",
      value: "0x0",
    },
    4206: {
      op: "MSTORE",
    },
    4207: {
      op: "PUSH1",
      value: "0x41",
    },
    4209: {
      op: "PUSH1",
      value: "0x4",
    },
    4211: {
      op: "MSTORE",
    },
    4212: {
      op: "PUSH1",
      value: "0x24",
    },
    4214: {
      op: "PUSH1",
      value: "0x0",
    },
    4216: {
      op: "REVERT",
    },
    4217: {
      op: "JUMPDEST",
    },
    4218: {
      op: "PUSH1",
      value: "0x0",
    },
    4220: {
      op: "DUP1",
    },
    4221: {
      op: "PUSH1",
      value: "0x0",
    },
    4223: {
      op: "DUP1",
    },
    4224: {
      op: "PUSH1",
      value: "0x80",
    },
    4226: {
      op: "DUP6",
    },
    4227: {
      op: "DUP8",
    },
    4228: {
      op: "SUB",
    },
    4229: {
      op: "SLT",
    },
    4230: {
      op: "ISZERO",
    },
    4231: {
      op: "PUSH2",
      value: "0x108F",
    },
    4234: {
      op: "JUMPI",
    },
    4235: {
      op: "PUSH1",
      value: "0x0",
    },
    4237: {
      op: "DUP1",
    },
    4238: {
      op: "REVERT",
    },
    4239: {
      op: "JUMPDEST",
    },
    4240: {
      op: "PUSH2",
      value: "0x1098",
    },
    4243: {
      op: "DUP6",
    },
    4244: {
      op: "PUSH2",
      value: "0xF8A",
    },
    4247: {
      jump: "i",
      op: "JUMP",
    },
    4248: {
      op: "JUMPDEST",
    },
    4249: {
      op: "SWAP4",
    },
    4250: {
      op: "POP",
    },
    4251: {
      op: "PUSH2",
      value: "0x10A6",
    },
    4254: {
      op: "PUSH1",
      value: "0x20",
    },
    4256: {
      op: "DUP7",
    },
    4257: {
      op: "ADD",
    },
    4258: {
      op: "PUSH2",
      value: "0xF8A",
    },
    4261: {
      jump: "i",
      op: "JUMP",
    },
    4262: {
      op: "JUMPDEST",
    },
    4263: {
      op: "SWAP3",
    },
    4264: {
      op: "POP",
    },
    4265: {
      op: "PUSH1",
      value: "0x40",
    },
    4267: {
      op: "DUP6",
    },
    4268: {
      op: "ADD",
    },
    4269: {
      op: "CALLDATALOAD",
    },
    4270: {
      op: "SWAP2",
    },
    4271: {
      op: "POP",
    },
    4272: {
      op: "PUSH1",
      value: "0x60",
    },
    4274: {
      op: "DUP6",
    },
    4275: {
      op: "ADD",
    },
    4276: {
      op: "CALLDATALOAD",
    },
    4277: {
      op: "PUSH8",
      value: "0xFFFFFFFFFFFFFFFF",
    },
    4286: {
      op: "DUP1",
    },
    4287: {
      op: "DUP3",
    },
    4288: {
      op: "GT",
    },
    4289: {
      op: "ISZERO",
    },
    4290: {
      op: "PUSH2",
      value: "0x10CA",
    },
    4293: {
      op: "JUMPI",
    },
    4294: {
      op: "PUSH1",
      value: "0x0",
    },
    4296: {
      op: "DUP1",
    },
    4297: {
      op: "REVERT",
    },
    4298: {
      op: "JUMPDEST",
    },
    4299: {
      op: "DUP2",
    },
    4300: {
      op: "DUP8",
    },
    4301: {
      op: "ADD",
    },
    4302: {
      op: "SWAP2",
    },
    4303: {
      op: "POP",
    },
    4304: {
      op: "DUP8",
    },
    4305: {
      op: "PUSH1",
      value: "0x1F",
    },
    4307: {
      op: "DUP4",
    },
    4308: {
      op: "ADD",
    },
    4309: {
      op: "SLT",
    },
    4310: {
      op: "PUSH2",
      value: "0x10DE",
    },
    4313: {
      op: "JUMPI",
    },
    4314: {
      op: "PUSH1",
      value: "0x0",
    },
    4316: {
      op: "DUP1",
    },
    4317: {
      op: "REVERT",
    },
    4318: {
      op: "JUMPDEST",
    },
    4319: {
      op: "DUP2",
    },
    4320: {
      op: "CALLDATALOAD",
    },
    4321: {
      op: "DUP2",
    },
    4322: {
      op: "DUP2",
    },
    4323: {
      op: "GT",
    },
    4324: {
      op: "ISZERO",
    },
    4325: {
      op: "PUSH2",
      value: "0x10F0",
    },
    4328: {
      op: "JUMPI",
    },
    4329: {
      op: "PUSH2",
      value: "0x10F0",
    },
    4332: {
      op: "PUSH2",
      value: "0x1063",
    },
    4335: {
      jump: "i",
      op: "JUMP",
    },
    4336: {
      op: "JUMPDEST",
    },
    4337: {
      op: "PUSH1",
      value: "0x40",
    },
    4339: {
      op: "MLOAD",
    },
    4340: {
      op: "PUSH1",
      value: "0x1F",
    },
    4342: {
      op: "DUP3",
    },
    4343: {
      op: "ADD",
    },
    4344: {
      op: "PUSH1",
      value: "0x1F",
    },
    4346: {
      op: "NOT",
    },
    4347: {
      op: "SWAP1",
    },
    4348: {
      op: "DUP2",
    },
    4349: {
      op: "AND",
    },
    4350: {
      op: "PUSH1",
      value: "0x3F",
    },
    4352: {
      op: "ADD",
    },
    4353: {
      op: "AND",
    },
    4354: {
      op: "DUP2",
    },
    4355: {
      op: "ADD",
    },
    4356: {
      op: "SWAP1",
    },
    4357: {
      op: "DUP4",
    },
    4358: {
      op: "DUP3",
    },
    4359: {
      op: "GT",
    },
    4360: {
      op: "DUP2",
    },
    4361: {
      op: "DUP4",
    },
    4362: {
      op: "LT",
    },
    4363: {
      op: "OR",
    },
    4364: {
      op: "ISZERO",
    },
    4365: {
      op: "PUSH2",
      value: "0x1118",
    },
    4368: {
      op: "JUMPI",
    },
    4369: {
      op: "PUSH2",
      value: "0x1118",
    },
    4372: {
      op: "PUSH2",
      value: "0x1063",
    },
    4375: {
      jump: "i",
      op: "JUMP",
    },
    4376: {
      op: "JUMPDEST",
    },
    4377: {
      op: "DUP2",
    },
    4378: {
      op: "PUSH1",
      value: "0x40",
    },
    4380: {
      op: "MSTORE",
    },
    4381: {
      op: "DUP3",
    },
    4382: {
      op: "DUP2",
    },
    4383: {
      op: "MSTORE",
    },
    4384: {
      op: "DUP11",
    },
    4385: {
      op: "PUSH1",
      value: "0x20",
    },
    4387: {
      op: "DUP5",
    },
    4388: {
      op: "DUP8",
    },
    4389: {
      op: "ADD",
    },
    4390: {
      op: "ADD",
    },
    4391: {
      op: "GT",
    },
    4392: {
      op: "ISZERO",
    },
    4393: {
      op: "PUSH2",
      value: "0x1131",
    },
    4396: {
      op: "JUMPI",
    },
    4397: {
      op: "PUSH1",
      value: "0x0",
    },
    4399: {
      op: "DUP1",
    },
    4400: {
      op: "REVERT",
    },
    4401: {
      op: "JUMPDEST",
    },
    4402: {
      op: "DUP3",
    },
    4403: {
      op: "PUSH1",
      value: "0x20",
    },
    4405: {
      op: "DUP7",
    },
    4406: {
      op: "ADD",
    },
    4407: {
      op: "PUSH1",
      value: "0x20",
    },
    4409: {
      op: "DUP4",
    },
    4410: {
      op: "ADD",
    },
    4411: {
      op: "CALLDATACOPY",
    },
    4412: {
      op: "PUSH1",
      value: "0x0",
    },
    4414: {
      op: "PUSH1",
      value: "0x20",
    },
    4416: {
      op: "DUP5",
    },
    4417: {
      op: "DUP4",
    },
    4418: {
      op: "ADD",
    },
    4419: {
      op: "ADD",
    },
    4420: {
      op: "MSTORE",
    },
    4421: {
      op: "DUP1",
    },
    4422: {
      op: "SWAP6",
    },
    4423: {
      op: "POP",
    },
    4424: {
      op: "POP",
    },
    4425: {
      op: "POP",
    },
    4426: {
      op: "POP",
    },
    4427: {
      op: "POP",
    },
    4428: {
      op: "POP",
    },
    4429: {
      op: "SWAP3",
    },
    4430: {
      op: "SWAP6",
    },
    4431: {
      op: "SWAP2",
    },
    4432: {
      op: "SWAP5",
    },
    4433: {
      op: "POP",
    },
    4434: {
      op: "SWAP3",
    },
    4435: {
      op: "POP",
    },
    4436: {
      jump: "o",
      op: "JUMP",
    },
    4437: {
      op: "JUMPDEST",
    },
    4438: {
      op: "PUSH1",
      value: "0x0",
    },
    4440: {
      op: "DUP1",
    },
    4441: {
      op: "PUSH1",
      value: "0x40",
    },
    4443: {
      op: "DUP4",
    },
    4444: {
      op: "DUP6",
    },
    4445: {
      op: "SUB",
    },
    4446: {
      op: "SLT",
    },
    4447: {
      op: "ISZERO",
    },
    4448: {
      op: "PUSH2",
      value: "0x1168",
    },
    4451: {
      op: "JUMPI",
    },
    4452: {
      op: "PUSH1",
      value: "0x0",
    },
    4454: {
      op: "DUP1",
    },
    4455: {
      op: "REVERT",
    },
    4456: {
      op: "JUMPDEST",
    },
    4457: {
      op: "PUSH2",
      value: "0x1171",
    },
    4460: {
      op: "DUP4",
    },
    4461: {
      op: "PUSH2",
      value: "0xF8A",
    },
    4464: {
      jump: "i",
      op: "JUMP",
    },
    4465: {
      op: "JUMPDEST",
    },
    4466: {
      op: "SWAP2",
    },
    4467: {
      op: "POP",
    },
    4468: {
      op: "PUSH2",
      value: "0x117F",
    },
    4471: {
      op: "PUSH1",
      value: "0x20",
    },
    4473: {
      op: "DUP5",
    },
    4474: {
      op: "ADD",
    },
    4475: {
      op: "PUSH2",
      value: "0xF8A",
    },
    4478: {
      jump: "i",
      op: "JUMP",
    },
    4479: {
      op: "JUMPDEST",
    },
    4480: {
      op: "SWAP1",
    },
    4481: {
      op: "POP",
    },
    4482: {
      op: "SWAP3",
    },
    4483: {
      op: "POP",
    },
    4484: {
      op: "SWAP3",
    },
    4485: {
      op: "SWAP1",
    },
    4486: {
      op: "POP",
    },
    4487: {
      jump: "o",
      op: "JUMP",
    },
    4488: {
      op: "JUMPDEST",
    },
    4489: {
      op: "PUSH1",
      value: "0x1",
    },
    4491: {
      op: "DUP2",
    },
    4492: {
      op: "DUP2",
    },
    4493: {
      op: "SHR",
    },
    4494: {
      op: "SWAP1",
    },
    4495: {
      op: "DUP3",
    },
    4496: {
      op: "AND",
    },
    4497: {
      op: "DUP1",
    },
    4498: {
      op: "PUSH2",
      value: "0x119C",
    },
    4501: {
      op: "JUMPI",
    },
    4502: {
      op: "PUSH1",
      value: "0x7F",
    },
    4504: {
      op: "DUP3",
    },
    4505: {
      op: "AND",
    },
    4506: {
      op: "SWAP2",
    },
    4507: {
      op: "POP",
    },
    4508: {
      op: "JUMPDEST",
    },
    4509: {
      op: "PUSH1",
      value: "0x20",
    },
    4511: {
      op: "DUP3",
    },
    4512: {
      op: "LT",
    },
    4513: {
      op: "DUP2",
    },
    4514: {
      op: "EQ",
    },
    4515: {
      op: "ISZERO",
    },
    4516: {
      op: "PUSH2",
      value: "0x11BD",
    },
    4519: {
      op: "JUMPI",
    },
    4520: {
      op: "PUSH4",
      value: "0x4E487B71",
    },
    4525: {
      op: "PUSH1",
      value: "0xE0",
    },
    4527: {
      op: "SHL",
    },
    4528: {
      op: "PUSH1",
      value: "0x0",
    },
    4530: {
      op: "MSTORE",
    },
    4531: {
      op: "PUSH1",
      value: "0x22",
    },
    4533: {
      op: "PUSH1",
      value: "0x4",
    },
    4535: {
      op: "MSTORE",
    },
    4536: {
      op: "PUSH1",
      value: "0x24",
    },
    4538: {
      op: "PUSH1",
      value: "0x0",
    },
    4540: {
      op: "REVERT",
    },
    4541: {
      op: "JUMPDEST",
    },
    4542: {
      op: "POP",
    },
    4543: {
      op: "SWAP2",
    },
    4544: {
      op: "SWAP1",
    },
    4545: {
      op: "POP",
    },
    4546: {
      jump: "o",
      op: "JUMP",
    },
    4547: {
      op: "JUMPDEST",
    },
    4548: {
      op: "PUSH1",
      value: "0x20",
    },
    4550: {
      op: "DUP1",
    },
    4551: {
      op: "DUP3",
    },
    4552: {
      op: "MSTORE",
    },
    4553: {
      op: "PUSH1",
      value: "0x31",
    },
    4555: {
      op: "SWAP1",
    },
    4556: {
      op: "DUP3",
    },
    4557: {
      op: "ADD",
    },
    4558: {
      op: "MSTORE",
    },
    4559: {
      op: "PUSH32",
      value:
        "0x4552433732313A207472616E736665722063616C6C6572206973206E6F74206F",
    },
    4592: {
      op: "PUSH1",
      value: "0x40",
    },
    4594: {
      op: "DUP3",
    },
    4595: {
      op: "ADD",
    },
    4596: {
      op: "MSTORE",
    },
    4597: {
      op: "PUSH17",
      value: "0x1DDB995C881B9BDC88185C1C1C9BDD9959",
    },
    4615: {
      op: "PUSH1",
      value: "0x7A",
    },
    4617: {
      op: "SHL",
    },
    4618: {
      op: "PUSH1",
      value: "0x60",
    },
    4620: {
      op: "DUP3",
    },
    4621: {
      op: "ADD",
    },
    4622: {
      op: "MSTORE",
    },
    4623: {
      op: "PUSH1",
      value: "0x80",
    },
    4625: {
      op: "ADD",
    },
    4626: {
      op: "SWAP1",
    },
    4627: {
      jump: "o",
      op: "JUMP",
    },
    4628: {
      op: "JUMPDEST",
    },
    4629: {
      op: "PUSH1",
      value: "0x0",
    },
    4631: {
      op: "DUP4",
    },
    4632: {
      op: "MLOAD",
    },
    4633: {
      op: "PUSH2",
      value: "0x1226",
    },
    4636: {
      op: "DUP2",
    },
    4637: {
      op: "DUP5",
    },
    4638: {
      op: "PUSH1",
      value: "0x20",
    },
    4640: {
      op: "DUP9",
    },
    4641: {
      op: "ADD",
    },
    4642: {
      op: "PUSH2",
      value: "0xF06",
    },
    4645: {
      jump: "i",
      op: "JUMP",
    },
    4646: {
      op: "JUMPDEST",
    },
    4647: {
      op: "DUP4",
    },
    4648: {
      op: "MLOAD",
    },
    4649: {
      op: "SWAP1",
    },
    4650: {
      op: "DUP4",
    },
    4651: {
      op: "ADD",
    },
    4652: {
      op: "SWAP1",
    },
    4653: {
      op: "PUSH2",
      value: "0x123A",
    },
    4656: {
      op: "DUP2",
    },
    4657: {
      op: "DUP4",
    },
    4658: {
      op: "PUSH1",
      value: "0x20",
    },
    4660: {
      op: "DUP9",
    },
    4661: {
      op: "ADD",
    },
    4662: {
      op: "PUSH2",
      value: "0xF06",
    },
    4665: {
      jump: "i",
      op: "JUMP",
    },
    4666: {
      op: "JUMPDEST",
    },
    4667: {
      op: "ADD",
    },
    4668: {
      op: "SWAP5",
    },
    4669: {
      op: "SWAP4",
    },
    4670: {
      op: "POP",
    },
    4671: {
      op: "POP",
    },
    4672: {
      op: "POP",
    },
    4673: {
      op: "POP",
    },
    4674: {
      jump: "o",
      op: "JUMP",
    },
    4675: {
      op: "JUMPDEST",
    },
    4676: {
      op: "PUSH4",
      value: "0x4E487B71",
    },
    4681: {
      op: "PUSH1",
      value: "0xE0",
    },
    4683: {
      op: "SHL",
    },
    4684: {
      op: "PUSH1",
      value: "0x0",
    },
    4686: {
      op: "MSTORE",
    },
    4687: {
      op: "PUSH1",
      value: "0x11",
    },
    4689: {
      op: "PUSH1",
      value: "0x4",
    },
    4691: {
      op: "MSTORE",
    },
    4692: {
      op: "PUSH1",
      value: "0x24",
    },
    4694: {
      op: "PUSH1",
      value: "0x0",
    },
    4696: {
      op: "REVERT",
    },
    4697: {
      op: "JUMPDEST",
    },
    4698: {
      op: "PUSH1",
      value: "0x0",
    },
    4700: {
      op: "DUP3",
    },
    4701: {
      op: "DUP3",
    },
    4702: {
      op: "LT",
    },
    4703: {
      op: "ISZERO",
    },
    4704: {
      op: "PUSH2",
      value: "0x126B",
    },
    4707: {
      op: "JUMPI",
    },
    4708: {
      op: "PUSH2",
      value: "0x126B",
    },
    4711: {
      op: "PUSH2",
      value: "0x1243",
    },
    4714: {
      jump: "i",
      op: "JUMP",
    },
    4715: {
      op: "JUMPDEST",
    },
    4716: {
      op: "POP",
    },
    4717: {
      op: "SUB",
    },
    4718: {
      op: "SWAP1",
    },
    4719: {
      jump: "o",
      op: "JUMP",
    },
    4720: {
      op: "JUMPDEST",
    },
    4721: {
      op: "PUSH1",
      value: "0x0",
    },
    4723: {
      op: "DUP3",
    },
    4724: {
      op: "NOT",
    },
    4725: {
      op: "DUP3",
    },
    4726: {
      op: "GT",
    },
    4727: {
      op: "ISZERO",
    },
    4728: {
      op: "PUSH2",
      value: "0x1283",
    },
    4731: {
      op: "JUMPI",
    },
    4732: {
      op: "PUSH2",
      value: "0x1283",
    },
    4735: {
      op: "PUSH2",
      value: "0x1243",
    },
    4738: {
      jump: "i",
      op: "JUMP",
    },
    4739: {
      op: "JUMPDEST",
    },
    4740: {
      op: "POP",
    },
    4741: {
      op: "ADD",
    },
    4742: {
      op: "SWAP1",
    },
    4743: {
      jump: "o",
      op: "JUMP",
    },
    4744: {
      op: "JUMPDEST",
    },
    4745: {
      op: "PUSH1",
      value: "0x20",
    },
    4747: {
      op: "DUP1",
    },
    4748: {
      op: "DUP3",
    },
    4749: {
      op: "MSTORE",
    },
    4750: {
      op: "PUSH1",
      value: "0x32",
    },
    4752: {
      op: "SWAP1",
    },
    4753: {
      op: "DUP3",
    },
    4754: {
      op: "ADD",
    },
    4755: {
      op: "MSTORE",
    },
    4756: {
      op: "PUSH32",
      value:
        "0x4552433732313A207472616E7366657220746F206E6F6E204552433732315265",
    },
    4789: {
      op: "PUSH1",
      value: "0x40",
    },
    4791: {
      op: "DUP3",
    },
    4792: {
      op: "ADD",
    },
    4793: {
      op: "MSTORE",
    },
    4794: {
      op: "PUSH18",
      value: "0x31B2B4BB32B91034B6B83632B6B2B73A32B9",
    },
    4813: {
      op: "PUSH1",
      value: "0x71",
    },
    4815: {
      op: "SHL",
    },
    4816: {
      op: "PUSH1",
      value: "0x60",
    },
    4818: {
      op: "DUP3",
    },
    4819: {
      op: "ADD",
    },
    4820: {
      op: "MSTORE",
    },
    4821: {
      op: "PUSH1",
      value: "0x80",
    },
    4823: {
      op: "ADD",
    },
    4824: {
      op: "SWAP1",
    },
    4825: {
      jump: "o",
      op: "JUMP",
    },
    4826: {
      op: "JUMPDEST",
    },
    4827: {
      op: "PUSH1",
      value: "0x1",
    },
    4829: {
      op: "PUSH1",
      value: "0x1",
    },
    4831: {
      op: "PUSH1",
      value: "0xA0",
    },
    4833: {
      op: "SHL",
    },
    4834: {
      op: "SUB",
    },
    4835: {
      op: "DUP6",
    },
    4836: {
      op: "DUP2",
    },
    4837: {
      op: "AND",
    },
    4838: {
      op: "DUP3",
    },
    4839: {
      op: "MSTORE",
    },
    4840: {
      op: "DUP5",
    },
    4841: {
      op: "AND",
    },
    4842: {
      op: "PUSH1",
      value: "0x20",
    },
    4844: {
      op: "DUP3",
    },
    4845: {
      op: "ADD",
    },
    4846: {
      op: "MSTORE",
    },
    4847: {
      op: "PUSH1",
      value: "0x40",
    },
    4849: {
      op: "DUP2",
    },
    4850: {
      op: "ADD",
    },
    4851: {
      op: "DUP4",
    },
    4852: {
      op: "SWAP1",
    },
    4853: {
      op: "MSTORE",
    },
    4854: {
      op: "PUSH1",
      value: "0x80",
    },
    4856: {
      op: "PUSH1",
      value: "0x60",
    },
    4858: {
      op: "DUP3",
    },
    4859: {
      op: "ADD",
    },
    4860: {
      op: "DUP2",
    },
    4861: {
      op: "SWAP1",
    },
    4862: {
      op: "MSTORE",
    },
    4863: {
      op: "PUSH1",
      value: "0x0",
    },
    4865: {
      op: "SWAP1",
    },
    4866: {
      op: "PUSH2",
      value: "0x130D",
    },
    4869: {
      op: "SWAP1",
    },
    4870: {
      op: "DUP4",
    },
    4871: {
      op: "ADD",
    },
    4872: {
      op: "DUP5",
    },
    4873: {
      op: "PUSH2",
      value: "0xF32",
    },
    4876: {
      jump: "i",
      op: "JUMP",
    },
    4877: {
      op: "JUMPDEST",
    },
    4878: {
      op: "SWAP7",
    },
    4879: {
      op: "SWAP6",
    },
    4880: {
      op: "POP",
    },
    4881: {
      op: "POP",
    },
    4882: {
      op: "POP",
    },
    4883: {
      op: "POP",
    },
    4884: {
      op: "POP",
    },
    4885: {
      op: "POP",
    },
    4886: {
      jump: "o",
      op: "JUMP",
    },
    4887: {
      op: "JUMPDEST",
    },
    4888: {
      op: "PUSH1",
      value: "0x0",
    },
    4890: {
      op: "PUSH1",
      value: "0x20",
    },
    4892: {
      op: "DUP3",
    },
    4893: {
      op: "DUP5",
    },
    4894: {
      op: "SUB",
    },
    4895: {
      op: "SLT",
    },
    4896: {
      op: "ISZERO",
    },
    4897: {
      op: "PUSH2",
      value: "0x1329",
    },
    4900: {
      op: "JUMPI",
    },
    4901: {
      op: "PUSH1",
      value: "0x0",
    },
    4903: {
      op: "DUP1",
    },
    4904: {
      op: "REVERT",
    },
    4905: {
      op: "JUMPDEST",
    },
    4906: {
      op: "DUP2",
    },
    4907: {
      op: "MLOAD",
    },
    4908: {
      op: "PUSH2",
      value: "0xCCD",
    },
    4911: {
      op: "DUP2",
    },
    4912: {
      op: "PUSH2",
      value: "0xED0",
    },
    4915: {
      jump: "i",
      op: "JUMP",
    },
    4916: {
      op: "JUMPDEST",
    },
    4917: {
      op: "PUSH1",
      value: "0x0",
    },
    4919: {
      op: "PUSH1",
      value: "0x0",
    },
    4921: {
      op: "NOT",
    },
    4922: {
      op: "DUP3",
    },
    4923: {
      op: "EQ",
    },
    4924: {
      op: "ISZERO",
    },
    4925: {
      op: "PUSH2",
      value: "0x1348",
    },
    4928: {
      op: "JUMPI",
    },
    4929: {
      op: "PUSH2",
      value: "0x1348",
    },
    4932: {
      op: "PUSH2",
      value: "0x1243",
    },
    4935: {
      jump: "i",
      op: "JUMP",
    },
    4936: {
      op: "JUMPDEST",
    },
    4937: {
      op: "POP",
    },
    4938: {
      op: "PUSH1",
      value: "0x1",
    },
    4940: {
      op: "ADD",
    },
    4941: {
      op: "SWAP1",
    },
    4942: {
      jump: "o",
      op: "JUMP",
    },
    4943: {
      op: "JUMPDEST",
    },
    4944: {
      op: "PUSH4",
      value: "0x4E487B71",
    },
    4949: {
      op: "PUSH1",
      value: "0xE0",
    },
    4951: {
      op: "SHL",
    },
    4952: {
      op: "PUSH1",
      value: "0x0",
    },
    4954: {
      op: "MSTORE",
    },
    4955: {
      op: "PUSH1",
      value: "0x12",
    },
    4957: {
      op: "PUSH1",
      value: "0x4",
    },
    4959: {
      op: "MSTORE",
    },
    4960: {
      op: "PUSH1",
      value: "0x24",
    },
    4962: {
      op: "PUSH1",
      value: "0x0",
    },
    4964: {
      op: "REVERT",
    },
    4965: {
      op: "JUMPDEST",
    },
    4966: {
      op: "PUSH1",
      value: "0x0",
    },
    4968: {
      op: "DUP3",
    },
    4969: {
      op: "PUSH2",
      value: "0x1374",
    },
    4972: {
      op: "JUMPI",
    },
    4973: {
      op: "PUSH2",
      value: "0x1374",
    },
    4976: {
      op: "PUSH2",
      value: "0x134F",
    },
    4979: {
      jump: "i",
      op: "JUMP",
    },
    4980: {
      op: "JUMPDEST",
    },
    4981: {
      op: "POP",
    },
    4982: {
      op: "DIV",
    },
    4983: {
      op: "SWAP1",
    },
    4984: {
      jump: "o",
      op: "JUMP",
    },
    4985: {
      op: "JUMPDEST",
    },
    4986: {
      op: "PUSH1",
      value: "0x0",
    },
    4988: {
      op: "DUP3",
    },
    4989: {
      op: "PUSH2",
      value: "0x1388",
    },
    4992: {
      op: "JUMPI",
    },
    4993: {
      op: "PUSH2",
      value: "0x1388",
    },
    4996: {
      op: "PUSH2",
      value: "0x134F",
    },
    4999: {
      jump: "i",
      op: "JUMP",
    },
    5000: {
      op: "JUMPDEST",
    },
    5001: {
      op: "POP",
    },
    5002: {
      op: "MOD",
    },
    5003: {
      op: "SWAP1",
    },
    5004: {
      jump: "o",
      op: "JUMP",
    },
    5005: {
      op: "JUMPDEST",
    },
    5006: {
      op: "PUSH4",
      value: "0x4E487B71",
    },
    5011: {
      op: "PUSH1",
      value: "0xE0",
    },
    5013: {
      op: "SHL",
    },
    5014: {
      op: "PUSH1",
      value: "0x0",
    },
    5016: {
      op: "MSTORE",
    },
    5017: {
      op: "PUSH1",
      value: "0x32",
    },
    5019: {
      op: "PUSH1",
      value: "0x4",
    },
    5021: {
      op: "MSTORE",
    },
    5022: {
      op: "PUSH1",
      value: "0x24",
    },
    5024: {
      op: "PUSH1",
      value: "0x0",
    },
    5026: {
      op: "REVERT",
    },
  },
  sha1: "ae83afae1dd02d69b9d2f3607fbd7d76cb6e5ce4",
  source:
    '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\nimport "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";\n\ncontract SingleNFT is ERC721URIStorage {\n    \n    \n    constructor(string memory tokenName, string memory tokenSymbol, string memory tokenURI) public ERC721 (tokenName, tokenSymbol) {\n                \n        _safeMint(msg.sender, 1);\n        _setTokenURI(1, tokenURI);\n    } \n} \n',
  sourceMap:
    "137:278:10:-:0;;;192:220;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;1441:13:0;;295:9:10;;306:11;;1441:13:0;;:5;;:13;;;;;:::i;:::-;-1:-1:-1;1464:17:0;;;;:7;;:17;;;;;:::i;:::-;;1375:113;;346:24:10::1;356:10;368:1;346:9;;;:24;;:::i;:::-;380:25;393:1;396:8:::0;380:12:::1;:25::i;:::-;192:220:::0;;;137:278;;8101:108:0;8176:26;8186:2;8190:7;8176:26;;;;;;;;;;;;:9;;;:26;;:::i;:::-;8101:108;;:::o;1277:214:3:-;7209:4:0;7232:16;;;:7;:16;;;;;;-1:-1:-1;;;;;7232:16:0;1368:75:3;;;;-1:-1:-1;;;1368:75:3;;2073:2:11;1368:75:3;;;2055:21:11;2112:2;2092:18;;;2085:30;2151:34;2131:18;;;2124:62;-1:-1:-1;;;2202:18:11;;;2195:44;2256:19;;1368:75:3;;;;;;;;;1453:19;;;;:10;:19;;;;;;;;:31;;;;;;;;:::i;:::-;;1277:214;;:::o;8430:311:0:-;8555:18;8561:2;8565:7;8555:5;:18::i;:::-;8604:54;8635:1;8639:2;8643:7;8652:5;8604:22;:54::i;:::-;8583:151;;;;-1:-1:-1;;;8583:151:0;;2488:2:11;8583:151:0;;;2470:21:11;2527:2;2507:18;;;2500:30;-1:-1:-1;;;;;;;;;;;2546:18:11;;;2539:62;-1:-1:-1;;;2617:18:11;;;2610:48;2675:19;;8583:151:0;2286:414:11;9063:372:0;-1:-1:-1;;;;;9142:16:0;;9134:61;;;;-1:-1:-1;;;9134:61:0;;2907:2:11;9134:61:0;;;2889:21:11;;;2926:18;;;2919:30;2985:34;2965:18;;;2958:62;3037:18;;9134:61:0;2705:356:11;9134:61:0;7209:4;7232:16;;;:7;:16;;;;;;-1:-1:-1;;;;;7232:16:0;:30;9205:58;;;;-1:-1:-1;;;9205:58:0;;3268:2:11;9205:58:0;;;3250:21:11;3307:2;3287:18;;;3280:30;3346;3326:18;;;3319:58;3394:18;;9205:58:0;3066:352:11;9205:58:0;-1:-1:-1;;;;;9330:13:0;;;;;;:9;:13;;;;;:18;;9347:1;;9330:13;:18;;9347:1;;9330:18;:::i;:::-;;;;-1:-1:-1;;9358:16:0;;;;:7;:16;;;;;;:21;;-1:-1:-1;;;;;;9358:21:0;-1:-1:-1;;;;;9358:21:0;;;;;;;;9395:33;;9358:16;;;9395:33;;9358:16;;9395:33;9063:372;;:::o;12161:778::-;12311:4;12331:15;:2;-1:-1:-1;;;;;12331:13:0;;;;;;:15;;:::i;:::-;12327:606;;;12366:72;;-1:-1:-1;;;12366:72:0;;-1:-1:-1;;;;;12366:36:0;;;;;:72;;719:10:6;;12417:4:0;;12423:7;;12432:5;;12366:72;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;-1:-1:-1;12366:72:0;;;;;;;;-1:-1:-1;;12366:72:0;;;;;;;;;;;;:::i;:::-;;;12362:519;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;12605:13:0;;12601:266;;12647:60;;-1:-1:-1;;;12647:60:0;;2488:2:11;12647:60:0;;;2470:21:11;2527:2;2507:18;;;2500:30;-1:-1:-1;;;;;;;;;;;2546:18:11;;;2539:62;-1:-1:-1;;;2617:18:11;;;2610:48;2675:19;;12647:60:0;2286:414:11;12601:266:0;12819:6;12813:13;12804:6;12800:2;12796:15;12789:38;12362:519;-1:-1:-1;;;;;;12488:51:0;-1:-1:-1;;;12488:51:0;;-1:-1:-1;12481:58:0;;12327:606;-1:-1:-1;12918:4:0;12327:606;12161:778;;;;;;:::o;771:377:5:-;1087:20;1133:8;;;771:377::o;137:278:10:-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;137:278:10;;;-1:-1:-1;137:278:10;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;14:127:11;75:10;70:3;66:20;63:1;56:31;106:4;103:1;96:15;130:4;127:1;120:15;146:258;218:1;228:113;242:6;239:1;236:13;228:113;;;318:11;;;312:18;299:11;;;292:39;264:2;257:10;228:113;;;359:6;356:1;353:13;350:48;;;394:1;385:6;380:3;376:16;369:27;350:48;;146:258;;;:::o;409:686::-;463:5;516:3;509:4;501:6;497:17;493:27;483:55;;534:1;531;524:12;483:55;557:13;;-1:-1:-1;;;;;619:10:11;;;616:36;;;632:18;;:::i;:::-;707:2;701:9;675:2;761:13;;-1:-1:-1;;757:22:11;;;781:2;753:31;749:40;737:53;;;805:18;;;825:22;;;802:46;799:72;;;851:18;;:::i;:::-;891:10;887:2;880:22;926:2;918:6;911:18;972:3;965:4;960:2;952:6;948:15;944:26;941:35;938:55;;;989:1;986;979:12;938:55;1002:63;1062:2;1055:4;1047:6;1043:17;1036:4;1028:6;1024:17;1002:63;:::i;:::-;1083:6;409:686;-1:-1:-1;;;;;;409:686:11:o;1100:766::-;1218:6;1226;1234;1287:2;1275:9;1266:7;1262:23;1258:32;1255:52;;;1303:1;1300;1293:12;1255:52;1330:16;;-1:-1:-1;;;;;1395:14:11;;;1392:34;;;1422:1;1419;1412:12;1392:34;1445:61;1498:7;1489:6;1478:9;1474:22;1445:61;:::i;:::-;1435:71;;1552:2;1541:9;1537:18;1531:25;1515:41;;1581:2;1571:8;1568:16;1565:36;;;1597:1;1594;1587:12;1565:36;1620:63;1675:7;1664:8;1653:9;1649:24;1620:63;:::i;:::-;1610:73;;1729:2;1718:9;1714:18;1708:25;1692:41;;1758:2;1748:8;1745:16;1742:36;;;1774:1;1771;1764:12;1742:36;;1797:63;1852:7;1841:8;1830:9;1826:24;1797:63;:::i;:::-;1787:73;;;1100:766;;;;;:::o;3423:225::-;3463:3;3494:1;3490:6;3487:1;3484:13;3481:136;;;3539:10;3534:3;3530:20;3527:1;3520:31;3574:4;3571:1;3564:15;3602:4;3599:1;3592:15;3481:136;-1:-1:-1;3633:9:11;;3423:225::o;3653:654::-;3847:4;3893:1;3889;3884:3;3880:11;3876:19;3934:2;3926:6;3922:15;3911:9;3904:34;3986:2;3978:6;3974:15;3969:2;3958:9;3954:18;3947:43;;4026:6;4021:2;4010:9;4006:18;3999:34;4069:3;4064:2;4053:9;4049:18;4042:31;4102:6;4096:13;4146:6;4140:3;4129:9;4125:19;4118:35;4162:67;4222:6;4216:3;4205:9;4201:19;4196:2;4188:6;4184:15;4162:67;:::i;:::-;4290:2;4269:15;-1:-1:-1;;4265:29:11;4250:45;;;;4297:3;4246:55;;3653:654;-1:-1:-1;;;;;3653:654:11:o;4312:290::-;4381:6;4434:2;4422:9;4413:7;4409:23;4405:32;4402:52;;;4450:1;4447;4440:12;4402:52;4476:16;;-1:-1:-1;;;;;;4521:32:11;;4511:43;;4501:71;;4568:1;4565;4558:12;4501:71;4591:5;4312:290;-1:-1:-1;;;4312:290:11:o;4607:380::-;4686:1;4682:12;;;;4729;;;4750:61;;4804:4;4796:6;4792:17;4782:27;;4750:61;4857:2;4849:6;4846:14;4826:18;4823:38;4820:161;;;4903:10;4898:3;4894:20;4891:1;4884:31;4938:4;4935:1;4928:15;4966:4;4963:1;4956:15;4820:161;;4607:380;;;:::o;:::-;137:278:10;;;;;;",
  sourcePath: "contracts/SingleNFT.sol",
  type: "contract",
};

const UploadSection = () => {
  const { account, chainId } = useEthers();
  const [fileRecieved, setFileRecieved] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [name, setName] = useState("");
  const [warning, setWarning] = useState("");
  const [im, setIm] = useState(undefined);
  const [imageIPFS, setImageIPFS] = useState("");
  const [metaIPFS, setMetaIPFS] = useState("");
  const [connectedWarning, setConnectedWarning] = useState("");
  const [canDeploy, setCanDeploy] = useState(false);
  const [nftStatus1, setNftStatus1] = useState("");
  const [nftStatus2, setNftStatus2] = useState("");
  const [nftStatus3, setNftStatus3] = useState("");
  const [DeploySection, setDeploySection] = useState({
    tokenName: "",
    tokenSymbol: "",
    tokenURI: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (account !== undefined) {
      setConnectedWarning("");
    }
  });

  const serverErrorWarning =
    "Dude something's wrong with the server... I think. Maybe try again ? Or contact me at eternity3dstudios@gmail.com";

  const getFile = () => {
    if (account !== undefined) {
      setConnectedWarning("");
      const fileSelector = document.createElement("input");
      fileSelector.setAttribute("type", "file");
      fileSelector.setAttribute("accept", ".jpg");
      fileSelector.onchange = (e) => {
        setFileRecieved(true);
        imgPreview(e.target.files[0]);
        setName(e.target.files[0].name);
        setIm(e.target.files[0]);
      };

      fileSelector.click();
    } else {
      setConnectedWarning("Hey buddy! Please connect your wallet.");
    }
  };

  const imgPreview = (file) => {
    var reader = new FileReader();
    reader.addEventListener("load", () => {
      localStorage.setItem("recent-image", reader.result);
      setImgURL(localStorage.getItem("recent-image"));
    });
    reader.readAsDataURL(file);
  };

  const ipfsFilePin = async (
    im,
    myaccount,
    nftname,
    description,
    trait_type,
    trait_value
  ) => {
    const myURL = BASE_URL + "nft/fileupload";
    const formdata = new FormData();
    formdata.append("nft_file", im);
    formdata.append("account", myaccount);
    formdata.append("name", nftname);
    formdata.append("description", description);
    formdata.append("trait_type", trait_type);
    formdata.append("value", trait_value);

    const response = await fetch(myURL, {
      method: "POST",
      body: formdata,
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        return "Server error";
      });
    return response;
  };

  const saveNFTData = async (metadata_uri, contract_address, imageURI) => {
    const savingURL = BASE_URL + "nft/createNFT";
    let formData = new FormData();
    formData.append("owner", account);
    formData.append("metadataURL", metadata_uri);
    formData.append("collection", "0x");
    formData.append("on_sale", false);
    formData.append("is_minted", true);
    formData.append("contract_address", contract_address);
    formData.append("token_id", 1);
    formData.append("price", 0);
    formData.append("network", chainId);
    formData.append("local_token_id", 1);
    formData.append("imageURL", imageURI);
    let response = await fetch(savingURL, {
      method: "POST",
      body: formData,
    })
      .then((resp) => {
        router.push("/assets/" + contract_address + "_1");
        return resp.json();
      })
      .then((data) => {
        router.push("/assets/" + contract_address + "_1");
        return data;
      })
      .catch((error) => {
        return "Server error";
      });
  };

  const metadataSubmit = async () => {
    setWarning("");
    setCanDeploy(false);
    if (account === undefined) {
      setConnectedWarning("Hey buddy! Please connect your wallet.");
    } else {
      setImageIPFS("");
      setMetaIPFS("");
      const nameForm = document.getElementById("name");
      const symbolForm = document.getElementById("symbol");
      const descriptionForm = document.getElementById("description");
      const traitTypeForm = document.getElementById("Trait type");
      const traitValueForm = document.getElementById("Trait value");
      if (
        nameForm.value !== "" &&
        descriptionForm.value !== "" &&
        symbolForm.value !== ""
      ) {
        setWarning("Creating metadata...");
        const pins = await ipfsFilePin(
          im,
          account,
          nameForm.value,
          descriptionForm.value,
          traitTypeForm.value,
          traitValueForm.value
        );
        if (pins !== "Server error." && pins !== undefined) {
          const imageURI = pins["image_uri"];
          const metadataURI = pins["metadata_uri"];
          if (imageURI !== undefined && metadataURI !== undefined) {
            setImageIPFS(imageURI);
            setMetaIPFS(metadataURI);
            setDeploySection({
              tokenName: nameForm.value,
              tokenSymbol: symbolForm.value,
              tokenURI: metadataURI,
            });
            setWarning("Minting token...");
            setCanDeploy(true);
            let contract_address = await deployNFT(
              nameForm.value,
              symbolForm.value,
              metadataURI
            );
            await saveNFTData(metadataURI, contract_address, imageURI);
          } else {
            setWarning(serverErrorWarning);
          }
        } else {
          setWarning(serverErrorWarning);
        }
      } else {
        setWarning(
          "Can't create metadata without name, symbol and description."
        );
      }
    }
  };

  const deployNFT = async (tokenName, tokenSymbol, tokenURI) => {
    const abi = nft_contract["abi"];
    const bytecode = nft_contract["bytecode"];
    const web3 = new Web3(Web3.givenProvider);
    const mycontract = new web3.eth.Contract(abi);
    const deployedContract = await mycontract
      .deploy({
        data: bytecode,
        arguments: [tokenName, tokenSymbol, tokenURI],
      })
      .send({ from: account }, (err, transactionHash) => {
        setNftStatus1("Transaction sent. Transaction hash: " + transactionHash);
      })
      .on("confirmation", () => {
        setNftStatus2("Transaction confirmed.");
      })
      .then((newContract) => {
        setNftStatus3(
          "Successfully deployed. Yay!. Contract address: " +
            newContract.options.address
        );
        return newContract.options.address;
      });
    return deployedContract;
  };

  return (
    <>
      {!fileRecieved ? (
        <>
          <div style={{ height: "40vh" }}>
            <h4 style={{ color: "blue" }}>{connectedWarning}</h4>
            <h3>Upload your file here.</h3>
            <button className="btn" onClick={getFile}>
              Upload
            </button>
          </div>
        </>
      ) : (
        <>
          {canDeploy ? (
            <>
              <div>
                <h2>{nftStatus1}</h2>
                <h2>{nftStatus2}</h2>
                <h2>{nftStatus3}</h2>
              </div>
            </>
          ) : (
            <>
              <div className="nft-mint">
                <img src={imgURL} alt={name} />
                <div className="nft-mint2" style={{ padding: "20px" }}>
                  <button className="btn" onClick={getFile}>
                    Change File
                  </button>

                  <section className="myform">
                    <label htmlFor="name">Name: </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Name of your NFT"
                    />
                    <label htmlFor="symbol">Symbol: </label>
                    <input
                      id="symbol"
                      name="symbol"
                      type="text"
                      required
                      placeholder="symbol"
                    />
                    <label htmlFor="description">Description: </label>
                    <input
                      id="description"
                      name="description"
                      type="text"
                      required
                      placeholder="Provide a detailed description"
                    />
                    <label htmlFor="Trait type">Trait type: </label>
                    <input
                      id="Trait type"
                      name="Trait type"
                      type="text"
                      placeholder="Give it a special trait"
                    />
                    <label htmlFor="Trait value">Trait value: </label>
                    <input
                      id="Trait value"
                      name="Trait value"
                      type="num"
                      placeholder="Specify value of the trait"
                    />
                  </section>
                  <button className="btn" onClick={metadataSubmit}>
                    Create NFT
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
      <h4 style={{ color: "red" }}>{warning}</h4>
      <h4 style={{ color: "blue" }}>
        {imageIPFS !== "" ? "Image URL: " + imageIPFS : ""}
      </h4>
      <h4 style={{ color: "blue" }}>
        {metaIPFS !== "" ? "Metadata URL: " + metaIPFS : ""}
      </h4>
    </>
  );
};

export default UploadSection;
