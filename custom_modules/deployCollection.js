import Web3 from "web3";
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
          internalType: "string",
          name: "tokenURI",
          type: "string",
        },
      ],
      name: "createCollectible",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
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
      inputs: [],
      name: "tokenCounter",
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
    10: "contracts/CollectionNFT.sol",
    3: "C:/Users/Navraj/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.4.1/contracts/token/ERC721/extensions/ERC721URIStorage.sol",
    4: "C:/Users/Navraj/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.4.1/contracts/token/ERC721/extensions/IERC721Metadata.sol",
    6: "C:/Users/Navraj/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.4.1/contracts/utils/Context.sol",
    8: "C:/Users/Navraj/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.4.1/contracts/utils/introspection/ERC165.sol",
    9: "C:/Users/Navraj/.brownie/packages/OpenZeppelin/openzeppelin-contracts@4.4.1/contracts/utils/introspection/IERC165.sol",
  },
  ast: {
    absolutePath: "contracts/CollectionNFT.sol",
    exportedSymbols: {
      Address: [1471],
      Context: [1493],
      ERC165: [1720],
      ERC721: [1013],
      ERC721URIStorage: [182],
      IERC165: [1732],
      IERC721: [1129],
      IERC721Metadata: [1174],
      IERC721Receiver: [1147],
      NFTCollection: [54],
      Strings: [1696],
    },
    id: 55,
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
        scope: 55,
        sourceUnit: 183,
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
              referencedDeclaration: 182,
              src: "163:16:10",
            },
            id: 4,
            nodeType: "InheritanceSpecifier",
            src: "163:16:10",
          },
        ],
        canonicalName: "NFTCollection",
        contractDependencies: [],
        contractKind: "contract",
        fullyImplemented: true,
        id: 54,
        linearizedBaseContracts: [54, 182, 1013, 1174, 1129, 1720, 1732, 1493],
        name: "NFTCollection",
        nameLocation: "146:13:10",
        nodeType: "ContractDefinition",
        nodes: [
          {
            constant: false,
            functionSelector: "d082e381",
            id: 6,
            mutability: "mutable",
            name: "tokenCounter",
            nameLocation: "201:12:10",
            nodeType: "VariableDeclaration",
            scope: 54,
            src: "186:27:10",
            stateVariable: true,
            storageLocation: "default",
            typeDescriptions: {
              typeIdentifier: "t_uint256",
              typeString: "uint256",
            },
            typeName: {
              id: 5,
              name: "uint256",
              nodeType: "ElementaryTypeName",
              src: "186:7:10",
              typeDescriptions: {
                typeIdentifier: "t_uint256",
                typeString: "uint256",
              },
            },
            visibility: "public",
          },
          {
            body: {
              id: 21,
              nodeType: "Block",
              src: "324:49:10",
              statements: [
                {
                  expression: {
                    id: 19,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    lValueRequested: false,
                    leftHandSide: {
                      id: 17,
                      name: "tokenCounter",
                      nodeType: "Identifier",
                      overloadedDeclarations: [],
                      referencedDeclaration: 6,
                      src: "350:12:10",
                      typeDescriptions: {
                        typeIdentifier: "t_uint256",
                        typeString: "uint256",
                      },
                    },
                    nodeType: "Assignment",
                    operator: "=",
                    rightHandSide: {
                      hexValue: "31",
                      id: 18,
                      isConstant: false,
                      isLValue: false,
                      isPure: true,
                      kind: "number",
                      lValueRequested: false,
                      nodeType: "Literal",
                      src: "365:1:10",
                      typeDescriptions: {
                        typeIdentifier: "t_rational_1_by_1",
                        typeString: "int_const 1",
                      },
                      value: "1",
                    },
                    src: "350:16:10",
                    typeDescriptions: {
                      typeIdentifier: "t_uint256",
                      typeString: "uint256",
                    },
                  },
                  id: 20,
                  nodeType: "ExpressionStatement",
                  src: "350:16:10",
                },
              ],
            },
            id: 22,
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
                    referencedDeclaration: 8,
                    src: "300:9:10",
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
                    referencedDeclaration: 10,
                    src: "311:11:10",
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
                  referencedDeclaration: 1013,
                  src: "292:6:10",
                },
                nodeType: "ModifierInvocation",
                src: "292:31:10",
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
                  id: 8,
                  mutability: "mutable",
                  name: "tokenName",
                  nameLocation: "254:9:10",
                  nodeType: "VariableDeclaration",
                  scope: 22,
                  src: "240:23:10",
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
                    src: "240:6:10",
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
                  name: "tokenSymbol",
                  nameLocation: "279:11:10",
                  nodeType: "VariableDeclaration",
                  scope: 22,
                  src: "265:25:10",
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
                    src: "265:6:10",
                    typeDescriptions: {
                      typeIdentifier: "t_string_storage_ptr",
                      typeString: "string",
                    },
                  },
                  visibility: "internal",
                },
              ],
              src: "239:52:10",
            },
            returnParameters: {
              id: 16,
              nodeType: "ParameterList",
              parameters: [],
              src: "324:0:10",
            },
            scope: 54,
            src: "228:145:10",
            stateMutability: "nonpayable",
            virtual: false,
            visibility: "public",
          },
          {
            body: {
              id: 52,
              nodeType: "Block",
              src: "457:205:10",
              statements: [
                {
                  assignments: [30],
                  declarations: [
                    {
                      constant: false,
                      id: 30,
                      mutability: "mutable",
                      name: "newTokenId",
                      nameLocation: "475:10:10",
                      nodeType: "VariableDeclaration",
                      scope: 52,
                      src: "467:18:10",
                      stateVariable: false,
                      storageLocation: "default",
                      typeDescriptions: {
                        typeIdentifier: "t_uint256",
                        typeString: "uint256",
                      },
                      typeName: {
                        id: 29,
                        name: "uint256",
                        nodeType: "ElementaryTypeName",
                        src: "467:7:10",
                        typeDescriptions: {
                          typeIdentifier: "t_uint256",
                          typeString: "uint256",
                        },
                      },
                      visibility: "internal",
                    },
                  ],
                  id: 32,
                  initialValue: {
                    id: 31,
                    name: "tokenCounter",
                    nodeType: "Identifier",
                    overloadedDeclarations: [],
                    referencedDeclaration: 6,
                    src: "488:12:10",
                    typeDescriptions: {
                      typeIdentifier: "t_uint256",
                      typeString: "uint256",
                    },
                  },
                  nodeType: "VariableDeclarationStatement",
                  src: "467:33:10",
                },
                {
                  expression: {
                    arguments: [
                      {
                        expression: {
                          id: 34,
                          name: "msg",
                          nodeType: "Identifier",
                          overloadedDeclarations: [],
                          referencedDeclaration: -15,
                          src: "520:3:10",
                          typeDescriptions: {
                            typeIdentifier: "t_magic_message",
                            typeString: "msg",
                          },
                        },
                        id: 35,
                        isConstant: false,
                        isLValue: false,
                        isPure: false,
                        lValueRequested: false,
                        memberName: "sender",
                        nodeType: "MemberAccess",
                        src: "520:10:10",
                        typeDescriptions: {
                          typeIdentifier: "t_address",
                          typeString: "address",
                        },
                      },
                      {
                        id: 36,
                        name: "newTokenId",
                        nodeType: "Identifier",
                        overloadedDeclarations: [],
                        referencedDeclaration: 30,
                        src: "532:10:10",
                        typeDescriptions: {
                          typeIdentifier: "t_uint256",
                          typeString: "uint256",
                        },
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: "t_address",
                          typeString: "address",
                        },
                        {
                          typeIdentifier: "t_uint256",
                          typeString: "uint256",
                        },
                      ],
                      id: 33,
                      name: "_safeMint",
                      nodeType: "Identifier",
                      overloadedDeclarations: [677, 706],
                      referencedDeclaration: 677,
                      src: "510:9:10",
                      typeDescriptions: {
                        typeIdentifier:
                          "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        typeString: "function (address,uint256)",
                      },
                    },
                    id: 37,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: "functionCall",
                    lValueRequested: false,
                    names: [],
                    nodeType: "FunctionCall",
                    src: "510:33:10",
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: "t_tuple$__$",
                      typeString: "tuple()",
                    },
                  },
                  id: 38,
                  nodeType: "ExpressionStatement",
                  src: "510:33:10",
                },
                {
                  expression: {
                    arguments: [
                      {
                        id: 40,
                        name: "newTokenId",
                        nodeType: "Identifier",
                        overloadedDeclarations: [],
                        referencedDeclaration: 30,
                        src: "566:10:10",
                        typeDescriptions: {
                          typeIdentifier: "t_uint256",
                          typeString: "uint256",
                        },
                      },
                      {
                        id: 41,
                        name: "tokenURI",
                        nodeType: "Identifier",
                        overloadedDeclarations: [],
                        referencedDeclaration: 24,
                        src: "578:8:10",
                        typeDescriptions: {
                          typeIdentifier: "t_string_memory_ptr",
                          typeString: "string memory",
                        },
                      },
                    ],
                    expression: {
                      argumentTypes: [
                        {
                          typeIdentifier: "t_uint256",
                          typeString: "uint256",
                        },
                        {
                          typeIdentifier: "t_string_memory_ptr",
                          typeString: "string memory",
                        },
                      ],
                      id: 39,
                      name: "_setTokenURI",
                      nodeType: "Identifier",
                      overloadedDeclarations: [],
                      referencedDeclaration: 151,
                      src: "553:12:10",
                      typeDescriptions: {
                        typeIdentifier:
                          "t_function_internal_nonpayable$_t_uint256_$_t_string_memory_ptr_$returns$__$",
                        typeString: "function (uint256,string memory)",
                      },
                    },
                    id: 42,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    kind: "functionCall",
                    lValueRequested: false,
                    names: [],
                    nodeType: "FunctionCall",
                    src: "553:34:10",
                    tryCall: false,
                    typeDescriptions: {
                      typeIdentifier: "t_tuple$__$",
                      typeString: "tuple()",
                    },
                  },
                  id: 43,
                  nodeType: "ExpressionStatement",
                  src: "553:34:10",
                },
                {
                  expression: {
                    id: 48,
                    isConstant: false,
                    isLValue: false,
                    isPure: false,
                    lValueRequested: false,
                    leftHandSide: {
                      id: 44,
                      name: "tokenCounter",
                      nodeType: "Identifier",
                      overloadedDeclarations: [],
                      referencedDeclaration: 6,
                      src: "597:12:10",
                      typeDescriptions: {
                        typeIdentifier: "t_uint256",
                        typeString: "uint256",
                      },
                    },
                    nodeType: "Assignment",
                    operator: "=",
                    rightHandSide: {
                      commonType: {
                        typeIdentifier: "t_uint256",
                        typeString: "uint256",
                      },
                      id: 47,
                      isConstant: false,
                      isLValue: false,
                      isPure: false,
                      lValueRequested: false,
                      leftExpression: {
                        id: 45,
                        name: "tokenCounter",
                        nodeType: "Identifier",
                        overloadedDeclarations: [],
                        referencedDeclaration: 6,
                        src: "612:12:10",
                        typeDescriptions: {
                          typeIdentifier: "t_uint256",
                          typeString: "uint256",
                        },
                      },
                      nodeType: "BinaryOperation",
                      operator: "+",
                      rightExpression: {
                        hexValue: "31",
                        id: 46,
                        isConstant: false,
                        isLValue: false,
                        isPure: true,
                        kind: "number",
                        lValueRequested: false,
                        nodeType: "Literal",
                        src: "627:1:10",
                        typeDescriptions: {
                          typeIdentifier: "t_rational_1_by_1",
                          typeString: "int_const 1",
                        },
                        value: "1",
                      },
                      src: "612:16:10",
                      typeDescriptions: {
                        typeIdentifier: "t_uint256",
                        typeString: "uint256",
                      },
                    },
                    src: "597:31:10",
                    typeDescriptions: {
                      typeIdentifier: "t_uint256",
                      typeString: "uint256",
                    },
                  },
                  id: 49,
                  nodeType: "ExpressionStatement",
                  src: "597:31:10",
                },
                {
                  expression: {
                    id: 50,
                    name: "newTokenId",
                    nodeType: "Identifier",
                    overloadedDeclarations: [],
                    referencedDeclaration: 30,
                    src: "645:10:10",
                    typeDescriptions: {
                      typeIdentifier: "t_uint256",
                      typeString: "uint256",
                    },
                  },
                  functionReturnParameters: 28,
                  id: 51,
                  nodeType: "Return",
                  src: "638:17:10",
                },
              ],
            },
            functionSelector: "31f1f3c3",
            id: 53,
            implemented: true,
            kind: "function",
            modifiers: [],
            name: "createCollectible",
            nameLocation: "389:17:10",
            nodeType: "FunctionDefinition",
            parameters: {
              id: 25,
              nodeType: "ParameterList",
              parameters: [
                {
                  constant: false,
                  id: 24,
                  mutability: "mutable",
                  name: "tokenURI",
                  nameLocation: "422:8:10",
                  nodeType: "VariableDeclaration",
                  scope: 53,
                  src: "408:22:10",
                  stateVariable: false,
                  storageLocation: "memory",
                  typeDescriptions: {
                    typeIdentifier: "t_string_memory_ptr",
                    typeString: "string",
                  },
                  typeName: {
                    id: 23,
                    name: "string",
                    nodeType: "ElementaryTypeName",
                    src: "408:6:10",
                    typeDescriptions: {
                      typeIdentifier: "t_string_storage_ptr",
                      typeString: "string",
                    },
                  },
                  visibility: "internal",
                },
              ],
              src: "407:24:10",
            },
            returnParameters: {
              id: 28,
              nodeType: "ParameterList",
              parameters: [
                {
                  constant: false,
                  id: 27,
                  mutability: "mutable",
                  name: "",
                  nameLocation: "-1:-1:-1",
                  nodeType: "VariableDeclaration",
                  scope: 53,
                  src: "448:7:10",
                  stateVariable: false,
                  storageLocation: "default",
                  typeDescriptions: {
                    typeIdentifier: "t_uint256",
                    typeString: "uint256",
                  },
                  typeName: {
                    id: 26,
                    name: "uint256",
                    nodeType: "ElementaryTypeName",
                    src: "448:7:10",
                    typeDescriptions: {
                      typeIdentifier: "t_uint256",
                      typeString: "uint256",
                    },
                  },
                  visibility: "internal",
                },
              ],
              src: "447:9:10",
            },
            scope: 54,
            src: "380:282:10",
            stateMutability: "nonpayable",
            virtual: false,
            visibility: "public",
          },
        ],
        scope: 55,
        src: "137:527:10",
        usedErrors: [],
      },
    ],
    src: "32:634:10",
  },
  bytecode:
    "60806040523480156200001157600080fd5b50604051620019ca380380620019ca8339810160408190526200003491620001e7565b8151829082906200004d90600090602085019062000074565b5080516200006390600190602084019062000074565b50506001600755506200028e915050565b828054620000829062000251565b90600052602060002090601f016020900481019282620000a65760008555620000f1565b82601f10620000c157805160ff1916838001178555620000f1565b82800160010185558215620000f1579182015b82811115620000f1578251825591602001919060010190620000d4565b50620000ff92915062000103565b5090565b5b80821115620000ff576000815560010162000104565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200014257600080fd5b81516001600160401b03808211156200015f576200015f6200011a565b604051601f8301601f19908116603f011681019082821181831017156200018a576200018a6200011a565b81604052838152602092508683858801011115620001a757600080fd5b600091505b83821015620001cb5785820183015181830184015290820190620001ac565b83821115620001dd5760008385830101525b9695505050505050565b60008060408385031215620001fb57600080fd5b82516001600160401b03808211156200021357600080fd5b620002218683870162000130565b935060208501519150808211156200023857600080fd5b50620002478582860162000130565b9150509250929050565b600181811c908216806200026657607f821691505b602082108114156200028857634e487b7160e01b600052602260045260246000fd5b50919050565b61172c806200029e6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80636352211e11610097578063b88d4fde11610066578063b88d4fde146101ff578063c87b56dd14610212578063d082e38114610225578063e985e9c51461022e57600080fd5b80636352211e146101be57806370a08231146101d157806395d89b41146101e4578063a22cb465146101ec57600080fd5b8063095ea7b3116100d3578063095ea7b31461016257806323b872dd1461017757806331f1f3c31461018a57806342842e0e146101ab57600080fd5b806301ffc9a7146100fa57806306fdde0314610122578063081812fc14610137575b600080fd5b61010d6101083660046111dd565b61026a565b60405190151581526020015b60405180910390f35b61012a6102bc565b6040516101199190611252565b61014a610145366004611265565b61034e565b6040516001600160a01b039091168152602001610119565b61017561017036600461129a565b6103db565b005b6101756101853660046112c4565b6104f1565b61019d61019836600461138c565b610522565b604051908152602001610119565b6101756101b93660046112c4565b610553565b61014a6101cc366004611265565b61056e565b61019d6101df3660046113d5565b6105e5565b61012a61066c565b6101756101fa3660046113f0565b61067b565b61017561020d36600461142c565b61068a565b61012a610220366004611265565b6106c2565b61019d60075481565b61010d61023c3660046114a8565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061029b57506001600160e01b03198216635b5e139f60e01b145b806102b657506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102cb906114db565b80601f01602080910402602001604051908101604052809291908181526020018280546102f7906114db565b80156103445780601f1061031957610100808354040283529160200191610344565b820191906000526020600020905b81548152906001019060200180831161032757829003601f168201915b5050505050905090565b600061035982610839565b6103bf5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006103e68261056e565b9050806001600160a01b0316836001600160a01b031614156104545760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016103b6565b336001600160a01b03821614806104705750610470813361023c565b6104e25760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016103b6565b6104ec8383610856565b505050565b6104fb33826108c4565b6105175760405162461bcd60e51b81526004016103b690611516565b6104ec8383836109aa565b6007546000906105323382610b4a565b61053c8184610b64565b60075461054a90600161157d565b60075592915050565b6104ec8383836040518060200160405280600081525061068a565b6000818152600260205260408120546001600160a01b0316806102b65760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016103b6565b60006001600160a01b0382166106505760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016103b6565b506001600160a01b031660009081526003602052604090205490565b6060600180546102cb906114db565b610686338383610bef565b5050565b61069433836108c4565b6106b05760405162461bcd60e51b81526004016103b690611516565b6106bc84848484610cbe565b50505050565b60606106cd82610839565b6107335760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f72206044820152703737b732bc34b9ba32b73a103a37b5b2b760791b60648201526084016103b6565b6000828152600660205260408120805461074c906114db565b80601f0160208091040260200160405190810160405280929190818152602001828054610778906114db565b80156107c55780601f1061079a576101008083540402835291602001916107c5565b820191906000526020600020905b8154815290600101906020018083116107a857829003601f168201915b5050505050905060006107e360408051602081019091526000815290565b90508051600014156107f6575092915050565b815115610828578082604051602001610810929190611595565b60405160208183030381529060405292505050919050565b61083184610cf1565b949350505050565b6000908152600260205260409020546001600160a01b0316151590565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061088b8261056e565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60006108cf82610839565b6109305760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016103b6565b600061093b8361056e565b9050806001600160a01b0316846001600160a01b031614806109765750836001600160a01b031661096b8461034e565b6001600160a01b0316145b8061083157506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff16610831565b826001600160a01b03166109bd8261056e565b6001600160a01b031614610a255760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b60648201526084016103b6565b6001600160a01b038216610a875760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103b6565b610a92600082610856565b6001600160a01b0383166000908152600360205260408120805460019290610abb9084906115c4565b90915550506001600160a01b0382166000908152600360205260408120805460019290610ae990849061157d565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b610686828260405180602001604052806000815250610dc9565b610b6d82610839565b610bd05760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b60648201526084016103b6565b600082815260066020908152604090912082516104ec9284019061112b565b816001600160a01b0316836001600160a01b03161415610c515760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103b6565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610cc98484846109aa565b610cd584848484610dfc565b6106bc5760405162461bcd60e51b81526004016103b6906115db565b6060610cfc82610839565b610d605760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016103b6565b6000610d7760408051602081019091526000815290565b90506000815111610d975760405180602001604052806000815250610dc2565b80610da184610efa565b604051602001610db2929190611595565b6040516020818303038152906040525b9392505050565b610dd38383610ff8565b610de06000848484610dfc565b6104ec5760405162461bcd60e51b81526004016103b6906115db565b60006001600160a01b0384163b15610eef57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610e4090339089908890889060040161162d565b6020604051808303816000875af1925050508015610e7b575060408051601f3d908101601f19168201909252610e789181019061166a565b60015b610ed5573d808015610ea9576040519150601f19603f3d011682016040523d82523d6000602084013e610eae565b606091505b508051610ecd5760405162461bcd60e51b81526004016103b6906115db565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610831565b506001949350505050565b606081610f1e5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610f485780610f3281611687565b9150610f419050600a836116b8565b9150610f22565b60008167ffffffffffffffff811115610f6357610f63611300565b6040519080825280601f01601f191660200182016040528015610f8d576020820181803683370190505b5090505b841561083157610fa26001836115c4565b9150610faf600a866116cc565b610fba90603061157d565b60f81b818381518110610fcf57610fcf6116e0565b60200101906001600160f81b031916908160001a905350610ff1600a866116b8565b9450610f91565b6001600160a01b03821661104e5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103b6565b61105781610839565b156110a45760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103b6565b6001600160a01b03821660009081526003602052604081208054600192906110cd90849061157d565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b828054611137906114db565b90600052602060002090601f016020900481019282611159576000855561119f565b82601f1061117257805160ff191683800117855561119f565b8280016001018555821561119f579182015b8281111561119f578251825591602001919060010190611184565b506111ab9291506111af565b5090565b5b808211156111ab57600081556001016111b0565b6001600160e01b0319811681146111da57600080fd5b50565b6000602082840312156111ef57600080fd5b8135610dc2816111c4565b60005b838110156112155781810151838201526020016111fd565b838111156106bc5750506000910152565b6000815180845261123e8160208601602086016111fa565b601f01601f19169290920160200192915050565b602081526000610dc26020830184611226565b60006020828403121561127757600080fd5b5035919050565b80356001600160a01b038116811461129557600080fd5b919050565b600080604083850312156112ad57600080fd5b6112b68361127e565b946020939093013593505050565b6000806000606084860312156112d957600080fd5b6112e28461127e565b92506112f06020850161127e565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561133157611331611300565b604051601f8501601f19908116603f0116810190828211818310171561135957611359611300565b8160405280935085815286868601111561137257600080fd5b858560208301376000602087830101525050509392505050565b60006020828403121561139e57600080fd5b813567ffffffffffffffff8111156113b557600080fd5b8201601f810184136113c657600080fd5b61083184823560208401611316565b6000602082840312156113e757600080fd5b610dc28261127e565b6000806040838503121561140357600080fd5b61140c8361127e565b91506020830135801515811461142157600080fd5b809150509250929050565b6000806000806080858703121561144257600080fd5b61144b8561127e565b93506114596020860161127e565b925060408501359150606085013567ffffffffffffffff81111561147c57600080fd5b8501601f8101871361148d57600080fd5b61149c87823560208401611316565b91505092959194509250565b600080604083850312156114bb57600080fd5b6114c48361127e565b91506114d26020840161127e565b90509250929050565b600181811c908216806114ef57607f821691505b6020821081141561151057634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b6000821982111561159057611590611567565b500190565b600083516115a78184602088016111fa565b8351908301906115bb8183602088016111fa565b01949350505050565b6000828210156115d6576115d6611567565b500390565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061166090830184611226565b9695505050505050565b60006020828403121561167c57600080fd5b8151610dc2816111c4565b600060001982141561169b5761169b611567565b5060010190565b634e487b7160e01b600052601260045260246000fd5b6000826116c7576116c76116a2565b500490565b6000826116db576116db6116a2565b500690565b634e487b7160e01b600052603260045260246000fdfea2646970667358221220dbdd730a9d7444bf9d5e113e085e2eb2e159defaf2b61cac3ba47dd1d547005464736f6c634300080a0033",
  bytecodeSha1: "81e5995834facba7d42ccc0608bb30a79ebbc8c1",
  compiler: {
    evm_version: "istanbul",
    optimizer: {
      enabled: true,
      runs: 200,
    },
    version: "0.8.10+commit.fc410830",
  },
  contractName: "NFTCollection",
  coverageMap: {
    branches: {
      0: {
        "ERC721._isApprovedOrOwner": {
          69: [7544, 7560, true],
        },
        "ERC721._mint": {
          77: [9142, 9158, true],
          78: [9213, 9230, true],
        },
        "ERC721._safeMint": {
          76: [8604, 8658, true],
        },
        "ERC721._safeTransfer": {
          73: [6731, 6779, true],
        },
        "ERC721._setApprovalForAll": {
          72: [11442, 11459, true],
        },
        "ERC721._transfer": {
          70: [10451, 10482, true],
          71: [10546, 10562, true],
        },
        "ERC721.approve": {
          62: [3659, 3670, true],
          63: [3740, 3761, true],
          64: [3765, 3802, true],
        },
        "ERC721.balanceOf": {
          67: [2013, 2032, true],
        },
        "ERC721.getApproved": {
          61: [4087, 4103, true],
        },
        "ERC721.ownerOf": {
          66: [2317, 2336, true],
        },
        "ERC721.safeTransferFrom": {
          68: [5521, 5562, true],
        },
        "ERC721.tokenURI": {
          74: [2909, 2925, true],
          75: [3039, 3064, true],
        },
        "ERC721.transferFrom": {
          65: [4900, 4941, true],
        },
      },
      1: {},
      10: {},
      3: {
        "ERC721URIStorage._setTokenURI": {
          82: [1376, 1392, true],
        },
        "ERC721URIStorage.tokenURI": {
          79: [573, 589, true],
          80: [813, 836, false],
          81: [981, 1008, false],
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
          30: [11069, 11098],
          31: [11108, 11159],
        },
        "ERC721._baseURI": {
          25: [3449, 3458],
        },
        "ERC721._checkOnERC721Received": {
          53: [12647, 12707],
          54: [12481, 12539],
          55: [12911, 12922],
        },
        "ERC721._exists": {
          29: [7225, 7262],
        },
        "ERC721._isApprovedOrOwner": {
          32: [7536, 7609],
          33: [7668, 7764],
        },
        "ERC721._mint": {
          56: [9134, 9195],
          57: [9205, 9263],
          58: [9330, 9348],
          59: [9358, 9379],
          60: [9390, 9428],
        },
        "ERC721._safeMint": {
          41: [8176, 8202],
          51: [8555, 8573],
          52: [8583, 8734],
        },
        "ERC721._safeTransfer": {
          47: [6685, 6713],
          48: [6723, 6834],
        },
        "ERC721._setApprovalForAll": {
          44: [11434, 11489],
          45: [11499, 11545],
          46: [11555, 11601],
        },
        "ERC721._transfer": {
          34: [10443, 10528],
          35: [10538, 10603],
          36: [10715, 10744],
          37: [10755, 10775],
          38: [10785, 10803],
          39: [10813, 10834],
          40: [10845, 10877],
        },
        "ERC721.approve": {
          6: [3651, 3708],
          8: [3719, 3884],
          9: [3895, 3916],
        },
        "ERC721.balanceOf": {
          18: [2005, 2079],
          19: [2089, 2112],
        },
        "ERC721.getApproved": {
          4: [4079, 4152],
          5: [4163, 4194],
        },
        "ERC721.isApprovedForAll": {
          0: [4600, 4642],
        },
        "ERC721.name": {
          3: [2552, 2564],
        },
        "ERC721.ownerOf": {
          17: [2309, 2382],
        },
        "ERC721.safeTransferFrom": {
          16: [5240, 5279],
          22: [5513, 5616],
          23: [5626, 5665],
        },
        "ERC721.setApprovalForAll": {
          21: [4362, 4414],
        },
        "ERC721.supportsInterface": {
          1: [1673, 1848],
        },
        "ERC721.symbol": {
          20: [2716, 2730],
        },
        "ERC721.tokenURI": {
          49: [2901, 2977],
          50: [3032, 3125],
        },
        "ERC721.transferFrom": {
          10: [4892, 4995],
          11: [5006, 5034],
        },
      },
      1: {},
      10: {
        "NFTCollection.createCollectible": {
          12: [510, 543],
          13: [553, 587],
          14: [597, 628],
          15: [638, 655],
        },
      },
      3: {
        "ERC721URIStorage._setTokenURI": {
          42: [1368, 1443],
          43: [1453, 1484],
        },
        "ERC721URIStorage.tokenURI": {
          24: [565, 643],
          26: [852, 868],
          27: [1024, 1072],
          28: [1093, 1123],
        },
      },
      4: {},
      6: {
        "Context._msgSender": {
          7: [712, 729],
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
    "608060405234801561001057600080fd5b50600436106100f55760003560e01c80636352211e11610097578063b88d4fde11610066578063b88d4fde146101ff578063c87b56dd14610212578063d082e38114610225578063e985e9c51461022e57600080fd5b80636352211e146101be57806370a08231146101d157806395d89b41146101e4578063a22cb465146101ec57600080fd5b8063095ea7b3116100d3578063095ea7b31461016257806323b872dd1461017757806331f1f3c31461018a57806342842e0e146101ab57600080fd5b806301ffc9a7146100fa57806306fdde0314610122578063081812fc14610137575b600080fd5b61010d6101083660046111dd565b61026a565b60405190151581526020015b60405180910390f35b61012a6102bc565b6040516101199190611252565b61014a610145366004611265565b61034e565b6040516001600160a01b039091168152602001610119565b61017561017036600461129a565b6103db565b005b6101756101853660046112c4565b6104f1565b61019d61019836600461138c565b610522565b604051908152602001610119565b6101756101b93660046112c4565b610553565b61014a6101cc366004611265565b61056e565b61019d6101df3660046113d5565b6105e5565b61012a61066c565b6101756101fa3660046113f0565b61067b565b61017561020d36600461142c565b61068a565b61012a610220366004611265565b6106c2565b61019d60075481565b61010d61023c3660046114a8565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061029b57506001600160e01b03198216635b5e139f60e01b145b806102b657506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102cb906114db565b80601f01602080910402602001604051908101604052809291908181526020018280546102f7906114db565b80156103445780601f1061031957610100808354040283529160200191610344565b820191906000526020600020905b81548152906001019060200180831161032757829003601f168201915b5050505050905090565b600061035982610839565b6103bf5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006103e68261056e565b9050806001600160a01b0316836001600160a01b031614156104545760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016103b6565b336001600160a01b03821614806104705750610470813361023c565b6104e25760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016103b6565b6104ec8383610856565b505050565b6104fb33826108c4565b6105175760405162461bcd60e51b81526004016103b690611516565b6104ec8383836109aa565b6007546000906105323382610b4a565b61053c8184610b64565b60075461054a90600161157d565b60075592915050565b6104ec8383836040518060200160405280600081525061068a565b6000818152600260205260408120546001600160a01b0316806102b65760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016103b6565b60006001600160a01b0382166106505760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016103b6565b506001600160a01b031660009081526003602052604090205490565b6060600180546102cb906114db565b610686338383610bef565b5050565b61069433836108c4565b6106b05760405162461bcd60e51b81526004016103b690611516565b6106bc84848484610cbe565b50505050565b60606106cd82610839565b6107335760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f72206044820152703737b732bc34b9ba32b73a103a37b5b2b760791b60648201526084016103b6565b6000828152600660205260408120805461074c906114db565b80601f0160208091040260200160405190810160405280929190818152602001828054610778906114db565b80156107c55780601f1061079a576101008083540402835291602001916107c5565b820191906000526020600020905b8154815290600101906020018083116107a857829003601f168201915b5050505050905060006107e360408051602081019091526000815290565b90508051600014156107f6575092915050565b815115610828578082604051602001610810929190611595565b60405160208183030381529060405292505050919050565b61083184610cf1565b949350505050565b6000908152600260205260409020546001600160a01b0316151590565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061088b8261056e565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60006108cf82610839565b6109305760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016103b6565b600061093b8361056e565b9050806001600160a01b0316846001600160a01b031614806109765750836001600160a01b031661096b8461034e565b6001600160a01b0316145b8061083157506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff16610831565b826001600160a01b03166109bd8261056e565b6001600160a01b031614610a255760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b60648201526084016103b6565b6001600160a01b038216610a875760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103b6565b610a92600082610856565b6001600160a01b0383166000908152600360205260408120805460019290610abb9084906115c4565b90915550506001600160a01b0382166000908152600360205260408120805460019290610ae990849061157d565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b610686828260405180602001604052806000815250610dc9565b610b6d82610839565b610bd05760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b60648201526084016103b6565b600082815260066020908152604090912082516104ec9284019061112b565b816001600160a01b0316836001600160a01b03161415610c515760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103b6565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610cc98484846109aa565b610cd584848484610dfc565b6106bc5760405162461bcd60e51b81526004016103b6906115db565b6060610cfc82610839565b610d605760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016103b6565b6000610d7760408051602081019091526000815290565b90506000815111610d975760405180602001604052806000815250610dc2565b80610da184610efa565b604051602001610db2929190611595565b6040516020818303038152906040525b9392505050565b610dd38383610ff8565b610de06000848484610dfc565b6104ec5760405162461bcd60e51b81526004016103b6906115db565b60006001600160a01b0384163b15610eef57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610e4090339089908890889060040161162d565b6020604051808303816000875af1925050508015610e7b575060408051601f3d908101601f19168201909252610e789181019061166a565b60015b610ed5573d808015610ea9576040519150601f19603f3d011682016040523d82523d6000602084013e610eae565b606091505b508051610ecd5760405162461bcd60e51b81526004016103b6906115db565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610831565b506001949350505050565b606081610f1e5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610f485780610f3281611687565b9150610f419050600a836116b8565b9150610f22565b60008167ffffffffffffffff811115610f6357610f63611300565b6040519080825280601f01601f191660200182016040528015610f8d576020820181803683370190505b5090505b841561083157610fa26001836115c4565b9150610faf600a866116cc565b610fba90603061157d565b60f81b818381518110610fcf57610fcf6116e0565b60200101906001600160f81b031916908160001a905350610ff1600a866116b8565b9450610f91565b6001600160a01b03821661104e5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103b6565b61105781610839565b156110a45760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103b6565b6001600160a01b03821660009081526003602052604081208054600192906110cd90849061157d565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b828054611137906114db565b90600052602060002090601f016020900481019282611159576000855561119f565b82601f1061117257805160ff191683800117855561119f565b8280016001018555821561119f579182015b8281111561119f578251825591602001919060010190611184565b506111ab9291506111af565b5090565b5b808211156111ab57600081556001016111b0565b6001600160e01b0319811681146111da57600080fd5b50565b6000602082840312156111ef57600080fd5b8135610dc2816111c4565b60005b838110156112155781810151838201526020016111fd565b838111156106bc5750506000910152565b6000815180845261123e8160208601602086016111fa565b601f01601f19169290920160200192915050565b602081526000610dc26020830184611226565b60006020828403121561127757600080fd5b5035919050565b80356001600160a01b038116811461129557600080fd5b919050565b600080604083850312156112ad57600080fd5b6112b68361127e565b946020939093013593505050565b6000806000606084860312156112d957600080fd5b6112e28461127e565b92506112f06020850161127e565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561133157611331611300565b604051601f8501601f19908116603f0116810190828211818310171561135957611359611300565b8160405280935085815286868601111561137257600080fd5b858560208301376000602087830101525050509392505050565b60006020828403121561139e57600080fd5b813567ffffffffffffffff8111156113b557600080fd5b8201601f810184136113c657600080fd5b61083184823560208401611316565b6000602082840312156113e757600080fd5b610dc28261127e565b6000806040838503121561140357600080fd5b61140c8361127e565b91506020830135801515811461142157600080fd5b809150509250929050565b6000806000806080858703121561144257600080fd5b61144b8561127e565b93506114596020860161127e565b925060408501359150606085013567ffffffffffffffff81111561147c57600080fd5b8501601f8101871361148d57600080fd5b61149c87823560208401611316565b91505092959194509250565b600080604083850312156114bb57600080fd5b6114c48361127e565b91506114d26020840161127e565b90509250929050565b600181811c908216806114ef57607f821691505b6020821081141561151057634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b6000821982111561159057611590611567565b500190565b600083516115a78184602088016111fa565b8351908301906115bb8183602088016111fa565b01949350505050565b6000828210156115d6576115d6611567565b500390565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061166090830184611226565b9695505050505050565b60006020828403121561167c57600080fd5b8151610dc2816111c4565b600060001982141561169b5761169b611567565b5060010190565b634e487b7160e01b600052601260045260246000fd5b6000826116c7576116c76116a2565b500490565b6000826116db576116db6116a2565b500690565b634e487b7160e01b600052603260045260246000fdfea2646970667358221220dbdd730a9d7444bf9d5e113e085e2eb2e159defaf2b61cac3ba47dd1d547005464736f6c634300080a0033",
  deployedSourceMap:
    "137:527:10:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1555:300:0;;;;;;:::i;:::-;;:::i;:::-;;;565:14:11;;558:22;540:41;;528:2;513:18;1555:300:0;;;;;;;;2473:98;;;:::i;:::-;;;;;;;:::i;3984:217::-;;;;;;:::i;:::-;;:::i;:::-;;;-1:-1:-1;;;;;1692:32:11;;;1674:51;;1662:2;1647:18;3984:217:0;1528:203:11;3522:401:0;;;;;;:::i;:::-;;:::i;:::-;;4711:330;;;;;;:::i;:::-;;:::i;380:282:10:-;;;;;;:::i;:::-;;:::i;:::-;;;3877:25:11;;;3865:2;3850:18;380:282:10;3731:177:11;5107:179:0;;;;;;:::i;:::-;;:::i;2176:235::-;;;;;;:::i;:::-;;:::i;1914:205::-;;;;;;:::i;:::-;;:::i;2635:102::-;;;:::i;4268:153::-;;;;;;:::i;:::-;;:::i;5352:320::-;;;;;;:::i;:::-;;:::i;467:663:3:-;;;;;;:::i;:::-;;:::i;186:27:10:-;;;;;;4487:162:0;;;;;;:::i;:::-;-1:-1:-1;;;;;4607:25:0;;;4584:4;4607:25;;;:18;:25;;;;;;;;:35;;;;;;;;;;;;;;;4487:162;1555:300;1657:4;-1:-1:-1;;;;;;1692:40:0;;-1:-1:-1;;;1692:40:0;;:104;;-1:-1:-1;;;;;;;1748:48:0;;-1:-1:-1;;;1748:48:0;1692:104;:156;;;-1:-1:-1;;;;;;;;;;937:40:8;;;1812:36:0;1673:175;1555:300;-1:-1:-1;;1555:300:0:o;2473:98::-;2527:13;2559:5;2552:12;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2473:98;:::o;3984:217::-;4060:7;4087:16;4095:7;4087;:16::i;:::-;4079:73;;;;-1:-1:-1;;;4079:73:0;;5980:2:11;4079:73:0;;;5962:21:11;6019:2;5999:18;;;5992:30;6058:34;6038:18;;;6031:62;-1:-1:-1;;;6109:18:11;;;6102:42;6161:19;;4079:73:0;;;;;;;;;-1:-1:-1;4170:24:0;;;;:15;:24;;;;;;-1:-1:-1;;;;;4170:24:0;;3984:217::o;3522:401::-;3602:13;3618:23;3633:7;3618:14;:23::i;:::-;3602:39;;3665:5;-1:-1:-1;;;;;3659:11:0;:2;-1:-1:-1;;;;;3659:11:0;;;3651:57;;;;-1:-1:-1;;;3651:57:0;;6393:2:11;3651:57:0;;;6375:21:11;6432:2;6412:18;;;6405:30;6471:34;6451:18;;;6444:62;-1:-1:-1;;;6522:18:11;;;6515:31;6563:19;;3651:57:0;6191:397:11;3651:57:0;719:10:6;-1:-1:-1;;;;;3740:21:0;;;;:62;;-1:-1:-1;3765:37:0;3782:5;719:10:6;4487:162:0;:::i;3765:37::-;3719:165;;;;-1:-1:-1;;;3719:165:0;;6795:2:11;3719:165:0;;;6777:21:11;6834:2;6814:18;;;6807:30;6873:34;6853:18;;;6846:62;6944:26;6924:18;;;6917:54;6988:19;;3719:165:0;6593:420:11;3719:165:0;3895:21;3904:2;3908:7;3895:8;:21::i;:::-;3592:331;3522:401;;:::o;4711:330::-;4900:41;719:10:6;4933:7:0;4900:18;:41::i;:::-;4892:103;;;;-1:-1:-1;;;4892:103:0;;;;;;;:::i;:::-;5006:28;5016:4;5022:2;5026:7;5006:9;:28::i;380:282:10:-;488:12;;448:7;;510:33;520:10;488:12;510:9;:33::i;:::-;553:34;566:10;578:8;553:12;:34::i;:::-;612:12;;:16;;627:1;612:16;:::i;:::-;597:12;:31;645:10;380:282;-1:-1:-1;;380:282:10:o;5107:179:0:-;5240:39;5257:4;5263:2;5267:7;5240:39;;;;;;;;;;;;:16;:39::i;2176:235::-;2248:7;2283:16;;;:7;:16;;;;;;-1:-1:-1;;;;;2283:16:0;2317:19;2309:73;;;;-1:-1:-1;;;2309:73:0;;7903:2:11;2309:73:0;;;7885:21:11;7942:2;7922:18;;;7915:30;7981:34;7961:18;;;7954:62;-1:-1:-1;;;8032:18:11;;;8025:39;8081:19;;2309:73:0;7701:405:11;1914:205:0;1986:7;-1:-1:-1;;;;;2013:19:0;;2005:74;;;;-1:-1:-1;;;2005:74:0;;8313:2:11;2005:74:0;;;8295:21:11;8352:2;8332:18;;;8325:30;8391:34;8371:18;;;8364:62;-1:-1:-1;;;8442:18:11;;;8435:40;8492:19;;2005:74:0;8111:406:11;2005:74:0;-1:-1:-1;;;;;;2096:16:0;;;;;:9;:16;;;;;;;1914:205::o;2635:102::-;2691:13;2723:7;2716:14;;;;;:::i;4268:153::-;4362:52;719:10:6;4395:8:0;4405;4362:18;:52::i;:::-;4268:153;;:::o;5352:320::-;5521:41;719:10:6;5554:7:0;5521:18;:41::i;:::-;5513:103;;;;-1:-1:-1;;;5513:103:0;;;;;;;:::i;:::-;5626:39;5640:4;5646:2;5650:7;5659:5;5626:13;:39::i;:::-;5352:320;;;;:::o;467:663:3:-;540:13;573:16;581:7;573;:16::i;:::-;565:78;;;;-1:-1:-1;;;565:78:3;;8724:2:11;565:78:3;;;8706:21:11;8763:2;8743:18;;;8736:30;8802:34;8782:18;;;8775:62;-1:-1:-1;;;8853:18:11;;;8846:47;8910:19;;565:78:3;8522:413:11;565:78:3;654:23;680:19;;;:10;:19;;;;;654:45;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;709:18;730:10;3449:9:0;;;;;;;;;-1:-1:-1;3449:9:0;;;3373:92;730:10:3;709:31;;819:4;813:18;835:1;813:23;809:70;;;-1:-1:-1;859:9:3;467:663;-1:-1:-1;;467:663:3:o;809:70::-;981:23;;:27;977:106;;1055:4;1061:9;1038:33;;;;;;;;;:::i;:::-;;;;;;;;;;;;;1024:48;;;;467:663;;;:::o;977:106::-;1100:23;1115:7;1100:14;:23::i;:::-;1093:30;467:663;-1:-1:-1;;;;467:663:3:o;7144:125:0:-;7209:4;7232:16;;;:7;:16;;;;;;-1:-1:-1;;;;;7232:16:0;:30;;;7144:125::o;10995:171::-;11069:24;;;;:15;:24;;;;;:29;;-1:-1:-1;;;;;;11069:29:0;-1:-1:-1;;;;;11069:29:0;;;;;;;;:24;;11122:23;11069:24;11122:14;:23::i;:::-;-1:-1:-1;;;;;11113:46:0;;;;;;;;;;;10995:171;;:::o;7427:344::-;7520:4;7544:16;7552:7;7544;:16::i;:::-;7536:73;;;;-1:-1:-1;;;7536:73:0;;9617:2:11;7536:73:0;;;9599:21:11;9656:2;9636:18;;;9629:30;9695:34;9675:18;;;9668:62;-1:-1:-1;;;9746:18:11;;;9739:42;9798:19;;7536:73:0;9415:408:11;7536:73:0;7619:13;7635:23;7650:7;7635:14;:23::i;:::-;7619:39;;7687:5;-1:-1:-1;;;;;7676:16:0;:7;-1:-1:-1;;;;;7676:16:0;;:51;;;;7720:7;-1:-1:-1;;;;;7696:31:0;:20;7708:7;7696:11;:20::i;:::-;-1:-1:-1;;;;;7696:31:0;;7676:51;:87;;;-1:-1:-1;;;;;;4607:25:0;;;4584:4;4607:25;;;:18;:25;;;;;;;;:35;;;;;;;;;;;;7731:32;4487:162;10324:560;10478:4;-1:-1:-1;;;;;10451:31:0;:23;10466:7;10451:14;:23::i;:::-;-1:-1:-1;;;;;10451:31:0;;10443:85;;;;-1:-1:-1;;;10443:85:0;;10030:2:11;10443:85:0;;;10012:21:11;10069:2;10049:18;;;10042:30;10108:34;10088:18;;;10081:62;-1:-1:-1;;;10159:18:11;;;10152:39;10208:19;;10443:85:0;9828:405:11;10443:85:0;-1:-1:-1;;;;;10546:16:0;;10538:65;;;;-1:-1:-1;;;10538:65:0;;10440:2:11;10538:65:0;;;10422:21:11;10479:2;10459:18;;;10452:30;10518:34;10498:18;;;10491:62;-1:-1:-1;;;10569:18:11;;;10562:34;10613:19;;10538:65:0;10238:400:11;10538:65:0;10715:29;10732:1;10736:7;10715:8;:29::i;:::-;-1:-1:-1;;;;;10755:15:0;;;;;;:9;:15;;;;;:20;;10774:1;;10755:15;:20;;10774:1;;10755:20;:::i;:::-;;;;-1:-1:-1;;;;;;;10785:13:0;;;;;;:9;:13;;;;;:18;;10802:1;;10785:13;:18;;10802:1;;10785:18;:::i;:::-;;;;-1:-1:-1;;10813:16:0;;;;:7;:16;;;;;;:21;;-1:-1:-1;;;;;;10813:21:0;-1:-1:-1;;;;;10813:21:0;;;;;;;;;10850:27;;10813:16;;10850:27;;;;;;;10324:560;;;:::o;8101:108::-;8176:26;8186:2;8190:7;8176:26;;;;;;;;;;;;:9;:26::i;1277:214:3:-;1376:16;1384:7;1376;:16::i;:::-;1368:75;;;;-1:-1:-1;;;1368:75:3;;10975:2:11;1368:75:3;;;10957:21:11;11014:2;10994:18;;;10987:30;11053:34;11033:18;;;11026:62;-1:-1:-1;;;11104:18:11;;;11097:44;11158:19;;1368:75:3;10773:410:11;1368:75:3;1453:19;;;;:10;:19;;;;;;;;:31;;;;;;;;:::i;11301:307:0:-;11451:8;-1:-1:-1;;;;;11442:17:0;:5;-1:-1:-1;;;;;11442:17:0;;;11434:55;;;;-1:-1:-1;;;11434:55:0;;11390:2:11;11434:55:0;;;11372:21:11;11429:2;11409:18;;;11402:30;11468:27;11448:18;;;11441:55;11513:18;;11434:55:0;11188:349:11;11434:55:0;-1:-1:-1;;;;;11499:25:0;;;;;;;:18;:25;;;;;;;;:35;;;;;;;;;;;;;:46;;-1:-1:-1;;11499:46:0;;;;;;;;;;11560:41;;540::11;;;11560::0;;513:18:11;11560:41:0;;;;;;;11301:307;;;:::o;6534:::-;6685:28;6695:4;6701:2;6705:7;6685:9;:28::i;:::-;6731:48;6754:4;6760:2;6764:7;6773:5;6731:22;:48::i;:::-;6723:111;;;;-1:-1:-1;;;6723:111:0;;;;;;;:::i;2803:329::-;2876:13;2909:16;2917:7;2909;:16::i;:::-;2901:76;;;;-1:-1:-1;;;2901:76:0;;12163:2:11;2901:76:0;;;12145:21:11;12202:2;12182:18;;;12175:30;12241:34;12221:18;;;12214:62;-1:-1:-1;;;12292:18:11;;;12285:45;12347:19;;2901:76:0;11961:411:11;2901:76:0;2988:21;3012:10;3449:9;;;;;;;;;-1:-1:-1;3449:9:0;;;3373:92;3012:10;2988:34;;3063:1;3045:7;3039:21;:25;:86;;;;;;;;;;;;;;;;;3091:7;3100:18;:7;:16;:18::i;:::-;3074:45;;;;;;;;;:::i;:::-;;;;;;;;;;;;;3039:86;3032:93;2803:329;-1:-1:-1;;;2803:329:0:o;8430:311::-;8555:18;8561:2;8565:7;8555:5;:18::i;:::-;8604:54;8635:1;8639:2;8643:7;8652:5;8604:22;:54::i;:::-;8583:151;;;;-1:-1:-1;;;8583:151:0;;;;;;;:::i;12161:778::-;12311:4;-1:-1:-1;;;;;12331:13:0;;1087:20:5;1133:8;12327:606:0;;12366:72;;-1:-1:-1;;;12366:72:0;;-1:-1:-1;;;;;12366:36:0;;;;;:72;;719:10:6;;12417:4:0;;12423:7;;12432:5;;12366:72;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;-1:-1:-1;12366:72:0;;;;;;;;-1:-1:-1;;12366:72:0;;;;;;;;;;;;:::i;:::-;;;12362:519;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;12605:13:0;;12601:266;;12647:60;;-1:-1:-1;;;12647:60:0;;;;;;;:::i;12601:266::-;12819:6;12813:13;12804:6;12800:2;12796:15;12789:38;12362:519;-1:-1:-1;;;;;;12488:51:0;-1:-1:-1;;;12488:51:0;;-1:-1:-1;12481:58:0;;12327:606;-1:-1:-1;12918:4:0;12161:778;;;;;;:::o;328:703:7:-;384:13;601:10;597:51;;-1:-1:-1;;627:10:7;;;;;;;;;;;;-1:-1:-1;;;627:10:7;;;;;328:703::o;597:51::-;672:5;657:12;711:75;718:9;;711:75;;743:8;;;;:::i;:::-;;-1:-1:-1;765:10:7;;-1:-1:-1;773:2:7;765:10;;:::i;:::-;;;711:75;;;795:19;827:6;817:17;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;817:17:7;;795:39;;844:150;851:10;;844:150;;877:11;887:1;877:11;;:::i;:::-;;-1:-1:-1;945:10:7;953:2;945:5;:10;:::i;:::-;932:24;;:2;:24;:::i;:::-;919:39;;902:6;909;902:14;;;;;;;;:::i;:::-;;;;:56;-1:-1:-1;;;;;902:56:7;;;;;;;;-1:-1:-1;972:11:7;981:2;972:11;;:::i;:::-;;;844:150;;9063:372:0;-1:-1:-1;;;;;9142:16:0;;9134:61;;;;-1:-1:-1;;;9134:61:0;;13973:2:11;9134:61:0;;;13955:21:11;;;13992:18;;;13985:30;14051:34;14031:18;;;14024:62;14103:18;;9134:61:0;13771:356:11;9134:61:0;9214:16;9222:7;9214;:16::i;:::-;9213:17;9205:58;;;;-1:-1:-1;;;9205:58:0;;14334:2:11;9205:58:0;;;14316:21:11;14373:2;14353:18;;;14346:30;14412;14392:18;;;14385:58;14460:18;;9205:58:0;14132:352:11;9205:58:0;-1:-1:-1;;;;;9330:13:0;;;;;;:9;:13;;;;;:18;;9347:1;;9330:13;:18;;9347:1;;9330:18;:::i;:::-;;;;-1:-1:-1;;9358:16:0;;;;:7;:16;;;;;;:21;;-1:-1:-1;;;;;;9358:21:0;-1:-1:-1;;;;;9358:21:0;;;;;;;;9395:33;;9358:16;;;9395:33;;9358:16;;9395:33;9063:372;;:::o;-1:-1:-1:-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;14:131:11;-1:-1:-1;;;;;;88:32:11;;78:43;;68:71;;135:1;132;125:12;68:71;14:131;:::o;150:245::-;208:6;261:2;249:9;240:7;236:23;232:32;229:52;;;277:1;274;267:12;229:52;316:9;303:23;335:30;359:5;335:30;:::i;592:258::-;664:1;674:113;688:6;685:1;682:13;674:113;;;764:11;;;758:18;745:11;;;738:39;710:2;703:10;674:113;;;805:6;802:1;799:13;796:48;;;-1:-1:-1;;840:1:11;822:16;;815:27;592:258::o;855:::-;897:3;935:5;929:12;962:6;957:3;950:19;978:63;1034:6;1027:4;1022:3;1018:14;1011:4;1004:5;1000:16;978:63;:::i;:::-;1095:2;1074:15;-1:-1:-1;;1070:29:11;1061:39;;;;1102:4;1057:50;;855:258;-1:-1:-1;;855:258:11:o;1118:220::-;1267:2;1256:9;1249:21;1230:4;1287:45;1328:2;1317:9;1313:18;1305:6;1287:45;:::i;1343:180::-;1402:6;1455:2;1443:9;1434:7;1430:23;1426:32;1423:52;;;1471:1;1468;1461:12;1423:52;-1:-1:-1;1494:23:11;;1343:180;-1:-1:-1;1343:180:11:o;1736:173::-;1804:20;;-1:-1:-1;;;;;1853:31:11;;1843:42;;1833:70;;1899:1;1896;1889:12;1833:70;1736:173;;;:::o;1914:254::-;1982:6;1990;2043:2;2031:9;2022:7;2018:23;2014:32;2011:52;;;2059:1;2056;2049:12;2011:52;2082:29;2101:9;2082:29;:::i;:::-;2072:39;2158:2;2143:18;;;;2130:32;;-1:-1:-1;;;1914:254:11:o;2173:328::-;2250:6;2258;2266;2319:2;2307:9;2298:7;2294:23;2290:32;2287:52;;;2335:1;2332;2325:12;2287:52;2358:29;2377:9;2358:29;:::i;:::-;2348:39;;2406:38;2440:2;2429:9;2425:18;2406:38;:::i;:::-;2396:48;;2491:2;2480:9;2476:18;2463:32;2453:42;;2173:328;;;;;:::o;2506:127::-;2567:10;2562:3;2558:20;2555:1;2548:31;2598:4;2595:1;2588:15;2622:4;2619:1;2612:15;2638:632;2703:5;2733:18;2774:2;2766:6;2763:14;2760:40;;;2780:18;;:::i;:::-;2855:2;2849:9;2823:2;2909:15;;-1:-1:-1;;2905:24:11;;;2931:2;2901:33;2897:42;2885:55;;;2955:18;;;2975:22;;;2952:46;2949:72;;;3001:18;;:::i;:::-;3041:10;3037:2;3030:22;3070:6;3061:15;;3100:6;3092;3085:22;3140:3;3131:6;3126:3;3122:16;3119:25;3116:45;;;3157:1;3154;3147:12;3116:45;3207:6;3202:3;3195:4;3187:6;3183:17;3170:44;3262:1;3255:4;3246:6;3238;3234:19;3230:30;3223:41;;;;2638:632;;;;;:::o;3275:451::-;3344:6;3397:2;3385:9;3376:7;3372:23;3368:32;3365:52;;;3413:1;3410;3403:12;3365:52;3453:9;3440:23;3486:18;3478:6;3475:30;3472:50;;;3518:1;3515;3508:12;3472:50;3541:22;;3594:4;3586:13;;3582:27;-1:-1:-1;3572:55:11;;3623:1;3620;3613:12;3572:55;3646:74;3712:7;3707:2;3694:16;3689:2;3685;3681:11;3646:74;:::i;3913:186::-;3972:6;4025:2;4013:9;4004:7;4000:23;3996:32;3993:52;;;4041:1;4038;4031:12;3993:52;4064:29;4083:9;4064:29;:::i;4104:347::-;4169:6;4177;4230:2;4218:9;4209:7;4205:23;4201:32;4198:52;;;4246:1;4243;4236:12;4198:52;4269:29;4288:9;4269:29;:::i;:::-;4259:39;;4348:2;4337:9;4333:18;4320:32;4395:5;4388:13;4381:21;4374:5;4371:32;4361:60;;4417:1;4414;4407:12;4361:60;4440:5;4430:15;;;4104:347;;;;;:::o;4456:667::-;4551:6;4559;4567;4575;4628:3;4616:9;4607:7;4603:23;4599:33;4596:53;;;4645:1;4642;4635:12;4596:53;4668:29;4687:9;4668:29;:::i;:::-;4658:39;;4716:38;4750:2;4739:9;4735:18;4716:38;:::i;:::-;4706:48;;4801:2;4790:9;4786:18;4773:32;4763:42;;4856:2;4845:9;4841:18;4828:32;4883:18;4875:6;4872:30;4869:50;;;4915:1;4912;4905:12;4869:50;4938:22;;4991:4;4983:13;;4979:27;-1:-1:-1;4969:55:11;;5020:1;5017;5010:12;4969:55;5043:74;5109:7;5104:2;5091:16;5086:2;5082;5078:11;5043:74;:::i;:::-;5033:84;;;4456:667;;;;;;;:::o;5128:260::-;5196:6;5204;5257:2;5245:9;5236:7;5232:23;5228:32;5225:52;;;5273:1;5270;5263:12;5225:52;5296:29;5315:9;5296:29;:::i;:::-;5286:39;;5344:38;5378:2;5367:9;5363:18;5344:38;:::i;:::-;5334:48;;5128:260;;;;;:::o;5393:380::-;5472:1;5468:12;;;;5515;;;5536:61;;5590:4;5582:6;5578:17;5568:27;;5536:61;5643:2;5635:6;5632:14;5612:18;5609:38;5606:161;;;5689:10;5684:3;5680:20;5677:1;5670:31;5724:4;5721:1;5714:15;5752:4;5749:1;5742:15;5606:161;;5393:380;;;:::o;7018:413::-;7220:2;7202:21;;;7259:2;7239:18;;;7232:30;7298:34;7293:2;7278:18;;7271:62;-1:-1:-1;;;7364:2:11;7349:18;;7342:47;7421:3;7406:19;;7018:413::o;7436:127::-;7497:10;7492:3;7488:20;7485:1;7478:31;7528:4;7525:1;7518:15;7552:4;7549:1;7542:15;7568:128;7608:3;7639:1;7635:6;7632:1;7629:13;7626:39;;;7645:18;;:::i;:::-;-1:-1:-1;7681:9:11;;7568:128::o;8940:470::-;9119:3;9157:6;9151:13;9173:53;9219:6;9214:3;9207:4;9199:6;9195:17;9173:53;:::i;:::-;9289:13;;9248:16;;;;9311:57;9289:13;9248:16;9345:4;9333:17;;9311:57;:::i;:::-;9384:20;;8940:470;-1:-1:-1;;;;8940:470:11:o;10643:125::-;10683:4;10711:1;10708;10705:8;10702:34;;;10716:18;;:::i;:::-;-1:-1:-1;10753:9:11;;10643:125::o;11542:414::-;11744:2;11726:21;;;11783:2;11763:18;;;11756:30;11822:34;11817:2;11802:18;;11795:62;-1:-1:-1;;;11888:2:11;11873:18;;11866:48;11946:3;11931:19;;11542:414::o;12377:489::-;-1:-1:-1;;;;;12646:15:11;;;12628:34;;12698:15;;12693:2;12678:18;;12671:43;12745:2;12730:18;;12723:34;;;12793:3;12788:2;12773:18;;12766:31;;;12571:4;;12814:46;;12840:19;;12832:6;12814:46;:::i;:::-;12806:54;12377:489;-1:-1:-1;;;;;;12377:489:11:o;12871:249::-;12940:6;12993:2;12981:9;12972:7;12968:23;12964:32;12961:52;;;13009:1;13006;12999:12;12961:52;13041:9;13035:16;13060:30;13084:5;13060:30;:::i;13125:135::-;13164:3;-1:-1:-1;;13185:17:11;;13182:43;;;13205:18;;:::i;:::-;-1:-1:-1;13252:1:11;13241:13;;13125:135::o;13265:127::-;13326:10;13321:3;13317:20;13314:1;13307:31;13357:4;13354:1;13347:15;13381:4;13378:1;13371:15;13397:120;13437:1;13463;13453:35;;13468:18;;:::i;:::-;-1:-1:-1;13502:9:11;;13397:120::o;13522:112::-;13554:1;13580;13570:35;;13585:18;;:::i;:::-;-1:-1:-1;13619:9:11;;13522:112::o;13639:127::-;13700:10;13695:3;13691:20;13688:1;13681:31;13731:4;13728:1;13721:15;13755:4;13752:1;13745:15",
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
  offset: [137, 664],
  opcodes:
    "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0xF5 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x6352211E GT PUSH2 0x97 JUMPI DUP1 PUSH4 0xB88D4FDE GT PUSH2 0x66 JUMPI DUP1 PUSH4 0xB88D4FDE EQ PUSH2 0x1FF JUMPI DUP1 PUSH4 0xC87B56DD EQ PUSH2 0x212 JUMPI DUP1 PUSH4 0xD082E381 EQ PUSH2 0x225 JUMPI DUP1 PUSH4 0xE985E9C5 EQ PUSH2 0x22E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x6352211E EQ PUSH2 0x1BE JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0x1D1 JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x1E4 JUMPI DUP1 PUSH4 0xA22CB465 EQ PUSH2 0x1EC JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x95EA7B3 GT PUSH2 0xD3 JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0x162 JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0x177 JUMPI DUP1 PUSH4 0x31F1F3C3 EQ PUSH2 0x18A JUMPI DUP1 PUSH4 0x42842E0E EQ PUSH2 0x1AB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x1FFC9A7 EQ PUSH2 0xFA JUMPI DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0x122 JUMPI DUP1 PUSH4 0x81812FC EQ PUSH2 0x137 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x10D PUSH2 0x108 CALLDATASIZE PUSH1 0x4 PUSH2 0x11DD JUMP JUMPDEST PUSH2 0x26A JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x12A PUSH2 0x2BC JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x119 SWAP2 SWAP1 PUSH2 0x1252 JUMP JUMPDEST PUSH2 0x14A PUSH2 0x145 CALLDATASIZE PUSH1 0x4 PUSH2 0x1265 JUMP JUMPDEST PUSH2 0x34E JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0x119 JUMP JUMPDEST PUSH2 0x175 PUSH2 0x170 CALLDATASIZE PUSH1 0x4 PUSH2 0x129A JUMP JUMPDEST PUSH2 0x3DB JUMP JUMPDEST STOP JUMPDEST PUSH2 0x175 PUSH2 0x185 CALLDATASIZE PUSH1 0x4 PUSH2 0x12C4 JUMP JUMPDEST PUSH2 0x4F1 JUMP JUMPDEST PUSH2 0x19D PUSH2 0x198 CALLDATASIZE PUSH1 0x4 PUSH2 0x138C JUMP JUMPDEST PUSH2 0x522 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0x119 JUMP JUMPDEST PUSH2 0x175 PUSH2 0x1B9 CALLDATASIZE PUSH1 0x4 PUSH2 0x12C4 JUMP JUMPDEST PUSH2 0x553 JUMP JUMPDEST PUSH2 0x14A PUSH2 0x1CC CALLDATASIZE PUSH1 0x4 PUSH2 0x1265 JUMP JUMPDEST PUSH2 0x56E JUMP JUMPDEST PUSH2 0x19D PUSH2 0x1DF CALLDATASIZE PUSH1 0x4 PUSH2 0x13D5 JUMP JUMPDEST PUSH2 0x5E5 JUMP JUMPDEST PUSH2 0x12A PUSH2 0x66C JUMP JUMPDEST PUSH2 0x175 PUSH2 0x1FA CALLDATASIZE PUSH1 0x4 PUSH2 0x13F0 JUMP JUMPDEST PUSH2 0x67B JUMP JUMPDEST PUSH2 0x175 PUSH2 0x20D CALLDATASIZE PUSH1 0x4 PUSH2 0x142C JUMP JUMPDEST PUSH2 0x68A JUMP JUMPDEST PUSH2 0x12A PUSH2 0x220 CALLDATASIZE PUSH1 0x4 PUSH2 0x1265 JUMP JUMPDEST PUSH2 0x6C2 JUMP JUMPDEST PUSH2 0x19D PUSH1 0x7 SLOAD DUP2 JUMP JUMPDEST PUSH2 0x10D PUSH2 0x23C CALLDATASIZE PUSH1 0x4 PUSH2 0x14A8 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP2 DUP3 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP4 SWAP1 SWAP5 AND DUP3 MSTORE SWAP2 SWAP1 SWAP2 MSTORE KECCAK256 SLOAD PUSH1 0xFF AND SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x1 PUSH1 0xE0 SHL SUB NOT DUP3 AND PUSH4 0x80AC58CD PUSH1 0xE0 SHL EQ DUP1 PUSH2 0x29B JUMPI POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xE0 SHL SUB NOT DUP3 AND PUSH4 0x5B5E139F PUSH1 0xE0 SHL EQ JUMPDEST DUP1 PUSH2 0x2B6 JUMPI POP PUSH4 0x1FFC9A7 PUSH1 0xE0 SHL PUSH1 0x1 PUSH1 0x1 PUSH1 0xE0 SHL SUB NOT DUP4 AND EQ JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x60 PUSH1 0x0 DUP1 SLOAD PUSH2 0x2CB SWAP1 PUSH2 0x14DB JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x2F7 SWAP1 PUSH2 0x14DB JUMP JUMPDEST DUP1 ISZERO PUSH2 0x344 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x319 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x344 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x327 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x359 DUP3 PUSH2 0x839 JUMP JUMPDEST PUSH2 0x3BF JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x2C PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A20617070726F76656420717565727920666F72206E6F6E6578 PUSH1 0x44 DUP3 ADD MSTORE PUSH12 0x34B9BA32B73A103A37B5B2B7 PUSH1 0xA1 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST POP PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x4 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x3E6 DUP3 PUSH2 0x56E JUMP JUMPDEST SWAP1 POP DUP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP4 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND EQ ISZERO PUSH2 0x454 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x21 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A20617070726F76616C20746F2063757272656E74206F776E65 PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x39 PUSH1 0xF9 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x3B6 JUMP JUMPDEST CALLER PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND EQ DUP1 PUSH2 0x470 JUMPI POP PUSH2 0x470 DUP2 CALLER PUSH2 0x23C JUMP JUMPDEST PUSH2 0x4E2 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x38 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A20617070726F76652063616C6C6572206973206E6F74206F77 PUSH1 0x44 DUP3 ADD MSTORE PUSH32 0x6E6572206E6F7220617070726F76656420666F7220616C6C0000000000000000 PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x3B6 JUMP JUMPDEST PUSH2 0x4EC DUP4 DUP4 PUSH2 0x856 JUMP JUMPDEST POP POP POP JUMP JUMPDEST PUSH2 0x4FB CALLER DUP3 PUSH2 0x8C4 JUMP JUMPDEST PUSH2 0x517 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x3B6 SWAP1 PUSH2 0x1516 JUMP JUMPDEST PUSH2 0x4EC DUP4 DUP4 DUP4 PUSH2 0x9AA JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH1 0x0 SWAP1 PUSH2 0x532 CALLER DUP3 PUSH2 0xB4A JUMP JUMPDEST PUSH2 0x53C DUP2 DUP5 PUSH2 0xB64 JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH2 0x54A SWAP1 PUSH1 0x1 PUSH2 0x157D JUMP JUMPDEST PUSH1 0x7 SSTORE SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0x4EC DUP4 DUP4 DUP4 PUSH1 0x40 MLOAD DUP1 PUSH1 0x20 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x0 DUP2 MSTORE POP PUSH2 0x68A JUMP JUMPDEST PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP1 PUSH2 0x2B6 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x29 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A206F776E657220717565727920666F72206E6F6E6578697374 PUSH1 0x44 DUP3 ADD MSTORE PUSH9 0x32B73A103A37B5B2B7 PUSH1 0xB9 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x3B6 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH2 0x650 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x2A PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A2062616C616E636520717565727920666F7220746865207A65 PUSH1 0x44 DUP3 ADD MSTORE PUSH10 0x726F2061646472657373 PUSH1 0xB0 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x3B6 JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x3 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD SWAP1 JUMP JUMPDEST PUSH1 0x60 PUSH1 0x1 DUP1 SLOAD PUSH2 0x2CB SWAP1 PUSH2 0x14DB JUMP JUMPDEST PUSH2 0x686 CALLER DUP4 DUP4 PUSH2 0xBEF JUMP JUMPDEST POP POP JUMP JUMPDEST PUSH2 0x694 CALLER DUP4 PUSH2 0x8C4 JUMP JUMPDEST PUSH2 0x6B0 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x3B6 SWAP1 PUSH2 0x1516 JUMP JUMPDEST PUSH2 0x6BC DUP5 DUP5 DUP5 DUP5 PUSH2 0xCBE JUMP JUMPDEST POP POP POP POP JUMP JUMPDEST PUSH1 0x60 PUSH2 0x6CD DUP3 PUSH2 0x839 JUMP JUMPDEST PUSH2 0x733 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x31 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524337323155524953746F726167653A2055524920717565727920666F7220 PUSH1 0x44 DUP3 ADD MSTORE PUSH17 0x3737B732BC34B9BA32B73A103A37B5B2B7 PUSH1 0x79 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x3B6 JUMP JUMPDEST PUSH1 0x0 DUP3 DUP2 MSTORE PUSH1 0x6 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 DUP1 SLOAD PUSH2 0x74C SWAP1 PUSH2 0x14DB JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x778 SWAP1 PUSH2 0x14DB JUMP JUMPDEST DUP1 ISZERO PUSH2 0x7C5 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x79A JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x7C5 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x7A8 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP PUSH1 0x0 PUSH2 0x7E3 PUSH1 0x40 DUP1 MLOAD PUSH1 0x20 DUP2 ADD SWAP1 SWAP2 MSTORE PUSH1 0x0 DUP2 MSTORE SWAP1 JUMP JUMPDEST SWAP1 POP DUP1 MLOAD PUSH1 0x0 EQ ISZERO PUSH2 0x7F6 JUMPI POP SWAP3 SWAP2 POP POP JUMP JUMPDEST DUP2 MLOAD ISZERO PUSH2 0x828 JUMPI DUP1 DUP3 PUSH1 0x40 MLOAD PUSH1 0x20 ADD PUSH2 0x810 SWAP3 SWAP2 SWAP1 PUSH2 0x1595 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x20 DUP2 DUP4 SUB SUB DUP2 MSTORE SWAP1 PUSH1 0x40 MSTORE SWAP3 POP POP POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0x831 DUP5 PUSH2 0xCF1 JUMP JUMPDEST SWAP5 SWAP4 POP POP POP POP JUMP JUMPDEST PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND ISZERO ISZERO SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x4 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP5 AND SWAP1 DUP2 OR SWAP1 SWAP2 SSTORE DUP2 SWAP1 PUSH2 0x88B DUP3 PUSH2 0x56E JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x40 MLOAD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG4 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x8CF DUP3 PUSH2 0x839 JUMP JUMPDEST PUSH2 0x930 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x2C PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A206F70657261746F7220717565727920666F72206E6F6E6578 PUSH1 0x44 DUP3 ADD MSTORE PUSH12 0x34B9BA32B73A103A37B5B2B7 PUSH1 0xA1 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x3B6 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x93B DUP4 PUSH2 0x56E JUMP JUMPDEST SWAP1 POP DUP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP5 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND EQ DUP1 PUSH2 0x976 JUMPI POP DUP4 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH2 0x96B DUP5 PUSH2 0x34E JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND EQ JUMPDEST DUP1 PUSH2 0x831 JUMPI POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP1 DUP3 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP4 DUP9 AND DUP4 MSTORE SWAP3 SWAP1 MSTORE KECCAK256 SLOAD PUSH1 0xFF AND PUSH2 0x831 JUMP JUMPDEST DUP3 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH2 0x9BD DUP3 PUSH2 0x56E JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND EQ PUSH2 0xA25 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x29 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A207472616E73666572206F6620746F6B656E20746861742069 PUSH1 0x44 DUP3 ADD MSTORE PUSH9 0x39903737BA1037BBB7 PUSH1 0xB9 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x3B6 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH2 0xA87 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 DUP1 DUP3 ADD MSTORE PUSH32 0x4552433732313A207472616E7366657220746F20746865207A65726F20616464 PUSH1 0x44 DUP3 ADD MSTORE PUSH4 0x72657373 PUSH1 0xE0 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x3B6 JUMP JUMPDEST PUSH2 0xA92 PUSH1 0x0 DUP3 PUSH2 0x856 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x3 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 DUP1 SLOAD PUSH1 0x1 SWAP3 SWAP1 PUSH2 0xABB SWAP1 DUP5 SWAP1 PUSH2 0x15C4 JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x3 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 DUP1 SLOAD PUSH1 0x1 SWAP3 SWAP1 PUSH2 0xAE9 SWAP1 DUP5 SWAP1 PUSH2 0x157D JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 MSTORE PUSH1 0x40 DUP1 DUP3 KECCAK256 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP7 DUP2 AND SWAP2 DUP3 OR SWAP1 SWAP3 SSTORE SWAP2 MLOAD DUP5 SWAP4 SWAP2 DUP8 AND SWAP2 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP2 LOG4 POP POP POP JUMP JUMPDEST PUSH2 0x686 DUP3 DUP3 PUSH1 0x40 MLOAD DUP1 PUSH1 0x20 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x0 DUP2 MSTORE POP PUSH2 0xDC9 JUMP JUMPDEST PUSH2 0xB6D DUP3 PUSH2 0x839 JUMP JUMPDEST PUSH2 0xBD0 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x2E PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x45524337323155524953746F726167653A2055524920736574206F66206E6F6E PUSH1 0x44 DUP3 ADD MSTORE PUSH14 0x32BC34B9BA32B73A103A37B5B2B7 PUSH1 0x91 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x3B6 JUMP JUMPDEST PUSH1 0x0 DUP3 DUP2 MSTORE PUSH1 0x6 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 SWAP1 SWAP2 KECCAK256 DUP3 MLOAD PUSH2 0x4EC SWAP3 DUP5 ADD SWAP1 PUSH2 0x112B JUMP JUMPDEST DUP2 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP4 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND EQ ISZERO PUSH2 0xC51 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x19 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A20617070726F766520746F2063616C6C657200000000000000 PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x3B6 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 DUP2 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP5 DUP8 AND DUP1 DUP5 MSTORE SWAP5 DUP3 MSTORE SWAP2 DUP3 SWAP1 KECCAK256 DUP1 SLOAD PUSH1 0xFF NOT AND DUP7 ISZERO ISZERO SWAP1 DUP2 OR SWAP1 SWAP2 SSTORE SWAP2 MLOAD SWAP2 DUP3 MSTORE PUSH32 0x17307EAB39AB6107E8899845AD3D59BD9653F200F220920489CA2B5937696C31 SWAP2 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH2 0xCC9 DUP5 DUP5 DUP5 PUSH2 0x9AA JUMP JUMPDEST PUSH2 0xCD5 DUP5 DUP5 DUP5 DUP5 PUSH2 0xDFC JUMP JUMPDEST PUSH2 0x6BC JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x3B6 SWAP1 PUSH2 0x15DB JUMP JUMPDEST PUSH1 0x60 PUSH2 0xCFC DUP3 PUSH2 0x839 JUMP JUMPDEST PUSH2 0xD60 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x2F PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732314D657461646174613A2055524920717565727920666F72206E6F PUSH1 0x44 DUP3 ADD MSTORE PUSH15 0x3732BC34B9BA32B73A103A37B5B2B7 PUSH1 0x89 SHL PUSH1 0x64 DUP3 ADD MSTORE PUSH1 0x84 ADD PUSH2 0x3B6 JUMP JUMPDEST PUSH1 0x0 PUSH2 0xD77 PUSH1 0x40 DUP1 MLOAD PUSH1 0x20 DUP2 ADD SWAP1 SWAP2 MSTORE PUSH1 0x0 DUP2 MSTORE SWAP1 JUMP JUMPDEST SWAP1 POP PUSH1 0x0 DUP2 MLOAD GT PUSH2 0xD97 JUMPI PUSH1 0x40 MLOAD DUP1 PUSH1 0x20 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x0 DUP2 MSTORE POP PUSH2 0xDC2 JUMP JUMPDEST DUP1 PUSH2 0xDA1 DUP5 PUSH2 0xEFA JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x20 ADD PUSH2 0xDB2 SWAP3 SWAP2 SWAP1 PUSH2 0x1595 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x20 DUP2 DUP4 SUB SUB DUP2 MSTORE SWAP1 PUSH1 0x40 MSTORE JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH2 0xDD3 DUP4 DUP4 PUSH2 0xFF8 JUMP JUMPDEST PUSH2 0xDE0 PUSH1 0x0 DUP5 DUP5 DUP5 PUSH2 0xDFC JUMP JUMPDEST PUSH2 0x4EC JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x3B6 SWAP1 PUSH2 0x15DB JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP5 AND EXTCODESIZE ISZERO PUSH2 0xEEF JUMPI PUSH1 0x40 MLOAD PUSH4 0xA85BD01 PUSH1 0xE1 SHL DUP2 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP6 AND SWAP1 PUSH4 0x150B7A02 SWAP1 PUSH2 0xE40 SWAP1 CALLER SWAP1 DUP10 SWAP1 DUP9 SWAP1 DUP9 SWAP1 PUSH1 0x4 ADD PUSH2 0x162D JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 GAS CALL SWAP3 POP POP POP DUP1 ISZERO PUSH2 0xE7B JUMPI POP PUSH1 0x40 DUP1 MLOAD PUSH1 0x1F RETURNDATASIZE SWAP1 DUP2 ADD PUSH1 0x1F NOT AND DUP3 ADD SWAP1 SWAP3 MSTORE PUSH2 0xE78 SWAP2 DUP2 ADD SWAP1 PUSH2 0x166A JUMP JUMPDEST PUSH1 0x1 JUMPDEST PUSH2 0xED5 JUMPI RETURNDATASIZE DUP1 DUP1 ISZERO PUSH2 0xEA9 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0xEAE JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP DUP1 MLOAD PUSH2 0xECD JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x3B6 SWAP1 PUSH2 0x15DB JUMP JUMPDEST DUP1 MLOAD DUP2 PUSH1 0x20 ADD REVERT JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xE0 SHL SUB NOT AND PUSH4 0xA85BD01 PUSH1 0xE1 SHL EQ SWAP1 POP PUSH2 0x831 JUMP JUMPDEST POP PUSH1 0x1 SWAP5 SWAP4 POP POP POP POP JUMP JUMPDEST PUSH1 0x60 DUP2 PUSH2 0xF1E JUMPI POP POP PUSH1 0x40 DUP1 MLOAD DUP1 DUP3 ADD SWAP1 SWAP2 MSTORE PUSH1 0x1 DUP2 MSTORE PUSH1 0x3 PUSH1 0xFC SHL PUSH1 0x20 DUP3 ADD MSTORE SWAP1 JUMP JUMPDEST DUP2 PUSH1 0x0 JUMPDEST DUP2 ISZERO PUSH2 0xF48 JUMPI DUP1 PUSH2 0xF32 DUP2 PUSH2 0x1687 JUMP JUMPDEST SWAP2 POP PUSH2 0xF41 SWAP1 POP PUSH1 0xA DUP4 PUSH2 0x16B8 JUMP JUMPDEST SWAP2 POP PUSH2 0xF22 JUMP JUMPDEST PUSH1 0x0 DUP2 PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0xF63 JUMPI PUSH2 0xF63 PUSH2 0x1300 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP1 DUP3 MSTORE DUP1 PUSH1 0x1F ADD PUSH1 0x1F NOT AND PUSH1 0x20 ADD DUP3 ADD PUSH1 0x40 MSTORE DUP1 ISZERO PUSH2 0xF8D JUMPI PUSH1 0x20 DUP3 ADD DUP2 DUP1 CALLDATASIZE DUP4 CALLDATACOPY ADD SWAP1 POP JUMPDEST POP SWAP1 POP JUMPDEST DUP5 ISZERO PUSH2 0x831 JUMPI PUSH2 0xFA2 PUSH1 0x1 DUP4 PUSH2 0x15C4 JUMP JUMPDEST SWAP2 POP PUSH2 0xFAF PUSH1 0xA DUP7 PUSH2 0x16CC JUMP JUMPDEST PUSH2 0xFBA SWAP1 PUSH1 0x30 PUSH2 0x157D JUMP JUMPDEST PUSH1 0xF8 SHL DUP2 DUP4 DUP2 MLOAD DUP2 LT PUSH2 0xFCF JUMPI PUSH2 0xFCF PUSH2 0x16E0 JUMP JUMPDEST PUSH1 0x20 ADD ADD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xF8 SHL SUB NOT AND SWAP1 DUP2 PUSH1 0x0 BYTE SWAP1 MSTORE8 POP PUSH2 0xFF1 PUSH1 0xA DUP7 PUSH2 0x16B8 JUMP JUMPDEST SWAP5 POP PUSH2 0xF91 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH2 0x104E JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD DUP2 SWAP1 MSTORE PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A206D696E7420746F20746865207A65726F2061646472657373 PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x3B6 JUMP JUMPDEST PUSH2 0x1057 DUP2 PUSH2 0x839 JUMP JUMPDEST ISZERO PUSH2 0x10A4 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x1C PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x4552433732313A20746F6B656E20616C7265616479206D696E74656400000000 PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD PUSH2 0x3B6 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x3 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 DUP1 SLOAD PUSH1 0x1 SWAP3 SWAP1 PUSH2 0x10CD SWAP1 DUP5 SWAP1 PUSH2 0x157D JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 MSTORE PUSH1 0x40 DUP1 DUP3 KECCAK256 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP7 AND SWAP1 DUP2 OR SWAP1 SWAP2 SSTORE SWAP1 MLOAD DUP4 SWAP3 SWAP1 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP1 DUP3 SWAP1 LOG4 POP POP JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH2 0x1137 SWAP1 PUSH2 0x14DB JUMP JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH2 0x1159 JUMPI PUSH1 0x0 DUP6 SSTORE PUSH2 0x119F JUMP JUMPDEST DUP3 PUSH1 0x1F LT PUSH2 0x1172 JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH2 0x119F JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH2 0x119F JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH2 0x119F JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH2 0x1184 JUMP JUMPDEST POP PUSH2 0x11AB SWAP3 SWAP2 POP PUSH2 0x11AF JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST JUMPDEST DUP1 DUP3 GT ISZERO PUSH2 0x11AB JUMPI PUSH1 0x0 DUP2 SSTORE PUSH1 0x1 ADD PUSH2 0x11B0 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xE0 SHL SUB NOT DUP2 AND DUP2 EQ PUSH2 0x11DA JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x11EF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 CALLDATALOAD PUSH2 0xDC2 DUP2 PUSH2 0x11C4 JUMP JUMPDEST PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x1215 JUMPI DUP2 DUP2 ADD MLOAD DUP4 DUP3 ADD MSTORE PUSH1 0x20 ADD PUSH2 0x11FD JUMP JUMPDEST DUP4 DUP2 GT ISZERO PUSH2 0x6BC JUMPI POP POP PUSH1 0x0 SWAP2 ADD MSTORE JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD DUP1 DUP5 MSTORE PUSH2 0x123E DUP2 PUSH1 0x20 DUP7 ADD PUSH1 0x20 DUP7 ADD PUSH2 0x11FA JUMP JUMPDEST PUSH1 0x1F ADD PUSH1 0x1F NOT AND SWAP3 SWAP1 SWAP3 ADD PUSH1 0x20 ADD SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x20 DUP2 MSTORE PUSH1 0x0 PUSH2 0xDC2 PUSH1 0x20 DUP4 ADD DUP5 PUSH2 0x1226 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x1277 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD SWAP2 SWAP1 POP JUMP JUMPDEST DUP1 CALLDATALOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 EQ PUSH2 0x1295 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x12AD JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x12B6 DUP4 PUSH2 0x127E JUMP JUMPDEST SWAP5 PUSH1 0x20 SWAP4 SWAP1 SWAP4 ADD CALLDATALOAD SWAP4 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0x60 DUP5 DUP7 SUB SLT ISZERO PUSH2 0x12D9 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x12E2 DUP5 PUSH2 0x127E JUMP JUMPDEST SWAP3 POP PUSH2 0x12F0 PUSH1 0x20 DUP6 ADD PUSH2 0x127E JUMP JUMPDEST SWAP2 POP PUSH1 0x40 DUP5 ADD CALLDATALOAD SWAP1 POP SWAP3 POP SWAP3 POP SWAP3 JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 PUSH8 0xFFFFFFFFFFFFFFFF DUP1 DUP5 GT ISZERO PUSH2 0x1331 JUMPI PUSH2 0x1331 PUSH2 0x1300 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x1F DUP6 ADD PUSH1 0x1F NOT SWAP1 DUP2 AND PUSH1 0x3F ADD AND DUP2 ADD SWAP1 DUP3 DUP3 GT DUP2 DUP4 LT OR ISZERO PUSH2 0x1359 JUMPI PUSH2 0x1359 PUSH2 0x1300 JUMP JUMPDEST DUP2 PUSH1 0x40 MSTORE DUP1 SWAP4 POP DUP6 DUP2 MSTORE DUP7 DUP7 DUP7 ADD GT ISZERO PUSH2 0x1372 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP6 DUP6 PUSH1 0x20 DUP4 ADD CALLDATACOPY PUSH1 0x0 PUSH1 0x20 DUP8 DUP4 ADD ADD MSTORE POP POP POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x139E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0x13B5 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP3 ADD PUSH1 0x1F DUP2 ADD DUP5 SGT PUSH2 0x13C6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x831 DUP5 DUP3 CALLDATALOAD PUSH1 0x20 DUP5 ADD PUSH2 0x1316 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x13E7 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xDC2 DUP3 PUSH2 0x127E JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x1403 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x140C DUP4 PUSH2 0x127E JUMP JUMPDEST SWAP2 POP PUSH1 0x20 DUP4 ADD CALLDATALOAD DUP1 ISZERO ISZERO DUP2 EQ PUSH2 0x1421 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 SWAP2 POP POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP1 PUSH1 0x80 DUP6 DUP8 SUB SLT ISZERO PUSH2 0x1442 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x144B DUP6 PUSH2 0x127E JUMP JUMPDEST SWAP4 POP PUSH2 0x1459 PUSH1 0x20 DUP7 ADD PUSH2 0x127E JUMP JUMPDEST SWAP3 POP PUSH1 0x40 DUP6 ADD CALLDATALOAD SWAP2 POP PUSH1 0x60 DUP6 ADD CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0x147C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP6 ADD PUSH1 0x1F DUP2 ADD DUP8 SGT PUSH2 0x148D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x149C DUP8 DUP3 CALLDATALOAD PUSH1 0x20 DUP5 ADD PUSH2 0x1316 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP6 SWAP2 SWAP5 POP SWAP3 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x14BB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x14C4 DUP4 PUSH2 0x127E JUMP JUMPDEST SWAP2 POP PUSH2 0x14D2 PUSH1 0x20 DUP5 ADD PUSH2 0x127E JUMP JUMPDEST SWAP1 POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x1 DUP2 DUP2 SHR SWAP1 DUP3 AND DUP1 PUSH2 0x14EF JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH2 0x1510 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x20 DUP1 DUP3 MSTORE PUSH1 0x31 SWAP1 DUP3 ADD MSTORE PUSH32 0x4552433732313A207472616E736665722063616C6C6572206973206E6F74206F PUSH1 0x40 DUP3 ADD MSTORE PUSH17 0x1DDB995C881B9BDC88185C1C1C9BDD9959 PUSH1 0x7A SHL PUSH1 0x60 DUP3 ADD MSTORE PUSH1 0x80 ADD SWAP1 JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP3 NOT DUP3 GT ISZERO PUSH2 0x1590 JUMPI PUSH2 0x1590 PUSH2 0x1567 JUMP JUMPDEST POP ADD SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP4 MLOAD PUSH2 0x15A7 DUP2 DUP5 PUSH1 0x20 DUP9 ADD PUSH2 0x11FA JUMP JUMPDEST DUP4 MLOAD SWAP1 DUP4 ADD SWAP1 PUSH2 0x15BB DUP2 DUP4 PUSH1 0x20 DUP9 ADD PUSH2 0x11FA JUMP JUMPDEST ADD SWAP5 SWAP4 POP POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 LT ISZERO PUSH2 0x15D6 JUMPI PUSH2 0x15D6 PUSH2 0x1567 JUMP JUMPDEST POP SUB SWAP1 JUMP JUMPDEST PUSH1 0x20 DUP1 DUP3 MSTORE PUSH1 0x32 SWAP1 DUP3 ADD MSTORE PUSH32 0x4552433732313A207472616E7366657220746F206E6F6E204552433732315265 PUSH1 0x40 DUP3 ADD MSTORE PUSH18 0x31B2B4BB32B91034B6B83632B6B2B73A32B9 PUSH1 0x71 SHL PUSH1 0x60 DUP3 ADD MSTORE PUSH1 0x80 ADD SWAP1 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP6 DUP2 AND DUP3 MSTORE DUP5 AND PUSH1 0x20 DUP3 ADD MSTORE PUSH1 0x40 DUP2 ADD DUP4 SWAP1 MSTORE PUSH1 0x80 PUSH1 0x60 DUP3 ADD DUP2 SWAP1 MSTORE PUSH1 0x0 SWAP1 PUSH2 0x1660 SWAP1 DUP4 ADD DUP5 PUSH2 0x1226 JUMP JUMPDEST SWAP7 SWAP6 POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x167C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 MLOAD PUSH2 0xDC2 DUP2 PUSH2 0x11C4 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x0 NOT DUP3 EQ ISZERO PUSH2 0x169B JUMPI PUSH2 0x169B PUSH2 0x1567 JUMP JUMPDEST POP PUSH1 0x1 ADD SWAP1 JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x12 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP3 PUSH2 0x16C7 JUMPI PUSH2 0x16C7 PUSH2 0x16A2 JUMP JUMPDEST POP DIV SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH2 0x16DB JUMPI PUSH2 0x16DB PUSH2 0x16A2 JUMP JUMPDEST POP MOD SWAP1 JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x32 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xDB 0xDD PUSH20 0xA9D7444BF9D5E113E085E2EB2E159DEFAF2B61C 0xAC EXTCODESIZE LOG4 PUSH30 0xD1D547005464736F6C634300080A00330000000000000000000000000000 ",
  pcMap: {
    0: {
      offset: [137, 664],
      op: "PUSH1",
      path: "10",
      value: "0x80",
    },
    2: {
      fn: null,
      offset: [137, 664],
      op: "PUSH1",
      path: "10",
      value: "0x40",
    },
    4: {
      fn: null,
      offset: [137, 664],
      op: "MSTORE",
      path: "10",
    },
    5: {
      fn: null,
      offset: [137, 664],
      op: "CALLVALUE",
      path: "10",
    },
    6: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    7: {
      fn: null,
      offset: [137, 664],
      op: "ISZERO",
      path: "10",
    },
    8: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x10",
    },
    11: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    12: {
      fn: null,
      offset: [137, 664],
      op: "PUSH1",
      path: "10",
      value: "0x0",
    },
    14: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    15: {
      dev: "Cannot send ether to nonpayable function",
      fn: null,
      offset: [137, 664],
      op: "REVERT",
      path: "10",
    },
    16: {
      fn: null,
      offset: [137, 664],
      op: "JUMPDEST",
      path: "10",
    },
    17: {
      fn: null,
      offset: [137, 664],
      op: "POP",
      path: "10",
    },
    18: {
      fn: null,
      offset: [137, 664],
      op: "PUSH1",
      path: "10",
      value: "0x4",
    },
    20: {
      fn: null,
      offset: [137, 664],
      op: "CALLDATASIZE",
      path: "10",
    },
    21: {
      fn: null,
      offset: [137, 664],
      op: "LT",
      path: "10",
    },
    22: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0xF5",
    },
    25: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    26: {
      fn: null,
      offset: [137, 664],
      op: "PUSH1",
      path: "10",
      value: "0x0",
    },
    28: {
      fn: null,
      offset: [137, 664],
      op: "CALLDATALOAD",
      path: "10",
    },
    29: {
      fn: null,
      offset: [137, 664],
      op: "PUSH1",
      path: "10",
      value: "0xE0",
    },
    31: {
      fn: null,
      offset: [137, 664],
      op: "SHR",
      path: "10",
    },
    32: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    33: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0x6352211E",
    },
    38: {
      fn: null,
      offset: [137, 664],
      op: "GT",
      path: "10",
    },
    39: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x97",
    },
    42: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    43: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    44: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0xB88D4FDE",
    },
    49: {
      fn: null,
      offset: [137, 664],
      op: "GT",
      path: "10",
    },
    50: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x66",
    },
    53: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    54: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    55: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0xB88D4FDE",
    },
    60: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    61: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x1FF",
    },
    64: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    65: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    66: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0xC87B56DD",
    },
    71: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    72: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x212",
    },
    75: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    76: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    77: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0xD082E381",
    },
    82: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    83: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x225",
    },
    86: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    87: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    88: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0xE985E9C5",
    },
    93: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    94: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x22E",
    },
    97: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    98: {
      fn: null,
      offset: [137, 664],
      op: "PUSH1",
      path: "10",
      value: "0x0",
    },
    100: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    101: {
      fn: null,
      offset: [137, 664],
      op: "REVERT",
      path: "10",
    },
    102: {
      fn: null,
      offset: [137, 664],
      op: "JUMPDEST",
      path: "10",
    },
    103: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    104: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0x6352211E",
    },
    109: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    110: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x1BE",
    },
    113: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    114: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    115: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0x70A08231",
    },
    120: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    121: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x1D1",
    },
    124: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    125: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    126: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0x95D89B41",
    },
    131: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    132: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x1E4",
    },
    135: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    136: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    137: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0xA22CB465",
    },
    142: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    143: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x1EC",
    },
    146: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    147: {
      fn: null,
      offset: [137, 664],
      op: "PUSH1",
      path: "10",
      value: "0x0",
    },
    149: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    150: {
      fn: null,
      offset: [137, 664],
      op: "REVERT",
      path: "10",
    },
    151: {
      fn: null,
      offset: [137, 664],
      op: "JUMPDEST",
      path: "10",
    },
    152: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    153: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0x95EA7B3",
    },
    158: {
      fn: null,
      offset: [137, 664],
      op: "GT",
      path: "10",
    },
    159: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0xD3",
    },
    162: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    163: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    164: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0x95EA7B3",
    },
    169: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    170: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x162",
    },
    173: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    174: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    175: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0x23B872DD",
    },
    180: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    181: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x177",
    },
    184: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    185: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    186: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0x31F1F3C3",
    },
    191: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    192: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x18A",
    },
    195: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    196: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    197: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0x42842E0E",
    },
    202: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    203: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x1AB",
    },
    206: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    207: {
      fn: null,
      offset: [137, 664],
      op: "PUSH1",
      path: "10",
      value: "0x0",
    },
    209: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    210: {
      fn: null,
      offset: [137, 664],
      op: "REVERT",
      path: "10",
    },
    211: {
      fn: null,
      offset: [137, 664],
      op: "JUMPDEST",
      path: "10",
    },
    212: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    213: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0x1FFC9A7",
    },
    218: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    219: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0xFA",
    },
    222: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    223: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    224: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0x6FDDE03",
    },
    229: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    230: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x122",
    },
    233: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    234: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    235: {
      fn: null,
      offset: [137, 664],
      op: "PUSH4",
      path: "10",
      value: "0x81812FC",
    },
    240: {
      fn: null,
      offset: [137, 664],
      op: "EQ",
      path: "10",
    },
    241: {
      fn: null,
      offset: [137, 664],
      op: "PUSH2",
      path: "10",
      value: "0x137",
    },
    244: {
      fn: null,
      offset: [137, 664],
      op: "JUMPI",
      path: "10",
    },
    245: {
      fn: null,
      offset: [137, 664],
      op: "JUMPDEST",
      path: "10",
    },
    246: {
      fn: null,
      offset: [137, 664],
      op: "PUSH1",
      path: "10",
      value: "0x0",
    },
    248: {
      fn: null,
      offset: [137, 664],
      op: "DUP1",
      path: "10",
    },
    249: {
      first_revert: true,
      fn: null,
      offset: [137, 664],
      op: "REVERT",
      path: "10",
    },
    250: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "JUMPDEST",
      path: "0",
    },
    251: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "PUSH2",
      path: "0",
      value: "0x10D",
    },
    254: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "PUSH2",
      path: "0",
      value: "0x108",
    },
    257: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "CALLDATASIZE",
      path: "0",
    },
    258: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    260: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "PUSH2",
      path: "0",
      value: "0x11DD",
    },
    263: {
      fn: "ERC721.supportsInterface",
      jump: "i",
      offset: [1555, 1855],
      op: "JUMP",
      path: "0",
    },
    264: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "JUMPDEST",
      path: "0",
    },
    265: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "PUSH2",
      path: "0",
      value: "0x26A",
    },
    268: {
      fn: "ERC721.supportsInterface",
      jump: "i",
      offset: [1555, 1855],
      op: "JUMP",
      path: "0",
    },
    269: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "JUMPDEST",
      path: "0",
    },
    270: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    272: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "MLOAD",
      path: "0",
    },
    273: {
      op: "SWAP1",
    },
    274: {
      op: "ISZERO",
    },
    275: {
      op: "ISZERO",
    },
    276: {
      op: "DUP2",
    },
    277: {
      op: "MSTORE",
    },
    278: {
      op: "PUSH1",
      value: "0x20",
    },
    280: {
      op: "ADD",
    },
    281: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "JUMPDEST",
      path: "0",
    },
    282: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    284: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "MLOAD",
      path: "0",
    },
    285: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "DUP1",
      path: "0",
    },
    286: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "SWAP2",
      path: "0",
    },
    287: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "SUB",
      path: "0",
    },
    288: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "SWAP1",
      path: "0",
    },
    289: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "RETURN",
      path: "0",
    },
    290: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "JUMPDEST",
      path: "0",
    },
    291: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "PUSH2",
      path: "0",
      value: "0x12A",
    },
    294: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "PUSH2",
      path: "0",
      value: "0x2BC",
    },
    297: {
      fn: "ERC721.name",
      jump: "i",
      offset: [2473, 2571],
      op: "JUMP",
      path: "0",
    },
    298: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "JUMPDEST",
      path: "0",
    },
    299: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    301: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "MLOAD",
      path: "0",
    },
    302: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "PUSH2",
      path: "0",
      value: "0x119",
    },
    305: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "SWAP2",
      path: "0",
    },
    306: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "SWAP1",
      path: "0",
    },
    307: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "PUSH2",
      path: "0",
      value: "0x1252",
    },
    310: {
      fn: "ERC721.name",
      jump: "i",
      offset: [2473, 2571],
      op: "JUMP",
      path: "0",
    },
    311: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "JUMPDEST",
      path: "0",
    },
    312: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "PUSH2",
      path: "0",
      value: "0x14A",
    },
    315: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "PUSH2",
      path: "0",
      value: "0x145",
    },
    318: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "CALLDATASIZE",
      path: "0",
    },
    319: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    321: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "PUSH2",
      path: "0",
      value: "0x1265",
    },
    324: {
      fn: "ERC721.getApproved",
      jump: "i",
      offset: [3984, 4201],
      op: "JUMP",
      path: "0",
    },
    325: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "JUMPDEST",
      path: "0",
    },
    326: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "PUSH2",
      path: "0",
      value: "0x34E",
    },
    329: {
      fn: "ERC721.getApproved",
      jump: "i",
      offset: [3984, 4201],
      op: "JUMP",
      path: "0",
    },
    330: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "JUMPDEST",
      path: "0",
    },
    331: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    333: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "MLOAD",
      path: "0",
    },
    334: {
      op: "PUSH1",
      value: "0x1",
    },
    336: {
      op: "PUSH1",
      value: "0x1",
    },
    338: {
      op: "PUSH1",
      value: "0xA0",
    },
    340: {
      op: "SHL",
    },
    341: {
      op: "SUB",
    },
    342: {
      op: "SWAP1",
    },
    343: {
      op: "SWAP2",
    },
    344: {
      op: "AND",
    },
    345: {
      op: "DUP2",
    },
    346: {
      op: "MSTORE",
    },
    347: {
      op: "PUSH1",
      value: "0x20",
    },
    349: {
      op: "ADD",
    },
    350: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "PUSH2",
      path: "0",
      value: "0x119",
    },
    353: {
      op: "JUMP",
    },
    354: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "JUMPDEST",
      path: "0",
    },
    355: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "PUSH2",
      path: "0",
      value: "0x175",
    },
    358: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "PUSH2",
      path: "0",
      value: "0x170",
    },
    361: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "CALLDATASIZE",
      path: "0",
    },
    362: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    364: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "PUSH2",
      path: "0",
      value: "0x129A",
    },
    367: {
      fn: "ERC721.approve",
      jump: "i",
      offset: [3522, 3923],
      op: "JUMP",
      path: "0",
    },
    368: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "JUMPDEST",
      path: "0",
    },
    369: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "PUSH2",
      path: "0",
      value: "0x3DB",
    },
    372: {
      fn: "ERC721.approve",
      jump: "i",
      offset: [3522, 3923],
      op: "JUMP",
      path: "0",
    },
    373: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "JUMPDEST",
      path: "0",
    },
    374: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "STOP",
      path: "0",
    },
    375: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "JUMPDEST",
      path: "0",
    },
    376: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "PUSH2",
      path: "0",
      value: "0x175",
    },
    379: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "PUSH2",
      path: "0",
      value: "0x185",
    },
    382: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "CALLDATASIZE",
      path: "0",
    },
    383: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    385: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "PUSH2",
      path: "0",
      value: "0x12C4",
    },
    388: {
      fn: "ERC721.transferFrom",
      jump: "i",
      offset: [4711, 5041],
      op: "JUMP",
      path: "0",
    },
    389: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "JUMPDEST",
      path: "0",
    },
    390: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "PUSH2",
      path: "0",
      value: "0x4F1",
    },
    393: {
      fn: "ERC721.transferFrom",
      jump: "i",
      offset: [4711, 5041],
      op: "JUMP",
      path: "0",
    },
    394: {
      fn: "NFTCollection.createCollectible",
      offset: [380, 662],
      op: "JUMPDEST",
      path: "10",
    },
    395: {
      fn: "NFTCollection.createCollectible",
      offset: [380, 662],
      op: "PUSH2",
      path: "10",
      value: "0x19D",
    },
    398: {
      fn: "NFTCollection.createCollectible",
      offset: [380, 662],
      op: "PUSH2",
      path: "10",
      value: "0x198",
    },
    401: {
      fn: "NFTCollection.createCollectible",
      offset: [380, 662],
      op: "CALLDATASIZE",
      path: "10",
    },
    402: {
      fn: "NFTCollection.createCollectible",
      offset: [380, 662],
      op: "PUSH1",
      path: "10",
      value: "0x4",
    },
    404: {
      fn: "NFTCollection.createCollectible",
      offset: [380, 662],
      op: "PUSH2",
      path: "10",
      value: "0x138C",
    },
    407: {
      fn: "NFTCollection.createCollectible",
      jump: "i",
      offset: [380, 662],
      op: "JUMP",
      path: "10",
    },
    408: {
      fn: "NFTCollection.createCollectible",
      offset: [380, 662],
      op: "JUMPDEST",
      path: "10",
    },
    409: {
      fn: "NFTCollection.createCollectible",
      offset: [380, 662],
      op: "PUSH2",
      path: "10",
      value: "0x522",
    },
    412: {
      fn: "NFTCollection.createCollectible",
      jump: "i",
      offset: [380, 662],
      op: "JUMP",
      path: "10",
    },
    413: {
      fn: "NFTCollection.createCollectible",
      offset: [380, 662],
      op: "JUMPDEST",
      path: "10",
    },
    414: {
      fn: "NFTCollection.createCollectible",
      offset: [380, 662],
      op: "PUSH1",
      path: "10",
      value: "0x40",
    },
    416: {
      fn: "NFTCollection.createCollectible",
      offset: [380, 662],
      op: "MLOAD",
      path: "10",
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
      fn: "NFTCollection.createCollectible",
      offset: [380, 662],
      op: "PUSH2",
      path: "10",
      value: "0x119",
    },
    426: {
      op: "JUMP",
    },
    427: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "JUMPDEST",
      path: "0",
    },
    428: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "PUSH2",
      path: "0",
      value: "0x175",
    },
    431: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "PUSH2",
      path: "0",
      value: "0x1B9",
    },
    434: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "CALLDATASIZE",
      path: "0",
    },
    435: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    437: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "PUSH2",
      path: "0",
      value: "0x12C4",
    },
    440: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5107, 5286],
      op: "JUMP",
      path: "0",
    },
    441: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "JUMPDEST",
      path: "0",
    },
    442: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "PUSH2",
      path: "0",
      value: "0x553",
    },
    445: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5107, 5286],
      op: "JUMP",
      path: "0",
    },
    446: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "JUMPDEST",
      path: "0",
    },
    447: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "PUSH2",
      path: "0",
      value: "0x14A",
    },
    450: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "PUSH2",
      path: "0",
      value: "0x1CC",
    },
    453: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "CALLDATASIZE",
      path: "0",
    },
    454: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    456: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "PUSH2",
      path: "0",
      value: "0x1265",
    },
    459: {
      fn: "ERC721.ownerOf",
      jump: "i",
      offset: [2176, 2411],
      op: "JUMP",
      path: "0",
    },
    460: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "JUMPDEST",
      path: "0",
    },
    461: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "PUSH2",
      path: "0",
      value: "0x56E",
    },
    464: {
      fn: "ERC721.ownerOf",
      jump: "i",
      offset: [2176, 2411],
      op: "JUMP",
      path: "0",
    },
    465: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "JUMPDEST",
      path: "0",
    },
    466: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "PUSH2",
      path: "0",
      value: "0x19D",
    },
    469: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "PUSH2",
      path: "0",
      value: "0x1DF",
    },
    472: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "CALLDATASIZE",
      path: "0",
    },
    473: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    475: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "PUSH2",
      path: "0",
      value: "0x13D5",
    },
    478: {
      fn: "ERC721.balanceOf",
      jump: "i",
      offset: [1914, 2119],
      op: "JUMP",
      path: "0",
    },
    479: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "JUMPDEST",
      path: "0",
    },
    480: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "PUSH2",
      path: "0",
      value: "0x5E5",
    },
    483: {
      fn: "ERC721.balanceOf",
      jump: "i",
      offset: [1914, 2119],
      op: "JUMP",
      path: "0",
    },
    484: {
      fn: "ERC721.symbol",
      offset: [2635, 2737],
      op: "JUMPDEST",
      path: "0",
    },
    485: {
      fn: "ERC721.symbol",
      offset: [2635, 2737],
      op: "PUSH2",
      path: "0",
      value: "0x12A",
    },
    488: {
      fn: "ERC721.symbol",
      offset: [2635, 2737],
      op: "PUSH2",
      path: "0",
      value: "0x66C",
    },
    491: {
      fn: "ERC721.symbol",
      jump: "i",
      offset: [2635, 2737],
      op: "JUMP",
      path: "0",
    },
    492: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "JUMPDEST",
      path: "0",
    },
    493: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "PUSH2",
      path: "0",
      value: "0x175",
    },
    496: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "PUSH2",
      path: "0",
      value: "0x1FA",
    },
    499: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "CALLDATASIZE",
      path: "0",
    },
    500: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    502: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "PUSH2",
      path: "0",
      value: "0x13F0",
    },
    505: {
      fn: "ERC721.setApprovalForAll",
      jump: "i",
      offset: [4268, 4421],
      op: "JUMP",
      path: "0",
    },
    506: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "JUMPDEST",
      path: "0",
    },
    507: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "PUSH2",
      path: "0",
      value: "0x67B",
    },
    510: {
      fn: "ERC721.setApprovalForAll",
      jump: "i",
      offset: [4268, 4421],
      op: "JUMP",
      path: "0",
    },
    511: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "JUMPDEST",
      path: "0",
    },
    512: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "PUSH2",
      path: "0",
      value: "0x175",
    },
    515: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "PUSH2",
      path: "0",
      value: "0x20D",
    },
    518: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "CALLDATASIZE",
      path: "0",
    },
    519: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    521: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "PUSH2",
      path: "0",
      value: "0x142C",
    },
    524: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5352, 5672],
      op: "JUMP",
      path: "0",
    },
    525: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "JUMPDEST",
      path: "0",
    },
    526: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "PUSH2",
      path: "0",
      value: "0x68A",
    },
    529: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5352, 5672],
      op: "JUMP",
      path: "0",
    },
    530: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "JUMPDEST",
      path: "3",
    },
    531: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "PUSH2",
      path: "3",
      value: "0x12A",
    },
    534: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "PUSH2",
      path: "3",
      value: "0x220",
    },
    537: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "CALLDATASIZE",
      path: "3",
    },
    538: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "PUSH1",
      path: "3",
      value: "0x4",
    },
    540: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "PUSH2",
      path: "3",
      value: "0x1265",
    },
    543: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "i",
      offset: [467, 1130],
      op: "JUMP",
      path: "3",
    },
    544: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "JUMPDEST",
      path: "3",
    },
    545: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "PUSH2",
      path: "3",
      value: "0x6C2",
    },
    548: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "i",
      offset: [467, 1130],
      op: "JUMP",
      path: "3",
    },
    549: {
      offset: [186, 213],
      op: "JUMPDEST",
      path: "10",
    },
    550: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [186, 213],
      op: "PUSH2",
      path: "10",
      value: "0x19D",
    },
    553: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [186, 213],
      op: "PUSH1",
      path: "10",
      value: "0x7",
    },
    555: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [186, 213],
      op: "SLOAD",
      path: "10",
    },
    556: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [186, 213],
      op: "DUP2",
      path: "10",
    },
    557: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [186, 213],
      op: "JUMP",
      path: "10",
    },
    558: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "JUMPDEST",
      path: "0",
    },
    559: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "PUSH2",
      path: "0",
      value: "0x10D",
    },
    562: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "PUSH2",
      path: "0",
      value: "0x23C",
    },
    565: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "CALLDATASIZE",
      path: "0",
    },
    566: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    568: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "PUSH2",
      path: "0",
      value: "0x14A8",
    },
    571: {
      fn: "ERC721.isApprovedForAll",
      jump: "i",
      offset: [4487, 4649],
      op: "JUMP",
      path: "0",
    },
    572: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "JUMPDEST",
      path: "0",
    },
    573: {
      op: "PUSH1",
      value: "0x1",
    },
    575: {
      op: "PUSH1",
      value: "0x1",
    },
    577: {
      op: "PUSH1",
      value: "0xA0",
    },
    579: {
      op: "SHL",
    },
    580: {
      op: "SUB",
    },
    581: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "SWAP2",
      path: "0",
      statement: 0,
    },
    582: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP3",
      path: "0",
    },
    583: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "AND",
      path: "0",
    },
    584: {
      fn: "ERC721.isApprovedForAll",
      offset: [4584, 4588],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    586: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "SWAP1",
      path: "0",
    },
    587: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP2",
      path: "0",
    },
    588: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "MSTORE",
      path: "0",
    },
    589: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4625],
      op: "PUSH1",
      path: "0",
      value: "0x5",
    },
    591: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    593: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "SWAP1",
      path: "0",
    },
    594: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP2",
      path: "0",
    },
    595: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "MSTORE",
      path: "0",
    },
    596: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    598: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP1",
      path: "0",
    },
    599: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP4",
      path: "0",
    },
    600: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "KECCAK256",
      path: "0",
    },
    601: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP4",
      path: "0",
    },
    602: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP1",
      path: "0",
    },
    603: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP5",
      path: "0",
    },
    604: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "AND",
      path: "0",
    },
    605: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "DUP3",
      path: "0",
    },
    606: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "MSTORE",
      path: "0",
    },
    607: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP2",
      path: "0",
    },
    608: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP1",
      path: "0",
    },
    609: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP2",
      path: "0",
    },
    610: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "MSTORE",
      path: "0",
    },
    611: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "KECCAK256",
      path: "0",
    },
    612: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SLOAD",
      path: "0",
    },
    613: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "PUSH1",
      path: "0",
      value: "0xFF",
    },
    615: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "AND",
      path: "0",
    },
    616: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP1",
      path: "0",
    },
    617: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "JUMP",
      path: "0",
    },
    618: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "JUMPDEST",
      path: "0",
    },
    619: {
      fn: "ERC721.supportsInterface",
      offset: [1657, 1661],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    621: {
      op: "PUSH1",
      value: "0x1",
    },
    623: {
      op: "PUSH1",
      value: "0x1",
    },
    625: {
      op: "PUSH1",
      value: "0xE0",
    },
    627: {
      op: "SHL",
    },
    628: {
      op: "SUB",
    },
    629: {
      op: "NOT",
    },
    630: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1732],
      op: "DUP3",
      path: "0",
      statement: 1,
    },
    631: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1732],
      op: "AND",
      path: "0",
    },
    632: {
      op: "PUSH4",
      value: "0x80AC58CD",
    },
    637: {
      op: "PUSH1",
      value: "0xE0",
    },
    639: {
      op: "SHL",
    },
    640: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1732],
      op: "EQ",
      path: "0",
    },
    641: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1732],
      op: "DUP1",
      path: "0",
    },
    642: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1796],
      op: "PUSH2",
      path: "0",
      value: "0x29B",
    },
    645: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1796],
      op: "JUMPI",
      path: "0",
    },
    646: {
      op: "POP",
    },
    647: {
      op: "PUSH1",
      value: "0x1",
    },
    649: {
      op: "PUSH1",
      value: "0x1",
    },
    651: {
      op: "PUSH1",
      value: "0xE0",
    },
    653: {
      op: "SHL",
    },
    654: {
      op: "SUB",
    },
    655: {
      op: "NOT",
    },
    656: {
      fn: "ERC721.supportsInterface",
      offset: [1748, 1796],
      op: "DUP3",
      path: "0",
    },
    657: {
      fn: "ERC721.supportsInterface",
      offset: [1748, 1796],
      op: "AND",
      path: "0",
    },
    658: {
      op: "PUSH4",
      value: "0x5B5E139F",
    },
    663: {
      op: "PUSH1",
      value: "0xE0",
    },
    665: {
      op: "SHL",
    },
    666: {
      fn: "ERC721.supportsInterface",
      offset: [1748, 1796],
      op: "EQ",
      path: "0",
    },
    667: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1796],
      op: "JUMPDEST",
      path: "0",
    },
    668: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1848],
      op: "DUP1",
      path: "0",
    },
    669: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1848],
      op: "PUSH2",
      path: "0",
      value: "0x2B6",
    },
    672: {
      fn: "ERC721.supportsInterface",
      offset: [1692, 1848],
      op: "JUMPI",
      path: "0",
    },
    673: {
      op: "POP",
    },
    674: {
      op: "PUSH4",
      value: "0x1FFC9A7",
    },
    679: {
      op: "PUSH1",
      value: "0xE0",
    },
    681: {
      op: "SHL",
    },
    682: {
      op: "PUSH1",
      value: "0x1",
    },
    684: {
      op: "PUSH1",
      value: "0x1",
    },
    686: {
      op: "PUSH1",
      value: "0xE0",
    },
    688: {
      op: "SHL",
    },
    689: {
      op: "SUB",
    },
    690: {
      op: "NOT",
    },
    691: {
      fn: "ERC165.supportsInterface",
      offset: [937, 977],
      op: "DUP4",
      path: "8",
      statement: 2,
    },
    692: {
      fn: "ERC165.supportsInterface",
      offset: [937, 977],
      op: "AND",
      path: "8",
    },
    693: {
      fn: "ERC165.supportsInterface",
      offset: [937, 977],
      op: "EQ",
      path: "8",
    },
    694: {
      fn: "ERC721.supportsInterface",
      offset: [1812, 1848],
      op: "JUMPDEST",
      path: "0",
    },
    695: {
      fn: "ERC721.supportsInterface",
      offset: [1673, 1848],
      op: "SWAP3",
      path: "0",
    },
    696: {
      fn: "ERC721.supportsInterface",
      offset: [1555, 1855],
      op: "SWAP2",
      path: "0",
    },
    697: {
      op: "POP",
    },
    698: {
      op: "POP",
    },
    699: {
      fn: "ERC721.supportsInterface",
      jump: "o",
      offset: [1555, 1855],
      op: "JUMP",
      path: "0",
    },
    700: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "JUMPDEST",
      path: "0",
    },
    701: {
      fn: "ERC721.name",
      offset: [2527, 2540],
      op: "PUSH1",
      path: "0",
      value: "0x60",
    },
    703: {
      fn: "ERC721.name",
      offset: [2559, 2564],
      op: "PUSH1",
      path: "0",
      statement: 3,
      value: "0x0",
    },
    705: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    706: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SLOAD",
      path: "0",
    },
    707: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x2CB",
    },
    710: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    711: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x14DB",
    },
    714: {
      fn: "ERC721.name",
      jump: "i",
      offset: [2552, 2564],
      op: "JUMP",
      path: "0",
    },
    715: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPDEST",
      path: "0",
    },
    716: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    717: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x1F",
    },
    719: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    720: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    722: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    723: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP2",
      path: "0",
    },
    724: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DIV",
      path: "0",
    },
    725: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MUL",
      path: "0",
    },
    726: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    728: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    729: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    731: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MLOAD",
      path: "0",
    },
    732: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    733: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP2",
      path: "0",
    },
    734: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    735: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    737: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MSTORE",
      path: "0",
    },
    738: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    739: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP3",
      path: "0",
    },
    740: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP2",
      path: "0",
    },
    741: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
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
      op: "DUP2",
      path: "0",
    },
    744: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MSTORE",
      path: "0",
    },
    745: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    747: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    748: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP3",
      path: "0",
    },
    749: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    750: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SLOAD",
      path: "0",
    },
    751: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x2F7",
    },
    754: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    755: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x14DB",
    },
    758: {
      fn: "ERC721.name",
      jump: "i",
      offset: [2552, 2564],
      op: "JUMP",
      path: "0",
    },
    759: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPDEST",
      path: "0",
    },
    760: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    761: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ISZERO",
      path: "0",
    },
    762: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x344",
    },
    765: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPI",
      path: "0",
    },
    766: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    767: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x1F",
    },
    769: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "LT",
      path: "0",
    },
    770: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x319",
    },
    773: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPI",
      path: "0",
    },
    774: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x100",
    },
    777: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    778: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP4",
      path: "0",
    },
    779: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SLOAD",
      path: "0",
    },
    780: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DIV",
      path: "0",
    },
    781: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MUL",
      path: "0",
    },
    782: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP4",
      path: "0",
    },
    783: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MSTORE",
      path: "0",
    },
    784: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP2",
      path: "0",
    },
    785: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    787: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    788: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP2",
      path: "0",
    },
    789: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x344",
    },
    792: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMP",
      path: "0",
    },
    793: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPDEST",
      path: "0",
    },
    794: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP3",
      path: "0",
    },
    795: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    796: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP2",
      path: "0",
    },
    797: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    798: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    800: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MSTORE",
      path: "0",
    },
    801: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    803: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    805: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "KECCAK256",
      path: "0",
    },
    806: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    807: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPDEST",
      path: "0",
    },
    808: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP2",
      path: "0",
    },
    809: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SLOAD",
      path: "0",
    },
    810: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP2",
      path: "0",
    },
    811: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "MSTORE",
      path: "0",
    },
    812: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    813: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x1",
    },
    815: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    816: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    817: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    819: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    820: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP1",
      path: "0",
    },
    821: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP4",
      path: "0",
    },
    822: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "GT",
      path: "0",
    },
    823: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH2",
      path: "0",
      value: "0x327",
    },
    826: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPI",
      path: "0",
    },
    827: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP3",
      path: "0",
    },
    828: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    829: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SUB",
      path: "0",
    },
    830: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "PUSH1",
      path: "0",
      value: "0x1F",
    },
    832: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "AND",
      path: "0",
    },
    833: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "DUP3",
      path: "0",
    },
    834: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "ADD",
      path: "0",
    },
    835: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP2",
      path: "0",
    },
    836: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "JUMPDEST",
      path: "0",
    },
    837: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "POP",
      path: "0",
    },
    838: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "POP",
      path: "0",
    },
    839: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "POP",
      path: "0",
    },
    840: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "POP",
      path: "0",
    },
    841: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "POP",
      path: "0",
    },
    842: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "SWAP1",
      path: "0",
    },
    843: {
      fn: "ERC721.name",
      offset: [2552, 2564],
      op: "POP",
      path: "0",
    },
    844: {
      fn: "ERC721.name",
      offset: [2473, 2571],
      op: "SWAP1",
      path: "0",
    },
    845: {
      fn: "ERC721.name",
      jump: "o",
      offset: [2473, 2571],
      op: "JUMP",
      path: "0",
    },
    846: {
      fn: "ERC721.getApproved",
      offset: [3984, 4201],
      op: "JUMPDEST",
      path: "0",
    },
    847: {
      fn: "ERC721.getApproved",
      offset: [4060, 4067],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    849: {
      fn: "ERC721.getApproved",
      offset: [4087, 4103],
      op: "PUSH2",
      path: "0",
      statement: 4,
      value: "0x359",
    },
    852: {
      fn: "ERC721.getApproved",
      offset: [4095, 4102],
      op: "DUP3",
      path: "0",
    },
    853: {
      fn: "ERC721.getApproved",
      offset: [4087, 4094],
      op: "PUSH2",
      path: "0",
      value: "0x839",
    },
    856: {
      fn: "ERC721.getApproved",
      jump: "i",
      offset: [4087, 4103],
      op: "JUMP",
      path: "0",
    },
    857: {
      branch: 61,
      fn: "ERC721.getApproved",
      offset: [4087, 4103],
      op: "JUMPDEST",
      path: "0",
    },
    858: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "PUSH2",
      path: "0",
      value: "0x3BF",
    },
    861: {
      branch: 61,
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "JUMPI",
      path: "0",
    },
    862: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    864: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "MLOAD",
      path: "0",
    },
    865: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    869: {
      op: "PUSH1",
      value: "0xE5",
    },
    871: {
      op: "SHL",
    },
    872: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "DUP2",
      path: "0",
    },
    873: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "MSTORE",
      path: "0",
    },
    874: {
      op: "PUSH1",
      value: "0x20",
    },
    876: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    878: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "DUP3",
      path: "0",
    },
    879: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "ADD",
      path: "0",
    },
    880: {
      op: "MSTORE",
    },
    881: {
      op: "PUSH1",
      value: "0x2C",
    },
    883: {
      op: "PUSH1",
      value: "0x24",
    },
    885: {
      op: "DUP3",
    },
    886: {
      op: "ADD",
    },
    887: {
      op: "MSTORE",
    },
    888: {
      op: "PUSH32",
      value:
        "0x4552433732313A20617070726F76656420717565727920666F72206E6F6E6578",
    },
    921: {
      op: "PUSH1",
      value: "0x44",
    },
    923: {
      op: "DUP3",
    },
    924: {
      op: "ADD",
    },
    925: {
      op: "MSTORE",
    },
    926: {
      op: "PUSH12",
      value: "0x34B9BA32B73A103A37B5B2B7",
    },
    939: {
      op: "PUSH1",
      value: "0xA1",
    },
    941: {
      op: "SHL",
    },
    942: {
      op: "PUSH1",
      value: "0x64",
    },
    944: {
      op: "DUP3",
    },
    945: {
      op: "ADD",
    },
    946: {
      op: "MSTORE",
    },
    947: {
      op: "PUSH1",
      value: "0x84",
    },
    949: {
      op: "ADD",
    },
    950: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "JUMPDEST",
      path: "0",
    },
    951: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    953: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "MLOAD",
      path: "0",
    },
    954: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "DUP1",
      path: "0",
    },
    955: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "SWAP2",
      path: "0",
    },
    956: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "SUB",
      path: "0",
    },
    957: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "SWAP1",
      path: "0",
    },
    958: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "REVERT",
      optimizer_revert: true,
      path: "0",
    },
    959: {
      fn: "ERC721.getApproved",
      offset: [4079, 4152],
      op: "JUMPDEST",
      path: "0",
    },
    960: {
      op: "POP",
    },
    961: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "PUSH1",
      path: "0",
      statement: 5,
      value: "0x0",
    },
    963: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "SWAP1",
      path: "0",
    },
    964: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "DUP2",
      path: "0",
    },
    965: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "MSTORE",
      path: "0",
    },
    966: {
      fn: "ERC721.getApproved",
      offset: [4170, 4185],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    968: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    970: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "MSTORE",
      path: "0",
    },
    971: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    973: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "SWAP1",
      path: "0",
    },
    974: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "KECCAK256",
      path: "0",
    },
    975: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "SLOAD",
      path: "0",
    },
    976: {
      op: "PUSH1",
      value: "0x1",
    },
    978: {
      op: "PUSH1",
      value: "0x1",
    },
    980: {
      op: "PUSH1",
      value: "0xA0",
    },
    982: {
      op: "SHL",
    },
    983: {
      op: "SUB",
    },
    984: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "AND",
      path: "0",
    },
    985: {
      fn: "ERC721.getApproved",
      offset: [4170, 4194],
      op: "SWAP1",
      path: "0",
    },
    986: {
      fn: "ERC721.getApproved",
      jump: "o",
      offset: [3984, 4201],
      op: "JUMP",
      path: "0",
    },
    987: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "JUMPDEST",
      path: "0",
    },
    988: {
      fn: "ERC721.approve",
      offset: [3602, 3615],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    990: {
      fn: "ERC721.approve",
      offset: [3618, 3641],
      op: "PUSH2",
      path: "0",
      value: "0x3E6",
    },
    993: {
      fn: "ERC721.approve",
      offset: [3633, 3640],
      op: "DUP3",
      path: "0",
    },
    994: {
      fn: "ERC721.approve",
      offset: [3618, 3632],
      op: "PUSH2",
      path: "0",
      value: "0x56E",
    },
    997: {
      fn: "ERC721.approve",
      jump: "i",
      offset: [3618, 3641],
      op: "JUMP",
      path: "0",
    },
    998: {
      fn: "ERC721.approve",
      offset: [3618, 3641],
      op: "JUMPDEST",
      path: "0",
    },
    999: {
      fn: "ERC721.approve",
      offset: [3602, 3641],
      op: "SWAP1",
      path: "0",
    },
    1000: {
      fn: "ERC721.approve",
      offset: [3602, 3641],
      op: "POP",
      path: "0",
    },
    1001: {
      fn: "ERC721.approve",
      offset: [3665, 3670],
      op: "DUP1",
      path: "0",
      statement: 6,
    },
    1002: {
      op: "PUSH1",
      value: "0x1",
    },
    1004: {
      op: "PUSH1",
      value: "0x1",
    },
    1006: {
      op: "PUSH1",
      value: "0xA0",
    },
    1008: {
      op: "SHL",
    },
    1009: {
      op: "SUB",
    },
    1010: {
      fn: "ERC721.approve",
      offset: [3659, 3670],
      op: "AND",
      path: "0",
    },
    1011: {
      fn: "ERC721.approve",
      offset: [3659, 3661],
      op: "DUP4",
      path: "0",
    },
    1012: {
      op: "PUSH1",
      value: "0x1",
    },
    1014: {
      op: "PUSH1",
      value: "0x1",
    },
    1016: {
      op: "PUSH1",
      value: "0xA0",
    },
    1018: {
      op: "SHL",
    },
    1019: {
      op: "SUB",
    },
    1020: {
      fn: "ERC721.approve",
      offset: [3659, 3670],
      op: "AND",
      path: "0",
    },
    1021: {
      fn: "ERC721.approve",
      offset: [3659, 3670],
      op: "EQ",
      path: "0",
    },
    1022: {
      branch: 62,
      fn: "ERC721.approve",
      offset: [3659, 3670],
      op: "ISZERO",
      path: "0",
    },
    1023: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "PUSH2",
      path: "0",
      value: "0x454",
    },
    1026: {
      branch: 62,
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "JUMPI",
      path: "0",
    },
    1027: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1029: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "MLOAD",
      path: "0",
    },
    1030: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    1034: {
      op: "PUSH1",
      value: "0xE5",
    },
    1036: {
      op: "SHL",
    },
    1037: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "DUP2",
      path: "0",
    },
    1038: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "MSTORE",
      path: "0",
    },
    1039: {
      op: "PUSH1",
      value: "0x20",
    },
    1041: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    1043: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "DUP3",
      path: "0",
    },
    1044: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "ADD",
      path: "0",
    },
    1045: {
      op: "MSTORE",
    },
    1046: {
      op: "PUSH1",
      value: "0x21",
    },
    1048: {
      op: "PUSH1",
      value: "0x24",
    },
    1050: {
      op: "DUP3",
    },
    1051: {
      op: "ADD",
    },
    1052: {
      op: "MSTORE",
    },
    1053: {
      op: "PUSH32",
      value:
        "0x4552433732313A20617070726F76616C20746F2063757272656E74206F776E65",
    },
    1086: {
      op: "PUSH1",
      value: "0x44",
    },
    1088: {
      op: "DUP3",
    },
    1089: {
      op: "ADD",
    },
    1090: {
      op: "MSTORE",
    },
    1091: {
      op: "PUSH1",
      value: "0x39",
    },
    1093: {
      op: "PUSH1",
      value: "0xF9",
    },
    1095: {
      op: "SHL",
    },
    1096: {
      op: "PUSH1",
      value: "0x64",
    },
    1098: {
      op: "DUP3",
    },
    1099: {
      op: "ADD",
    },
    1100: {
      op: "MSTORE",
    },
    1101: {
      op: "PUSH1",
      value: "0x84",
    },
    1103: {
      op: "ADD",
    },
    1104: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    1107: {
      op: "JUMP",
    },
    1108: {
      fn: "ERC721.approve",
      offset: [3651, 3708],
      op: "JUMPDEST",
      path: "0",
    },
    1109: {
      fn: "Context._msgSender",
      offset: [719, 729],
      op: "CALLER",
      path: "6",
      statement: 7,
    },
    1110: {
      op: "PUSH1",
      value: "0x1",
    },
    1112: {
      op: "PUSH1",
      value: "0x1",
    },
    1114: {
      op: "PUSH1",
      value: "0xA0",
    },
    1116: {
      op: "SHL",
    },
    1117: {
      op: "SUB",
    },
    1118: {
      fn: "ERC721.approve",
      offset: [3740, 3761],
      op: "DUP3",
      path: "0",
      statement: 8,
    },
    1119: {
      fn: "ERC721.approve",
      offset: [3740, 3761],
      op: "AND",
      path: "0",
    },
    1120: {
      fn: "ERC721.approve",
      offset: [3740, 3761],
      op: "EQ",
      path: "0",
    },
    1121: {
      branch: 63,
      fn: "ERC721.approve",
      offset: [3740, 3761],
      op: "DUP1",
      path: "0",
    },
    1122: {
      fn: "ERC721.approve",
      offset: [3740, 3802],
      op: "PUSH2",
      path: "0",
      value: "0x470",
    },
    1125: {
      branch: 63,
      fn: "ERC721.approve",
      offset: [3740, 3802],
      op: "JUMPI",
      path: "0",
    },
    1126: {
      op: "POP",
    },
    1127: {
      fn: "ERC721.approve",
      offset: [3765, 3802],
      op: "PUSH2",
      path: "0",
      value: "0x470",
    },
    1130: {
      fn: "ERC721.approve",
      offset: [3782, 3787],
      op: "DUP2",
      path: "0",
    },
    1131: {
      fn: "Context._msgSender",
      offset: [719, 729],
      op: "CALLER",
      path: "6",
    },
    1132: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "PUSH2",
      path: "0",
      value: "0x23C",
    },
    1135: {
      fn: "ERC721.isApprovedForAll",
      jump: "i",
      offset: [4487, 4649],
      op: "JUMP",
      path: "0",
    },
    1136: {
      branch: 64,
      fn: "ERC721.approve",
      offset: [3765, 3802],
      op: "JUMPDEST",
      path: "0",
    },
    1137: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "PUSH2",
      path: "0",
      value: "0x4E2",
    },
    1140: {
      branch: 64,
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "JUMPI",
      path: "0",
    },
    1141: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1143: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "MLOAD",
      path: "0",
    },
    1144: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    1148: {
      op: "PUSH1",
      value: "0xE5",
    },
    1150: {
      op: "SHL",
    },
    1151: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "DUP2",
      path: "0",
    },
    1152: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "MSTORE",
      path: "0",
    },
    1153: {
      op: "PUSH1",
      value: "0x20",
    },
    1155: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    1157: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "DUP3",
      path: "0",
    },
    1158: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "ADD",
      path: "0",
    },
    1159: {
      op: "MSTORE",
    },
    1160: {
      op: "PUSH1",
      value: "0x38",
    },
    1162: {
      op: "PUSH1",
      value: "0x24",
    },
    1164: {
      op: "DUP3",
    },
    1165: {
      op: "ADD",
    },
    1166: {
      op: "MSTORE",
    },
    1167: {
      op: "PUSH32",
      value:
        "0x4552433732313A20617070726F76652063616C6C6572206973206E6F74206F77",
    },
    1200: {
      op: "PUSH1",
      value: "0x44",
    },
    1202: {
      op: "DUP3",
    },
    1203: {
      op: "ADD",
    },
    1204: {
      op: "MSTORE",
    },
    1205: {
      op: "PUSH32",
      value:
        "0x6E6572206E6F7220617070726F76656420666F7220616C6C0000000000000000",
    },
    1238: {
      op: "PUSH1",
      value: "0x64",
    },
    1240: {
      op: "DUP3",
    },
    1241: {
      op: "ADD",
    },
    1242: {
      op: "MSTORE",
    },
    1243: {
      op: "PUSH1",
      value: "0x84",
    },
    1245: {
      op: "ADD",
    },
    1246: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    1249: {
      op: "JUMP",
    },
    1250: {
      fn: "ERC721.approve",
      offset: [3719, 3884],
      op: "JUMPDEST",
      path: "0",
    },
    1251: {
      fn: "ERC721.approve",
      offset: [3895, 3916],
      op: "PUSH2",
      path: "0",
      statement: 9,
      value: "0x4EC",
    },
    1254: {
      fn: "ERC721.approve",
      offset: [3904, 3906],
      op: "DUP4",
      path: "0",
    },
    1255: {
      fn: "ERC721.approve",
      offset: [3908, 3915],
      op: "DUP4",
      path: "0",
    },
    1256: {
      fn: "ERC721.approve",
      offset: [3895, 3903],
      op: "PUSH2",
      path: "0",
      value: "0x856",
    },
    1259: {
      fn: "ERC721.approve",
      jump: "i",
      offset: [3895, 3916],
      op: "JUMP",
      path: "0",
    },
    1260: {
      fn: "ERC721.approve",
      offset: [3895, 3916],
      op: "JUMPDEST",
      path: "0",
    },
    1261: {
      fn: "ERC721.approve",
      offset: [3592, 3923],
      op: "POP",
      path: "0",
    },
    1262: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "POP",
      path: "0",
    },
    1263: {
      fn: "ERC721.approve",
      offset: [3522, 3923],
      op: "POP",
      path: "0",
    },
    1264: {
      fn: "ERC721.approve",
      jump: "o",
      offset: [3522, 3923],
      op: "JUMP",
      path: "0",
    },
    1265: {
      fn: "ERC721.transferFrom",
      offset: [4711, 5041],
      op: "JUMPDEST",
      path: "0",
    },
    1266: {
      fn: "ERC721.transferFrom",
      offset: [4900, 4941],
      op: "PUSH2",
      path: "0",
      statement: 10,
      value: "0x4FB",
    },
    1269: {
      fn: "Context._msgSender",
      offset: [719, 729],
      op: "CALLER",
      path: "6",
    },
    1270: {
      fn: "ERC721.transferFrom",
      offset: [4933, 4940],
      op: "DUP3",
      path: "0",
    },
    1271: {
      fn: "ERC721.transferFrom",
      offset: [4900, 4918],
      op: "PUSH2",
      path: "0",
      value: "0x8C4",
    },
    1274: {
      fn: "ERC721.transferFrom",
      jump: "i",
      offset: [4900, 4941],
      op: "JUMP",
      path: "0",
    },
    1275: {
      branch: 65,
      fn: "ERC721.transferFrom",
      offset: [4900, 4941],
      op: "JUMPDEST",
      path: "0",
    },
    1276: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "PUSH2",
      path: "0",
      value: "0x517",
    },
    1279: {
      branch: 65,
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "JUMPI",
      path: "0",
    },
    1280: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1282: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "MLOAD",
      path: "0",
    },
    1283: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    1287: {
      op: "PUSH1",
      value: "0xE5",
    },
    1289: {
      op: "SHL",
    },
    1290: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "DUP2",
      path: "0",
    },
    1291: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "MSTORE",
      path: "0",
    },
    1292: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    1294: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "ADD",
      path: "0",
    },
    1295: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    1298: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "SWAP1",
      path: "0",
    },
    1299: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "PUSH2",
      path: "0",
      value: "0x1516",
    },
    1302: {
      fn: "ERC721.transferFrom",
      jump: "i",
      offset: [4892, 4995],
      op: "JUMP",
      path: "0",
    },
    1303: {
      fn: "ERC721.transferFrom",
      offset: [4892, 4995],
      op: "JUMPDEST",
      path: "0",
    },
    1304: {
      fn: "ERC721.transferFrom",
      offset: [5006, 5034],
      op: "PUSH2",
      path: "0",
      statement: 11,
      value: "0x4EC",
    },
    1307: {
      fn: "ERC721.transferFrom",
      offset: [5016, 5020],
      op: "DUP4",
      path: "0",
    },
    1308: {
      fn: "ERC721.transferFrom",
      offset: [5022, 5024],
      op: "DUP4",
      path: "0",
    },
    1309: {
      fn: "ERC721.transferFrom",
      offset: [5026, 5033],
      op: "DUP4",
      path: "0",
    },
    1310: {
      fn: "ERC721.transferFrom",
      offset: [5006, 5015],
      op: "PUSH2",
      path: "0",
      value: "0x9AA",
    },
    1313: {
      fn: "ERC721.transferFrom",
      jump: "i",
      offset: [5006, 5034],
      op: "JUMP",
      path: "0",
    },
    1314: {
      fn: "NFTCollection.createCollectible",
      offset: [380, 662],
      op: "JUMPDEST",
      path: "10",
    },
    1315: {
      fn: "NFTCollection.createCollectible",
      offset: [488, 500],
      op: "PUSH1",
      path: "10",
      value: "0x7",
    },
    1317: {
      fn: "NFTCollection.createCollectible",
      offset: [488, 500],
      op: "SLOAD",
      path: "10",
    },
    1318: {
      fn: "NFTCollection.createCollectible",
      offset: [448, 455],
      op: "PUSH1",
      path: "10",
      value: "0x0",
    },
    1320: {
      fn: "NFTCollection.createCollectible",
      offset: [448, 455],
      op: "SWAP1",
      path: "10",
    },
    1321: {
      fn: "NFTCollection.createCollectible",
      offset: [510, 543],
      op: "PUSH2",
      path: "10",
      statement: 12,
      value: "0x532",
    },
    1324: {
      fn: "NFTCollection.createCollectible",
      offset: [520, 530],
      op: "CALLER",
      path: "10",
    },
    1325: {
      fn: "NFTCollection.createCollectible",
      offset: [488, 500],
      op: "DUP3",
      path: "10",
    },
    1326: {
      fn: "NFTCollection.createCollectible",
      offset: [510, 519],
      op: "PUSH2",
      path: "10",
      value: "0xB4A",
    },
    1329: {
      fn: "NFTCollection.createCollectible",
      jump: "i",
      offset: [510, 543],
      op: "JUMP",
      path: "10",
    },
    1330: {
      fn: "NFTCollection.createCollectible",
      offset: [510, 543],
      op: "JUMPDEST",
      path: "10",
    },
    1331: {
      fn: "NFTCollection.createCollectible",
      offset: [553, 587],
      op: "PUSH2",
      path: "10",
      statement: 13,
      value: "0x53C",
    },
    1334: {
      fn: "NFTCollection.createCollectible",
      offset: [566, 576],
      op: "DUP2",
      path: "10",
    },
    1335: {
      fn: "NFTCollection.createCollectible",
      offset: [578, 586],
      op: "DUP5",
      path: "10",
    },
    1336: {
      fn: "NFTCollection.createCollectible",
      offset: [553, 565],
      op: "PUSH2",
      path: "10",
      value: "0xB64",
    },
    1339: {
      fn: "NFTCollection.createCollectible",
      jump: "i",
      offset: [553, 587],
      op: "JUMP",
      path: "10",
    },
    1340: {
      fn: "NFTCollection.createCollectible",
      offset: [553, 587],
      op: "JUMPDEST",
      path: "10",
    },
    1341: {
      fn: "NFTCollection.createCollectible",
      offset: [612, 624],
      op: "PUSH1",
      path: "10",
      statement: 14,
      value: "0x7",
    },
    1343: {
      fn: "NFTCollection.createCollectible",
      offset: [612, 624],
      op: "SLOAD",
      path: "10",
    },
    1344: {
      fn: "NFTCollection.createCollectible",
      offset: [612, 628],
      op: "PUSH2",
      path: "10",
      value: "0x54A",
    },
    1347: {
      fn: "NFTCollection.createCollectible",
      offset: [612, 628],
      op: "SWAP1",
      path: "10",
    },
    1348: {
      fn: "NFTCollection.createCollectible",
      offset: [627, 628],
      op: "PUSH1",
      path: "10",
      value: "0x1",
    },
    1350: {
      fn: "NFTCollection.createCollectible",
      offset: [612, 628],
      op: "PUSH2",
      path: "10",
      value: "0x157D",
    },
    1353: {
      fn: "NFTCollection.createCollectible",
      jump: "i",
      offset: [612, 628],
      op: "JUMP",
      path: "10",
    },
    1354: {
      fn: "NFTCollection.createCollectible",
      offset: [612, 628],
      op: "JUMPDEST",
      path: "10",
    },
    1355: {
      fn: "NFTCollection.createCollectible",
      offset: [597, 609],
      op: "PUSH1",
      path: "10",
      value: "0x7",
    },
    1357: {
      fn: "NFTCollection.createCollectible",
      offset: [597, 628],
      op: "SSTORE",
      path: "10",
    },
    1358: {
      fn: "NFTCollection.createCollectible",
      offset: [645, 655],
      op: "SWAP3",
      path: "10",
      statement: 15,
    },
    1359: {
      fn: "NFTCollection.createCollectible",
      offset: [380, 662],
      op: "SWAP2",
      path: "10",
    },
    1360: {
      op: "POP",
    },
    1361: {
      op: "POP",
    },
    1362: {
      fn: "NFTCollection.createCollectible",
      jump: "o",
      offset: [380, 662],
      op: "JUMP",
      path: "10",
    },
    1363: {
      fn: "ERC721.safeTransferFrom",
      offset: [5107, 5286],
      op: "JUMPDEST",
      path: "0",
    },
    1364: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "PUSH2",
      path: "0",
      statement: 16,
      value: "0x4EC",
    },
    1367: {
      fn: "ERC721.safeTransferFrom",
      offset: [5257, 5261],
      op: "DUP4",
      path: "0",
    },
    1368: {
      fn: "ERC721.safeTransferFrom",
      offset: [5263, 5265],
      op: "DUP4",
      path: "0",
    },
    1369: {
      fn: "ERC721.safeTransferFrom",
      offset: [5267, 5274],
      op: "DUP4",
      path: "0",
    },
    1370: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1372: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "MLOAD",
      path: "0",
    },
    1373: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "DUP1",
      path: "0",
    },
    1374: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    1376: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "ADD",
      path: "0",
    },
    1377: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1379: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "MSTORE",
      path: "0",
    },
    1380: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "DUP1",
      path: "0",
    },
    1381: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    1383: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "DUP2",
      path: "0",
    },
    1384: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "MSTORE",
      path: "0",
    },
    1385: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5279],
      op: "POP",
      path: "0",
    },
    1386: {
      fn: "ERC721.safeTransferFrom",
      offset: [5240, 5256],
      op: "PUSH2",
      path: "0",
      value: "0x68A",
    },
    1389: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5240, 5279],
      op: "JUMP",
      path: "0",
    },
    1390: {
      fn: "ERC721.ownerOf",
      offset: [2176, 2411],
      op: "JUMPDEST",
      path: "0",
    },
    1391: {
      fn: "ERC721.ownerOf",
      offset: [2248, 2255],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    1393: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "DUP2",
      path: "0",
    },
    1394: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "DUP2",
      path: "0",
    },
    1395: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "MSTORE",
      path: "0",
    },
    1396: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2290],
      op: "PUSH1",
      path: "0",
      value: "0x2",
    },
    1398: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    1400: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "MSTORE",
      path: "0",
    },
    1401: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1403: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "DUP2",
      path: "0",
    },
    1404: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "KECCAK256",
      path: "0",
    },
    1405: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "SLOAD",
      path: "0",
    },
    1406: {
      op: "PUSH1",
      value: "0x1",
    },
    1408: {
      op: "PUSH1",
      value: "0x1",
    },
    1410: {
      op: "PUSH1",
      value: "0xA0",
    },
    1412: {
      op: "SHL",
    },
    1413: {
      op: "SUB",
    },
    1414: {
      fn: "ERC721.ownerOf",
      offset: [2283, 2299],
      op: "AND",
      path: "0",
    },
    1415: {
      branch: 66,
      fn: "ERC721.ownerOf",
      offset: [2317, 2336],
      op: "DUP1",
      path: "0",
      statement: 17,
    },
    1416: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "PUSH2",
      path: "0",
      value: "0x2B6",
    },
    1419: {
      branch: 66,
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "JUMPI",
      path: "0",
    },
    1420: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1422: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "MLOAD",
      path: "0",
    },
    1423: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    1427: {
      op: "PUSH1",
      value: "0xE5",
    },
    1429: {
      op: "SHL",
    },
    1430: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "DUP2",
      path: "0",
    },
    1431: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "MSTORE",
      path: "0",
    },
    1432: {
      op: "PUSH1",
      value: "0x20",
    },
    1434: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    1436: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "DUP3",
      path: "0",
    },
    1437: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "ADD",
      path: "0",
    },
    1438: {
      op: "MSTORE",
    },
    1439: {
      op: "PUSH1",
      value: "0x29",
    },
    1441: {
      op: "PUSH1",
      value: "0x24",
    },
    1443: {
      op: "DUP3",
    },
    1444: {
      op: "ADD",
    },
    1445: {
      op: "MSTORE",
    },
    1446: {
      op: "PUSH32",
      value:
        "0x4552433732313A206F776E657220717565727920666F72206E6F6E6578697374",
    },
    1479: {
      op: "PUSH1",
      value: "0x44",
    },
    1481: {
      op: "DUP3",
    },
    1482: {
      op: "ADD",
    },
    1483: {
      op: "MSTORE",
    },
    1484: {
      op: "PUSH9",
      value: "0x32B73A103A37B5B2B7",
    },
    1494: {
      op: "PUSH1",
      value: "0xB9",
    },
    1496: {
      op: "SHL",
    },
    1497: {
      op: "PUSH1",
      value: "0x64",
    },
    1499: {
      op: "DUP3",
    },
    1500: {
      op: "ADD",
    },
    1501: {
      op: "MSTORE",
    },
    1502: {
      op: "PUSH1",
      value: "0x84",
    },
    1504: {
      op: "ADD",
    },
    1505: {
      fn: "ERC721.ownerOf",
      offset: [2309, 2382],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    1508: {
      op: "JUMP",
    },
    1509: {
      fn: "ERC721.balanceOf",
      offset: [1914, 2119],
      op: "JUMPDEST",
      path: "0",
    },
    1510: {
      fn: "ERC721.balanceOf",
      offset: [1986, 1993],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    1512: {
      op: "PUSH1",
      value: "0x1",
    },
    1514: {
      op: "PUSH1",
      value: "0x1",
    },
    1516: {
      op: "PUSH1",
      value: "0xA0",
    },
    1518: {
      op: "SHL",
    },
    1519: {
      op: "SUB",
    },
    1520: {
      fn: "ERC721.balanceOf",
      offset: [2013, 2032],
      op: "DUP3",
      path: "0",
      statement: 18,
    },
    1521: {
      branch: 67,
      fn: "ERC721.balanceOf",
      offset: [2013, 2032],
      op: "AND",
      path: "0",
    },
    1522: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "PUSH2",
      path: "0",
      value: "0x650",
    },
    1525: {
      branch: 67,
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "JUMPI",
      path: "0",
    },
    1526: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1528: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "MLOAD",
      path: "0",
    },
    1529: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    1533: {
      op: "PUSH1",
      value: "0xE5",
    },
    1535: {
      op: "SHL",
    },
    1536: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "DUP2",
      path: "0",
    },
    1537: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "MSTORE",
      path: "0",
    },
    1538: {
      op: "PUSH1",
      value: "0x20",
    },
    1540: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    1542: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "DUP3",
      path: "0",
    },
    1543: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "ADD",
      path: "0",
    },
    1544: {
      op: "MSTORE",
    },
    1545: {
      op: "PUSH1",
      value: "0x2A",
    },
    1547: {
      op: "PUSH1",
      value: "0x24",
    },
    1549: {
      op: "DUP3",
    },
    1550: {
      op: "ADD",
    },
    1551: {
      op: "MSTORE",
    },
    1552: {
      op: "PUSH32",
      value:
        "0x4552433732313A2062616C616E636520717565727920666F7220746865207A65",
    },
    1585: {
      op: "PUSH1",
      value: "0x44",
    },
    1587: {
      op: "DUP3",
    },
    1588: {
      op: "ADD",
    },
    1589: {
      op: "MSTORE",
    },
    1590: {
      op: "PUSH10",
      value: "0x726F2061646472657373",
    },
    1601: {
      op: "PUSH1",
      value: "0xB0",
    },
    1603: {
      op: "SHL",
    },
    1604: {
      op: "PUSH1",
      value: "0x64",
    },
    1606: {
      op: "DUP3",
    },
    1607: {
      op: "ADD",
    },
    1608: {
      op: "MSTORE",
    },
    1609: {
      op: "PUSH1",
      value: "0x84",
    },
    1611: {
      op: "ADD",
    },
    1612: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    1615: {
      op: "JUMP",
    },
    1616: {
      fn: "ERC721.balanceOf",
      offset: [2005, 2079],
      op: "JUMPDEST",
      path: "0",
    },
    1617: {
      op: "POP",
    },
    1618: {
      op: "PUSH1",
      value: "0x1",
    },
    1620: {
      op: "PUSH1",
      value: "0x1",
    },
    1622: {
      op: "PUSH1",
      value: "0xA0",
    },
    1624: {
      op: "SHL",
    },
    1625: {
      op: "SUB",
    },
    1626: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "AND",
      path: "0",
      statement: 19,
    },
    1627: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    1629: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "SWAP1",
      path: "0",
    },
    1630: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "DUP2",
      path: "0",
    },
    1631: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "MSTORE",
      path: "0",
    },
    1632: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2105],
      op: "PUSH1",
      path: "0",
      value: "0x3",
    },
    1634: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    1636: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "MSTORE",
      path: "0",
    },
    1637: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1639: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "SWAP1",
      path: "0",
    },
    1640: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "KECCAK256",
      path: "0",
    },
    1641: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "SLOAD",
      path: "0",
    },
    1642: {
      fn: "ERC721.balanceOf",
      offset: [2096, 2112],
      op: "SWAP1",
      path: "0",
    },
    1643: {
      fn: "ERC721.balanceOf",
      jump: "o",
      offset: [1914, 2119],
      op: "JUMP",
      path: "0",
    },
    1644: {
      fn: "ERC721.symbol",
      offset: [2635, 2737],
      op: "JUMPDEST",
      path: "0",
    },
    1645: {
      fn: "ERC721.symbol",
      offset: [2691, 2704],
      op: "PUSH1",
      path: "0",
      value: "0x60",
    },
    1647: {
      fn: "ERC721.symbol",
      offset: [2723, 2730],
      op: "PUSH1",
      path: "0",
      statement: 20,
      value: "0x1",
    },
    1649: {
      fn: "ERC721.symbol",
      offset: [2716, 2730],
      op: "DUP1",
      path: "0",
    },
    1650: {
      fn: "ERC721.symbol",
      offset: [2716, 2730],
      op: "SLOAD",
      path: "0",
    },
    1651: {
      fn: "ERC721.symbol",
      offset: [2716, 2730],
      op: "PUSH2",
      path: "0",
      value: "0x2CB",
    },
    1654: {
      fn: "ERC721.symbol",
      offset: [2716, 2730],
      op: "SWAP1",
      path: "0",
    },
    1655: {
      fn: "ERC721.symbol",
      offset: [2716, 2730],
      op: "PUSH2",
      path: "0",
      value: "0x14DB",
    },
    1658: {
      fn: "ERC721.symbol",
      jump: "i",
      offset: [2716, 2730],
      op: "JUMP",
      path: "0",
    },
    1659: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "JUMPDEST",
      path: "0",
    },
    1660: {
      fn: "ERC721.setApprovalForAll",
      offset: [4362, 4414],
      op: "PUSH2",
      path: "0",
      statement: 21,
      value: "0x686",
    },
    1663: {
      fn: "Context._msgSender",
      offset: [719, 729],
      op: "CALLER",
      path: "6",
    },
    1664: {
      fn: "ERC721.setApprovalForAll",
      offset: [4395, 4403],
      op: "DUP4",
      path: "0",
    },
    1665: {
      fn: "ERC721.setApprovalForAll",
      offset: [4405, 4413],
      op: "DUP4",
      path: "0",
    },
    1666: {
      fn: "ERC721.setApprovalForAll",
      offset: [4362, 4380],
      op: "PUSH2",
      path: "0",
      value: "0xBEF",
    },
    1669: {
      fn: "ERC721.setApprovalForAll",
      jump: "i",
      offset: [4362, 4414],
      op: "JUMP",
      path: "0",
    },
    1670: {
      fn: "ERC721.setApprovalForAll",
      offset: [4362, 4414],
      op: "JUMPDEST",
      path: "0",
    },
    1671: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "POP",
      path: "0",
    },
    1672: {
      fn: "ERC721.setApprovalForAll",
      offset: [4268, 4421],
      op: "POP",
      path: "0",
    },
    1673: {
      fn: "ERC721.setApprovalForAll",
      jump: "o",
      offset: [4268, 4421],
      op: "JUMP",
      path: "0",
    },
    1674: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "JUMPDEST",
      path: "0",
    },
    1675: {
      fn: "ERC721.safeTransferFrom",
      offset: [5521, 5562],
      op: "PUSH2",
      path: "0",
      statement: 22,
      value: "0x694",
    },
    1678: {
      fn: "Context._msgSender",
      offset: [719, 729],
      op: "CALLER",
      path: "6",
    },
    1679: {
      fn: "ERC721.safeTransferFrom",
      offset: [5554, 5561],
      op: "DUP4",
      path: "0",
    },
    1680: {
      fn: "ERC721.safeTransferFrom",
      offset: [5521, 5539],
      op: "PUSH2",
      path: "0",
      value: "0x8C4",
    },
    1683: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5521, 5562],
      op: "JUMP",
      path: "0",
    },
    1684: {
      branch: 68,
      fn: "ERC721.safeTransferFrom",
      offset: [5521, 5562],
      op: "JUMPDEST",
      path: "0",
    },
    1685: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "PUSH2",
      path: "0",
      value: "0x6B0",
    },
    1688: {
      branch: 68,
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "JUMPI",
      path: "0",
    },
    1689: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    1691: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "MLOAD",
      path: "0",
    },
    1692: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    1696: {
      op: "PUSH1",
      value: "0xE5",
    },
    1698: {
      op: "SHL",
    },
    1699: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "DUP2",
      path: "0",
    },
    1700: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "MSTORE",
      path: "0",
    },
    1701: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    1703: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "ADD",
      path: "0",
    },
    1704: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    1707: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "SWAP1",
      path: "0",
    },
    1708: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "PUSH2",
      path: "0",
      value: "0x1516",
    },
    1711: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5513, 5616],
      op: "JUMP",
      path: "0",
    },
    1712: {
      fn: "ERC721.safeTransferFrom",
      offset: [5513, 5616],
      op: "JUMPDEST",
      path: "0",
    },
    1713: {
      fn: "ERC721.safeTransferFrom",
      offset: [5626, 5665],
      op: "PUSH2",
      path: "0",
      statement: 23,
      value: "0x6BC",
    },
    1716: {
      fn: "ERC721.safeTransferFrom",
      offset: [5640, 5644],
      op: "DUP5",
      path: "0",
    },
    1717: {
      fn: "ERC721.safeTransferFrom",
      offset: [5646, 5648],
      op: "DUP5",
      path: "0",
    },
    1718: {
      fn: "ERC721.safeTransferFrom",
      offset: [5650, 5657],
      op: "DUP5",
      path: "0",
    },
    1719: {
      fn: "ERC721.safeTransferFrom",
      offset: [5659, 5664],
      op: "DUP5",
      path: "0",
    },
    1720: {
      fn: "ERC721.safeTransferFrom",
      offset: [5626, 5639],
      op: "PUSH2",
      path: "0",
      value: "0xCBE",
    },
    1723: {
      fn: "ERC721.safeTransferFrom",
      jump: "i",
      offset: [5626, 5665],
      op: "JUMP",
      path: "0",
    },
    1724: {
      fn: "ERC721.safeTransferFrom",
      offset: [5626, 5665],
      op: "JUMPDEST",
      path: "0",
    },
    1725: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "POP",
      path: "0",
    },
    1726: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "POP",
      path: "0",
    },
    1727: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "POP",
      path: "0",
    },
    1728: {
      fn: "ERC721.safeTransferFrom",
      offset: [5352, 5672],
      op: "POP",
      path: "0",
    },
    1729: {
      fn: "ERC721.safeTransferFrom",
      jump: "o",
      offset: [5352, 5672],
      op: "JUMP",
      path: "0",
    },
    1730: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "JUMPDEST",
      path: "3",
    },
    1731: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [540, 553],
      op: "PUSH1",
      path: "3",
      value: "0x60",
    },
    1733: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [573, 589],
      op: "PUSH2",
      path: "3",
      statement: 24,
      value: "0x6CD",
    },
    1736: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [581, 588],
      op: "DUP3",
      path: "3",
    },
    1737: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [573, 580],
      op: "PUSH2",
      path: "3",
      value: "0x839",
    },
    1740: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "i",
      offset: [573, 589],
      op: "JUMP",
      path: "3",
    },
    1741: {
      branch: 79,
      fn: "ERC721URIStorage.tokenURI",
      offset: [573, 589],
      op: "JUMPDEST",
      path: "3",
    },
    1742: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "PUSH2",
      path: "3",
      value: "0x733",
    },
    1745: {
      branch: 79,
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "JUMPI",
      path: "3",
    },
    1746: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    1748: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "MLOAD",
      path: "3",
    },
    1749: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    1753: {
      op: "PUSH1",
      value: "0xE5",
    },
    1755: {
      op: "SHL",
    },
    1756: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "DUP2",
      path: "3",
    },
    1757: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "MSTORE",
      path: "3",
    },
    1758: {
      op: "PUSH1",
      value: "0x20",
    },
    1760: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "PUSH1",
      path: "3",
      value: "0x4",
    },
    1762: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "DUP3",
      path: "3",
    },
    1763: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "ADD",
      path: "3",
    },
    1764: {
      op: "MSTORE",
    },
    1765: {
      op: "PUSH1",
      value: "0x31",
    },
    1767: {
      op: "PUSH1",
      value: "0x24",
    },
    1769: {
      op: "DUP3",
    },
    1770: {
      op: "ADD",
    },
    1771: {
      op: "MSTORE",
    },
    1772: {
      op: "PUSH32",
      value:
        "0x45524337323155524953746F726167653A2055524920717565727920666F7220",
    },
    1805: {
      op: "PUSH1",
      value: "0x44",
    },
    1807: {
      op: "DUP3",
    },
    1808: {
      op: "ADD",
    },
    1809: {
      op: "MSTORE",
    },
    1810: {
      op: "PUSH17",
      value: "0x3737B732BC34B9BA32B73A103A37B5B2B7",
    },
    1828: {
      op: "PUSH1",
      value: "0x79",
    },
    1830: {
      op: "SHL",
    },
    1831: {
      op: "PUSH1",
      value: "0x64",
    },
    1833: {
      op: "DUP3",
    },
    1834: {
      op: "ADD",
    },
    1835: {
      op: "MSTORE",
    },
    1836: {
      op: "PUSH1",
      value: "0x84",
    },
    1838: {
      op: "ADD",
    },
    1839: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "PUSH2",
      path: "3",
      value: "0x3B6",
    },
    1842: {
      op: "JUMP",
    },
    1843: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [565, 643],
      op: "JUMPDEST",
      path: "3",
    },
    1844: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 677],
      op: "PUSH1",
      path: "3",
      value: "0x0",
    },
    1846: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "DUP3",
      path: "3",
    },
    1847: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "DUP2",
      path: "3",
    },
    1848: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "MSTORE",
      path: "3",
    },
    1849: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 690],
      op: "PUSH1",
      path: "3",
      value: "0x6",
    },
    1851: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1853: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "MSTORE",
      path: "3",
    },
    1854: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    1856: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "DUP2",
      path: "3",
    },
    1857: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [680, 699],
      op: "KECCAK256",
      path: "3",
    },
    1858: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1859: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SLOAD",
      path: "3",
    },
    1860: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x74C",
    },
    1863: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1864: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x14DB",
    },
    1867: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "i",
      offset: [654, 699],
      op: "JUMP",
      path: "3",
    },
    1868: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPDEST",
      path: "3",
    },
    1869: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1870: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x1F",
    },
    1872: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1873: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1875: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1876: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP2",
      path: "3",
    },
    1877: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DIV",
      path: "3",
    },
    1878: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MUL",
      path: "3",
    },
    1879: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1881: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1882: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    1884: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MLOAD",
      path: "3",
    },
    1885: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1886: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP2",
      path: "3",
    },
    1887: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1888: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    1890: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MSTORE",
      path: "3",
    },
    1891: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1892: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP3",
      path: "3",
    },
    1893: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP2",
      path: "3",
    },
    1894: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1895: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP2",
      path: "3",
    },
    1896: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP2",
      path: "3",
    },
    1897: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MSTORE",
      path: "3",
    },
    1898: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1900: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1901: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP3",
      path: "3",
    },
    1902: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1903: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SLOAD",
      path: "3",
    },
    1904: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x778",
    },
    1907: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1908: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x14DB",
    },
    1911: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "i",
      offset: [654, 699],
      op: "JUMP",
      path: "3",
    },
    1912: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPDEST",
      path: "3",
    },
    1913: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1914: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ISZERO",
      path: "3",
    },
    1915: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x7C5",
    },
    1918: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPI",
      path: "3",
    },
    1919: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1920: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x1F",
    },
    1922: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "LT",
      path: "3",
    },
    1923: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x79A",
    },
    1926: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPI",
      path: "3",
    },
    1927: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x100",
    },
    1930: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1931: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP4",
      path: "3",
    },
    1932: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SLOAD",
      path: "3",
    },
    1933: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DIV",
      path: "3",
    },
    1934: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MUL",
      path: "3",
    },
    1935: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP4",
      path: "3",
    },
    1936: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MSTORE",
      path: "3",
    },
    1937: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP2",
      path: "3",
    },
    1938: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1940: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1941: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP2",
      path: "3",
    },
    1942: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x7C5",
    },
    1945: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMP",
      path: "3",
    },
    1946: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPDEST",
      path: "3",
    },
    1947: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP3",
      path: "3",
    },
    1948: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1949: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP2",
      path: "3",
    },
    1950: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1951: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x0",
    },
    1953: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MSTORE",
      path: "3",
    },
    1954: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1956: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x0",
    },
    1958: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "KECCAK256",
      path: "3",
    },
    1959: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1960: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPDEST",
      path: "3",
    },
    1961: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP2",
      path: "3",
    },
    1962: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SLOAD",
      path: "3",
    },
    1963: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP2",
      path: "3",
    },
    1964: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "MSTORE",
      path: "3",
    },
    1965: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1966: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x1",
    },
    1968: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1969: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1970: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    1972: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1973: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP1",
      path: "3",
    },
    1974: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP4",
      path: "3",
    },
    1975: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "GT",
      path: "3",
    },
    1976: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH2",
      path: "3",
      value: "0x7A8",
    },
    1979: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPI",
      path: "3",
    },
    1980: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP3",
      path: "3",
    },
    1981: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1982: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SUB",
      path: "3",
    },
    1983: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "PUSH1",
      path: "3",
      value: "0x1F",
    },
    1985: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "AND",
      path: "3",
    },
    1986: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "DUP3",
      path: "3",
    },
    1987: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "ADD",
      path: "3",
    },
    1988: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP2",
      path: "3",
    },
    1989: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "JUMPDEST",
      path: "3",
    },
    1990: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "POP",
      path: "3",
    },
    1991: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "POP",
      path: "3",
    },
    1992: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "POP",
      path: "3",
    },
    1993: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "POP",
      path: "3",
    },
    1994: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "POP",
      path: "3",
    },
    1995: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "SWAP1",
      path: "3",
    },
    1996: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [654, 699],
      op: "POP",
      path: "3",
    },
    1997: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [709, 727],
      op: "PUSH1",
      path: "3",
      value: "0x0",
    },
    1999: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [730, 740],
      op: "PUSH2",
      path: "3",
      value: "0x7E3",
    },
    2002: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "PUSH1",
      path: "0",
      statement: 25,
      value: "0x40",
    },
    2004: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "DUP1",
      path: "0",
    },
    2005: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "MLOAD",
      path: "0",
    },
    2006: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2008: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "DUP2",
      path: "0",
    },
    2009: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "ADD",
      path: "0",
    },
    2010: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "SWAP1",
      path: "0",
    },
    2011: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "SWAP2",
      path: "0",
    },
    2012: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "MSTORE",
      path: "0",
    },
    2013: {
      op: "PUSH1",
      value: "0x0",
    },
    2015: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "DUP2",
      path: "0",
    },
    2016: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "MSTORE",
      path: "0",
    },
    2017: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "SWAP1",
      path: "0",
    },
    2018: {
      fn: "ERC721._baseURI",
      offset: [3373, 3465],
      op: "JUMP",
      path: "0",
    },
    2019: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [730, 740],
      op: "JUMPDEST",
      path: "3",
    },
    2020: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [709, 740],
      op: "SWAP1",
      path: "3",
    },
    2021: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [709, 740],
      op: "POP",
      path: "3",
    },
    2022: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [819, 823],
      op: "DUP1",
      path: "3",
    },
    2023: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [813, 831],
      op: "MLOAD",
      path: "3",
    },
    2024: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [835, 836],
      op: "PUSH1",
      path: "3",
      value: "0x0",
    },
    2026: {
      branch: 80,
      fn: "ERC721URIStorage.tokenURI",
      offset: [813, 836],
      op: "EQ",
      path: "3",
    },
    2027: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [809, 879],
      op: "ISZERO",
      path: "3",
    },
    2028: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [809, 879],
      op: "PUSH2",
      path: "3",
      value: "0x7F6",
    },
    2031: {
      branch: 80,
      fn: "ERC721URIStorage.tokenURI",
      offset: [809, 879],
      op: "JUMPI",
      path: "3",
    },
    2032: {
      op: "POP",
    },
    2033: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [859, 868],
      op: "SWAP3",
      path: "3",
      statement: 26,
    },
    2034: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "SWAP2",
      path: "3",
    },
    2035: {
      op: "POP",
    },
    2036: {
      op: "POP",
    },
    2037: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "o",
      offset: [467, 1130],
      op: "JUMP",
      path: "3",
    },
    2038: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [809, 879],
      op: "JUMPDEST",
      path: "3",
    },
    2039: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [981, 1004],
      op: "DUP2",
      path: "3",
    },
    2040: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [981, 1004],
      op: "MLOAD",
      path: "3",
    },
    2041: {
      branch: 81,
      fn: "ERC721URIStorage.tokenURI",
      offset: [981, 1008],
      op: "ISZERO",
      path: "3",
    },
    2042: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [977, 1083],
      op: "PUSH2",
      path: "3",
      value: "0x828",
    },
    2045: {
      branch: 81,
      fn: "ERC721URIStorage.tokenURI",
      offset: [977, 1083],
      op: "JUMPI",
      path: "3",
    },
    2046: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1055, 1059],
      op: "DUP1",
      path: "3",
      statement: 27,
    },
    2047: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1061, 1070],
      op: "DUP3",
      path: "3",
    },
    2048: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    2050: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "MLOAD",
      path: "3",
    },
    2051: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    2053: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "ADD",
      path: "3",
    },
    2054: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "PUSH2",
      path: "3",
      value: "0x810",
    },
    2057: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "SWAP3",
      path: "3",
    },
    2058: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "SWAP2",
      path: "3",
    },
    2059: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "SWAP1",
      path: "3",
    },
    2060: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "PUSH2",
      path: "3",
      value: "0x1595",
    },
    2063: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "i",
      offset: [1038, 1071],
      op: "JUMP",
      path: "3",
    },
    2064: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "JUMPDEST",
      path: "3",
    },
    2065: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    2067: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "MLOAD",
      path: "3",
    },
    2068: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    2070: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "DUP2",
      path: "3",
    },
    2071: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "DUP4",
      path: "3",
    },
    2072: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "SUB",
      path: "3",
    },
    2073: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "SUB",
      path: "3",
    },
    2074: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "DUP2",
      path: "3",
    },
    2075: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "MSTORE",
      path: "3",
    },
    2076: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "SWAP1",
      path: "3",
    },
    2077: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    2079: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1038, 1071],
      op: "MSTORE",
      path: "3",
    },
    2080: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1024, 1072],
      op: "SWAP3",
      path: "3",
    },
    2081: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1024, 1072],
      op: "POP",
      path: "3",
    },
    2082: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1024, 1072],
      op: "POP",
      path: "3",
    },
    2083: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1024, 1072],
      op: "POP",
      path: "3",
    },
    2084: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "SWAP2",
      path: "3",
    },
    2085: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "SWAP1",
      path: "3",
    },
    2086: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "POP",
      path: "3",
    },
    2087: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "o",
      offset: [467, 1130],
      op: "JUMP",
      path: "3",
    },
    2088: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [977, 1083],
      op: "JUMPDEST",
      path: "3",
    },
    2089: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1100, 1123],
      op: "PUSH2",
      path: "3",
      statement: 28,
      value: "0x831",
    },
    2092: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1115, 1122],
      op: "DUP5",
      path: "3",
    },
    2093: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1100, 1114],
      op: "PUSH2",
      path: "3",
      value: "0xCF1",
    },
    2096: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "i",
      offset: [1100, 1123],
      op: "JUMP",
      path: "3",
    },
    2097: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1100, 1123],
      op: "JUMPDEST",
      path: "3",
    },
    2098: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [1093, 1123],
      op: "SWAP5",
      path: "3",
    },
    2099: {
      fn: "ERC721URIStorage.tokenURI",
      offset: [467, 1130],
      op: "SWAP4",
      path: "3",
    },
    2100: {
      op: "POP",
    },
    2101: {
      op: "POP",
    },
    2102: {
      op: "POP",
    },
    2103: {
      op: "POP",
    },
    2104: {
      fn: "ERC721URIStorage.tokenURI",
      jump: "o",
      offset: [467, 1130],
      op: "JUMP",
      path: "3",
    },
    2105: {
      fn: "ERC721._exists",
      offset: [7144, 7269],
      op: "JUMPDEST",
      path: "0",
    },
    2106: {
      fn: "ERC721._exists",
      offset: [7209, 7213],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2108: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "SWAP1",
      path: "0",
      statement: 29,
    },
    2109: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "DUP2",
      path: "0",
    },
    2110: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "MSTORE",
      path: "0",
    },
    2111: {
      fn: "ERC721._exists",
      offset: [7232, 7239],
      op: "PUSH1",
      path: "0",
      value: "0x2",
    },
    2113: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2115: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "MSTORE",
      path: "0",
    },
    2116: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2118: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "SWAP1",
      path: "0",
    },
    2119: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "KECCAK256",
      path: "0",
    },
    2120: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "SLOAD",
      path: "0",
    },
    2121: {
      op: "PUSH1",
      value: "0x1",
    },
    2123: {
      op: "PUSH1",
      value: "0x1",
    },
    2125: {
      op: "PUSH1",
      value: "0xA0",
    },
    2127: {
      op: "SHL",
    },
    2128: {
      op: "SUB",
    },
    2129: {
      fn: "ERC721._exists",
      offset: [7232, 7248],
      op: "AND",
      path: "0",
    },
    2130: {
      fn: "ERC721._exists",
      offset: [7232, 7262],
      op: "ISZERO",
      path: "0",
    },
    2131: {
      fn: "ERC721._exists",
      offset: [7232, 7262],
      op: "ISZERO",
      path: "0",
    },
    2132: {
      fn: "ERC721._exists",
      offset: [7232, 7262],
      op: "SWAP1",
      path: "0",
    },
    2133: {
      fn: "ERC721._exists",
      jump: "o",
      offset: [7144, 7269],
      op: "JUMP",
      path: "0",
    },
    2134: {
      fn: "ERC721._approve",
      offset: [10995, 11166],
      op: "JUMPDEST",
      path: "0",
    },
    2135: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "PUSH1",
      path: "0",
      statement: 30,
      value: "0x0",
    },
    2137: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "DUP2",
      path: "0",
    },
    2138: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "DUP2",
      path: "0",
    },
    2139: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "MSTORE",
      path: "0",
    },
    2140: {
      fn: "ERC721._approve",
      offset: [11069, 11084],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    2142: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2144: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "MSTORE",
      path: "0",
    },
    2145: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2147: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "SWAP1",
      path: "0",
    },
    2148: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "KECCAK256",
      path: "0",
    },
    2149: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "DUP1",
      path: "0",
    },
    2150: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
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
      op: "NOT",
    },
    2160: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "AND",
      path: "0",
    },
    2161: {
      op: "PUSH1",
      value: "0x1",
    },
    2163: {
      op: "PUSH1",
      value: "0x1",
    },
    2165: {
      op: "PUSH1",
      value: "0xA0",
    },
    2167: {
      op: "SHL",
    },
    2168: {
      op: "SUB",
    },
    2169: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "DUP5",
      path: "0",
    },
    2170: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "AND",
      path: "0",
    },
    2171: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "SWAP1",
      path: "0",
    },
    2172: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "DUP2",
      path: "0",
    },
    2173: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "OR",
      path: "0",
    },
    2174: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "SWAP1",
      path: "0",
    },
    2175: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "SWAP2",
      path: "0",
    },
    2176: {
      fn: "ERC721._approve",
      offset: [11069, 11098],
      op: "SSTORE",
      path: "0",
    },
    2177: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "DUP2",
      path: "0",
    },
    2178: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "SWAP1",
      path: "0",
    },
    2179: {
      fn: "ERC721._approve",
      offset: [11122, 11145],
      op: "PUSH2",
      path: "0",
      statement: 31,
      value: "0x88B",
    },
    2182: {
      fn: "ERC721._approve",
      offset: [11069, 11093],
      op: "DUP3",
      path: "0",
    },
    2183: {
      fn: "ERC721._approve",
      offset: [11122, 11136],
      op: "PUSH2",
      path: "0",
      value: "0x56E",
    },
    2186: {
      fn: "ERC721._approve",
      jump: "i",
      offset: [11122, 11145],
      op: "JUMP",
      path: "0",
    },
    2187: {
      fn: "ERC721._approve",
      offset: [11122, 11145],
      op: "JUMPDEST",
      path: "0",
    },
    2188: {
      op: "PUSH1",
      value: "0x1",
    },
    2190: {
      op: "PUSH1",
      value: "0x1",
    },
    2192: {
      op: "PUSH1",
      value: "0xA0",
    },
    2194: {
      op: "SHL",
    },
    2195: {
      op: "SUB",
    },
    2196: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "AND",
      path: "0",
    },
    2197: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "PUSH32",
      path: "0",
      value:
        "0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925",
    },
    2230: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2232: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "MLOAD",
      path: "0",
    },
    2233: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2235: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "MLOAD",
      path: "0",
    },
    2236: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "DUP1",
      path: "0",
    },
    2237: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "SWAP2",
      path: "0",
    },
    2238: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "SUB",
      path: "0",
    },
    2239: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "SWAP1",
      path: "0",
    },
    2240: {
      fn: "ERC721._approve",
      offset: [11113, 11159],
      op: "LOG4",
      path: "0",
    },
    2241: {
      fn: "ERC721._approve",
      offset: [10995, 11166],
      op: "POP",
      path: "0",
    },
    2242: {
      fn: "ERC721._approve",
      offset: [10995, 11166],
      op: "POP",
      path: "0",
    },
    2243: {
      fn: "ERC721._approve",
      jump: "o",
      offset: [10995, 11166],
      op: "JUMP",
      path: "0",
    },
    2244: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7427, 7771],
      op: "JUMPDEST",
      path: "0",
    },
    2245: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7520, 7524],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2247: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7544, 7560],
      op: "PUSH2",
      path: "0",
      statement: 32,
      value: "0x8CF",
    },
    2250: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7552, 7559],
      op: "DUP3",
      path: "0",
    },
    2251: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7544, 7551],
      op: "PUSH2",
      path: "0",
      value: "0x839",
    },
    2254: {
      fn: "ERC721._isApprovedOrOwner",
      jump: "i",
      offset: [7544, 7560],
      op: "JUMP",
      path: "0",
    },
    2255: {
      branch: 69,
      fn: "ERC721._isApprovedOrOwner",
      offset: [7544, 7560],
      op: "JUMPDEST",
      path: "0",
    },
    2256: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "PUSH2",
      path: "0",
      value: "0x930",
    },
    2259: {
      branch: 69,
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "JUMPI",
      path: "0",
    },
    2260: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2262: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "MLOAD",
      path: "0",
    },
    2263: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    2267: {
      op: "PUSH1",
      value: "0xE5",
    },
    2269: {
      op: "SHL",
    },
    2270: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "DUP2",
      path: "0",
    },
    2271: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "MSTORE",
      path: "0",
    },
    2272: {
      op: "PUSH1",
      value: "0x20",
    },
    2274: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    2276: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "DUP3",
      path: "0",
    },
    2277: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "ADD",
      path: "0",
    },
    2278: {
      op: "MSTORE",
    },
    2279: {
      op: "PUSH1",
      value: "0x2C",
    },
    2281: {
      op: "PUSH1",
      value: "0x24",
    },
    2283: {
      op: "DUP3",
    },
    2284: {
      op: "ADD",
    },
    2285: {
      op: "MSTORE",
    },
    2286: {
      op: "PUSH32",
      value:
        "0x4552433732313A206F70657261746F7220717565727920666F72206E6F6E6578",
    },
    2319: {
      op: "PUSH1",
      value: "0x44",
    },
    2321: {
      op: "DUP3",
    },
    2322: {
      op: "ADD",
    },
    2323: {
      op: "MSTORE",
    },
    2324: {
      op: "PUSH12",
      value: "0x34B9BA32B73A103A37B5B2B7",
    },
    2337: {
      op: "PUSH1",
      value: "0xA1",
    },
    2339: {
      op: "SHL",
    },
    2340: {
      op: "PUSH1",
      value: "0x64",
    },
    2342: {
      op: "DUP3",
    },
    2343: {
      op: "ADD",
    },
    2344: {
      op: "MSTORE",
    },
    2345: {
      op: "PUSH1",
      value: "0x84",
    },
    2347: {
      op: "ADD",
    },
    2348: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    2351: {
      op: "JUMP",
    },
    2352: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7536, 7609],
      op: "JUMPDEST",
      path: "0",
    },
    2353: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7619, 7632],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2355: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7635, 7658],
      op: "PUSH2",
      path: "0",
      value: "0x93B",
    },
    2358: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7650, 7657],
      op: "DUP4",
      path: "0",
    },
    2359: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7635, 7649],
      op: "PUSH2",
      path: "0",
      value: "0x56E",
    },
    2362: {
      fn: "ERC721._isApprovedOrOwner",
      jump: "i",
      offset: [7635, 7658],
      op: "JUMP",
      path: "0",
    },
    2363: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7635, 7658],
      op: "JUMPDEST",
      path: "0",
    },
    2364: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7619, 7658],
      op: "SWAP1",
      path: "0",
    },
    2365: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7619, 7658],
      op: "POP",
      path: "0",
    },
    2366: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7687, 7692],
      op: "DUP1",
      path: "0",
      statement: 33,
    },
    2367: {
      op: "PUSH1",
      value: "0x1",
    },
    2369: {
      op: "PUSH1",
      value: "0x1",
    },
    2371: {
      op: "PUSH1",
      value: "0xA0",
    },
    2373: {
      op: "SHL",
    },
    2374: {
      op: "SUB",
    },
    2375: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7692],
      op: "AND",
      path: "0",
    },
    2376: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7683],
      op: "DUP5",
      path: "0",
    },
    2377: {
      op: "PUSH1",
      value: "0x1",
    },
    2379: {
      op: "PUSH1",
      value: "0x1",
    },
    2381: {
      op: "PUSH1",
      value: "0xA0",
    },
    2383: {
      op: "SHL",
    },
    2384: {
      op: "SUB",
    },
    2385: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7692],
      op: "AND",
      path: "0",
    },
    2386: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7692],
      op: "EQ",
      path: "0",
    },
    2387: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7727],
      op: "DUP1",
      path: "0",
    },
    2388: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7727],
      op: "PUSH2",
      path: "0",
      value: "0x976",
    },
    2391: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7727],
      op: "JUMPI",
      path: "0",
    },
    2392: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7727],
      op: "POP",
      path: "0",
    },
    2393: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7720, 7727],
      op: "DUP4",
      path: "0",
    },
    2394: {
      op: "PUSH1",
      value: "0x1",
    },
    2396: {
      op: "PUSH1",
      value: "0x1",
    },
    2398: {
      op: "PUSH1",
      value: "0xA0",
    },
    2400: {
      op: "SHL",
    },
    2401: {
      op: "SUB",
    },
    2402: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7696, 7727],
      op: "AND",
      path: "0",
    },
    2403: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7696, 7716],
      op: "PUSH2",
      path: "0",
      value: "0x96B",
    },
    2406: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7708, 7715],
      op: "DUP5",
      path: "0",
    },
    2407: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7696, 7707],
      op: "PUSH2",
      path: "0",
      value: "0x34E",
    },
    2410: {
      fn: "ERC721._isApprovedOrOwner",
      jump: "i",
      offset: [7696, 7716],
      op: "JUMP",
      path: "0",
    },
    2411: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7696, 7716],
      op: "JUMPDEST",
      path: "0",
    },
    2412: {
      op: "PUSH1",
      value: "0x1",
    },
    2414: {
      op: "PUSH1",
      value: "0x1",
    },
    2416: {
      op: "PUSH1",
      value: "0xA0",
    },
    2418: {
      op: "SHL",
    },
    2419: {
      op: "SUB",
    },
    2420: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7696, 7727],
      op: "AND",
      path: "0",
    },
    2421: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7696, 7727],
      op: "EQ",
      path: "0",
    },
    2422: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7727],
      op: "JUMPDEST",
      path: "0",
    },
    2423: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7763],
      op: "DUP1",
      path: "0",
    },
    2424: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7763],
      op: "PUSH2",
      path: "0",
      value: "0x831",
    },
    2427: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7676, 7763],
      op: "JUMPI",
      path: "0",
    },
    2428: {
      op: "POP",
    },
    2429: {
      op: "PUSH1",
      value: "0x1",
    },
    2431: {
      op: "PUSH1",
      value: "0x1",
    },
    2433: {
      op: "PUSH1",
      value: "0xA0",
    },
    2435: {
      op: "SHL",
    },
    2436: {
      op: "SUB",
    },
    2437: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP1",
      path: "0",
    },
    2438: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP3",
      path: "0",
    },
    2439: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "AND",
      path: "0",
    },
    2440: {
      fn: "ERC721.isApprovedForAll",
      offset: [4584, 4588],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2442: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "SWAP1",
      path: "0",
    },
    2443: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP2",
      path: "0",
    },
    2444: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "MSTORE",
      path: "0",
    },
    2445: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4625],
      op: "PUSH1",
      path: "0",
      value: "0x5",
    },
    2447: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2449: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "SWAP1",
      path: "0",
    },
    2450: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP2",
      path: "0",
    },
    2451: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "MSTORE",
      path: "0",
    },
    2452: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2454: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP1",
      path: "0",
    },
    2455: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "DUP4",
      path: "0",
    },
    2456: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4632],
      op: "KECCAK256",
      path: "0",
    },
    2457: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP4",
      path: "0",
    },
    2458: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "DUP9",
      path: "0",
    },
    2459: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "AND",
      path: "0",
    },
    2460: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "DUP4",
      path: "0",
    },
    2461: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "MSTORE",
      path: "0",
    },
    2462: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP3",
      path: "0",
    },
    2463: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SWAP1",
      path: "0",
    },
    2464: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "MSTORE",
      path: "0",
    },
    2465: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "KECCAK256",
      path: "0",
    },
    2466: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "SLOAD",
      path: "0",
    },
    2467: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "PUSH1",
      path: "0",
      value: "0xFF",
    },
    2469: {
      fn: "ERC721.isApprovedForAll",
      offset: [4607, 4642],
      op: "AND",
      path: "0",
    },
    2470: {
      fn: "ERC721._isApprovedOrOwner",
      offset: [7731, 7763],
      op: "PUSH2",
      path: "0",
      value: "0x831",
    },
    2473: {
      fn: "ERC721.isApprovedForAll",
      offset: [4487, 4649],
      op: "JUMP",
      path: "0",
    },
    2474: {
      fn: "ERC721._transfer",
      offset: [10324, 10884],
      op: "JUMPDEST",
      path: "0",
    },
    2475: {
      fn: "ERC721._transfer",
      offset: [10478, 10482],
      op: "DUP3",
      path: "0",
      statement: 34,
    },
    2476: {
      op: "PUSH1",
      value: "0x1",
    },
    2478: {
      op: "PUSH1",
      value: "0x1",
    },
    2480: {
      op: "PUSH1",
      value: "0xA0",
    },
    2482: {
      op: "SHL",
    },
    2483: {
      op: "SUB",
    },
    2484: {
      fn: "ERC721._transfer",
      offset: [10451, 10482],
      op: "AND",
      path: "0",
    },
    2485: {
      fn: "ERC721._transfer",
      offset: [10451, 10474],
      op: "PUSH2",
      path: "0",
      value: "0x9BD",
    },
    2488: {
      fn: "ERC721._transfer",
      offset: [10466, 10473],
      op: "DUP3",
      path: "0",
    },
    2489: {
      fn: "ERC721._transfer",
      offset: [10451, 10465],
      op: "PUSH2",
      path: "0",
      value: "0x56E",
    },
    2492: {
      fn: "ERC721._transfer",
      jump: "i",
      offset: [10451, 10474],
      op: "JUMP",
      path: "0",
    },
    2493: {
      fn: "ERC721._transfer",
      offset: [10451, 10474],
      op: "JUMPDEST",
      path: "0",
    },
    2494: {
      op: "PUSH1",
      value: "0x1",
    },
    2496: {
      op: "PUSH1",
      value: "0x1",
    },
    2498: {
      op: "PUSH1",
      value: "0xA0",
    },
    2500: {
      op: "SHL",
    },
    2501: {
      op: "SUB",
    },
    2502: {
      fn: "ERC721._transfer",
      offset: [10451, 10482],
      op: "AND",
      path: "0",
    },
    2503: {
      branch: 70,
      fn: "ERC721._transfer",
      offset: [10451, 10482],
      op: "EQ",
      path: "0",
    },
    2504: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "PUSH2",
      path: "0",
      value: "0xA25",
    },
    2507: {
      branch: 70,
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "JUMPI",
      path: "0",
    },
    2508: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2510: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "MLOAD",
      path: "0",
    },
    2511: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    2515: {
      op: "PUSH1",
      value: "0xE5",
    },
    2517: {
      op: "SHL",
    },
    2518: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "DUP2",
      path: "0",
    },
    2519: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "MSTORE",
      path: "0",
    },
    2520: {
      op: "PUSH1",
      value: "0x20",
    },
    2522: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    2524: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "DUP3",
      path: "0",
    },
    2525: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "ADD",
      path: "0",
    },
    2526: {
      op: "MSTORE",
    },
    2527: {
      op: "PUSH1",
      value: "0x29",
    },
    2529: {
      op: "PUSH1",
      value: "0x24",
    },
    2531: {
      op: "DUP3",
    },
    2532: {
      op: "ADD",
    },
    2533: {
      op: "MSTORE",
    },
    2534: {
      op: "PUSH32",
      value:
        "0x4552433732313A207472616E73666572206F6620746F6B656E20746861742069",
    },
    2567: {
      op: "PUSH1",
      value: "0x44",
    },
    2569: {
      op: "DUP3",
    },
    2570: {
      op: "ADD",
    },
    2571: {
      op: "MSTORE",
    },
    2572: {
      op: "PUSH9",
      value: "0x39903737BA1037BBB7",
    },
    2582: {
      op: "PUSH1",
      value: "0xB9",
    },
    2584: {
      op: "SHL",
    },
    2585: {
      op: "PUSH1",
      value: "0x64",
    },
    2587: {
      op: "DUP3",
    },
    2588: {
      op: "ADD",
    },
    2589: {
      op: "MSTORE",
    },
    2590: {
      op: "PUSH1",
      value: "0x84",
    },
    2592: {
      op: "ADD",
    },
    2593: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    2596: {
      op: "JUMP",
    },
    2597: {
      fn: "ERC721._transfer",
      offset: [10443, 10528],
      op: "JUMPDEST",
      path: "0",
    },
    2598: {
      op: "PUSH1",
      value: "0x1",
    },
    2600: {
      op: "PUSH1",
      value: "0x1",
    },
    2602: {
      op: "PUSH1",
      value: "0xA0",
    },
    2604: {
      op: "SHL",
    },
    2605: {
      op: "SUB",
    },
    2606: {
      fn: "ERC721._transfer",
      offset: [10546, 10562],
      op: "DUP3",
      path: "0",
      statement: 35,
    },
    2607: {
      branch: 71,
      fn: "ERC721._transfer",
      offset: [10546, 10562],
      op: "AND",
      path: "0",
    },
    2608: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "PUSH2",
      path: "0",
      value: "0xA87",
    },
    2611: {
      branch: 71,
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "JUMPI",
      path: "0",
    },
    2612: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2614: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "MLOAD",
      path: "0",
    },
    2615: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    2619: {
      op: "PUSH1",
      value: "0xE5",
    },
    2621: {
      op: "SHL",
    },
    2622: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "DUP2",
      path: "0",
    },
    2623: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "MSTORE",
      path: "0",
    },
    2624: {
      op: "PUSH1",
      value: "0x20",
    },
    2626: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    2628: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "DUP3",
      path: "0",
    },
    2629: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "ADD",
      path: "0",
    },
    2630: {
      op: "MSTORE",
    },
    2631: {
      op: "PUSH1",
      value: "0x24",
    },
    2633: {
      op: "DUP1",
    },
    2634: {
      op: "DUP3",
    },
    2635: {
      op: "ADD",
    },
    2636: {
      op: "MSTORE",
    },
    2637: {
      op: "PUSH32",
      value:
        "0x4552433732313A207472616E7366657220746F20746865207A65726F20616464",
    },
    2670: {
      op: "PUSH1",
      value: "0x44",
    },
    2672: {
      op: "DUP3",
    },
    2673: {
      op: "ADD",
    },
    2674: {
      op: "MSTORE",
    },
    2675: {
      op: "PUSH4",
      value: "0x72657373",
    },
    2680: {
      op: "PUSH1",
      value: "0xE0",
    },
    2682: {
      op: "SHL",
    },
    2683: {
      op: "PUSH1",
      value: "0x64",
    },
    2685: {
      op: "DUP3",
    },
    2686: {
      op: "ADD",
    },
    2687: {
      op: "MSTORE",
    },
    2688: {
      op: "PUSH1",
      value: "0x84",
    },
    2690: {
      op: "ADD",
    },
    2691: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    2694: {
      op: "JUMP",
    },
    2695: {
      fn: "ERC721._transfer",
      offset: [10538, 10603],
      op: "JUMPDEST",
      path: "0",
    },
    2696: {
      fn: "ERC721._transfer",
      offset: [10715, 10744],
      op: "PUSH2",
      path: "0",
      statement: 36,
      value: "0xA92",
    },
    2699: {
      fn: "ERC721._transfer",
      offset: [10732, 10733],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2701: {
      fn: "ERC721._transfer",
      offset: [10736, 10743],
      op: "DUP3",
      path: "0",
    },
    2702: {
      fn: "ERC721._transfer",
      offset: [10715, 10723],
      op: "PUSH2",
      path: "0",
      value: "0x856",
    },
    2705: {
      fn: "ERC721._transfer",
      jump: "i",
      offset: [10715, 10744],
      op: "JUMP",
      path: "0",
    },
    2706: {
      fn: "ERC721._transfer",
      offset: [10715, 10744],
      op: "JUMPDEST",
      path: "0",
    },
    2707: {
      op: "PUSH1",
      value: "0x1",
    },
    2709: {
      op: "PUSH1",
      value: "0x1",
    },
    2711: {
      op: "PUSH1",
      value: "0xA0",
    },
    2713: {
      op: "SHL",
    },
    2714: {
      op: "SUB",
    },
    2715: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "DUP4",
      path: "0",
      statement: 37,
    },
    2716: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "AND",
      path: "0",
    },
    2717: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2719: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "SWAP1",
      path: "0",
    },
    2720: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "DUP2",
      path: "0",
    },
    2721: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "MSTORE",
      path: "0",
    },
    2722: {
      fn: "ERC721._transfer",
      offset: [10755, 10764],
      op: "PUSH1",
      path: "0",
      value: "0x3",
    },
    2724: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2726: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "MSTORE",
      path: "0",
    },
    2727: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2729: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "DUP2",
      path: "0",
    },
    2730: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "KECCAK256",
      path: "0",
    },
    2731: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "DUP1",
      path: "0",
    },
    2732: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "SLOAD",
      path: "0",
    },
    2733: {
      fn: "ERC721._transfer",
      offset: [10774, 10775],
      op: "PUSH1",
      path: "0",
      value: "0x1",
    },
    2735: {
      fn: "ERC721._transfer",
      offset: [10774, 10775],
      op: "SWAP3",
      path: "0",
    },
    2736: {
      fn: "ERC721._transfer",
      offset: [10755, 10770],
      op: "SWAP1",
      path: "0",
    },
    2737: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "PUSH2",
      path: "0",
      value: "0xABB",
    },
    2740: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "SWAP1",
      path: "0",
    },
    2741: {
      fn: "ERC721._transfer",
      offset: [10774, 10775],
      op: "DUP5",
      path: "0",
    },
    2742: {
      fn: "ERC721._transfer",
      offset: [10774, 10775],
      op: "SWAP1",
      path: "0",
    },
    2743: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "PUSH2",
      path: "0",
      value: "0x15C4",
    },
    2746: {
      fn: "ERC721._transfer",
      jump: "i",
      offset: [10755, 10775],
      op: "JUMP",
      path: "0",
    },
    2747: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "JUMPDEST",
      path: "0",
    },
    2748: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "SWAP1",
      path: "0",
    },
    2749: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "SWAP2",
      path: "0",
    },
    2750: {
      fn: "ERC721._transfer",
      offset: [10755, 10775],
      op: "SSTORE",
      path: "0",
    },
    2751: {
      op: "POP",
    },
    2752: {
      op: "POP",
    },
    2753: {
      op: "PUSH1",
      value: "0x1",
    },
    2755: {
      op: "PUSH1",
      value: "0x1",
    },
    2757: {
      op: "PUSH1",
      value: "0xA0",
    },
    2759: {
      op: "SHL",
    },
    2760: {
      op: "SUB",
    },
    2761: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "DUP3",
      path: "0",
      statement: 38,
    },
    2762: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "AND",
      path: "0",
    },
    2763: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2765: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "SWAP1",
      path: "0",
    },
    2766: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "DUP2",
      path: "0",
    },
    2767: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "MSTORE",
      path: "0",
    },
    2768: {
      fn: "ERC721._transfer",
      offset: [10785, 10794],
      op: "PUSH1",
      path: "0",
      value: "0x3",
    },
    2770: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2772: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "MSTORE",
      path: "0",
    },
    2773: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2775: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "DUP2",
      path: "0",
    },
    2776: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "KECCAK256",
      path: "0",
    },
    2777: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "DUP1",
      path: "0",
    },
    2778: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "SLOAD",
      path: "0",
    },
    2779: {
      fn: "ERC721._transfer",
      offset: [10802, 10803],
      op: "PUSH1",
      path: "0",
      value: "0x1",
    },
    2781: {
      fn: "ERC721._transfer",
      offset: [10802, 10803],
      op: "SWAP3",
      path: "0",
    },
    2782: {
      fn: "ERC721._transfer",
      offset: [10785, 10798],
      op: "SWAP1",
      path: "0",
    },
    2783: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "PUSH2",
      path: "0",
      value: "0xAE9",
    },
    2786: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "SWAP1",
      path: "0",
    },
    2787: {
      fn: "ERC721._transfer",
      offset: [10802, 10803],
      op: "DUP5",
      path: "0",
    },
    2788: {
      fn: "ERC721._transfer",
      offset: [10802, 10803],
      op: "SWAP1",
      path: "0",
    },
    2789: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "PUSH2",
      path: "0",
      value: "0x157D",
    },
    2792: {
      fn: "ERC721._transfer",
      jump: "i",
      offset: [10785, 10803],
      op: "JUMP",
      path: "0",
    },
    2793: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "JUMPDEST",
      path: "0",
    },
    2794: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "SWAP1",
      path: "0",
    },
    2795: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "SWAP2",
      path: "0",
    },
    2796: {
      fn: "ERC721._transfer",
      offset: [10785, 10803],
      op: "SSTORE",
      path: "0",
    },
    2797: {
      op: "POP",
    },
    2798: {
      op: "POP",
    },
    2799: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "PUSH1",
      path: "0",
      statement: 39,
      value: "0x0",
    },
    2801: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "DUP2",
      path: "0",
    },
    2802: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "DUP2",
      path: "0",
    },
    2803: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "MSTORE",
      path: "0",
    },
    2804: {
      fn: "ERC721._transfer",
      offset: [10813, 10820],
      op: "PUSH1",
      path: "0",
      value: "0x2",
    },
    2806: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2808: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "MSTORE",
      path: "0",
    },
    2809: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2811: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "DUP1",
      path: "0",
    },
    2812: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "DUP3",
      path: "0",
    },
    2813: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "KECCAK256",
      path: "0",
    },
    2814: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "DUP1",
      path: "0",
    },
    2815: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "SLOAD",
      path: "0",
    },
    2816: {
      op: "PUSH1",
      value: "0x1",
    },
    2818: {
      op: "PUSH1",
      value: "0x1",
    },
    2820: {
      op: "PUSH1",
      value: "0xA0",
    },
    2822: {
      op: "SHL",
    },
    2823: {
      op: "SUB",
    },
    2824: {
      op: "NOT",
    },
    2825: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "AND",
      path: "0",
    },
    2826: {
      op: "PUSH1",
      value: "0x1",
    },
    2828: {
      op: "PUSH1",
      value: "0x1",
    },
    2830: {
      op: "PUSH1",
      value: "0xA0",
    },
    2832: {
      op: "SHL",
    },
    2833: {
      op: "SUB",
    },
    2834: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "DUP7",
      path: "0",
    },
    2835: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "DUP2",
      path: "0",
    },
    2836: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "AND",
      path: "0",
    },
    2837: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "SWAP2",
      path: "0",
    },
    2838: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "DUP3",
      path: "0",
    },
    2839: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "OR",
      path: "0",
    },
    2840: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "SWAP1",
      path: "0",
    },
    2841: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "SWAP3",
      path: "0",
    },
    2842: {
      fn: "ERC721._transfer",
      offset: [10813, 10834],
      op: "SSTORE",
      path: "0",
    },
    2843: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "SWAP2",
      path: "0",
      statement: 40,
    },
    2844: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "MLOAD",
      path: "0",
    },
    2845: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "DUP5",
      path: "0",
    },
    2846: {
      fn: "ERC721._transfer",
      offset: [10813, 10829],
      op: "SWAP4",
      path: "0",
    },
    2847: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "SWAP2",
      path: "0",
    },
    2848: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "DUP8",
      path: "0",
    },
    2849: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "AND",
      path: "0",
    },
    2850: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "SWAP2",
      path: "0",
    },
    2851: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "PUSH32",
      path: "0",
      value:
        "0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF",
    },
    2884: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "SWAP2",
      path: "0",
    },
    2885: {
      fn: "ERC721._transfer",
      offset: [10850, 10877],
      op: "LOG4",
      path: "0",
    },
    2886: {
      fn: "ERC721._transfer",
      offset: [10324, 10884],
      op: "POP",
      path: "0",
    },
    2887: {
      fn: "ERC721._transfer",
      offset: [10324, 10884],
      op: "POP",
      path: "0",
    },
    2888: {
      fn: "ERC721._transfer",
      offset: [10324, 10884],
      op: "POP",
      path: "0",
    },
    2889: {
      fn: "ERC721._transfer",
      jump: "o",
      offset: [10324, 10884],
      op: "JUMP",
      path: "0",
    },
    2890: {
      fn: "ERC721._safeMint",
      offset: [8101, 8209],
      op: "JUMPDEST",
      path: "0",
    },
    2891: {
      fn: "ERC721._safeMint",
      offset: [8176, 8202],
      op: "PUSH2",
      path: "0",
      statement: 41,
      value: "0x686",
    },
    2894: {
      fn: "ERC721._safeMint",
      offset: [8186, 8188],
      op: "DUP3",
      path: "0",
    },
    2895: {
      fn: "ERC721._safeMint",
      offset: [8190, 8197],
      op: "DUP3",
      path: "0",
    },
    2896: {
      fn: "ERC721._safeMint",
      offset: [8176, 8202],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2898: {
      fn: "ERC721._safeMint",
      offset: [8176, 8202],
      op: "MLOAD",
      path: "0",
    },
    2899: {
      fn: "ERC721._safeMint",
      offset: [8176, 8202],
      op: "DUP1",
      path: "0",
    },
    2900: {
      fn: "ERC721._safeMint",
      offset: [8176, 8202],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    2902: {
      fn: "ERC721._safeMint",
      offset: [8176, 8202],
      op: "ADD",
      path: "0",
    },
    2903: {
      fn: "ERC721._safeMint",
      offset: [8176, 8202],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    2905: {
      fn: "ERC721._safeMint",
      offset: [8176, 8202],
      op: "MSTORE",
      path: "0",
    },
    2906: {
      fn: "ERC721._safeMint",
      offset: [8176, 8202],
      op: "DUP1",
      path: "0",
    },
    2907: {
      fn: "ERC721._safeMint",
      offset: [8176, 8202],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    2909: {
      fn: "ERC721._safeMint",
      offset: [8176, 8202],
      op: "DUP2",
      path: "0",
    },
    2910: {
      fn: "ERC721._safeMint",
      offset: [8176, 8202],
      op: "MSTORE",
      path: "0",
    },
    2911: {
      fn: "ERC721._safeMint",
      offset: [8176, 8202],
      op: "POP",
      path: "0",
    },
    2912: {
      fn: "ERC721._safeMint",
      offset: [8176, 8185],
      op: "PUSH2",
      path: "0",
      value: "0xDC9",
    },
    2915: {
      fn: "ERC721._safeMint",
      jump: "i",
      offset: [8176, 8202],
      op: "JUMP",
      path: "0",
    },
    2916: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1277, 1491],
      op: "JUMPDEST",
      path: "3",
    },
    2917: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1376, 1392],
      op: "PUSH2",
      path: "3",
      statement: 42,
      value: "0xB6D",
    },
    2920: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1384, 1391],
      op: "DUP3",
      path: "3",
    },
    2921: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1376, 1383],
      op: "PUSH2",
      path: "3",
      value: "0x839",
    },
    2924: {
      fn: "ERC721URIStorage._setTokenURI",
      jump: "i",
      offset: [1376, 1392],
      op: "JUMP",
      path: "3",
    },
    2925: {
      branch: 82,
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1376, 1392],
      op: "JUMPDEST",
      path: "3",
    },
    2926: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1368, 1443],
      op: "PUSH2",
      path: "3",
      value: "0xBD0",
    },
    2929: {
      branch: 82,
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1368, 1443],
      op: "JUMPI",
      path: "3",
    },
    2930: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1368, 1443],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    2932: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1368, 1443],
      op: "MLOAD",
      path: "3",
    },
    2933: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    2937: {
      op: "PUSH1",
      value: "0xE5",
    },
    2939: {
      op: "SHL",
    },
    2940: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1368, 1443],
      op: "DUP2",
      path: "3",
    },
    2941: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1368, 1443],
      op: "MSTORE",
      path: "3",
    },
    2942: {
      op: "PUSH1",
      value: "0x20",
    },
    2944: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1368, 1443],
      op: "PUSH1",
      path: "3",
      value: "0x4",
    },
    2946: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1368, 1443],
      op: "DUP3",
      path: "3",
    },
    2947: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1368, 1443],
      op: "ADD",
      path: "3",
    },
    2948: {
      op: "MSTORE",
    },
    2949: {
      op: "PUSH1",
      value: "0x2E",
    },
    2951: {
      op: "PUSH1",
      value: "0x24",
    },
    2953: {
      op: "DUP3",
    },
    2954: {
      op: "ADD",
    },
    2955: {
      op: "MSTORE",
    },
    2956: {
      op: "PUSH32",
      value:
        "0x45524337323155524953746F726167653A2055524920736574206F66206E6F6E",
    },
    2989: {
      op: "PUSH1",
      value: "0x44",
    },
    2991: {
      op: "DUP3",
    },
    2992: {
      op: "ADD",
    },
    2993: {
      op: "MSTORE",
    },
    2994: {
      op: "PUSH14",
      value: "0x32BC34B9BA32B73A103A37B5B2B7",
    },
    3009: {
      op: "PUSH1",
      value: "0x91",
    },
    3011: {
      op: "SHL",
    },
    3012: {
      op: "PUSH1",
      value: "0x64",
    },
    3014: {
      op: "DUP3",
    },
    3015: {
      op: "ADD",
    },
    3016: {
      op: "MSTORE",
    },
    3017: {
      op: "PUSH1",
      value: "0x84",
    },
    3019: {
      op: "ADD",
    },
    3020: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1368, 1443],
      op: "PUSH2",
      path: "3",
      value: "0x3B6",
    },
    3023: {
      op: "JUMP",
    },
    3024: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1368, 1443],
      op: "JUMPDEST",
      path: "3",
    },
    3025: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1472],
      op: "PUSH1",
      path: "3",
      statement: 43,
      value: "0x0",
    },
    3027: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1472],
      op: "DUP3",
      path: "3",
    },
    3028: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1472],
      op: "DUP2",
      path: "3",
    },
    3029: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1472],
      op: "MSTORE",
      path: "3",
    },
    3030: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1463],
      op: "PUSH1",
      path: "3",
      value: "0x6",
    },
    3032: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1472],
      op: "PUSH1",
      path: "3",
      value: "0x20",
    },
    3034: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1472],
      op: "SWAP1",
      path: "3",
    },
    3035: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1472],
      op: "DUP2",
      path: "3",
    },
    3036: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1472],
      op: "MSTORE",
      path: "3",
    },
    3037: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1472],
      op: "PUSH1",
      path: "3",
      value: "0x40",
    },
    3039: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1472],
      op: "SWAP1",
      path: "3",
    },
    3040: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1472],
      op: "SWAP2",
      path: "3",
    },
    3041: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1472],
      op: "KECCAK256",
      path: "3",
    },
    3042: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1484],
      op: "DUP3",
      path: "3",
    },
    3043: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1484],
      op: "MLOAD",
      path: "3",
    },
    3044: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1484],
      op: "PUSH2",
      path: "3",
      value: "0x4EC",
    },
    3047: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1484],
      op: "SWAP3",
      path: "3",
    },
    3048: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1484],
      op: "DUP5",
      path: "3",
    },
    3049: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1484],
      op: "ADD",
      path: "3",
    },
    3050: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1484],
      op: "SWAP1",
      path: "3",
    },
    3051: {
      fn: "ERC721URIStorage._setTokenURI",
      offset: [1453, 1484],
      op: "PUSH2",
      path: "3",
      value: "0x112B",
    },
    3054: {
      fn: "ERC721URIStorage._setTokenURI",
      jump: "i",
      offset: [1453, 1484],
      op: "JUMP",
      path: "3",
    },
    3055: {
      fn: "ERC721._setApprovalForAll",
      offset: [11301, 11608],
      op: "JUMPDEST",
      path: "0",
    },
    3056: {
      fn: "ERC721._setApprovalForAll",
      offset: [11451, 11459],
      op: "DUP2",
      path: "0",
      statement: 44,
    },
    3057: {
      op: "PUSH1",
      value: "0x1",
    },
    3059: {
      op: "PUSH1",
      value: "0x1",
    },
    3061: {
      op: "PUSH1",
      value: "0xA0",
    },
    3063: {
      op: "SHL",
    },
    3064: {
      op: "SUB",
    },
    3065: {
      fn: "ERC721._setApprovalForAll",
      offset: [11442, 11459],
      op: "AND",
      path: "0",
    },
    3066: {
      fn: "ERC721._setApprovalForAll",
      offset: [11442, 11447],
      op: "DUP4",
      path: "0",
    },
    3067: {
      op: "PUSH1",
      value: "0x1",
    },
    3069: {
      op: "PUSH1",
      value: "0x1",
    },
    3071: {
      op: "PUSH1",
      value: "0xA0",
    },
    3073: {
      op: "SHL",
    },
    3074: {
      op: "SUB",
    },
    3075: {
      fn: "ERC721._setApprovalForAll",
      offset: [11442, 11459],
      op: "AND",
      path: "0",
    },
    3076: {
      fn: "ERC721._setApprovalForAll",
      offset: [11442, 11459],
      op: "EQ",
      path: "0",
    },
    3077: {
      branch: 72,
      fn: "ERC721._setApprovalForAll",
      offset: [11442, 11459],
      op: "ISZERO",
      path: "0",
    },
    3078: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "PUSH2",
      path: "0",
      value: "0xC51",
    },
    3081: {
      branch: 72,
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "JUMPI",
      path: "0",
    },
    3082: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3084: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "MLOAD",
      path: "0",
    },
    3085: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    3089: {
      op: "PUSH1",
      value: "0xE5",
    },
    3091: {
      op: "SHL",
    },
    3092: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "DUP2",
      path: "0",
    },
    3093: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "MSTORE",
      path: "0",
    },
    3094: {
      op: "PUSH1",
      value: "0x20",
    },
    3096: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    3098: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "DUP3",
      path: "0",
    },
    3099: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "ADD",
      path: "0",
    },
    3100: {
      op: "MSTORE",
    },
    3101: {
      op: "PUSH1",
      value: "0x19",
    },
    3103: {
      op: "PUSH1",
      value: "0x24",
    },
    3105: {
      op: "DUP3",
    },
    3106: {
      op: "ADD",
    },
    3107: {
      op: "MSTORE",
    },
    3108: {
      op: "PUSH32",
      value:
        "0x4552433732313A20617070726F766520746F2063616C6C657200000000000000",
    },
    3141: {
      op: "PUSH1",
      value: "0x44",
    },
    3143: {
      op: "DUP3",
    },
    3144: {
      op: "ADD",
    },
    3145: {
      op: "MSTORE",
    },
    3146: {
      op: "PUSH1",
      value: "0x64",
    },
    3148: {
      op: "ADD",
    },
    3149: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    3152: {
      op: "JUMP",
    },
    3153: {
      fn: "ERC721._setApprovalForAll",
      offset: [11434, 11489],
      op: "JUMPDEST",
      path: "0",
    },
    3154: {
      op: "PUSH1",
      value: "0x1",
    },
    3156: {
      op: "PUSH1",
      value: "0x1",
    },
    3158: {
      op: "PUSH1",
      value: "0xA0",
    },
    3160: {
      op: "SHL",
    },
    3161: {
      op: "SUB",
    },
    3162: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "DUP4",
      path: "0",
      statement: 45,
    },
    3163: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "DUP2",
      path: "0",
    },
    3164: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "AND",
      path: "0",
    },
    3165: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    3167: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "DUP2",
      path: "0",
    },
    3168: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "DUP2",
      path: "0",
    },
    3169: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "MSTORE",
      path: "0",
    },
    3170: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11517],
      op: "PUSH1",
      path: "0",
      value: "0x5",
    },
    3172: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3174: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "SWAP1",
      path: "0",
    },
    3175: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "DUP2",
      path: "0",
    },
    3176: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "MSTORE",
      path: "0",
    },
    3177: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3179: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "DUP1",
      path: "0",
    },
    3180: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "DUP4",
      path: "0",
    },
    3181: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11524],
      op: "KECCAK256",
      path: "0",
    },
    3182: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "SWAP5",
      path: "0",
    },
    3183: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "DUP8",
      path: "0",
    },
    3184: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "AND",
      path: "0",
    },
    3185: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "DUP1",
      path: "0",
    },
    3186: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "DUP5",
      path: "0",
    },
    3187: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "MSTORE",
      path: "0",
    },
    3188: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "SWAP5",
      path: "0",
    },
    3189: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "DUP3",
      path: "0",
    },
    3190: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "MSTORE",
      path: "0",
    },
    3191: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "SWAP2",
      path: "0",
    },
    3192: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "DUP3",
      path: "0",
    },
    3193: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "SWAP1",
      path: "0",
    },
    3194: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11534],
      op: "KECCAK256",
      path: "0",
    },
    3195: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "DUP1",
      path: "0",
    },
    3196: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "SLOAD",
      path: "0",
    },
    3197: {
      op: "PUSH1",
      value: "0xFF",
    },
    3199: {
      op: "NOT",
    },
    3200: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "AND",
      path: "0",
    },
    3201: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "DUP7",
      path: "0",
    },
    3202: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "ISZERO",
      path: "0",
    },
    3203: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "ISZERO",
      path: "0",
    },
    3204: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "SWAP1",
      path: "0",
    },
    3205: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "DUP2",
      path: "0",
    },
    3206: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "OR",
      path: "0",
    },
    3207: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "SWAP1",
      path: "0",
    },
    3208: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "SWAP2",
      path: "0",
    },
    3209: {
      fn: "ERC721._setApprovalForAll",
      offset: [11499, 11545],
      op: "SSTORE",
      path: "0",
    },
    3210: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "SWAP2",
      path: "0",
      statement: 46,
    },
    3211: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "MLOAD",
      path: "0",
    },
    3212: {
      op: "SWAP2",
    },
    3213: {
      op: "DUP3",
    },
    3214: {
      op: "MSTORE",
    },
    3215: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "PUSH32",
      path: "0",
      value:
        "0x17307EAB39AB6107E8899845AD3D59BD9653F200F220920489CA2B5937696C31",
    },
    3248: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "SWAP2",
      path: "0",
    },
    3249: {
      op: "ADD",
    },
    3250: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3252: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "MLOAD",
      path: "0",
    },
    3253: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "DUP1",
      path: "0",
    },
    3254: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "SWAP2",
      path: "0",
    },
    3255: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "SUB",
      path: "0",
    },
    3256: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "SWAP1",
      path: "0",
    },
    3257: {
      fn: "ERC721._setApprovalForAll",
      offset: [11560, 11601],
      op: "LOG3",
      path: "0",
    },
    3258: {
      fn: "ERC721._setApprovalForAll",
      offset: [11301, 11608],
      op: "POP",
      path: "0",
    },
    3259: {
      fn: "ERC721._setApprovalForAll",
      offset: [11301, 11608],
      op: "POP",
      path: "0",
    },
    3260: {
      fn: "ERC721._setApprovalForAll",
      offset: [11301, 11608],
      op: "POP",
      path: "0",
    },
    3261: {
      fn: "ERC721._setApprovalForAll",
      jump: "o",
      offset: [11301, 11608],
      op: "JUMP",
      path: "0",
    },
    3262: {
      fn: "ERC721._safeTransfer",
      offset: [6534, 6841],
      op: "JUMPDEST",
      path: "0",
    },
    3263: {
      fn: "ERC721._safeTransfer",
      offset: [6685, 6713],
      op: "PUSH2",
      path: "0",
      statement: 47,
      value: "0xCC9",
    },
    3266: {
      fn: "ERC721._safeTransfer",
      offset: [6695, 6699],
      op: "DUP5",
      path: "0",
    },
    3267: {
      fn: "ERC721._safeTransfer",
      offset: [6701, 6703],
      op: "DUP5",
      path: "0",
    },
    3268: {
      fn: "ERC721._safeTransfer",
      offset: [6705, 6712],
      op: "DUP5",
      path: "0",
    },
    3269: {
      fn: "ERC721._safeTransfer",
      offset: [6685, 6694],
      op: "PUSH2",
      path: "0",
      value: "0x9AA",
    },
    3272: {
      fn: "ERC721._safeTransfer",
      jump: "i",
      offset: [6685, 6713],
      op: "JUMP",
      path: "0",
    },
    3273: {
      fn: "ERC721._safeTransfer",
      offset: [6685, 6713],
      op: "JUMPDEST",
      path: "0",
    },
    3274: {
      fn: "ERC721._safeTransfer",
      offset: [6731, 6779],
      op: "PUSH2",
      path: "0",
      statement: 48,
      value: "0xCD5",
    },
    3277: {
      fn: "ERC721._safeTransfer",
      offset: [6754, 6758],
      op: "DUP5",
      path: "0",
    },
    3278: {
      fn: "ERC721._safeTransfer",
      offset: [6760, 6762],
      op: "DUP5",
      path: "0",
    },
    3279: {
      fn: "ERC721._safeTransfer",
      offset: [6764, 6771],
      op: "DUP5",
      path: "0",
    },
    3280: {
      fn: "ERC721._safeTransfer",
      offset: [6773, 6778],
      op: "DUP5",
      path: "0",
    },
    3281: {
      fn: "ERC721._safeTransfer",
      offset: [6731, 6753],
      op: "PUSH2",
      path: "0",
      value: "0xDFC",
    },
    3284: {
      fn: "ERC721._safeTransfer",
      jump: "i",
      offset: [6731, 6779],
      op: "JUMP",
      path: "0",
    },
    3285: {
      branch: 73,
      fn: "ERC721._safeTransfer",
      offset: [6731, 6779],
      op: "JUMPDEST",
      path: "0",
    },
    3286: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "PUSH2",
      path: "0",
      value: "0x6BC",
    },
    3289: {
      branch: 73,
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "JUMPI",
      path: "0",
    },
    3290: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3292: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "MLOAD",
      path: "0",
    },
    3293: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    3297: {
      op: "PUSH1",
      value: "0xE5",
    },
    3299: {
      op: "SHL",
    },
    3300: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "DUP2",
      path: "0",
    },
    3301: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "MSTORE",
      path: "0",
    },
    3302: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    3304: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "ADD",
      path: "0",
    },
    3305: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    3308: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "SWAP1",
      path: "0",
    },
    3309: {
      fn: "ERC721._safeTransfer",
      offset: [6723, 6834],
      op: "PUSH2",
      path: "0",
      value: "0x15DB",
    },
    3312: {
      fn: "ERC721._safeTransfer",
      jump: "i",
      offset: [6723, 6834],
      op: "JUMP",
      path: "0",
    },
    3313: {
      fn: "ERC721.tokenURI",
      offset: [2803, 3132],
      op: "JUMPDEST",
      path: "0",
    },
    3314: {
      fn: "ERC721.tokenURI",
      offset: [2876, 2889],
      op: "PUSH1",
      path: "0",
      value: "0x60",
    },
    3316: {
      fn: "ERC721.tokenURI",
      offset: [2909, 2925],
      op: "PUSH2",
      path: "0",
      statement: 49,
      value: "0xCFC",
    },
    3319: {
      fn: "ERC721.tokenURI",
      offset: [2917, 2924],
      op: "DUP3",
      path: "0",
    },
    3320: {
      fn: "ERC721.tokenURI",
      offset: [2909, 2916],
      op: "PUSH2",
      path: "0",
      value: "0x839",
    },
    3323: {
      fn: "ERC721.tokenURI",
      jump: "i",
      offset: [2909, 2925],
      op: "JUMP",
      path: "0",
    },
    3324: {
      branch: 74,
      fn: "ERC721.tokenURI",
      offset: [2909, 2925],
      op: "JUMPDEST",
      path: "0",
    },
    3325: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "PUSH2",
      path: "0",
      value: "0xD60",
    },
    3328: {
      branch: 74,
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "JUMPI",
      path: "0",
    },
    3329: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3331: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "MLOAD",
      path: "0",
    },
    3332: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    3336: {
      op: "PUSH1",
      value: "0xE5",
    },
    3338: {
      op: "SHL",
    },
    3339: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "DUP2",
      path: "0",
    },
    3340: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "MSTORE",
      path: "0",
    },
    3341: {
      op: "PUSH1",
      value: "0x20",
    },
    3343: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    3345: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "DUP3",
      path: "0",
    },
    3346: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "ADD",
      path: "0",
    },
    3347: {
      op: "MSTORE",
    },
    3348: {
      op: "PUSH1",
      value: "0x2F",
    },
    3350: {
      op: "PUSH1",
      value: "0x24",
    },
    3352: {
      op: "DUP3",
    },
    3353: {
      op: "ADD",
    },
    3354: {
      op: "MSTORE",
    },
    3355: {
      op: "PUSH32",
      value:
        "0x4552433732314D657461646174613A2055524920717565727920666F72206E6F",
    },
    3388: {
      op: "PUSH1",
      value: "0x44",
    },
    3390: {
      op: "DUP3",
    },
    3391: {
      op: "ADD",
    },
    3392: {
      op: "MSTORE",
    },
    3393: {
      op: "PUSH15",
      value: "0x3732BC34B9BA32B73A103A37B5B2B7",
    },
    3409: {
      op: "PUSH1",
      value: "0x89",
    },
    3411: {
      op: "SHL",
    },
    3412: {
      op: "PUSH1",
      value: "0x64",
    },
    3414: {
      op: "DUP3",
    },
    3415: {
      op: "ADD",
    },
    3416: {
      op: "MSTORE",
    },
    3417: {
      op: "PUSH1",
      value: "0x84",
    },
    3419: {
      op: "ADD",
    },
    3420: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    3423: {
      op: "JUMP",
    },
    3424: {
      fn: "ERC721.tokenURI",
      offset: [2901, 2977],
      op: "JUMPDEST",
      path: "0",
    },
    3425: {
      fn: "ERC721.tokenURI",
      offset: [2988, 3009],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    3427: {
      fn: "ERC721.tokenURI",
      offset: [3012, 3022],
      op: "PUSH2",
      path: "0",
      value: "0xD77",
    },
    3430: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3432: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "DUP1",
      path: "0",
    },
    3433: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "MLOAD",
      path: "0",
    },
    3434: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3436: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "DUP2",
      path: "0",
    },
    3437: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "ADD",
      path: "0",
    },
    3438: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "SWAP1",
      path: "0",
    },
    3439: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "SWAP2",
      path: "0",
    },
    3440: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "MSTORE",
      path: "0",
    },
    3441: {
      op: "PUSH1",
      value: "0x0",
    },
    3443: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "DUP2",
      path: "0",
    },
    3444: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "MSTORE",
      path: "0",
    },
    3445: {
      fn: "ERC721._baseURI",
      offset: [3449, 3458],
      op: "SWAP1",
      path: "0",
    },
    3446: {
      fn: "ERC721._baseURI",
      offset: [3373, 3465],
      op: "JUMP",
      path: "0",
    },
    3447: {
      fn: "ERC721.tokenURI",
      offset: [3012, 3022],
      op: "JUMPDEST",
      path: "0",
    },
    3448: {
      fn: "ERC721.tokenURI",
      offset: [2988, 3022],
      op: "SWAP1",
      path: "0",
    },
    3449: {
      fn: "ERC721.tokenURI",
      offset: [2988, 3022],
      op: "POP",
      path: "0",
    },
    3450: {
      fn: "ERC721.tokenURI",
      offset: [3063, 3064],
      op: "PUSH1",
      path: "0",
      statement: 50,
      value: "0x0",
    },
    3452: {
      fn: "ERC721.tokenURI",
      offset: [3045, 3052],
      op: "DUP2",
      path: "0",
    },
    3453: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3060],
      op: "MLOAD",
      path: "0",
    },
    3454: {
      branch: 75,
      fn: "ERC721.tokenURI",
      offset: [3039, 3064],
      op: "GT",
      path: "0",
    },
    3455: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "PUSH2",
      path: "0",
      value: "0xD97",
    },
    3458: {
      branch: 75,
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "JUMPI",
      path: "0",
    },
    3459: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3461: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "MLOAD",
      path: "0",
    },
    3462: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "DUP1",
      path: "0",
    },
    3463: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3465: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "ADD",
      path: "0",
    },
    3466: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3468: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "MSTORE",
      path: "0",
    },
    3469: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "DUP1",
      path: "0",
    },
    3470: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    3472: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "DUP2",
      path: "0",
    },
    3473: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "MSTORE",
      path: "0",
    },
    3474: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "POP",
      path: "0",
    },
    3475: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "PUSH2",
      path: "0",
      value: "0xDC2",
    },
    3478: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "JUMP",
      path: "0",
    },
    3479: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "JUMPDEST",
      path: "0",
    },
    3480: {
      fn: "ERC721.tokenURI",
      offset: [3091, 3098],
      op: "DUP1",
      path: "0",
    },
    3481: {
      fn: "ERC721.tokenURI",
      offset: [3100, 3118],
      op: "PUSH2",
      path: "0",
      value: "0xDA1",
    },
    3484: {
      fn: "ERC721.tokenURI",
      offset: [3100, 3107],
      op: "DUP5",
      path: "0",
    },
    3485: {
      fn: "ERC721.tokenURI",
      offset: [3100, 3116],
      op: "PUSH2",
      path: "0",
      value: "0xEFA",
    },
    3488: {
      fn: "ERC721.tokenURI",
      jump: "i",
      offset: [3100, 3118],
      op: "JUMP",
      path: "0",
    },
    3489: {
      fn: "ERC721.tokenURI",
      offset: [3100, 3118],
      op: "JUMPDEST",
      path: "0",
    },
    3490: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3492: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "MLOAD",
      path: "0",
    },
    3493: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3495: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "ADD",
      path: "0",
    },
    3496: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "PUSH2",
      path: "0",
      value: "0xDB2",
    },
    3499: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "SWAP3",
      path: "0",
    },
    3500: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "SWAP2",
      path: "0",
    },
    3501: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "SWAP1",
      path: "0",
    },
    3502: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "PUSH2",
      path: "0",
      value: "0x1595",
    },
    3505: {
      fn: "ERC721.tokenURI",
      jump: "i",
      offset: [3074, 3119],
      op: "JUMP",
      path: "0",
    },
    3506: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "JUMPDEST",
      path: "0",
    },
    3507: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3509: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "MLOAD",
      path: "0",
    },
    3510: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3512: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "DUP2",
      path: "0",
    },
    3513: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "DUP4",
      path: "0",
    },
    3514: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "SUB",
      path: "0",
    },
    3515: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "SUB",
      path: "0",
    },
    3516: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "DUP2",
      path: "0",
    },
    3517: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "MSTORE",
      path: "0",
    },
    3518: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "SWAP1",
      path: "0",
    },
    3519: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3521: {
      fn: "ERC721.tokenURI",
      offset: [3074, 3119],
      op: "MSTORE",
      path: "0",
    },
    3522: {
      fn: "ERC721.tokenURI",
      offset: [3039, 3125],
      op: "JUMPDEST",
      path: "0",
    },
    3523: {
      fn: "ERC721.tokenURI",
      offset: [3032, 3125],
      op: "SWAP4",
      path: "0",
    },
    3524: {
      fn: "ERC721.tokenURI",
      offset: [2803, 3132],
      op: "SWAP3",
      path: "0",
    },
    3525: {
      op: "POP",
    },
    3526: {
      op: "POP",
    },
    3527: {
      op: "POP",
    },
    3528: {
      fn: "ERC721.tokenURI",
      jump: "o",
      offset: [2803, 3132],
      op: "JUMP",
      path: "0",
    },
    3529: {
      fn: "ERC721._safeMint",
      offset: [8430, 8741],
      op: "JUMPDEST",
      path: "0",
    },
    3530: {
      fn: "ERC721._safeMint",
      offset: [8555, 8573],
      op: "PUSH2",
      path: "0",
      statement: 51,
      value: "0xDD3",
    },
    3533: {
      fn: "ERC721._safeMint",
      offset: [8561, 8563],
      op: "DUP4",
      path: "0",
    },
    3534: {
      fn: "ERC721._safeMint",
      offset: [8565, 8572],
      op: "DUP4",
      path: "0",
    },
    3535: {
      fn: "ERC721._safeMint",
      offset: [8555, 8560],
      op: "PUSH2",
      path: "0",
      value: "0xFF8",
    },
    3538: {
      fn: "ERC721._safeMint",
      jump: "i",
      offset: [8555, 8573],
      op: "JUMP",
      path: "0",
    },
    3539: {
      fn: "ERC721._safeMint",
      offset: [8555, 8573],
      op: "JUMPDEST",
      path: "0",
    },
    3540: {
      fn: "ERC721._safeMint",
      offset: [8604, 8658],
      op: "PUSH2",
      path: "0",
      statement: 52,
      value: "0xDE0",
    },
    3543: {
      fn: "ERC721._safeMint",
      offset: [8635, 8636],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    3545: {
      fn: "ERC721._safeMint",
      offset: [8639, 8641],
      op: "DUP5",
      path: "0",
    },
    3546: {
      fn: "ERC721._safeMint",
      offset: [8643, 8650],
      op: "DUP5",
      path: "0",
    },
    3547: {
      fn: "ERC721._safeMint",
      offset: [8652, 8657],
      op: "DUP5",
      path: "0",
    },
    3548: {
      fn: "ERC721._safeMint",
      offset: [8604, 8626],
      op: "PUSH2",
      path: "0",
      value: "0xDFC",
    },
    3551: {
      fn: "ERC721._safeMint",
      jump: "i",
      offset: [8604, 8658],
      op: "JUMP",
      path: "0",
    },
    3552: {
      branch: 76,
      fn: "ERC721._safeMint",
      offset: [8604, 8658],
      op: "JUMPDEST",
      path: "0",
    },
    3553: {
      fn: "ERC721._safeMint",
      offset: [8583, 8734],
      op: "PUSH2",
      path: "0",
      value: "0x4EC",
    },
    3556: {
      branch: 76,
      fn: "ERC721._safeMint",
      offset: [8583, 8734],
      op: "JUMPI",
      path: "0",
    },
    3557: {
      fn: "ERC721._safeMint",
      offset: [8583, 8734],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3559: {
      fn: "ERC721._safeMint",
      offset: [8583, 8734],
      op: "MLOAD",
      path: "0",
    },
    3560: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    3564: {
      op: "PUSH1",
      value: "0xE5",
    },
    3566: {
      op: "SHL",
    },
    3567: {
      fn: "ERC721._safeMint",
      offset: [8583, 8734],
      op: "DUP2",
      path: "0",
    },
    3568: {
      fn: "ERC721._safeMint",
      offset: [8583, 8734],
      op: "MSTORE",
      path: "0",
    },
    3569: {
      fn: "ERC721._safeMint",
      offset: [8583, 8734],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    3571: {
      fn: "ERC721._safeMint",
      offset: [8583, 8734],
      op: "ADD",
      path: "0",
    },
    3572: {
      fn: "ERC721._safeMint",
      offset: [8583, 8734],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    3575: {
      fn: "ERC721._safeMint",
      offset: [8583, 8734],
      op: "SWAP1",
      path: "0",
    },
    3576: {
      fn: "ERC721._safeMint",
      offset: [8583, 8734],
      op: "PUSH2",
      path: "0",
      value: "0x15DB",
    },
    3579: {
      fn: "ERC721._safeMint",
      jump: "i",
      offset: [8583, 8734],
      op: "JUMP",
      path: "0",
    },
    3580: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12161, 12939],
      op: "JUMPDEST",
      path: "0",
    },
    3581: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12311, 12315],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    3583: {
      op: "PUSH1",
      value: "0x1",
    },
    3585: {
      op: "PUSH1",
      value: "0x1",
    },
    3587: {
      op: "PUSH1",
      value: "0xA0",
    },
    3589: {
      op: "SHL",
    },
    3590: {
      op: "SUB",
    },
    3591: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12331, 12344],
      op: "DUP5",
      path: "0",
    },
    3592: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12331, 12344],
      op: "AND",
      path: "0",
    },
    3593: {
      op: "EXTCODESIZE",
    },
    3594: {
      op: "ISZERO",
    },
    3595: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12327, 12933],
      op: "PUSH2",
      path: "0",
      value: "0xEEF",
    },
    3598: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12327, 12933],
      op: "JUMPI",
      path: "0",
    },
    3599: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3601: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "MLOAD",
      path: "0",
    },
    3602: {
      op: "PUSH4",
      value: "0xA85BD01",
    },
    3607: {
      op: "PUSH1",
      value: "0xE1",
    },
    3609: {
      op: "SHL",
    },
    3610: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP2",
      path: "0",
    },
    3611: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "MSTORE",
      path: "0",
    },
    3612: {
      op: "PUSH1",
      value: "0x1",
    },
    3614: {
      op: "PUSH1",
      value: "0x1",
    },
    3616: {
      op: "PUSH1",
      value: "0xA0",
    },
    3618: {
      op: "SHL",
    },
    3619: {
      op: "SUB",
    },
    3620: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12402],
      op: "DUP6",
      path: "0",
    },
    3621: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12402],
      op: "AND",
      path: "0",
    },
    3622: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12402],
      op: "SWAP1",
      path: "0",
    },
    3623: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12402],
      op: "PUSH4",
      path: "0",
      value: "0x150B7A02",
    },
    3628: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12402],
      op: "SWAP1",
      path: "0",
    },
    3629: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH2",
      path: "0",
      value: "0xE40",
    },
    3632: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SWAP1",
      path: "0",
    },
    3633: {
      fn: "Context._msgSender",
      offset: [719, 729],
      op: "CALLER",
      path: "6",
    },
    3634: {
      fn: "Context._msgSender",
      offset: [719, 729],
      op: "SWAP1",
      path: "6",
    },
    3635: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12417, 12421],
      op: "DUP10",
      path: "0",
    },
    3636: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12417, 12421],
      op: "SWAP1",
      path: "0",
    },
    3637: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12423, 12430],
      op: "DUP9",
      path: "0",
    },
    3638: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12423, 12430],
      op: "SWAP1",
      path: "0",
    },
    3639: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12432, 12437],
      op: "DUP9",
      path: "0",
    },
    3640: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12432, 12437],
      op: "SWAP1",
      path: "0",
    },
    3641: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    3643: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "ADD",
      path: "0",
    },
    3644: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH2",
      path: "0",
      value: "0x162D",
    },
    3647: {
      fn: "ERC721._checkOnERC721Received",
      jump: "i",
      offset: [12366, 12438],
      op: "JUMP",
      path: "0",
    },
    3648: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "JUMPDEST",
      path: "0",
    },
    3649: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3651: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3653: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "MLOAD",
      path: "0",
    },
    3654: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP1",
      path: "0",
    },
    3655: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP4",
      path: "0",
    },
    3656: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SUB",
      path: "0",
    },
    3657: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP2",
      path: "0",
    },
    3658: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    3660: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP8",
      path: "0",
    },
    3661: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "GAS",
      path: "0",
    },
    3662: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "CALL",
      path: "0",
    },
    3663: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SWAP3",
      path: "0",
    },
    3664: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "POP",
      path: "0",
    },
    3665: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "POP",
      path: "0",
    },
    3666: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "POP",
      path: "0",
    },
    3667: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP1",
      path: "0",
    },
    3668: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "ISZERO",
      path: "0",
    },
    3669: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH2",
      path: "0",
      value: "0xE7B",
    },
    3672: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "JUMPI",
      path: "0",
    },
    3673: {
      op: "POP",
    },
    3674: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3676: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP1",
      path: "0",
    },
    3677: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "MLOAD",
      path: "0",
    },
    3678: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x1F",
    },
    3680: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "RETURNDATASIZE",
      path: "0",
    },
    3681: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SWAP1",
      path: "0",
    },
    3682: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP2",
      path: "0",
    },
    3683: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "ADD",
      path: "0",
    },
    3684: {
      op: "PUSH1",
      value: "0x1F",
    },
    3686: {
      op: "NOT",
    },
    3687: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "AND",
      path: "0",
    },
    3688: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP3",
      path: "0",
    },
    3689: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "ADD",
      path: "0",
    },
    3690: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SWAP1",
      path: "0",
    },
    3691: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SWAP3",
      path: "0",
    },
    3692: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "MSTORE",
      path: "0",
    },
    3693: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH2",
      path: "0",
      value: "0xE78",
    },
    3696: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SWAP2",
      path: "0",
    },
    3697: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "DUP2",
      path: "0",
    },
    3698: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "ADD",
      path: "0",
    },
    3699: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "SWAP1",
      path: "0",
    },
    3700: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH2",
      path: "0",
      value: "0x166A",
    },
    3703: {
      fn: "ERC721._checkOnERC721Received",
      jump: "i",
      offset: [12366, 12438],
      op: "JUMP",
      path: "0",
    },
    3704: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "JUMPDEST",
      path: "0",
    },
    3705: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "PUSH1",
      path: "0",
      value: "0x1",
    },
    3707: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12366, 12438],
      op: "JUMPDEST",
      path: "0",
    },
    3708: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH2",
      path: "0",
      value: "0xED5",
    },
    3711: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "JUMPI",
      path: "0",
    },
    3712: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "RETURNDATASIZE",
      path: "0",
    },
    3713: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "DUP1",
      path: "0",
    },
    3714: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "DUP1",
      path: "0",
    },
    3715: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "ISZERO",
      path: "0",
    },
    3716: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH2",
      path: "0",
      value: "0xEA9",
    },
    3719: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "JUMPI",
      path: "0",
    },
    3720: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3722: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "MLOAD",
      path: "0",
    },
    3723: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "SWAP2",
      path: "0",
    },
    3724: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "POP",
      path: "0",
    },
    3725: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH1",
      path: "0",
      value: "0x1F",
    },
    3727: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "NOT",
      path: "0",
    },
    3728: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH1",
      path: "0",
      value: "0x3F",
    },
    3730: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "RETURNDATASIZE",
      path: "0",
    },
    3731: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "ADD",
      path: "0",
    },
    3732: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "AND",
      path: "0",
    },
    3733: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "DUP3",
      path: "0",
    },
    3734: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "ADD",
      path: "0",
    },
    3735: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    3737: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "MSTORE",
      path: "0",
    },
    3738: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "RETURNDATASIZE",
      path: "0",
    },
    3739: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "DUP3",
      path: "0",
    },
    3740: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "MSTORE",
      path: "0",
    },
    3741: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "RETURNDATASIZE",
      path: "0",
    },
    3742: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    3744: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3746: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "DUP5",
      path: "0",
    },
    3747: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "ADD",
      path: "0",
    },
    3748: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "RETURNDATACOPY",
      path: "0",
    },
    3749: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH2",
      path: "0",
      value: "0xEAE",
    },
    3752: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "JUMP",
      path: "0",
    },
    3753: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "JUMPDEST",
      path: "0",
    },
    3754: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "PUSH1",
      path: "0",
      value: "0x60",
    },
    3756: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "SWAP2",
      path: "0",
    },
    3757: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "POP",
      path: "0",
    },
    3758: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "JUMPDEST",
      path: "0",
    },
    3759: {
      op: "POP",
    },
    3760: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12605, 12618],
      op: "DUP1",
      path: "0",
    },
    3761: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12605, 12618],
      op: "MLOAD",
      path: "0",
    },
    3762: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12601, 12867],
      op: "PUSH2",
      path: "0",
      value: "0xECD",
    },
    3765: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12601, 12867],
      op: "JUMPI",
      path: "0",
    },
    3766: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "PUSH1",
      path: "0",
      statement: 53,
      value: "0x40",
    },
    3768: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "MLOAD",
      path: "0",
    },
    3769: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    3773: {
      op: "PUSH1",
      value: "0xE5",
    },
    3775: {
      op: "SHL",
    },
    3776: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "DUP2",
      path: "0",
    },
    3777: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "MSTORE",
      path: "0",
    },
    3778: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    3780: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "ADD",
      path: "0",
    },
    3781: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    3784: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "SWAP1",
      path: "0",
    },
    3785: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12647, 12707],
      op: "PUSH2",
      path: "0",
      value: "0x15DB",
    },
    3788: {
      fn: "ERC721._checkOnERC721Received",
      jump: "i",
      offset: [12647, 12707],
      op: "JUMP",
      path: "0",
    },
    3789: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12601, 12867],
      op: "JUMPDEST",
      path: "0",
    },
    3790: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12819, 12825],
      op: "DUP1",
      path: "0",
    },
    3791: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12813, 12826],
      op: "MLOAD",
      path: "0",
    },
    3792: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12804, 12810],
      op: "DUP2",
      path: "0",
    },
    3793: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12800, 12802],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    3795: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12796, 12811],
      op: "ADD",
      path: "0",
    },
    3796: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12789, 12827],
      op: "REVERT",
      path: "0",
    },
    3797: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12362, 12881],
      op: "JUMPDEST",
      path: "0",
    },
    3798: {
      op: "PUSH1",
      value: "0x1",
    },
    3800: {
      op: "PUSH1",
      value: "0x1",
    },
    3802: {
      op: "PUSH1",
      value: "0xE0",
    },
    3804: {
      op: "SHL",
    },
    3805: {
      op: "SUB",
    },
    3806: {
      op: "NOT",
    },
    3807: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12488, 12539],
      op: "AND",
      path: "0",
      statement: 54,
    },
    3808: {
      op: "PUSH4",
      value: "0xA85BD01",
    },
    3813: {
      op: "PUSH1",
      value: "0xE1",
    },
    3815: {
      op: "SHL",
    },
    3816: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12488, 12539],
      op: "EQ",
      path: "0",
    },
    3817: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12488, 12539],
      op: "SWAP1",
      path: "0",
    },
    3818: {
      op: "POP",
    },
    3819: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12481, 12539],
      op: "PUSH2",
      path: "0",
      value: "0x831",
    },
    3822: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12481, 12539],
      op: "JUMP",
      path: "0",
    },
    3823: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12327, 12933],
      op: "JUMPDEST",
      path: "0",
    },
    3824: {
      op: "POP",
    },
    3825: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12918, 12922],
      op: "PUSH1",
      path: "0",
      statement: 55,
      value: "0x1",
    },
    3827: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12161, 12939],
      op: "SWAP5",
      path: "0",
    },
    3828: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12161, 12939],
      op: "SWAP4",
      path: "0",
    },
    3829: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12161, 12939],
      op: "POP",
      path: "0",
    },
    3830: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12161, 12939],
      op: "POP",
      path: "0",
    },
    3831: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12161, 12939],
      op: "POP",
      path: "0",
    },
    3832: {
      fn: "ERC721._checkOnERC721Received",
      offset: [12161, 12939],
      op: "POP",
      path: "0",
    },
    3833: {
      fn: "ERC721._checkOnERC721Received",
      jump: "o",
      offset: [12161, 12939],
      op: "JUMP",
      path: "0",
    },
    3834: {
      op: "JUMPDEST",
    },
    3835: {
      op: "PUSH1",
      value: "0x60",
    },
    3837: {
      op: "DUP2",
    },
    3838: {
      op: "PUSH2",
      value: "0xF1E",
    },
    3841: {
      op: "JUMPI",
    },
    3842: {
      op: "POP",
    },
    3843: {
      op: "POP",
    },
    3844: {
      op: "PUSH1",
      value: "0x40",
    },
    3846: {
      op: "DUP1",
    },
    3847: {
      op: "MLOAD",
    },
    3848: {
      op: "DUP1",
    },
    3849: {
      op: "DUP3",
    },
    3850: {
      op: "ADD",
    },
    3851: {
      op: "SWAP1",
    },
    3852: {
      op: "SWAP2",
    },
    3853: {
      op: "MSTORE",
    },
    3854: {
      op: "PUSH1",
      value: "0x1",
    },
    3856: {
      op: "DUP2",
    },
    3857: {
      op: "MSTORE",
    },
    3858: {
      op: "PUSH1",
      value: "0x3",
    },
    3860: {
      op: "PUSH1",
      value: "0xFC",
    },
    3862: {
      op: "SHL",
    },
    3863: {
      op: "PUSH1",
      value: "0x20",
    },
    3865: {
      op: "DUP3",
    },
    3866: {
      op: "ADD",
    },
    3867: {
      op: "MSTORE",
    },
    3868: {
      op: "SWAP1",
    },
    3869: {
      jump: "o",
      op: "JUMP",
    },
    3870: {
      op: "JUMPDEST",
    },
    3871: {
      op: "DUP2",
    },
    3872: {
      op: "PUSH1",
      value: "0x0",
    },
    3874: {
      op: "JUMPDEST",
    },
    3875: {
      op: "DUP2",
    },
    3876: {
      op: "ISZERO",
    },
    3877: {
      op: "PUSH2",
      value: "0xF48",
    },
    3880: {
      op: "JUMPI",
    },
    3881: {
      op: "DUP1",
    },
    3882: {
      op: "PUSH2",
      value: "0xF32",
    },
    3885: {
      op: "DUP2",
    },
    3886: {
      op: "PUSH2",
      value: "0x1687",
    },
    3889: {
      jump: "i",
      op: "JUMP",
    },
    3890: {
      op: "JUMPDEST",
    },
    3891: {
      op: "SWAP2",
    },
    3892: {
      op: "POP",
    },
    3893: {
      op: "PUSH2",
      value: "0xF41",
    },
    3896: {
      op: "SWAP1",
    },
    3897: {
      op: "POP",
    },
    3898: {
      op: "PUSH1",
      value: "0xA",
    },
    3900: {
      op: "DUP4",
    },
    3901: {
      op: "PUSH2",
      value: "0x16B8",
    },
    3904: {
      jump: "i",
      op: "JUMP",
    },
    3905: {
      op: "JUMPDEST",
    },
    3906: {
      op: "SWAP2",
    },
    3907: {
      op: "POP",
    },
    3908: {
      op: "PUSH2",
      value: "0xF22",
    },
    3911: {
      op: "JUMP",
    },
    3912: {
      op: "JUMPDEST",
    },
    3913: {
      op: "PUSH1",
      value: "0x0",
    },
    3915: {
      op: "DUP2",
    },
    3916: {
      op: "PUSH8",
      value: "0xFFFFFFFFFFFFFFFF",
    },
    3925: {
      op: "DUP2",
    },
    3926: {
      op: "GT",
    },
    3927: {
      op: "ISZERO",
    },
    3928: {
      op: "PUSH2",
      value: "0xF63",
    },
    3931: {
      op: "JUMPI",
    },
    3932: {
      op: "PUSH2",
      value: "0xF63",
    },
    3935: {
      op: "PUSH2",
      value: "0x1300",
    },
    3938: {
      jump: "i",
      op: "JUMP",
    },
    3939: {
      op: "JUMPDEST",
    },
    3940: {
      op: "PUSH1",
      value: "0x40",
    },
    3942: {
      op: "MLOAD",
    },
    3943: {
      op: "SWAP1",
    },
    3944: {
      op: "DUP1",
    },
    3945: {
      op: "DUP3",
    },
    3946: {
      op: "MSTORE",
    },
    3947: {
      op: "DUP1",
    },
    3948: {
      op: "PUSH1",
      value: "0x1F",
    },
    3950: {
      op: "ADD",
    },
    3951: {
      op: "PUSH1",
      value: "0x1F",
    },
    3953: {
      op: "NOT",
    },
    3954: {
      op: "AND",
    },
    3955: {
      op: "PUSH1",
      value: "0x20",
    },
    3957: {
      op: "ADD",
    },
    3958: {
      op: "DUP3",
    },
    3959: {
      op: "ADD",
    },
    3960: {
      op: "PUSH1",
      value: "0x40",
    },
    3962: {
      op: "MSTORE",
    },
    3963: {
      op: "DUP1",
    },
    3964: {
      op: "ISZERO",
    },
    3965: {
      op: "PUSH2",
      value: "0xF8D",
    },
    3968: {
      op: "JUMPI",
    },
    3969: {
      op: "PUSH1",
      value: "0x20",
    },
    3971: {
      op: "DUP3",
    },
    3972: {
      op: "ADD",
    },
    3973: {
      op: "DUP2",
    },
    3974: {
      op: "DUP1",
    },
    3975: {
      op: "CALLDATASIZE",
    },
    3976: {
      op: "DUP4",
    },
    3977: {
      op: "CALLDATACOPY",
    },
    3978: {
      op: "ADD",
    },
    3979: {
      op: "SWAP1",
    },
    3980: {
      op: "POP",
    },
    3981: {
      op: "JUMPDEST",
    },
    3982: {
      op: "POP",
    },
    3983: {
      op: "SWAP1",
    },
    3984: {
      op: "POP",
    },
    3985: {
      op: "JUMPDEST",
    },
    3986: {
      op: "DUP5",
    },
    3987: {
      op: "ISZERO",
    },
    3988: {
      op: "PUSH2",
      value: "0x831",
    },
    3991: {
      op: "JUMPI",
    },
    3992: {
      op: "PUSH2",
      value: "0xFA2",
    },
    3995: {
      op: "PUSH1",
      value: "0x1",
    },
    3997: {
      op: "DUP4",
    },
    3998: {
      op: "PUSH2",
      value: "0x15C4",
    },
    4001: {
      jump: "i",
      op: "JUMP",
    },
    4002: {
      op: "JUMPDEST",
    },
    4003: {
      op: "SWAP2",
    },
    4004: {
      op: "POP",
    },
    4005: {
      op: "PUSH2",
      value: "0xFAF",
    },
    4008: {
      op: "PUSH1",
      value: "0xA",
    },
    4010: {
      op: "DUP7",
    },
    4011: {
      op: "PUSH2",
      value: "0x16CC",
    },
    4014: {
      jump: "i",
      op: "JUMP",
    },
    4015: {
      op: "JUMPDEST",
    },
    4016: {
      op: "PUSH2",
      value: "0xFBA",
    },
    4019: {
      op: "SWAP1",
    },
    4020: {
      op: "PUSH1",
      value: "0x30",
    },
    4022: {
      op: "PUSH2",
      value: "0x157D",
    },
    4025: {
      jump: "i",
      op: "JUMP",
    },
    4026: {
      op: "JUMPDEST",
    },
    4027: {
      op: "PUSH1",
      value: "0xF8",
    },
    4029: {
      op: "SHL",
    },
    4030: {
      op: "DUP2",
    },
    4031: {
      op: "DUP4",
    },
    4032: {
      op: "DUP2",
    },
    4033: {
      op: "MLOAD",
    },
    4034: {
      op: "DUP2",
    },
    4035: {
      op: "LT",
    },
    4036: {
      op: "PUSH2",
      value: "0xFCF",
    },
    4039: {
      op: "JUMPI",
    },
    4040: {
      op: "PUSH2",
      value: "0xFCF",
    },
    4043: {
      op: "PUSH2",
      value: "0x16E0",
    },
    4046: {
      jump: "i",
      op: "JUMP",
    },
    4047: {
      op: "JUMPDEST",
    },
    4048: {
      op: "PUSH1",
      value: "0x20",
    },
    4050: {
      op: "ADD",
    },
    4051: {
      op: "ADD",
    },
    4052: {
      op: "SWAP1",
    },
    4053: {
      op: "PUSH1",
      value: "0x1",
    },
    4055: {
      op: "PUSH1",
      value: "0x1",
    },
    4057: {
      op: "PUSH1",
      value: "0xF8",
    },
    4059: {
      op: "SHL",
    },
    4060: {
      op: "SUB",
    },
    4061: {
      op: "NOT",
    },
    4062: {
      op: "AND",
    },
    4063: {
      op: "SWAP1",
    },
    4064: {
      op: "DUP2",
    },
    4065: {
      op: "PUSH1",
      value: "0x0",
    },
    4067: {
      op: "BYTE",
    },
    4068: {
      op: "SWAP1",
    },
    4069: {
      op: "MSTORE8",
    },
    4070: {
      op: "POP",
    },
    4071: {
      op: "PUSH2",
      value: "0xFF1",
    },
    4074: {
      op: "PUSH1",
      value: "0xA",
    },
    4076: {
      op: "DUP7",
    },
    4077: {
      op: "PUSH2",
      value: "0x16B8",
    },
    4080: {
      jump: "i",
      op: "JUMP",
    },
    4081: {
      op: "JUMPDEST",
    },
    4082: {
      op: "SWAP5",
    },
    4083: {
      op: "POP",
    },
    4084: {
      op: "PUSH2",
      value: "0xF91",
    },
    4087: {
      op: "JUMP",
    },
    4088: {
      fn: "ERC721._mint",
      offset: [9063, 9435],
      op: "JUMPDEST",
      path: "0",
    },
    4089: {
      op: "PUSH1",
      value: "0x1",
    },
    4091: {
      op: "PUSH1",
      value: "0x1",
    },
    4093: {
      op: "PUSH1",
      value: "0xA0",
    },
    4095: {
      op: "SHL",
    },
    4096: {
      op: "SUB",
    },
    4097: {
      fn: "ERC721._mint",
      offset: [9142, 9158],
      op: "DUP3",
      path: "0",
      statement: 56,
    },
    4098: {
      branch: 77,
      fn: "ERC721._mint",
      offset: [9142, 9158],
      op: "AND",
      path: "0",
    },
    4099: {
      fn: "ERC721._mint",
      offset: [9134, 9195],
      op: "PUSH2",
      path: "0",
      value: "0x104E",
    },
    4102: {
      branch: 77,
      fn: "ERC721._mint",
      offset: [9134, 9195],
      op: "JUMPI",
      path: "0",
    },
    4103: {
      fn: "ERC721._mint",
      offset: [9134, 9195],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    4105: {
      fn: "ERC721._mint",
      offset: [9134, 9195],
      op: "MLOAD",
      path: "0",
    },
    4106: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    4110: {
      op: "PUSH1",
      value: "0xE5",
    },
    4112: {
      op: "SHL",
    },
    4113: {
      fn: "ERC721._mint",
      offset: [9134, 9195],
      op: "DUP2",
      path: "0",
    },
    4114: {
      fn: "ERC721._mint",
      offset: [9134, 9195],
      op: "MSTORE",
      path: "0",
    },
    4115: {
      op: "PUSH1",
      value: "0x20",
    },
    4117: {
      fn: "ERC721._mint",
      offset: [9134, 9195],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    4119: {
      fn: "ERC721._mint",
      offset: [9134, 9195],
      op: "DUP3",
      path: "0",
    },
    4120: {
      fn: "ERC721._mint",
      offset: [9134, 9195],
      op: "ADD",
      path: "0",
    },
    4121: {
      op: "DUP2",
    },
    4122: {
      op: "SWAP1",
    },
    4123: {
      op: "MSTORE",
    },
    4124: {
      op: "PUSH1",
      value: "0x24",
    },
    4126: {
      op: "DUP3",
    },
    4127: {
      op: "ADD",
    },
    4128: {
      op: "MSTORE",
    },
    4129: {
      op: "PUSH32",
      value:
        "0x4552433732313A206D696E7420746F20746865207A65726F2061646472657373",
    },
    4162: {
      op: "PUSH1",
      value: "0x44",
    },
    4164: {
      op: "DUP3",
    },
    4165: {
      op: "ADD",
    },
    4166: {
      op: "MSTORE",
    },
    4167: {
      op: "PUSH1",
      value: "0x64",
    },
    4169: {
      op: "ADD",
    },
    4170: {
      fn: "ERC721._mint",
      offset: [9134, 9195],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    4173: {
      op: "JUMP",
    },
    4174: {
      fn: "ERC721._mint",
      offset: [9134, 9195],
      op: "JUMPDEST",
      path: "0",
    },
    4175: {
      fn: "ERC721._mint",
      offset: [9214, 9230],
      op: "PUSH2",
      path: "0",
      statement: 57,
      value: "0x1057",
    },
    4178: {
      fn: "ERC721._mint",
      offset: [9222, 9229],
      op: "DUP2",
      path: "0",
    },
    4179: {
      fn: "ERC721._mint",
      offset: [9214, 9221],
      op: "PUSH2",
      path: "0",
      value: "0x839",
    },
    4182: {
      fn: "ERC721._mint",
      jump: "i",
      offset: [9214, 9230],
      op: "JUMP",
      path: "0",
    },
    4183: {
      fn: "ERC721._mint",
      offset: [9214, 9230],
      op: "JUMPDEST",
      path: "0",
    },
    4184: {
      branch: 78,
      fn: "ERC721._mint",
      offset: [9213, 9230],
      op: "ISZERO",
      path: "0",
    },
    4185: {
      fn: "ERC721._mint",
      offset: [9205, 9263],
      op: "PUSH2",
      path: "0",
      value: "0x10A4",
    },
    4188: {
      branch: 78,
      fn: "ERC721._mint",
      offset: [9205, 9263],
      op: "JUMPI",
      path: "0",
    },
    4189: {
      fn: "ERC721._mint",
      offset: [9205, 9263],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    4191: {
      fn: "ERC721._mint",
      offset: [9205, 9263],
      op: "MLOAD",
      path: "0",
    },
    4192: {
      op: "PUSH3",
      value: "0x461BCD",
    },
    4196: {
      op: "PUSH1",
      value: "0xE5",
    },
    4198: {
      op: "SHL",
    },
    4199: {
      fn: "ERC721._mint",
      offset: [9205, 9263],
      op: "DUP2",
      path: "0",
    },
    4200: {
      fn: "ERC721._mint",
      offset: [9205, 9263],
      op: "MSTORE",
      path: "0",
    },
    4201: {
      op: "PUSH1",
      value: "0x20",
    },
    4203: {
      fn: "ERC721._mint",
      offset: [9205, 9263],
      op: "PUSH1",
      path: "0",
      value: "0x4",
    },
    4205: {
      fn: "ERC721._mint",
      offset: [9205, 9263],
      op: "DUP3",
      path: "0",
    },
    4206: {
      fn: "ERC721._mint",
      offset: [9205, 9263],
      op: "ADD",
      path: "0",
    },
    4207: {
      op: "MSTORE",
    },
    4208: {
      op: "PUSH1",
      value: "0x1C",
    },
    4210: {
      op: "PUSH1",
      value: "0x24",
    },
    4212: {
      op: "DUP3",
    },
    4213: {
      op: "ADD",
    },
    4214: {
      op: "MSTORE",
    },
    4215: {
      op: "PUSH32",
      value:
        "0x4552433732313A20746F6B656E20616C7265616479206D696E74656400000000",
    },
    4248: {
      op: "PUSH1",
      value: "0x44",
    },
    4250: {
      op: "DUP3",
    },
    4251: {
      op: "ADD",
    },
    4252: {
      op: "MSTORE",
    },
    4253: {
      op: "PUSH1",
      value: "0x64",
    },
    4255: {
      op: "ADD",
    },
    4256: {
      fn: "ERC721._mint",
      offset: [9205, 9263],
      op: "PUSH2",
      path: "0",
      value: "0x3B6",
    },
    4259: {
      op: "JUMP",
    },
    4260: {
      fn: "ERC721._mint",
      offset: [9205, 9263],
      op: "JUMPDEST",
      path: "0",
    },
    4261: {
      op: "PUSH1",
      value: "0x1",
    },
    4263: {
      op: "PUSH1",
      value: "0x1",
    },
    4265: {
      op: "PUSH1",
      value: "0xA0",
    },
    4267: {
      op: "SHL",
    },
    4268: {
      op: "SUB",
    },
    4269: {
      fn: "ERC721._mint",
      offset: [9330, 9343],
      op: "DUP3",
      path: "0",
      statement: 58,
    },
    4270: {
      fn: "ERC721._mint",
      offset: [9330, 9343],
      op: "AND",
      path: "0",
    },
    4271: {
      fn: "ERC721._mint",
      offset: [9330, 9343],
      op: "PUSH1",
      path: "0",
      value: "0x0",
    },
    4273: {
      fn: "ERC721._mint",
      offset: [9330, 9343],
      op: "SWAP1",
      path: "0",
    },
    4274: {
      fn: "ERC721._mint",
      offset: [9330, 9343],
      op: "DUP2",
      path: "0",
    },
    4275: {
      fn: "ERC721._mint",
      offset: [9330, 9343],
      op: "MSTORE",
      path: "0",
    },
    4276: {
      fn: "ERC721._mint",
      offset: [9330, 9339],
      op: "PUSH1",
      path: "0",
      value: "0x3",
    },
    4278: {
      fn: "ERC721._mint",
      offset: [9330, 9343],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    4280: {
      fn: "ERC721._mint",
      offset: [9330, 9343],
      op: "MSTORE",
      path: "0",
    },
    4281: {
      fn: "ERC721._mint",
      offset: [9330, 9343],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    4283: {
      fn: "ERC721._mint",
      offset: [9330, 9343],
      op: "DUP2",
      path: "0",
    },
    4284: {
      fn: "ERC721._mint",
      offset: [9330, 9343],
      op: "KECCAK256",
      path: "0",
    },
    4285: {
      fn: "ERC721._mint",
      offset: [9330, 9348],
      op: "DUP1",
      path: "0",
    },
    4286: {
      fn: "ERC721._mint",
      offset: [9330, 9348],
      op: "SLOAD",
      path: "0",
    },
    4287: {
      fn: "ERC721._mint",
      offset: [9347, 9348],
      op: "PUSH1",
      path: "0",
      value: "0x1",
    },
    4289: {
      fn: "ERC721._mint",
      offset: [9347, 9348],
      op: "SWAP3",
      path: "0",
    },
    4290: {
      fn: "ERC721._mint",
      offset: [9330, 9343],
      op: "SWAP1",
      path: "0",
    },
    4291: {
      fn: "ERC721._mint",
      offset: [9330, 9348],
      op: "PUSH2",
      path: "0",
      value: "0x10CD",
    },
    4294: {
      fn: "ERC721._mint",
      offset: [9330, 9348],
      op: "SWAP1",
      path: "0",
    },
    4295: {
      fn: "ERC721._mint",
      offset: [9347, 9348],
      op: "DUP5",
      path: "0",
    },
    4296: {
      fn: "ERC721._mint",
      offset: [9347, 9348],
      op: "SWAP1",
      path: "0",
    },
    4297: {
      fn: "ERC721._mint",
      offset: [9330, 9348],
      op: "PUSH2",
      path: "0",
      value: "0x157D",
    },
    4300: {
      fn: "ERC721._mint",
      jump: "i",
      offset: [9330, 9348],
      op: "JUMP",
      path: "0",
    },
    4301: {
      fn: "ERC721._mint",
      offset: [9330, 9348],
      op: "JUMPDEST",
      path: "0",
    },
    4302: {
      fn: "ERC721._mint",
      offset: [9330, 9348],
      op: "SWAP1",
      path: "0",
    },
    4303: {
      fn: "ERC721._mint",
      offset: [9330, 9348],
      op: "SWAP2",
      path: "0",
    },
    4304: {
      fn: "ERC721._mint",
      offset: [9330, 9348],
      op: "SSTORE",
      path: "0",
    },
    4305: {
      op: "POP",
    },
    4306: {
      op: "POP",
    },
    4307: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "PUSH1",
      path: "0",
      statement: 59,
      value: "0x0",
    },
    4309: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "DUP2",
      path: "0",
    },
    4310: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "DUP2",
      path: "0",
    },
    4311: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "MSTORE",
      path: "0",
    },
    4312: {
      fn: "ERC721._mint",
      offset: [9358, 9365],
      op: "PUSH1",
      path: "0",
      value: "0x2",
    },
    4314: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "PUSH1",
      path: "0",
      value: "0x20",
    },
    4316: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "MSTORE",
      path: "0",
    },
    4317: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "PUSH1",
      path: "0",
      value: "0x40",
    },
    4319: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "DUP1",
      path: "0",
    },
    4320: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "DUP3",
      path: "0",
    },
    4321: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "KECCAK256",
      path: "0",
    },
    4322: {
      fn: "ERC721._mint",
      offset: [9358, 9379],
      op: "DUP1",
      path: "0",
    },
    4323: {
      fn: "ERC721._mint",
      offset: [9358, 9379],
      op: "SLOAD",
      path: "0",
    },
    4324: {
      op: "PUSH1",
      value: "0x1",
    },
    4326: {
      op: "PUSH1",
      value: "0x1",
    },
    4328: {
      op: "PUSH1",
      value: "0xA0",
    },
    4330: {
      op: "SHL",
    },
    4331: {
      op: "SUB",
    },
    4332: {
      op: "NOT",
    },
    4333: {
      fn: "ERC721._mint",
      offset: [9358, 9379],
      op: "AND",
      path: "0",
    },
    4334: {
      op: "PUSH1",
      value: "0x1",
    },
    4336: {
      op: "PUSH1",
      value: "0x1",
    },
    4338: {
      op: "PUSH1",
      value: "0xA0",
    },
    4340: {
      op: "SHL",
    },
    4341: {
      op: "SUB",
    },
    4342: {
      fn: "ERC721._mint",
      offset: [9358, 9379],
      op: "DUP7",
      path: "0",
    },
    4343: {
      fn: "ERC721._mint",
      offset: [9358, 9379],
      op: "AND",
      path: "0",
    },
    4344: {
      fn: "ERC721._mint",
      offset: [9358, 9379],
      op: "SWAP1",
      path: "0",
    },
    4345: {
      fn: "ERC721._mint",
      offset: [9358, 9379],
      op: "DUP2",
      path: "0",
    },
    4346: {
      fn: "ERC721._mint",
      offset: [9358, 9379],
      op: "OR",
      path: "0",
    },
    4347: {
      fn: "ERC721._mint",
      offset: [9358, 9379],
      op: "SWAP1",
      path: "0",
    },
    4348: {
      fn: "ERC721._mint",
      offset: [9358, 9379],
      op: "SWAP2",
      path: "0",
    },
    4349: {
      fn: "ERC721._mint",
      offset: [9358, 9379],
      op: "SSTORE",
      path: "0",
    },
    4350: {
      fn: "ERC721._mint",
      offset: [9395, 9428],
      op: "SWAP1",
      path: "0",
      statement: 60,
    },
    4351: {
      fn: "ERC721._mint",
      offset: [9395, 9428],
      op: "MLOAD",
      path: "0",
    },
    4352: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "DUP4",
      path: "0",
    },
    4353: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "SWAP3",
      path: "0",
    },
    4354: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "SWAP1",
      path: "0",
    },
    4355: {
      fn: "ERC721._mint",
      offset: [9395, 9428],
      op: "PUSH32",
      path: "0",
      value:
        "0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF",
    },
    4388: {
      fn: "ERC721._mint",
      offset: [9395, 9428],
      op: "SWAP1",
      path: "0",
    },
    4389: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "DUP3",
      path: "0",
    },
    4390: {
      fn: "ERC721._mint",
      offset: [9358, 9374],
      op: "SWAP1",
      path: "0",
    },
    4391: {
      fn: "ERC721._mint",
      offset: [9395, 9428],
      op: "LOG4",
      path: "0",
    },
    4392: {
      fn: "ERC721._mint",
      offset: [9063, 9435],
      op: "POP",
      path: "0",
    },
    4393: {
      fn: "ERC721._mint",
      offset: [9063, 9435],
      op: "POP",
      path: "0",
    },
    4394: {
      fn: "ERC721._mint",
      jump: "o",
      offset: [9063, 9435],
      op: "JUMP",
      path: "0",
    },
    4395: {
      op: "JUMPDEST",
    },
    4396: {
      op: "DUP3",
    },
    4397: {
      op: "DUP1",
    },
    4398: {
      op: "SLOAD",
    },
    4399: {
      op: "PUSH2",
      value: "0x1137",
    },
    4402: {
      op: "SWAP1",
    },
    4403: {
      op: "PUSH2",
      value: "0x14DB",
    },
    4406: {
      jump: "i",
      op: "JUMP",
    },
    4407: {
      op: "JUMPDEST",
    },
    4408: {
      op: "SWAP1",
    },
    4409: {
      op: "PUSH1",
      value: "0x0",
    },
    4411: {
      op: "MSTORE",
    },
    4412: {
      op: "PUSH1",
      value: "0x20",
    },
    4414: {
      op: "PUSH1",
      value: "0x0",
    },
    4416: {
      op: "KECCAK256",
    },
    4417: {
      op: "SWAP1",
    },
    4418: {
      op: "PUSH1",
      value: "0x1F",
    },
    4420: {
      op: "ADD",
    },
    4421: {
      op: "PUSH1",
      value: "0x20",
    },
    4423: {
      op: "SWAP1",
    },
    4424: {
      op: "DIV",
    },
    4425: {
      op: "DUP2",
    },
    4426: {
      op: "ADD",
    },
    4427: {
      op: "SWAP3",
    },
    4428: {
      op: "DUP3",
    },
    4429: {
      op: "PUSH2",
      value: "0x1159",
    },
    4432: {
      op: "JUMPI",
    },
    4433: {
      op: "PUSH1",
      value: "0x0",
    },
    4435: {
      op: "DUP6",
    },
    4436: {
      op: "SSTORE",
    },
    4437: {
      op: "PUSH2",
      value: "0x119F",
    },
    4440: {
      op: "JUMP",
    },
    4441: {
      op: "JUMPDEST",
    },
    4442: {
      op: "DUP3",
    },
    4443: {
      op: "PUSH1",
      value: "0x1F",
    },
    4445: {
      op: "LT",
    },
    4446: {
      op: "PUSH2",
      value: "0x1172",
    },
    4449: {
      op: "JUMPI",
    },
    4450: {
      op: "DUP1",
    },
    4451: {
      op: "MLOAD",
    },
    4452: {
      op: "PUSH1",
      value: "0xFF",
    },
    4454: {
      op: "NOT",
    },
    4455: {
      op: "AND",
    },
    4456: {
      op: "DUP4",
    },
    4457: {
      op: "DUP1",
    },
    4458: {
      op: "ADD",
    },
    4459: {
      op: "OR",
    },
    4460: {
      op: "DUP6",
    },
    4461: {
      op: "SSTORE",
    },
    4462: {
      op: "PUSH2",
      value: "0x119F",
    },
    4465: {
      op: "JUMP",
    },
    4466: {
      op: "JUMPDEST",
    },
    4467: {
      op: "DUP3",
    },
    4468: {
      op: "DUP1",
    },
    4469: {
      op: "ADD",
    },
    4470: {
      op: "PUSH1",
      value: "0x1",
    },
    4472: {
      op: "ADD",
    },
    4473: {
      op: "DUP6",
    },
    4474: {
      op: "SSTORE",
    },
    4475: {
      op: "DUP3",
    },
    4476: {
      op: "ISZERO",
    },
    4477: {
      op: "PUSH2",
      value: "0x119F",
    },
    4480: {
      op: "JUMPI",
    },
    4481: {
      op: "SWAP2",
    },
    4482: {
      op: "DUP3",
    },
    4483: {
      op: "ADD",
    },
    4484: {
      op: "JUMPDEST",
    },
    4485: {
      op: "DUP3",
    },
    4486: {
      op: "DUP2",
    },
    4487: {
      op: "GT",
    },
    4488: {
      op: "ISZERO",
    },
    4489: {
      op: "PUSH2",
      value: "0x119F",
    },
    4492: {
      op: "JUMPI",
    },
    4493: {
      op: "DUP3",
    },
    4494: {
      op: "MLOAD",
    },
    4495: {
      op: "DUP3",
    },
    4496: {
      op: "SSTORE",
    },
    4497: {
      op: "SWAP2",
    },
    4498: {
      op: "PUSH1",
      value: "0x20",
    },
    4500: {
      op: "ADD",
    },
    4501: {
      op: "SWAP2",
    },
    4502: {
      op: "SWAP1",
    },
    4503: {
      op: "PUSH1",
      value: "0x1",
    },
    4505: {
      op: "ADD",
    },
    4506: {
      op: "SWAP1",
    },
    4507: {
      op: "PUSH2",
      value: "0x1184",
    },
    4510: {
      op: "JUMP",
    },
    4511: {
      op: "JUMPDEST",
    },
    4512: {
      op: "POP",
    },
    4513: {
      op: "PUSH2",
      value: "0x11AB",
    },
    4516: {
      op: "SWAP3",
    },
    4517: {
      op: "SWAP2",
    },
    4518: {
      op: "POP",
    },
    4519: {
      op: "PUSH2",
      value: "0x11AF",
    },
    4522: {
      jump: "i",
      op: "JUMP",
    },
    4523: {
      op: "JUMPDEST",
    },
    4524: {
      op: "POP",
    },
    4525: {
      op: "SWAP1",
    },
    4526: {
      jump: "o",
      op: "JUMP",
    },
    4527: {
      op: "JUMPDEST",
    },
    4528: {
      op: "JUMPDEST",
    },
    4529: {
      op: "DUP1",
    },
    4530: {
      op: "DUP3",
    },
    4531: {
      op: "GT",
    },
    4532: {
      op: "ISZERO",
    },
    4533: {
      op: "PUSH2",
      value: "0x11AB",
    },
    4536: {
      op: "JUMPI",
    },
    4537: {
      op: "PUSH1",
      value: "0x0",
    },
    4539: {
      op: "DUP2",
    },
    4540: {
      op: "SSTORE",
    },
    4541: {
      op: "PUSH1",
      value: "0x1",
    },
    4543: {
      op: "ADD",
    },
    4544: {
      op: "PUSH2",
      value: "0x11B0",
    },
    4547: {
      op: "JUMP",
    },
    4548: {
      op: "JUMPDEST",
    },
    4549: {
      op: "PUSH1",
      value: "0x1",
    },
    4551: {
      op: "PUSH1",
      value: "0x1",
    },
    4553: {
      op: "PUSH1",
      value: "0xE0",
    },
    4555: {
      op: "SHL",
    },
    4556: {
      op: "SUB",
    },
    4557: {
      op: "NOT",
    },
    4558: {
      op: "DUP2",
    },
    4559: {
      op: "AND",
    },
    4560: {
      op: "DUP2",
    },
    4561: {
      op: "EQ",
    },
    4562: {
      op: "PUSH2",
      value: "0x11DA",
    },
    4565: {
      op: "JUMPI",
    },
    4566: {
      op: "PUSH1",
      value: "0x0",
    },
    4568: {
      op: "DUP1",
    },
    4569: {
      op: "REVERT",
    },
    4570: {
      op: "JUMPDEST",
    },
    4571: {
      op: "POP",
    },
    4572: {
      jump: "o",
      op: "JUMP",
    },
    4573: {
      op: "JUMPDEST",
    },
    4574: {
      op: "PUSH1",
      value: "0x0",
    },
    4576: {
      op: "PUSH1",
      value: "0x20",
    },
    4578: {
      op: "DUP3",
    },
    4579: {
      op: "DUP5",
    },
    4580: {
      op: "SUB",
    },
    4581: {
      op: "SLT",
    },
    4582: {
      op: "ISZERO",
    },
    4583: {
      op: "PUSH2",
      value: "0x11EF",
    },
    4586: {
      op: "JUMPI",
    },
    4587: {
      op: "PUSH1",
      value: "0x0",
    },
    4589: {
      op: "DUP1",
    },
    4590: {
      op: "REVERT",
    },
    4591: {
      op: "JUMPDEST",
    },
    4592: {
      op: "DUP2",
    },
    4593: {
      op: "CALLDATALOAD",
    },
    4594: {
      op: "PUSH2",
      value: "0xDC2",
    },
    4597: {
      op: "DUP2",
    },
    4598: {
      op: "PUSH2",
      value: "0x11C4",
    },
    4601: {
      jump: "i",
      op: "JUMP",
    },
    4602: {
      op: "JUMPDEST",
    },
    4603: {
      op: "PUSH1",
      value: "0x0",
    },
    4605: {
      op: "JUMPDEST",
    },
    4606: {
      op: "DUP4",
    },
    4607: {
      op: "DUP2",
    },
    4608: {
      op: "LT",
    },
    4609: {
      op: "ISZERO",
    },
    4610: {
      op: "PUSH2",
      value: "0x1215",
    },
    4613: {
      op: "JUMPI",
    },
    4614: {
      op: "DUP2",
    },
    4615: {
      op: "DUP2",
    },
    4616: {
      op: "ADD",
    },
    4617: {
      op: "MLOAD",
    },
    4618: {
      op: "DUP4",
    },
    4619: {
      op: "DUP3",
    },
    4620: {
      op: "ADD",
    },
    4621: {
      op: "MSTORE",
    },
    4622: {
      op: "PUSH1",
      value: "0x20",
    },
    4624: {
      op: "ADD",
    },
    4625: {
      op: "PUSH2",
      value: "0x11FD",
    },
    4628: {
      op: "JUMP",
    },
    4629: {
      op: "JUMPDEST",
    },
    4630: {
      op: "DUP4",
    },
    4631: {
      op: "DUP2",
    },
    4632: {
      op: "GT",
    },
    4633: {
      op: "ISZERO",
    },
    4634: {
      op: "PUSH2",
      value: "0x6BC",
    },
    4637: {
      op: "JUMPI",
    },
    4638: {
      op: "POP",
    },
    4639: {
      op: "POP",
    },
    4640: {
      op: "PUSH1",
      value: "0x0",
    },
    4642: {
      op: "SWAP2",
    },
    4643: {
      op: "ADD",
    },
    4644: {
      op: "MSTORE",
    },
    4645: {
      jump: "o",
      op: "JUMP",
    },
    4646: {
      op: "JUMPDEST",
    },
    4647: {
      op: "PUSH1",
      value: "0x0",
    },
    4649: {
      op: "DUP2",
    },
    4650: {
      op: "MLOAD",
    },
    4651: {
      op: "DUP1",
    },
    4652: {
      op: "DUP5",
    },
    4653: {
      op: "MSTORE",
    },
    4654: {
      op: "PUSH2",
      value: "0x123E",
    },
    4657: {
      op: "DUP2",
    },
    4658: {
      op: "PUSH1",
      value: "0x20",
    },
    4660: {
      op: "DUP7",
    },
    4661: {
      op: "ADD",
    },
    4662: {
      op: "PUSH1",
      value: "0x20",
    },
    4664: {
      op: "DUP7",
    },
    4665: {
      op: "ADD",
    },
    4666: {
      op: "PUSH2",
      value: "0x11FA",
    },
    4669: {
      jump: "i",
      op: "JUMP",
    },
    4670: {
      op: "JUMPDEST",
    },
    4671: {
      op: "PUSH1",
      value: "0x1F",
    },
    4673: {
      op: "ADD",
    },
    4674: {
      op: "PUSH1",
      value: "0x1F",
    },
    4676: {
      op: "NOT",
    },
    4677: {
      op: "AND",
    },
    4678: {
      op: "SWAP3",
    },
    4679: {
      op: "SWAP1",
    },
    4680: {
      op: "SWAP3",
    },
    4681: {
      op: "ADD",
    },
    4682: {
      op: "PUSH1",
      value: "0x20",
    },
    4684: {
      op: "ADD",
    },
    4685: {
      op: "SWAP3",
    },
    4686: {
      op: "SWAP2",
    },
    4687: {
      op: "POP",
    },
    4688: {
      op: "POP",
    },
    4689: {
      jump: "o",
      op: "JUMP",
    },
    4690: {
      op: "JUMPDEST",
    },
    4691: {
      op: "PUSH1",
      value: "0x20",
    },
    4693: {
      op: "DUP2",
    },
    4694: {
      op: "MSTORE",
    },
    4695: {
      op: "PUSH1",
      value: "0x0",
    },
    4697: {
      op: "PUSH2",
      value: "0xDC2",
    },
    4700: {
      op: "PUSH1",
      value: "0x20",
    },
    4702: {
      op: "DUP4",
    },
    4703: {
      op: "ADD",
    },
    4704: {
      op: "DUP5",
    },
    4705: {
      op: "PUSH2",
      value: "0x1226",
    },
    4708: {
      jump: "i",
      op: "JUMP",
    },
    4709: {
      op: "JUMPDEST",
    },
    4710: {
      op: "PUSH1",
      value: "0x0",
    },
    4712: {
      op: "PUSH1",
      value: "0x20",
    },
    4714: {
      op: "DUP3",
    },
    4715: {
      op: "DUP5",
    },
    4716: {
      op: "SUB",
    },
    4717: {
      op: "SLT",
    },
    4718: {
      op: "ISZERO",
    },
    4719: {
      op: "PUSH2",
      value: "0x1277",
    },
    4722: {
      op: "JUMPI",
    },
    4723: {
      op: "PUSH1",
      value: "0x0",
    },
    4725: {
      op: "DUP1",
    },
    4726: {
      op: "REVERT",
    },
    4727: {
      op: "JUMPDEST",
    },
    4728: {
      op: "POP",
    },
    4729: {
      op: "CALLDATALOAD",
    },
    4730: {
      op: "SWAP2",
    },
    4731: {
      op: "SWAP1",
    },
    4732: {
      op: "POP",
    },
    4733: {
      jump: "o",
      op: "JUMP",
    },
    4734: {
      op: "JUMPDEST",
    },
    4735: {
      op: "DUP1",
    },
    4736: {
      op: "CALLDATALOAD",
    },
    4737: {
      op: "PUSH1",
      value: "0x1",
    },
    4739: {
      op: "PUSH1",
      value: "0x1",
    },
    4741: {
      op: "PUSH1",
      value: "0xA0",
    },
    4743: {
      op: "SHL",
    },
    4744: {
      op: "SUB",
    },
    4745: {
      op: "DUP2",
    },
    4746: {
      op: "AND",
    },
    4747: {
      op: "DUP2",
    },
    4748: {
      op: "EQ",
    },
    4749: {
      op: "PUSH2",
      value: "0x1295",
    },
    4752: {
      op: "JUMPI",
    },
    4753: {
      op: "PUSH1",
      value: "0x0",
    },
    4755: {
      op: "DUP1",
    },
    4756: {
      op: "REVERT",
    },
    4757: {
      op: "JUMPDEST",
    },
    4758: {
      op: "SWAP2",
    },
    4759: {
      op: "SWAP1",
    },
    4760: {
      op: "POP",
    },
    4761: {
      jump: "o",
      op: "JUMP",
    },
    4762: {
      op: "JUMPDEST",
    },
    4763: {
      op: "PUSH1",
      value: "0x0",
    },
    4765: {
      op: "DUP1",
    },
    4766: {
      op: "PUSH1",
      value: "0x40",
    },
    4768: {
      op: "DUP4",
    },
    4769: {
      op: "DUP6",
    },
    4770: {
      op: "SUB",
    },
    4771: {
      op: "SLT",
    },
    4772: {
      op: "ISZERO",
    },
    4773: {
      op: "PUSH2",
      value: "0x12AD",
    },
    4776: {
      op: "JUMPI",
    },
    4777: {
      op: "PUSH1",
      value: "0x0",
    },
    4779: {
      op: "DUP1",
    },
    4780: {
      op: "REVERT",
    },
    4781: {
      op: "JUMPDEST",
    },
    4782: {
      op: "PUSH2",
      value: "0x12B6",
    },
    4785: {
      op: "DUP4",
    },
    4786: {
      op: "PUSH2",
      value: "0x127E",
    },
    4789: {
      jump: "i",
      op: "JUMP",
    },
    4790: {
      op: "JUMPDEST",
    },
    4791: {
      op: "SWAP5",
    },
    4792: {
      op: "PUSH1",
      value: "0x20",
    },
    4794: {
      op: "SWAP4",
    },
    4795: {
      op: "SWAP1",
    },
    4796: {
      op: "SWAP4",
    },
    4797: {
      op: "ADD",
    },
    4798: {
      op: "CALLDATALOAD",
    },
    4799: {
      op: "SWAP4",
    },
    4800: {
      op: "POP",
    },
    4801: {
      op: "POP",
    },
    4802: {
      op: "POP",
    },
    4803: {
      jump: "o",
      op: "JUMP",
    },
    4804: {
      op: "JUMPDEST",
    },
    4805: {
      op: "PUSH1",
      value: "0x0",
    },
    4807: {
      op: "DUP1",
    },
    4808: {
      op: "PUSH1",
      value: "0x0",
    },
    4810: {
      op: "PUSH1",
      value: "0x60",
    },
    4812: {
      op: "DUP5",
    },
    4813: {
      op: "DUP7",
    },
    4814: {
      op: "SUB",
    },
    4815: {
      op: "SLT",
    },
    4816: {
      op: "ISZERO",
    },
    4817: {
      op: "PUSH2",
      value: "0x12D9",
    },
    4820: {
      op: "JUMPI",
    },
    4821: {
      op: "PUSH1",
      value: "0x0",
    },
    4823: {
      op: "DUP1",
    },
    4824: {
      op: "REVERT",
    },
    4825: {
      op: "JUMPDEST",
    },
    4826: {
      op: "PUSH2",
      value: "0x12E2",
    },
    4829: {
      op: "DUP5",
    },
    4830: {
      op: "PUSH2",
      value: "0x127E",
    },
    4833: {
      jump: "i",
      op: "JUMP",
    },
    4834: {
      op: "JUMPDEST",
    },
    4835: {
      op: "SWAP3",
    },
    4836: {
      op: "POP",
    },
    4837: {
      op: "PUSH2",
      value: "0x12F0",
    },
    4840: {
      op: "PUSH1",
      value: "0x20",
    },
    4842: {
      op: "DUP6",
    },
    4843: {
      op: "ADD",
    },
    4844: {
      op: "PUSH2",
      value: "0x127E",
    },
    4847: {
      jump: "i",
      op: "JUMP",
    },
    4848: {
      op: "JUMPDEST",
    },
    4849: {
      op: "SWAP2",
    },
    4850: {
      op: "POP",
    },
    4851: {
      op: "PUSH1",
      value: "0x40",
    },
    4853: {
      op: "DUP5",
    },
    4854: {
      op: "ADD",
    },
    4855: {
      op: "CALLDATALOAD",
    },
    4856: {
      op: "SWAP1",
    },
    4857: {
      op: "POP",
    },
    4858: {
      op: "SWAP3",
    },
    4859: {
      op: "POP",
    },
    4860: {
      op: "SWAP3",
    },
    4861: {
      op: "POP",
    },
    4862: {
      op: "SWAP3",
    },
    4863: {
      jump: "o",
      op: "JUMP",
    },
    4864: {
      op: "JUMPDEST",
    },
    4865: {
      op: "PUSH4",
      value: "0x4E487B71",
    },
    4870: {
      op: "PUSH1",
      value: "0xE0",
    },
    4872: {
      op: "SHL",
    },
    4873: {
      op: "PUSH1",
      value: "0x0",
    },
    4875: {
      op: "MSTORE",
    },
    4876: {
      op: "PUSH1",
      value: "0x41",
    },
    4878: {
      op: "PUSH1",
      value: "0x4",
    },
    4880: {
      op: "MSTORE",
    },
    4881: {
      op: "PUSH1",
      value: "0x24",
    },
    4883: {
      op: "PUSH1",
      value: "0x0",
    },
    4885: {
      op: "REVERT",
    },
    4886: {
      op: "JUMPDEST",
    },
    4887: {
      op: "PUSH1",
      value: "0x0",
    },
    4889: {
      op: "PUSH8",
      value: "0xFFFFFFFFFFFFFFFF",
    },
    4898: {
      op: "DUP1",
    },
    4899: {
      op: "DUP5",
    },
    4900: {
      op: "GT",
    },
    4901: {
      op: "ISZERO",
    },
    4902: {
      op: "PUSH2",
      value: "0x1331",
    },
    4905: {
      op: "JUMPI",
    },
    4906: {
      op: "PUSH2",
      value: "0x1331",
    },
    4909: {
      op: "PUSH2",
      value: "0x1300",
    },
    4912: {
      jump: "i",
      op: "JUMP",
    },
    4913: {
      op: "JUMPDEST",
    },
    4914: {
      op: "PUSH1",
      value: "0x40",
    },
    4916: {
      op: "MLOAD",
    },
    4917: {
      op: "PUSH1",
      value: "0x1F",
    },
    4919: {
      op: "DUP6",
    },
    4920: {
      op: "ADD",
    },
    4921: {
      op: "PUSH1",
      value: "0x1F",
    },
    4923: {
      op: "NOT",
    },
    4924: {
      op: "SWAP1",
    },
    4925: {
      op: "DUP2",
    },
    4926: {
      op: "AND",
    },
    4927: {
      op: "PUSH1",
      value: "0x3F",
    },
    4929: {
      op: "ADD",
    },
    4930: {
      op: "AND",
    },
    4931: {
      op: "DUP2",
    },
    4932: {
      op: "ADD",
    },
    4933: {
      op: "SWAP1",
    },
    4934: {
      op: "DUP3",
    },
    4935: {
      op: "DUP3",
    },
    4936: {
      op: "GT",
    },
    4937: {
      op: "DUP2",
    },
    4938: {
      op: "DUP4",
    },
    4939: {
      op: "LT",
    },
    4940: {
      op: "OR",
    },
    4941: {
      op: "ISZERO",
    },
    4942: {
      op: "PUSH2",
      value: "0x1359",
    },
    4945: {
      op: "JUMPI",
    },
    4946: {
      op: "PUSH2",
      value: "0x1359",
    },
    4949: {
      op: "PUSH2",
      value: "0x1300",
    },
    4952: {
      jump: "i",
      op: "JUMP",
    },
    4953: {
      op: "JUMPDEST",
    },
    4954: {
      op: "DUP2",
    },
    4955: {
      op: "PUSH1",
      value: "0x40",
    },
    4957: {
      op: "MSTORE",
    },
    4958: {
      op: "DUP1",
    },
    4959: {
      op: "SWAP4",
    },
    4960: {
      op: "POP",
    },
    4961: {
      op: "DUP6",
    },
    4962: {
      op: "DUP2",
    },
    4963: {
      op: "MSTORE",
    },
    4964: {
      op: "DUP7",
    },
    4965: {
      op: "DUP7",
    },
    4966: {
      op: "DUP7",
    },
    4967: {
      op: "ADD",
    },
    4968: {
      op: "GT",
    },
    4969: {
      op: "ISZERO",
    },
    4970: {
      op: "PUSH2",
      value: "0x1372",
    },
    4973: {
      op: "JUMPI",
    },
    4974: {
      op: "PUSH1",
      value: "0x0",
    },
    4976: {
      op: "DUP1",
    },
    4977: {
      op: "REVERT",
    },
    4978: {
      op: "JUMPDEST",
    },
    4979: {
      op: "DUP6",
    },
    4980: {
      op: "DUP6",
    },
    4981: {
      op: "PUSH1",
      value: "0x20",
    },
    4983: {
      op: "DUP4",
    },
    4984: {
      op: "ADD",
    },
    4985: {
      op: "CALLDATACOPY",
    },
    4986: {
      op: "PUSH1",
      value: "0x0",
    },
    4988: {
      op: "PUSH1",
      value: "0x20",
    },
    4990: {
      op: "DUP8",
    },
    4991: {
      op: "DUP4",
    },
    4992: {
      op: "ADD",
    },
    4993: {
      op: "ADD",
    },
    4994: {
      op: "MSTORE",
    },
    4995: {
      op: "POP",
    },
    4996: {
      op: "POP",
    },
    4997: {
      op: "POP",
    },
    4998: {
      op: "SWAP4",
    },
    4999: {
      op: "SWAP3",
    },
    5000: {
      op: "POP",
    },
    5001: {
      op: "POP",
    },
    5002: {
      op: "POP",
    },
    5003: {
      jump: "o",
      op: "JUMP",
    },
    5004: {
      op: "JUMPDEST",
    },
    5005: {
      op: "PUSH1",
      value: "0x0",
    },
    5007: {
      op: "PUSH1",
      value: "0x20",
    },
    5009: {
      op: "DUP3",
    },
    5010: {
      op: "DUP5",
    },
    5011: {
      op: "SUB",
    },
    5012: {
      op: "SLT",
    },
    5013: {
      op: "ISZERO",
    },
    5014: {
      op: "PUSH2",
      value: "0x139E",
    },
    5017: {
      op: "JUMPI",
    },
    5018: {
      op: "PUSH1",
      value: "0x0",
    },
    5020: {
      op: "DUP1",
    },
    5021: {
      op: "REVERT",
    },
    5022: {
      op: "JUMPDEST",
    },
    5023: {
      op: "DUP2",
    },
    5024: {
      op: "CALLDATALOAD",
    },
    5025: {
      op: "PUSH8",
      value: "0xFFFFFFFFFFFFFFFF",
    },
    5034: {
      op: "DUP2",
    },
    5035: {
      op: "GT",
    },
    5036: {
      op: "ISZERO",
    },
    5037: {
      op: "PUSH2",
      value: "0x13B5",
    },
    5040: {
      op: "JUMPI",
    },
    5041: {
      op: "PUSH1",
      value: "0x0",
    },
    5043: {
      op: "DUP1",
    },
    5044: {
      op: "REVERT",
    },
    5045: {
      op: "JUMPDEST",
    },
    5046: {
      op: "DUP3",
    },
    5047: {
      op: "ADD",
    },
    5048: {
      op: "PUSH1",
      value: "0x1F",
    },
    5050: {
      op: "DUP2",
    },
    5051: {
      op: "ADD",
    },
    5052: {
      op: "DUP5",
    },
    5053: {
      op: "SGT",
    },
    5054: {
      op: "PUSH2",
      value: "0x13C6",
    },
    5057: {
      op: "JUMPI",
    },
    5058: {
      op: "PUSH1",
      value: "0x0",
    },
    5060: {
      op: "DUP1",
    },
    5061: {
      op: "REVERT",
    },
    5062: {
      op: "JUMPDEST",
    },
    5063: {
      op: "PUSH2",
      value: "0x831",
    },
    5066: {
      op: "DUP5",
    },
    5067: {
      op: "DUP3",
    },
    5068: {
      op: "CALLDATALOAD",
    },
    5069: {
      op: "PUSH1",
      value: "0x20",
    },
    5071: {
      op: "DUP5",
    },
    5072: {
      op: "ADD",
    },
    5073: {
      op: "PUSH2",
      value: "0x1316",
    },
    5076: {
      jump: "i",
      op: "JUMP",
    },
    5077: {
      op: "JUMPDEST",
    },
    5078: {
      op: "PUSH1",
      value: "0x0",
    },
    5080: {
      op: "PUSH1",
      value: "0x20",
    },
    5082: {
      op: "DUP3",
    },
    5083: {
      op: "DUP5",
    },
    5084: {
      op: "SUB",
    },
    5085: {
      op: "SLT",
    },
    5086: {
      op: "ISZERO",
    },
    5087: {
      op: "PUSH2",
      value: "0x13E7",
    },
    5090: {
      op: "JUMPI",
    },
    5091: {
      op: "PUSH1",
      value: "0x0",
    },
    5093: {
      op: "DUP1",
    },
    5094: {
      op: "REVERT",
    },
    5095: {
      op: "JUMPDEST",
    },
    5096: {
      op: "PUSH2",
      value: "0xDC2",
    },
    5099: {
      op: "DUP3",
    },
    5100: {
      op: "PUSH2",
      value: "0x127E",
    },
    5103: {
      jump: "i",
      op: "JUMP",
    },
    5104: {
      op: "JUMPDEST",
    },
    5105: {
      op: "PUSH1",
      value: "0x0",
    },
    5107: {
      op: "DUP1",
    },
    5108: {
      op: "PUSH1",
      value: "0x40",
    },
    5110: {
      op: "DUP4",
    },
    5111: {
      op: "DUP6",
    },
    5112: {
      op: "SUB",
    },
    5113: {
      op: "SLT",
    },
    5114: {
      op: "ISZERO",
    },
    5115: {
      op: "PUSH2",
      value: "0x1403",
    },
    5118: {
      op: "JUMPI",
    },
    5119: {
      op: "PUSH1",
      value: "0x0",
    },
    5121: {
      op: "DUP1",
    },
    5122: {
      op: "REVERT",
    },
    5123: {
      op: "JUMPDEST",
    },
    5124: {
      op: "PUSH2",
      value: "0x140C",
    },
    5127: {
      op: "DUP4",
    },
    5128: {
      op: "PUSH2",
      value: "0x127E",
    },
    5131: {
      jump: "i",
      op: "JUMP",
    },
    5132: {
      op: "JUMPDEST",
    },
    5133: {
      op: "SWAP2",
    },
    5134: {
      op: "POP",
    },
    5135: {
      op: "PUSH1",
      value: "0x20",
    },
    5137: {
      op: "DUP4",
    },
    5138: {
      op: "ADD",
    },
    5139: {
      op: "CALLDATALOAD",
    },
    5140: {
      op: "DUP1",
    },
    5141: {
      op: "ISZERO",
    },
    5142: {
      op: "ISZERO",
    },
    5143: {
      op: "DUP2",
    },
    5144: {
      op: "EQ",
    },
    5145: {
      op: "PUSH2",
      value: "0x1421",
    },
    5148: {
      op: "JUMPI",
    },
    5149: {
      op: "PUSH1",
      value: "0x0",
    },
    5151: {
      op: "DUP1",
    },
    5152: {
      op: "REVERT",
    },
    5153: {
      op: "JUMPDEST",
    },
    5154: {
      op: "DUP1",
    },
    5155: {
      op: "SWAP2",
    },
    5156: {
      op: "POP",
    },
    5157: {
      op: "POP",
    },
    5158: {
      op: "SWAP3",
    },
    5159: {
      op: "POP",
    },
    5160: {
      op: "SWAP3",
    },
    5161: {
      op: "SWAP1",
    },
    5162: {
      op: "POP",
    },
    5163: {
      jump: "o",
      op: "JUMP",
    },
    5164: {
      op: "JUMPDEST",
    },
    5165: {
      op: "PUSH1",
      value: "0x0",
    },
    5167: {
      op: "DUP1",
    },
    5168: {
      op: "PUSH1",
      value: "0x0",
    },
    5170: {
      op: "DUP1",
    },
    5171: {
      op: "PUSH1",
      value: "0x80",
    },
    5173: {
      op: "DUP6",
    },
    5174: {
      op: "DUP8",
    },
    5175: {
      op: "SUB",
    },
    5176: {
      op: "SLT",
    },
    5177: {
      op: "ISZERO",
    },
    5178: {
      op: "PUSH2",
      value: "0x1442",
    },
    5181: {
      op: "JUMPI",
    },
    5182: {
      op: "PUSH1",
      value: "0x0",
    },
    5184: {
      op: "DUP1",
    },
    5185: {
      op: "REVERT",
    },
    5186: {
      op: "JUMPDEST",
    },
    5187: {
      op: "PUSH2",
      value: "0x144B",
    },
    5190: {
      op: "DUP6",
    },
    5191: {
      op: "PUSH2",
      value: "0x127E",
    },
    5194: {
      jump: "i",
      op: "JUMP",
    },
    5195: {
      op: "JUMPDEST",
    },
    5196: {
      op: "SWAP4",
    },
    5197: {
      op: "POP",
    },
    5198: {
      op: "PUSH2",
      value: "0x1459",
    },
    5201: {
      op: "PUSH1",
      value: "0x20",
    },
    5203: {
      op: "DUP7",
    },
    5204: {
      op: "ADD",
    },
    5205: {
      op: "PUSH2",
      value: "0x127E",
    },
    5208: {
      jump: "i",
      op: "JUMP",
    },
    5209: {
      op: "JUMPDEST",
    },
    5210: {
      op: "SWAP3",
    },
    5211: {
      op: "POP",
    },
    5212: {
      op: "PUSH1",
      value: "0x40",
    },
    5214: {
      op: "DUP6",
    },
    5215: {
      op: "ADD",
    },
    5216: {
      op: "CALLDATALOAD",
    },
    5217: {
      op: "SWAP2",
    },
    5218: {
      op: "POP",
    },
    5219: {
      op: "PUSH1",
      value: "0x60",
    },
    5221: {
      op: "DUP6",
    },
    5222: {
      op: "ADD",
    },
    5223: {
      op: "CALLDATALOAD",
    },
    5224: {
      op: "PUSH8",
      value: "0xFFFFFFFFFFFFFFFF",
    },
    5233: {
      op: "DUP2",
    },
    5234: {
      op: "GT",
    },
    5235: {
      op: "ISZERO",
    },
    5236: {
      op: "PUSH2",
      value: "0x147C",
    },
    5239: {
      op: "JUMPI",
    },
    5240: {
      op: "PUSH1",
      value: "0x0",
    },
    5242: {
      op: "DUP1",
    },
    5243: {
      op: "REVERT",
    },
    5244: {
      op: "JUMPDEST",
    },
    5245: {
      op: "DUP6",
    },
    5246: {
      op: "ADD",
    },
    5247: {
      op: "PUSH1",
      value: "0x1F",
    },
    5249: {
      op: "DUP2",
    },
    5250: {
      op: "ADD",
    },
    5251: {
      op: "DUP8",
    },
    5252: {
      op: "SGT",
    },
    5253: {
      op: "PUSH2",
      value: "0x148D",
    },
    5256: {
      op: "JUMPI",
    },
    5257: {
      op: "PUSH1",
      value: "0x0",
    },
    5259: {
      op: "DUP1",
    },
    5260: {
      op: "REVERT",
    },
    5261: {
      op: "JUMPDEST",
    },
    5262: {
      op: "PUSH2",
      value: "0x149C",
    },
    5265: {
      op: "DUP8",
    },
    5266: {
      op: "DUP3",
    },
    5267: {
      op: "CALLDATALOAD",
    },
    5268: {
      op: "PUSH1",
      value: "0x20",
    },
    5270: {
      op: "DUP5",
    },
    5271: {
      op: "ADD",
    },
    5272: {
      op: "PUSH2",
      value: "0x1316",
    },
    5275: {
      jump: "i",
      op: "JUMP",
    },
    5276: {
      op: "JUMPDEST",
    },
    5277: {
      op: "SWAP2",
    },
    5278: {
      op: "POP",
    },
    5279: {
      op: "POP",
    },
    5280: {
      op: "SWAP3",
    },
    5281: {
      op: "SWAP6",
    },
    5282: {
      op: "SWAP2",
    },
    5283: {
      op: "SWAP5",
    },
    5284: {
      op: "POP",
    },
    5285: {
      op: "SWAP3",
    },
    5286: {
      op: "POP",
    },
    5287: {
      jump: "o",
      op: "JUMP",
    },
    5288: {
      op: "JUMPDEST",
    },
    5289: {
      op: "PUSH1",
      value: "0x0",
    },
    5291: {
      op: "DUP1",
    },
    5292: {
      op: "PUSH1",
      value: "0x40",
    },
    5294: {
      op: "DUP4",
    },
    5295: {
      op: "DUP6",
    },
    5296: {
      op: "SUB",
    },
    5297: {
      op: "SLT",
    },
    5298: {
      op: "ISZERO",
    },
    5299: {
      op: "PUSH2",
      value: "0x14BB",
    },
    5302: {
      op: "JUMPI",
    },
    5303: {
      op: "PUSH1",
      value: "0x0",
    },
    5305: {
      op: "DUP1",
    },
    5306: {
      op: "REVERT",
    },
    5307: {
      op: "JUMPDEST",
    },
    5308: {
      op: "PUSH2",
      value: "0x14C4",
    },
    5311: {
      op: "DUP4",
    },
    5312: {
      op: "PUSH2",
      value: "0x127E",
    },
    5315: {
      jump: "i",
      op: "JUMP",
    },
    5316: {
      op: "JUMPDEST",
    },
    5317: {
      op: "SWAP2",
    },
    5318: {
      op: "POP",
    },
    5319: {
      op: "PUSH2",
      value: "0x14D2",
    },
    5322: {
      op: "PUSH1",
      value: "0x20",
    },
    5324: {
      op: "DUP5",
    },
    5325: {
      op: "ADD",
    },
    5326: {
      op: "PUSH2",
      value: "0x127E",
    },
    5329: {
      jump: "i",
      op: "JUMP",
    },
    5330: {
      op: "JUMPDEST",
    },
    5331: {
      op: "SWAP1",
    },
    5332: {
      op: "POP",
    },
    5333: {
      op: "SWAP3",
    },
    5334: {
      op: "POP",
    },
    5335: {
      op: "SWAP3",
    },
    5336: {
      op: "SWAP1",
    },
    5337: {
      op: "POP",
    },
    5338: {
      jump: "o",
      op: "JUMP",
    },
    5339: {
      op: "JUMPDEST",
    },
    5340: {
      op: "PUSH1",
      value: "0x1",
    },
    5342: {
      op: "DUP2",
    },
    5343: {
      op: "DUP2",
    },
    5344: {
      op: "SHR",
    },
    5345: {
      op: "SWAP1",
    },
    5346: {
      op: "DUP3",
    },
    5347: {
      op: "AND",
    },
    5348: {
      op: "DUP1",
    },
    5349: {
      op: "PUSH2",
      value: "0x14EF",
    },
    5352: {
      op: "JUMPI",
    },
    5353: {
      op: "PUSH1",
      value: "0x7F",
    },
    5355: {
      op: "DUP3",
    },
    5356: {
      op: "AND",
    },
    5357: {
      op: "SWAP2",
    },
    5358: {
      op: "POP",
    },
    5359: {
      op: "JUMPDEST",
    },
    5360: {
      op: "PUSH1",
      value: "0x20",
    },
    5362: {
      op: "DUP3",
    },
    5363: {
      op: "LT",
    },
    5364: {
      op: "DUP2",
    },
    5365: {
      op: "EQ",
    },
    5366: {
      op: "ISZERO",
    },
    5367: {
      op: "PUSH2",
      value: "0x1510",
    },
    5370: {
      op: "JUMPI",
    },
    5371: {
      op: "PUSH4",
      value: "0x4E487B71",
    },
    5376: {
      op: "PUSH1",
      value: "0xE0",
    },
    5378: {
      op: "SHL",
    },
    5379: {
      op: "PUSH1",
      value: "0x0",
    },
    5381: {
      op: "MSTORE",
    },
    5382: {
      op: "PUSH1",
      value: "0x22",
    },
    5384: {
      op: "PUSH1",
      value: "0x4",
    },
    5386: {
      op: "MSTORE",
    },
    5387: {
      op: "PUSH1",
      value: "0x24",
    },
    5389: {
      op: "PUSH1",
      value: "0x0",
    },
    5391: {
      op: "REVERT",
    },
    5392: {
      op: "JUMPDEST",
    },
    5393: {
      op: "POP",
    },
    5394: {
      op: "SWAP2",
    },
    5395: {
      op: "SWAP1",
    },
    5396: {
      op: "POP",
    },
    5397: {
      jump: "o",
      op: "JUMP",
    },
    5398: {
      op: "JUMPDEST",
    },
    5399: {
      op: "PUSH1",
      value: "0x20",
    },
    5401: {
      op: "DUP1",
    },
    5402: {
      op: "DUP3",
    },
    5403: {
      op: "MSTORE",
    },
    5404: {
      op: "PUSH1",
      value: "0x31",
    },
    5406: {
      op: "SWAP1",
    },
    5407: {
      op: "DUP3",
    },
    5408: {
      op: "ADD",
    },
    5409: {
      op: "MSTORE",
    },
    5410: {
      op: "PUSH32",
      value:
        "0x4552433732313A207472616E736665722063616C6C6572206973206E6F74206F",
    },
    5443: {
      op: "PUSH1",
      value: "0x40",
    },
    5445: {
      op: "DUP3",
    },
    5446: {
      op: "ADD",
    },
    5447: {
      op: "MSTORE",
    },
    5448: {
      op: "PUSH17",
      value: "0x1DDB995C881B9BDC88185C1C1C9BDD9959",
    },
    5466: {
      op: "PUSH1",
      value: "0x7A",
    },
    5468: {
      op: "SHL",
    },
    5469: {
      op: "PUSH1",
      value: "0x60",
    },
    5471: {
      op: "DUP3",
    },
    5472: {
      op: "ADD",
    },
    5473: {
      op: "MSTORE",
    },
    5474: {
      op: "PUSH1",
      value: "0x80",
    },
    5476: {
      op: "ADD",
    },
    5477: {
      op: "SWAP1",
    },
    5478: {
      jump: "o",
      op: "JUMP",
    },
    5479: {
      op: "JUMPDEST",
    },
    5480: {
      op: "PUSH4",
      value: "0x4E487B71",
    },
    5485: {
      op: "PUSH1",
      value: "0xE0",
    },
    5487: {
      op: "SHL",
    },
    5488: {
      op: "PUSH1",
      value: "0x0",
    },
    5490: {
      op: "MSTORE",
    },
    5491: {
      op: "PUSH1",
      value: "0x11",
    },
    5493: {
      op: "PUSH1",
      value: "0x4",
    },
    5495: {
      op: "MSTORE",
    },
    5496: {
      op: "PUSH1",
      value: "0x24",
    },
    5498: {
      op: "PUSH1",
      value: "0x0",
    },
    5500: {
      op: "REVERT",
    },
    5501: {
      op: "JUMPDEST",
    },
    5502: {
      op: "PUSH1",
      value: "0x0",
    },
    5504: {
      op: "DUP3",
    },
    5505: {
      op: "NOT",
    },
    5506: {
      op: "DUP3",
    },
    5507: {
      op: "GT",
    },
    5508: {
      op: "ISZERO",
    },
    5509: {
      op: "PUSH2",
      value: "0x1590",
    },
    5512: {
      op: "JUMPI",
    },
    5513: {
      op: "PUSH2",
      value: "0x1590",
    },
    5516: {
      op: "PUSH2",
      value: "0x1567",
    },
    5519: {
      jump: "i",
      op: "JUMP",
    },
    5520: {
      op: "JUMPDEST",
    },
    5521: {
      op: "POP",
    },
    5522: {
      op: "ADD",
    },
    5523: {
      op: "SWAP1",
    },
    5524: {
      jump: "o",
      op: "JUMP",
    },
    5525: {
      op: "JUMPDEST",
    },
    5526: {
      op: "PUSH1",
      value: "0x0",
    },
    5528: {
      op: "DUP4",
    },
    5529: {
      op: "MLOAD",
    },
    5530: {
      op: "PUSH2",
      value: "0x15A7",
    },
    5533: {
      op: "DUP2",
    },
    5534: {
      op: "DUP5",
    },
    5535: {
      op: "PUSH1",
      value: "0x20",
    },
    5537: {
      op: "DUP9",
    },
    5538: {
      op: "ADD",
    },
    5539: {
      op: "PUSH2",
      value: "0x11FA",
    },
    5542: {
      jump: "i",
      op: "JUMP",
    },
    5543: {
      op: "JUMPDEST",
    },
    5544: {
      op: "DUP4",
    },
    5545: {
      op: "MLOAD",
    },
    5546: {
      op: "SWAP1",
    },
    5547: {
      op: "DUP4",
    },
    5548: {
      op: "ADD",
    },
    5549: {
      op: "SWAP1",
    },
    5550: {
      op: "PUSH2",
      value: "0x15BB",
    },
    5553: {
      op: "DUP2",
    },
    5554: {
      op: "DUP4",
    },
    5555: {
      op: "PUSH1",
      value: "0x20",
    },
    5557: {
      op: "DUP9",
    },
    5558: {
      op: "ADD",
    },
    5559: {
      op: "PUSH2",
      value: "0x11FA",
    },
    5562: {
      jump: "i",
      op: "JUMP",
    },
    5563: {
      op: "JUMPDEST",
    },
    5564: {
      op: "ADD",
    },
    5565: {
      op: "SWAP5",
    },
    5566: {
      op: "SWAP4",
    },
    5567: {
      op: "POP",
    },
    5568: {
      op: "POP",
    },
    5569: {
      op: "POP",
    },
    5570: {
      op: "POP",
    },
    5571: {
      jump: "o",
      op: "JUMP",
    },
    5572: {
      op: "JUMPDEST",
    },
    5573: {
      op: "PUSH1",
      value: "0x0",
    },
    5575: {
      op: "DUP3",
    },
    5576: {
      op: "DUP3",
    },
    5577: {
      op: "LT",
    },
    5578: {
      op: "ISZERO",
    },
    5579: {
      op: "PUSH2",
      value: "0x15D6",
    },
    5582: {
      op: "JUMPI",
    },
    5583: {
      op: "PUSH2",
      value: "0x15D6",
    },
    5586: {
      op: "PUSH2",
      value: "0x1567",
    },
    5589: {
      jump: "i",
      op: "JUMP",
    },
    5590: {
      op: "JUMPDEST",
    },
    5591: {
      op: "POP",
    },
    5592: {
      op: "SUB",
    },
    5593: {
      op: "SWAP1",
    },
    5594: {
      jump: "o",
      op: "JUMP",
    },
    5595: {
      op: "JUMPDEST",
    },
    5596: {
      op: "PUSH1",
      value: "0x20",
    },
    5598: {
      op: "DUP1",
    },
    5599: {
      op: "DUP3",
    },
    5600: {
      op: "MSTORE",
    },
    5601: {
      op: "PUSH1",
      value: "0x32",
    },
    5603: {
      op: "SWAP1",
    },
    5604: {
      op: "DUP3",
    },
    5605: {
      op: "ADD",
    },
    5606: {
      op: "MSTORE",
    },
    5607: {
      op: "PUSH32",
      value:
        "0x4552433732313A207472616E7366657220746F206E6F6E204552433732315265",
    },
    5640: {
      op: "PUSH1",
      value: "0x40",
    },
    5642: {
      op: "DUP3",
    },
    5643: {
      op: "ADD",
    },
    5644: {
      op: "MSTORE",
    },
    5645: {
      op: "PUSH18",
      value: "0x31B2B4BB32B91034B6B83632B6B2B73A32B9",
    },
    5664: {
      op: "PUSH1",
      value: "0x71",
    },
    5666: {
      op: "SHL",
    },
    5667: {
      op: "PUSH1",
      value: "0x60",
    },
    5669: {
      op: "DUP3",
    },
    5670: {
      op: "ADD",
    },
    5671: {
      op: "MSTORE",
    },
    5672: {
      op: "PUSH1",
      value: "0x80",
    },
    5674: {
      op: "ADD",
    },
    5675: {
      op: "SWAP1",
    },
    5676: {
      jump: "o",
      op: "JUMP",
    },
    5677: {
      op: "JUMPDEST",
    },
    5678: {
      op: "PUSH1",
      value: "0x1",
    },
    5680: {
      op: "PUSH1",
      value: "0x1",
    },
    5682: {
      op: "PUSH1",
      value: "0xA0",
    },
    5684: {
      op: "SHL",
    },
    5685: {
      op: "SUB",
    },
    5686: {
      op: "DUP6",
    },
    5687: {
      op: "DUP2",
    },
    5688: {
      op: "AND",
    },
    5689: {
      op: "DUP3",
    },
    5690: {
      op: "MSTORE",
    },
    5691: {
      op: "DUP5",
    },
    5692: {
      op: "AND",
    },
    5693: {
      op: "PUSH1",
      value: "0x20",
    },
    5695: {
      op: "DUP3",
    },
    5696: {
      op: "ADD",
    },
    5697: {
      op: "MSTORE",
    },
    5698: {
      op: "PUSH1",
      value: "0x40",
    },
    5700: {
      op: "DUP2",
    },
    5701: {
      op: "ADD",
    },
    5702: {
      op: "DUP4",
    },
    5703: {
      op: "SWAP1",
    },
    5704: {
      op: "MSTORE",
    },
    5705: {
      op: "PUSH1",
      value: "0x80",
    },
    5707: {
      op: "PUSH1",
      value: "0x60",
    },
    5709: {
      op: "DUP3",
    },
    5710: {
      op: "ADD",
    },
    5711: {
      op: "DUP2",
    },
    5712: {
      op: "SWAP1",
    },
    5713: {
      op: "MSTORE",
    },
    5714: {
      op: "PUSH1",
      value: "0x0",
    },
    5716: {
      op: "SWAP1",
    },
    5717: {
      op: "PUSH2",
      value: "0x1660",
    },
    5720: {
      op: "SWAP1",
    },
    5721: {
      op: "DUP4",
    },
    5722: {
      op: "ADD",
    },
    5723: {
      op: "DUP5",
    },
    5724: {
      op: "PUSH2",
      value: "0x1226",
    },
    5727: {
      jump: "i",
      op: "JUMP",
    },
    5728: {
      op: "JUMPDEST",
    },
    5729: {
      op: "SWAP7",
    },
    5730: {
      op: "SWAP6",
    },
    5731: {
      op: "POP",
    },
    5732: {
      op: "POP",
    },
    5733: {
      op: "POP",
    },
    5734: {
      op: "POP",
    },
    5735: {
      op: "POP",
    },
    5736: {
      op: "POP",
    },
    5737: {
      jump: "o",
      op: "JUMP",
    },
    5738: {
      op: "JUMPDEST",
    },
    5739: {
      op: "PUSH1",
      value: "0x0",
    },
    5741: {
      op: "PUSH1",
      value: "0x20",
    },
    5743: {
      op: "DUP3",
    },
    5744: {
      op: "DUP5",
    },
    5745: {
      op: "SUB",
    },
    5746: {
      op: "SLT",
    },
    5747: {
      op: "ISZERO",
    },
    5748: {
      op: "PUSH2",
      value: "0x167C",
    },
    5751: {
      op: "JUMPI",
    },
    5752: {
      op: "PUSH1",
      value: "0x0",
    },
    5754: {
      op: "DUP1",
    },
    5755: {
      op: "REVERT",
    },
    5756: {
      op: "JUMPDEST",
    },
    5757: {
      op: "DUP2",
    },
    5758: {
      op: "MLOAD",
    },
    5759: {
      op: "PUSH2",
      value: "0xDC2",
    },
    5762: {
      op: "DUP2",
    },
    5763: {
      op: "PUSH2",
      value: "0x11C4",
    },
    5766: {
      jump: "i",
      op: "JUMP",
    },
    5767: {
      op: "JUMPDEST",
    },
    5768: {
      op: "PUSH1",
      value: "0x0",
    },
    5770: {
      op: "PUSH1",
      value: "0x0",
    },
    5772: {
      op: "NOT",
    },
    5773: {
      op: "DUP3",
    },
    5774: {
      op: "EQ",
    },
    5775: {
      op: "ISZERO",
    },
    5776: {
      op: "PUSH2",
      value: "0x169B",
    },
    5779: {
      op: "JUMPI",
    },
    5780: {
      op: "PUSH2",
      value: "0x169B",
    },
    5783: {
      op: "PUSH2",
      value: "0x1567",
    },
    5786: {
      jump: "i",
      op: "JUMP",
    },
    5787: {
      op: "JUMPDEST",
    },
    5788: {
      op: "POP",
    },
    5789: {
      op: "PUSH1",
      value: "0x1",
    },
    5791: {
      op: "ADD",
    },
    5792: {
      op: "SWAP1",
    },
    5793: {
      jump: "o",
      op: "JUMP",
    },
    5794: {
      op: "JUMPDEST",
    },
    5795: {
      op: "PUSH4",
      value: "0x4E487B71",
    },
    5800: {
      op: "PUSH1",
      value: "0xE0",
    },
    5802: {
      op: "SHL",
    },
    5803: {
      op: "PUSH1",
      value: "0x0",
    },
    5805: {
      op: "MSTORE",
    },
    5806: {
      op: "PUSH1",
      value: "0x12",
    },
    5808: {
      op: "PUSH1",
      value: "0x4",
    },
    5810: {
      op: "MSTORE",
    },
    5811: {
      op: "PUSH1",
      value: "0x24",
    },
    5813: {
      op: "PUSH1",
      value: "0x0",
    },
    5815: {
      op: "REVERT",
    },
    5816: {
      op: "JUMPDEST",
    },
    5817: {
      op: "PUSH1",
      value: "0x0",
    },
    5819: {
      op: "DUP3",
    },
    5820: {
      op: "PUSH2",
      value: "0x16C7",
    },
    5823: {
      op: "JUMPI",
    },
    5824: {
      op: "PUSH2",
      value: "0x16C7",
    },
    5827: {
      op: "PUSH2",
      value: "0x16A2",
    },
    5830: {
      jump: "i",
      op: "JUMP",
    },
    5831: {
      op: "JUMPDEST",
    },
    5832: {
      op: "POP",
    },
    5833: {
      op: "DIV",
    },
    5834: {
      op: "SWAP1",
    },
    5835: {
      jump: "o",
      op: "JUMP",
    },
    5836: {
      op: "JUMPDEST",
    },
    5837: {
      op: "PUSH1",
      value: "0x0",
    },
    5839: {
      op: "DUP3",
    },
    5840: {
      op: "PUSH2",
      value: "0x16DB",
    },
    5843: {
      op: "JUMPI",
    },
    5844: {
      op: "PUSH2",
      value: "0x16DB",
    },
    5847: {
      op: "PUSH2",
      value: "0x16A2",
    },
    5850: {
      jump: "i",
      op: "JUMP",
    },
    5851: {
      op: "JUMPDEST",
    },
    5852: {
      op: "POP",
    },
    5853: {
      op: "MOD",
    },
    5854: {
      op: "SWAP1",
    },
    5855: {
      jump: "o",
      op: "JUMP",
    },
    5856: {
      op: "JUMPDEST",
    },
    5857: {
      op: "PUSH4",
      value: "0x4E487B71",
    },
    5862: {
      op: "PUSH1",
      value: "0xE0",
    },
    5864: {
      op: "SHL",
    },
    5865: {
      op: "PUSH1",
      value: "0x0",
    },
    5867: {
      op: "MSTORE",
    },
    5868: {
      op: "PUSH1",
      value: "0x32",
    },
    5870: {
      op: "PUSH1",
      value: "0x4",
    },
    5872: {
      op: "MSTORE",
    },
    5873: {
      op: "PUSH1",
      value: "0x24",
    },
    5875: {
      op: "PUSH1",
      value: "0x0",
    },
    5877: {
      op: "REVERT",
    },
  },
  sha1: "1c32be7b3f825c6d985487763279dd6948cd3f38",
  source:
    '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\nimport "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";\n\ncontract NFTCollection is ERC721URIStorage {\n    uint256 public tokenCounter;    \n    \n    constructor(string memory tokenName, string memory tokenSymbol) ERC721 (tokenName, tokenSymbol) {                \n        tokenCounter = 1;\n    } \n\n    function createCollectible (string memory tokenURI) public returns (uint256) {\n        uint256 newTokenId = tokenCounter;\n        _safeMint(msg.sender, newTokenId);\n        _setTokenURI(newTokenId, tokenURI);\n        tokenCounter = tokenCounter + 1;\n        return newTokenId;\n    }\n} \n',
  sourceMap:
    "137:527:10:-:0;;;228:145;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;1441:13:0;;300:9:10;;311:11;;1441:13:0;;:5;;:13;;;;;:::i;:::-;-1:-1:-1;1464:17:0;;;;:7;;:17;;;;;:::i;:::-;-1:-1:-1;;365:1:10::1;350:12;:16:::0;-1:-1:-1;137:527:10;;-1:-1:-1;;137:527:10;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;137:527:10;;;-1:-1:-1;137:527:10;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;14:127:11;75:10;70:3;66:20;63:1;56:31;106:4;103:1;96:15;130:4;127:1;120:15;146:885;200:5;253:3;246:4;238:6;234:17;230:27;220:55;;271:1;268;261:12;220:55;294:13;;-1:-1:-1;;;;;356:10:11;;;353:36;;;369:18;;:::i;:::-;444:2;438:9;412:2;498:13;;-1:-1:-1;;494:22:11;;;518:2;490:31;486:40;474:53;;;542:18;;;562:22;;;539:46;536:72;;;588:18;;:::i;:::-;628:10;624:2;617:22;663:2;655:6;648:18;685:4;675:14;;730:3;725:2;720;712:6;708:15;704:24;701:33;698:53;;;747:1;744;737:12;698:53;769:1;760:10;;779:133;793:2;790:1;787:9;779:133;;;881:14;;;877:23;;871:30;850:14;;;846:23;;839:63;804:10;;;;779:133;;;930:2;927:1;924:9;921:80;;;989:1;984:2;979;971:6;967:15;963:24;956:35;921:80;1019:6;146:885;-1:-1:-1;;;;;;146:885:11:o;1036:562::-;1135:6;1143;1196:2;1184:9;1175:7;1171:23;1167:32;1164:52;;;1212:1;1209;1202:12;1164:52;1239:16;;-1:-1:-1;;;;;1304:14:11;;;1301:34;;;1331:1;1328;1321:12;1301:34;1354:61;1407:7;1398:6;1387:9;1383:22;1354:61;:::i;:::-;1344:71;;1461:2;1450:9;1446:18;1440:25;1424:41;;1490:2;1480:8;1477:16;1474:36;;;1506:1;1503;1496:12;1474:36;;1529:63;1584:7;1573:8;1562:9;1558:24;1529:63;:::i;:::-;1519:73;;;1036:562;;;;;:::o;1603:380::-;1682:1;1678:12;;;;1725;;;1746:61;;1800:4;1792:6;1788:17;1778:27;;1746:61;1853:2;1845:6;1842:14;1822:18;1819:38;1816:161;;;1899:10;1894:3;1890:20;1887:1;1880:31;1934:4;1931:1;1924:15;1962:4;1959:1;1952:15;1816:161;;1603:380;;;:::o;:::-;137:527:10;;;;;;",
  sourcePath: "contracts/CollectionNFT.sol",
  type: "contract",
};

const deployCollection = async (tokenName, tokenSymbol, tokenURI) => {
  const abi = nft_contract["abi"];
  const bytecode = nft_contract["bytecode"];
  const web3 = new Web3(Web3.givenProvider);
  const mycontract = new web3.eth.Contract(abi);

  let response = {
    deploy: "pending",
    txHash: "pending",
    confirmation: "pending",
    contract: "pending",
  };

  mycontract
    .deploy({
      data: bytecode,
      arguments: [tokenName, tokenSymbol, tokenURI],
    })
    .send({ from: account }, (err, transactionHash) => {
      response["deploy"] = "Deployed";
      response["txHash"] = transactionHash;
    })
    .on("confirmation", () => {
      response["confirmation"] = "Confirmed";
    })
    .then((newContract) => {
      return newContract.options.address;
    });
};
